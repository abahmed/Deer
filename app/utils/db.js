/** @module db */
const PouchDB = require('pouchdb-browser').default

// Initialize Schema
const notesDB = new PouchDB('notes')

/** Fetches all notes from database */
const fetchNotes = function () {
  return notesDB.allDocs({
    include_docs: true,
    attachments: true
  })
}

/** Adds / Updates a note to database. */
const addNote = function (doc) {
  return notesDB.put(doc)
}

/** Gets a note from database using it's ID. */
const getNote = function (noteId) {
  return notesDB.get(noteId)
}

/** Deletes a note from database using it's ID and rev. */
const removeNote = function (noteId, noteRev) {
  return notesDB.remove(noteId, noteRev)
}

// export the functions defined here
module.exports = {
  fetchNotes,
  addNote,
  getNote,
  removeNote
}
