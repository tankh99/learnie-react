import { useCreateNote } from '@/api/hooks/useNotes'
import NoteForm, { noteFormSchema } from '@/components/notes/note-form'
import { formToNote } from '@/types/Note'
import { formToNoteRevision, NoteRevision } from '@/types/NoteRevision';
import { z } from 'zod'

export default function CreateNotePage() {
  const createNoteMutation = useCreateNote();

  const onSubmit = (values: z.infer<typeof noteFormSchema>) => {
    const note = formToNote(values)
    const noteRevision: NoteRevision = formToNoteRevision(values);
    note.noteRevisions = [noteRevision];
    createNoteMutation.mutate(note);
  }

  return (
    <div>
      <NoteForm onSubmit={onSubmit}/>
    </div>
  )
}
