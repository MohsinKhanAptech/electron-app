import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeRestore,
  VscChromeMinimize
} from 'react-icons/vsc'

function Titlebar(): JSX.Element {
  const windowMinimize = (): void => window.context.windowMinimize()
  const windowMaximize = (): void => {
    window.context.windowMaximize()
    const winRes = document.getElementById('windowRestore')
    const winMax = document.getElementById('windowMaximize')
    winMax?.classList.toggle('hidden')
    winRes?.classList.toggle('hidden')
  }
  const windowCloe = (): void => window.context.windowClose()

  return (
    <div id="titlebar" className="flex w-full overflow-hidden bg-neutral-900">
      <ul id="windowButtons" className="flex ml-auto *:p-3">
        <li onClick={() => windowMinimize()} id="windowMinimize" className="hover:bg-neutral-800">
          <VscChromeMinimize />
        </li>
        <li
          onClick={async () => windowMaximize()}
          id="windowMaximize"
          className="hover:bg-neutral-800"
        >
          <VscChromeMaximize />
        </li>
        <li
          onClick={async () => windowMaximize()}
          id="windowRestore"
          className="hidden hover:bg-neutral-800"
        >
          <VscChromeRestore />
        </li>
        <li onClick={() => windowCloe()} id="windowCloe" className="hover:bg-red-600">
          <VscChromeClose />
        </li>
      </ul>
    </div>
  )
}

export default Titlebar
