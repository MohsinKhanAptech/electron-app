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
    mapDir: () => {
      return ipcRenderer.invoke('mapDir')
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
    saveNote: (noteData) => {
      ipcRenderer.invoke('saveNote', noteData)
    }
  })
} catch (error) {
  console.log(error)
}
