import React, { useState, useEffect } from 'react';
import AddNoteForm from '../components/addNoteForm/AddNoteForm.jsx';
import NoteList from '../components/noteList/NoteList.jsx'; 
import NoteColumns from '../components/noteColumns/NoteColumns.jsx';
import style from './SCSS/Note.module.scss';
import { getNotes } from '../services/noteService';

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const notesData = await getNotes();
      setNotes(notesData);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleNoteAdded = (newNote) => {
    setNotes([...notes, newNote]);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`${style.note} ${isDarkMode ? style.darkMode : style.lightMode}`}>
      <label className={style.switch}>
        <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
        <span className={`${style.slider} ${style.round}`}></span>
      </label>
      <AddNoteForm onNoteAdded={handleNoteAdded} />
      <NoteList notes={notes} setNotes={setNotes} />
      <NoteColumns notes={notes} setNotes={setNotes} />
    </div>
  );
};

export default Note;