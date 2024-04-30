import React, { useState } from 'react';
import style from './NoteList.module.scss';
import DeleteModal from '../../modals/deleteModal.jsx';
import DraggableNote from '../draggableNote/DraggableNote.jsx';
import { updateNote, deleteNote } from '../../services/noteService';

const NoteList = ({ notes, setNotes }) => {
  const [editNote, setEditNote] = useState({ id: null, text: "" });
  const [showModal, setShowModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const handleNoteDelete = (noteId) => {
    setShowModal(true);
    setNoteToDelete(noteId);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteNote(noteToDelete);
      setNotes(prev => prev.filter(note => note._id !== noteToDelete));
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const handleEditNote = (noteId, noteText) => {
    setEditNote({ id: noteId, text: noteText });
  };

  const handleEditChange = (noteId, newText) => {
    const updatedNotes = notes.map(note => 
      note._id === noteId ? { ...note, text: newText } : note
    );
    setNotes(updatedNotes);
  };

  const handleNoteUpdate = async () => {
    try {
      await updateNote(editNote);
      setEditNote({ id: null, text: "" });
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditNote({ id: null, text: "" });
  };

  return (
    <>
      <ul className={style.list}>
        {notes.length === 0 && <p className={style.noNotes}>No notes available.</p>}
        {notes.map((note) => (
          <DraggableNote
            key={note._id}
            note={note}
            isEditing={editNote.id === note._id}
            onEdit={handleEditNote}
            onDelete={handleNoteDelete}
            onEditChange={handleEditChange}
            onSave={handleNoteUpdate}
            onCancel={handleCancelEdit}
          />
        ))}
      </ul>
      <DeleteModal
        isOpen={showModal}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default NoteList;