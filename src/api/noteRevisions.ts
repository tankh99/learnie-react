import { app } from "@/lib/firebsae/config"
import { noteRevisionFromFirestore, NoteRevision } from "@/types/NoteRevision";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, orderBy, query, updateDoc, where } from "firebase/firestore"
import { getNote } from "./notes";
import { isToday } from "@/lib/date";


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
    querySnap.docs.map(async (doc) => {
      let noteRevision = noteRevisionFromFirestore(doc)
      const note = await getNote(noteRevision.noteId)
      if (note) {
        noteRevision.note = note
      }
      noteRevisions.push(noteRevision)
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

    const noteRevisions: NoteRevision[] = []
    for (const doc of querySnap.docs) {
      let noteRevision = noteRevisionFromFirestore(doc)
      const note = await getNote(noteRevision.noteId)
      if (note) {
        noteRevision.note = note
      }
      noteRevisions.push(noteRevision)
    }

    return noteRevisions;
  } catch (err) {
    console.error(err);
    return []
  }
}

export async function createNoteRevision(noteRevision: NoteRevision) {
  try {
    const noteRevisionsRef = getNoteRevisionRef()
    const addedNoteRevisionRef = await addDoc(noteRevisionsRef, noteRevision);
    const addedNoteRevision = await getDoc(addedNoteRevisionRef);
    return noteRevisionFromFirestore(addedNoteRevision);
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * 1. Create - Cretes new note revision only when:
 *   1. No note histories exist
 *   2. The last note history was more than a day ago
 * 2. Update - We actually do not update the note revision, but create a new one. This is to keep track of the changes
 * 
 * @param noteId Note ID to create or update note revision for. We assume that the logic to check for the noteId is already
 * implemented inside the react-query functions
 * @param noteRevision 
 * @returns 
 */
export async function createOrUpdateNoteRevision(noteId: string, noteRevision: NoteRevision) {
  try {
      const noteRevisionsRef = getNoteRevisionRef()

      const noteRevisionQuery = query(noteRevisionsRef, 
          where('noteId', '==', noteId),
          orderBy('revisionTime', 'desc'),
      );
      const querySnap = await getDocs(noteRevisionQuery);
      if (querySnap.empty) {
        console.info("Creating new note revision", noteRevision)
          return createNoteRevision(noteRevision);
      } 

      let lastNoteRevision = noteRevisionFromFirestore(querySnap.docs[0]);
      if (!isToday(lastNoteRevision.revisionTime, new Date())) {
        return createNoteRevision(noteRevision);
      }
      
      return noteRevision;
  } catch (err) {
      console.error(err);
  }
}