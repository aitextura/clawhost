import type { AuthenticatedContext } from '@/ts/Types'

import { eq, and } from 'drizzle-orm'
import { db } from '@/db'
import { claws, llmApiKeys } from '@/db/schema'
import { findUserClaw } from '@/controllers/claws/helpers'
import { encrypt, decrypt, getKeyHint } from '@/lib/crypto'
import executeSSH from '@/services/ssh'
import { t } from '@openclaw/i18n'
import { ok, fail } from '@/lib/response'

export const getLlmKeys = async (c: AuthenticatedContext) => {
    try {
        const userId = c.get('userId')
        const id = c.req.param('id')
        const claw = await findUserClaw(userId, id)

        if (!claw) {
            return fail(c, t('api.clawNotFound'), 404)
        }

        const keys = await db
            .select({
                id: llmApiKeys.id,
                provider: llmApiKeys.provider,
                keyHint: llmApiKeys.keyHint,
                createdAt: llmApiKeys.createdAt
            })
            .from(llmApiKeys)
            .where(eq(llmApiKeys.clawId, id))

        return ok(c, { keys })
    } catch (err) {
        console.error('Get LLM keys error:', err)
        return fail(c, t('api.clawNotFound'), 500)
    }
}

export const setLlmKey = async (c: AuthenticatedContext) => {
    try {
        const userId = c.get('userId')
        const id = c.req.param('id')
        const claw = await findUserClaw(userId, id)

        if (!claw) {
            return fail(c, t('api.clawNotFound'), 404)
        }

        const body = await c.req.json<{ provider: string; key: string }>()

        if (!body.provider || !body.key) {
            return fail(c, 'Provider and key are required', 400)
        }

        const encryptedKey = encrypt(body.key)
        const hint = getKeyHint(body.key)

        // Upsert: delete existing key for this provider, then insert
        await db
            .delete(llmApiKeys)
            .where(
                and(
                    eq(llmApiKeys.clawId, id),
                    eq(llmApiKeys.provider, body.provider)
                )
            )

        await db.insert(llmApiKeys).values({
            id: crypto.randomUUID(),
            clawId: id,
            provider: body.provider,
            encryptedKey,
            keyHint: hint
        })

        // Push updated config to VPS and restart LiteLLM
        if (claw.ip && claw.rootPassword) {
            try {
                await pushLitellmConfig(id, claw.ip, claw.rootPassword)
            } catch (sshErr) {
                console.error('Failed to push LiteLLM config:', sshErr)
                // Key saved to DB — VPS sync failed but not fatal
            }
        }

        return ok(c, { provider: body.provider, keyHint: hint })
    } catch (err) {
        console.error('Set LLM key error:', err)
        return fail(c, t('api.clawNotFound'), 500)
    }
}

export const deleteLlmKey = async (c: AuthenticatedContext) => {
    try {
        const userId = c.get('userId')
        const id = c.req.param('id')
        const provider = c.req.param('provider')
        const claw = await findUserClaw(userId, id)

        if (!claw) {
            return fail(c, t('api.clawNotFound'), 404)
        }

        await db
            .delete(llmApiKeys)
            .where(
                and(
                    eq(llmApiKeys.clawId, id),
                    eq(llmApiKeys.provider, provider)
                )
            )

        if (claw.ip && claw.rootPassword) {
            try {
                await pushLitellmConfig(id, claw.ip, claw.rootPassword)
            } catch (sshErr) {
                console.error('Failed to push LiteLLM config after delete:', sshErr)
            }
        }

        return ok(c, { deleted: provider })
    } catch (err) {
        console.error('Delete LLM key error:', err)
        return fail(c, t('api.clawNotFound'), 500)
    }
}

const PROVIDER_MODELS: Record<string, string[]> = {
    openai: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'],
    anthropic: ['claude-sonnet-4-20250514', 'claude-haiku-4-20250414', 'claude-3-5-sonnet-20241022'],
    google: ['gemini/gemini-2.0-flash', 'gemini/gemini-1.5-pro'],
    mistral: ['mistral/mistral-large-latest', 'mistral/mistral-small-latest'],
    groq: ['groq/llama-3.1-70b-versatile', 'groq/llama-3.1-8b-instant']
}

async function pushLitellmConfig(
    clawId: string,
    ip: string,
    password: string
): Promise<void> {
    const keys = await db
        .select({
            provider: llmApiKeys.provider,
            encryptedKey: llmApiKeys.encryptedKey
        })
        .from(llmApiKeys)
        .where(eq(llmApiKeys.clawId, clawId))

    const models: { model_name: string; litellm_params: { model: string; api_key: string } }[] = []

    for (const key of keys) {
        const apiKey = decrypt(key.encryptedKey)
        const providerModels = PROVIDER_MODELS[key.provider] ?? []

        for (const model of providerModels) {
            const name = model.includes('/') ? model.split('/')[1]! : model
            models.push({
                model_name: name,
                litellm_params: { model, api_key: apiKey }
            })
        }
    }

    const yaml = [
        'model_list:',
        ...models.flatMap((m) => [
            `  - model_name: ${m.model_name}`,
            '    litellm_params:',
            `      model: ${m.litellm_params.model}`,
            `      api_key: ${m.litellm_params.api_key}`
        ])
    ].join('\n')

    const escaped = yaml.replace(/'/g, "'\\''")

    await executeSSH(
        ip,
        password,
        `mkdir -p /etc/litellm && printf '%s' '${escaped}' > /etc/litellm/config.yaml && docker restart litellm 2>/dev/null || true`,
        30000
    )
}