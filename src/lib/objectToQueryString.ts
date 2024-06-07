export function objectToQueryString(obj:any) {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(obj)) {
        if (value !== null && value !== undefined) {
            params.append(key, value as string);
        }
    }

    return params.toString();
}
