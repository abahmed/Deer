import { ACTION_TYPES } from '../actions/types'
import { handleActions } from 'redux-actions'
import { createSelector } from 'reselect'

const initialState = {
  notes: []
}

const NoteReducer = handleActions(
  {
    [ ACTION_TYPES.ADD_NOTE ]: (state = initialState, action) => {
      if (action.payload.rows) {
        return Object.assign({}, state, {
          notes: [...action.payload.rows]
        })
      }
      return state
    },

    [ ACTION_TYPES.FETCH_ALL_NOTES ]: (state = initialState, action) => {
      if (action.payload.rows) {
        return Object.assign({}, state, {
          notes: [...action.payload.rows]
        })
      }
      return state
    }
  },
  initialState
)

export default NoteReducer

// Selector Input
const getFormState = state => state.form

// Selectors
export const getNotes = createSelector(
  getFormState,
  formState => formState.notes
)
