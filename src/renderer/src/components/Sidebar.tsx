/* eslint-disable react/prop-types */
import {
  FaCalendarDays,
  FaCodeBranch,
  FaFolder,
  FaGear,
  FaListCheck,
  FaNoteSticky,
  FaPencil
} from 'react-icons/fa6'
import SidebarItem from './SidebarItem'

function Sidebar({
  hideDirSelect,
  updateHideDirSelect,
  updateHideSidebarMenu,
  hideNotesExplorer,
  updateHideNotesExplorer,
  hideTodoSidebarMenu,
  updateHideTodoSidebarMenu,
  handleEditor,
  hideGitMenu,
  updateHideGitMenu
}): JSX.Element {
  const openMenu = (menu): void => {
    switch (menu) {
      case 'noteExplorer':
        if (hideNotesExplorer === false) {
          updateHideSidebarMenu(true)
          updateHideNotesExplorer(true)
        } else {
          updateHideSidebarMenu(false)
          updateHideNotesExplorer(false)
          updateHideTodoSidebarMenu(true)
          updateHideDirSelect(true)
          updateHideGitMenu(true)
        }
        break
      case 'todoMenu':
        if (hideTodoSidebarMenu === false) {
          updateHideSidebarMenu(true)
          updateHideTodoSidebarMenu(true)
        } else {
          updateHideSidebarMenu(false)
          updateHideTodoSidebarMenu(false)
          updateHideNotesExplorer(true)
          updateHideDirSelect(true)
          updateHideGitMenu(true)
        }
        break
      case 'calendar':
        handleEditor('calendar')
        updateHideSidebarMenu(true)
        updateHideNotesExplorer(true)
        updateHideTodoSidebarMenu(true)
        updateHideDirSelect(true)
        updateHideGitMenu(true)
        break
      case 'excalidraw':
        handleEditor('excalidraw')
        updateHideSidebarMenu(true)
        updateHideNotesExplorer(true)
        updateHideTodoSidebarMenu(true)
        updateHideDirSelect(true)
        updateHideGitMenu(true)
        break
      case 'gitMenu':
        if (hideGitMenu === false) {
          updateHideGitMenu(true)
          updateHideSidebarMenu(true)
        } else {
          updateHideGitMenu(false)
          updateHideSidebarMenu(false)
          updateHideTodoSidebarMenu(true)
          updateHideNotesExplorer(true)
          updateHideDirSelect(true)
        }
        break
      case 'dirSelect':
        updateHideDirSelect(!hideDirSelect)
        break
    }
  }

  return (
    <nav className="flex flex-col justify-between flex-shrink-0 h-full overflow-hidden text-2xl bg-neutral-900">
      <ul className="flex flex-col">
        <SidebarItem onClick={() => openMenu('noteExplorer')}>
          <FaNoteSticky />
        </SidebarItem>
        <SidebarItem onClick={() => openMenu('todoMenu')}>
          <FaListCheck />
        </SidebarItem>
        <SidebarItem onClick={() => openMenu('calendar')}>
          <FaCalendarDays />
        </SidebarItem>
        <SidebarItem onClick={() => openMenu('excalidraw')}>
          <FaPencil />
        </SidebarItem>
        <SidebarItem onClick={() => openMenu('gitMenu')}>
          <FaCodeBranch />
        </SidebarItem>
      </ul>
      <ul className="flex flex-col">
        <SidebarItem onClick={() => openMenu('dirSelect')}>
          <FaFolder />
        </SidebarItem>
        <SidebarItem onClick={() => openMenu('settingsMenu')}>
          <FaGear />
        </SidebarItem>
      </ul>
    </nav>
  )
}

export default Sidebar
