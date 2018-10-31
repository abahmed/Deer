import { ACTIONS } from '../constants/actions'

const INITIAL_STATE = {
  showSaveModal: false,
  showDeleteModal: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.TOGGLE_SAVE_MODAL:
      return {
        ...state,
        showSaveModal: !state.showSaveModal
      }
    case ACTIONS.TOGGLE_DELETE_MODAL:
      return {
        ...state,
        showDeleteModal: !state.showDeleteModal
      }
    default:
      return state
  }
}
