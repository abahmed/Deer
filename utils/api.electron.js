import electron from 'electron'

let electronStore = electron.remote.getGlobal('sharedObj').electronStore

var checkRedirectToWelcomePage = function () {
  if (electronStore.has('show-welcome')) {
    return electronStore.get('show-welcome')
  }
  return true
}

var setNotFirstTimeFlag = function () {
  electronStore.set('show-welcome', false)
}

module.exports = {
  checkRedirectToWelcomePage,
  setNotFirstTimeFlag
}
