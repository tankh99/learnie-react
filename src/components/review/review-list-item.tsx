import { deltaToHTML, getStyledQuillDiff } from "@/lib/quill-utils";
import { NoteRevision } from "@/types/NoteRevision";
import { Delta } from "quill/core";
import { Link } from "react-router-dom";

type P = {
  noteRevision: NoteRevision;
}

export default function ReviewListItem({noteRevision}: P) {
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

  return (
    <div>
      <Link to={`/notes/${noteRevision.note!.id}`}>
        <div>{noteRevision.note?.title}</div>
      </Link>
      <div dangerouslySetInnerHTML={{__html: formatDiff(noteRevision.data, noteRevision.note?.data!)}}></div>
    </div>
  )
}
