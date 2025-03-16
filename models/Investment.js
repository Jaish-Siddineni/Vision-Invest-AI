const db = require('../config/db');

class Investment {
    static async createInvestment(userId, stockSymbol, amount, riskLevel) {
        try {
            await db.execute(
                'INSERT INTO investments (user_id, stock_symbol, amount, risk_level) VALUES (?, ?, ?, ?)',
                [userId, stockSymbol, amount, riskLevel]
            );
            return { message: "Investment added successfully!" };
        } catch (error) {
            throw new Error("Error adding investment");
        }
    }

    static async getInvestmentsByUser(userId) {
        try {
            const [investments] = await db.execute(
                'SELECT * FROM investments WHERE user_id = ?', [userId]
            );
            return investments;
        } catch (error) {
            throw new Error("Error fetching investments");
        }
    }
}

module.exports = Investment;
