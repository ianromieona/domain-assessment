import React from "react";

// Services / UTILS
import { api } from "../api";
import { NoteStoreType } from "../config/types";
import { h } from "../helpers";

// Store
import useNoteStore from "../stores/useNoteStore";

// Components
import TrashIcon from "../icons/TrashIcon";
import EditIcon from "../icons/EditIcon";

const NoteActions: React.FC<{}> = ({}) => {
    const {
        selectedNote: note,
        setSelected,
        setFormMode,
        refetchNotes,
        editMode,
    } = useNoteStore() as NoteStoreType;

    /**
     * Handle delete note action request
     * @param noteId
     * @returns
     */
    async function deleteNote(noteId: string) {
        if (!window.confirm("Are you sure you want to delete this note?")) {
            return;
        }

        try {
            await api.notes.remove(noteId);
            h.general.alert("success", {
                message: "Note successfully deleted",
            });
            setSelected(null);
            refetchNotes(true);
        } catch (error) {
            h.general.alert("error", { message: "Something went wrong." });
        }
    }

    return (
        <div
            className="flex justify-between items-center bg-gray-100 p-2"
            style={{ height: "50px" }}
        >
            <div>
                <button
                    className="border border-1 border-solid border-black text-black px-3 py-2 text-xs rounded-md mr-2 hover:bg-black hover:text-white"
                    onClick={() => setFormMode(true)}
                >
                    Create new note
                </button>
            </div>
            <div className="flex items-center gap-4">
                <button onClick={() => editMode()} title="Edit note">
                    <EditIcon width={20} />
                </button>
                <button
                    onClick={() => note?.id && deleteNote(note.id)}
                    title="Delete note"
                >
                    <TrashIcon width={20} />
                </button>
            </div>
        </div>
    );
};

export default NoteActions;
