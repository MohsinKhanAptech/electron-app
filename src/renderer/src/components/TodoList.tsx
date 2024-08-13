/* eslint-disable react/prop-types */
import { FaCircleXmark, FaFilter, FaPlus } from 'react-icons/fa6'
import TodoListItem from './TodoListItem'
import { useEffect } from 'react'

function TodoList({ currentTodoListContents, updateHideTodoEditor }): JSX.Element {
  let todoContents: JSX.Element = <></>
  useEffect(() => {
    if (currentTodoListContents.length > 0) {
      currentTodoListContents.forEach((todo) => {
        todoContents = (
          <>
            {todoContents}
            <TodoListItem todoContent={todo} />
          </>
        )
      })
    }
  }, [])

  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex items-center gap-3 text-xl justify-end *:bg-neutral-900">
        <input
          type="text"
          className="flex-grow p-2 text-base rounded-md outline-none"
          placeholder="Search"
        />
        <span
          className="flex-shrink-0 p-2 rounded-md cursor-pointer hover:bg-neutral-800 active:bg-neutral-900"
          // onClick={() => updateHideTodoEditor(true)}
        >
          <FaCircleXmark />
        </span>
        <span
          className="flex-shrink-0 p-2 rounded-md cursor-pointer hover:bg-neutral-800 active:bg-neutral-900"
          // onClick={() => updateHideTodoEditor(true)}
        >
          <FaFilter />
        </span>
      </div>
      {currentTodoListContents === null ? null : todoContents}
      <div
        onClick={() => updateHideTodoEditor(false)}
        className="flex items-center justify-center gap-1 p-10 border-4 border-dashed rounded-md cursor-pointer border-neutral-900 text-neutral-500 hover:border-solid hover:bg-neutral-900 active:bg-transparent"
      >
        <FaPlus />
        <span>Add Todo</span>
      </div>
    </div>
  )
}

export default TodoList
