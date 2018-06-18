import { ACTIONS } from '../constants/actions'
import { welcome } from '../constants/welcome'

const INITIAL_STATE = {
  index: -1,
  fadeIn: true,
  langList: welcome
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_NEXT_LANG:
      // Update the index value to point to the next element in the langList
      // array, and if it reached to the end, it's set to zero.
      let index = -1
      if (state.langList.length !== 0) {
        index = state.index + 1
        if (index >= state.langList.length) { index = 0 }
      }
      return {
        ...state,
        index: index
      }
    case ACTIONS.TOGGLE_FADE:
      // Invert the value of fadeIn (boolean).
      return {
        ...state,
        fadeIn: !state.fadeIn
      }
    default:
      return state
  }
}
