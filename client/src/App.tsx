import React, { useEffect, useState, useMemo, useRef } from "react";
import { NoteBody } from "./config/types";
import "./App.css";
import useFetch from "./hooks/useFetch";
import NoteItem from "./components/NoteItem";
import FormNote from "./components/FormNote";
import NoteDetail from "./components/NoteDetails";
import NoteActions from "./components/NoteActions";

const LIMIT = 10;
function App() {
    const noteListRef = useRef<HTMLDivElement | null>(null);
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState<NoteBody | null>(null);
    const [createMode, setCreateMode] = useState<boolean>(false);
    const [newNote, setNewNote] = useState<NoteBody[] | []>([]);

    const {
        data: notes,
        loading,
        error,
        hasMore,
        refetch,
        clearData,
    } = useFetch(
        "/notes",
        useMemo(
            () => ({
                method: "GET",
                params: { limit: LIMIT, offset: page * LIMIT },
            }),
            [page]
        )
    );

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
        setCreateMode(false);
    }, [selected]);

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

    // Combine old notes and newNote
    const combinedNotes = useMemo(() => {
        return [...notes, ...newNote].sort((a, b) =>
            a.created_at > b.created_at ? -1 : 1
        );
    }, [notes, newNote]);

    async function handleDelete() {
        await clearData();
        await refetch();
        setPage(0);
        setNewNote([]);
        setSelected(null);
    }

    return (
        <div className="App">
            <div className="container mx-auto flex shadow-lg ">
                <div
                    className="w-72 p-4 border-r border-solid border-gray-300  overflow-y-auto"
                    style={{ height: "800px" }}
                    ref={noteListRef}
                >
                    {combinedNotes.map((item: NoteBody, index: number) => (
                        <NoteItem
                            note={item}
                            key={index}
                            onClick={() => setSelected(item)}
                            isSelected={selected?.id === item.id}
                        />
                    ))}
                    {error && <p>Error fetching notes...</p>}
                    {loading && <p>Loading...</p>}
                    {!hasMore && <p>End of list</p>}
                </div>
                <div className="flex-1 p-4">
                    {!selected && !createMode && (
                        <div className="p-2 border-b border-solid border-gray-300">
                            <h2 className="text-xl font-bold mb-2">
                                Select a note{" "}
                                <button
                                    type="button"
                                    onClick={() => setCreateMode(true)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs"
                                >
                                    Create new Note
                                </button>
                            </h2>
                        </div>
                    )}
                    {selected && (
                        <NoteActions
                            note={selected}
                            onError={() => {}}
                            onDeleteSuccess={handleDelete}
                        />
                    )}
                    {selected && <NoteDetail note={selected} />}
                    {createMode && (
                        <FormNote
                            onSuccess={(newNote: NoteBody) => {
                                setNewNote([newNote]);
                                setCreateMode(false);
                                setSelected(newNote);
                            }}
                            onCancel={() => setCreateMode(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
