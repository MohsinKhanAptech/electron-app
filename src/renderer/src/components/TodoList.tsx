/* eslint-disable react/prop-types */
import {
  FaArrowDownShortWide,
  FaArrowDownWideShort,
  FaFilter,
  FaPlus,
  FaRotate
} from 'react-icons/fa6'
import TodoListItem from './TodoListItem'
import { useEffect, useState } from 'react'

function TodoList({
  currentTodoListContents,
  updateHideTodoEditor,
  updateHideTodoViewer,
  updateTodoViewContent,
  setIsNewTodo
}): JSX.Element {
  const [todoListContents, updateTodoListContents] = useState(<></>)

  const [sortAscending, updateSortAscending] = useState(false)

  const addNewTodo = (): void => {
    setIsNewTodo(true)
    updateHideTodoEditor(false)
  }

  const mapTodoContents = (update: boolean = false): JSX.Element => {
    let todoContents: JSX.Element = <></>
    const currentList = currentTodoListContents
    if (!sortAscending) currentList.reverse()
    currentList.forEach((todo, index) => {
      todoContents = (
        <>
          {todoContents}
          <TodoListItem
            todoContent={todo}
            index={index}
            todoListContent={currentTodoListContents}
            updateHideTodoViewer={updateHideTodoViewer}
            updateTodoViewContent={updateTodoViewContent}
          />
        </>
      )
    })
    if (update === true) updateTodoListContents(todoContents)
    return todoContents
  }

  useEffect(() => {
    if (currentTodoListContents.length > 0) {
      updateTodoListContents(currentTodoListContents)
      mapTodoContents()
    }
  }, [])

  return (
    <div key={todoListContents + ''} className="flex flex-col gap-5 p-5">
      <div className="flex items-center gap-3 text-xl justify-end *:bg-neutral-900">
        <div
          onClick={addNewTodo}
          className="flex-shrink-0 p-2 rounded-md cursor-pointer hover:bg-neutral-800 active:bg-neutral-900"
        >
          <FaPlus />
        </div>
        <input
          type="text"
          className="flex-grow p-2 text-sm rounded-md outline-none"
          placeholder="Search"
        />
        <span className="flex-shrink-0 p-2 rounded-md cursor-pointer hover:bg-neutral-800 active:bg-neutral-900">
          <FaFilter />
        </span>
        <span
          className="flex-shrink-0 p-2 rounded-md cursor-pointer hover:bg-neutral-800 active:bg-neutral-900"
          onClick={() => {
            updateSortAscending(!sortAscending)
            mapTodoContents()
          }}
        >
          {sortAscending ? <FaArrowDownWideShort /> : <FaArrowDownShortWide />}
        </span>
        <span
          className="flex-shrink-0 p-2 rounded-md cursor-pointer hover:bg-neutral-800 active:bg-neutral-900"
          onClick={() => mapTodoContents(true)}
        >
          <FaRotate />
        </span>
      </div>

      {mapTodoContents()}

      <div
        onClick={addNewTodo}
        className="flex items-center justify-center gap-1 p-10 border-4 border-dashed rounded-md cursor-pointer border-neutral-900 text-neutral-500 hover:border-solid hover:bg-neutral-900 active:bg-transparent"
      >
        <FaPlus />
        <span>Add Todo</span>
      </div>
    </div>
  )
}

export default TodoList
