import { ACTIONS } from '../../constants/actions'
import logger from 'electron-log'
import { Map, merge } from 'immutable'

const INITIAL_STATE = Map({
  noteBooks: {},
  noteBookNotes: {},
  noteBookIsOpened: false,
  activeNoteBookID: ACTIONS.NOT_ACTIVE_NOTE_BOOK,
  selectedNoteBookID: ACTIONS.NOT_SELECTED_NOTE_BOOK
})

const createNoteBook = (name, noteIDs, modified, rev) => {
  return {
    name: name,
    noteIDs: noteIDs,
    modified: modified || '',
    rev: rev || ''
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.NOTE_BOOKS_FETCH_SUCCESS: {
      const noteBooks = {}

      action.payload.forEach(noteBook => {
        noteBooks[noteBook.doc._id] = createNoteBook(
          noteBook.doc.name,
          noteBook.doc.noteIDs,
          noteBook.doc.modified,
          noteBook.doc._rev
        )
      })
      return state.set('noteBooks', merge(state.get('noteBooks'), noteBooks))
    }
    case ACTIONS.SET_ACTIVE_NOTE_BOOK_ID: {
      const activeNoteBookID = action.payload
      if (activeNoteBookID === state.get('activeNoteBookID')) {
        return state
      } else if (
        activeNoteBookID === ACTIONS.NOT_ACTIVE_NOTE_BOOK &&
        state.get('activeNoteBookID') !== ACTIONS.NOT_ACTIVE_NOTE_BOOK
      ) {
        return state.set('activeNoteBookID', ACTIONS.NOT_ACTIVE_NOTE_BOOK)
      }
      return state.set('activeNoteBookID', activeNoteBookID)
    }
    case ACTIONS.SET_SELECTED_NOTE_BOOK_ID: {
      const noteBookID = action.payload
      if (noteBookID === state.get('selectedNoteBookID')) {
        return state
      } else if (
        noteBookID === ACTIONS.NOT_SELECTED_NOTE_BOOK &&
        state.get('selectedNoteBookID') !== ACTIONS.NOT_SELECTED_NOTE_BOOK
      ) {
        return state.set('selectedNoteBookID', ACTIONS.NOT_SELECTED_NOTE_BOOK)
      } else if (!Object.prototype.hasOwnProperty.call(state.get('noteBooks'), noteBookID)) {
        logger.error('Selected notebook with invalid id: ' + noteBookID)
        return state
      }
      return state.set('selectedNoteBookID', noteBookID)
    }
    case ACTIONS.ADD_NOTE_BOOK: {
      const newNoteBook = action.payload

      if (Object.prototype.hasOwnProperty.call(state.get('noteBooks'), newNoteBook.id)) {
        logger.error('This notebook already exists: ' + newNoteBook.id)
        return state
      }
      return state.setIn(
        ['noteBooks', newNoteBook.id],
        createNoteBook(newNoteBook.name, newNoteBook.noteIDs, newNoteBook.modified, newNoteBook.rev)
      )
    }
    case ACTIONS.DELETE_SELECTED_NOTE_BOOK: {
      if (state.get('selectedNoteBookID') === ACTIONS.NOT_SELECTED_NOTE_BOOK) {
        logger.error('There is no selected notebook')
        return state
      }
      return state
        .removeIn(['noteBooks', state.get('selectedNoteBookID')])
        .set('selectedNoteBookID', ACTIONS.NOT_SELECTED_NOTE_BOOK)
    }
    case ACTIONS.OPEN_NOTE_BOOK: {
      return state.set('noteBookIsOpened', true)
    }
    case ACTIONS.CLOSE_NOTE_BOOK: {
      return state.set('noteBookIsOpened', false)
    }
    case ACTIONS.CREATE_NOTE_LIST: {
      const noteBookNotes = {}
      const noteBooks = state.get('noteBooks')
      const activeNoteBookID = state.get('activeNoteBookID')
      const noteIDs = noteBooks[activeNoteBookID].noteIDs
      noteIDs.forEach(noteID => {
        noteBookNotes[noteID] = true
      })
      return state.set('noteBookNotes', merge(state.get('noteBookNotes'), noteBookNotes))
    }
    case ACTIONS.DELETE_NOTE_LIST: {
      return state.set('noteBookNotes', {})
    }
    case ACTIONS.ADD_NOTE_TO_NOTE_IDS: {
      const noteBooks = state.get('noteBooks')
      const activeNoteBookID = state.get('activeNoteBookID')
      const activeNoteBook = noteBooks[activeNoteBookID]
      const noteIDs = activeNoteBook.noteIDs
      const noteID = action.payload
      noteIDs.push(noteID)
      return state.setIn(
        ['noteBooks', activeNoteBookID],
        createNoteBook(activeNoteBook.name, noteIDs, activeNoteBook.modified, activeNoteBook.rev)
      )
    }
    case ACTIONS.REMOVE_NOTE_FROM_NOTE_IDS: {
      const noteBooks = state.get('noteBooks')
      const activeNoteBookID = state.get('activeNoteBookID')
      const activeNoteBook = noteBooks[activeNoteBookID]
      const noteIDs = activeNoteBook.noteIDs
      const noteID = action.payload
      return state.setIn(
        ['noteBooks', activeNoteBookID],
        createNoteBook(activeNoteBook.name, noteIDs.filter(ID => ID !== noteID), activeNoteBook.modified, activeNoteBook.rev)
      )
    }
    case ACTIONS.ADD_NOTE_TO_ACTIVE_NOTE_BOOK: {
      const newNoteID = action.payload

      if (Object.prototype.hasOwnProperty.call(state.get('noteBookNotes'), newNoteID)) {
        logger.error('This noteBookNote already exists: ' + newNoteID)
        return state
      }

      return state.setIn(['noteBookNotes', newNoteID], true)
    }
    case ACTIONS.REMOVE_NOTE_FROM_ACTIVE_NOTE_BOOK: {
      const noteID = action.payload
      return state.removeIn(['noteBookNotes', noteID])
    }
    case ACTIONS.UPDATE_ACTIVE_NOTE_BOOK_REV: {
      if (state.get('activeNoteBookID') === ACTIONS.NOT_ACTIVE_NOTE_BOOK) {
        logger.error('There is no active notebook')
        return state
      }
      return state.setIn(['noteBooks', state.get('activeNoteBookID'), 'rev'], action.payload)
    }
    case ACTIONS.UPDATE_NOTE_BOOK: {
      const {id,notebook} = action.payload
      return state.setIn(
        ['noteBooks', id],
        createNoteBook(notebook.name, notebook.noteIDs, notebook.modified, notebook.rev)
      )
    }
    default: {
      return state
    }
  }
}
