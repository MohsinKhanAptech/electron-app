/* eslint-disable react/prop-types */
import { FormEvent, useEffect, useState } from 'react'
import { FaCheck, FaXmark } from 'react-icons/fa6'

function DirCreate({ updateHideDirCreate }): JSX.Element {
  const [dirName, updateDirName] = useState('')
  const [workingDir, updateWorkingDir] = useState('')

  // get current working dir from ipcMain and push to state
  const getCurrentDir = (): void => {
    window.context.getCurrentDir().then((result) => {
      updateWorkingDir(result)
    })
  }

  // handle dir name input event
  const handleInput = (element): void => {
    updateDirName(element.target.value)
  }

  const hideDirCreate = (): void => {
    updateHideDirCreate(true)
  }

  // handle submit i.e create dir and hide the dir create element
  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault()
    window.context.createDir(dirName)
    hideDirCreate()
  }

  // try to get working dir if its set
  useEffect(() => getCurrentDir(), [])

  return (
    <div
      className="absolute z-40 flex items-center justify-center w-screen h-screen bg-neutral-950/50"
      onClick={hideDirCreate}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-3 p-8 px-10 rounded min-w-96 bg-neutral-900"
      >
        <p className="text-xl">Select Directory Name</p>
        <p className="flex-grow-0 overflow-hidden text-ellipsis whitespace-nowrap">
          Dir: {workingDir + (navigator.platform === 'Win32' ? '\\' : '/') + dirName}
        </p>
        <div className="flex flex-grow gap-2">
          <input
            type="text"
            onChange={handleInput}
            className="flex-grow p-3 border-none rounded outline-none bg-neutral-700"
            placeholder="Enter Directory Name"
            pattern="[\w\-\/ ]+"
            autoFocus
          />
          <button
            className="p-3 rounded bg-neutral-800 hover:bg-neutral-700/70 active:bg-neutral-800"
            type="submit"
          >
            <FaCheck />
          </button>
          <button
            className="p-3 rounded bg-neutral-800 hover:bg-neutral-700/70 active:bg-neutral-800"
            type="button"
            onClick={hideDirCreate}
          >
            <FaXmark />
          </button>
        </div>
      </form>
    </div>
  )
}

export default DirCreate
