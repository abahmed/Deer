import { ACTIONS } from '../constants/actions'

const INITIAL_STATE = {
  notes: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_NOTE_LIST:
      return {
        ...state,
        notes: action.payload.map(note => note.doc)
      }
    default:
      return state
  }
}
