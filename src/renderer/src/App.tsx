import Sidebar from './components/Sidebar'
import SidebarNotes from './components/SidebarNotes'
import Titlebar from './components/Titlebar'

function App(): JSX.Element {
  return (
    <div className="flex flex-col h-full">
      <Titlebar />
      <div className="flex flex-grow">
        <Sidebar />
        <SidebarNotes />
        <main className="flex-grow bg-neutral-900">
          <div className="w-full h-full p-5 rounded-tl-lg bg-neutral-950">
            <h1 className="text-3xl">Hello World</h1>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
