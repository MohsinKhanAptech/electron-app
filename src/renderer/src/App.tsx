import { useEffect, useState } from 'react'
import DirSelect from './components/DirSelect'
import Sidebar from './components/Sidebar'
import NotesExplorer from './components/NotesExplorer'
import Titlebar from './components/Titlebar'
import Ckeditor from './components/Ckeditor'
import DirCreate from './components/DirCreate'
import NoteCreate from './components/NoteCreate'
import GitMenu from './components/GitMenu'
import GitAddRemote from './components/GitAddRemote'

function App(): JSX.Element {
  const [hideDirSelect, updateHideDirSelect] = useState()
  const [hideNotesExplorer, updateHideNotesExplorer] = useState(false)
  const [hideDirCreate, updateHideDirCreate] = useState(true)
  const [hideNoteCreate, updateHideNoteCreate] = useState(true)
  const [currentNotePath, updateCurrentNotePath] = useState('')
  const [hideGitMenu, updateHideGitMenu] = useState(true)
  const [hideAddRemoteMenu, updateHideAddRemoteMenu] = useState(true)
  const [remoteURL, updateRemoteURL] = useState('')

  const checkRecentDir = (): void => {
    window.context.recentDirExists().then((result) => {
      updateHideDirSelect(result)
    })
  }

  const getRemotes = (): void => {
    window.context.git
      .getRemotes()
      .then((result: Array<{ name: string; refs: { feth: string; push: string } }>) => {
        if (result.length !== 0) {
          result.forEach((remote) => {
            if (remote.name === 'origin') {
              updateRemoteURL(remote.refs.push)
            }
          })
        }
      })
  }

  useEffect(() => {
    checkRecentDir()
    window.context.git.setup()
    getRemotes()
    const getRemotesInterval = setInterval(() => {
      getRemotes()
    }, 2500)
    setTimeout(() => {
      clearInterval(getRemotesInterval)
    }, 10000)
  }, [])

  return (
    <div className="flex flex-col h-full">
      <Titlebar />
      {hideDirSelect === false ? <DirSelect updateHideDirSelect={updateHideDirSelect} /> : null}
      {hideDirCreate === false ? <DirCreate updateHideDirCreate={updateHideDirCreate} /> : null}
      {hideNoteCreate === false ? <NoteCreate updateHideNoteCreate={updateHideNoteCreate} /> : null}
      <div className="flex flex-grow h-[calc(100vh-2.5rem)]">
        <Sidebar
          className="flex-shrink-0"
          hideDirSelect={hideDirSelect}
          updateHideDirSelect={updateHideDirSelect}
          hideNotesExplorer={hideNotesExplorer}
          updateHideNotesExplorer={updateHideNotesExplorer}
          hideGitMenu={hideGitMenu}
          updateHideGitMenu={updateHideGitMenu}
          hideAddRemoteMenu={hideAddRemoteMenu}
          updateHideAddRemoteMenu={updateHideAddRemoteMenu}
          remoteURL={remoteURL}
          updateRemoteURL={updateRemoteURL}
        />
        {hideNotesExplorer === false && hideDirSelect === true ? (
          <NotesExplorer
            currentNotePath={currentNotePath}
            updateHideDirCreate={updateHideDirCreate}
            updateHideNoteCreate={updateHideNoteCreate}
            updateCurrentNotePath={updateCurrentNotePath}
          />
        ) : null}
        {hideGitMenu === false ? <GitMenu /> : null}
        {hideAddRemoteMenu === false ? (
          <GitAddRemote
            updateHideAddRemoteMenu={updateHideAddRemoteMenu}
            updateRemoteURL={updateRemoteURL}
          />
        ) : null}
        <main className="flex-grow block bg-neutral-900">
          <div className="block w-full h-full overflow-y-auto rounded-tl-lg bg-neutral-950/50 scrollbar-thin scrollbar-thumb-neutral-800 active:scrollbar-thumb-neutral-700">
            <Ckeditor key={currentNotePath} currentNotePath={currentNotePath}></Ckeditor>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
