import type { Translations } from '../types'
import clawdsDe from './clawds-de'
import clawdsEn from './clawds-en'
import clawdsEs from './clawds-es'
import clawdsFr from './clawds-fr'
import clawdsRu from './clawds-ru'

type BrandId = 'openclaw' | 'clawds'

const overlays: Record<string, Record<string, unknown>> = {
    de: clawdsDe,
    en: clawdsEn,
    es: clawdsEs,
    fr: clawdsFr,
    ru: clawdsRu,
}

function deepMerge(
    base: Record<string, unknown>,
    patch: Record<string, unknown>
): Record<string, unknown> {
    const result = { ...base }
    for (const key of Object.keys(patch)) {
        if (
            patch[key] !== null &&
            typeof patch[key] === 'object' &&
            !Array.isArray(patch[key]) &&
            typeof result[key] === 'object' &&
            result[key] !== null
        ) {
            result[key] = deepMerge(
                result[key] as Record<string, unknown>,
                patch[key] as Record<string, unknown>
            )
        } else {
            result[key] = patch[key]
        }
    }
    return result
}

/**
 * Apply brand overlay on top of base translations.
 * Returns translations unchanged if brandId is not 'clawds'.
 * Falls back to English overlay if the requested language is not available.
 */
export function applyBrandOverlay(
    lang: string,
    translations: Translations,
    brandId: BrandId = 'openclaw'
): Translations {
    if (brandId !== 'clawds') return translations

    const overlay = overlays[lang] ?? overlays['en']
    if (!overlay) return translations

    return deepMerge(
        translations as unknown as Record<string, unknown>,
        overlay
    ) as unknown as Translations
}