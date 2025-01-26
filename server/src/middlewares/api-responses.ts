import { Request, Response } from "express";
import { APISuccessResponse, APIErrorResponse } from "../types/types";

/**
 * API response handler
 */
const ApiResponse = {
    success: (
        req: Request,
        res: Response,
        message: string,
        data: any,
        status = 200
    ) => {
        const responseData: APISuccessResponse = {
            status,
            message,
            data,
        };

        res.status(status).json(responseData);
    },
    error: (req: Request, res: Response, error: string, status = 500) => {
        const responseData: APIErrorResponse = {
            status,
            error,
        };

        res.status(status).json(responseData);
    },
};

export default ApiResponse;
