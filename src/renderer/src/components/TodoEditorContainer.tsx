/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import TodoList from './TodoList'
import TodoEditor from './TodoEditor'

function TodoEditorContainer({ currentTodoPath }): JSX.Element {
  const [hideTodoEditor, updateHideTodoEditor] = useState(true)

  const [currentTodoListContents, setCurrentTodoListContents] = useState([])

  const [isNewTodo, setIsNewTodo] = useState(false)

  const updateCurrentTodoListContents = (): void => {
    window.context.openTodo(currentTodoPath).then((result) => {
      setCurrentTodoListContents(result)
      console.log(result)
    })
  }

  useEffect(() => {
    if (currentTodoPath !== '') updateCurrentTodoListContents()
  }, [])

  if (!hideTodoEditor) {
    return (
      <TodoEditor
        updateHideTodoEditor={updateHideTodoEditor}
        isNewTodo={isNewTodo}
        setIsNewTodo={setIsNewTodo}
        currentTodoListContents={currentTodoListContents}
        setCurrentTodoListContents={setCurrentTodoListContents}
      />
    )
  } else {
    return (
      <TodoList
        currentTodoListContents={currentTodoListContents}
        updateHideTodoEditor={updateHideTodoEditor}
        setIsNewTodo={setIsNewTodo}
      />
    )
  }
}

export default TodoEditorContainer
