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
        notes: action.payload.map(note => {
          return {
            id: note.doc._id,
            title: note.doc.content,
            isSaved: true
          }
        })
      }
    case ACTIONS.SET_ACTIVE_NOTE:
      return {
        ...state,
        activeNote: action.payload
      }
    case ACTIONS.ADD_NOTE:
      const note = {
        id: uuidv4(),
        title: '',
        isSaved: false
      }
      return {
        ...state,
        notes: [...state.notes, note],
        activeNote: note.id
      }
    case ACTIONS.UPDATE_NOTE_TITLE:
      // Just return state as there is no active note.
      if (!state.activeNote) {
        console.warn('UPDATE_NOTE_TITLE action is fired with empty activeNote')
        return state
      }

      let hasListUpdated = false
      const newTitle = action.payload
      const newNoteList = state.notes.map(note => {
        if (note.id === state.activeNote && note.title !== newTitle) {
          note.title = newTitle
          hasListUpdated = true
        }
        return note
      })
      // Just return the state if there is not a new list.
      if (!hasListUpdated) { return state }

      return {
        ...state,
        notes: newNoteList
      }
    default:
      return state
  }
}
