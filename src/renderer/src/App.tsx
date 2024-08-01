import { useEffect, useState } from 'react'
import DirSelect from './components/DirSelect'
import Sidebar from './components/Sidebar'
import NotesExplorer from './components/NotesExplorer'
import Titlebar from './components/Titlebar'

function App(): JSX.Element {
  const [hideDirSelect, updateHideDirSelect] = useState()
  const [hideNotesExplorer, updateHideNotesExplorer] = useState(false)

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
      <div className="flex flex-grow">
        <Sidebar
          hideNotesExplorer={hideNotesExplorer}
          updateHideNotesExplorer={updateHideNotesExplorer}
          hideDirSelect={hideDirSelect}
          updateHideDirSelect={updateHideDirSelect}
        />
        {hideNotesExplorer === false && hideDirSelect === true ? <NotesExplorer /> : null}
        <main className="flex-grow bg-neutral-900">
          <div className="w-full h-full p-5 rounded-tl-lg bg-neutral-950/50">
            <h1 className="text-3xl">Hello World</h1>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
