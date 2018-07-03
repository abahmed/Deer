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

// Adds new note to database then fetches
export const addNote = (doc) => {
  return notesDB.put(doc)
}
