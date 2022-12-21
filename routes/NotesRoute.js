const express = require("express");
const router = express.Router();
const validateNote = require("../middlewares/NoteValidator");
const fetchUser = require("../middlewares/FetchUser");
const notesController = require("../controllers/NotesController");

router.get("/fetchallnotes", fetchUser, notesController.getAllNotes);
router.post("/savenote", fetchUser, validateNote, notesController.saveNote);
router.put("/updatenote/:noteID", fetchUser, validateNote, notesController.updateNote);
router.delete("/deletenote/:noteID", fetchUser, notesController.deleteNote);

module.exports = router;