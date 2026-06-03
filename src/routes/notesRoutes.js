const express = require("express");
const {
  readNotes,
  readSingleNote,
  createNewNote,
  updateExistingNote,
  deleteExistingNote
} = require("../controllers/notesController");

const router = express.Router();

router.get("/", readNotes);
router.get("/:id", readSingleNote);
router.post("/", createNewNote);
router.put("/:id", updateExistingNote);
router.delete("/:id", deleteExistingNote);

module.exports = router;
