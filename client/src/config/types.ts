export interface NoteBody {
    id: string;
    title: string;
    description: string;
    created_at: string;
}

export interface NoteStoreType {
    notes: NoteBody[];
    selectedNote: NoteBody | null;
    formMode: boolean;
    refetch: boolean;
    addNotesToList: (note: NoteBody[]) => void;
    addNote: (note: NoteBody) => void;
    resetAndAddNote: (note: NoteBody[]) => void;
    setSelected: (note: NoteBody | null) => void;
    clearNote: () => void;
    setFormMode: (mode: boolean) => void;
    updateNote: (note: NoteBody) => void;
    editMode: () => void;
    refetchNotes: (t: boolean) => void;
}
