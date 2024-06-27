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
      // We set to null because we want to see the diff of the note
      let noteRevision = formToNoteRevision({
        ...values,
        data: ""
      }, addedNote!.id!)
      createNoteRevisionMutation.mutate(noteRevision);
    }
  }

  return (
    <div>
      <NoteForm onSubmit={onSubmit}/>
    </div>
  )
}
