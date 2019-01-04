import { createAction } from 'redux-actions'
import { ACTIONS } from './actions'
import { NOTE_STATUS } from '../constants/noteStatus'
import { setNoteStatus } from './note'

// Used for updating visibility of save modal.
export const toggleYesNoModal = createAction(ACTIONS.TOGGLE_SAVE_MODAL)

// Used for comunicating that modal will not perform any action
export const modalNoAction = createAction(ACTIONS.MODAL_NO_ACTION)

// Async method, used for updating note status with two optional parameters
// - withTimeOut: dispatch action after timeout or not and it's default value
//                is true.
// - status: the new status of the note and it's default value is NO_OPERATION.
export const updateNoteStatus =
  (withTimeOut = true, status = NOTE_STATUS.NO_OPERATION) =>
    (dispatch, getState) => {
      setTimeout(() => {
        dispatch(setNoteStatus(status))
      }, withTimeOut ? 1000 : 0)
    }
