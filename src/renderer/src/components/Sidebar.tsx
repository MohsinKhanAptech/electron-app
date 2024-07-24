import { FaCalendarDays, FaGear, FaGitAlt, FaListCheck, FaNoteSticky } from 'react-icons/fa6'

function Sidebar(): JSX.Element {
  return (
    <nav id="sidebar" className="flex flex-col justify-between h-full py-3 text-2xl bg-neutral-900">
      <ul className="flex flex-col gap-2">
        <li>
          <a className="block p-3" href="#">
            <FaNoteSticky />
          </a>
        </li>
        <li>
          <a className="block p-3" href="#">
            <FaListCheck />
          </a>
        </li>
        <li>
          <a className="block p-3" href="#">
            <FaCalendarDays />
          </a>
        </li>
        <li>
          <a className="block p-3" href="#">
            <FaGitAlt />
          </a>
        </li>
      </ul>
      <ul className="flex flex-col">
        <li className="flex flex-col">
          <a className="block p-3" href="#">
            <FaGear />
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar
