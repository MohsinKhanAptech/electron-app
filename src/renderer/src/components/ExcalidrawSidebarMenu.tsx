/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { FaPen, FaPlus, FaRotate } from 'react-icons/fa6'
import SidebarMenuItem from './SidebarMenuItem'

function ExcalidrawSidebarMenu({
  updateHideExcalidrawCreate,
  currentExcalidrawPath,
  updateCurrentExcalidrawPath,
  handleEditor
}): JSX.Element {
  const [dirTree, updateDirTree] = useState({ name: '', path: '', type: '', children: [] })

  const getDirTree = (): void => {
    window.context.getDrawingsDirTree().then((result) => {
      updateDirTree(result)
    })
  }

  useEffect(() => {
    getDirTree()
  }, [])

  const mapDir = (element): JSX.Element => {
    let result: JSX.Element = <></>
    const style = {
      borderLeft: 2 + 'px rgb(255,255,255,0.1) solid'
    }
    const activeStyle = {
      borderLeft: 2 + 'px rgb(255,255,255,0.5) solid'
    }

    element.children.forEach((child) => {
      if (child.type === 'file') {
        result = (
          <>
            {result}
            <SidebarMenuItem
              style={child.path === currentExcalidrawPath ? activeStyle : style}
              onClick={() => {
                updateCurrentExcalidrawPath(child.path)
                handleEditor('excalidraw')
              }}
              text={child.name.slice(0, child.name.search(/\.json/))}
            >
              <FaPen className="flex-shrink-0" />
            </SidebarMenuItem>
          </>
        )
      }
    })
    return result
  }

  return (
    <>
      <div className="flex items-center justify-between gap-3 p-3 text-lg">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap">
          {dirTree.name.toUpperCase()}
        </p>
        <div className="flex gap-3 *:flex-shrink-0 items-center">
          <FaPlus
            className="hover:opacity-75 active:opacity-100"
            onClick={() => updateHideExcalidrawCreate(false)}
          />
          <FaRotate className="hover:opacity-75 active:opacity-100" onClick={getDirTree} />
        </div>
      </div>
      <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700 active:scrollbar-thumb-neutral-600">
        {mapDir(dirTree)}
      </div>
    </>
  )
}

export default ExcalidrawSidebarMenu
