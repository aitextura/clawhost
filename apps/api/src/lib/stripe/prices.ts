import type { CacheEntry } from '@/ts/Interfaces'
import type { PolarPriceMap } from '@/ts/Types'

import getStripeClient from '@/lib/stripe/getStripeClient'

const PRICE_CACHE_TTL = 60 * 60 * 1000

let priceCache: CacheEntry<PolarPriceMap> | null = null

const STRIPE_TO_PLAN: Record<string, { provider: string; planId: string }> = {
    'CX23': { provider: 'hetzner', planId: 'cx23' },
    'CX33': { provider: 'hetzner', planId: 'cx33' },
    'CX43': { provider: 'hetzner', planId: 'cx43' },
    'CX53': { provider: 'hetzner', planId: 'cx53' },
    'CPX11': { provider: 'hetzner', planId: 'cpx11' },
    'CPX21': { provider: 'hetzner', planId: 'cpx21' },
    'CPX31': { provider: 'hetzner', planId: 'cpx31' },
    'CPX41': { provider: 'hetzner', planId: 'cpx41' },
    'CPX51': { provider: 'hetzner', planId: 'cpx51' },
    'CAX11': { provider: 'hetzner', planId: 'cax11' },
    'CAX21': { provider: 'hetzner', planId: 'cax21' },
    'CAX31': { provider: 'hetzner', planId: 'cax31' },
    'CAX41': { provider: 'hetzner', planId: 'cax41' },
    'CCX13': { provider: 'hetzner', planId: 'ccx13' },
    'CCX23': { provider: 'hetzner', planId: 'ccx23' },
    'CCX33': { provider: 'hetzner', planId: 'ccx33' },
    'CCX43': { provider: 'hetzner', planId: 'ccx43' },
    'CCX53': { provider: 'hetzner', planId: 'ccx53' },
    'CCX63': { provider: 'hetzner', planId: 'ccx63' }
}

const fetchPricesFromStripe = async (): Promise<PolarPriceMap> => {
    const stripe = getStripeClient()
    const priceMap: PolarPriceMap = {}

    const priceIds: { priceId: string; provider: string; planId: string }[] = []

    for (const [key, value] of Object.entries(process.env)) {
        if (!key.startsWith('STRIPE_PRICE_') || !value?.trim()) continue

        const slug = key.slice('STRIPE_PRICE_'.length)
        const plan = STRIPE_TO_PLAN[slug]
        if (plan) {
            priceIds.push({ priceId: value.trim(), ...plan })
        }
    }

    const results = await Promise.all(
        priceIds.map(async ({ priceId, provider, planId }) => {
            try {
                const price = await stripe.prices.retrieve(priceId)
                const amount = (price.unit_amount ?? 0) / 100
                return { provider, planId, amount }
            } catch {
                return null
            }
        })
    )

    for (const result of results) {
        if (!result) continue
        if (!priceMap[result.provider]) {
            priceMap[result.provider] = {}
        }
        priceMap[result.provider][result.planId] = result.amount
    }

    return priceMap
}

const getStripePlanPrices = async (): Promise<PolarPriceMap> => {
    if (priceCache && Date.now() < priceCache.expiry) {
        return priceCache.data
    }

    const prices = await fetchPricesFromStripe()
    priceCache = { data: prices, expiry: Date.now() + PRICE_CACHE_TTL }
    return prices
}

export default getStripePlanPrices