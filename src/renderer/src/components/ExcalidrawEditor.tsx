/* eslint-disable react/prop-types */
import { Excalidraw } from '@excalidraw/excalidraw'
import { useEffect, useState } from 'react'

function ExcalidrawEditor({ currentExcalidrawPath }): JSX.Element {
  const [excalidrawElements, setExcalidrawElements] = useState()

  const saveDrawing = (drawnElements): void => {
    window.context.saveDrawing(drawnElements)
  }

  useEffect(() => {
    // get drawing
    window.context.openDrawing(currentExcalidrawPath).then((result) => {
      setExcalidrawElements(result)
    })
  }, [])

  return (
    <Excalidraw
      key={excalidrawElements}
      initialData={{
        elements: excalidrawElements
      }}
      theme="dark"
      onChange={saveDrawing}
    />
  )
}

export default ExcalidrawEditor
