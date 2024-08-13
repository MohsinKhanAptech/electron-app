import { classMerge } from '@renderer/utils'

/* eslint-disable react/prop-types */
function SidebarMenuItem({ text, ...props }): JSX.Element {
  return (
    <div
      style={props.style}
      className={classMerge(
        'flex items-center gap-1 p-1 px-3 hover:bg-neutral-800/50',
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
      <p className="overflow-hidden text-ellipsis whitespace-nowrap">{text}</p>
    </div>
  )
}

export default SidebarMenuItem
