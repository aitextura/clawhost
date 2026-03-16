import { brand } from '@openclaw/shared'

const getBaseDomain = (): string => {
    const hostname = window.location.hostname
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return brand.domain
    }
    return hostname
}

export default getBaseDomain