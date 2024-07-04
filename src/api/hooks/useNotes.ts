import { DefinedInitialDataOptions, useMutation, useQueryClient } from "@tanstack/react-query"
import { getNotes, getNote, updateNote, createNote, deleteNote } from "../notes"
import { Note } from "@/types/Note"
import { useNavigate } from "react-router"
import { useToast } from "@/components/ui/use-toast"

export const getNotesQuery = (): DefinedInitialDataOptions<Note[], Error> => {
  return {
    queryKey: ["notes"],
    queryFn: getNotes,
    initialData: [],
  }
}

export const getNoteQuery = (id: string) => {
  return {
    queryKey: ["notes", id],
    queryFn: async () => getNote(id),
    initialDate: null,
  }
}


export function useCreateNote() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();
  return useMutation({
    mutationFn: (note: Note) => createNote(note),
    onSuccess: (note) => {
      toast.toast({
        variant: "success",
        title: `${note?.title} created`,
        description: `${note?.title} created successfully`,
      })
      queryClient.invalidateQueries({queryKey: ["notes"]});
      navigate(-1)
    },
    onError: (err) => {
      console.error(err);

    }
  })
}

export function useUpdateNote(id: string) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();
  return useMutation({
    mutationFn: (note: Note) => updateNote(id, note),
    onSuccess: (note) => {
      toast.toast({
        variant: "success",
        title: "Note updated",
        description: `${note?.title} has been updated successfully`,
      })
      queryClient.invalidateQueries({queryKey: ["notes", id]});
      navigate(-1)
    },
  })
}

export function useDeleteNote(id: string) {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: () => deleteNote(id),
    onSuccess: (note) => {
      toast.toast({
        variant: "success",
        title: "Note deleted",
        description: `${note?.title} has been deleted successfully`,
      })
      queryClient.invalidateQueries({queryKey: ["notes"]});
    },
  })
}