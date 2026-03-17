import type { Plugin } from 'vite'

const BRAND_REPLACEMENTS: [RegExp, string][] = [
    [/ClawHost/g, 'Clawds'],
    [/clawhost\.cloud/g, 'clawds.io'],
    [/clawhost/g, 'clawds']
]

const viteMdxBrand = (): Plugin => {
    let brandId: string

    return {
        name: 'vite-mdx-brand',
        enforce: 'pre',

        configResolved(config) {
            brandId = config.env?.VITE_BRAND || 'openclaw'
        },

        transform(code: string, id: string) {
            if (brandId !== 'clawds') return null
            if (!id.split('?')[0].endsWith('.mdx')) return null

            let result = code
            for (const [pattern, replacement] of BRAND_REPLACEMENTS) {
                result = result.replace(pattern, replacement)
            }

            if (result === code) return null

            return {
                code: result,
                map: null
            }
        }
    }
}

export default viteMdxBrand