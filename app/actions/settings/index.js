import { createAction } from 'redux-actions'
import { ACTIONS } from '../../constants/actions'

// Used for saving and applying new settings.
export const saveSettings = createAction(ACTIONS.SAVE_SETTINGS)

// Used for settings status to Ready (usually, used when component is
// unmounted).
export const setReadyStatus = createAction(ACTIONS.SET_READY_STATUS)
