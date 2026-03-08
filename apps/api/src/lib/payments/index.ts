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