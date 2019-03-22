import { ACTIONS } from '../../constants/actions'
import { SETTINGS_STATUS } from '../../constants/settingsStatus'
import i18n from '../../i18n'
import { setDefaultLanguage } from '../../utils/api.electron'
import logger from 'electron-log'
import { Map } from 'immutable'

const INITIAL_STATE = Map({
  settingsStatus: SETTINGS_STATUS.READY
})

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.SAVE_SETTINGS:
      try {
        for (let setting in action.payload) {
          if (setting === 'language') {
            const newLang = action.payload[setting]
            i18n.changeLanguage(newLang)
            setDefaultLanguage(newLang)
          } else {
            logger.warn('Setting is not supported: ' + setting)
          }
        }
        return state.set('settingsStatus', SETTINGS_STATUS.SETTINGS_SAVE_SUCCESS)
      } catch (err) {
        logger.error(JSON.stringify(err))
        return state.set('settingsStatus', SETTINGS_STATUS.SETTINGS_SAVE_FAIL)
      }
    case ACTIONS.SET_READY_STATUS:
      return state.set('settingsStatus', SETTINGS_STATUS.READY)
    default:
      return state
  }
}
