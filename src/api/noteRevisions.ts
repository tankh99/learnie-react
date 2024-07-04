import { app } from "@/lib/firebsae/config"
import { noteRevisionFromFirestore, NoteRevision } from "@/types/NoteRevision";
import { addDoc, and, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, or, orderBy, query, updateDoc, where } from "firebase/firestore"
import { getNote } from "./notes";
import { isToday } from "@/lib/date";
import { startOfDay, subDays } from 'date-fns'

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
    const yesterday = subDays(startOfDay(new Date()), 1);
    const noteRevisionsRef = getNoteRevisionRef();
    const noteRevisionQuery = query(noteRevisionsRef, 
      or(
        where('revisionTime', '>', yesterday),
        where('reviewed', '==', false),
      ),
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

// Private method since we likely don't want t oexpose this
export async function updateNoteRevision(id: string, noteRevision: NoteRevision) {
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
      const yesterday = startOfDay(new Date())
      const noteRevisionQuery = query(noteRevisionsRef, 
        and(
          where('noteId', '==', noteId),
          or(
            where('revisionTime', '>', yesterday),
            where('reviewed', '==', false),
          )
        ),
        orderBy('revisionTime', 'desc'),
      );
      const querySnap = await getDocs(noteRevisionQuery);
      if (querySnap.empty) {
        console.info("Creating new note revision", noteRevision)
        return createNoteRevision(noteRevision);
      } 

      let lastNoteRevision = noteRevisionFromFirestore(querySnap.docs[0]);
      // console.log("last noteREvision", lastNoteRevision, querySnap.docs[0]);
      if (!isToday(lastNoteRevision.revisionTime, new Date())) {
        console.info("Creating new note revision", noteRevision)
        return createNoteRevision(noteRevision);
      }
      
      return noteRevision;
  } catch (err) {
      console.error(err);
  }
}

export async function deleteNoteRevisionsWithNoteId(noteId: string) {
  try {

    const noteRevisionsRef = getNoteRevisionRef();
    const noteRevisionQuery = query(noteRevisionsRef, where('noteId', '==', noteId));
    const querySnap = await getDocs(noteRevisionQuery);
    if (querySnap.empty) {
      return;
    }
    querySnap.docs.forEach(async (doc) => {
      await deleteDoc(doc.ref)
    })
  } catch (err) {
    console.error(err)
    throw err
  }
}