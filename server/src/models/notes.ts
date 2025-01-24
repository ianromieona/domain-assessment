import db from "../config/firebase";
import config from "../config/config";

const getAll = async ({
    limit = 10,
    offset = 0,
}: {
    limit: number;
    offset: number;
}) => {
    try {
        const snapshot = await db
            .collection(config.collection_name)
            .orderBy("created_at")
            .offset(offset)
            .limit(limit)
            .get();

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
    } catch (e: any) {
        console.log(e);
        return null;
    }
};

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
        console.log(e);
        return null;
    }
};

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
        console.log(e);
        return null;
    }
};

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
        console.log(e);
        return null;
    }
};

const remove = async (id: string) => {
    try {
        const noteRef = db.collection(config.collection_name).doc(id);
        await noteRef.delete();
        return { id };
    } catch (e: any) {
        console.log(e);
        return null;
    }
};

export default { getAll, create, update, remove, getById };
