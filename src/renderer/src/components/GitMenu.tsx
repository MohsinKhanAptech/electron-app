/* eslint-disable react/prop-types */
import { useEffect } from 'react'

function GitMenu(): JSX.Element {
  useEffect(() => {
    window.context.git.sync()
  }, [])

  return (
    <div className="absolute top-0 right-0 p-2 m-4 rounded mt-14 bg-neutral-800">
      Changes Synced
    </div>
  )

  return (
    <div className="absolute top-0 right-0 p-2 m-4 rounded mt-14 bg-neutral-800">
      Something Went Wrong
    </div>
  )
}

export default GitMenu
