/**
 * Payment provider abstraction layer.
 * Switches between Stripe and Polar based on PAYMENT_PROVIDER env var.
 * Default: 'polar' (upstream compatibility).
 *
 * Usage: set PAYMENT_PROVIDER=stripe in .env to use Stripe.
 */

const PAYMENT_PROVIDER = (process.env.PAYMENT_PROVIDER || 'polar') as 'stripe' | 'polar'

export function getPaymentProvider(): 'stripe' | 'polar' {
    return PAYMENT_PROVIDER
}

export function isStripe(): boolean {
    return PAYMENT_PROVIDER === 'stripe'
}

export function isPolar(): boolean {
    return PAYMENT_PROVIDER === 'polar'
}

export async function getCheckoutModule() {
    if (isStripe()) {
        return await import('../stripe/checkouts')
    }
    return await import('../polar/checkouts')
}

export async function getCustomerModule() {
    if (isStripe()) {
        return await import('../stripe/customers')
    }
    return await import('../polar/customers')
}

export async function getSubscriptionModule() {
    if (isStripe()) {
        return await import('../stripe/subscriptions')
    }
    return await import('../polar/subscriptions')
}