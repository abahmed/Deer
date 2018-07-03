// Set the logger
const {app} = require('electron')
const logger = require('electron-log')
const path = require('path')
const fs = require('fs')

// Initializes logger library to write logs and returns logger object
function initLogger () {
  // Get userData directory and create it if it does not exist.
  let appFolder = app.getPath('userData')
  if (!fs.existsSync(appFolder)) {
    fs.mkdirSync(appFolder)
  }

  // Create log directory if it does not exist.
  let logFolder = path.join(app.getPath('userData'), 'logs')
  if (!fs.existsSync(logFolder)) {
    fs.mkdirSync(logFolder)
  }

  // Set log file name based on time
  let logFile = new Date().toISOString().replace(/:/g, '.') + '.log'

  // Log level
  logger.transports.file.level = 'log'

  // Write to this file, must be set before first logging
  logger.transports.file.file = path.join(logFolder, logFile)

  return logger
}
module.exports = initLogger
