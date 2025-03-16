const db = require('../config/db');

exports.createTransaction = async (req, res) => {
    const { userId, investmentId, transactionType, amount } = req.body;

    try {
        await db.execute(
            'INSERT INTO transactions (user_id, investment_id, transaction_type, amount) VALUES (?, ?, ?, ?)',
            [userId, investmentId, transactionType, amount]
        );

        res.json({ message: 'Transaction recorded successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Database error!' });
    }
};
