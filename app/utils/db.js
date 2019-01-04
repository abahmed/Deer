import PouchDB from 'pouchdb-browser'

// Initialize Schema
const notesDB = new PouchDB('notes')

// Fetches all notes from database
export const fetchNotes = () => {
  return notesDB.allDocs({
    include_docs: true,
    attachments: true
  })
}

// Adds / Updates a note to database.
export const addNote = (doc) => {
  return notesDB.put(doc)
}

// Gets a note from database using it's ID.
export const getNote = (noteId) => {
  return notesDB.get(noteId)
}

// Deletes a note from database using it's ID and rev.
export const removeNote = (noteId, noteRev) => {
  return notesDB.remove(noteId, noteRev)
}
