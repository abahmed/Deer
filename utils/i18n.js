import i18n from 'i18next'
import { reactI18nextModule } from 'react-i18next'
import { getDefaultLanguage } from './api.electron'
import { FALLBACK_LANG } from '../app/constants/i18n'
import isDev from 'electron-is-dev'

// Importing languages
import en from './../assets/locales/en'
import ar from './../assets/locales/ar'
import es from './../assets/locales/es'
import ru from './../assets/locales/ru'

i18n.use(reactI18nextModule).init({
  lng: getDefaultLanguage(),
  fallbackLng: FALLBACK_LANG,
  debug: isDev,
  resources: {
    en,
    ar,
    es,
    ru
  }
})

export default i18n
