import { DefinedInitialDataOptions, useQuery } from "@tanstack/react-query"
import { getNotes, getNote } from "../notes"
import { Note } from "@/types/Note"

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
    queryFn: () => getNote(id),
  }
}