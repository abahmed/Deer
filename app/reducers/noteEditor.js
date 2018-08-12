import { ACTIONS } from '../constants/actions'
import { EditorState } from 'draft-js'

const INITIAL_STATE = {
  editorState: EditorState.createEmpty()
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_EDITOR_STATE:
      return {
        ...state,
        editorState: action.payload
      }
    default:
      return state
  }
}
