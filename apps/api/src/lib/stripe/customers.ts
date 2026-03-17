import type {
    PolarCustomer as StripeCustomerResult,
    CreatePolarCustomerParams as CreateStripeCustomerParams
} from '@/ts/Interfaces'

import getStripeClient from '@/lib/stripe/getStripeClient'

const customers = {
    async create(
        data: CreateStripeCustomerParams
    ): Promise<StripeCustomerResult> {
        const stripe = getStripeClient()

        const customer = await stripe.customers.create({
            email: data.email,
            name: data.name,
            metadata: { externalId: data.externalId }
        })

        return {
            id: customer.id,
            email: customer.email ?? data.email,
            name: customer.name ?? undefined,
            externalId: data.externalId
        }
    },

    async getByExternalId(
        externalId: string
    ): Promise<StripeCustomerResult | null> {
        const stripe = getStripeClient()

        try {
            const result = await stripe.customers.search({
                query: `metadata['externalId']:'${externalId}'`
            })

            if (result.data.length === 0) return null

            const customer = result.data[0]
            return {
                id: customer.id,
                email: customer.email ?? '',
                name: customer.name ?? undefined,
                externalId:
                    (customer.metadata?.externalId as string) ?? undefined
            }
        } catch {
            return null
        }
    },

    async getOrCreate(
        data: CreateStripeCustomerParams
    ): Promise<StripeCustomerResult> {
        const existing = await this.getByExternalId(data.externalId)
        if (existing) {
            return existing
        }
        return this.create(data)
    },

    async get(customerId: string): Promise<StripeCustomerResult | null> {
        const stripe = getStripeClient()

        try {
            const customer = await stripe.customers.retrieve(customerId)
            if (customer.deleted) return null
            return {
                id: customer.id,
                email: customer.email ?? '',
                name: customer.name ?? undefined,
                externalId:
                    (customer.metadata?.externalId as string) ?? undefined
            }
        } catch {
            return null
        }
    }
}

export default customers