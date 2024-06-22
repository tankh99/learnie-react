import { Note } from '@/types/Note'

type P = {
  note: Note;
}

export default function NoteListItem({note}: P) {
  return (
    <div className='text-link'>
      {note.title}
    </div>
  )
}
