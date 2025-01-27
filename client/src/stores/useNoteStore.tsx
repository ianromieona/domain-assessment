import { create } from "zustand";
import { NoteBody, NoteStoreType } from "../config/types";

const useNoteStore = create<NoteStoreType>((set) => ({
    notes: [],
    selectedNote: null,
    formMode: false,
    refetch: false,
    addNotesToList: (newNotes: NoteBody[]) =>
        set((state: { notes: NoteBody[] }) => ({
            notes: [...state.notes, ...newNotes],
        })),
    addNote: (newNote: NoteBody) =>
        set((state: { notes: NoteBody[] }) => ({
            notes: [...state.notes, newNote],
        })),
    clearNote: () => set({ notes: [] }),
    resetAndAddNote: (newNote: NoteBody[]) => set({ notes: newNote }),
    setSelected: (newNote: NoteBody | null) =>
        set({
            selectedNote: newNote,
            formMode: false,
        }),
    setFormMode: (mode: boolean) =>
        set((state: NoteStoreType) => ({
            formMode: mode,
            selectedNote: mode ? null : state.selectedNote,
        })),
    updateNote: (updatedNote: NoteBody) => {
        set((state) => {
            const notes = state.notes.map((note) =>
                note.id === updatedNote.id ? { ...note, ...updatedNote } : note
            );
            return { notes };
        });
    },
    editMode: () =>
        set((state: NoteStoreType) => ({
            formMode: true,
            selectedNote: state.selectedNote,
        })),
    refetchNotes: (t: boolean) => set({ refetch: t }),
}));

export default useNoteStore;
