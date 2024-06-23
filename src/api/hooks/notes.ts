import { DefinedInitialDataOptions, QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getNotes, getNote, updateNote, createNote } from "../notes"
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
    onSuccess: () => {
      toast.toast({
        title: "Note created",
        description: "Note created successfully",
      })
      queryClient.invalidateQueries({queryKey: ["notes"]});
      navigate("/")
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
    onSuccess: () => {
      toast.toast({
        title: "Note updated",
        description: "Note has been updated successfully",
      })
      queryClient.invalidateQueries({queryKey: ["notes", id]});
      navigate("/")
    },
  })
}