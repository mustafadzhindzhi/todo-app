const NoteModel = require('../models/NoteModel');

//get all
module.exports.getNotes = async (req, res) => {
    try {
        const notes = await NoteModel.find();
        res.json(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
};

//create
module.exports.saveNotes = async (req, res) => {
    try {
        const { text } = req.body;
        const newNote = await NoteModel.create({ text });
        res.status(201).json(newNote);
    } catch (error) {
        console.error('Error adding note:', error);
        res.status(500).json({ error: 'Failed to add note' });
    }
};

//update
module.exports.updateNotes = async (req, res) => {
    try {
        const { _id, text } = req.body;
        await NoteModel.findByIdAndUpdate(_id, { text });
        res.status(200).json({ message: 'Note updated successfully' });
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ error: 'Failed to update note' });
    }
};

//delete
module.exports.deleteNotes = async (req, res) => {
    try {
        const { _id } = req.body;
        await NoteModel.findByIdAndDelete(_id);
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ error: 'Failed to delete note' });
    }
};