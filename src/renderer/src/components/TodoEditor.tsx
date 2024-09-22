/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import { FormEvent, useEffect, useState } from 'react'
import { FaCheck, FaChevronLeft, FaPlus, FaXmark } from 'react-icons/fa6'

function TodoEditor({
  updateHideTodoEditor,
  isNewTodo,
  setIsNewTodo,
  currentTodoListContents,
  setCurrentTodoListContents,
  todoViewContent,
  popupMenuConstructor
}): JSX.Element {
  const [todoTitle, setTodoTitle] = useState('')
  const [todoNote, setTodoNote] = useState('')
  const [todoTags, setTodoTags] = useState([''])
  const [todoStartDate, setTodoStartDate] = useState('')
  const [todoEndDate, setTodoEndDate] = useState('')
  const [todoSubTodo, setTodoSubTodo] = useState([{ isCompleted: false, note: '' }])
  useEffect(() => {
    if (!isNewTodo) {
      setTodoTitle(todoViewContent.title)
      setTodoNote(todoViewContent.note)
      setTodoTags(todoViewContent.tags)
      setTodoStartDate(todoViewContent.startDate)
      setTodoEndDate(todoViewContent.endDate)
      if (todoViewContent.subTodo) setTodoSubTodo(todoViewContent.subTodo)
    }
  }, [])

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault()
    const todo = {
      isCompleted: false,
      title: todoTitle,
      note: todoNote,
      subTodo: todoSubTodo,
      tags: todoTags,
      priority: '',
      startDate: todoStartDate,
      endDate: todoEndDate,
      createdAt: event.timeStamp,
      updatedAt: event.timeStamp,
      conpletedAt: ''
    }
    todo.subTodo.forEach((element, index) => {
      if (!element.note) todo.subTodo.splice(index, 1)
    })
    const updatedTodoList = currentTodoListContents
    if (isNewTodo) {
      updatedTodoList.push(todo)
    } else {
      const index = currentTodoListContents.indexOf(todoViewContent)
      updatedTodoList[index] = todo
    }
    setCurrentTodoListContents(updatedTodoList)
    window.context.saveTodo(updatedTodoList)
    setIsNewTodo(false)
    updateHideTodoEditor(true)
  }

  const tagWrapper = (text): JSX.Element => {
    return (
      <div className="flex items-center gap-1.5 p-1 rounded-full bg-neutral-800">
        <span className="ps-3">{text}</span>
        <span
          className="p-2 rounded-full hover:bg-neutral-700"
          onClick={() => {
            const _todoTags = todoTags
            _todoTags.splice(todoTags.indexOf(text), 1)
            setTodoTags([..._todoTags])
          }}
        >
          <FaXmark />
        </span>
      </div>
    )
  }

  const addTag = (text = ''): void => {
    if (text !== '') setTodoTags([...todoTags, text])
  }

  const mapCurrentTags = (): JSX.Element => {
    let result
    todoTags.forEach((tag) => {
      if (tag !== '') {
        result = (
          <>
            {result}
            {tagWrapper(tag)}
          </>
        )
      }
    })
    return result
  }

  const mapTags = (): JSX.Element => {
    let result
    todoTags.forEach((tag) => {
      if (tag !== '') {
        result = (
          <>
            {result}
            <div
              className="p-2 px-4 cursor-pointer hover:bg-neutral-800 active:bg-neutral-900"
              onClick={() => {}}
            >
              {tag}
            </div>
          </>
        )
      }
    })
    return result
  }

  const subTodo = (): JSX.Element => {
    let result
    todoSubTodo.forEach((subTodo: any, index) => {
      result = (
        <>
          {result}
          <div className="flex items-center gap-2 p-4 rounded-md bg-neutral-900">
            <input
              type="checkbox"
              className="size-4 accent-neutral-500"
              defaultChecked={subTodo.isCompleted}
              onChange={(element) =>
                (todoSubTodo[index].isCompleted = element.currentTarget.checked)
              }
            />
            <input
              type="text"
              className="flex-grow border-none rounded-md outline-none text-ellipsis bg-neutral-900"
              placeholder="Sub Task"
              defaultValue={subTodo.note}
              onChange={(element) => (todoSubTodo[index].note = element.currentTarget.value)}
            />
          </div>
        </>
      )
    })
    return result
  }

  const addSubTodo = (): void => {
    setTodoSubTodo([...todoSubTodo, { isCompleted: false, note: '' }])
  }

  const displayPopupMenu = (): void => {
    popupMenuConstructor(true, true, 'Enter Tag Name', '', true, popupMenuSubmitFunc)
  }
  const popupMenuSubmitFunc = (inp): void => console.log(inp)

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
        onChange={(element) => setTodoTitle(element.currentTarget.value)}
        type="text"
        className="p-4 text-3xl font-medium border-none rounded-md outline-none text-ellipsis bg-neutral-900"
        placeholder="Title"
        required
        defaultValue={todoTitle}
      />
      <div className="flex gap-4 *:flex-grow">
        <input
          onChange={(element) => setTodoStartDate(element.currentTarget.value)}
          className="p-4 border-none rounded-md outline-none bg-neutral-200 text-neutral-900 invert"
          type="datetime-local"
          defaultValue={todoStartDate}
        />
        <input
          onChange={(element) => setTodoEndDate(element.currentTarget.value)}
          className="p-4 border-none rounded-md outline-none bg-neutral-200 text-neutral-900 invert"
          type="datetime-local"
          defaultValue={todoEndDate}
        />
      </div>
      <div className="flex flex-wrap gap-2 p-4 border-none rounded-md outline-none bg-neutral-900">
        {mapCurrentTags()}
        <div
          className="flex items-center gap-0.5 text-neutral-400 p-2 px-3 rounded-full bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-800"
          onClick={() => document.getElementById('tagsDropdown')?.classList.toggle('hidden')}
        >
          <FaPlus /> Add Tag
          <div
            id="tagsDropdown"
            className="absolute flex flex-col flex-shrink-0 hidden overflow-y-auto translate-y-[60%] border rounded-md -translate-x-1/4 bg-neutral-900 border-neutral-800 max-h-60 scrollbar-thin"
          >
            <div
              className="flex rounded m-2 hover:bg-neutral-700 text-nowrap items-center p-2 px-4 cursor-pointer bg-neutral-800 gap-0.5"
              onClick={displayPopupMenu}
            >
              <FaPlus /> Create New Tag
            </div>
            <div
              className="p-2 px-4 cursor-pointer hover:bg-neutral-800 active:bg-neutral-900"
              onClick={(e) => {
                addTag('Work')
                e.stopPropagation()
                document.getElementById('tagsDropdown')?.classList.add('hidden')
              }}
            >
              Work
            </div>
            <div
              className="p-2 px-4 cursor-pointer hover:bg-neutral-800 active:bg-neutral-900"
              onClick={(e) => {
                addTag('Personal')
                e.stopPropagation()
                document.getElementById('tagsDropdown')?.classList.add('hidden')
              }}
            >
              Personal
            </div>
            <div
              className="p-2 px-4 cursor-pointer hover:bg-neutral-800 active:bg-neutral-900"
              onClick={(e) => {
                addTag('Fun')
                e.stopPropagation()
                document.getElementById('tagsDropdown')?.classList.add('hidden')
              }}
            >
              Fun
            </div>
            {mapTags()}
          </div>
        </div>
      </div>
      <textarea
        onChange={(element) => setTodoNote(element.currentTarget.value)}
        className="flex-grow flex-shrink-0 p-4 border-none rounded-md outline-none resize-y bg-neutral-900 scrollbar-thin"
        placeholder="Note"
        rows={6}
        defaultValue={todoNote}
      ></textarea>
      {subTodo()}
      <div
        className="flex items-center justify-center gap-2 p-4 border-4 border-dashed rounded-md cursor-pointer text-neutral-500 border-neutral-900 hover:border-solid hover:bg-neutral-900 active:bg-transparent"
        onClick={addSubTodo}
      >
        <FaPlus /> Add Sub-Tasks
      </div>
    </form>
  )
}

export default TodoEditor
