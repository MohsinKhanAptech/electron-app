/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import TodoList from './TodoList'
import TodoEditor from './TodoEditor'
import TodoViewer from './TodoViewer'

function TodoEditorContainer({ currentTodoPath }): JSX.Element {
  const [hideTodoEditor, updateHideTodoEditor] = useState(true)
  const [hideTodoViewer, updateHideTodoViewer] = useState(true)
  const [todoViewContent, updateTodoViewContent] = useState()

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
        todoViewContent={todoViewContent}
      />
    )
  } else if (!hideTodoViewer) {
    return (
      <TodoViewer
        updateHideTodoViewer={updateHideTodoViewer}
        updateHideTodoEditor={updateHideTodoEditor}
        todoViewContent={todoViewContent}
        updateTodoViewContent={updateTodoViewContent}
        todoListContent={currentTodoListContents}
      />
    )
  } else {
    return (
      <TodoList
        currentTodoListContents={currentTodoListContents}
        updateHideTodoEditor={updateHideTodoEditor}
        updateHideTodoViewer={updateHideTodoViewer}
        updateTodoViewContent={updateTodoViewContent}
        setIsNewTodo={setIsNewTodo}
      />
    )
  }
}

export default TodoEditorContainer
