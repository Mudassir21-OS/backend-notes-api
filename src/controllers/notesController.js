const pool = require('../db/pool');

function notFoundResponse(res) {
  return res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: 'Note was not found.',
      field: 'id'
    }
  });
}

async function getAllNotes(req, res, next) {
  try {
    const result = await pool.query(
      'SELECT * FROM notes ORDER BY created_at DESC'
    );

    return res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    return next(error);
  }
}

async function getNoteById(req, res, next) {
  try {
    const result = await pool.query(
      'SELECT * FROM notes WHERE id = $1',
      [req.noteId]
    );

    if (result.rows.length === 0) {
      return notFoundResponse(res);
    }

    return res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    return next(error);
  }
}

async function createNote(req, res, next) {
  try {
    const result = await pool.query(
      'INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *',
      [req.validatedNote.title, req.validatedNote.content]
    );

    return res.status(201).json({
      success: true,
      message: 'Note created successfully.',
      data: result.rows[0]
    });
  } catch (error) {
    return next(error);
  }
}

async function updateNote(req, res, next) {
  try {
    const result = await pool.query(
      'UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *',
      [req.validatedNote.title, req.validatedNote.content, req.noteId]
    );

    if (result.rows.length === 0) {
      return notFoundResponse(res);
    }

    return res.status(200).json({
      success: true,
      message: 'Note updated successfully.',
      data: result.rows[0]
    });
  } catch (error) {
    return next(error);
  }
}

async function deleteNote(req, res, next) {
  try {
    const result = await pool.query(
      'DELETE FROM notes WHERE id = $1 RETURNING *',
      [req.noteId]
    );

    if (result.rows.length === 0) {
      return notFoundResponse(res);
    }

    return res.status(200).json({
      success: true,
      message: 'Note deleted successfully.'
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote
};