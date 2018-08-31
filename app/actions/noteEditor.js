import { createAction } from 'redux-actions'
import { ACTIONS } from '../constants/actions'

// Used for updating editor state.
export const updateEditorState = createAction(ACTIONS.UPDATE_EDITOR_STATE)
