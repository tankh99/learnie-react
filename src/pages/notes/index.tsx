import { getNotesQuery } from '@/api/hooks/notes'
import { QueryClient, useQuery } from '@tanstack/react-query'
import React from 'react'

export const loader = (queryClient: QueryClient) => async ({}) => {
  const query = getNotesQuery();
  return queryClient.getQueryData(query.queryKey) 
    ?? (await queryClient.fetchQuery(query));
}

export default function NotesPage() {
  const {data: notes, isPending } = useQuery(getNotesQuery())

  return (
    <div>index</div>
  )
}
