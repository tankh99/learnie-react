
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, orderBy, query, updateDoc, where } from "firebase/firestore";
import { app } from "../lib/firebsae/config";
import { firestoreNoteToNote, Note } from "../types/Note";

const NOTE_TABLE_NAME = "notes"

export function getNotesRef() {
    try {
        const firestore = getFirestore(app);
        const notesRef = collection(firestore, NOTE_TABLE_NAME);
        return notesRef
    } catch (err) {
        throw err;
    }
}


export async function getNotes() {
  const notes: Note[] = [];
  try {
      const notesRef = getNotesRef()
      const notesQuery = query(notesRef, orderBy('createdAt', 'desc'));
      const querySnap = await getDocs(notesQuery);
      if (querySnap.empty) {
          return [];
      }
      querySnap.docs.map(doc => {
          notes.push(firestoreNoteToNote(doc));
      });
  } catch (err) {
      console.error(err);
  }
  return notes;
}

export async function getNote(id: string) {
    try {
        const notesRef = getNotesRef()
        const notesDoc = doc(notesRef, id)
        const note = await getDoc(notesDoc)
        if (note.exists()) {
            return firestoreNoteToNote(note)
        }
        
        return null;
    } catch (err) {
        console.error(err);
    }
}


export async function createNote(note: Note) {
    try {
        const notesRef = getNotesRef()
        const addedNote = await addDoc(notesRef, note);
        console.info(`Added note`, addedNote)
        return note;
    } catch (err) {
        console.error(err);
    }
}

export async function updateNote(id: string, note: Note) {
    try {
        const notesRef = getNotesRef()
        const noteDoc = doc(notesRef, id);
        await updateDoc(noteDoc, note);
        console.info(`Updated note ID ${id} successfully`);
        return note;
    } catch (err) {
        console.error(err);
    }
}

export async function deleteNote(id: string) {

    try {
        const notesRef = getNotesRef();
        const noteDoc = doc(notesRef, id);
        const note = await getDoc(noteDoc);
        await deleteDoc(noteDoc)
        console.info(`Deleted note ID ${id} successfully`);
        return firestoreNoteToNote(note)
    } catch (err) {
        console.error(err);
    }
}