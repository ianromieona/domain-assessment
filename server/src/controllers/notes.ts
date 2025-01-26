import notesModel from "../models/notes";

// models
import { Request, Response } from "express";
import ApiResponse from "../middlewares/api-responses";
import { NoteBody } from "../types/types";

const getAll = async (req: Request, res: Response) => {
    try {
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = parseInt(req.query.offset as string) || 0;
        const query = req.query.query as string|| "";

        const data = await notesModel.getAll({ limit, offset, order: "desc", query });

        ApiResponse.success(req, res, "Note successfully retrieved", data);
    } catch (e: any) {
        ApiResponse.error(req, res, e.message);
    }
};

const create = async (req: Request, res: Response) => {
    const { title, description }: NoteBody = req.body;

    if (!title || !description) {
        return ApiResponse.error(
            req,
            res,
            "Title and description are required."
        );
    }

    try {
        const newNote = await notesModel.create({ title, description });
        ApiResponse.success(req, res, "Note successfully created", newNote);
    } catch (e: any) {
        ApiResponse.error(req, res, e.message);
    }
};

const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description }: Partial<NoteBody> = req.body;

    if (!title && !description) {
        return ApiResponse.error(
            req,
            res,
            "Title or description are required."
        );
    }

    try {
        const updatedNote = await notesModel.update(id, { title, description });
        if (!updatedNote) {
            return ApiResponse.error(req, res, "Note not found.");
        }
        ApiResponse.success(req, res, "Note successfully updated", updatedNote);
    } catch (e: any) {
        ApiResponse.error(req, res, e.message);
    }
};

const remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const existingNote = await notesModel.getById(id);

        if (!existingNote) {
            return ApiResponse.error(req, res, "Note not found.");
        }

        await notesModel.remove(id);
        ApiResponse.success(
            req,
            res,
            "Note successfully removed",
            existingNote
        );
    } catch (e: any) {
        ApiResponse.error(req, res, e.message);
    }
};

export default { getAll, create, update, remove };
