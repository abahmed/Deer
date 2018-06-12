const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev')
const windowState = require('electron-window-state')
const os = require('os')
const initLogger = require('./utils/logger.js')
const appInfo = require('./package.json')
const Prefs = require('electron-store')

// Let electron reloads by itself when webpack watches changes in ./app/
if (isDev) {
  // Work around by providing electron path,
  // (https://github.com/yan-foto/electron-reload/issues/16)
  require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`)
  })
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// a global reference of the logger object.
let logger

// Create an instance of the app. Returns false if first instance
var shouldQuit = app.makeSingleInstance(function (commandLine, workingDirectory) {
  if (win) {
    if (win.isMinimized()) { win.restore() }
    win.focus()
  }
})

// Quit if not the first instance
if (shouldQuit) {
  app.quit()
}

function createWindow () {
  // Load last state and fallback to defaults if it does not exist.
  let lastWindowState = windowState({
    defaultWidth: 800,
    defaultHeight: 600
  })

  // Create the browser window.
  win = new BrowserWindow({
    width: lastWindowState.width,
    height: lastWindowState.height,
    x: lastWindowState.x,
    y: lastWindowState.y,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: '#F8F8FF',
    icon: 'app/assets/images/Deer-128.png',
    show: false,
    resizable: false
  })
  logger.info('Deer window is created')

  // Clear default menu.
  // win.setMenu(null)

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'public/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Register listeners on browser window to keep track of its state, so it can
  // restore it.
  lastWindowState.manage(win)

  // Show browser window once it's ready.
  win.once('ready-to-show', () => {
    win.show()
    logger.info('Deer window is shown')
  })

  // Emitted when the window is closed.
  win.on('closed', () => {
    logger.info('Deer window is closed')

    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  // Initialize store to save and load preferences.
  global.prefs = new Prefs()

  // Initialize logger
  logger = initLogger()
  logger.info(`${appInfo.name}(${appInfo.version}) has started on ` +
              `${os.type()}(${os.release()}) on ${os.platform()}(` +
              `${os.arch()})`)

  // Create and load main window.
  createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
