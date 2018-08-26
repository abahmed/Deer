import uuidv4 from 'uuid/v4'
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
    case ACTIONS.ADD_NOTE:
      const note = {
        id: uuidv4(),
        content: '',
        isSaved: false
      }
      return {
        ...state,
        notes: [...state.notes, note],
        activeNote: note.id
      }
    default:
      return state
  }
}
