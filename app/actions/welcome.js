// Import helpers
import { createAction } from 'redux-actions'
import { ACTIONS } from '../constants/actions'

export const getNextLang = createAction(ACTIONS.GET_NEXT_LANG)

export const toggleFade = createAction(ACTIONS.TOGGLE_FADE)

export const updateLang = () => (dispatch, getState) => {
  const state = getState().welcomeReducer
  let isFadeIn = state.fadeIn
  if (isFadeIn) { dispatch(getNextLang()) }
  setTimeout(() => {
    dispatch(toggleFade())
    dispatch(updateLang())
  }, isFadeIn ? 3000 : 180)
}
