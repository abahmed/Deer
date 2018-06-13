import { ACTIONS } from '../constants/actions'
import langs from '../constants/welcome.json'

const INITIAL_STATE = {
  index: -1,
  fadeIn: true,
  langList: langs
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_NEXT_LANG:
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
      return {
        ...state,
        fadeIn: !state.fadeIn
      }
    default:
      return state
  }
}
