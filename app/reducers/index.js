import { combineReducers } from 'redux'
import note from './note'
import settings from './settings'

// Creates a single root reducer out of Deer's reducers and returns an object
// whose values are reducing functions with keys passed.
export default combineReducers({
  noteReducer: note,
  settingsReducer: settings
})
