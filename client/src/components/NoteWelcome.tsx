import React from "react";
// Services / Utils
import { NoteStoreType } from "../config/types";

// Components
import NoteIcon from "../icons/NoteIcon";

// Store
import useNoteStore from "../stores/useNoteStore";

export default function NoteWelcome() {
    const { setFormMode } = useNoteStore() as NoteStoreType;

    return (
        <div className="p-2 flex flex-col items-center justify-center h-full">
            <NoteIcon width={100} />
            <h3 className="font-light text-gray-600">Please select a note</h3>
            <button
                type="button"
                onClick={() => setFormMode(true)}
                className="border border-1 border-solid border-black text-black px-3 py-2 text-xs rounded-md hover:bg-black hover:text-white mt-5"
            >
                Create a new note
            </button>
        </div>
    );
}
