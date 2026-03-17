import type {
    CacheEntry,
    CheckoutSession,
    CreateCheckoutParams
} from '@/ts/Interfaces'

import { getBrand } from '@openclaw/shared'
import getStripeClient from '@/lib/stripe/getStripeClient'
import getStripeConfig from '@/lib/stripe/getStripeConfig'

const CHECKOUT_CACHE_TTL = 30_000
const checkoutCache = new Map<string, CacheEntry<CheckoutSession>>()

const checkouts = {
    async create(params: CreateCheckoutParams): Promise<CheckoutSession> {
        const stripe = getStripeClient()
        const config = getStripeConfig()

        // Если передан promoCode — ищем promotion_code в Stripe и применяем автоматически
        // discounts и allow_promotion_codes несовместимы в Stripe
        let promoDiscount: { promotion_code: string }[] | undefined
        if (params.promoCode) {
            try {
                const promos = await stripe.promotionCodes.list({
                    code: params.promoCode,
                    active: true,
                    limit: 1
                })
                if (promos.data[0]) {
                    promoDiscount = [{ promotion_code: promos.data[0].id }]
                }
            } catch {}
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            line_items: [
                {
                    price: params.productId,
                    quantity: 1
                }
            ],
            customer: params.customerId,
            customer_email: params.customerId
                ? undefined
                : params.customerEmail,
            success_url: params.successUrl || config.successUrl,
            cancel_url: params.cancelUrl || config.cancelUrl,
            metadata: params.metadata ?? {},
            ...(promoDiscount
                ? { discounts: promoDiscount }
                : { allow_promotion_codes: true }),
            subscription_data: {
                metadata: params.metadata ?? {},
                ...(getBrand().payment.trialDays > 0
                    ? { trial_period_days: getBrand().payment.trialDays }
                    : {})
            }
        })

        return {
            id: session.id,
            url: session.url ?? '',
            status: session.status ?? 'open',
            customerId:
                typeof session.customer === 'string'
                    ? session.customer
                    : session.customer?.id,
            customerEmail: session.customer_email ?? undefined,
            productId: params.productId,
            amount: session.amount_total ?? 0,
            currency: session.currency ?? 'usd',
            metadata: params.metadata
        }
    },

    async get(sessionId: string): Promise<CheckoutSession | null> {
        const cached = checkoutCache.get(sessionId)
        if (cached && Date.now() < cached.expiry) return cached.data

        const stripe = getStripeClient()

        try {
            const session = await stripe.checkout.sessions.retrieve(sessionId)
            const result: CheckoutSession = {
                id: session.id,
                url: session.url ?? '',
                status: session.status ?? 'open',
                customerId:
                    typeof session.customer === 'string'
                        ? session.customer
                        : session.customer?.id,
                customerEmail: session.customer_email ?? undefined,
                productId:
                    (session.metadata?.priceId as string) ?? '',
                amount: session.amount_total ?? 0,
                currency: session.currency ?? 'usd',
                metadata: session.metadata as
                    | Record<string, string>
                    | undefined
            }
            checkoutCache.set(sessionId, {
                data: result,
                expiry: Date.now() + CHECKOUT_CACHE_TTL
            })
            return result
        } catch {
            return null
        }
    }
}

export default checkouts