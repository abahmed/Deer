import { createAction } from 'redux-actions'
import { ACTIONS } from './actions'

// Used for updating state of adding new note button (e.g. enabled or disabled).
export const setNewNoteDisabled = createAction(ACTIONS.UPDATE_NEW_NOTE_STATE)

// Used for updating state of save button (e.g. enabled or disabled).
export const setSaveDisabled = createAction(ACTIONS.UPDATE_SAVE_NOTE_STATE)

// Used for updating state of deleting note button (e.g. enabled or disabled).
export const setDeleteDisabled = createAction(ACTIONS.UPDATE_DELETE_NOTE_STATE)
