const getStripeConfig = () => {
    const url = process.env.CLIENT
    if (!url) {
        console.error('[getStripeConfig] CLIENT env var is not set')
    }
    const http = url?.includes('localhost') ? 'http' : 'https'
    const baseUrl = url ? `${http}://${url}` : 'http://localhost:3000'

    const successUrl = `${baseUrl}/claws?payment=success&session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${baseUrl}/claws`

    return {
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
        successUrl,
        cancelUrl,
        webhookSecret: process.env.STRIPE_WEBHOOK_SECRET
    }
}

export default getStripeConfig