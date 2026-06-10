const express = require('express');
const notesRoutes = require('./routes/notesRoutes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend Notes API with validation and persistence is running successfully.'
  });
});

app.get('/api/db-health', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT NOW()');

    res.status(200).json({
      success: true,
      message: 'Database connection is healthy.',
      databaseTime: result.rows[0].now
    });
  } catch (error) {
    next(error);
  }
});

// Main API route plus a shorter alias to match the assignment wording.
app.use('/api/notes', notesRoutes);
app.use('/notes', notesRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
