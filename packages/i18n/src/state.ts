import type { I18nState } from './types'

import en from './langs/en'
import fr from './langs/fr'
import es from './langs/es'
import de from './langs/de'
import ru from './langs/ru'

const state: I18nState = {
    languages: { en, fr, es, de, ru },
    currentLanguage: 'en'
}

export default state