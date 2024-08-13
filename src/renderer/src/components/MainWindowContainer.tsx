/* eslint-disable react/prop-types */
function MainWindowContainer({ ...props }): JSX.Element {
  return (
    <main className="flex-grow block bg-neutral-900">
      <div className="block w-full h-full overflow-y-auto rounded-tl-lg bg-neutral-950/50 scrollbar-thin scrollbar-thumb-neutral-800 active:scrollbar-thumb-neutral-700">
        {props.children}
      </div>
    </main>
  )
}

export default MainWindowContainer
