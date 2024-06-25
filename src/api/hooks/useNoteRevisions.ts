import { NoteRevision } from "@/types/NoteRevision";
import { DefinedInitialDataOptions } from "@tanstack/react-query";
import { getNoteRevision, getNoteRevisions } from "../noteRevisions";

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

