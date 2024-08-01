import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import fs from 'fs-extra'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import directoryTree from 'directory-tree'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    minWidth: 800,
    height: 800,
    minHeight: 600,
    center: true,
    show: false,
    title: 'B-Project',
    frame: false,
    titleBarStyle: 'hidden',
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

//* window controls
// minimize focused window
ipcMain.on('window-minimize', () => {
  const window = BrowserWindow.getFocusedWindow()
  window?.minimize()
})
// maximize focused window
ipcMain.on('window-maximize', () => {
  const window = BrowserWindow.getFocusedWindow()
  if (!window?.isMaximized()) {
    window?.maximize()
  } else {
    window.unmaximize()
  }
})
// close focused window
ipcMain.on('window-close', () => {
  const window = BrowserWindow.getFocusedWindow()
  window?.close()
})

// get app path
const appPath = app.getAppPath()

//get app setting path
const appSettingsPath = appPath + '/appSettings.json'

// declare appsettings file
let appSettignsFile = { test: 'test' }

//* ensure appsettings.json file is created
fs.readJSON(appSettingsPath, (err, obj) => {
  // create file if it doesnt exist
  if (err && err[1] === -2) {
    fs.ensureFile(appSettingsPath, (err) => {
      if (err) return console.log(err)
      fs.writeJSON(appSettingsPath, appSettignsFile, (err) => {
        if (err) return console.log(err)
      })
    })
  }
  if (err && err[1] !== -2) return console.log(err)

  if (obj !== appDataFile) {
    appSettignsFile = obj
  }
})

// get appData path
const appDataPath = app.getPath('appData') + '/B-Project/appData.json'

// declare app data file
let appDataFile = { recentDir: '' }

// read appdata file
fs.readJSON(appDataPath, (err, obj) => {
  // create file if it doesnt exist
  if (err && err[1] === -2) {
    fs.ensureFile(appDataPath, (err) => {
      if (err) return console.log(err)
      fs.writeJSON(appDataPath, appDataFile, (err) => {
        if (err) return console.log(err)
      })
    })
  }
  if (err && err[1] !== -2) return console.log(err)

  if (obj !== appDataFile) {
    appDataFile = obj
    workingDir = appDataFile.recentDir
  }
})

ipcMain.handle('recentDirExists', () => {
  return appDataFile.recentDir === '' ? false : true
})

let workingDir: string
ipcMain.on('handleDirSelect', () => {
  dialog.showOpenDialog({ properties: ['openDirectory'] }).then((obj) => {
    workingDir = appDataFile.recentDir = obj.filePaths.join()
  })
})

ipcMain.handle('getCurrentDir', () => {
  return workingDir
})

ipcMain.on('handleDirSubmit', (_event, dirName: string) => {
  dirName ? (workingDir += '/' + dirName) : workingDir
  appDataFile.recentDir = workingDir
  fs.ensureDir(workingDir, (err) => {
    if (err) return console.log(err)
  })
})

let dirTree
ipcMain.handle('mapDir', () => {
  dirTree = directoryTree(workingDir, { extensions: /\.md/, attributes: ['type'] })
  return dirTree
})

app.on('quit', () => {
  fs.writeJSON(appDataPath, appDataFile, (err) => {
    if (err) return console.log(err)
  })
})
