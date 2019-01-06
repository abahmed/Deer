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
import pl from './../assets/locales/pl'
import ptBr from './../assets/locales/pt_br'
import cs from './../assets/locales/cs'

i18n.use(reactI18nextModule).init({
  lng: getDefaultLanguage(),
  fallbackLng: FALLBACK_LANG,
  debug: isDev,
  resources: {
    en,
    ar,
    es,
    ru,
    pl,
    'pt': ptBr,
    cs
  }
})

export default i18n
