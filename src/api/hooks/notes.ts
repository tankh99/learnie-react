import { DefinedInitialDataOptions, useQuery } from "@tanstack/react-query"
import { getNotes } from "../notes"

export const getNotesQuery = (): DefinedInitialDataOptions<unknown, Error, unknown> => {
  return {
    queryKey: ["notes"],
    queryFn: getNotes,
    initialData: [],
  }
}