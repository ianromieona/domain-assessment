import React from "react";
import axios from "axios";
import { NoteBody } from "../config/types";

const baseUrl: string = "http://localhost:4000/api";

const CreateNote: React.FC<{
    onSuccess: (newResponse: NoteBody) => void;
    onCancel: () => void;
}> = ({ onSuccess, onCancel }) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);

    async function createNote(body: NoteBody) {
        let error = false;
        let data: NoteBody | null = null;

        try {
            setLoading(true);
            const response = await axios.post(`${baseUrl}/notes`, body, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            data = response.data?.data;
        } catch (error) {
            console.error(error);
            error = true;
        }

        setLoading(false);

        return { error, data };
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

        const { error, data } = await createNote(newNote as NoteBody);

        if (!error && data) {
            onSuccess(data);
        } else {
            alert("Error creating note");
        }
    }

    return (
        <div className="">
            <h1 className="text-2xl font-bold mb-4">Create a Note</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                        disabled={loading}
                    />
                    {errors.includes("Title is required") && (
                        <p className="text-red-500 text-xs mt-1">
                            Title is required
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                        disabled={loading}
                    />
                    {errors.includes("Description is required") && (
                        <p className="text-red-500 text-xs mt-1">
                            Description is required
                        </p>
                    )}
                </div>
                <div className="flex justify-between">
                    <button
                        type="button"
                        className="bg-gray-500 text-white p-2 rounded-lg"
                        onClick={(e) => {
                            e.preventDefault();
                            onCancel();
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded-lg"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateNote;
