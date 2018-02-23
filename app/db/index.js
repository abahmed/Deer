const PouchDB = require('pouchdb-browser');


/*
* All DB store operations go here
*/

// Initialize Schema
const notes = new PouchDB('notes');

// Fetch operations
export const fetchNotes = () => {
  return notes.allDocs({
    include_docs: true,
    attachments: true,
  });
}

// Create/Update operations
