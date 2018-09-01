import { createAction } from 'redux-actions'
import { ACTIONS } from '../constants/actions'
import { fetchNotes } from './../db'

// Used for adding a new note.
export const addNewNote = createAction(ACTIONS.ADD_NOTE)

// Used for updating noteList with fetched notes from database.
export const updateNoteList = createAction(ACTIONS.UPDATE_NOTE_LIST)

// Used for setting the index of selected note.
export const setActiveNoteIndex = createAction(ACTIONS.SET_ACTIVE_NOTE_INDEX)

// Used for updating title of active note.
export const updateNoteTitle = createAction(ACTIONS.UPDATE_NOTE_TITLE)

// Used for updating state of active note.
export const updateActiveNoteState =
  createAction(ACTIONS.UPDATE_ACTIVE_NOTE_STATE)

// Used for fetching all notes from database.
export const fetchAllNotes = () => (dispatch, getState) => {
  fetchNotes().then((result) => {
    // Update only if there are notes.
    if (result.total_rows > 0) {
      dispatch(updateNoteList(result.rows))
    }
  }).catch((err) => {
    console.error(err)
  })
}
