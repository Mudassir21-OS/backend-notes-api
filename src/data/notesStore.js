// Temporary in-memory data store for the Notes CRUD API.
// This keeps the project simple and focuses on backend routing, validation, and request handling.
let notes = [
  {
    id: 1,
    title: "First note",
    content: "This is a sample note created when the server starts."
  }
];

let nextId = 2;

function getAllNotes() {
  return notes;
}

function getNoteById(id) {
  return notes.find((note) => note.id === id);
}

function createNote(title, content) {
  const newNote = {
    id: nextId++,
    title,
    content
  };
  notes.push(newNote);
  return newNote;
}

function updateNote(id, title, content) {
  const note = getNoteById(id);
  if (!note) {
    return null;
  }
  note.title = title;
  note.content = content;
  return note;
}

function deleteNote(id) {
  const originalLength = notes.length;
  notes = notes.filter((note) => note.id !== id);
  return notes.length !== originalLength;
}

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote
};
