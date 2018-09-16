import { ACTIONS } from '../constants/actions'

const INITIAL_STATE = {
  isNewNoteDisabled: false,
  isSaveDisabled: true,
  isDeleteDisabled: true
}

const _updateNoteState = (state, field, newValue) => {
  // Just return the state as there is no change in isNewNoteDisabled flag.
  if (state[field] === newValue) { return state }

  return {
    ...state,
    [field]: newValue
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_NEW_NOTE_STATE:
      return _updateNoteState(state, 'isNewNoteDisabled', action.payload)
    case ACTIONS.UPDATE_SAVE_NOTE_STATE:
      return _updateNoteState(state, 'isSaveDisabled', action.payload)
    case ACTIONS.UPDATE_DELETE_NOTE_STATE:
      return _updateNoteState(state, 'isDeleteDisabled', action.payload)
    default:
      return state
  }
}
