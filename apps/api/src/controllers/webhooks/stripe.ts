import type { Context } from 'hono'
import type {
    SubscriptionWebhookData,
    CheckoutWebhookData
} from '@/ts/Interfaces'
import type { ProviderType } from '@/ts/Types'

import { eq } from 'drizzle-orm'
import { clawStatus, getTierById, getTierByProviderPlan, AI_MARKUP_MULTIPLIER } from '@openclaw/shared'
import { db } from '@/db'
import { claws, users } from '@/db/schema'
import { parseWebhook, handleWebhook } from '@/lib/stripe'
import provisionClaw from '@/controllers/claws/provisionClaw'
import { getProvider } from '@/services/provider'
import { cleanupClaw } from '@/controllers/claws/helpers'
import { createUser, generateKey, updateUserBudget } from '@/services/litellm'
import { ok, fail } from '@/lib/response'
import { getEnvironment, PROD } from '@/lib/environment'
import { t } from '@openclaw/i18n'

const handleStripeWebhook = async (c: Context) => {
    try {
        const event = await parseWebhook(c)

        if (!event) {
            return fail(c, t('api.invalidWebhook'), 400)
        }

        await handleWebhook(event, {
            onCheckoutUpdated: async (data: CheckoutWebhookData) => {
                if (data.status !== 'succeeded') {
                    return
                }

                if (data.metadata?.type === 'token_purchase') {
                    const userId = data.metadata.userId
                    const packCents = parseInt(data.metadata.packCents || '0', 10)

                    if (userId && packCents > 0) {
                        try {
                            const userRecord = await db
                                .select()
                                .from(users)
                                .where(eq(users.id, userId))
                                .limit(1)

                            if (userRecord[0]?.litellmUserId) {
                                const topUpDollars = packCents / 100 / AI_MARKUP_MULTIPLIER
                                const spend = await import('@/services/litellm').then((m) => m.getSpend(userRecord[0].litellmUserId!))
                                const newBudget = spend.max_budget + topUpDollars
                                await updateUserBudget(userRecord[0].litellmUserId, newBudget)
                            }
                        } catch (err) {
                            console.error(`Failed to fulfill token purchase: ${err}`)
                        }
                    }
                }
            },

            onSubscriptionActive: async (data: SubscriptionWebhookData) => {
                const currentEnv = getEnvironment(c)
                const eventEnv = data.metadata?.environment || PROD

                if (eventEnv !== currentEnv) {
                    return
                }

                const existingClaw = await db
                    .select()
                    .from(claws)
                    .where(eq(claws.stripeSubscriptionId, data.id))
                    .limit(1)

                if (existingClaw[0]) {
                    return
                }

                const pendingClawId = data.metadata?.pendingClawId
                if (!pendingClawId) {
                    return
                }

                try {
                    const planId = data.metadata?.planId
                    const metaTierId = data.metadata?.tierId
                    const tier = metaTierId
                        ? getTierById(metaTierId)
                        : planId
                            ? getTierByProviderPlan(planId)
                            : null
                    const userId = data.metadata?.userId

                    let litellmApiKey: string | undefined

                    if (userId && tier && process.env.LITELLM_API_URL) {
                        try {
                            const userRecord = await db
                                .select()
                                .from(users)
                                .where(eq(users.id, userId))
                                .limit(1)

                            const budgetDollars = tier.includedAiCreditCents / 100 / AI_MARKUP_MULTIPLIER
                            const litellmUser = await createUser(userId, userRecord[0]?.email || '', budgetDollars)

                            const keyResult = await generateKey(userId, budgetDollars)
                            litellmApiKey = keyResult.key

                            await db
                                .update(users)
                                .set({
                                    litellmUserId: litellmUser.user_id,
                                    litellmKeyHash: keyResult.token
                                })
                                .where(eq(users.id, userId))
                        } catch (litellmErr) {
                            console.error(`Failed to create LiteLLM user: ${litellmErr}`)
                        }
                    }

                    await provisionClaw({
                        pendingClawId,
                        subscriptionId: data.id,
                        customerId: data.customerId,
                        productId: data.productId,
                        litellmApiKey
                    })
                } catch (err) {
                    console.error(`Failed to provision claw: ${err}`)
                }
            },

            onSubscriptionCanceled: async (data: SubscriptionWebhookData) => {
                const deletionScheduledAt = data.currentPeriodEnd
                    ? new Date(data.currentPeriodEnd)
                    : null

                await db
                    .update(claws)
                    .set({
                        subscriptionStatus: 'canceled',
                        ...(deletionScheduledAt ? { deletionScheduledAt } : {})
                    })
                    .where(eq(claws.stripeSubscriptionId, data.id))
            },

            onSubscriptionRevoked: async (data: SubscriptionWebhookData) => {
                const claw = await db
                    .select()
                    .from(claws)
                    .where(eq(claws.stripeSubscriptionId, data.id))
                    .limit(1)

                if (!claw[0]) {
                    return
                }

                if (claw[0].deletionScheduledAt) {
                    try {
                        await cleanupClaw(claw[0].id, {
                            provider: (claw[0].provider ||
                                'hetzner') as ProviderType,
                            providerServerId: claw[0].providerServerId,
                            subdomain: claw[0].subdomain
                        })
                    } catch (err) {
                        console.error(
                            `Failed to cleanup claw ${claw[0].id}:`,
                            err
                        )
                        await db
                            .update(claws)
                            .set({
                                subscriptionStatus: 'revoked',
                                status: clawStatus.stopped
                            })
                            .where(eq(claws.id, claw[0].id))
                    }
                    return
                }

                if (claw[0].providerServerId) {
                    const provider = getProvider(
                        (claw[0].provider || 'hetzner') as ProviderType
                    )
                    await Promise.all([
                        db
                            .update(claws)
                            .set({ subscriptionStatus: 'revoked' })
                            .where(eq(claws.id, claw[0].id)),
                        provider
                            .stopServer(claw[0].providerServerId)
                            .then(() =>
                                db
                                    .update(claws)
                                    .set({ status: clawStatus.stopped })
                                    .where(eq(claws.id, claw[0].id))
                            )
                            .catch((err) =>
                                console.error(`Failed to stop server: ${err}`)
                            )
                    ])
                } else {
                    await db
                        .update(claws)
                        .set({ subscriptionStatus: 'revoked' })
                        .where(eq(claws.id, claw[0].id))
                }
            },

            onSubscriptionUncanceled: async (data: SubscriptionWebhookData) => {
                await db
                    .update(claws)
                    .set({
                        deletionScheduledAt: null,
                        subscriptionStatus: 'active'
                    })
                    .where(eq(claws.stripeSubscriptionId, data.id))
            },

            onSubscriptionUpdated: async (data: SubscriptionWebhookData) => {
                const updated = await db
                    .update(claws)
                    .set({ subscriptionStatus: data.status })
                    .where(eq(claws.stripeSubscriptionId, data.id))
                    .returning()

                if (
                    data.status === 'past_due' &&
                    updated[0]?.providerServerId
                ) {
                    try {
                        const provider = getProvider(
                            (updated[0].provider || 'hetzner') as ProviderType
                        )
                        await provider.stopServer(updated[0].providerServerId)
                        await db
                            .update(claws)
                            .set({ status: clawStatus.stopped })
                            .where(eq(claws.id, updated[0].id))
                    } catch (err) {
                        console.error(`Failed to stop server: ${err}`)
                    }
                }
            }
        })

        return ok(c, { received: true }, t('api.webhookReceived'))
    } catch (err) {
        console.error('Webhook error:', err)
        return fail(c, t('api.webhookProcessingFailed'), 500)
    }
}

export default handleStripeWebhook