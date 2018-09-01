import { createAction } from 'redux-actions'
import { ACTIONS } from '../constants/actions'

// Used for updating visibility of save modal.
export const toggleSaveModal = createAction(ACTIONS.TOGGLE_SAVE_MODAL)
