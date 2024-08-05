/* eslint-disable react/prop-types */
import { FormEvent, useEffect, useState } from 'react'
import { FaCheck, FaXmark } from 'react-icons/fa6'

function GitAddRemote({ updateHideAddRemoteMenu, updateRemoteURL }): JSX.Element {
  const [tempRemoteURL, updateTempRemoteURL] = useState('')

  const hideAddRemoteMenu = (): void => {
    updateHideAddRemoteMenu(true)
  }

  const handleInput = (element): void => {
    updateTempRemoteURL(element.target.value)
  }

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault()
    window.context.git.addRemote(tempRemoteURL)
    updateRemoteURL(tempRemoteURL)
    updateHideAddRemoteMenu(true)
  }

  useEffect(() => {
    window.context.git.init()
  }, [])

  return (
    <div
      className="absolute z-40 flex items-center justify-center w-screen h-screen bg-neutral-950/50"
      onClick={hideAddRemoteMenu}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-3 p-8 px-10 rounded min-w-96 bg-neutral-900"
      >
        <p className="text-xl">Enter Remote URL</p>
        <div className="flex flex-grow gap-2">
          <input
            type="text"
            onChange={handleInput}
            className="flex-grow p-3 border-none rounded outline-none bg-neutral-700"
            placeholder="Enter Remote URL"
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
            onClick={hideAddRemoteMenu}
          >
            <FaXmark />
          </button>
        </div>
      </form>
    </div>
  )
}

export default GitAddRemote
