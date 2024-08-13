/* eslint-disable react/prop-types */
import { FaCheck, FaChevronLeft, FaPlus } from 'react-icons/fa6'

function TodoEditor({ updateHideTodoEditor }): JSX.Element {
  return (
    <div className="flex flex-col h-full gap-5 p-5">
      <div className="flex items-center gap-3 text-xl">
        <span
          className="flex-shrink-0 p-2 rounded-md cursor-pointer bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-900"
          onClick={() => updateHideTodoEditor(true)}
        >
          <FaChevronLeft />
        </span>
        <span
          className="flex-shrink-0 p-2 rounded-md cursor-pointer bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-900"
          onClick={() => updateHideTodoEditor(true)}
        >
          <FaCheck />
        </span>
      </div>
      <input
        type="text"
        className="p-4 text-3xl font-medium border-none rounded-md outline-none text-ellipsis bg-neutral-900"
        placeholder="Title"
      />
      <div className="flex gap-4 *:outline-none *:border-none *:flex-grow *:p-4 *:rounded-md *:bg-neutral-200 text-neutral-900 *:invert">
        <input className="" type="date" />
        <input className="" type="time" />
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
        className="flex-grow flex-shrink-0 p-4 border-none rounded-md outline-none resize-y bg-neutral-900 scrollbar-thin"
        placeholder="Note"
        rows={4}
      ></textarea>
      <div className="flex items-center gap-2 p-4 rounded-md bg-neutral-900">
        <input className="size-4 accent-neutral-500" type="checkbox" />
        <p>HIEEEEEEEE</p>
      </div>
      <div className="flex items-center justify-center gap-2 p-4 border-4 border-dashed rounded-md cursor-pointer text-neutral-500 border-neutral-900 hover:border-solid hover:bg-neutral-900 active:bg-transparent">
        <FaPlus /> Add Sub-Tasks
      </div>
    </div>
  )
}

export default TodoEditor
