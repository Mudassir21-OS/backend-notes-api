const express = require('express');
const notesRoutes = require('./routes/notesRoutes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend Notes API with validation and persistence is running successfully.'
  });
});

// Main API route plus a shorter alias to match the assignment wording.
app.use('/api/notes', notesRoutes);
app.use('/notes', notesRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
