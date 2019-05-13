import { ACTIONS } from '../../constants/actions'
import logger from 'electron-log'
import { Map, merge } from 'immutable'

const INITIAL_STATE = Map({
  notes: {},
  selectedNoteID: ACTIONS.NOT_SELECTED_NOTE,
  searchNotes: []
})

const createNote = (title, content, modified, rev) => {
  return {
    title: title,
    content: content,
    modified: modified || '',
    rev: rev || ''
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.NOTES_FETCH_SUCCESS:
      let notes = {}
      action.payload.forEach(note => {
        notes[note.doc._id] = createNote(
          note.doc.title,
          note.doc.content,
          note.doc.modified,
          note.doc._rev
        )
      })
      return state.set('notes', merge(state.get('notes'), notes))
    case ACTIONS.SET_SELECTED_NOTE_ID:
      const noteID = action.payload
      if (noteID === state.get('selectedNoteID')) {
        return state
      }
      else if (noteID === ACTIONS.NOT_SELECTED_NOTE &&
          state.get('selectedNoteID') !== ACTIONS.NOT_SELECTED_NOTE) {
        return state.set('selectedNoteID', ACTIONS.NOT_SELECTED_NOTE)
      }
      else if (!state.get('notes').hasOwnProperty(noteID)) {
        logger.error('Selected note with invalid id: ' + noteID)
        return state
      }
      return state.set('selectedNoteID', noteID)
    case ACTIONS.ADD_NOTE:
      const newNote = action.payload
      if (state.get('notes').hasOwnProperty(newNote.id)) {
        logger.error('This note already exists: ' + newNote.id)
        return state
      }
      return state.setIn(['notes', newNote.id], createNote(
        newNote.title,
        newNote.content,
        newNote.modified,
        newNote.rev
      ))
    case ACTIONS.EDIT_SELECTED_NOTE:
      const selectedNoteID = state.get('selectedNoteID')
      if (selectedNoteID === ACTIONS.NOT_SELECTED_NOTE) {
        logger.error('There is no selected note')
        return state
      }
      const note = state.get('notes')[selectedNoteID]
      const newValues = action.payload
      if (newValues.content === note.content) {
        return state
      }
      return state.setIn(['notes', state.get('selectedNoteID')], createNote(
        newValues.title,
        newValues.content,
        newValues.modified,
        note.rev
      ))
    case ACTIONS.UPDATE_SELECTED_NOTE_REV:
      if (state.get('selectedNoteID') === ACTIONS.NOT_SELECTED_NOTE) {
        logger.error('There is no selected note')
        return state
      }
      return state.setIn(['notes', state.get('selectedNoteID'), 'rev'],
                         action.payload)
    case ACTIONS.DELETE_SELECTED_NOTE:
      if (state.get('selectedNoteID') === ACTIONS.NOT_SELECTED_NOTE) {
        logger.error('There is no selected note')
        return state
      }
      return state.removeIn(['notes', state.get('selectedNoteID')])
                  .set('selectedNoteID', ACTIONS.NOT_SELECTED_NOTE)
    case ACTIONS.NOTES_SEARCH_UPDATE:
      let searchNotes = []
      action.payload.forEach(note => {
        searchNotes.push(note.id)
      })
      if (state.get('searchNotes') === searchNotes)
        return state

      return state.set('searchNotes', searchNotes)
    default:
      return state
  }
}
