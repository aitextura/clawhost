import type {
    CacheEntry,
    PolarSubscription as StripeSubscriptionResult
} from '@/ts/Interfaces'
import type { SubscriptionStatus } from '@/ts/Types'
import type Stripe from 'stripe'

import getStripeClient from '@/lib/stripe/getStripeClient'

const SUB_CACHE_TTL = 60_000
const subCache = new Map<string, CacheEntry<StripeSubscriptionResult>>()
const subInflight = new Map<
    string,
    Promise<StripeSubscriptionResult | null>
>()

const mapStatus = (status: string): SubscriptionStatus => {
    const statusMap: Record<string, SubscriptionStatus> = {
        active: 'active',
        past_due: 'past_due',
        canceled: 'canceled',
        incomplete: 'incomplete',
        incomplete_expired: 'canceled',
        trialing: 'active',
        unpaid: 'past_due',
        paused: 'canceled'
    }
    return statusMap[status] ?? ('active' as SubscriptionStatus)
}

const toResult = (
    sub: Stripe.Subscription
): StripeSubscriptionResult => ({
    id: sub.id,
    status: mapStatus(sub.status),
    customerId:
        typeof sub.customer === 'string' ? sub.customer : sub.customer.id,
    productId: sub.items.data[0]?.price?.id ?? '',
    amount: sub.items.data[0]?.price?.unit_amount ?? 0,
    currency: sub.currency ?? 'usd',
    currentPeriodStart: new Date(sub.current_period_start * 1000),
    currentPeriodEnd: new Date(sub.current_period_end * 1000),
    cancelAtPeriodEnd: sub.cancel_at_period_end,
    canceledAt: sub.canceled_at
        ? new Date(sub.canceled_at * 1000)
        : undefined,
    endedAt: sub.ended_at ? new Date(sub.ended_at * 1000) : undefined,
    metadata: sub.metadata as Record<string, string> | undefined
})

const subscriptions = {
    async get(
        subscriptionId: string
    ): Promise<StripeSubscriptionResult | null> {
        const cached = subCache.get(subscriptionId)
        if (cached && Date.now() < cached.expiry) return cached.data

        const pending = subInflight.get(subscriptionId)
        if (pending) return pending

        const stripe = getStripeClient()

        const promise = stripe.subscriptions
            .retrieve(subscriptionId)
            .then((sub) => {
                const result = toResult(sub)
                subCache.set(subscriptionId, {
                    data: result,
                    expiry: Date.now() + SUB_CACHE_TTL
                })
                subInflight.delete(subscriptionId)
                return result as StripeSubscriptionResult | null
            })
            .catch(() => {
                subInflight.delete(subscriptionId)
                return null as StripeSubscriptionResult | null
            })

        subInflight.set(subscriptionId, promise)
        return promise
    },

    async listByCustomer(
        customerId: string
    ): Promise<StripeSubscriptionResult[]> {
        const stripe = getStripeClient()

        try {
            const result = await stripe.subscriptions.list({
                customer: customerId,
                limit: 100
            })

            return result.data.map(toResult)
        } catch {
            return []
        }
    },

    async cancel(
        subscriptionId: string
    ): Promise<StripeSubscriptionResult | null> {
        const stripe = getStripeClient()

        try {
            const sub = await stripe.subscriptions.update(subscriptionId, {
                cancel_at_period_end: true
            })
            return toResult(sub)
        } catch {
            return null
        }
    },

    async uncancel(
        subscriptionId: string
    ): Promise<StripeSubscriptionResult | null> {
        const stripe = getStripeClient()

        try {
            const sub = await stripe.subscriptions.update(subscriptionId, {
                cancel_at_period_end: false
            })
            return toResult(sub)
        } catch {
            return null
        }
    },

    async revoke(subscriptionId: string): Promise<void> {
        const stripe = getStripeClient()
        await stripe.subscriptions.cancel(subscriptionId)
    }
}

export default subscriptions