import React from "react";
import { NoteStoreType } from "./config/types";
import "./App.css";
import NoteForm from "./components/NoteForm";
import NoteDetail from "./components/NoteDetails";
import NoteActions from "./components/NoteActions";
import { ToastContainer } from "react-toastify";

// Store
import useNoteStore from "./stores/useNoteStore";

// Component
import NoteList from "./components/NoteList";
import NoteWelcome from "./components/NoteWelcome";

function App() {
    const { selectedNote, formMode } = useNoteStore() as NoteStoreType;

    return (
        <div className="App py-3">
            <div
                className="container mx-auto  flex shadow-lg max-h-screen border border-solid border-gray-300 rounded-lg overflow-hidden"
                style={{ height: "800px" }}
            >
                <div className="w-72 border-r border-solid border-gray-300 flex flex-col">
                    <NoteList />
                </div>
                <div className="flex-1">
                    {!selectedNote && !formMode && <NoteWelcome />}
                    {selectedNote && !formMode && <NoteActions />}
                    {selectedNote && !formMode && <NoteDetail />}
                    {formMode && <NoteForm />}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default App;
