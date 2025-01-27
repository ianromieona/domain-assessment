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

    // DATA GENERATOR
    // for (let i = 0; i < 50; i++) {
    //     it(`should create note ${i + 1}`, async () => {
    //         const newNote = {
    //             title: `Sample data #${i + 1}`,
    //             description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`,
    //         };
    //         const response = await request(app)
    //             .post("/api/notes")
    //             .send(newNote);
    //         expect(response.status).toBe(200);
    //         expect(response.body.data).toHaveProperty("id");
    //         expect(response.body.data.title).toBe(newNote.title);
    //         expect(response.body.data.description).toBe(newNote.description);
    //     });
    // }
});
