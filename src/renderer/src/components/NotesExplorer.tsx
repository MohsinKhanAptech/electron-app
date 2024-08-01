import { FaFileMedical, FaFolder, FaFolderPlus, FaNoteSticky, FaRotate } from 'react-icons/fa6'
import { useEffect, useState } from 'react'
import NotesExplorerItem from './NotesExplorerItem'

function NotesExplorer(): JSX.Element {
  const [dirTree, updateDirTree] = useState({ name: '', path: '', type: '', children: [] })

  const getDirTree = (): void => {
    window.context.mapDir().then((result) => {
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
    element.children.forEach((child) => {
      if (child.type === 'directory') {
        result = (
          <>
            {result}
            <NotesExplorerItem style={style} className={`ps-[${nest}rem]`}>
              <FaFolder /> {child.name}
            </NotesExplorerItem>
            {mapDir(child)}
          </>
        )
      }
      if (child.type === 'file') {
        result = (
          <>
            {result}
            <NotesExplorerItem
              style={style}
              className={`ps-[${nest}rem]`}
              onClick={() => console.log(child.name)}
            >
              <FaNoteSticky /> {child.name.slice(0, child.name.search(/\.md/))}
            </NotesExplorerItem>
          </>
        )
      }
    })
    nest--
    return result
  }

  return (
    <div className="w-56 border-l bg-neutral-900 border-neutral-100/5 pe-1">
      <div className="flex items-center justify-between gap-3 p-3 text-lg">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap">
          {dirTree.name.toUpperCase()}
        </p>
        <div className="flex gap-3 *:flex-shrink-0 items-center">
          <FaFileMedical className="hover:opacity-75 active:opacity-100" />
          <FaFolderPlus className="hover:opacity-75 active:opacity-100" />
          <FaRotate className="hover:opacity-75 active:opacity-100" onClick={getDirTree} />
        </div>
      </div>
      <div className="">{mapDir(dirTree)}</div>
    </div>
  )
}

export default NotesExplorer
