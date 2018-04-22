import { combineReducers } from 'redux'
import NoteReducer from './NoteReducer'

export default combineReducers({
  notes: NoteReducer
})
