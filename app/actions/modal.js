import { createAction } from 'redux-actions'
import { ACTIONS } from '../constants/actions'
import { NOTE_STATUS } from '../constants/noteStatus'
import { setNoteStatus } from './note'

// Used for updating visibility of save modal.
export const toggleSaveModal = createAction(ACTIONS.TOGGLE_SAVE_MODAL)

// Async method, Used for updating note status with two optional parameters
// - withTimeOut: dispatch action after timeout or not and it's default value
//                is true.
// - status: the new status of the note and it's default value is NO_OPERATION.
export const updateNoteStatus =
  (withTimeOut = true, status = NOTE_STATUS.NO_OPERATION) =>
    (dispatch, getState) => {
      setTimeout(() => {
        dispatch(setNoteStatus(status))
      }, withTimeOut ? 1500 : 0)
    }
