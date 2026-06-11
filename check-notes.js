const pool = require("./src/db/pool");

async function checkNotes() {
  try {
    const result = await pool.query(
      "SELECT * FROM notes ORDER BY created_at DESC"
    );

    console.table(result.rows);
  } catch (error) {
    console.error("Failed to check notes:", error);
  } finally {
    await pool.end();
  }
}

checkNotes();