import React from "react";
import { NoteBody } from "../config/types";
import styles from "./Note.module.css";

type NoteItemProps = {
    note: NoteBody;
    onClick: () => void;
    isSelected: boolean;
};

const NoteItem: React.FC<NoteItemProps> = ({ note, onClick, isSelected }) => {
    return (
        <div className={`group `} onClick={onClick}>
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
