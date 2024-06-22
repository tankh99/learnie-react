import { getNoteQuery } from '@/api/hooks/notes'
import { QueryClient, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router';

export const loader = (queryClient: QueryClient) => ({params}: any) => {
  const query = getNoteQuery(params.id);
  return queryClient.getQueryData(query.queryKey) ??
    queryClient.fetchQuery(query);
}

export default function NotePage() {
  const params = useParams();

  const {data: note, isPending} = useQuery(getNoteQuery(params.id!))

  if (!note) {
    return (
      <div>Note is not found uh oh</div> 
    )
  }
  return (
    <div>
      <h1>{note.title}</h1>

    </div>
  )
}
