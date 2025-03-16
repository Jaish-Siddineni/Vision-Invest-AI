import API_BASE_URL from "./api";

export const fetchStocks = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/stocks`);
        return await response.json();
    } catch (error) {
        return { success: false, message: error.message };
    }
};
