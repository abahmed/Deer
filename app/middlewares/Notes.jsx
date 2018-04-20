// Node Libs
import uuidv4 from 'uuid/v4';

// Actions Verbs
import { ACTION_TYPES } from './../actions/types';

// Helpers
import { fetchNotes, addNote } from './../db';

import { remote } from 'electron'
const logger = remote.getGlobal('logger')

//eslint-disable-next-line no-unused-vars
const Notes = ({ dispatch }) => next => action => {
  switch (action.type) {
  case ACTION_TYPES.FETCH_ALL_NOTES: {
    logger.info('Fetching notes from database')
    return fetchNotes('notes')
        .then(allDocs => {
          next(
            Object.assign({}, action, {
              payload: allDocs,
            })
          );
        })
        .catch(err => {
          //eslint-disable-next-line no-console
          logger.error('Error while fetching notes from database: ' + err)
        });
  }

  case ACTION_TYPES.ADD_NOTE: {
    const doc = Object.assign({}, action.payload, {
      _id: uuidv4(),
      created_at: Date.now(),
    });
    logger.info('Adding note to database')
    return addNote(doc)
        .then(newDocs => {
          next(
            Object.assign({}, action, {
              payload: newDocs,
            })
          )
        })
        .catch(err => {
          //eslint-disable-next-line no-console
          logger.error('Error while adding note to database: ' + err)
        });
  }

  default: {
    return next(action);
  }
  }
};

export default Notes;
