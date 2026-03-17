import type {
    SubscriptionWebhookData,
    CheckoutWebhookData,
    WebhookHandlers
} from '@/ts/Interfaces'

import type Stripe from 'stripe'

const extractCheckoutData = (
    session: Stripe.Checkout.Session
): CheckoutWebhookData => ({
    id: session.id,
    status: session.status ?? 'open',
    customerId:
        typeof session.customer === 'string'
            ? session.customer
            : session.customer?.id,
    customerEmail: session.customer_email ?? undefined,
    productId: (session.metadata?.priceId as string) ?? '',
    amount: session.amount_total ?? 0,
    currency: session.currency ?? 'usd',
    metadata: session.metadata as Record<string, string> | undefined
})

const extractSubscriptionData = (
    sub: Stripe.Subscription
): SubscriptionWebhookData => ({
    id: sub.id,
    status: sub.status,
    customerId:
        typeof sub.customer === 'string' ? sub.customer : sub.customer.id,
    productId: sub.items.data[0]?.price?.id ?? '',
    amount: sub.items.data[0]?.price?.unit_amount ?? 0,
    currency: sub.currency ?? 'usd',
    currentPeriodStart: new Date(
        sub.current_period_start * 1000
    ).toISOString(),
    currentPeriodEnd: new Date(sub.current_period_end * 1000).toISOString(),
    cancelAtPeriodEnd: sub.cancel_at_period_end,
    canceledAt: sub.canceled_at
        ? new Date(sub.canceled_at * 1000).toISOString()
        : undefined,
    endedAt: sub.ended_at
        ? new Date(sub.ended_at * 1000).toISOString()
        : undefined,
    metadata: sub.metadata as Record<string, string> | undefined
})

const handleWebhook = async (
    event: Stripe.Event,
    handlers: WebhookHandlers
): Promise<void> => {
    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object as Stripe.Checkout.Session
            const data = extractCheckoutData(session)
            await handlers.onCheckoutUpdated?.({ ...data, status: 'succeeded' })

            if (session.subscription) {
                const subId =
                    typeof session.subscription === 'string'
                        ? session.subscription
                        : session.subscription.id
                await handlers.onSubscriptionActive?.({
                    id: subId,
                    status: 'active',
                    customerId: data.customerId ?? '',
                    productId: data.productId,
                    amount: data.amount,
                    currency: data.currency,
                    cancelAtPeriodEnd: false,
                    metadata: data.metadata
                })
            }
            break
        }
        case 'customer.subscription.created': {
            const sub = event.data.object as Stripe.Subscription
            await handlers.onSubscriptionCreated?.(
                extractSubscriptionData(sub)
            )
            break
        }
        case 'customer.subscription.updated': {
            const sub = event.data.object as Stripe.Subscription
            const data = extractSubscriptionData(sub)

            if (sub.cancel_at_period_end) {
                await handlers.onSubscriptionCanceled?.(data)
            } else if (
                event.data.previous_attributes &&
                (event.data.previous_attributes as Record<string, unknown>)
                    .cancel_at_period_end === true
            ) {
                await handlers.onSubscriptionUncanceled?.(data)
            } else {
                await handlers.onSubscriptionUpdated?.(data)
            }
            break
        }
        case 'customer.subscription.deleted': {
            const sub = event.data.object as Stripe.Subscription
            await handlers.onSubscriptionRevoked?.(
                extractSubscriptionData(sub)
            )
            break
        }
    }
}

export default handleWebhook