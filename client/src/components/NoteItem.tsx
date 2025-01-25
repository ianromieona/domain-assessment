import React from "react";
import { NoteBody } from "../config/types";

const NoteItem: React.FC<{ note: NoteBody; onClick: () => void }> = ({
    note,
    onClick,
}) => {
    return (
        <div
            className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
            onClick={onClick}
        >
            <h2 className="text-xl font-bold mb-2">{note.title}</h2>
            <p className="mb-4">{note.description}</p>
        </div>
    );
};

export default NoteItem;
