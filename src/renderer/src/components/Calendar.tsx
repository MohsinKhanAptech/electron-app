import { DayPicker } from 'react-day-picker'
import { useState } from 'react'
import TodoList from './TodoList'

import '@renderer/assets/Calendar.css'

function Calendar(): JSX.Element {
  const [selected, setSelected] = useState<Date>()

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
        {selected ? `${selected.toLocaleDateString()}` : 'Pick a day.'}
      </div>
      <TodoList
        currentTodoListContents={[
          {
            isCompleted: false,
            title: 'test',
            note: 'Practise for Javascript test',
            subTodo: [
              { isCompleted: false, note: 'Javascript' },
              { isCompleted: false, note: 'AJAX' }
            ],
            tags: ['', 'Work'],
            priority: '',
            startDate: '2024-09-16T17:00',
            endDate: '2024-09-16T20:00',
            createdAt: 558576.5,
            updatedAt: 558576.5,
            conpletedAt: ''
          },
          {
            isCompleted: false,
            title: 'PHP Presentation',
            note: ' ',
            subTodo: [
              { isCompleted: true, note: 'PHP' },
              { isCompleted: false, note: 'Laravel' }
            ],
            tags: ['', 'Work'],
            priority: '',
            startDate: '2024-09-16T17:00',
            endDate: '2024-09-16T17:00',
            createdAt: 616682.599999994,
            updatedAt: 616682.599999994,
            conpletedAt: ''
          }
        ]}
        updateHideTodoEditor={undefined}
        updateHideTodoViewer={undefined}
        updateTodoViewContent={undefined}
        setIsNewTodo={undefined}
      />
    </div>
  )
}

export default Calendar
