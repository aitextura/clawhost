import type { Plugin } from 'vite'

const CLAWDS_REPLACEMENTS: [string, string][] = [
    ['Deploy OpenClaw. One click. Done. - ClawHost',
        'Deploy AI Agents. One Click. Done. - Clawds'],
    ['Deploy OpenClaw on your own VPS with one click. Self-hostable cloud hosting with full root access, global locations, and transparent pricing.',
        'Deploy AI agents in the cloud with one click. Dedicated servers, full root access, global locations, and transparent pricing.'],
    ['"ClawHost"', '"Clawds"'],
    ['@claw_host', '@clawds_io'],
    ['cdn.clawhost.cloud', 'cdn.clawds.io'],
    ['auth.clawhost.cloud', 'auth.clawds.io'],
    ['api.clawhost.cloud', 'api.clawds.io'],
    ['https://clawhost.cloud', 'https://clawds.io'],
    ["'clawhost.cloud'", "'clawds.io'"]
]

const viteBrandHtml = (): Plugin => {
    let brandId: string

    return {
        name: 'vite-brand-html',
        configResolved(config) {
            brandId = config.env?.VITE_BRAND || 'openclaw'
        },
        transformIndexHtml(html) {
            if (brandId !== 'clawds') return html

            let result = html
            for (const [from, to] of CLAWDS_REPLACEMENTS) {
                while (result.includes(from)) {
                    result = result.replace(from, to)
                }
            }
            return result
        }
    }
}

export default viteBrandHtml