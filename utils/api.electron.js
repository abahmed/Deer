const electron = require('electron')
const { FALLBACK_LANG } = require('../app/constants/i18n')

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
 * called to ask main process to create about us window.
 */
const openAboutUsWindow = function () {
  electron.ipcRenderer.send('open-about-us-window')
}

// export the functions defined here
module.exports = {
  checkRedirectToWelcomePage,
  setNotFirstTimeFlag,
  getDefaultLanguage,
  setDefaultLanguage,
  openAboutUsWindow
}
