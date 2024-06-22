
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
