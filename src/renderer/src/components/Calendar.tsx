/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { formatDate } from 'date-fns'
import TodoList from './TodoList'

import '@renderer/assets/Calendar.css'

function Calendar({ selected, setSelected, allTodos, getAllTodos }): JSX.Element {
  const [currentTodos, setCurrentTodos] = useState(allTodos)

  const updateCurrentTodos = (): void => {
    console.log(allTodos)
    if (Object.keys(allTodos).length !== 0 && Object.keys(allTodos[0]).length !== 0) {
      const result: Array<object> = []
      allTodos.forEach((todo) => {
        if (
          todo.startDate &&
          formatDate(todo.startDate, 'dd/MM/yyyy') === formatDate(selected, 'dd/MM/yyyy')
        ) {
          result.push(todo)
        }
      })
      setCurrentTodos(result)
      console.log(currentTodos)
    }
    console.log(currentTodos)
  }

  useEffect(() => {
    getAllTodos()
    updateCurrentTodos()
  }, [])

  return (
    <div className="flex flex-col">
      <div className="flex justify-center p-5 m-5 mb-1 rounded-md bg-neutral-900">
        <DayPicker
          mode="single"
          required={true}
          numberOfMonths={2}
          selected={selected}
          onSelect={setSelected}
          onDayClick={updateCurrentTodos}
          className=""
        />
      </div>
      <div className="p-5 m-5 mb-1 text-2xl text-center rounded-md bg-neutral-900">
        {selected ? `${formatDate(selected, 'do MMM, yyyy - eeee')}` : '???'}
      </div>
      <TodoList
        currentTodoListContents={currentTodos}
        updateHideTodoEditor={undefined}
        updateHideTodoViewer={undefined}
        updateTodoViewContent={undefined}
        setIsNewTodo={undefined}
      />
    </div>
  )
}

export default Calendar
