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
      getNotesDirTree
      createNote
      createDir
      openNote
      saveNote
      getTodosDirTree
      createTodo
      openTodo
      saveTodo
      openDrawing
      saveDrawing
      git: {
        setup
        init
        branch
        status
        add
        addRemote
        listRemote
        getRemotes
        commit
        push
        pull
        sync
      }
    }
  }
}
