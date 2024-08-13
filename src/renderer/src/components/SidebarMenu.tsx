import { classMerge } from '@renderer/utils'

/* eslint-disable react/prop-types */
function SidebarMenu({ ...props }): JSX.Element {
  return (
    <div
      className={classMerge(
        'w-56 flex flex-col border-l bg-neutral-900 border-neutral-100/5 pe-1',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}

export default SidebarMenu
