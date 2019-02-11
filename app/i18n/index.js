import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getDefaultLanguage } from '../utils/api.electron'
import { SUPPORTED_LANGS } from './locales'
import isDev from 'electron-is-dev'

// Import locales.
let resources = {}
SUPPORTED_LANGS.forEach(lang => {
  resources[lang.code] = require('./locales/' + lang.path).default
})

i18n.use(initReactI18next).init({
  lng: getDefaultLanguage(),
  debug: isDev,
  resources: resources
})
export default i18n
