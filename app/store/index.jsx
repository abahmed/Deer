import { createStore, applyMiddleware, compose } from 'redux';
import Reducers from '../reducers';

import Logger from 'redux-logger';

// Custom Middleware
//import Notes from './../middlewares/Notes';

const middlewares = [
  Logger,
// Bypassing custom middleware temporarily 
// since PouchDB integartion isn't complete yet.
//  Notes
];
export default function configureStore(initialState) {
  const store = createStore(
    Reducers,
    initialState,
    compose(applyMiddleware(...middlewares))
  );
  return store;
}
