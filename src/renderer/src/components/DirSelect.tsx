/* eslint-disable react/prop-types */
import { FormEvent, useEffect, useState } from 'react'
import { FaArrowsRotate, FaCheck, FaFolder } from 'react-icons/fa6'

function DirSelect({ updateHideDirSelect }): JSX.Element {
  const [dirName, setDirName] = useState('')
  const [workingDir, setWorkingDir] = useState('')

  // handle dir name input event
  const handleDirInput = (element): void => {
    setDirName(element.target.value)
  }

  // auto update dir name preview
  let dirUpdateInterval
  const handleDirSelect = (): void => {
    window.context.handleDirSelect()
    const oldWorkingDir = workingDir
    dirUpdateInterval = setInterval(() => {
      if (oldWorkingDir === workingDir) {
        getCurrentDir()
      } else {
        clearInterval(dirUpdateInterval)
      }
    }, 500)
  }

  // get current working dir from ipcMain and push to state
  const getCurrentDir = (): void => {
    window.context.getCurrentDir().then((result) => {
      setWorkingDir(result)
    })
  }

  // handle submit i.e save selected working dir,
  // hide the dir select element and clear dirUpdateInterval
  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault()
    window.context.handleDirSubmit(dirName)
    window.context.recentDirExists().then((result) => {
      updateHideDirSelect(result)
    })
    clearInterval(dirUpdateInterval)
  }

  // try to get working dir if its set
  useEffect(() => getCurrentDir(), [])

  return (
    <div className="absolute z-40 flex items-center justify-center w-screen h-screen bg-neutral-950">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 p-8 px-10 rounded min-w-96 bg-neutral-900"
      >
        <p className="mb-2 text-xl">Select a Working Directory</p>
        <p onClick={getCurrentDir} className="flex items-center justify-between">
          Dir: {workingDir || ' No Directory Selected'}
          <FaArrowsRotate className="mx-2 cursor-pointer" />
        </p>
        <input
          type="text"
          onChange={handleDirInput}
          className="p-3 border-none rounded outline-none bg-neutral-700"
          placeholder="Directory Name"
          pattern="[\w\-\/]+"
          autoFocus
        />
        <button
          className="flex items-center justify-center gap-2 p-3 rounded bg-neutral-800 hover:bg-neutral-700/70 active:bg-neutral-800"
          onClick={handleDirSelect}
          type="button"
        >
          <FaFolder />
          Choose Directory
        </button>
        <button
          className="flex items-center justify-center gap-2 p-3 rounded bg-neutral-800 hover:bg-neutral-700/70 active:bg-neutral-800"
          type="submit"
        >
          <FaCheck />
          Continue
        </button>
      </form>
    </div>
  )
}

export default DirSelect
