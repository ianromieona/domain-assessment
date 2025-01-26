import React, { useEffect, useState, useMemo, useRef } from "react";
import { useDebounce } from "use-debounce";
import { NoteBody } from "./config/types";
import { api } from "./api";
import "./App.css";
import NoteItem from "./components/NoteItem";
import NoteForm from "./components/NoteForm";
import NoteDetail from "./components/NoteDetails";
import NoteActions from "./components/NoteActions";
import { ToastContainer } from "react-toastify";
import NoteIcon from "./icons/NoteIcon";
import CebIcon from "./icons/CebIcon";

const LIMIT = 20;
function App() {
    const noteListRef = useRef<HTMLDivElement | null>(null);
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState<NoteBody | null>(null);
    const [formMode, setFormMode] = useState<boolean>(false);
    const [text, setText] = useState<string>("");
    const [value] = useDebounce(text, 1000);
    const [notes, setNotes] = useState<any>([]);
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
        fetchNotes(page, value, true);
    }, [value]);

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
            console.log("ad");
            setPage((prevPage) => prevPage + 1);
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
     * Fetch notes
     * @param page - page number
     * @param clear - clear notes data, reset page to 0
     */
    const fetchNotes = async (
        page: number,
        query: string,
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
                setNotes(data);
                setHasMore(true);
            } else {
                setNotes((prevData: NoteBody[]) => [...prevData, ...data]);
            }
        } catch (error) {
            setError("Error fetching data");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handle delete note action request
     */
    async function handleDelete() {
        setSelected(null);
        setHasMore(true);
        fetchNotes(0, "", true);
    }

    return (
        <div className="App">
            <div className="flex shadow-lg h-screen">
                <div className="w-72 border-r border-solid border-gray-300 flex flex-col">
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

                    <div
                        className="p-2  h-screen overflow-y-auto"
                        ref={noteListRef}
                    >
                        {definedNotes.map((item: NoteBody, index: number) => (
                            <NoteItem
                                note={item}
                                key={index}
                                onClick={() => {
                                    setSelected(item);
                                    setFormMode(false);
                                }}
                                isSelected={selected?.id === item.id}
                            />
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
                </div>
                <div className="flex-1">
                    {!selected && !formMode && (
                        <div className="p-2 flex flex-col items-center justify-center h-full">
                            <NoteIcon width={100} />
                            <h3 className="font-light text-gray-600">
                                Please select a note
                            </h3>
                            <button
                                type="button"
                                onClick={() => setFormMode(true)}
                                className="border border-1 border-solid border-black text-black px-3 py-2 text-xs rounded-md hover:bg-black hover:text-white mt-5"
                            >
                                Create a new note
                            </button>
                        </div>
                    )}
                    {selected && !formMode && (
                        <NoteActions
                            note={selected}
                            onDeleteSuccess={handleDelete}
                            onEditTrigger={() => setFormMode(true)}
                            onCreateTrigger={() => {
                                setSelected(null);
                                setFormMode(true);
                            }}
                        />
                    )}
                    {selected && !formMode && <NoteDetail note={selected} />}
                    {formMode && (
                        <NoteForm
                            onSuccess={(newNote: NoteBody) => {
                                setNotes((prev: NoteBody[]) => [
                                    newNote,
                                    ...prev,
                                ]);
                                setFormMode(false);
                                setSelected(newNote);
                            }}
                            selectedNote={selected || null}
                            onCancel={() => setFormMode(false)}
                        />
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default App;
