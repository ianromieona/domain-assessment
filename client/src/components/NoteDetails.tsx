import React from "react";
import moment from "moment";
import { NoteStoreType } from "../config/types";

// Store
import useNoteStore from "../stores/useNoteStore";

/**
 * Format created date
 * @param date
 * @returns string
 */
const createdDate = (date: string): string => {
    const d = moment(date).format("MMMM Do, YYYY");
    const t = moment(date).format("h:mma");

    return `${d} at ${t}`;
};

const NoteDetail: React.FC<{}> = ({}) => {
    const { selectedNote } = useNoteStore() as NoteStoreType;

    if (!selectedNote) {
        return <div className="p-2">No note selected</div>;
    }
    return (
        <div className="p-2">
            <h3 className="font-light text-xs mb-2 text-gray-600 text-center">
                {createdDate(selectedNote?.created_at)}
            </h3>
            <h2 className="text-xl font-bold mb-2">{selectedNote?.title}</h2>
            <hr className="mb-3" />
            <p className="mb-4 whitespace-pre-wrap text-xs text-gray-600">
                {selectedNote?.description}
            </p>
        </div>
    );
};

export default NoteDetail;
