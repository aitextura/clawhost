import { brand, isClawds } from '@openclaw/shared'

const CDN_URL = process.env.CDN_URL || 'https://cdn.clawhost.cloud'

const CDN_ASSETS = {
    LOGO: isClawds()
        ? `https://cdn.${brand.domain}/assets/clawds-logo.png`
        : `${CDN_URL}/assets/clawhost-logo.png`,
    LOGO_DARK: isClawds()
        ? `https://cdn.${brand.domain}/assets/clawds-logo-dark.png`
        : `${CDN_URL}/assets/clawhost-logo-dark.png`,
    LOGO_LIGHT: isClawds()
        ? `https://cdn.${brand.domain}/assets/clawds-logo-light.png`
        : `${CDN_URL}/assets/clawhost-logo-light.png`,
    CHANGELOG_GIF: `${CDN_URL}/assets/changelog-celebration.gif`
}

export default CDN_ASSETS