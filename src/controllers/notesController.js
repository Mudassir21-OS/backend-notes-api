const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote
} = require("../data/notesStore");

function isValidNoteInput(title, content) {
  return (
    typeof title === "string" &&
    title.trim().length > 0 &&
    typeof content === "string" &&
    content.trim().length > 0
  );
}

function parseNoteId(idValue) {
  const id = Number(idValue);
  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }
  return id;
}

function readNotes(req, res) {
  return res.status(200).json({
    success: true,
    count: getAllNotes().length,
    data: getAllNotes()
  });
}

function readSingleNote(req, res) {
  const id = parseNoteId(req.params.id);
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Invalid note ID. The ID must be a positive number."
    });
  }

  const note = getNoteById(id);
  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found."
    });
  }

  return res.status(200).json({
    success: true,
    data: note
  });
}

function createNewNote(req, res) {
  const { title, content } = req.body;

  if (!isValidNoteInput(title, content)) {
    return res.status(400).json({
      success: false,
      message: "Title and content are required and cannot be empty."
    });
  }

  const note = createNote(title.trim(), content.trim());
  return res.status(201).json({
    success: true,
    message: "Note created successfully.",
    data: note
  });
}

function updateExistingNote(req, res) {
  const id = parseNoteId(req.params.id);
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Invalid note ID. The ID must be a positive number."
    });
  }

  const { title, content } = req.body;
  if (!isValidNoteInput(title, content)) {
    return res.status(400).json({
      success: false,
      message: "Title and content are required and cannot be empty."
    });
  }

  const updatedNote = updateNote(id, title.trim(), content.trim());
  if (!updatedNote) {
    return res.status(404).json({
      success: false,
      message: "Note not found."
    });
  }

  return res.status(200).json({
    success: true,
    message: "Note updated successfully.",
    data: updatedNote
  });
}

function deleteExistingNote(req, res) {
  const id = parseNoteId(req.params.id);
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Invalid note ID. The ID must be a positive number."
    });
  }

  const deleted = deleteNote(id);
  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: "Note not found."
    });
  }

  return res.status(200).json({
    success: true,
    message: "Note deleted successfully."
  });
}

module.exports = {
  readNotes,
  readSingleNote,
  createNewNote,
  updateExistingNote,
  deleteExistingNote
};
