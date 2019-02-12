import { createAction } from 'redux-actions'
import { ACTIONS } from '../../constants/actions'
import { NOTE_STATUS } from '../../constants/noteStatus'
import { addNote, fetchNotes, getNote, removeNote } from '../../utils/db'
import logger from 'electron-log'

const services = { WAIT_UNTIL: require('../../middlewares/waitService').NAME }

// Used for adding a new note.
export const addNewNote = createAction(ACTIONS.ADD_NOTE)

// Used for updating noteList with fetched notes from database.
export const updateNoteList = createAction(ACTIONS.UPDATE_NOTE_LIST)

// Used for setting the index of selected note.
export const setActiveNoteIndex = createAction(ACTIONS.SET_ACTIVE_NOTE_INDEX)

// Used for updating title of the active note.
export const updateNoteTitle = createAction(ACTIONS.UPDATE_NOTE_TITLE)

// Used for updating editor's state of the active note.
export const updateActiveNoteContent =
  createAction(ACTIONS.UPDATE_ACTIVE_NOTE_CONTENT)

// Used for updating rev of the active note.
export const updateNoteRev = createAction(ACTIONS.UPDATE_NOTE_REV)

// Used for updating status of the active note.
export const setNoteStatus = createAction(ACTIONS.SET_NOTE_STATUS)

// Used for updating status of the active note.
export const loadNoteContent = createAction(ACTIONS.LOAD_NOTE_CONTENT)

// Used for deleting a note from noteList.
export const deleteNoteFromList = createAction(ACTIONS.DELETE_NOTE_FROM_LIST)

// Async method, Used for fetching all notes from database.
export const fetchAllNotes = () => (dispatch, getState) => {
  fetchNotes().then((result) => {
    // Update only if there are notes.
    if (result.total_rows > 0) {
      dispatch(updateNoteList(result.rows))
    }
  }).catch((err) => {
    logger.error('Unable to fetch notes ' + JSON.stringify(err))
  })
}

// Helper method, used for signaling that saveNote has finidhed running
const _saveNoteFinished = createAction(ACTIONS.SAVE_NOTE_FINISHED)

// Helper method, used for setting noteStatus to NOTE_SAVE_FAIL.
const _noteSaveFailed = (dispatch, err = null) => {
  dispatch(setNoteStatus(NOTE_STATUS.NOTE_SAVE_FAIL))
  logger.error('Unable to save note ' + JSON.stringify(err))
}

// Async method, used for saving note (new or update) to database and updates
// noteStatus.
export const saveNote = () => (dispatch, getState) => {
  dispatch(setNoteStatus(NOTE_STATUS.SAVING_NOTE))
  const state = getState().noteReducer
  const noteIndex = state.activeNoteIndex
  const doc = {
    _id: state.notes[noteIndex].id,
    _rev: state.notes[noteIndex].rev,
    title: state.notes[noteIndex].title,
    content: state.activeNoteContent
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
    dispatch(_saveNoteFinished())
  }).catch((err) => _noteSaveFailed(dispatch, err))
}

// Async method, used for getting active note content from database and loads it.
export const fetchNote = () => (dispatch, getState) => {
  setNoteStatus(NOTE_STATUS.LOADING_NOTE)
  const state = getState().noteReducer
  const noteIndex = state.activeNoteIndex
  try {
    // This is to just get the note from the db and load it's content if already saved.
    getNote(state.notes[noteIndex].id).then((result) => {
      dispatch(loadNoteContent(result.content))
      dispatch(setNoteStatus(NOTE_STATUS.NOTE_LOAD_SUCCESS))
    // Handle those new notes that are not saved yet.
    }).catch((err) => {
      if (err) {
        dispatch(setNoteStatus(NOTE_STATUS.NOTE_LOAD_SUCCESS))
      }
    })
  } catch (err) {
    if (err) {
      dispatch(setNoteStatus(NOTE_STATUS.NOTE_LOAD_FAIL))
      logger.error('Unable to get note ' + JSON.stringify(err))
    }
  }
}

// Async method, used for removing active note from database.
export const deleteNote = () => (dispatch, getState) => {
  setNoteStatus(NOTE_STATUS.DELETING_NOTE)

  const state = getState().noteReducer
  const noteIndex = state.activeNoteIndex
  try {
    // This is done just to make sure it exist before deleting it.
    getNote(state.notes[noteIndex].id).then(() => {
      removeNote(state.notes[noteIndex].id,
        state.notes[noteIndex].rev).then((result) => {
        dispatch(deleteNoteFromList(result.id))
        dispatch(setActiveNoteIndex(ACTIONS.NOT_SELECTED_NOTE))
        dispatch(setNoteStatus(NOTE_STATUS.NOTE_DELETE_SUCCESS))
      }).catch((err) => {
        dispatch(setNoteStatus(NOTE_STATUS.NOTE_DELETE_FAIL))
        logger.error('Unable to remove note ' + JSON.stringify(err))
      })
    }).catch((err) => {
      if (err) {
        dispatch(deleteNoteFromList(state.notes[noteIndex].id))
        dispatch(setActiveNoteIndex(ACTIONS.NOT_SELECTED_NOTE))
        dispatch(setNoteStatus(NOTE_STATUS.NOTE_DELETE_SUCCESS))
      }
    })
  } catch (err) {
    dispatch(setNoteStatus(NOTE_STATUS.NOTE_DELETE_FAIL))
    logger.error('Unable to remove note ' + JSON.stringify(err))
  }
}

// Async method, used for switching between notes and prompting save modal
// beforehand if needed.
export const selectNote = (selectedIndex) => (dispatch, getState) => {
  const state = getState().noteReducer
  const noteIndex = state.activeNoteIndex
  const currentNote = state.notes[noteIndex]

  // Prompts modal if current note is not saved
  if (currentNote && (!currentNote.hasOwnProperty('rev') || !currentNote.rev)) {
    // SAVE!!!! TODO
    // Waits for the right time to dispatch next actions
    dispatch({
      type: services.WAIT_UNTIL,
      predicate: action => (action.type === ACTIONS.MODAL_NO_ACTION ||
                            action.type === ACTIONS.SAVE_NOTE_FINISHED),
      run: (dispatch, getState, action) => {
        dispatch(setActiveNoteIndex(selectedIndex))
        dispatch(fetchNote(selectedIndex))
      }
    })
  } else {
    // Otherwise just sets activeNoteIndex and fetches the note
    dispatch(setActiveNoteIndex(selectedIndex))
    dispatch(fetchNote(selectedIndex))
  }
}
