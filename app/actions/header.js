import { createAction } from 'redux-actions'
import { ACTIONS } from '../constants/actions'

// Used for updating state of adding new note button (e.g. enabled or disabled).
export const setNewNoteDisabled = createAction(ACTIONS.UPDATE_NEW_NOTE_STATE)
