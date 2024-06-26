import { NoteRevision } from "@/types/NoteRevision";
import { DefinedInitialDataOptions, useMutation, useQueryClient,  } from "@tanstack/react-query";
import { createNoteRevision, getNoteRevision, getNoteRevisions, getRecentlyChangedNoteRevisions } from "../noteRevisions";

export const getNoteRevisionsQuery = (): DefinedInitialDataOptions<NoteRevision[], Error> => {
  return {
    queryKey: ["noteRevisions"],
    queryFn: getNoteRevisions,
    initialData: [],
  }
}

export const getNoteRevisionQuery = (id: string): DefinedInitialDataOptions<NoteRevision | null, Error> => {
  return {
    queryKey: ["noteRevisions", id],
    queryFn: async () => getNoteRevision(id),
    initialData: null,
  }
}

export const getRecentlyChangedNoteRevisionsQuery = (): DefinedInitialDataOptions<NoteRevision[], Error> => {
  return {
    queryKey: ["noteRevisions", "recentlyChanged"],
    queryFn: getRecentlyChangedNoteRevisions,
    initialData: []
  };
}

export const useCreateNoteRevision = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (noteRevision: NoteRevision) => createNoteRevision(noteRevision),
    onSuccess: (noteRevision) => {
      queryClient.invalidateQueries({queryKey: ["noteRevisions"]});
    }
  }) 
}