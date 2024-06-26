import { app } from "@/lib/firebsae/config"
import { noteRevisionFromFirestore, NoteRevision } from "@/types/NoteRevision";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, orderBy, query, where } from "firebase/firestore"


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
    const noteRevisionDoc = doc(noteRevisionsRef, id)
    const note = await getDoc(noteRevisionDoc)
    if (note.exists()) {
        return noteRevisionFromFirestore(note)
    }
  } catch (err) {
    console.error(err);
  }
  return null;
}

export async function getRecentlyChangedNoteRevisions() {
  try {
    const noteRevisionsRef = getNoteRevisionRef();
    const noteRevisionQuery = query(noteRevisionsRef, 
      where('revisionTime', '>', new Date(Date.now() - 1000 * 60 * 60 * 24)),
      orderBy('revisionTime', 'desc'),
    );
    const querySnap = await getDocs(noteRevisionQuery);
    if (querySnap.empty) {
      return [];
    }
    return querySnap.docs.map(doc => {
      return noteRevisionFromFirestore(doc);
    })
  } catch (err) {
    console.error(err);
    return []
  }
}

export async function createNoteRevision(noteRevision: NoteRevision) {
  try {
    const noteRevisionsRef = getNoteRevisionRef()
    const addedNoteRevision = await addDoc(noteRevisionsRef, noteRevision);
    console.info(`Added note revision`, addedNoteRevision)
    return noteRevision;
  } catch (err) {
    console.error(err);
    return null;
  }
}