const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev')
const windowState = require('electron-window-state')
const os = require('os')
const initLogger = require('./utils/logger')
const appInfo = require('./package.json')
const Store = require('electron-store')
const openAboutWindow = require('about-window').default

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

// global reference for electron store
// keep all user hidden, app specific options here
var electronStore = new Store()
global.electronStore = electronStore

// Create an instance of the app. Returns false if first instance
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.exit()
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
    icon: './assets/images/Deer-128.png',
    show: false
  })
  logger.info('Deer window is created')

  // Clear default menu.
  win.setMenu(null)

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'app/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Register listeners on browser window to keep track of it's state, so it can
  // restore it.
  lastWindowState.manage(win)

  // Show browser window once it's ready.
  win.once('ready-to-show', () => {
    win.show()
    logger.info('Deer window is shown')

    // Show DevTools for debugging.
    if (isDev) {
      win.webContents.openDevTools({ mode: 'detach' })
    }
  })

  // Emitted when user clicks on close button.
  win.on('close', (e) => {
    // Prevents the window from closing
    e.preventDefault()

    win.webContents.send('close-main-window')
  })

  // Emitted when the window is closed.
  win.on('closed', () => {
    logger.info('Deer window is closed')

    // De-reference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// Installs developer tool extensions for debugging.
function installDevToolsExtensions () {
  const devtron = require('devtron')
  const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } =
    require('electron-devtools-installer')

  // Install React Developer Tool and Redux DevTool to debug React and Redux.
  const extensions = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS]
  extensions.forEach(extension => {
    installExtension(extension)
      .then((name) => logger.log(`Added Extension: ${name}`))
      .catch((err) => logger.log('An error occurred: ', err))
  })

  // Install devtron to debug Electron.
  devtron.install()
}

app.on('second-instance', () => {
  // Someone tried to run a second instance, we should focus our window.
  if (win) {
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

// This listener will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  // Initialize logger
  logger = initLogger()
  logger.info(`${appInfo.name}(${appInfo.version}) has started on ` +
              `${os.type()}(${os.release()}) on ${os.platform()}(` +
              `${os.arch()})`)

  // Installs developer tool extensions for debugging.
  if (isDev) {
    installDevToolsExtensions()
  }

  // Create and load main window.
  createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it's common for applications and their menu bar
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

ipcMain.on('close-confirm', () => {
  if (win !== null) {
    win.destroy()
  }
})

ipcMain.on('open-about-us-window', () => {
  openAboutWindow(path.join(__dirname, 'assets/images/Deer-256.png'))
})
