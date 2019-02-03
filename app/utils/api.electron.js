/** @module Electron API */
const electron = require('electron')
const FALLBACK_LANG = 'en'

// fetching electron store object
const electronStore = electron.remote.getGlobal('electronStore')

/**
 * check whether to redirect to the welcome page or no.
 * this value is saved in electron store in show-welcome flag.
 * returns true if first time to open Deer, otherwise, false
 */
const checkRedirectToWelcomePage = function () {
  if (electronStore.has('show-welcome')) {
    return electronStore.get('show-welcome')
  }
  return true
}

/**
 * called to mark that the user has already opened Deer once.
 * sets the show-welcome flag in electron store to false.
 */
const setNotFirstTimeFlag = function () {
  electronStore.set('show-welcome', false)
}

/**
 * retuns user's saved language if it's set, otherwise returns
 * fallback language.
 */
const getDefaultLanguage = function () {
  if (electronStore.has('general.language')) {
    return electronStore.get('general.language')
  }
  return FALLBACK_LANG
}

/**
 * called to save user's language preference by providing defaultLanguage.
 */
const setDefaultLanguage = function (defaultLanguage) {
  if (!defaultLanguage) {
    return
  }
  electronStore.set('general.language', defaultLanguage)
}

/**
 * called to ask main process to open a url in browser.
 */
const openExternalLink = function (url) {
  electron.shell.openExternal(url)
}

/**
 * called to ask main process to get global object for database.
 */
const getDB = function () {
  return electron.remote.getGlobal('db')
}

/**
 * called to ask main process to get global object for logger.
 */
const getLogger = function () {
  return electron.remote.getGlobal('logger')
}

// export the functions defined here
module.exports = {
  checkRedirectToWelcomePage,
  setNotFirstTimeFlag,
  getDefaultLanguage,
  setDefaultLanguage,
  openExternalLink,
  getDB,
  getLogger
}
