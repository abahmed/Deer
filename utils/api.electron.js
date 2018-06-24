import electron from 'electron'

let electronStore = electron.remote.getGlobal('sharedObj').electronStore

var checkRedirectToWelcomePage = function () {
  if (electronStore.has('not-first-time') && electronStore.get('not-first-time') === true) {
      return false;
  }
  return true;
}

var setNotFirstTimeFlag = function () {
  electronStore.set('not-first-time', true)
}

module.exports = {
    checkRedirectToWelcomePage,
    setNotFirstTimeFlag
}