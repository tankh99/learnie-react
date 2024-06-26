import { getRecentlyChangedNoteRevisionsQuery } from "@/api/hooks/useNoteRevisions"
import ReviewListItem from "@/components/review/review-list-item"
import { QueryClient, useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

export const loader = (queryClient: QueryClient) => async ({}) => {
  const query = getRecentlyChangedNoteRevisionsQuery()
  return queryClient.ensureQueryData(query)
}


export default function ReviewPage() {
  const {data} = useQuery(getRecentlyChangedNoteRevisionsQuery());

  return (
    <div>
      <h1>Review Page</h1>
      <div>
        {data?.map((noteRevision) => (
          <Link key={noteRevision.id} to={`/notes/${noteRevision.noteId}`}>
            <ReviewListItem key={noteRevision.id} noteRevision={noteRevision}/>
          </Link>
        ))}
      </div>
    </div>
  )
}
