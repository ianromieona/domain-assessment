import React from "react";

// Services / Utils
import { NoteBody, NoteStoreType } from "../config/types";
import { api } from "../api";
import { h } from "../helpers";

// Store
import useNoteStore from "../stores/useNoteStore";

const NoteForm: React.FC<{}> = ({}) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);
    const {
        addNote,
        updateNote: editNote,
        setSelected,
        setFormMode,
        selectedNote,
    } = useNoteStore() as NoteStoreType;
    /**
     * Create request action
     * @param body
     * @returns {Promise<{ data: NoteBody }>}
     */
    async function createNote(body: NoteBody): Promise<{ data: NoteBody }> {
        setLoading(true);

        const response = await api.notes.create(body);

        setLoading(false);

        return { data: response.data };
    }

    /**
     * Update request action
     * @param body
     * @returns {Promise<{ data: NoteBody }>}
     */
    async function updateNote(
        id: string,
        body: Partial<NoteBody>
    ): Promise<{ data: NoteBody }> {
        setLoading(true);
        const response = await api.notes.update(id, body);

        setLoading(false);

        return { data: response.data };
    }

    async function handleSubmit(e: React.FormEvent) {
        // clear errors
        setErrors([]);

        e.preventDefault();
        const title = (e.target as any).title.value;
        const description = (e.target as any).description.value;

        if (!title || !description) {
            if (!title) {
                setErrors((prevErrors) => [...prevErrors, "Title is required"]);
            }
            if (!description) {
                setErrors((prevErrors) => [
                    ...prevErrors,
                    "Description is required",
                ]);
            }
            return;
        }

        const newNote: Partial<NoteBody> = { title, description };

        try {
            const action = selectedNote
                ? updateNote(selectedNote.id, newNote as NoteBody)
                : createNote(newNote as NoteBody);

            const { data } = await action;
            h.general.alert("success", {
                message: `Note successfully ${
                    selectedNote ? "updated" : "created"
                }`,
            });
            if (selectedNote) {
                editNote(data);
            } else {
                addNote(data);
            }
            setSelected(data);
            setFormMode(false);
        } catch (error) {
            h.general.alert("error", { message: "Something went wrong." });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1
                className="text-md font-light bg-gray-100 p-2 flex items-center poppins-bold "
                style={{ height: "50px" }}
            >
                {!selectedNote ? "Create a Note" : "Edit Note"}
            </h1>
            <form onSubmit={handleSubmit} className="p-2">
                <div className="mb-4">
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 poppins-bold"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        {...(selectedNote && {
                            defaultValue: selectedNote.title,
                        })}
                        className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                        disabled={loading}
                    />
                    {errors.includes("Title is required") && (
                        <p className="text-red-500 text-xs mt-1 poppins-regular">
                            Title is required
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 poppins-bold"
                    >
                        Description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        {...(selectedNote && {
                            defaultValue: selectedNote.description,
                        })}
                        className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                        disabled={loading}
                        rows={5}
                    />
                    {errors.includes("Description is required") && (
                        <p className="text-red-500 text-xs mt-1 poppins-regular">
                            Description is required
                        </p>
                    )}
                </div>
                <div className="flex justify-between">
                    <button
                        type="button"
                        className="bg-gray-500 text-white px-3 py-2 text-xs rounded-md hover:bg-gray-700 poppins-semibold"
                        onClick={(e) => {
                            e.preventDefault();
                            setFormMode(false);
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-3 py-2 text-xs rounded-md hover:bg-blue-700 poppins-semibold"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NoteForm;
