const db = require('../config/db');

class Transaction {
    static async recordTransaction(userId, investmentId, transactionType, amount) {
        try {
            await db.execute(
                'INSERT INTO transactions (user_id, investment_id, transaction_type, amount) VALUES (?, ?, ?, ?)',
                [userId, investmentId, transactionType, amount]
            );
            return { message: "Transaction recorded successfully!" };
        } catch (error) {
            throw new Error("Error processing transaction");
        }
    }

    static async getTransactionsByUser(userId) {
        try {
            const [transactions] = await db.execute(
                'SELECT * FROM transactions WHERE user_id = ?', [userId]
            );
            return transactions;
        } catch (error) {
            throw new Error("Error fetching transactions");
        }
    }
}

module.exports = Transaction;
