/* eslint-disable react/prop-types */
import {
  FaArrowDownShortWide,
  FaArrowDownWideShort,
  FaFilter,
  FaPlus,
  FaRotate
} from 'react-icons/fa6'
import TodoListItem from './TodoListItem'
import { useState } from 'react'

function TodoList({
  currentTodoListContents,
  updateHideTodoEditor,
  updateHideTodoViewer,
  updateTodoViewContent,
  setIsNewTodo
}): JSX.Element {
  const [refresh, setRefresh] = useState(false)
  const [sortReverse, setSortReverse] = useState(false)

  const addNewTodo = (): void => {
    setIsNewTodo(true)
    updateHideTodoEditor(false)
  }

  const mapTodoContents = (): JSX.Element => {
    let result = <></>

    if (Object.keys(currentTodoListContents).length !== 0) {
      const _currentList = currentTodoListContents
      _currentList.reverse()

      _currentList.forEach((todo, index) => {
        result = (
          <>
            {result}
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
    }

    return result
  }

  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex items-center gap-3 text-xl justify-end *:bg-neutral-900">
        {setIsNewTodo === undefined ? null : (
          <div
            onClick={addNewTodo}
            className="flex-shrink-0 p-2 rounded-md cursor-pointer hover:bg-neutral-800 active:bg-neutral-900"
          >
            <FaPlus />
          </div>
        )}
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
            setSortReverse(!sortReverse)
            mapTodoContents()
          }}
        >
          {sortReverse ? <FaArrowDownWideShort /> : <FaArrowDownShortWide />}
        </span>
        <span
          className="flex-shrink-0 p-2 rounded-md cursor-pointer hover:bg-neutral-800 active:bg-neutral-900"
          onClick={() => setRefresh(!refresh)}
        >
          <FaRotate />
        </span>
      </div>

      {mapTodoContents()}

      {setIsNewTodo === undefined ? null : (
        <div
          onClick={addNewTodo}
          className="flex items-center justify-center gap-1 p-10 border-4 border-dashed rounded-md cursor-pointer border-neutral-900 text-neutral-500 hover:border-solid hover:bg-neutral-900 active:bg-transparent"
        >
          <FaPlus />
          <span>Add Todo</span>
        </div>
      )}
    </div>
  )
}

export default TodoList
