/**
 * Payment provider abstraction layer.
 *
 * Resolution order:
 * 1. PAYMENT_PROVIDER env var (explicit override, highest priority)
 * 2. Brand config (BRAND=clawds → stripe, BRAND=openclaw → polar)
 * 3. Fallback: 'polar' (upstream compatibility)
 */

import { getBrand } from '@openclaw/shared'

const PAYMENT_PROVIDER: 'stripe' | 'polar' =
    (process.env.PAYMENT_PROVIDER as 'stripe' | 'polar' | undefined) ||
    getBrand().payment.provider

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