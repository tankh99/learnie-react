import { deltaToHTML, getStyledQuillDiff } from "@/lib/quill-utils";
import { NoteRevision } from "@/types/NoteRevision";
import { Delta } from "quill/core";
import { Link } from "react-router-dom";
import { Checkbox } from "../ui/checkbox";
import { useUpdateNoteRevision } from "@/api/hooks/useNoteRevisions";
import { startOfDay } from "date-fns";

type P = {
  noteRevision: NoteRevision;
}

export default function ReviewListItem({noteRevision}: P) {
  const updateNoteRevisionMutation = useUpdateNoteRevision(noteRevision.id!);
  /**
   * 
   * @param srcDelta Usually the note revision's delta
   * @param newDelta Usually the note's current delta
   */
  const formatDiff = (src: string, curr: string) => {
    const srcDelta = src ? new Delta(JSON.parse(src)) : new Delta();
    const currDelta = curr ? new Delta(JSON.parse(curr)) : new Delta();
    const diffDelta = getStyledQuillDiff(srcDelta, currDelta)
    const formattedHTML = deltaToHTML(diffDelta)
    return formattedHTML
  }

  const handleReview = () => {
    updateNoteRevisionMutation.mutate({
      ...noteRevision,
      reviewed: !noteRevision.reviewed
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col mb-1">
          <Link to={`/notes/${noteRevision.noteId}`} className="flex space-x-2">
            <p className="text-lg font-bold ">{noteRevision.note?.title}</p>
            {noteRevision.revisionTime <= startOfDay(new Date()) 
            ? <p className="bg-red-300 text-sm flex items-center px-2">Overdue</p>
            : null}
          </Link>
          <p className="text-sm text-slate-600 italic">Last updated: {noteRevision.revisionTime.toDateString()}</p>
        </div>
        <div className="flex items-center space-x-2">
        <p>Reviewed:</p> <Checkbox onClick={handleReview} checked={noteRevision.reviewed} />
        </div>
      </div>
      <div dangerouslySetInnerHTML={{__html: formatDiff(noteRevision.data, noteRevision.note?.data!)}}></div>
    </div>
  )
}
