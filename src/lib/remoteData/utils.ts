export const callDataSource = async (options) => {
    const { url, method = "GET", headers = {}, params, body, mapper } = options;

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

        // console.log("00000000000000000000000:", mapper ? mapper({ responseData }) : responseData);
        // apply mapper if provided
        return responseData;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};