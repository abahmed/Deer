import electron from 'electron'

// fetching electron store object
let electronStore = electron.remote.getGlobal('electronStore')

/**
 * check whether to redirect to the welcome page or no.
 * this value is saved in electron store in show-welcome flag.
 * returns true if first time to open Deer, otherwise, false
 */
var checkRedirectToWelcomePage = function () {
  if (electronStore.has('show-welcome')) {
    return electronStore.get('show-welcome')
  }
  return true
}

/**
 * called to mark that the user has already opened Deer once.
 * sets the show-welcome flag in electron store to false.
 */
var setNotFirstTimeFlag = function () {
  electronStore.set('show-welcome', false)
}

// export the functions defined here
module.exports = {
  checkRedirectToWelcomePage,
  setNotFirstTimeFlag
}
