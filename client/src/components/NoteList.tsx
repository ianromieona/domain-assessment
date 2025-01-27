import React, { useState, useRef, useMemo, useEffect } from "react";
import { useDebounce } from "use-debounce";

// Services
import { api } from "../api";
import { NoteBody, NoteStoreType } from "../config/types";

// Components
import NoteItem from "./NoteItem";

// Store
import useNoteStore from "../stores/useNoteStore";

// UI
import CebIcon from "../icons/CebIcon";

const LIMIT = 20;

export default function NoteList() {
    const noteListRef = useRef<HTMLDivElement | null>(null);
    const { notes, resetAndAddNote, addNotesToList, refetch, refetchNotes } =
        useNoteStore() as NoteStoreType;
    const [page, setPage] = useState(0);
    const [text, setText] = useState<string | null>(null);
    const [value] = useDebounce(text, 1000);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const noteRef: HTMLDivElement | null = noteListRef.current;
        if (noteRef) {
            noteRef.addEventListener("scroll", handleScroll);

            return () => {
                if (noteRef) {
                    noteRef.removeEventListener("scroll", handleScroll);
                }
            };
        }
    }, [loading, hasMore]);

    useEffect(() => {
        fetchNotes(page, value);
    }, [page]);

    useEffect(() => {
        if (value !== null) {
            fetchNotes(page, value, true);
        }
    }, [value]);

    useEffect(() => {
        if (refetch) {
            fetchNotes(0, value, true);
        }
    }, [refetch]);

    /**
     * Fetch notes
     * @param page - page number
     * @param clear - clear notes data, reset page to 0
     */
    const fetchNotes = async (
        page: number,
        query: string | null,
        clear: boolean = false
    ) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.notes.getAll({
                limit: LIMIT,
                offset: page * LIMIT,
                query,
            });
            const data = await response.data;
            if (data.length === 0 && !clear) {
                setHasMore(false);
            }
            if (clear) {
                resetAndAddNote(data);
                refetchNotes(false);
                setHasMore(true);
            } else {
                addNotesToList(data);
            }
        } catch (error) {
            setError("Error fetching data");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Filter out duplicate notes
     */
    const definedNotes = useMemo(() => {
        const uniqueNotes = notes.reduce((acc: NoteBody[], note: NoteBody) => {
            if (!acc.find((item) => item.id === note.id)) {
                acc.push(note);
            }
            return acc;
        }, []);
        return uniqueNotes.sort((a: NoteBody, b: NoteBody) =>
            a.created_at > b.created_at ? -1 : 1
        );
    }, [notes]);

    /**
     * Handle scroll event
     */
    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight }: any =
            noteListRef.current;

        if (
            scrollTop + clientHeight >= scrollHeight - 5 &&
            !loading &&
            hasMore
        ) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <>
            <h3 className="bg-gray-100 p-2">
                <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-lg w-full text-xs"
                    placeholder="Search..."
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                />
            </h3>

            <div className="p-2  h-screen overflow-y-auto" ref={noteListRef}>
                {definedNotes.map((item: NoteBody, index: number) => (
                    <NoteItem note={item} key={index} />
                ))}
                {error && <p>Error fetching notes...</p>}
                {!loading && definedNotes.length === 0 && (
                    <p className="text-center text-xs my-3 text-gray-400">
                        No notes found
                    </p>
                )}
                {loading && (
                    <p className="text-center text-xs text-gray-400 my-4">
                        Loading...
                    </p>
                )}
                {!hasMore && (
                    <h4 className="flex justify-center item-center text-xs my-3 text-gray-400 gap-1">
                        All caught up <CebIcon width={15} />
                    </h4>
                )}
            </div>
        </>
    );
}
