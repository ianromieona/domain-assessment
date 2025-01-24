export interface Config {
    collection_name: string;
}

export interface APISuccessResponse {
    status: number;
    message?: string;
    data: object | any[];
}

export interface APIErrorResponse {
    status: number;
    error: string;
}

export interface NoteBody {
    title: string;
    description: string;
}
