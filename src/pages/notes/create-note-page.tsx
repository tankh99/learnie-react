import NoteEditor from '@/components/notes/note-editor'
import React from 'react'

export default function CreateNotePage() {
  const onChange = (e: any) => {
    console.log(e)
  }
  return (
    <div>
      <NoteEditor onChange={onChange} />
    </div>
  )
}
