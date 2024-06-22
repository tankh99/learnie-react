import { getNotesQuery } from '@/api/hooks/notes'
import NoteListItem from '@/components/notes/note-list-item';
import { Note } from '@/types/Note';
import { QueryClient, useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom';

export const loader = (queryClient: QueryClient) => async ({}) => {
  const query = getNotesQuery();
  return queryClient.getQueryData(query.queryKey) 
    ?? (await queryClient.fetchQuery(query));
}

export default function NotesPage() {
  const {data: notes, isPending } = useQuery(getNotesQuery())

  return (
    <div>
      {notes.map((note: Note) => {
        return (
          <Link key={note.id} to={`/notes/${note.id}`}>
            <NoteListItem note={note} />
          </Link>
        )
      })}
    </div>
  )
}
