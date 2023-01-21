const express = require('express');

const router = express.Router();

const {createNote, getUserNotes, deleteUserNotes} = require('../controllers/Note.controller')

const {validateGetUserNotes, uploadNotePhotos, validateNote, validateDeleteUserNotes} = require('../middlewares/note.middlewares')

router.post('/createNote', uploadNotePhotos, validateNote, createNote);

router.get('/getUserNotes', validateGetUserNotes, getUserNotes);

router.delete('/deleteUserNotes', validateDeleteUserNotes, deleteUserNotes);

module.exports = router;