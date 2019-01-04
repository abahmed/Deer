import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import middlewares from '../middlewares'

// Creates the Redux store that holds the complete state tree of Deer with
// optional initialState and returns it.
export default function configureStore (initialState = undefined) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      // Used to avoid "No store found." in Redux devtools
      // (https://github.com/zalmoxisus/redux-devtools-extension/issues/126)
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
  return store
}
