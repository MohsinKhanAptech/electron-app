/* eslint-disable react/prop-types */
import { classMerge } from '@renderer/utils'
import { useEffect } from 'react'

function TodoListItem({ todoContent, ...props }): JSX.Element {
  const mapSubTodo = (): JSX.Element => {
    let subTodo
    todoContent.subTodo.forEach((element) => {
      if (element.note !== '') {
        subTodo = (
          <div className="pt-3 overflow-hidden border-t text-ellipsis border-neutral-800 whitespace-nowrap">
            {subTodo}
            <div className="flex items-center gap-2">
              <input
                className="overflow-hidden accent-neutral-500 size-4 whitespace-nowrap text-ellipsis"
                type="checkbox"
                defaultChecked={element.isCompleted}
              />
              <p>{element.note}</p>
            </div>
          </div>
        )
      }
    })
    return subTodo
  }

  const formatDate = (): string => {
    const date = new Date(todoContent.assignedDate)
    return date.toLocaleString()
  }

  useEffect(() => {
    mapSubTodo()
  }, [])

  return (
    <div
      className={classMerge('flex flex-col gap-3 rounded-md p-5 bg-neutral-900', props.className)}
    >
      <div className="flex items-center gap-2">
        <input
          className="flex-shrink-0 outline-none rounded-xl size-5 accent-neutral-500"
          type="checkbox"
          defaultChecked={todoContent.isCompleted}
        />
        <h3 className="overflow-hidden text-3xl font-medium whitespace-nowrap text-ellipsis">
          {todoContent.title}
        </h3>
        <span className="ms-auto text-neutral-500">{formatDate()}</span>
      </div>
      <div>
        <p className="text-ellipsis line-clamp-2">{todoContent.note}</p>
      </div>
      {mapSubTodo()}
    </div>
  )
}

export default TodoListItem
