/* eslint-disable react/prop-types */
import { classMerge } from '@renderer/utils'
import React, { useEffect } from 'react'

function TodoListItem({
  todoContent,
  index,
  todoListContent,
  updateHideTodoViewer,
  updateTodoViewContent,
  ...props
}): JSX.Element {
  const mapSubTodo = (): JSX.Element => {
    let subTodo
    todoContent.subTodo.forEach((element, subIndex) => {
      if (element.note !== '') {
        subTodo = (
          <div className="pt-3 overflow-hidden border-t text-ellipsis border-neutral-800 whitespace-nowrap">
            {subTodo}
            <div className="flex items-center gap-2">
              <input
                className="overflow-hidden accent-neutral-500 size-4 whitespace-nowrap text-ellipsis"
                type="checkbox"
                defaultChecked={element.isCompleted}
                onChange={(e) => handleSubTodoComplete(e, subIndex)}
              />
              <p>{element.note}</p>
            </div>
          </div>
        )
      }
    })
    return subTodo
  }

  const formatDate = (timestamp): string => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  const handleTodoComplete = (event: React.FormEvent<HTMLInputElement>): void => {
    todoListContent[index].isCompleted = event.currentTarget.checked
    todoListContent[index].updatedAt = event.timeStamp
    if (event.currentTarget.checked) todoListContent[index].conpletedAt = event.timeStamp
    window.context.saveTodo(todoListContent)
  }
  const handleSubTodoComplete = (event: React.FormEvent<HTMLInputElement>, subIndex): void => {
    todoListContent[index].subTodo[subIndex].isCompleted = event.currentTarget.checked
    todoListContent[index].updatedAt = event.timeStamp
    if (event.currentTarget.checked) todoListContent[index].conpletedAt = event.timeStamp
    window.context.saveTodo(todoListContent)
  }

  const handleTodoView = (event): void => {
    if (event.target.localName === 'input') return
    updateTodoViewContent(todoContent)
    updateHideTodoViewer(false)
  }

  useEffect(() => {
    mapSubTodo()
  }, [])

  return (
    <div
      className={classMerge('flex flex-col gap-3 rounded-md p-5 bg-neutral-900', props.className)}
      onClick={handleTodoView}
    >
      <div className="flex items-center gap-2">
        <input
          className="flex-shrink-0 outline-none rounded-xl size-5 accent-neutral-500"
          type="checkbox"
          defaultChecked={todoContent.isCompleted}
          onChange={handleTodoComplete}
        />
        <h3 className="overflow-hidden text-3xl font-medium whitespace-nowrap text-ellipsis">
          {todoContent.title}
        </h3>
        <span className="ms-auto text-neutral-500">
          {formatDate(todoContent.startDate)} - {formatDate(todoContent.startDate)}
        </span>
      </div>
      {todoContent.note === '' || !todoContent.note ? null : (
        <div>
          <p className="text-ellipsis line-clamp-2">{todoContent.note}</p>
        </div>
      )}
      {mapSubTodo()}
    </div>
  )
}

export default TodoListItem
