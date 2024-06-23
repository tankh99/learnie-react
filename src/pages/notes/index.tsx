import { getNotesQuery } from '@/api/hooks/notes'
import NoteListItem from '@/components/notes/note-list-item';
import { Button } from '@/components/ui/button';
import { Note } from '@/types/Note';
import { QueryClient, useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom';

export const loader = (queryClient: QueryClient) => async ({}) => {
  const query = getNotesQuery();
  return queryClient.ensureQueryData({queryKey: query.queryKey, queryFn: query.queryFn});
}

export default function NotesPage() {
  const {data: notes, isPending } = useQuery(getNotesQuery())

  return (
    <div>
      <Link to={"/notes/create"}>
        <Button>
          Create Note
        </Button>
      </Link>
      {notes.map((note: Note) => {
        return (
          <NoteListItem note={note} key={note.id} />
        )
      })}
    </div>
  )
}
