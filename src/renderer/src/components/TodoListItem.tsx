/* eslint-disable react/prop-types */
import { classMerge } from '@renderer/utils'
import { useEffect } from 'react'

function TodoListItem({
  todoContent = {
    isCompleted: false,
    title: '',
    note: '',
    subTodo: [
      {
        isCompleted: false,
        note: ''
      }
    ],
    tags: [],
    priority: '',
    assignedDate: '',
    createdAt: '',
    updatedAt: '',
    conpletedAt: ''
  },
  ...props
}): JSX.Element {
  let subTodo
  useEffect(() => {
    todoContent.subTodo.forEach((element) => {
      subTodo = (
        <>
          {subTodo}
          <div className="flex items-center gap-2">
            <input
              className="accent-neutral-500 size-4"
              type="checkbox"
              checked={element.isCompleted}
            />
            <p>{element.note}</p>
          </div>
        </>
      )
    })
  }, [])

  return (
    <div
      className={classMerge('flex flex-col gap-3 rounded-md p-5 bg-neutral-900', props.className)}
    >
      <div className="flex items-center gap-2">
        <input
          className="flex-shrink-0 outline-none rounded-xl size-5 accent-neutral-500"
          type="checkbox"
          checked={todoContent.isCompleted}
        />
        <h3 className="overflow-hidden text-3xl font-medium whitespace-nowrap text-ellipsis">
          {todoContent.title}
        </h3>
        <span className="ms-auto text-neutral-500">{todoContent.assignedDate}</span>
      </div>
      <div>
        <p className="text-ellipsis line-clamp-2">{todoContent.note}</p>
      </div>
      <div className="pt-3 overflow-hidden border-t text-ellipsis border-neutral-800 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <input className="accent-neutral-500 size-4" type="checkbox" />
          <p>{subTodo}</p>
        </div>
      </div>
    </div>
  )
}

export default TodoListItem
