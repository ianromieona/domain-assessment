import React from "react";
import axios from "axios";
import { NoteBody } from "../config/types";

type NoteActionsProps = {
    note: NoteBody;
    onDeleteSuccess: () => void;
    onError: () => void;
};

const baseUrl: string = "http://localhost:4000/api";

const NoteActions: React.FC<NoteActionsProps> = ({
    note,
    onDeleteSuccess,
    onError,
}) => {
    async function deleteNote(noteId: string) {
        if (!window.confirm("Are you sure you want to delete this note?")) {
            return;
        }

        try {
            await axios.delete(`${baseUrl}/notes/${noteId}`);
            onDeleteSuccess();
        } catch (error) {
            onError();
        }
    }

    return (
        <div className="flex mt-4 justify-end">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-700">
                Edit
            </button>
            <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                onClick={() => deleteNote(note.id)}
            >
                Delete
            </button>
        </div>
    );
};

export default NoteActions;
