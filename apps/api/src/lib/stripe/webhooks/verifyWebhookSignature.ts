import type Stripe from 'stripe'
import getStripeClient from '@/lib/stripe/getStripeClient'

const verifyWebhookSignature = (
    payload: string | Buffer,
    signature: string,
    secret: string
): Stripe.Event | null => {
    const stripe = getStripeClient()

    try {
        return stripe.webhooks.constructEvent(payload, signature, secret)
    } catch {
        return null
    }
}

export default verifyWebhookSignature