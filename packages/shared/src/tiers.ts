export type TierId = 'starter' | 'pro' | 'business'

export interface TierConfig {
    id: TierId
    name: string
    priceMonthly: number
    vcpu: number
    ramGb: number
    diskGb: number
    includedAiCreditCents: number
    features: string[]
    sshAccess: boolean
    providerPlans: Record<string, string>
}

export const AI_MARKUP_MULTIPLIER = 5

export const TIERS: Record<TierId, TierConfig> = {
    starter: {
        id: 'starter',
        name: 'Starter',
        priceMonthly: 2000,
        vcpu: 2,
        ramGb: 4,
        diskGb: 40,
        includedAiCreditCents: 0,
        features: ['web_terminal'],
        sshAccess: false,
        providerPlans: {
            hetzner: 'cx23',
            hetznerFallback: 'cpx21',
            digitalocean: 's-2vcpu-4gb',
            vultr: 'vc2-2c-4gb',
            contabo: 'V45'
        }
    },
    pro: {
        id: 'pro',
        name: 'Pro',
        priceMonthly: 6500,
        vcpu: 4,
        ramGb: 8,
        diskGb: 80,
        includedAiCreditCents: 0,
        features: ['web_terminal', 'ssh', 'priority_provisioning'],
        sshAccess: true,
        providerPlans: {
            hetzner: 'cx33',
            hetznerFallback: 'cpx31',
            digitalocean: 's-4vcpu-8gb',
            vultr: 'vc2-4c-8gb',
            contabo: 'V47'
        }
    },
    business: {
        id: 'business',
        name: 'Business',
        priceMonthly: 19500,
        vcpu: 8,
        ramGb: 16,
        diskGb: 160,
        includedAiCreditCents: 0,
        features: ['web_terminal', 'ssh', 'priority_provisioning', 'priority_support'],
        sshAccess: true,
        providerPlans: {
            hetzner: 'cx43',
            hetznerFallback: 'cpx41',
            digitalocean: 's-8vcpu-16gb',
            vultr: 'vc2-8c-16gb',
            contabo: 'V49'
        }
    }
}

export const TOKEN_PACKS = [
    { priceCents: 500, label: '$5' },
    { priceCents: 1500, label: '$15' },
    { priceCents: 5000, label: '$50' }
] as const

export const TIER_IDS = Object.keys(TIERS) as TierId[]

export function getTierById(id: string): TierConfig | undefined {
    return TIERS[id as TierId]
}

export function getTierByProviderPlan(planId: string): TierConfig | undefined {
    for (const tier of Object.values(TIERS)) {
        for (const providerPlan of Object.values(tier.providerPlans)) {
            if (providerPlan === planId) return tier
        }
    }
    return undefined
}