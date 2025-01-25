import React from "react";
import { NoteBody } from "../config/types";

const NoteDetail: React.FC<{ note: NoteBody }> = ({ note }) => {
    return (
        <div className="p-2 border-b border-solid border-gray-300">
            <h2 className="text-xl font-bold mb-2">{note.title}</h2>
            <p className="mb-4">{note.description}</p>
        </div>
    );
};

export default NoteDetail;
