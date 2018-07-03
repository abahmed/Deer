import { createAction } from 'redux-actions'
import { ACTIONS } from '../constants/actions'

// Used for updating index value of the langList.
export const getNextLang = createAction(ACTIONS.GET_NEXT_LANG)

// Used for inverting values of fadeIn.
export const toggleFade = createAction(ACTIONS.TOGGLE_FADE)

// Setting the timer to a variable so to be able to stop after navigating away from Welcome component.
let timer = 0
// Async action that is fired from time to time update fadeIn boolean and
// index, so UI is rerendered with next values.
export const updateLang = () => (dispatch, getState) => {
  // Only update the index when fading in, as fading out will not be shown.
  const state = getState().welcomeReducer
  let isFadeIn = state.fadeIn
  if (isFadeIn) { dispatch(getNextLang()) }

  timer = setTimeout(() => {
    dispatch(toggleFade())
    dispatch(updateLang())
  }, isFadeIn ? 3000 : 180)
}

// Stopping the timer to call updateLang
export const stopUpdateLang = () => () => {
  clearTimeout(timer)
}
