import React from "react";
import { NoteBody } from "../config/types";

type NoteItemProps = {
    note: NoteBody;
    onClick: () => void;
    isSelected: boolean;
};

const NoteItem: React.FC<NoteItemProps> = ({ note, onClick, isSelected }) => {
    return (
        <div
            className={`p-2 my-2 hover:bg-gray-100 rounded-lg cursor-pointer ${
                isSelected ? "bg-gray-100" : ""
            }`}
            onClick={onClick}
        >
            <h2 className="text-xl font-bold mb-2">{note.title}</h2>
            <p className="mb-4">{note.description}</p>
        </div>
    );
};

export default NoteItem;
