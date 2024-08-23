/* eslint-disable react/prop-types */
import { FaChevronLeft, FaPenToSquare, FaTrash } from 'react-icons/fa6'

function TodoEditor({
  updateHideTodoEditor,
  updateHideTodoViewer,
  todoViewContent,
  updateTodoViewContent,
  todoListContent
}): JSX.Element {
  const formatDate = (timestamp): string => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  const index = todoListContent.indexOf(todoViewContent)
  const handleTodoComplete = (event: React.FormEvent<HTMLInputElement>): void => {
    todoListContent[index].isCompleted = event.currentTarget.checked
    window.context.saveTodo(todoListContent)
  }
  const handleSubTodoComplete = (event: React.FormEvent<HTMLInputElement>, subIndex): void => {
    todoListContent[index].subTodo[subIndex].isCompleted = event.currentTarget.checked
    window.context.saveTodo(todoListContent)
  }

  const tags = (): JSX.Element => {
    let result
    todoViewContent.tags.forEach((tag) => {
      result = (
        <div className="p-2 px-3 rounded-full bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-800">
          {tag}
        </div>
      )
    })
    if (todoViewContent.tags.length > 0) {
      return <div className="flex gap-2 p-4 rounded-md bg-neutral-900">{result}</div>
    }
    return <></>
  }

  const subTodo = (): JSX.Element => {
    let result
    todoViewContent.subTodo.forEach((subTodo, subIndex) => {
      if (subTodo.note !== '') {
        result = (
          <div className="flex items-center gap-2 p-4 rounded-md bg-neutral-900">
            <input
              type="checkbox"
              className="size-4 accent-neutral-500"
              defaultChecked={subTodo.isCompleted}
              onChange={(event) => handleSubTodoComplete(event, subIndex)}
            />
            <p className="flex-grow rounded-md bg-neutral-900">{subTodo.note}</p>
          </div>
        )
      }
    })
    return result
  }

  return (
    <div className="flex flex-col h-full gap-5 p-5">
      <div className="flex items-center gap-3 text-xl">
        <button
          className="flex-shrink-0 p-2 rounded-md cursor-pointer bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-900"
          onClick={() => {
            updateHideTodoViewer(true)
            updateTodoViewContent('')
          }}
        >
          <FaChevronLeft />
        </button>
        <button
          className="flex-shrink-0 p-2 rounded-md cursor-pointer bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-900"
          onClick={() => console.log('delete todo | MSG from TodoViewer')}
        >
          <FaTrash />
        </button>
        <button
          className="flex-shrink-0 p-2 rounded-md cursor-pointer bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-900"
          onClick={() => {
            updateHideTodoEditor(false)
            updateHideTodoViewer(true)
          }}
        >
          <FaPenToSquare />
        </button>
      </div>
      <div className="flex items-center gap-2 p-4 text-3xl font-medium rounded-md bg-neutral-900">
        <input
          type="checkbox"
          className="size-5 accent-neutral-500"
          defaultChecked={todoViewContent.isCompleted}
          onChange={handleTodoComplete}
        />
        <h3>{todoViewContent.title}</h3>
      </div>
      <div className="flex gap-4 *:flex-grow text-center">
        <p className="p-4 rounded-md bg-neutral-900">{formatDate(todoViewContent.startDate)}</p>
        <p className="p-4 rounded-md bg-neutral-900">{formatDate(todoViewContent.endDate)}</p>
      </div>
      {tags()}
      {todoViewContent.note === '' || todoViewContent === null || !todoViewContent.note ? null : (
        <p className="p-4 rounded-md bg-neutral-900">{todoViewContent.note}</p>
      )}
      {subTodo()}
    </div>
  )
}

export default TodoEditor
