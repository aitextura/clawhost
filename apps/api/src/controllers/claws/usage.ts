import type { AuthenticatedContext } from '@/ts/Types'
import type { Context } from 'hono'

import { eq, and, gte, sql } from 'drizzle-orm'
import { db } from '@/db'
import { claws, tokenUsageLogs } from '@/db/schema'
import { findUserClaw } from '@/controllers/claws/helpers'
import { t } from '@openclaw/i18n'
import { ok, fail } from '@/lib/response'

export const getUsage = async (c: AuthenticatedContext) => {
    try {
        const userId = c.get('userId')
        const id = c.req.param('id')
        const claw = await findUserClaw(userId, id)

        if (!claw) {
            return fail(c, t('api.clawNotFound'), 404)
        }

        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        const history = await db
            .select({
                date: tokenUsageLogs.timestamp,
                tokensUsed: tokenUsageLogs.tokensUsed,
                model: tokenUsageLogs.model
            })
            .from(tokenUsageLogs)
            .where(
                and(
                    eq(tokenUsageLogs.clawId, id),
                    gte(tokenUsageLogs.timestamp, thirtyDaysAgo)
                )
            )

        return ok(c, {
            usedToday: claw.tokensUsedToday ?? 0,
            dailyLimit: claw.tokenLimitDaily ?? 100000,
            history
        })
    } catch (err) {
        console.error('Get usage error:', err)
        return fail(c, t('api.clawNotFound'), 500)
    }
}

export const reportUsage = async (c: Context) => {
    try {
        const id = c.req.param('id')
        const authHeader = c.req.header('Authorization')

        if (!authHeader) {
            return c.json({ error: 'Unauthorized' }, 401)
        }

        const token = authHeader.replace('Bearer ', '')

        const claw = await db
            .select()
            .from(claws)
            .where(eq(claws.id, id))
            .limit(1)

        if (!claw[0] || claw[0].gatewayToken !== token) {
            return c.json({ error: 'Unauthorized' }, 401)
        }

        const body = await c.req.json<{
            tokensUsed: number
            model: string
        }>()

        if (!body.tokensUsed || body.tokensUsed <= 0) {
            return c.json({ error: 'Invalid tokensUsed' }, 400)
        }

        const dailyLimit = claw[0].tokenLimitDaily ?? 100000
        const currentUsed = claw[0].tokensUsedToday ?? 0

        if (currentUsed + body.tokensUsed > dailyLimit) {
            return c.json({ error: 'Daily token limit exceeded' }, 429)
        }

        await Promise.all([
            db
                .update(claws)
                .set({
                    tokensUsedToday: sql`${claws.tokensUsedToday} + ${body.tokensUsed}`
                })
                .where(eq(claws.id, id)),
            db.insert(tokenUsageLogs).values({
                id: crypto.randomUUID(),
                clawId: id,
                timestamp: new Date(),
                tokensUsed: body.tokensUsed,
                model: body.model
            })
        ])

        return c.json({
            success: true,
            remaining: dailyLimit - currentUsed - body.tokensUsed
        })
    } catch (err) {
        console.error('Report usage error:', err)
        return c.json({ error: 'Internal server error' }, 500)
    }
}