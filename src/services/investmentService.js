import API_BASE_URL from "./api";

export const getInvestmentRecommendations = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/investments/recommend`);
        return await response.json();
    } catch (error) {
        return { success: false, message: error.message };
    }
};
