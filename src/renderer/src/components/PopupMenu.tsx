/* eslint-disable react/prop-types */
import { FormEvent, useEffect, useState } from 'react'
import { FaCheck, FaXmark } from 'react-icons/fa6'

function PopupMenu({
  showAccept = true,
  showCancel = true,
  title,
  message = '',
  showInputField,
  onSubmit
}): JSX.Element {
  const [hidden, setHidden] = useState(false)
  const [inp, setInp] = useState('')

  const hide = (): void => setHidden(true)

  const acceptBtn = (): JSX.Element => {
    if (showAccept) {
      return (
        <button
          className="flex items-center justify-center flex-grow p-3 rounded bg-neutral-800 hover:bg-neutral-700/70 active:bg-neutral-800"
          type="submit"
        >
          <FaCheck />
        </button>
      )
    }
    return <></>
  }
  const cancelBtn = (): JSX.Element => {
    if (showCancel) {
      return (
        <button
          className="flex items-center justify-center flex-grow p-3 rounded bg-neutral-800 hover:bg-neutral-700/70 active:bg-neutral-800"
          type="reset"
          onClick={hide}
        >
          <FaXmark />
        </button>
      )
    }
    return <></>
  }
  const inputField = (): JSX.Element => {
    if (showInputField) {
      return (
        <input
          type="text"
          onChange={handleInput}
          className="flex-grow p-3 border-none rounded outline-none bg-neutral-700"
          placeholder="Enter Directory Name"
          pattern="[\w\-\/ ]+"
          autoFocus
        />
      )
    }
    return <></>
  }
  const handleInput = (element): void => {
    setInp(element.target.value)
  }

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()
    if (showInputField) onSubmit(inp)
    else onSubmit()
    hide()
  }

  useEffect(() => {
    setHidden(false)
  }, [])

  if (hidden) return <></>

  return (
    <div
      className="absolute z-40 flex items-center justify-center w-screen h-screen bg-neutral-950/50"
      onClick={hide}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-3 p-8 px-10 rounded min-w-96 bg-neutral-900"
      >
        <p className="text-xl">{title}</p>
        {message ? (
          <p className="flex-grow-0 overflow-hidden text-ellipsis whitespace-nowrap">{message}</p>
        ) : null}
        <div className="flex gap-2">
          {inputField()}
          {acceptBtn()}
          {cancelBtn()}
        </div>
      </form>
    </div>
  )
}

export default PopupMenu
