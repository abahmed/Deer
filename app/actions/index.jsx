// Local libraries
import { ACTION_TYPES } from './types';

/*
*  All notes related actions including payloads, if any
*/

// fetchAllNotes - Retrieve notes from the store
export function fetchAllNotes() {
  return {
    type: ACTION_TYPES.FETCH_ALL_NOTES,
  };
}

// addNote - Add/Save a new note to the store
export function addNote(payload) {
  return {
    type: ACTION_TYPES.ADD_NOTE,
    payload: payload,
  };
}

// const ACTIONS = {
//   addNote: addNote,
//   fetchAllNotes: fetchAllNotes
// }

// export default ACTIONS;
