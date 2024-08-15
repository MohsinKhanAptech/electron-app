/* eslint-disable react/prop-types */
import { FormEvent, useEffect, useState } from 'react'
import { FaCheck, FaXmark } from 'react-icons/fa6'

function NoteCreate({ updateHideNoteCreate }): JSX.Element {
  const [fileName, updateFileName] = useState('')
  const [workingDir, updateWorkingDir] = useState('')

  // get current working dir from ipcMain and push to state
  const getCurrentDir = (): void => {
    window.context.getCurrentDir().then((result) => {
      updateWorkingDir(result)
    })
  }

  // handle file name input event
  const handleInput = (element): void => {
    updateFileName(element.target.value)
  }

  const hideNoteCreate = (): void => {
    updateHideNoteCreate(true)
  }

  // handle submit i.e create dir and hide the dir create element
  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault()
    window.context.createNote(fileName)
    hideNoteCreate()
  }

  // try to get working dir if its set
  useEffect(() => getCurrentDir(), [])

  return (
    <div
      className="absolute z-40 flex items-center justify-center w-screen h-screen bg-neutral-950/50"
      onClick={hideNoteCreate}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-3 p-8 px-10 rounded min-w-96 bg-neutral-900"
      >
        <p className="text-xl">Select File Name</p>
        <p className="">
          Dir: {workingDir + (navigator.platform === 'Win32' ? '\\' : '/') + fileName + '.md'}
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
            onClick={hideNoteCreate}
          >
            <FaXmark />
          </button>
        </div>
      </form>
    </div>
  )
}

export default NoteCreate
