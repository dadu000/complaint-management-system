
// Remove the Render URL logic and hardcode localhost
const API_BASE = "http://localhost:8080";

export const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem("token");

    const response = await fetch(API_BASE + url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {}),
            ...(options.headers || {}),
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Request failed");
    }

    // Still keep this logic to handle both Text and JSON safely
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return response.json();
    } else {
        return response.text();
    }
};