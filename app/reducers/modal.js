import { ACTIONS } from '../constants/actions'

const INITIAL_STATE = {
  showYesNoModal: false,
  yesNoAction: ACTIONS.NO_ACTION
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.TOGGLE_SAVE_MODAL:
      let noteAction = state.yesNoAction
      if (!state.showYesNoModal && action.payload &&
          ACTIONS.hasOwnProperty(action.payload)) {
        noteAction = action.payload
      }
      console.log(noteAction)
      return {
        ...state,
        showYesNoModal: !state.showYesNoModal,
        yesNoAction: noteAction
      }
    default:
      return state
  }
}
