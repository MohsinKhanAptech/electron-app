import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('Context Isolation seems to be disabled')
}

try {
  contextBridge.exposeInMainWorld('context', {
    windowMinimize: () => {
      ipcRenderer.send('window-minimize')
    },
    windowMaximize: () => {
      ipcRenderer.send('window-maximize')
    },
    windowClose: () => {
      ipcRenderer.send('window-close')
    },
    recentDirExists: () => {
      return ipcRenderer.invoke('recentDirExists')
    },
    getCurrentDir: () => {
      return ipcRenderer.invoke('getCurrentDir')
    },
    handleDirSelect: () => {
      ipcRenderer.send('handleDirSelect')
    },
    handleDirSubmit: (dirName) => {
      ipcRenderer.send('handleDirSubmit', dirName)
    },
    getNotesDirTree: () => {
      return ipcRenderer.invoke('getNotesDirTree')
    },
    createNote: (fileName) => {
      ipcRenderer.invoke('createNote', fileName)
    },
    createDir: (dirName) => {
      ipcRenderer.invoke('createDir', dirName)
    },
    openNote: (filePath) => {
      return ipcRenderer.invoke('openNote', filePath)
    },
    saveNote: (data) => {
      ipcRenderer.invoke('saveNote', data)
    },
    getTodosDirTree: () => {
      return ipcRenderer.invoke('getTodosDirTree')
    },
    createTodo: (fileName) => {
      ipcRenderer.invoke('createTodo', fileName)
    },
    openTodo: (filePath) => {
      return ipcRenderer.invoke('openTodo', filePath)
    },
    saveTodo: (data) => {
      ipcRenderer.invoke('saveTodo', data)
    },
    getDrawingsDirTree: () => {
      return ipcRenderer.invoke('getDrawingsDirTree')
    },
    createDrawing: (fileName) => {
      ipcRenderer.invoke('createDrawing', fileName)
    },
    openDrawing: (filePath) => {
      return ipcRenderer.invoke('openDrawing', filePath)
    },
    saveDrawing: (data) => {
      ipcRenderer.invoke('saveDrawing', data)
    },
    git: {
      setup: () => ipcRenderer.invoke('gitSetup'),
      init: () => ipcRenderer.invoke('gitInit'),
      branch: () => ipcRenderer.invoke('gitBranch'),
      status: () => {
        return ipcRenderer.invoke('gitStatus')
      },
      add: () => ipcRenderer.invoke('gitAdd'),
      addRemote: (remoteURL) => ipcRenderer.invoke('gitAddRemote', remoteURL),
      listRemote: () => {
        return ipcRenderer.invoke('gitListRemote')
      },
      getRemotes: () => {
        return ipcRenderer.invoke('gitGetRemotes')
      },
      commit: () => ipcRenderer.invoke('gitCommit'),
      push: (option) => ipcRenderer.invoke('gitPush', option),
      pull: (force) => ipcRenderer.invoke('gitPull', force),
      sync: () => ipcRenderer.invoke('gitSync')
    }
  })
} catch (error) {
  console.log(error)
}
