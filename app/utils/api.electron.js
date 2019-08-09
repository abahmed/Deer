/** @module Electron API */
const electron = require('electron')
const FALLBACK_LANG = 'en'
const FALLBACK_MODE = 'NONE'
const FALLBACK_NOTEBOOK = 'none'

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
 * returns user's saved language if it's set, otherwise returns
 * fallback language.
 */
const getDefaultLanguage = function () {
  if (electronStore.has('general.language')) {
    return electronStore.get('general.language')
  }
  return FALLBACK_LANG
}

/**
 * returns last selected notebook if it's set, otherwise returns
 * fallback notebook.
 */
const getLastSelectedNoteBook = function () {
  if (electronStore.has('general.notebook')) {
    return electronStore.get('general.notebook')
  }
  return FALLBACK_NOTEBOOK
}

/**
 * returns user's saved startup mode if it's set, otherwise returns
 * fallback startup mode.
 */
const getDefaultStartupMode = function () {
  if (electronStore.has('general.startup')) {
    return electronStore.get('general.startup')
  }
  return FALLBACK_MODE
}

/**
 * returns user's saved startup note id if it's set, otherwise returns
 * null.
 */
const getDefaultstartupNoteId = function () {
  var mode = getDefaultStartupMode()
  var noteId = 'general.' + mode
  if (electronStore.has(noteId)) {
    return electronStore.get(noteId)
  }
  return null
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
 * called to save the last selected notebook by providing last selected notebook.
 */
const setLastSelectedNoteBook = function (lastSelectedNoteBook) {
  if (!lastSelectedNoteBook) {
    return
  }
  electronStore.set('general.notebook', lastSelectedNoteBook)
}

/**
 * called to save user 's default startup mode preference by providing defaultStartupMode.
 */
const setDefaultStartupMode = function (defaultStartupMode) {
  if (!defaultStartupMode) {
    return
  }
  electronStore.set('general.startup', defaultStartupMode)
}
const setLastSelectedNoteId = function (noteId) {
  if (!noteId) {
    return
  }
  electronStore.set('general.SELECTED', noteId)
}

const setLastEditedNoteId = function (noteId) {
  if (!noteId) {
    return
  }
  electronStore.set('general.EDITED', noteId)
}

const setCustomNoteId = function (noteId) {
  if (!noteId) {
    return
  }
  electronStore.set('general.CUSTOM', noteId)
}

/**
 * called to ask main process to open a url in browser.
 */
const openExternalLink = function (url) {
  electron.shell.openExternal(url)
}

// export the functions defined here
module.exports = {
  checkRedirectToWelcomePage,
  setNotFirstTimeFlag,
  getDefaultLanguage,
  setDefaultLanguage,
  getLastSelectedNoteBook,
  setLastSelectedNoteBook,
  setDefaultStartupMode,
  getDefaultStartupMode,
  getDefaultstartupNoteId,
  setLastSelectedNoteId,
  setLastEditedNoteId,
  setCustomNoteId,
  openExternalLink
}
