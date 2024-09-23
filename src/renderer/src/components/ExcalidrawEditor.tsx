/* eslint-disable react/prop-types */

import { Excalidraw } from '@excalidraw/excalidraw'

function ExcalidrawEditor({ excalidrawElements }): JSX.Element {
  const saveDrawing = (drawnElements): void => {
    window.context.saveDrawing(drawnElements)
  }

  return (
    <Excalidraw
      initialData={{
        elements: excalidrawElements
      }}
      theme="dark"
      onChange={saveDrawing}
    />
  )
}

export default ExcalidrawEditor
