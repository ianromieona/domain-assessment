import React, { useMemo } from "react";

// Services/Utils
import { NoteBody, NoteStoreType } from "../config/types";
import styles from "./Note.module.css";

// Store
import useNoteStore from "../stores/useNoteStore";

type NoteItemProps = {
    note: NoteBody;
};

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
    const { selectedNote, setSelected } = useNoteStore() as NoteStoreType;

    const isSelected = useMemo(
        () => selectedNote?.id === note.id,
        [selectedNote]
    );

    return (
        <div className={`group `} onClick={() => setSelected(note)}>
            <div
                className={`p-2 my-1 group-hover:bg-gray-800 rounded-lg cursor-pointer border ${
                    isSelected ? "bg-gray-800 border-gray-100" : ""
                }`}
            >
                <h2
                    className={`text-sm font-normal mb-1 truncate group-hover:text-white ${
                        isSelected ? "text-white" : ""
                    } ${styles.noteItemTitle}`}
                >
                    {note.title}
                </h2>
                <p
                    className={`truncate group-hover:text-white ${
                        isSelected ? "text-white" : "text-gray-600 "
                    } ${styles.noteItemDescription}`}
                >
                    {note.description}
                </p>
            </div>
        </div>
    );
};

export default NoteItem;
