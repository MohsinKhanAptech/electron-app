import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    context: {
      windowMinimize
      windowMaximize
      windowClose
      recentDirExists
      getCurrentDir
      handleDirSelect
      handleDirSubmit
      mapDir
    }
  }
}
