
// import { noteFormSchema } from "@/components/form/note-form";
import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { NoteRevision } from "./NoteRevision";
import { NoteFormValues } from "@/components/notes/note-form";
// import { z } from "zod";

export type Note = {
    id?: string;
    title: string;
    data: string; // JSON stringified Delta
    createdAt?: Date;
    updatedAt?: Date;
    noteRevisions?: NoteRevision[];
}


export function noteFromFirestore(data: DocumentSnapshot<DocumentData, DocumentData>): Note {
    return {
        id: data.id,
        ...data.data(),
        noteRevisions: data.data()?.noteRevisions?.map((revision: any) => {
            const noteRevision: NoteRevision = {
                data: revision.data,
                revisionTime: revision.revisionTime.toDate(),
            }
            return noteRevision
        }),
        createdAt: data.data()?.createdAt.toDate(),
        updatedAt: data.data()?.createdAt.toDate(),
    } as Note
}

export function formToNote(data: NoteFormValues, update: boolean = false): Note {
    let note: Note = {
        title: data.title,
        data: data.data,
        updatedAt: new Date()
    }

    if (!update) {
        note.createdAt = new Date();
    }

    return note;
}