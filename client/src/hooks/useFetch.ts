import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { toQueryParams } from "../utils/queryparams";
import { NoteBody } from "../config/types";

const baseUrl: string = "http://localhost:4000/api";

type FetchOptions = {
    method: "GET" | "POST" | "PUT" | "DELETE";
    body?: object;
    params?: object;
};

const useFetch = (url: string, options: FetchOptions) => {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);

    const queryParams = options.params
        ? `?${toQueryParams(options.params || {})}`
        : "";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const config: AxiosRequestConfig = {
                    method: options.method,
                    url: baseUrl + url + queryParams,
                    data: options.body ? options.body : null,
                };
                const response = await axios(config);

                if (response.data.data.length === 0) {
                    setHasMore(false);
                }
                setData((prevData: NoteBody[]) => [
                    ...prevData,
                    ...response.data.data,
                ]);
            } catch (error) {
                setError("Error fetching data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, options]);

    return { data, loading, error, hasMore };
};

export default useFetch;
