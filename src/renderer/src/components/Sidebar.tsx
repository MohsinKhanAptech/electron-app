/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import {
  FaCalendarDays,
  FaCodeBranch,
  FaFolder,
  FaGear,
  FaListCheck,
  FaNoteSticky
} from 'react-icons/fa6'
import SidebarItem from './SidebarItem'
import { classMerge } from '@renderer/utils'

function Sidebar({
  hideDirSelect,
  updateHideDirSelect,
  hideNotesExplorer,
  updateHideNotesExplorer,
  hideGitMenu,
  updateHideGitMenu,
  hideAddRemoteMenu,
  updateHideAddRemoteMenu,
  remoteURL,
  updateRemoteURL,
  ...props
}): JSX.Element {
  const openMenu = (menu): void => {
    switch (menu) {
      case 'noteExplorer':
        updateHideNotesExplorer(!hideNotesExplorer)
        updateHideDirSelect(true)
        updateHideGitMenu(true)
        break
      case 'gitMenu':
        if (remoteURL === '') {
          updateHideAddRemoteMenu(false)
          break
        }
        updateHideGitMenu(false)
        setTimeout(() => {
          updateHideGitMenu(true)
        }, 2500)
        break
      case 'dirSelect':
        updateHideDirSelect(!hideDirSelect)
        updateHideNotesExplorer(true)
        updateHideGitMenu(true)
        break
    }
  }

  return (
    <nav
      className={classMerge(
        'flex flex-col justify-between h-full overflow-hidden text-2xl bg-neutral-900',
        props.className
      )}
    >
      <ul className="flex flex-col">
        <SidebarItem onClick={() => openMenu('noteExplorer')}>
          <FaNoteSticky />
        </SidebarItem>
        <SidebarItem>
          <FaListCheck />
        </SidebarItem>
        <SidebarItem>
          <FaCalendarDays />
        </SidebarItem>
        <SidebarItem onClick={() => openMenu('gitMenu')}>
          <FaCodeBranch />
        </SidebarItem>
      </ul>
      <ul className="flex flex-col">
        <SidebarItem onClick={() => openMenu('dirSelect')}>
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
