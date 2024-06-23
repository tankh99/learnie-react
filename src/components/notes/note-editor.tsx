import { Delta } from 'quill/core';
import { useEffect } from 'react'
import {useQuill} from 'react-quilljs'

type P = {
  defaultValue?: string;
  onChange: any
}

export default function NoteEditor({onChange, defaultValue}: P) { 
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
      // quill.on("text-change", () => {
        onChange(JSON.stringify(quill.getContents().ops));
      })
      quill.setContents(defaultValue ? JSON.parse(defaultValue) : new Delta())
    }
  }, [quill, defaultValue, onChange,])

  return (
    <div>
      <div ref={quillRef}></div>
    </div>
  )
}
