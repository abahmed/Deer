import { createStore } from 'redux'
import rootReducer from './reducers'

// Creates the Redux store that holds the complete state tree of Deer with
// optional initialState and returns it.
export default function configureStore (initialState = undefined) {
  const store = createStore(
    rootReducer,
    initialState
  )
  return store
}
