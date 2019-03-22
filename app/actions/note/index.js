import { createAction } from 'redux-actions'
import { ACTIONS } from '../../constants/actions'
import { addNote, fetchNotes, removeNote } from '../../utils/db'
import logger from 'electron-log'

/** Used for adding a new note. */
const addNewNote = createAction(ACTIONS.ADD_NOTE)

/** Used for updating notes with fetched notes from database. */
const updateNotesList = createAction(ACTIONS.NOTES_FETCH_SUCCESS)

/** Used for setting the index of selected note. */
const setSelectedNoteID = createAction(ACTIONS.SET_SELECTED_NOTE_ID)

/** Used for updating title, content and modified values for the selected note. */
const editSelectedNote = createAction(ACTIONS.EDIT_SELECTED_NOTE)

/** Used for updating rev of the selected note. */
const updateSelectedNoteRev = createAction(ACTIONS.UPDATE_SELECTED_NOTE_REV)

/** Used for deleting a note from noteList. */
const deleteSelectedNote = createAction(ACTIONS.DELETE_SELECTED_NOTE)

/** Async method, Used for fetching all notes from database. */
const fetchAllNotes = () => (dispatch) => {
  fetchNotes().then((result) => {
    // Update only if there are notes.
    if (result.total_rows > 0) {
      dispatch(updateNotesList(result.rows))
    }
  }).catch((err) => {
    logger.error('Unable to fetch notes: ' + JSON.stringify(err))
  })
}

/**
 * Async method, used for saving note to database.
 */
const createNote = () => (dispatch) => {
  const modified = Date.now()
  addNote(undefined, undefined, undefined, modified).then((result) => {
    if (result.ok) {
      dispatch(addNewNote({
        id: result.id,
        rev: result.rev,
        title: '',
        content: '',
        modified: modified
      }))
      dispatch(setSelectedNoteID(result.id))
    }
  }).catch((err) => {
    logger.error('Unable to add new note: ' + JSON.stringify(err))
  })
}

/**
 * Async method, used for updating note in database.
 */
const saveSelectedNote = () => (dispatch, getState) => {
  const state = getState().noteReducer
  const selectedNoteID = state.get('selectedNoteID')
  const selectedNote = state.get('notes')[selectedNoteID]
  addNote(
    selectedNoteID,
    selectedNote.title,
    selectedNote.content,
    selectedNote.modified,
    selectedNote.rev
  ).then((result) => {
    if (result.ok) {
      // Update note rev to avoid conflicts while the next time for saving
      // this note.
      dispatch(updateSelectedNoteRev(result.rev))
    }
  }).catch((err) => {
    logger.error('Unable to update note: ' + JSON.stringify(err))
  })
}


/** Async method, used for removing active note from database. */
const removeSelectedNote = () => (dispatch, getState) => {
  const state = getState().noteReducer
  const selectedNoteID = state.get('selectedNoteID')
  const selectedNote = state.get('notes')[selectedNoteID]
  removeNote(selectedNoteID, selectedNote.rev).then((result) => {
    dispatch(deleteSelectedNote())
  }).catch((err) => {
    logger.error('Unable to remove note ' + JSON.stringify(err))
  })
}

export {
  updateNotesList,
  addNewNote,
  setSelectedNoteID,
  editSelectedNote,
  updateSelectedNoteRev,
  fetchAllNotes,
  createNote,
  saveSelectedNote,
  deleteSelectedNote,
  removeSelectedNote
}
