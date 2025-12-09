require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});
// Create users table on startup if it doesn't exist
const createUsersTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            googleId VARCHAR(255) UNIQUE NOT NULL,
            displayName VARCHAR(255),
            firstName VARCHAR(255),
            lastName VARCHAR(255),
            email VARCHAR(255) UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log("Users table created or already exists");
    } catch (error) {
        console.error("Error creating users table:", error);
    }
};

// Run table creation on module load
createUsersTable();
module.exports = pool;
