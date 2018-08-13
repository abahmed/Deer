import { createAction } from 'redux-actions'
import { ACTIONS } from '../constants/actions'
import { fetchNotes } from './../db'

// Used for updating noteList with fetched notes from database.
export const updateNoteList = createAction(ACTIONS.UPDATE_NOTE_LIST)

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
