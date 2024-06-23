export type NoteRevision = {
    id?: string;
    data: string; // What was changed
    revisionTime: Date;
}