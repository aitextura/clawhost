import type { TranslationKey } from './types'

import state from './state'
import { applyBrandOverlay } from './overlays'

const BRAND_ID = (
    typeof process !== 'undefined'
        ? process.env.BRAND || process.env.VITE_BRAND
        : (import.meta as unknown as Record<string, Record<string, string>>)
              .env?.VITE_BRAND
) as 'clawds' | 'openclaw' | undefined

function getNestedValue(obj: unknown, path: string): string {
    const keys = path.split('.')
    let current: unknown = obj

    for (const key of keys) {
        if (current === null || current === undefined) {
            return path
        }
        if (typeof current === 'object' && key in current) {
            current = (current as Record<string, unknown>)[key]
        } else {
            return path
        }
    }

    return typeof current === 'string' ? current : path
}

function t(
    key: TranslationKey,
    params?: Record<string, string | number>
): string {
    const base = state.languages[state.currentLanguage]
    const translations = applyBrandOverlay(
        state.currentLanguage,
        base,
        BRAND_ID || 'openclaw'
    )
    let value = getNestedValue(translations, key)

    if (params) {
        for (const [paramKey, paramValue] of Object.entries(params)) {
            value = value.replace(
                new RegExp(`{{${paramKey}}}`, 'g'),
                String(paramValue)
            )
        }
    }

    return value
}

export default t