export type TierId = 'starter' | 'pro' | 'business'

export interface TierConfig {
    id: TierId
    name: string
    priceMonthly: number // USD cents
    vcpu: number
    ramGb: number
    diskGb: number
    tokenLimitDaily: number
    features: string[]
    sshAccess: boolean
    providerPlans: Record<string, string>
}

export const TIERS: Record<TierId, TierConfig> = {
    starter: {
        id: 'starter',
        name: 'Starter',
        priceMonthly: 1500, // $15
        vcpu: 2,
        ramGb: 4,
        diskGb: 40,
        tokenLimitDaily: 100_000,
        features: ['web_terminal'],
        sshAccess: false,
        providerPlans: {
            hetzner: 'cx22',
            digitalocean: 's-2vcpu-4gb',
            vultr: 'vc2-2c-4gb',
        },
    },
    pro: {
        id: 'pro',
        name: 'Pro',
        priceMonthly: 4900, // $49
        vcpu: 4,
        ramGb: 8,
        diskGb: 80,
        tokenLimitDaily: 500_000,
        features: ['web_terminal', 'ssh', 'priority_provisioning'],
        sshAccess: true,
        providerPlans: {
            hetzner: 'cx32',
            digitalocean: 's-4vcpu-8gb',
            vultr: 'vc2-4c-8gb',
        },
    },
    business: {
        id: 'business',
        name: 'Business',
        priceMonthly: 14900, // $149
        vcpu: 8,
        ramGb: 16,
        diskGb: 160,
        tokenLimitDaily: 2_000_000,
        features: ['web_terminal', 'ssh', 'priority_provisioning', 'priority_support'],
        sshAccess: true,
        providerPlans: {
            hetzner: 'cx42',
            digitalocean: 's-8vcpu-16gb',
            vultr: 'vc2-8c-16gb',
        },
    },
}

export const TOKEN_PACKS = [
    { amount: 50_000, priceCents: 500, label: '50K' },
    { amount: 200_000, priceCents: 1500, label: '200K' },
    { amount: 1_000_000, priceCents: 5000, label: '1M' },
] as const

export const TIER_IDS = Object.keys(TIERS) as TierId[]

export function getTierById(id: string): TierConfig | undefined {
    return TIERS[id as TierId]
}
