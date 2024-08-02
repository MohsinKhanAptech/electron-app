import { useEffect, useState } from 'react'
import DirSelect from './components/DirSelect'
import Sidebar from './components/Sidebar'
import NotesExplorer from './components/NotesExplorer'
import Titlebar from './components/Titlebar'
import Ckeditor from './components/Ckeditor'
import DirCreate from './components/DirCreate'
import NoteCreate from './components/NoteCreate'

function App(): JSX.Element {
  const [hideDirSelect, updateHideDirSelect] = useState()
  const [hideNotesExplorer, updateHideNotesExplorer] = useState(false)
  const [hideDirCreate, updateHideDirCreate] = useState(true)
  const [hideNoteCreate, updateHideNoteCreate] = useState(true)
  const [currentNotePath, updateCurrentNotePath] = useState('')

  const checkRecentDir = (): void => {
    window.context.recentDirExists().then((result) => {
      updateHideDirSelect(result)
    })
  }

  useEffect(() => checkRecentDir(), [])

  return (
    <div className="flex flex-col h-full">
      <Titlebar />
      {hideDirSelect === false ? <DirSelect updateHideDirSelect={updateHideDirSelect} /> : null}
      {hideDirCreate === false ? <DirCreate updateHideDirCreate={updateHideDirCreate} /> : null}
      {hideNoteCreate === false ? <NoteCreate updateHideNoteCreate={updateHideNoteCreate} /> : null}
      <div className="flex flex-grow h-[calc(100vh-2.5rem)]">
        <Sidebar
          hideNotesExplorer={hideNotesExplorer}
          updateHideNotesExplorer={updateHideNotesExplorer}
          hideDirSelect={hideDirSelect}
          updateHideDirSelect={updateHideDirSelect}
          className="flex-shrink-0"
        />
        {hideNotesExplorer === false && hideDirSelect === true ? (
          <NotesExplorer
            currentNotePath={currentNotePath}
            updateHideDirCreate={updateHideDirCreate}
            updateHideNoteCreate={updateHideNoteCreate}
            updateCurrentNotePath={updateCurrentNotePath}
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
