// Set the logger
const {app} = require('electron')
const logger = require('winston')
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

  // Set parameters of logging library (winston).
  logger.add(logger.transports.File, {
    json: false,
    exitOnError: false,
    filename: path.join(logFolder, logFile),
    timestamp: true
  })

  // Set logger as global variable to allow using it in renderer process
  global.logger = logger

  return logger
}
module.exports = initLogger
