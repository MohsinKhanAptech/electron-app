/* eslint-disable react/prop-types */
import {
  FaArrowsRotate,
  FaCalendarDays,
  FaFolder,
  FaGear,
  FaListCheck,
  FaNoteSticky
} from 'react-icons/fa6'
import SidebarItem from './SidebarItem'

function Sidebar({
  hideNotesExplorer,
  updateHideNotesExplorer,
  hideDirSelect,
  updateHideDirSelect
}): JSX.Element {
  return (
    <nav
      id="sidebar"
      className="flex flex-col justify-between h-full overflow-hidden text-2xl bg-neutral-900"
    >
      <ul className="flex flex-col">
        <SidebarItem onClick={() => updateHideNotesExplorer(!hideNotesExplorer)}>
          <FaNoteSticky />
        </SidebarItem>
        <SidebarItem>
          <FaListCheck />
        </SidebarItem>
        <SidebarItem>
          <FaCalendarDays />
        </SidebarItem>
        <SidebarItem>
          <FaArrowsRotate />
        </SidebarItem>
      </ul>
      <ul className="flex flex-col">
        <SidebarItem onClick={() => updateHideDirSelect(!hideDirSelect)}>
          <FaFolder />
        </SidebarItem>
        <SidebarItem>
          <FaGear />
        </SidebarItem>
      </ul>
    </nav>
  )
}

export default Sidebar
