const app = require('./app');
const db = require('./config/db');

const PORT = process.env.PORT || 5000;

// Check database connection before starting server
db.execute('SELECT 1')
    .then(() => {
        app.listen(PORT, () => {
            console.log(`✅ Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("❌ Database connection failed!", err);
        process.exit(1);
    });
