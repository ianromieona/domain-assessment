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
        <div className="p-2 flex flex-col h-full">
            <div className="">
                <h3 className="text-xs mb-2 text-gray-600 text-center poppins-light">
                    {createdDate(selectedNote?.created_at)}
                </h3>
                <h2 className="text-xl poppins-bold mb-2">
                    {selectedNote?.title}
                </h2>
                <hr className="mb-3" />
            </div>
            <div className="flex-1 overflow-y-auto">
                <p className="mb-4 whitespace-pre-wrap text-md poppins-regular text-gray-600">
                    {selectedNote?.description}
                </p>
            </div>
        </div>
    );
};

export default NoteDetail;
