import { useCreateNote } from '@/api/hooks/notes'
import NoteEditor from '@/components/notes/note-editor'
import NoteForm, { noteFormSchema } from '@/components/notes/note-form'
import { formToNote } from '@/types/Note'
import React from 'react'
import { z } from 'zod'

export default function CreateNotePage() {
  const createNoteMutation = useCreateNote();

  const onSubmit = (values: z.infer<typeof noteFormSchema>) => {
    const note = formToNote(values)
    console.log("adding note", note);
    createNoteMutation.mutate(note);
  }

  return (
    <div>
      <NoteForm onSubmit={onSubmit}/>
    </div>
  )
}