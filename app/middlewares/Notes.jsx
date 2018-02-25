// Node Libs
import uuidv4 from 'uuid/v4';

// Actions Verbs
import { ACTION_TYPES } from './../actions/types';

// Helpers
import { fetchNotes, addNote } from './../db';

const Notes = ({dispatch}) => next => action => {
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
          console.log(err)
        });
  }

  case ACTION_TYPES.ADD_NOTE: {
    const doc = Object.assign({}, action.payload, {
      _id: uuidv4(),
      created_at: Date.now(),
    });
    console.log(doc);
    return addNote('notes', doc)
        .then(newDocs => {
          next(
            Object.assign({}, action, {
              payload: newDocs,
            })
          )
        })
        .catch(err => {
          console.log(err);
        });
  }

  default: {
    return next(action);
  }
  }
};

export default Notes;
