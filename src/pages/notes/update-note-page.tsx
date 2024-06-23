import { getNoteQuery, useUpdateNote } from '@/api/hooks/notes'
import NoteForm, { noteFormSchema } from '@/components/notes/note-form';
import { formToNote } from '@/types/Note';
import { QueryClient, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router';
import { z } from 'zod';

export const loader = (queryClient: QueryClient) => ({params}: any) => {
  const query = getNoteQuery(params.id);
  return queryClient.ensureQueryData({queryKey: query.queryKey, queryFn: query.queryFn});
}

export default function UpdateNotePage() {
  const params = useParams();

  const {data: note, isPending} = useQuery(getNoteQuery(params.id!))

  const updateNoteMutation = useUpdateNote(params.id!);

  if (!note) {
    return (
      <div>Note is not found uh oh</div> 
    )
  }

  const onSubmit = (values: z.infer<typeof noteFormSchema>) => {
    const note = formToNote(values, true);
    console.log("values", note)
    updateNoteMutation.mutate(note);
  }

  return (
    <div>
      <NoteForm defaultValues={note} onSubmit={onSubmit}/>
    </div>
  )
}
