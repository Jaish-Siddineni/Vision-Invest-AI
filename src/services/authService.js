import API_BASE_URL from "./api";

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        return await response.json();
    } catch (error) {
        return { success: false, message: error.message };
    }
};
