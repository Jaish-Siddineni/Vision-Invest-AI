const db = require('../config/db');
const bcrypt = require('bcrypt');

class User {
    static async createUser(name, email, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.execute(
                'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', 
                [name, email, hashedPassword]
            );
            return { message: "User created successfully!" };
        } catch (error) {
            throw new Error("Error creating user");
        }
    }

    static async findByEmail(email) {
        try {
            const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
            return users.length > 0 ? users[0] : null;
        } catch (error) {
            throw new Error("Database error while fetching user");
        }
    }

    static async verifyPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}

module.exports = User;
