/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import {
  FaCloudArrowUp,
  FaCodeCommit,
  FaCodeMerge,
  FaCodePullRequest,
  FaPlus,
  FaRotate
} from 'react-icons/fa6'

function GitMenu({ remoteURL, updateHideAddRemoteMenu, getRemotes }): JSX.Element {
  useEffect(() => {
    window.context.git.init()
    getRemotes()
  }, [])

  if (remoteURL === '') {
    return (
      <>
        <div className="flex items-center justify-between gap-3 p-3 text-lg">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">Git</p>
          <div className="flex gap-3 *:flex-shrink-0 items-center">
            <FaRotate className="hover:opacity-75 active:opacity-100" />
          </div>
        </div>
        <div className="flex flex-col gap-3 p-2 *:bg-neutral-800">
          <div
            className="flex items-center *:shrink-0 justify-center flex-grow gap-2 p-2 rounded hover:bg-neutral-700 active:bg-neutral-800"
            onClick={() => updateHideAddRemoteMenu(false)}
          >
            <FaCloudArrowUp className="size-5" />
            <span>Set Remote</span>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="flex items-center justify-between gap-3 p-3 text-lg">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap">Git</p>
        <div className="flex gap-3 *:flex-shrink-0 items-center">
          <FaRotate className="hover:opacity-75 active:opacity-100" />
        </div>
      </div>
      <div className="flex flex-col gap-3 p-2 *:bg-neutral-800">
        <div
          className="flex items-center *:shrink-0 justify-center flex-grow gap-2 p-2 rounded hover:bg-neutral-700 active:bg-neutral-800"
          onClick={() => updateHideAddRemoteMenu(false)}
        >
          <FaCloudArrowUp className="size-5" />
          <span>Set Remote</span>
        </div>
        <div
          className="flex items-center *:shrink-0 justify-center flex-grow gap-2 p-2 rounded hover:bg-neutral-700 active:bg-neutral-800"
          onClick={() => window.context.git.sync()}
        >
          <FaRotate className="size-5" />
          <span>Sync Files</span>
        </div>
        <div
          className="flex items-center *:shrink-0 justify-center flex-grow gap-2 p-2 rounded hover:bg-neutral-700 active:bg-neutral-800"
          onClick={() => window.context.git.add()}
        >
          <FaPlus className="size-5" />
          <span>Stage Files</span>
        </div>
        <div
          className="flex items-center *:shrink-0 justify-center flex-grow gap-2 p-2 rounded hover:bg-neutral-700 active:bg-neutral-800"
          onClick={() => window.context.git.commit()}
        >
          <FaCodeCommit className="size-5" />
          <span>Commit</span>
        </div>
        <div
          className="flex items-center *:shrink-0 justify-center flex-grow gap-2 p-2 rounded hover:bg-neutral-700 active:bg-neutral-800"
          onClick={() => window.context.git.push()}
        >
          <FaCodePullRequest className="size-5" />
          <span>Push</span>
        </div>
        <div
          className="flex items-center *:shrink-0 justify-center flex-grow gap-2 p-2 rounded hover:bg-neutral-700 active:bg-neutral-800"
          onClick={() => window.context.git.push('--force')}
        >
          <FaCodePullRequest className="size-5" />
          <span>Force Push</span>
        </div>
        <div
          className="flex items-center *:shrink-0 justify-center flex-grow gap-2 p-2 rounded hover:bg-neutral-700 active:bg-neutral-800"
          onClick={() => window.context.git.pull()}
        >
          <FaCodeMerge className="size-5" />
          <span>Pull</span>
        </div>
        <div
          className="flex items-center *:shrink-0 justify-center flex-grow gap-2 p-2 rounded hover:bg-neutral-700 active:bg-neutral-800"
          onClick={() => window.context.git.pull(true)}
        >
          <FaCodeMerge className="size-5" />
          <span>Force Pull</span>
        </div>
      </div>
      <div className="flex-shrink overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700 active:scrollbar-thumb-neutral-600"></div>
    </>
  )
}

export default GitMenu
