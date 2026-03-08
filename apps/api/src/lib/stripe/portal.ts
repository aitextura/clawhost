import getStripeClient from '@/lib/stripe/getStripeClient'
import getStripeConfig from '@/lib/stripe/getStripeConfig'

const portal = {
    async createSession(customerId: string): Promise<{ url: string }> {
        const stripe = getStripeClient()
        const config = getStripeConfig()

        const session = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: config.cancelUrl
        })

        return { url: session.url }
    }
}

export default portal