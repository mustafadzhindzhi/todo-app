import { get, post, put, del } from "../utils/apiUtils";

const handleRequest = async (promise, errorMessage) => {
  try {
    return await promise;
  } catch (error) {
    console.error(errorMessage, error);
    throw error;
  }
};

const getNotes = () => handleRequest(get('/'), 'Error fetching notes:');
const saveNote = (noteData) => handleRequest(post('/save', noteData), 'Error saving note:');
const updateNote = (noteData) => handleRequest(put('/update', noteData), 'Error updating note:');
const deleteNote = (noteId) => handleRequest(del('/delete', { _id: noteId }), 'Error deleting note:');

export { getNotes, saveNote, updateNote, deleteNote };