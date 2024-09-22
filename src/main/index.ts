/* eslint-disable @typescript-eslint/no-explicit-any */
import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import fs from 'fs-extra'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import directoryTree from 'directory-tree'
import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git'

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

  mainWindow.webContents.session.setSpellCheckerEnabled(false)
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
  app.exit()
})

// get app path
// const appPath = app.getAppPath()

// //get app setting path
// const appSettingsPath = appPath + '/appSettings.json'

// // declare appsettings file
// let appSettignsFile = { test: 'test' }

// //* ensure appsettings.json file is created
// fs.readJSON(appSettingsPath, (err, obj) => {
//   // create file if it doesnt exist
//   if (err && err[1] === -2) {
//     fs.ensureFile(appSettingsPath, (err) => {
//       if (err) return console.log(err)
//       fs.writeJSON(appSettingsPath, appSettignsFile, (err) => {
//         if (err) return console.log(err)
//       })
//     })
//   }
//   if (err && err[1] !== -2) return console.log(err)

//   if (obj !== appDataFile) {
//     appSettignsFile = obj
//   }
// })

// get appData path
const appDataPath = app.getPath('appData') + '/B-Project/appData.json'

// declare app data file
let appDataFile = { recentDir: '' }

// read appdata file
fs.readJSON(appDataPath, (err: any, obj) => {
  // create file if it doesnt exist
  if (err && err.errno === -2) {
    fs.ensureFile(appDataPath, (err) => {
      if (err) return console.log(err)
      fs.writeJSON(appDataPath, appDataFile, (err) => {
        if (err) return console.log(err)
      })
    })
  }

  if (err && err.errno !== -2) return console.log(err)

  if (obj !== appDataFile) {
    appDataFile = obj
    workingDir = appDataFile.recentDir
    setupWorkingDir()
  }
})

const setupWorkingDir = (): void => {
  fs.ensureDir(workingDir, (err) => {
    if (err) return console.log(err)
    fs.ensureDir(workingDir + '/Notes', (err) => {
      if (err) return console.log(err)
    })
    fs.ensureDir(workingDir + '/Todos', (err) => {
      if (err) return console.log(err)
    })
  })
  fs.writeJSON(appDataPath, appDataFile, (err) => {
    if (err) return console.log(err)
  })
  gitSetup()
}

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
  setupWorkingDir()
})

let dirTree
ipcMain.handle('getNotesDirTree', () => {
  dirTree = directoryTree(workingDir + '/Notes', {
    extensions: /\.md/,
    attributes: ['type']
  })
  return dirTree
})
ipcMain.handle('createNote', (_event, fileName) => {
  const filePath = workingDir + '/Notes/' + fileName + '.md'
  fs.ensureFile(filePath, (err) => {
    if (err) return console.log(err)
    fs.writeFile(filePath, `# ${fileName}`, (err) => {
      if (err) return console.log(err)
    })
  })
})
ipcMain.handle('createDir', (_event, dirName) => {
  const dirPath = workingDir + '/Notes/' + dirName
  fs.ensureDir(dirPath, (err) => {
    if (err) return console.log(err)
  })
})
let currentNotePath
ipcMain.handle('openNote', (_event, filePath) => {
  currentNotePath = filePath
  return fs.readFileSync(filePath, { encoding: 'utf8' })
})
ipcMain.handle('saveNote', (_event, data) => {
  if (data === '') data = Date.now
  fs.writeFile(currentNotePath, data, (err) => {
    if (err) return console.log(err)
  })
})

ipcMain.handle('getTodosDirTree', () => {
  dirTree = directoryTree(workingDir + '/Todos', {
    extensions: /\.json/,
    attributes: ['type']
  })
  return dirTree
})

ipcMain.handle('createTodo', (_event, fileName) => {
  const filePath = workingDir + '/Todos/' + fileName + '.json'
  fs.ensureFile(filePath, (err) => {
    if (err) return console.log(err)
    fs.writeJSON(filePath, [], (err) => {
      if (err) return console.log(err)
    })
  })
})
let currentTodoPath
ipcMain.handle('openTodo', (_event, filePath) => {
  currentTodoPath = filePath
  return fs.readJSON(filePath, { encoding: 'utf8' })
})
ipcMain.handle('saveTodo', (_event, data) => {
  fs.writeJSON(currentTodoPath, data, (err) => {
    if (err) return console.log(err)
  })
})

let gitOptions: Partial<SimpleGitOptions> = {}
let git: SimpleGit

const gitSetup = (): void => {
  gitOptions = {
    baseDir: workingDir,
    binary: 'git',
    maxConcurrentProcesses: 6,
    trimmed: false
  }
  git = simpleGit(gitOptions)
}

ipcMain.handle('gitSetup', () => {
  gitSetup()
})

ipcMain.handle('gitInit', () => {
  gitSetup()
  git.init()
})

ipcMain.handle('gitBranch', () => {
  git.branch(['-M', 'main'])
})

ipcMain.handle('gitStatus', () => {
  git.status((err, result) => {
    if (err) return console.log(err)
    console.log(result)
    return result
  })
})

ipcMain.handle('gitAdd', () => {
  git.add('.', (err, result) => {
    if (err) return console.log(err)
    console.log(result)
  })
})

ipcMain.handle('gitAddRemote', (_event, remoteURL) => {
  git.addRemote('origin', remoteURL, (err, result) => {
    if (err?.message.includes('error: remote origin already exists.')) {
      git
        .removeRemote('origin', (err, result) => {
          if (err) return console.log(err)
          console.log(result)
        })
        .addRemote('origin', remoteURL, (err, result) => {
          if (err) return console.log(err)
          console.log(result)
        })
    } else return console.log(err)
    console.log('add remote Done')
    console.log(result)
  })
})

ipcMain.handle('gitListRemote', () => {
  return git.listRemote([], (err, result) => {
    if (err) {
      console.log(err)
    }
    console.log(result)
  })
})

ipcMain.handle('gitGetRemotes', () => {
  return git.getRemotes(true, (err, result) => {
    if (err) {
      console.log(err)
    }
    console.log(result)
  })
})

ipcMain.handle('gitCommit', () => {
  git.commit('update', (err, result) => {
    if (err) return console.log(err)
    console.log(result)
  })
})

ipcMain.handle('gitPush', (_event, option = '--verbose') => {
  git.push(['--set-upstream', 'origin', 'main', option], (err, result) => {
    if (err) return console.log(err)
    console.log(result)
  })
})

ipcMain.handle('gitPull', (_event, force = false) => {
  if (force) {
    git
      .fetch([], (err, result) => {
        if (err) return console.log(err)
        console.log(result)
      })
      .reset(['--hard'], (err, result) => {
        if (err) return console.log(err)
        console.log(result)
      })
  }
  git.pull(['origin', 'main'], (err, result) => {
    if (err) return console.log(err)
    console.log(result)
  })
})

ipcMain.handle('gitSync', async () => {
  await git.init()
  await git.branch(['-M', 'main'])
  await git
    .add('.', (err, result) => {
      if (err) console.log(err)
      console.log('add Done')
      console.log(result)
    })
    .commit('update', (err, result) => {
      if (err) console.log(err)
      console.log('commit Done')
      console.log(result)
    })
  await git.pull(['--rebase=true', 'origin', 'main'], (err, result) => {
    if (err) return console.log(err)
    console.log('pull Done')
    console.log(result)
  })
  await git.push(['--set-upstream', 'origin', 'main'], (err, result) => {
    if (err) console.log(err)
    console.log('push Done' + result)
  })
})

app.on('before-quit', () => {
  fs.writeJSON(appDataPath, appDataFile, (err) => {
    if (err) return console.log(err)
  })
})
