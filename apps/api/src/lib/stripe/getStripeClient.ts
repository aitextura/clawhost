import Stripe from 'stripe'

let stripeClient: Stripe | null = null

const getStripeClient = (): Stripe => {
    if (stripeClient) {
        return stripeClient
    }

    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
        throw new Error('STRIPE_SECRET_KEY is not set')
    }

    stripeClient = new Stripe(secretKey, {
        apiVersion: '2025-02-24.acacia'
    })

    return stripeClient
}

export default getStripeClient