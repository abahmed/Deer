import { combineReducers } from 'redux'
import welcome from './welcome'
import noteEditor from './noteEditor'
import noteList from './noteList'
import header from './header'

// Creates a single root reducer out of Deer's reducers and returns an object
// whose values are reducing functions with keys passed.
export default combineReducers({
  welcomeReducer: welcome,
  noteEditorReducer: noteEditor,
  noteListReducer: noteList,
  headerReducer: header
})
