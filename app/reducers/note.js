import uuidv4 from 'uuid/v4'
import { EditorState } from 'draft-js'
import { ACTIONS } from '../constants/actions'

const INITIAL_STATE = {
  activeNoteIndex: -1,
  activeNoteState: EditorState.createEmpty(),
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
            title: note.doc.content
          }
        })
      }
    case ACTIONS.SET_ACTIVE_NOTE_INDEX:
      return {
        ...state,
        activeNoteIndex: action.payload
      }
    case ACTIONS.ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, {
          id: uuidv4(),
          title: ''
        }],
        activeNoteIndex: state.notes.length,
        activeNoteState: EditorState.createEmpty()
      }
    case ACTIONS.UPDATE_NOTE_TITLE:
      // Just return state as there is no active note.
      if (state.activeNoteIndex < 0 ||
          state.activeNoteIndex >= state.notes.length) {
        console.warn('UPDATE_NOTE_TITLE action is fired with out of range' +
                     ' activeNoteIndex')
        return state
      }

      const newTitle = action.payload
      const currentNote = Object.create(state.notes[state.activeNoteIndex])

      // Just return the state if there is not a new list.
      if (currentNote.title === newTitle) { return state }

      currentNote.title = newTitle
      return {
        ...state,
        notes: [
          ...state.notes.slice(0, state.activeNoteIndex),
          currentNote,
          ...state.notes.slice(state.activeNoteIndex + 1)
        ]
      }
    case ACTIONS.UPDATE_ACTIVE_NOTE_STATE:
      return {
        ...state,
        activeNoteState: action.payload
      }
    default:
      return state
  }
}
