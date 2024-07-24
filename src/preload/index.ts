import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('Context Isolation seems to be disabled')
}

try {
  contextBridge.exposeInMainWorld('context', {
    windowMinimize: () => ipcRenderer.send('window-minimize'),
    windowMaximize: () => ipcRenderer.send('window-maximize'),
    windowClose: () => ipcRenderer.send('window-close'),
    isWindowMaximized: () => {}
  })
} catch (error) {
  console.log(error)
}
