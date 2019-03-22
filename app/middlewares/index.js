import thunk from 'redux-thunk'
import { waitUntilService } from './waitService'

// Middlewares that will be applied.
export default [
  // handles asynchronous actions, as they are not handled by reducer.
  thunk,
  waitUntilService
]
