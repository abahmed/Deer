import { createAction } from 'redux-actions'
import { ACTIONS } from '../constants/actions'
import { NOTE_STATUS } from '../constants/noteStatus'
import { addNote, fetchNotes } from './../db'
import { convertToRaw } from 'draft-js'
import logger from 'electron-log'

// Used for adding a new note.
export const addNewNote = createAction(ACTIONS.ADD_NOTE)

// Used for updating noteList with fetched notes from database.
export const updateNoteList = createAction(ACTIONS.UPDATE_NOTE_LIST)

// Used for setting the index of selected note.
export const setActiveNoteIndex = createAction(ACTIONS.SET_ACTIVE_NOTE_INDEX)

// Used for updating title of the active note.
export const updateNoteTitle = createAction(ACTIONS.UPDATE_NOTE_TITLE)

// Used for updating editor's state of the active note.
export const updateActiveNoteState =
  createAction(ACTIONS.UPDATE_ACTIVE_NOTE_STATE)

// Used for updating rev of the active note.
export const updateNoteRev = createAction(ACTIONS.UPDATE_NOTE_REV)

// Used for updating status of the active note.
export const setNoteStatus = createAction(ACTIONS.SET_NOTE_STATUS)

// Async method, Used for fetching all notes from database.
export const fetchAllNotes = () => (dispatch, getState) => {
  fetchNotes().then((result) => {
    // Update only if there are notes.
    if (result.total_rows > 0) {
      dispatch(updateNoteList(result.rows))
    }
  }).catch((err) => {
    logger.error('Unable to fetch notes ' + err)
  })
}

// Helper method, Used for setting noteStatus to NOTE_SAVE_FAIL.
const _noteSaveFailed = (dispatch, err = null) => {
  dispatch(setNoteStatus(NOTE_STATUS.NOTE_SAVE_FAIL))
  logger.error('Unable to save note ' + err)
}

// Async method, Used for saving note (new or update) to database and updates
// noteStatus.
export const saveNote = () => (dispatch, getState) => {
  dispatch(setNoteStatus(NOTE_STATUS.SAVING_NOTE))
  const state = getState().noteReducer
  const noteIndex = state.activeNoteIndex
  const doc = {
    _id: state.notes[noteIndex].id,
    _rev: state.notes[noteIndex].rev,
    title: state.notes[noteIndex].title,
    content: convertToRaw(state.activeNoteState.getCurrentContent())
  }
  addNote(doc).then((result) => {
    if (result.ok) {
      // Update note rev to avoid conflicts while the next time for saving
      // this note.
      dispatch(updateNoteRev(result.rev))

      dispatch(setNoteStatus(NOTE_STATUS.NOTE_SAVE_SUCCESS))
    } else {
      _noteSaveFailed(dispatch)
    }
  }).catch((err) => _noteSaveFailed(dispatch, err))
}
