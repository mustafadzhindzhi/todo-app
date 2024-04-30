const {Router} = require('express');
const {getNotes, saveNotes, updateNotes, deleteNotes } = require('../controllers/NoteController');
const router = Router();

router.get('/', getNotes)
router.post('/save', saveNotes)
router.put('/update', updateNotes);
router.delete('/delete', deleteNotes);

module.exports = router;