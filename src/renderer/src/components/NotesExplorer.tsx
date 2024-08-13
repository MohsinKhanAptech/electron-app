/* eslint-disable react/prop-types */
import { FaFileMedical, FaFolder, FaFolderPlus, FaNoteSticky, FaRotate } from 'react-icons/fa6'
import { useEffect, useState } from 'react'
import SidebarMenuItem from './SidebarMenuItem'

function NotesExplorer({
  currentNotePath,
  updateCurrentNotePath,
  updateHideDirCreate,
  updateHideNoteCreate,
  handleEditor
}): JSX.Element {
  const [dirTree, updateDirTree] = useState({ name: '', path: '', type: '', children: [] })

  const getDirTree = (): void => {
    window.context.getNotesDirTree().then((result) => {
      updateDirTree(result)
    })
  }

  useEffect(() => {
    getDirTree()
  }, [])

  let nest = 0
  const mapDir = (element): JSX.Element => {
    let result: JSX.Element = <></>
    nest++
    const style = {
      borderLeft: nest * 2 + 'px rgb(255,255,255,0.1) solid'
    }
    const activeStyle = {
      borderLeft: nest * 2 + 'px rgb(255,255,255,0.5) solid'
    }

    element.children.forEach((child) => {
      if (child.type === 'directory') {
        result = (
          <>
            {result}
            <SidebarMenuItem style={style} text={child.name}>
              <FaFolder className="flex-shrink-0" />
            </SidebarMenuItem>
            {mapDir(child)}
          </>
        )
      }
      if (child.type === 'file') {
        result = (
          <>
            {result}
            <SidebarMenuItem
              style={child.path === currentNotePath ? activeStyle : style}
              onClick={() => {
                updateCurrentNotePath(child.path)
                handleEditor('noteEditor')
              }}
              text={child.name.slice(0, child.name.search(/\.md/))}
            >
              <FaNoteSticky className="flex-shrink-0" />
            </SidebarMenuItem>
          </>
        )
      }
    })
    nest--
    return result
  }

  // const mappedDir = (): JSX.Element => {
  //   let result
  //   setInterval(() => {
  //     result = mapDir(dirTree)
  //   }, 500)
  //   return result
  // }

  return (
    <>
      <div className="flex items-center justify-between gap-3 p-3 text-lg">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap">
          {dirTree.name.toUpperCase()}
        </p>
        <div className="flex gap-3 *:flex-shrink-0 items-center">
          <FaFileMedical
            className="hover:opacity-75 active:opacity-100"
            onClick={() => updateHideNoteCreate(false)}
          />
          <FaFolderPlus
            className="hover:opacity-75 active:opacity-100"
            onClick={() => updateHideDirCreate(false)}
          />
          <FaRotate className="hover:opacity-75 active:opacity-100" onClick={getDirTree} />
        </div>
      </div>
      <div className="flex-shrink overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700 active:scrollbar-thumb-neutral-600">
        {mapDir(dirTree)}
      </div>
    </>
  )
}

export default NotesExplorer
