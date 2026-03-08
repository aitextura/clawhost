import type { Context } from 'hono'

import type Stripe from 'stripe'
import getStripeConfig from '@/lib/stripe/getStripeConfig'
import verifyWebhookSignature from '@/lib/stripe/webhooks/verifyWebhookSignature'

const parseWebhook = async (c: Context): Promise<Stripe.Event | null> => {
    const config = getStripeConfig()

    if (!config.webhookSecret) {
        return null
    }

    const signature = c.req.header('stripe-signature')
    if (!signature) {
        return null
    }

    const payload = await c.req.text()

    return verifyWebhookSignature(payload, signature, config.webhookSecret)
}

export default parseWebhook