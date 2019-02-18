import uuidv4 from 'uuid/v4'
import { ACTIONS } from '../../constants/actions'
import { NOTE_STATUS } from '../../constants/noteStatus'
import logger from 'electron-log'
import { Map, mergeDeep } from 'immutable'

const INITIAL_STATE = {
  activeNoteIndex: ACTIONS.NOT_SELECTED_NOTE,
  activeNoteContent: '',
  noteStatus: NOTE_STATUS.NO_OPERATION,
  notes: [],
  notesMap: Map(),
  selectedNoteId: ACTIONS.NOT_SELECTED_NOTE
}

// Helper method, updates a field with a newValue of an element in notes array
// without altering provided state if there is a change in value, otherwise
// returns provided state.
const _updateNoteEntry = (state, field, newValue) => {
  // Just return state as there is no active note.
  if (state.activeNoteIndex < 0 ||
      state.activeNoteIndex >= state.notes.length) {
    logger.warn('action is fired with out of range' +
                 ' activeNoteIndex')
    return state
  }

  const currentNote = Object.create(state.notes[state.activeNoteIndex])

  // Just return the state if there is not a change.
  if (currentNote[field] === newValue) { return state }

  currentNote[field] = newValue
  return {
    ...state,
    notes: [
      ...state.notes.slice(0, state.activeNoteIndex),
      currentNote,
      ...state.notes.slice(state.activeNoteIndex + 1)
    ]
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_NOTE_LIST:
    case ACTIONS.NOTES_FETCH_SUCCESS:
      let notes = {}
      action.payload.forEach(note => {
        notes[note.doc._id] = Map({
          title: note.doc.title,
          content: note.doc.content,
          modified: note.doc.modified || '',
          rev: note.doc._rev || ''
        })
      })
      return {
        ...state,
        notesMap: state.notesMap.merge(notes)
      }
      return {
        ...state,
        notes: action.payload.map(note => {
          return {
            id: note.doc._id,
            rev: note.doc._rev,
            title: note.doc.title
          }
        })
      }
    case ACTIONS.SET_ACTIVE_NOTE_INDEX:
      const noteId = action.payload
      if (!state.notesMap.has(noteId)) {
        logger.error('Selected note with invalid id: ' + noteId)
        return state
      }
      return {
        ...state,
        selectedNoteId: noteId
      }
      return {
        ...state,
        activeNoteIndex: action.payload
      }
    case ACTIONS.ADD_NOTE:
      return state
      return {
        ...state,
        notes: [...state.notes, {
          id: uuidv4(),
          rev: '',
          title: ''
        }],
        activeNoteIndex: state.notes.length,
        activeNoteContent: ''
      }
    case ACTIONS.UPDATE_NOTE_TITLE:
      return state
      return _updateNoteEntry(state, 'title', action.payload)
    case ACTIONS.UPDATE_NOTE_REV:
      return state
      return _updateNoteEntry(state, 'rev', action.payload)
    case ACTIONS.UPDATE_ACTIVE_NOTE_CONTENT:
      return state
      return {
        ...state,
        activeNoteContent: action.payload
      }
    case ACTIONS.SET_NOTE_STATUS:
      return state
      if (!NOTE_STATUS.hasOwnProperty(action.payload)) {
        logger.warn('Trying to set unsupported noteStatus: ' + action.payload)
        return state
      }

      return {
        ...state,
        noteStatus: action.payload
      }
    case ACTIONS.LOAD_NOTE_CONTENT:
      return state
      return {
        ...state,
        activeNoteContent: action.payload
      }
    case ACTIONS.DELETE_NOTE_FROM_LIST:
      return state
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload)
      }
    default:
      return state
  }
}
