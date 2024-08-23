/* eslint-disable react/prop-types */
import { FormEvent } from 'react'
import { FaCheck, FaChevronLeft, FaPlus } from 'react-icons/fa6'

function TodoEditor({
  updateHideTodoEditor,
  isNewTodo,
  setIsNewTodo,
  currentTodoListContents,
  setCurrentTodoListContents,
  todoViewContent
}): JSX.Element {
  let todoTitle: string = ''
  let todoNote: string = ''
  let todoStartDate: string = ''
  let todoEndDate: string = ''
  let todoSubTodo = [
    {
      isCompleted: false,
      note: ''
    }
  ]
  if (!isNewTodo) {
    todoTitle = todoViewContent.title
    todoNote = todoViewContent.note
    todoStartDate = todoViewContent.startDate
    todoEndDate = todoViewContent.endDate
    if (todoViewContent.subTodo) todoSubTodo = todoViewContent.subTodo
  }

  const subTodo = (): JSX.Element => {
    let result
    todoSubTodo.forEach((subTodo, index) => {
      result = (
        <div className="flex items-center gap-2 p-4 rounded-md bg-neutral-900">
          <input
            type="checkbox"
            className="size-4 accent-neutral-500"
            defaultChecked={subTodo.isCompleted}
            onChange={(element) => (todoSubTodo[index].isCompleted = element.currentTarget.checked)}
          />
          <input
            type="text"
            className="flex-grow border-none rounded-md outline-none text-ellipsis bg-neutral-900"
            placeholder="Sub Task"
            defaultValue={subTodo.note}
            onChange={(element) => (todoSubTodo[index].note = element.currentTarget.value)}
          />
        </div>
      )
    })
    return result
  }

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault()
    const todo = {
      isCompleted: false,
      title: todoTitle,
      note: todoNote,
      subTodo: todoSubTodo,
      tags: [],
      priority: '',
      startDate: todoStartDate,
      endDate: todoEndDate,
      createdAt: event.timeStamp,
      updatedAt: event.timeStamp,
      conpletedAt: ''
    }
    if (isNewTodo) {
      const updatedTodoList: Array<object> = currentTodoListContents
      updatedTodoList.push(todo)
      setCurrentTodoListContents(updatedTodoList)
      window.context.saveTodo(updatedTodoList)
      setIsNewTodo(false)
    }
    const updatedTodoList: Array<object> = currentTodoListContents
    const index = currentTodoListContents.indexOf(todoViewContent)
    updatedTodoList[index] = todo
    setCurrentTodoListContents(updatedTodoList)
    window.context.saveTodo(updatedTodoList)
    updateHideTodoEditor(true)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full gap-5 p-5">
      <div className="flex items-center gap-3 text-xl">
        <button
          type="reset"
          className="flex-shrink-0 p-2 rounded-md cursor-pointer bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-900"
          onClick={() => updateHideTodoEditor(true)}
        >
          <FaChevronLeft />
        </button>
        <button
          type="submit"
          className="flex-shrink-0 p-2 rounded-md cursor-pointer bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-900"
        >
          <FaCheck />
        </button>
      </div>
      <input
        onChange={(element) => (todoTitle = element.currentTarget.value)}
        type="text"
        className="p-4 text-3xl font-medium border-none rounded-md outline-none text-ellipsis bg-neutral-900"
        placeholder="Title"
        required
        defaultValue={todoTitle}
      />
      <div className="flex gap-4 *:flex-grow">
        <input
          onChange={(element) => (todoStartDate = element.currentTarget.value)}
          className="p-4 border-none rounded-md outline-none bg-neutral-200 text-neutral-900 invert"
          type="datetime-local"
          defaultValue={todoStartDate}
        />
        <input
          onChange={(element) => (todoEndDate = element.currentTarget.value)}
          className="p-4 border-none rounded-md outline-none bg-neutral-200 text-neutral-900 invert"
          type="datetime-local"
          defaultValue={todoEndDate}
        />
      </div>
      <div className="flex gap-2 p-4 border-none rounded-md outline-none bg-neutral-900">
        <div className="p-2 px-3 rounded-full bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-800">
          #hiee
        </div>
        <div className="flex items-center gap-0.5 text-neutral-400 p-2 px-3 rounded-full bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-800">
          <FaPlus /> Add Tag
        </div>
      </div>
      <textarea
        onChange={(element) => (todoNote = element.currentTarget.value)}
        className="flex-grow flex-shrink-0 p-4 border-none rounded-md outline-none resize-y bg-neutral-900 scrollbar-thin"
        placeholder="Note"
        rows={4}
      >
        {todoNote}
      </textarea>
      {subTodo()}
      <div className="flex items-center justify-center gap-2 p-4 border-4 border-dashed rounded-md cursor-pointer text-neutral-500 border-neutral-900 hover:border-solid hover:bg-neutral-900 active:bg-transparent">
        <FaPlus /> Add Sub-Tasks
      </div>
    </form>
  )
}

export default TodoEditor
