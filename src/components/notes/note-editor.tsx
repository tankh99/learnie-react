import { Delta } from 'quill/core';
import { useEffect } from 'react'
import {useQuill} from 'react-quilljs'

type P = {
  defaultValue?: Delta;
  onChange: any
}

export default function NoteEditor({onChange, defaultValue}: P) { 
  const { quill, quillRef } = useQuill();


  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
      // quill.on("text-change", () => {
        // quill.getContents().diff()
        // console.log(oldDelta, delta);
        // const diff = delta.diff(oldDelta)
        // console.log(diff)
        // console.log(quill.getContents())
        onChange(JSON.stringify(quill.getContents().ops));
      })
      quill.setContents(defaultValue ?? new Delta())
      // quill.clipboard.dangerouslyPasteHTML(0, defaultValue || '')
    }
  }, [quill])

  return (
    <div>
      <div ref={quillRef}></div>
    </div>
  )
}
