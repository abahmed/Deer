const sqlite3 = require('sqlite3')
const logger = require('electron-log')
const electron = require('electron')
const path = require('path')
const fs = require('fs')

class DB {
  constructor (name) {
    if (!name) throw new Error('Please provide database name')

    const dbPath = path.join(electron.app.getPath('userData'), name)
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        logger.error('Unable to create or open database: ' + err)
        return
      }

      this._checkTable()
    })

    this.close = this.close.bind(this)
    this._checkTable = this._checkTable.bind(this)
    this._createSchema = this._createSchema.bind(this)
  }

  get db () {
    return this._db
  }

  set db (db) {
    delete this._db
    this._db = db
  }

  _checkTable () {
    const query = 'SELECT count(*) as `count` FROM `sqlite_master`'
    this.db.get(query, (err, result) => {
      if (err) {
        logger.error('Unable to count tables in database: ', err)
        return
      }
      const tableCount = result.count
      if (tableCount !== 0) {
        logger.info('The database has', tableCount, 'tables.')
        return
      }
      logger.info('The database is empty.')
      this._createSchema()
    })
  }

  _createSchema () {
    logger.info('Creating tables in database.')
    const schemaPath = path.join(__dirname, 'schema.sql')
    const query = fs.readFileSync(schemaPath, 'utf8')
    this.db.run(query, (err) => {
      if (err) {
        logger.error('Unable to create schema: ', err)
        return
      }
    })
  }

  close () {
    logger.info('Closing database')
    this.db.close()
  }
}
module.exports = DB