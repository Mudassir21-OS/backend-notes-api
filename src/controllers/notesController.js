const { loadNotes, saveNotes, getNextId } = require('../storage/notes.storage');

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
    const notes = await loadNotes();
    return res.status(200).json({
      success: true,
      count: notes.length,
      data: notes
    });
  } catch (error) {
    return next(error);
  }
}

async function getNoteById(req, res, next) {
  try {
    const notes = await loadNotes();
    const note = notes.find((item) => item.id === req.noteId);

    if (!note) {
      return notFoundResponse(res);
    }

    return res.status(200).json({
      success: true,
      data: note
    });
  } catch (error) {
    return next(error);
  }
}

async function createNote(req, res, next) {
  try {
    const notes = await loadNotes();
    const newNote = {
      id: getNextId(notes),
      title: req.validatedNote.title,
      content: req.validatedNote.content
    };

    notes.push(newNote);
    await saveNotes(notes);

    return res.status(201).json({
      success: true,
      message: 'Note created successfully.',
      data: newNote
    });
  } catch (error) {
    return next(error);
  }
}

async function updateNote(req, res, next) {
  try {
    const notes = await loadNotes();
    const noteIndex = notes.findIndex((item) => item.id === req.noteId);

    if (noteIndex === -1) {
      return notFoundResponse(res);
    }

    notes[noteIndex] = {
      id: req.noteId,
      title: req.validatedNote.title,
      content: req.validatedNote.content
    };

    await saveNotes(notes);

    return res.status(200).json({
      success: true,
      message: 'Note updated successfully.',
      data: notes[noteIndex]
    });
  } catch (error) {
    return next(error);
  }
}

async function deleteNote(req, res, next) {
  try {
    const notes = await loadNotes();
    const noteExists = notes.some((item) => item.id === req.noteId);

    if (!noteExists) {
      return notFoundResponse(res);
    }

    const filteredNotes = notes.filter((item) => item.id !== req.noteId);
    await saveNotes(filteredNotes);

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
