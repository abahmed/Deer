import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import { waitUntilService } from './middlewares/wait-service'

// Creates the Redux store that holds the complete state tree of Deer with
// optional initialState and returns it.
export default function configureStore (initialState = undefined) {
  // List of middlewares that will be applied.
  const middlewares = [
    // handles asynchronous actions, as they are not handled by reducer.
    thunk,
    waitUntilService
  ]

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
