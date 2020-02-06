import { createAction } from 'redux-actions'
import { ACTIONS } from '../../constants/actions'
import { fetchNoteBooks, addNoteBook, removeNoteBook } from '../../utils/db'
import logger from 'electron-log'

/** Used for adding a new notebook. */
const addNewNoteBook = createAction(ACTIONS.ADD_NOTE_BOOK)

/** Used for updating notebooks with fetched notebooks from database. */
const updateNoteBooksList = createAction(ACTIONS.NOTE_BOOKS_FETCH_SUCCESS)

/** Used for setting the index of active notebook. */
const setActiveNoteBookID = createAction(ACTIONS.SET_ACTIVE_NOTE_BOOK_ID)

/** Used for setting note book is opened to true . */
const openNoteBook = createAction(ACTIONS.OPEN_NOTE_BOOK)

/** Used for setting note book is opened to false . */
const closeNoteBook = createAction(ACTIONS.CLOSE_NOTE_BOOK)

/** Used for setting the index of selected notebook. */
const setSelectedNoteBookID = createAction(ACTIONS.SET_SELECTED_NOTE_BOOK_ID)

/** Used for deleting a notebook from noteBookList. */
const deleteSelectedNoteBook = createAction(ACTIONS.DELETE_SELECTED_NOTE_BOOK)

/** Used for creating a list of the active notebook's noteIDs. */
const createNoteList = createAction(ACTIONS.CREATE_NOTE_LIST)

/** Used for deleting a list of the active notebook's noteIDs. */
const deleteNoteList = createAction(ACTIONS.DELETE_NOTE_LIST)

/** Used for adding note to noteIDs. */
const addToNoteIDs = createAction(ACTIONS.ADD_NOTE_TO_NOTE_IDS)

/** Used for removing notes from noteIDs. */
const removeFromNoteIDs = createAction(ACTIONS.REMOVE_NOTE_FROM_NOTE_IDS)

/** Used for adding note to the active notebook. */
const addToActiveNoteBook = createAction(ACTIONS.ADD_NOTE_TO_ACTIVE_NOTE_BOOK)

/** Used for removing notes from the active notebook. */
const removeFromActiveNoteBook = createAction(ACTIONS.REMOVE_NOTE_FROM_ACTIVE_NOTE_BOOK)

/** Used for updating rev of active notebook. */
const updateActiveNoteBookRev = createAction(ACTIONS.UPDATE_ACTIVE_NOTE_BOOK_REV)

/** Used for updating the notebook */
const updateNoteBook = createAction(ACTIONS.UPDATE_NOTE_BOOK)

/** Async method, Used for fetching all notebooks from database. */
const fetchAllNoteBooks = () => dispatch => {
  fetchNoteBooks()
    .then(result => {
      // Update only if there are notebooks.
      if (result.total_rows > 0) {
        dispatch(updateNoteBooksList(result.rows))
      }
    })
    .catch(err => {
      logger.error('Unable to fetch notebooks: ' + JSON.stringify(err))
    })
}

/**
 * Async method, used for saving notebook to database.
 */
const createNoteBook = name => dispatch => {
  const modified = Date.now()
  addNoteBook(undefined, name, undefined, modified)
    .then(result => {
      if (result.ok) {
        dispatch(
          addNewNoteBook({
            id: result.id,
            rev: result.rev,
            name: name,
            noteIDs: [],
            modified: modified
          })
        )
      }
    })
    .catch(err => {
      logger.error('Unable to add new notebook: ' + JSON.stringify(err))
    })
}

/**
 * Async method, used for updating notebook in database.
 */
const saveActiveNoteBook = () => (dispatch, getState) => {
  const state = getState().noteBookReducer
  const activeNoteBookID = state.get('activeNoteBookID')
  const activeNoteBook = state.get('noteBooks')[activeNoteBookID]
  addNoteBook(
    activeNoteBookID,
    activeNoteBook.name,
    activeNoteBook.noteIDs,
    activeNoteBook.modified,
    activeNoteBook.rev
  )
    .then(result => {
      if (result.ok) {
        // Update notebook rev to avoid conflicts while the next time for saving
        // this notebook.
        dispatch(updateActiveNoteBookRev(result.rev))
      }
    })
    .catch(err => {
      logger.error('Unable to update notebook: ' + JSON.stringify(err))
    })
}

/** Async method, used for removing active notebook from database. */
const removeSelectedNoteBook = () => (dispatch, getState) => {
  const state = getState().noteBookReducer
  const selectedNoteBookID = state.get('selectedNoteBookID')
  const selectedNoteBook = state.get('noteBooks')[selectedNoteBookID]
  removeNoteBook(selectedNoteBookID, selectedNoteBook.rev)
    .then(result => {
      dispatch(deleteSelectedNoteBook())
    })
    .catch(err => {
      logger.error('Unable to remove notebook ' + JSON.stringify(err))
    })
}
/** Async method, used for removing the destroyed note from notebook database. */
const removeNoteFromAllNoteBooks = (noteID) => (dispatch, getState) => {
  const state = getState().noteBookReducer
  const noteBooks = state.get('noteBooks')
  Object.keys(noteBooks).map( key => {
    const notebook = noteBooks[key]
    const noteIDs = notebook.noteIDs.filter( id => id !== noteID)
    if(noteIDs.length !== notebook.noteIDs.length){
      const modified = Date.now()
      addNoteBook(
        key,
        notebook.name,
        noteIDs,
        modified,
        notebook.rev
      ).then(result => {
          if (result.ok) {
            dispatch(updateNoteBook({id:key, notebook: {...notebook,noteIDs,modified,rev:result.rev}}))
          }
        })
        .catch(err => {
          logger.error('Unable to update notebook: ' + JSON.stringify(err))
        })
    }
  })
}

export {
  updateNoteBooksList,
  addNewNoteBook,
  fetchAllNoteBooks,
  createNoteBook,
  deleteSelectedNoteBook,
  removeSelectedNoteBook,
  setActiveNoteBookID,
  setSelectedNoteBookID,
  addToNoteIDs,
  removeFromNoteIDs,
  addToActiveNoteBook,
  removeFromActiveNoteBook,
  updateActiveNoteBookRev,
  openNoteBook,
  closeNoteBook,
  createNoteList,
  deleteNoteList,
  saveActiveNoteBook,
  removeNoteFromAllNoteBooks
}
