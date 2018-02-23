import { createStore, applyMiddleware, compose } from 'redux';
import Reducers from '../reducers';

// Custom Middleware
import Notes from '../middlewares/Notes';

export default function configureStore(initialState) {
  const store = createStore(
    Reducers,
    initialState,
    compose(applyMiddleware(Notes))
  );

  return store;
}
