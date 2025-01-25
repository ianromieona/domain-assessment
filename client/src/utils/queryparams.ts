export const toQueryParams = (params: Record<string, any>): string => {
    return Object.entries(params)
        .map(
            ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&");
};
