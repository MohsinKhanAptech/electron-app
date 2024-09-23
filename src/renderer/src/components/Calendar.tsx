/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { compareAsc, formatDate } from 'date-fns'
import TodoList from './TodoList'

import '@renderer/assets/Calendar.css'

function Calendar({ selected, setSelected, allTodos }): JSX.Element {
  const [currentTodos, updateCurrentTodos] = useState(allTodos)

  useEffect(() => {
    if (selected) {
      let result
      allTodos.forEach((todo) => {
        if (compareAsc(todo.startDate, selected) === 0) {
          result.push(todo)
        }
      })
      updateCurrentTodos(result)
      console.log(currentTodos)
    }
  }, [])

  return (
    <div className="flex flex-col">
      <div className="flex justify-center p-5 m-5 mb-1 rounded-md bg-neutral-900">
        <DayPicker
          mode="single"
          numberOfMonths={2}
          selected={selected}
          onSelect={setSelected}
          onDayClick={() => {
            /* FIXME: add function to load tasks for the selected day */
          }}
          className=""
        />
      </div>
      <div className="p-5 m-5 mb-1 text-2xl text-center rounded-md bg-neutral-900">
        {selected ? `${formatDate(selected, 'do MMM, yyyy - eeee')}` : 'Today.'}
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
