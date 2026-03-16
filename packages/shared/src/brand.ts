export type BrandId = 'openclaw' | 'clawds'

export interface BrandConfig {
    id: BrandId
    name: string
    domain: string
    supportEmail: string
    socialLinks: {
        twitter: string
        github: string
    }
    theme: {
        primaryColor: string
        accentColor: string
    }
    features: {
        simplifiedPurchase: boolean
        showProviderChoice: boolean
        showBlog: boolean
        showProductHunt: boolean
        showRevenue: boolean
        showGo: boolean
        showComparison: boolean
        showSelfHosting: boolean
    }
    payment: {
        provider: 'stripe' | 'polar'
        defaultTier: string
        defaultProvider: string
        defaultLocation: string
    }
}

const OPENCLAW_BRAND: BrandConfig = {
    id: 'openclaw',
    name: 'ClawHost',
    domain: 'clawhost.cloud',
    supportEmail: 'support@clawhost.cloud',
    socialLinks: {
        twitter: 'https://x.com/clawhost',
        github: 'https://github.com/bfzli/clawhost'
    },
    theme: {
        primaryColor: '#4ecdc4',
        accentColor: '#556270'
    },
    features: {
        simplifiedPurchase: false,
        showProviderChoice: true,
        showBlog: true,
        showProductHunt: true,
        showRevenue: true,
        showGo: true,
        showComparison: true,
        showSelfHosting: true
    },
    payment: {
        provider: 'polar',
        defaultTier: 'starter',
        defaultProvider: 'hetzner',
        defaultLocation: 'fsn1'
    }
}

const CLAWDS_BRAND: BrandConfig = {
    id: 'clawds',
    name: 'Clawds',
    domain: 'clawds.io',
    supportEmail: 'support@clawds.io',
    socialLinks: {
        twitter: 'https://x.com/clawds_io',
        github: 'https://github.com/aitextura/clawhost'
    },
    theme: {
        primaryColor: '#4ecdc4',
        accentColor: '#2c3e50'
    },
    features: {
        simplifiedPurchase: true,
        showProviderChoice: false,
        showBlog: false,
        showProductHunt: false,
        showRevenue: false,
        showGo: false,
        showComparison: false,
        showSelfHosting: false
    },
    payment: {
        provider: 'stripe',
        defaultTier: 'starter',
        defaultProvider: 'hetzner',
        defaultLocation: 'fsn1'
    }
}

const BRANDS: Record<BrandId, BrandConfig> = {
    openclaw: OPENCLAW_BRAND,
    clawds: CLAWDS_BRAND
}

const BRAND_ID = (() => {
    try {
        if (typeof process !== 'undefined' && process?.env) {
            return process.env.BRAND || process.env.VITE_BRAND
        }
    } catch { /* browser */ }
    try {
        return (import.meta as unknown as Record<string, Record<string, string>>)
            .env?.VITE_BRAND
    } catch { /* node */ }
    return 'openclaw'
})() as BrandId

export const brand: BrandConfig = BRANDS[BRAND_ID] || OPENCLAW_BRAND

export function getBrand(): BrandConfig {
    return brand
}

export function isClawds(): boolean {
    return brand.id === 'clawds'
}

export function isOpenClaw(): boolean {
    return brand.id === 'openclaw'
}
