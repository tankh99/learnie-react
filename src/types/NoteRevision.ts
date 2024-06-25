import { DocumentSnapshot, DocumentData } from "firebase/firestore";

/**
 * Only one per day, to avoid clogging up DB.
 * If no note revision detected for today, create one. If there is already one note revision, then update it
 * Note revisions are created/updated when a note is created/updated
 */
export type NoteRevision = {
    id?: string;
    data: string; // What was changed, in delta
    revisionTime: Date;
}

export function noteRevisionFromFirestore(data: DocumentSnapshot<DocumentData, DocumentData>): NoteRevision {
    return {
        id: data.id,
        ...data.data(),
        revisionTime: data.data()?.revisionTime.toDate()
    } as NoteRevision
}