function Calendar(): JSX.Element {
  const something = (): JSX.Element => {
    let result
    for (let i = 1; i < 7 * 6 + 1; i++) {
      result = (
        <>
          {result}
          <div className={'p-2 border-2 border-neutral-900 ' + (i > 30 ? 'text-neutral-500' : '')}>
            <span>{i > 30 ? i - 30 : i}</span>
          </div>
        </>
      )
    }
    return result
  }

  return <div className="grid w-full h-full grid-cols-7 grid-rows-6">{something()}</div>
}

export default Calendar
