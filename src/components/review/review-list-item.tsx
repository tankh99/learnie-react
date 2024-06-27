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
    const srcDelta = src ? JSON.parse(src) : ""; // We use this conditional because JSON.parse("") results in error
    const currentDelta = curr ? JSON.parse(curr) : "";
    const diff = new Delta(srcDelta).diff(new Delta(currentDelta))
    
    let html = `<p></p>`
    for (const op of diff.ops) {
      if (op.insert) {
        html += `<p style="color: green">${op.insert}</p>`
      } else if (op.delete) {
        html += `<p style="color: red">${op.delete}</p>`
      } else if (op.retain) {
        html += `<p>${op.retain}</p>`
      }
    }
    return html
  }

  return (
    <div>
      <Link to={`/notes/${noteRevision.id}`}>
        <div>{noteRevision.note?.title}</div>
      </Link>
      <div dangerouslySetInnerHTML={{__html: formatDiff(noteRevision.data, noteRevision.note?.data!)}}></div>
    </div>
  )
}
