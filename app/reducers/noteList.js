import { ACTIONS } from '../constants/actions'

const INITIAL_STATE = {
  activeNote: '',
  notes: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_NOTE_LIST:
      return {
        ...state,
        notes: action.payload.map(note => note.doc)
      }
    case ACTIONS.SET_ACTIVE_NOTE:
      return {
        ...state,
        activeNote: action.payload
      }
    default:
      return state
  }
}
