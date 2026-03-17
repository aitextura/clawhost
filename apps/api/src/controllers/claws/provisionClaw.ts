import type {
    ProvisionClawParams,
    ProvisionClawResponse
} from '@/ts/Interfaces'
import type { ProviderType } from '@/ts/Types'

import crypto from 'crypto'
import { eq } from 'drizzle-orm'
import { clawStatus, inputValidation } from '@openclaw/shared'
import { isStripe } from '@/lib/payments'
import { db } from '@/db'
import { claws, pendingClaws, sshKeys, volumes } from '@/db/schema'
import { getProvider } from '@/services/provider'
import cloudflare from '@/services/cloudflare'
import { getTierByProviderPlan } from '@openclaw/shared'
import {
    generateSlug,
    generateServerName,
    generateToken,
    generateCloudInit,
    DOMAIN
} from '@/controllers/claws/helpers'
import generateSnapshotCloudInit from '@/controllers/claws/helpers/generateSnapshotCloudInit'
import { t } from '@openclaw/i18n'

const provisionClaw = async (
    params: ProvisionClawParams
): Promise<ProvisionClawResponse> => {
    try {
        const subscriptionColumn = isStripe()
            ? claws.stripeSubscriptionId
            : claws.polarSubscriptionId

        const existingClaw = await db
            .select()
            .from(claws)
            .where(eq(subscriptionColumn, params.subscriptionId))
            .limit(1)

        if (existingClaw[0]) {
            return { success: true, clawId: existingClaw[0].id }
        }

        const claimed = await db
            .delete(pendingClaws)
            .where(eq(pendingClaws.id, params.pendingClawId))
            .returning()

        if (!claimed[0]) {
            return { success: false, error: t('api.pendingClawNotFound') }
        }

        const pending = claimed[0]

        const providerName = (pending.provider || 'hetzner') as ProviderType
        const provider = getProvider(providerName)

        const [serverTypes, sshKeyResult] = await Promise.all([
            provider.getServerTypes(),
            pending.sshKeyId
                ? db
                      .select()
                      .from(sshKeys)
                      .where(eq(sshKeys.id, pending.sshKeyId))
                      .limit(1)
                : Promise.resolve(null)
        ])

        const selectedPlan = serverTypes.find(
            (st) => st.name === pending.planId
        )

        if (
            !selectedPlan ||
            selectedPlan.memory < inputValidation.MIN_MEMORY_GB.MIN
        ) {
            return { success: false, error: t('api.planBelowMinimumMemory') }
        }

        const id = crypto.randomUUID()
        const subdomain = generateSlug(id)
        const gatewayToken = generateToken()

        const getSshKeyId = (provider: ProviderType, sshKey: typeof sshKeyResult extends (infer T)[] | null ? NonNullable<T> : never): number | null => {
            if (provider === 'digitalocean') return sshKey.digitaloceanKeyId
            if (provider === 'vultr') return sshKey.vultrKeyId
            if (provider === 'contabo') return sshKey.contaboKeyId
            return sshKey.providerKeyId
        }

        let providerSshKeyIds: number[] | undefined
        if (sshKeyResult && sshKeyResult[0]) {
            const keyId = getSshKeyId(providerName, sshKeyResult[0])
            if (keyId) {
                providerSshKeyIds = [keyId]
            }
        }

        const snapshotId = process.env.HETZNER_SNAPSHOT_ID
        const litellmBaseUrl = process.env.LITELLM_API_URL

        const cloudInitScript = snapshotId && providerName === 'hetzner'
            ? generateSnapshotCloudInit(
                pending.rootPassword || '',
                subdomain,
                DOMAIN,
                gatewayToken,
                params.litellmApiKey,
                litellmBaseUrl
            )
            : generateCloudInit(
                pending.rootPassword || '',
                subdomain,
                DOMAIN,
                gatewayToken,
                params.litellmApiKey,
                litellmBaseUrl
            )

        const subscriptionFields = isStripe()
            ? {
                stripeSubscriptionId: params.subscriptionId,
                stripePriceId: params.productId,
                stripeCustomerId: params.customerId
            }
            : {
                polarSubscriptionId: params.subscriptionId,
                polarProductId: params.productId,
                polarCustomerId: params.customerId
            }

        await db.insert(claws).values({
            id,
            userId: pending.userId,
            name: pending.name,
            provider: providerName,
            status: clawStatus.creating,
            planId: pending.planId,
            location: pending.location,
            rootPassword: pending.rootPassword,
            sshKeyId: pending.sshKeyId,
            subdomain,
            gatewayToken,
            tierId: pending.planId,
            ...subscriptionFields,
            subscriptionStatus: 'active',
            billingInterval: pending.billingInterval
        })

        let serverId = 0
        let ip = ''
        let actualProvider = providerName

        try {
            const serverName = generateServerName(pending.name, id)
            const server = await provider.createServer(
                serverName,
                pending.planId,
                pending.location,
                pending.rootPassword || undefined,
                providerSshKeyIds,
                snapshotId && providerName === 'hetzner' ? snapshotId : '',
                cloudInitScript
            )
            serverId = server.serverId
            ip = server.ip
        } catch (providerErr) {
            if (providerName === 'hetzner') {
                const tier = getTierByProviderPlan(pending.planId)
                let fallbackSucceeded = false

                if (tier?.providerPlans.hetznerFallback) {
                    try {
                        const fallbackPlanId = tier.providerPlans.hetznerFallback
                        const fallbackCloudInit = snapshotId
                            ? generateSnapshotCloudInit(
                                pending.rootPassword || '',
                                subdomain,
                                DOMAIN,
                                gatewayToken,
                                params.litellmApiKey,
                                litellmBaseUrl
                            )
                            : generateCloudInit(
                                pending.rootPassword || '',
                                subdomain,
                                DOMAIN,
                                gatewayToken,
                                params.litellmApiKey,
                                litellmBaseUrl
                            )

                        const serverName = generateServerName(pending.name, id)
                        const server = await provider.createServer(
                            serverName,
                            fallbackPlanId,
                            pending.location,
                            pending.rootPassword || undefined,
                            providerSshKeyIds,
                            snapshotId || '',
                            fallbackCloudInit
                        )
                        serverId = server.serverId
                        ip = server.ip
                        fallbackSucceeded = true
                    } catch {
                        console.error('Hetzner fallback plan also failed, trying Contabo...')
                    }
                }

                if (!fallbackSucceeded && process.env.CONTABO_CLIENT_ID) {
                    try {
                        const contaboPlanId = tier?.providerPlans.contabo
                        if (!contaboPlanId) throw providerErr

                        const fallbackProvider = getProvider('contabo')
                        const contaboLocation = process.env.CONTABO_DEFAULT_REGION || 'EU'

                        let contaboSshKeyIds: number[] | undefined
                        if (sshKeyResult && sshKeyResult[0]) {
                            const keyId = getSshKeyId('contabo', sshKeyResult[0])
                            if (keyId) {
                                contaboSshKeyIds = [keyId]
                            }
                        }

                        const fallbackCloudInit = generateCloudInit(
                            pending.rootPassword || '',
                            subdomain,
                            DOMAIN,
                            gatewayToken,
                            params.litellmApiKey,
                            litellmBaseUrl
                        )

                        const serverName = generateServerName(pending.name, id)
                        const server = await fallbackProvider.createServer(
                            serverName,
                            contaboPlanId,
                            contaboLocation,
                            pending.rootPassword || undefined,
                            contaboSshKeyIds,
                            '',
                            fallbackCloudInit
                        )
                        serverId = server.serverId
                        ip = server.ip
                        actualProvider = 'contabo'
                        fallbackSucceeded = true
                    } catch (fallbackErr) {
                        console.error('Contabo fallback also failed:', fallbackErr)
                    }
                }

                if (!fallbackSucceeded) {
                    await db.delete(claws).where(eq(claws.id, id))
                    throw providerErr
                }
            } else {
                await db.delete(claws).where(eq(claws.id, id))
                throw providerErr
            }
        }

        const updateFields: Record<string, unknown> = {
            providerServerId: serverId.toString(),
            status: clawStatus.configuring,
            ip
        }

        if (actualProvider !== providerName) {
            updateFields.provider = actualProvider
        }

        await Promise.all([
            cloudflare
                .createDNSRecord(subdomain, ip)
                .catch((dnsErr) =>
                    console.error('Failed to create DNS record:', dnsErr)
                ),
            db
                .update(claws)
                .set(updateFields)
                .where(eq(claws.id, id))
        ])

        if (
            pending.volumeSize &&
            pending.volumeSize >= inputValidation.VOLUME_SIZE.MIN
        ) {
            try {
                const volumeId = crypto.randomUUID()
                const providerVolume = await provider.createVolume(
                    `${pending.name}-vol-${volumeId.slice(0, 8)}`,
                    pending.volumeSize,
                    pending.location,
                    serverId
                )

                await db.insert(volumes).values({
                    id: volumeId,
                    userId: pending.userId,
                    clawId: id,
                    name: `${pending.name}-storage`,
                    size: pending.volumeSize,
                    providerVolumeId: providerVolume.id,
                    location: pending.location,
                    status: 'available'
                })
            } catch (volumeErr) {
                console.error('Failed to create volume:', volumeErr)
            }
        }

        return { success: true, clawId: id }
    } catch (err) {
        console.error('Provision claw error:', err)
        return {
            success: false,
            error: t('api.failedToProvisionClaw')
        }
    }
}

export default provisionClaw