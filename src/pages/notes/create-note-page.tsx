import NoteEditor from '@/components/notes/note-editor'
import NoteForm, { noteFormSchema } from '@/components/notes/note-form'
import React from 'react'
import { z } from 'zod'

export default function CreateNotePage() {
  const onSubmit = (values: z.infer<typeof noteFormSchema>) => {
    console.log(values);
  }
  
  return (
    <div>
      <NoteForm onSubmit={onSubmit}/>
    </div>
  )
}
