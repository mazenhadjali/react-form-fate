export const callDataSource = async (options: { url: string; method?: string; headers?: Record<string, string>; params?: Record<string, unknown>; body?: unknown }) => {
    const { url, method = "GET", headers = {}, params, body } = options;

    try {
        // build URL with query params if provided
        const queryString = params
            ? "?" +
            new URLSearchParams(
                Object.entries(params).reduce(
                    (acc, [key, value]) => ({ ...acc, [key]: String(value) }),
                    {} as Record<string, string>
                )
            ).toString()
            : "";

        const finalUrl = url + queryString;

        const response = await fetch(finalUrl, {
            method,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            body: method === "POST" ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};