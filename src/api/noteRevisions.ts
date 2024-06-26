import { app } from "@/lib/firebsae/config"
import { noteRevisionFromFirestore, NoteRevision } from "@/types/NoteRevision";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, orderBy, query, updateDoc, where } from "firebase/firestore"


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
    const addedNoteRevisionRef = await addDoc(noteRevisionsRef, noteRevision);
    const addedNoteRevision = await getDoc(addedNoteRevisionRef);
    return noteRevisionFromFirestore(addedNoteRevision);
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Private method since we likely don't want t oexpose this
async function updateNoteRevision(id: string, noteRevision: NoteRevision) {
  try {
      const noteRevisionsRef = getNoteRevisionRef()
      const noteRevisionDoc = doc(noteRevisionsRef, id);
      await updateDoc(noteRevisionDoc, noteRevision);
      
      console.info(`Updated note revision ID ${id} successfully`, noteRevision);
      return noteRevision;
  } catch (err) {
      console.error(err);
  }
}

/**
 * 1. Create - Cretes new note revision only when:
 *   1. No note histories exist
 *   2. The last note history was more than a day ago
 * 2. Update - Updates only when the last note history was created within the last day. 
 *   - Then update the revisionTime
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
      lastNoteRevision.revisionTime = new Date();
      console.log("updating with note reivison", noteRevision);
      await updateNoteRevision(lastNoteRevision.id!, noteRevision)

      return lastNoteRevision;
  } catch (err) {
      console.error(err);
  }
}