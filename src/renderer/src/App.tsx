import { useEffect, useState } from 'react'
import DirSelect from './components/DirSelect'
import Sidebar from './components/Sidebar'
import NotesExplorer from './components/NotesExplorer'
import Titlebar from './components/Titlebar'
import DirCreate from './components/DirCreate'
import NoteCreate from './components/NoteCreate'
import GitMenu from './components/GitMenu'
import GitAddRemote from './components/GitAddRemote'
import SidebarMenu from './components/SidebarMenu'
import TodoSideabrMenu from './components/TodoSidebarMenu'
import TodoCreate from './components/TodoCreate'
import MainWindowContainer from './components/MainWindowContainer'
import NoteEditor from './components/NoteEditor'
import TodoEditorContainer from './components/TodoEditorContainer'
import Calendar from './components/Calendar'
import PopupMenu from './components/PopupMenu'
import ExcalidrawEditor from './components/ExcalidrawEditor'
import ExcalidrawSidebarMenu from './components/ExcalidrawSidebarMenu'
import ExcalidrawCreate from './components/ExcalidrawCreate'

function App(): JSX.Element {
  const [hideDirSelect, updateHideDirSelect] = useState(true)
  const [hideSidebarMenu, updateHideHideSidebarMenu] = useState(true)
  const [hideNotesExplorer, updateHideNotesExplorer] = useState(true)
  const [hideDirCreate, updateHideDirCreate] = useState(true)
  const [hideNoteCreate, updateHideNoteCreate] = useState(true)
  const [currentNotePath, updateCurrentNotePath] = useState('')
  const [hideTodoSidebarMenu, updateHideTodoSidebarMenu] = useState(true)
  const [hideTodoCreate, updateHideTodoCreate] = useState(true)
  const [currentTodoPath, updateCurrentTodoPath] = useState('')
  const [hideCalendar, updateHideCalendar] = useState(true)
  const [hideExcalidrawSidebarMenu, updateHideExcalidrawSidebarMenu] = useState(true)
  const [hideExcalidrawCreate, updateHideExcalidrawCreate] = useState(true)
  const [currentExcalidrawPath, updateCurrentExcalidrawPath] = useState('')
  const [hideGitMenu, updateHideGitMenu] = useState(true)
  const [hideAddRemoteMenu, updateHideAddRemoteMenu] = useState(true)
  const [remoteURL, updateRemoteURL] = useState('')

  const [hideNoteEditor, updateHideNoteEditor] = useState(true)
  const [hideTodoEditor, updateHideTodoEditor] = useState(true)
  const [hideExcalidraw, updateHideExcalidraw] = useState(true)

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

  const handleEditor = (editor): void => {
    switch (editor) {
      case 'noteEditor':
        updateHideNoteEditor(false)
        updateHideTodoEditor(true)
        updateHideCalendar(true)
        updateHideExcalidraw(true)
        break
      case 'todoEditor':
        updateHideTodoEditor(false)
        updateHideNoteEditor(true)
        updateHideCalendar(true)
        updateHideExcalidraw(true)
        break
      case 'calendar':
        updateHideCalendar(false)
        updateHideTodoEditor(true)
        updateHideNoteEditor(true)
        updateHideExcalidraw(true)
        break
      case 'excalidraw':
        updateHideExcalidraw(false)
        updateHideCalendar(true)
        updateHideTodoEditor(true)
        updateHideNoteEditor(true)
        break
    }
  }

  const [popupMenu, updatePopupMenu] = useState(<></>)
  const popupMenuConstructor = (
    showAccept: boolean = true,
    showCancel: boolean = true,
    title: string,
    message: string = '',
    showInputField: boolean,
    onSubmit: VoidFunction
  ): void => {
    const result = (
      <PopupMenu
        showAccept={showAccept}
        showCancel={showCancel}
        title={title}
        message={message}
        showInputField={showInputField}
        onSubmit={onSubmit}
      />
    )
    console.log(result)
    updatePopupMenu(result)
  }

  const [selected, setSelected] = useState<Date>(new Date())
  const [allTodos, updateAllTodos] = useState([{}])
  const getAllTodos = async (): Promise<void> => {
    let _temp: Array<object> = []
    window.context.getTodosDirTree().then((todotree) => {
      todotree.children.forEach((dir) => {
        window.context.openTodo(dir.path).then((todos) => {
          _temp = _temp.concat(todos)
          updateAllTodos(_temp)
        })
      })
    })
  }

  useEffect(() => {
    checkRecentDir()
    window.context.git.setup()
    getRemotes()
    const getRemotesInterval = setInterval(() => {
      if (hideDirSelect) {
        getRemotes()
        clearInterval(getRemotesInterval)
      }
      if (remoteURL !== '') clearInterval(getRemotesInterval)
    }, 3000)
    setTimeout(() => {
      clearInterval(getRemotesInterval)
    }, 15000)

    // get all todos
    getAllTodos()
  }, [])

  return (
    <div className="flex flex-col h-full">
      <Titlebar />
      {popupMenu}
      {hideDirSelect ? null : <DirSelect updateHideDirSelect={updateHideDirSelect} />}
      {hideDirCreate ? null : <DirCreate updateHideDirCreate={updateHideDirCreate} />}
      {hideNoteCreate ? null : <NoteCreate updateHideNoteCreate={updateHideNoteCreate} />}
      {hideTodoCreate ? null : <TodoCreate updateHideTodoCreate={updateHideTodoCreate} />}
      {hideExcalidrawCreate ? null : (
        <ExcalidrawCreate updateHideExcalidrawCreate={updateHideExcalidrawCreate} />
      )}
      {hideAddRemoteMenu ? null : (
        <GitAddRemote
          updateHideAddRemoteMenu={updateHideAddRemoteMenu}
          updateRemoteURL={updateRemoteURL}
        />
      )}
      <div className="flex flex-grow h-[calc(100vh-2.5rem)]">
        <Sidebar
          hideDirSelect={hideDirSelect}
          updateHideDirSelect={updateHideDirSelect}
          updateHideSidebarMenu={updateHideHideSidebarMenu}
          hideNotesExplorer={hideNotesExplorer}
          updateHideNotesExplorer={updateHideNotesExplorer}
          hideTodoSidebarMenu={hideTodoSidebarMenu}
          updateHideTodoSidebarMenu={updateHideTodoSidebarMenu}
          hideGitMenu={hideGitMenu}
          updateHideGitMenu={updateHideGitMenu}
          handleEditor={handleEditor}
          hideExcalidrawMenu={hideExcalidrawSidebarMenu}
          updateHideExcalidrawMenu={updateHideExcalidrawSidebarMenu}
        />
        {hideSidebarMenu ? null : (
          <SidebarMenu>
            {hideNotesExplorer && hideDirSelect ? null : (
              <NotesExplorer
                currentNotePath={currentNotePath}
                updateHideDirCreate={updateHideDirCreate}
                updateHideNoteCreate={updateHideNoteCreate}
                updateCurrentNotePath={updateCurrentNotePath}
                handleEditor={handleEditor}
              />
            )}
            {hideTodoSidebarMenu ? null : (
              <TodoSideabrMenu
                currentTodoPath={currentTodoPath}
                updateHideTodoCreate={updateHideTodoCreate}
                updateCurrentTodoPath={updateCurrentTodoPath}
                handleEditor={handleEditor}
              />
            )}
            {hideExcalidrawSidebarMenu ? null : (
              <ExcalidrawSidebarMenu
                updateHideExcalidrawCreate={updateHideExcalidrawCreate}
                currentExcalidrawPath={currentExcalidrawPath}
                updateCurrentExcalidrawPath={updateCurrentExcalidrawPath}
                handleEditor={handleEditor}
              />
            )}
            {hideGitMenu ? null : (
              <GitMenu
                remoteURL={remoteURL}
                updateHideAddRemoteMenu={updateHideAddRemoteMenu}
                getRemotes={getRemotes}
              />
            )}
          </SidebarMenu>
        )}
        <MainWindowContainer>
          {hideNoteEditor ? null : (
            <NoteEditor key={currentNotePath} currentNotePath={currentNotePath} />
          )}
          {hideTodoEditor ? null : (
            <TodoEditorContainer
              key={currentTodoPath}
              currentTodoPath={currentTodoPath}
              popupMenuConstructor={popupMenuConstructor}
            />
          )}
          {hideCalendar ? null : (
            <Calendar
              key={selected.toString()}
              selected={selected}
              setSelected={setSelected}
              allTodos={allTodos}
              getAllTodos={getAllTodos}
            />
          )}
          {hideExcalidraw ? null : (
            <ExcalidrawEditor
              key={currentExcalidrawPath}
              currentExcalidrawPath={currentExcalidrawPath}
            />
          )}
          {hideNoteEditor && hideTodoEditor && hideCalendar && hideExcalidraw ? (
            <div className="flex flex-col items-center justify-center w-full h-full gap-2">
              <h2 className="text-5xl">Welcome!</h2>
              <div className="">Please Select a File to Continue</div>
            </div>
          ) : null}
        </MainWindowContainer>
      </div>
    </div>
  )
}

export default App
