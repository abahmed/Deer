import electron from 'electron'
import i18n from 'i18next'
import { reactI18nextModule } from 'react-i18next'

// Importing languages
import en from './../assets/locales/en'
import ar from './../assets/locales/ar'

const isDev = require('electron-is-dev')

const FALLBACK_LANG = 'en'

// fetching electron store object
let electronStore = electron.remote.getGlobal('electronStore')

// Set fallback language as default if preference is not set.
if (!electronStore.has('general.language')) {
  electronStore.set('general.language', FALLBACK_LANG)
}

const defaultLanguage = electronStore.get('general.language')

i18n.use(reactI18nextModule).init({
  lng: defaultLanguage,
  fallbackLng: FALLBACK_LANG,
  debug: isDev,
  resources: {
    en,
    ar
  }
})

export default i18n
