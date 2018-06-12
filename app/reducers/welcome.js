import { ACTIONS } from '../constants/actions'

const INITIAL_STATE = {
  index: 0,
  fadeIn: true,
  languages: [],
  nextLang: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.SET_WELCOME_LANG:
      return {
        ...state,
        languages: action.payload,
      }
    case ACTIONS.GET_NEXT_LANG:
      if (state.languages.length == 0)
        return state
      let nextLang = state.languages[state.index]

      let index = state.index + 1
      if (index >= state.languages.length)
        index = 0
      return {
        ...state,
        index,
        nextLang
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
