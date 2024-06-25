import { app } from "@/lib/firebsae/config"
import { noteRevisionFromFirestore, NoteRevision } from "@/types/NoteRevision";
import { collection, doc, getDoc, getDocs, getFirestore, orderBy, query } from "firebase/firestore"


const NOTE_REVISION_TABLE_NAME = "note_revisions"

function getNoteRevisionRef() {
    const firestore = getFirestore(app);
    const noteRevisionRef = collection(firestore, NOTE_REVISION_TABLE_NAME);
    return noteRevisionRef
}

export async function getNoteRevisions() {
  const noteRevisions: NoteRevision[] = [];
  try {
    const noteRevisionsRef = getNoteRevisionRef();
    const _query = query(noteRevisionsRef, orderBy('revisionTime', 'desc'));
    const querySnap = await getDocs(_query);
    if (querySnap.empty) {
      return [];
    }
    querySnap.docs.map(doc => {
      noteRevisions.push(noteRevisionFromFirestore(doc))
    })
  } catch (err) {
    console.error(err);
  }
  return noteRevisions;
}

export async function getNoteRevision(id: string) {
  try {
    const noteRevisionsRef = getNoteRevisionRef();
    const notesDoc = doc(noteRevisionsRef, id)
    const note = await getDoc(notesDoc)
    if (note.exists()) {
        return noteRevisionFromFirestore(note)
    }
  } catch (err) {
    console.error(err);
  }
  return null;
}