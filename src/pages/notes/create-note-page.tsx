import { useCreateNoteRevision } from '@/api/hooks/useNoteRevisions';
import { useCreateNote } from '@/api/hooks/useNotes'
import NoteForm, { NoteFormValues } from '@/components/notes/note-form'
import { formToNote } from '@/types/Note'
import { formToNoteRevision } from '@/types/NoteRevision';


export default function CreateNotePage() {
  const createNoteMutation = useCreateNote();
  const createNoteRevisionMutation = useCreateNoteRevision();

  const onSubmit = async (values: NoteFormValues) => {
    const note = formToNote(values)
    const addedNote = await createNoteMutation.mutateAsync(note);
    if (!createNoteMutation.isError) {
      // Adding note revision to the note
      const noteRevision = formToNoteRevision(values, addedNote!.id!)
      createNoteRevisionMutation.mutate(noteRevision);
    }
  }

  return (
    <div>
      <NoteForm onSubmit={onSubmit}/>
    </div>
  )
}
