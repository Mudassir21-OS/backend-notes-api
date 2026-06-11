const pool = require("./src/db/pool");

async function setupDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Notes table created successfully.");
  } catch (error) {
    console.error("Database setup failed:", error);
  } finally {
    await pool.end();
  }
}

setupDatabase();