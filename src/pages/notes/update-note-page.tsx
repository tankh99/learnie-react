import { getNoteQuery, useUpdateNote } from '@/api/hooks/useNotes'
import NoteForm, { NoteFormValues } from '@/components/notes/note-form';
import { formToNote } from '@/types/Note';
import { QueryClient, useQuery } from '@tanstack/react-query'
import { Delta } from 'quill/core';
import { useParams } from 'react-router';

export const loader = (queryClient: QueryClient) => ({params}: any) => {
  const query = getNoteQuery(params.id);
  return queryClient.ensureQueryData({queryKey: query.queryKey, queryFn: query.queryFn});
}

export default function UpdateNotePage() {
  const params = useParams();

  const {data: note } = useQuery(getNoteQuery(params.id!))

  const updateNoteMutation = useUpdateNote(params.id!);

  if (!note) {
    return (
      <div>Note is not found uh oh</div> 
    )
  }

  const onSubmit = (values: NoteFormValues) => {
    const newNote = formToNote(values, true);
    // const newDelta = new Delta(JSON.parse(values.data));
    // const oldDelta = note.data ? new Delta(JSON.parse(note.data)) : new Delta();
    // const diff = newDelta.diff(oldDelta);
    
    // console.log(diff);
    updateNoteMutation.mutate(newNote);
  }

  return (
    <div>
      <NoteForm defaultValues={note} onSubmit={onSubmit}/>
    </div>
  )
}
