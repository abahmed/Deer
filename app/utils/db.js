/** @module db */
const PouchDB = require('pouchdb-browser').default
const uuidv4 = require('uuid/v4')

/** Initialize Schema */
const notesDB = new PouchDB('notes')
const noteBooksDB = new PouchDB('notebooks')

/**
 * Fetches all notes from database
 * @return {Promise} of the result
 * */
const fetchNotes = function () {
  return notesDB.allDocs({ include_docs: true })
}

/**
 * Adds / Updates a note to database.
 * @param {string} id for the note
 * @param {string} title for the note
 * @param {string} content for the note
 * @param {string} modified date for the note
 * @param {string} rev used in case of updating existing note
 * @return {Promise} of the result
 **/
const addNote = function (id = uuidv4(), title = '', content = '', modified = Date.now(), rev = '') {
  const doc = {
    _id: id,
    title: title,
    content: content,
    modified: modified
  }
  if (rev) {
    doc._rev = rev
  }
  return notesDB.put(doc)
}

/**
 * Gets a note from database using it's ID.
 * @param {string} id for the note
 * @return {Promise} of the result
 **/
const getNote = function (noteID) {
  return notesDB.get(noteID)
}

/**
 * Deletes a note from database using it's ID and rev.
 * @param {string} id for the note
 * @param {string} rev for the note
 * @return {Promise} of the result
 **/
const removeNote = function (noteID, noteRev) {
  return notesDB.remove(noteID, noteRev)
}

/**
 * Searches for a note using query string.
 * @param {string} query text of query
 * @return {Promise} of the result
 **/
const searchNote = function (query) {
  return notesDB.query({
    map: function (doc, emit) {
      if (doc.content.includes(query)) {
        emit(doc._id)
      }
    }
  })
}

/**
 * Fetches all notebooks from database
 * @return {Promise} of the result
 * */
const fetchNoteBooks = function () {
  return noteBooksDB.allDocs({ include_docs: true })
}

/**
 * Adds / Updates a notebook to database.
 * @param {string} id for the notebook
 * @param {string} name for the notebook
 * @param {object}  notes for the notebook
 * @param {string} modified date for the notebook
 * @param {string} rev used in case of updating existing notebook
 * @return {Promise} of the result
 **/
const addNoteBook = function (
  id = uuidv4(),
  name = '',
  noteIDs = [],
  modified = Date.now(),
  rev = ''
) {
  const doc = {
    _id: id,
    name: name,
    noteIDs: noteIDs,
    modified: modified
  }
  if (rev) {
    doc._rev = rev
  }
  return noteBooksDB.put(doc)
}

/**
 * Deletes a notebook from database using it's ID and rev.
 * @param {string} id for the notebook
 * @param {string} rev for the notebook
 * @return {Promise} of the result
 **/
const removeNoteBook = function (noteBookID, noteBookRev) {
  return noteBooksDB.remove(noteBookID, noteBookRev)
}

/** export the functions defined here */
module.exports = {
  fetchNotes,
  addNote,
  getNote,
  removeNote,
  searchNote,
  fetchNoteBooks,
  addNoteBook,
  removeNoteBook
}
