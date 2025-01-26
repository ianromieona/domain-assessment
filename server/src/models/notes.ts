import db from "../config/firebase";
import config from "../config/config";

/**
 * Get all notes
 * @param param0
 * @returns Note[] | null
 */
const getAll = async ({
    limit = 10,
    offset = 0,
    order = "asc",
    query = "",
}: {
    limit: number;
    offset: number;
    order: "asc" | "desc";
    query: string;
}) => {
    try {
        let queryRef = db
            .collection(config.collection_name)
            .orderBy("created_at", order)
            .offset(offset)
            .limit(limit);

        if (query) {
            console.log("query", query);
            const queryTitle = queryRef
                .where("title", ">=", query)
                .where("title", "<=", query + "\uf8ff");
            const queryDescription = queryRef
                .where("description", ">=", query)
                .where("description", "<=", query + "\uf8ff");

            const [titleSnapshot, descriptionSnapshot] = await Promise.all([
                queryTitle.get(),
                queryDescription.get(),
            ]);
            const results: any = [];

            // Add matches from title query
            titleSnapshot.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() });
            });

            // Add matches from description query
            descriptionSnapshot.forEach((doc) => {
                // Avoid duplicating documents already in the results
                if (!results.find((note: any) => note.id === doc.id)) {
                    results.push({ id: doc.id, ...doc.data() });
                }
            });

            return results;
        } else {
            const snapshot = await queryRef.get();

            const data = snapshot.docs.map((doc: any) => {
                const docData = doc.data();
                const createdAt = docData.created_at.toDate();
                return {
                    id: doc.id,
                    ...docData,
                    created_at: createdAt,
                };
            });
            return data;
        }
    } catch (e: any) {
        console.log(e);
        return [];
    }
};

/**
 * Get note by id
 * @param id
 * @returns Note | null
 */
const getById = async (id: string) => {
    try {
        const noteRef = db.collection(config.collection_name).doc(id);
        const note = await noteRef.get();

        if (!note.exists) {
            return null;
        }

        const data = note.data();
        return {
            id: note.id,
            ...data,
            created_at: data?.created_at.toDate(),
        };
    } catch (e: any) {
        return null;
    }
};

/**
 * Create new note
 * @param id
 * @returns Note | null
 */
const create = async ({
    title,
    description,
}: {
    title: string;
    description: string;
}) => {
    try {
        const newNote = {
            title,
            description,
            created_at: new Date(),
        };

        const noteRef = await db
            .collection(config.collection_name)
            .add(newNote);

        return {
            id: noteRef.id,
            ...newNote,
        };
    } catch (e: any) {
        return null;
    }
};

/**
 * Update note
 * @param id
 * @returns Note | null
 */
const update = async (
    id: string,
    updateData: { title?: string; description?: string }
) => {
    try {
        // Filter out undefined values
        const filteredUpdateData = Object.fromEntries(
            Object.entries(updateData).filter(([_, v]) => v !== undefined)
        );

        const noteRef = db.collection(config.collection_name).doc(id);
        await noteRef.update(filteredUpdateData);
        const updatedNote = await noteRef.get();

        const data = updatedNote.data();
        return {
            id: updatedNote.id,
            ...data,
            created_at: data?.created_at.toDate(),
        };
    } catch (e: any) {
        return null;
    }
};

/**
 * Remove note
 * @param id
 * @returns Note | null
 */
const remove = async (id: string) => {
    try {
        const noteRef = db.collection(config.collection_name).doc(id);
        await noteRef.delete();
        return { id };
    } catch (e: any) {
        return null;
    }
};

export default { getAll, create, update, remove, getById };
