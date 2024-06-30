import { NoteRevision } from "@/types/NoteRevision";
import { DefinedInitialDataOptions, useMutation, useQueryClient,  } from "@tanstack/react-query";
import { createNoteRevision, createOrUpdateNoteRevision, getNoteRevision, getNoteRevisions, getRecentlyChangedNoteRevisions, updateNoteRevision } from "../noteRevisions";
import { getNote } from '../notes';

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

export const useUpdateNoteRevision = (id: string,) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noteRevision: NoteRevision) => updateNoteRevision(id, noteRevision),
    onSuccess: (noteRevision) => {
      queryClient.invalidateQueries({queryKey: ["noteRevisions"]});
    }
  }) 
}

export const useCreateOrUpdateNoteRevision = (noteId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (noteRevision: NoteRevision) => {
      const note = await getNote(noteId);
      if (!note) {
        throw new Error(`Note ${noteId} not found, unable to create note revision`)
      }
      
      return await createOrUpdateNoteRevision(noteId, noteRevision)
    },
    onSuccess: (noteRevision) => {
      queryClient.invalidateQueries({queryKey: ["noteRevisions"]});
    }
  })
}

