import { brand, isClawds } from '@openclaw/shared'

/**
 * Brand-aware link defaults.
 * When BRAND=clawds, returns Clawds-specific URLs.
 * Otherwise returns the upstream ClawHost defaults.
 *
 * Usage:
 *   import { getBrandLinks } from '@/lib/links/brandLinks'
 *   const links = getBrandLinks()
 *   links.TWITTER_URL // → brand-specific twitter URL
 */

interface BrandLinks {
    TWITTER_URL: string
    FACEBOOK_URL: string
    INSTAGRAM_URL: string
    THREADS_URL: string
    YOUTUBE_URL: string
    TIKTOK_URL: string
    PRODUCT_HUNT_URL: string
    TUTORIAL_URL: string
    SUPPORT_EMAIL: string
    LEGAL_EMAIL: string
}

const OPENCLAW_LINKS: BrandLinks = {
    TWITTER_URL: 'https://x.com/tryclawhost',
    FACEBOOK_URL: 'https://facebook.com/tryclawhost',
    INSTAGRAM_URL: 'https://instagram.com/tryclawhost',
    THREADS_URL: 'https://threads.net/@tryclawhost',
    YOUTUBE_URL: 'https://youtube.com/@clawhost',
    TIKTOK_URL: 'https://tiktok.com/@clawhost',
    PRODUCT_HUNT_URL: 'https://www.producthunt.com/posts/clawhost',
    TUTORIAL_URL: 'https://www.youtube.com/watch?v=clawhost-tutorial',
    SUPPORT_EMAIL: 'mailto:support@clawhost.cloud',
    LEGAL_EMAIL: 'mailto:legal@clawhost.cloud',
}

const CLAWDS_LINKS: BrandLinks = {
    TWITTER_URL: brand.socialLinks.twitter,
    FACEBOOK_URL: 'https://facebook.com/aitextura',
    INSTAGRAM_URL: 'https://instagram.com/aitextura',
    THREADS_URL: 'https://threads.net/@aitextura',
    YOUTUBE_URL: 'https://youtube.com/@aitextura',
    TIKTOK_URL: 'https://tiktok.com/@aitextura',
    PRODUCT_HUNT_URL: 'https://www.producthunt.com/posts/aitextura-openclaw',
    TUTORIAL_URL: 'https://www.youtube.com/watch?v=aitextura-openclaw-tutorial',
    SUPPORT_EMAIL: `mailto:${brand.supportEmail}`,
    LEGAL_EMAIL: `mailto:legal@${brand.domain}`,
}

const brandLinks: BrandLinks = isClawds() ? CLAWDS_LINKS : OPENCLAW_LINKS

export function getBrandLinks(): BrandLinks {
    return brandLinks
}

export type { BrandLinks }
export default brandLinks