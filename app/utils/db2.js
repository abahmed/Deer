/** @module DB */

import { getDB, getLogger } from './api.electron'

const db = getDB()
const logger = getLogger()

/**
 * Fetches uuid and title of notes in database.
 */
const fetchNotesId = (callback = null) => {
  const query = 'SELECT uuid, title FROM note'
  db.db.all(query, (err, rows) => {
    if (err) {
      logger.error(err)
      return
    }

    let noteList = []
    if (rows) {
      rows.forEach(row => {
        noteList.push({
          uuid: row.uuid,
          title: row.title
        })
      })
    }

    if (callback) { callback(noteList) }
  })
}

/**
 * Adds a new note to database with uuid and content
 * @param {string} uuid - The unique id of the note that will be added
 * @param {string} content - Content of note that will be added
 */
const addNote = (uuid, title, content, modified = Date.now(), callback) => {
  const query = 'INSERT INTO note (uuid, title, content, modified) VALUES ' +
                '(?, ?, ?, ?)'
  db.db.run(query, [uuid, title, content, modified], (err) => {
    if (err) {
      logger.error(err)
      return
    }
    if (callback) { callback() }
  })
}

/**
 * Fetches a note from database with uuid
 * @param {string} uuid - The unique id of the note
 */
const getNote = (uuid, callback) => {
  const query = 'SELECT title, content, modified FROM note WHERE uuid=?'
  db.db.get(query, [uuid], (err, row) => {
    if (err) {
      logger.error(err)
      return
    }

    if (callback) { callback(row) }
  })
}

/**
 * Removes a note from database with uuid
 * @param {string} uuid - The unique id of the note
 */
const removeNote = (uuid) => {
  const query = 'DELETE FROM note WHERE uuid=?'
  db.db.run(query, [uuid], (err) => {
    if (err) logger.error(err)
  })
}

fetchNotesId()

// export the functions defined here
export {
  fetchNotesId,
  addNote,
  getNote,
  removeNote
}
