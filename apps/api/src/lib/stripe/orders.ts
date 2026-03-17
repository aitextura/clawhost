import type { PolarOrdersPage } from '@/ts/Interfaces'

import getStripeClient from '@/lib/stripe/getStripeClient'

const orders = {
    async listByCustomer(
        customerId: string,
        page: number = 1,
        limit: number = 10
    ): Promise<PolarOrdersPage> {
        const stripe = getStripeClient()

        try {
            const params: Record<string, unknown> = {
                customer: customerId,
                limit,
                expand: ['data.lines.data']
            }

            if (page > 1) {
                const skip = await stripe.invoices.list({
                    customer: customerId,
                    limit: (page - 1) * limit
                })
                const last = skip.data[skip.data.length - 1]
                if (last) params.starting_after = last.id
            }

            const invoices = await stripe.invoices.list(params as Parameters<typeof stripe.invoices.list>[0])

            const allInvoices = await stripe.invoices.list({
                customer: customerId,
                limit: 1
            })
            const totalCount = allInvoices.data.length > 0
                ? (await stripe.invoices.list({ customer: customerId, limit: 100 })).data.length
                : 0

            return {
                items: invoices.data.map((inv) => ({
                    id: inv.id,
                    status: inv.status ?? 'unknown',
                    subtotalAmount: inv.subtotal ?? 0,
                    discountAmount: (inv.total_discount_amounts?.[0]?.amount ?? 0),
                    totalAmount: inv.total ?? 0,
                    taxAmount: inv.tax ?? 0,
                    currency: inv.currency ?? 'usd',
                    billingReason: inv.billing_reason ?? '',
                    productName: inv.lines?.data?.[0]?.description ?? null,
                    productId: inv.lines?.data?.[0]?.price?.product as string ?? null,
                    subscriptionId: inv.subscription as string ?? null,
                    discountName: null,
                    createdAt: new Date(inv.created * 1000).toISOString()
                })),
                totalCount,
                maxPage: Math.max(1, Math.ceil(totalCount / limit))
            }
        } catch {
            return { items: [], totalCount: 0, maxPage: 1 }
        }
    }
}

export default orders