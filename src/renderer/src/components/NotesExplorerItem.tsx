import { classMerge } from '@renderer/utils'

/* eslint-disable react/prop-types */
function NotesExplorerItem({ ...props }): JSX.Element {
  return (
    <div
      style={props.style}
      className={classMerge(
        'p-1 px-3 overflow-hidden hover:bg-neutral-800/50 text-ellipsis whitespace-nowrap *:inline-block *:align-text-top *:me-0.5',
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  )
}

export default NotesExplorerItem
