import { ACTIONS } from '../constants/actions'

const INITIAL_STATE = {
  showSaveModal: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.TOGGLE_SAVE_MODAL:
      return {
        ...state,
        showSaveModal: !state.showSaveModal
      }
    default:
      return state
  }
}
