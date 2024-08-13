/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import TodoList from './TodoList'
import TodoEditor from './TodoEditor'

function TodoEditorContainer({ currentTodoPath }): JSX.Element {
  const [hideTodoEditor, updateHideTodoEditor] = useState(true)

  const [currentTodoListContents, setCurrentTodoListContents] = useState([])

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
    return <TodoEditor updateHideTodoEditor={updateHideTodoEditor} />
  } else {
    return (
      <TodoList
        currentTodoListContents={currentTodoListContents}
        updateHideTodoEditor={updateHideTodoEditor}
      />
    )
  }
}

export default TodoEditorContainer
