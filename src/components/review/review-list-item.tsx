import { NoteRevision } from "@/types/NoteRevision";

type P = {
  noteRevision: NoteRevision;
}

export default function ReviewListItem({noteRevision}: P) {
  return (
    <div>
      <div>{noteRevision.note?.title}</div>
      {/* <div>{noteRevision.note?.title}</div> */}
    </div>
  )
}
