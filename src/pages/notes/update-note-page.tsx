import { useCreateOrUpdateNoteRevision } from '@/api/hooks/useNoteRevisions';
import { getNoteQuery, useUpdateNote } from '@/api/hooks/useNotes'
import NoteForm, { NoteFormValues } from '@/components/notes/note-form';
import { formToNote } from '@/types/Note';
import { formToNoteRevision, NoteRevision } from '@/types/NoteRevision';
import { QueryClient, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router';

export const loader = (queryClient: QueryClient) => ({params}: any) => {
  const query = getNoteQuery(params.id);
  return queryClient.ensureQueryData(query);
}

export default function UpdateNotePage() {
  const params = useParams();

  const {data: note } = useQuery(getNoteQuery(params.id!))

  const updateNoteMutation = useUpdateNote(params.id!);
  const createOrUpdateNoteRevisionMutation = useCreateOrUpdateNoteRevision(params.id!)


  if (!note) {
    return (
      <div>Note is not found uh oh</div> 
    )
  }

  const onSubmit = async (values: NoteFormValues) => {
    const newNote = formToNote(values, true);
    // const newDelta = new Delta(JSON.parse(values.data));
    // const oldDelta = note.data ? new Delta(JSON.parse(note.data)) : new Delta();
    // const diff = newDelta.diff(oldDelta);
    
    // console.log(diff);
    await updateNoteMutation.mutateAsync(newNote);

    const noteRevision: NoteRevision = formToNoteRevision(values, params.id!)
    await createOrUpdateNoteRevisionMutation.mutateAsync(noteRevision)

  }

  return (
    <div>
      <NoteForm defaultValues={note} onSubmit={onSubmit}/>
    </div>
  )
}
