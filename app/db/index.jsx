import PouchDB from 'pouchdb-browser';


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

// Create new Note
export const addNote = ( doc ) =>
  new Promise((resolve, reject) => {
    console.log(doc);
    notes.put({ note: doc.payload, _id: doc.id })
      .then(fetchNotes()
      .then(newDocs => resolve(newDocs)
      ))
      .catch(err => reject(err));
  });
