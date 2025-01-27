import request from "supertest";
import app from "../src/app";

describe("Notes API", () => {
    let newNoteId: string;

    it("should get all notes", async () => {
        const response = await request(app).get("/api/notes");
        expect(response.status).toBe(200);
        expect(response.body.data).toBeInstanceOf(Array);
    });

    it("should create a new note", async () => {
        const newNote = { title: "Test Note", description: "Test Description" };
        const response = await request(app).post("/api/notes").send(newNote);
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty("id");
        expect(response.body.data.title).toBe(newNote.title);
        expect(response.body.data.description).toBe(newNote.description);

        newNoteId = response.body.data.id;
    });

    it("should update a note", async () => {
        const noteId = newNoteId;
        const updatedNote = {
            title: "Jest test update",
            description: "Jest test description",
        };
        const response = await request(app)
            .put(`/api/notes/${noteId}`)
            .send(updatedNote);
        expect(response.status).toBe(200);
        expect(response.body.data.title).toBe(updatedNote.title);
        expect(response.body.data.description).toBe(updatedNote.description);
    });

    it("should delete a note", async () => {
        const noteId = newNoteId;
        const response = await request(app).delete(`/api/notes/${noteId}`);
        expect(response.status).toBe(200);
    });
});
