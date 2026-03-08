import type { AuthenticatedContext } from '@/ts/Types'

import { eq } from 'drizzle-orm'

interface PurchaseTokensBody {
    packIndex: number
}

const TOKEN_PACKS = [
    { amount: 50000, label: '50K tokens' },
    { amount: 200000, label: '200K tokens' },
    { amount: 1000000, label: '1M tokens' }
]
import { db } from '@/db'
import { users } from '@/db/schema'
import { customers } from '@/lib/stripe'
import getStripeClient from '@/lib/stripe/getStripeClient'
import getStripeConfig from '@/lib/stripe/getStripeConfig'
import { ok, fail } from '@/lib/response'
import { t } from '@openclaw/i18n'

const TOKEN_PRICE_ENV_KEYS = [
    'STRIPE_PRICE_TOKEN_50K',
    'STRIPE_PRICE_TOKEN_200K',
    'STRIPE_PRICE_TOKEN_1M'
]

const purchaseTokens = async (c: AuthenticatedContext) => {
    try {
        const userId = c.get('userId')
        const { packIndex } = await c.req.json<PurchaseTokensBody>()

        if (packIndex === undefined || packIndex < 0 || packIndex >= TOKEN_PACKS.length) {
            return fail(c, t('api.missingRequiredFields'), 400)
        }

        const pack = TOKEN_PACKS[packIndex]
        const priceId = process.env[TOKEN_PRICE_ENV_KEYS[packIndex]]

        if (!priceId) {
            console.error(`[purchaseTokens] Missing env var: ${TOKEN_PRICE_ENV_KEYS[packIndex]}`)
            return fail(c, t('api.paymentNotConfigured'), 400)
        }

        if (!process.env.STRIPE_SECRET_KEY) {
            return fail(c, 'Stripe is not configured.', 500)
        }

        const userResult = await db
            .select()
            .from(users)
            .where(eq(users.id, userId))
            .limit(1)

        if (!userResult[0]) {
            return fail(c, t('api.userNotFound'), 404)
        }

        let stripeCustomerId = userResult[0].stripeCustomerId

        if (!stripeCustomerId) {
            const customer = await customers.getOrCreate({
                email: userResult[0].email,
                name: userResult[0].name || undefined,
                externalId: userId
            })
            stripeCustomerId = customer.id

            await db
                .update(users)
                .set({ stripeCustomerId })
                .where(eq(users.id, userId))
        }

        const stripe = getStripeClient()
        const config = getStripeConfig()

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: [{ price: priceId, quantity: 1 }],
            customer: stripeCustomerId,
            success_url: config.successUrl,
            cancel_url: config.cancelUrl,
            metadata: {
                type: 'token_purchase',
                userId,
                tokenAmount: pack.amount.toString(),
                packIndex: packIndex.toString()
            }
        })

        return ok(
            c,
            { checkoutUrl: session.url ?? '' },
            t('api.clawPurchaseInitiated')
        )
    } catch (err) {
        console.error('[purchaseTokens] Error:', err)
        return fail(c, t('api.failedToInitiatePurchase'), 500)
    }
}

export default purchaseTokens