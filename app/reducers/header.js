import { ACTIONS } from '../constants/actions'

const INITIAL_STATE = {
  isNewNoteDisabled: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_NEW_NOTE_STATE:
      // Just return the state as there is no change in isNewNoteDisabled flag.
      if (state.isNewNoteDisabled === action.payload) { return state }

      return {
        ...state,
        isNewNoteDisabled: action.payload
      }
    default:
      return state
  }
}
