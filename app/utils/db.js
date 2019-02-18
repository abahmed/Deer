/** @module db */
const PouchDB = require('pouchdb-browser').default
const uuidv4 = require('uuid/v4')

// Initialize Schema
const notesDB = new PouchDB('notes')

/** Fetches all notes from database */
const fetchNotes = function () {
  return notesDB.allDocs({ include_docs: true })
}

/** Adds / Updates a note to database. */
const addNote = function (id = uuidv4(), title, content,
  modified = Date.now()) {
  const doc = {
    _id: id,
    title: title,
    content: content,
    modified: modified
  }
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
