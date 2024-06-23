
// import { noteFormSchema } from "@/components/form/note-form";
import { noteFormSchema } from "@/components/notes/note-form";
import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { z } from "zod";
// import { z } from "zod";

export type Note = {
    id?: string;
    title: string;
    data: string;
    createdAt: Date;
    updatedAt: Date;
}


export function firestoreNoteToNote(data: DocumentSnapshot<DocumentData, DocumentData>): Note {
    return {
        id: data.id,
        ...data.data(),
        createdAt: data.data()?.createdAt.toDate(),
        updatedAt: data.data()?.createdAt.toDate(),
    } as Note
}

export function formToNote(data: z.infer<typeof noteFormSchema>, update: boolean = false): Note {
    return {
        title: data.title,
        data: data.data,
        createdAt: new Date(),
        updatedAt: new Date()
    }
}