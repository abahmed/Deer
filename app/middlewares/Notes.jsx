import * as ACTION_TYPES from '../actions/types';
import { fetchNotes } from '../db';

const Notes = () => next => action => {
  switch (action.type) {
  case ACTION_TYPES.FETCH_ALL_NOTES: {
    return fetchNotes('notes')
    .then(allDocs => {
      next(
        Object.assign({}, action, {
          payload: allDocs,
        })
      );
    })
    .catch(err => {
      /* eslint-disable no-console */
      console.log(err);
      /* eslint-enable no-console */
    });

  }

  case ACTION_TYPES.ADD_NOTE: {
    const doc = Object.assign({}, action.payload, {
      created: Date.now(),
    });
    // TODO: Implement save
    /* eslint-disable no-console */
    console.log(doc);
    /* eslint-enable no-console */
    break;
  }

  default: {
    return next(action);
  }
  }
};

export default Notes;
