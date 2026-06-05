const express = require('express');
const notesController = require('../controllers/notesController');
const {
  validateCreateNote,
  validateUpdateNote,
  validateNoteId
} = require('../validation/notes.validation');

const router = express.Router();

router.get('/', notesController.getAllNotes);
router.post('/', validateCreateNote, notesController.createNote);
router.get('/:id', validateNoteId, notesController.getNoteById);
router.put('/:id', validateNoteId, validateUpdateNote, notesController.updateNote);
router.delete('/:id', validateNoteId, notesController.deleteNote);

module.exports = router;
