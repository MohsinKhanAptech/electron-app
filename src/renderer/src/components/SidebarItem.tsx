/* eslint-disable react/prop-types */
import { classMerge } from '@renderer/utils'

function SidebarItem({ ...props }): JSX.Element {
  return (
    <li>
      <a
        className={classMerge(
          'block p-3 cursor-pointer drag-none hover:opacity-75 active:opacity-50',
          props.className
        )}
        onClick={props.onClick}
      >
        {props.children}
      </a>
    </li>
  )
}

export default SidebarItem
