import { Note } from '@/types/Note'
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { useDeleteNote } from '@/api/hooks/useNotes';

type P = {
  note: Note;
}

export default function NoteListItem({note}: P) {
  const deleteNoteMutation = useDeleteNote(note.id!)
  return (
    <>
      <div className='flex justify-between items-center'>
        <Link key={note.id} to={`/notes/${note.id}`}>
          <p>{note.title}</p>
        </Link>
        <AlertDialog>
          <AlertDialogTrigger className='cursor-pointer hover:bg-gray-100 p-2'>
            <Trash2 size={24} color='red' />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete note</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone. Are you really sure?</AlertDialogDescription>

            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteNoteMutation.mutate()}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
      </div>
      
    </>
  )
}
