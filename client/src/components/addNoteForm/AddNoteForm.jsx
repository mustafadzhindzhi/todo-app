import React, { useState } from "react";
import { saveNote } from "../../services/noteService";
import style from "./AddNoteForm.module.scss"; 

const AddNoteForm = ({ onNoteAdded }) => {
  const [newNoteText, setNewNoteText] = useState("");
  const [error, setError] = useState(null);

  const handleNoteInputChange = (event) => {
    setNewNoteText(event.target.value);
    setError(null); 
  };

  const handleNoteSubmit = async (event) => {
    event.preventDefault();
    if (!newNoteText.trim()) {
      setError("Note cannot be empty");
      return;
    }
    try {
      const newNote = await saveNote({ text: newNoteText });
      onNoteAdded(newNote);
      setNewNoteText("");
      setError(null);
    } catch (error) {
      console.error("Error saving note:", error);
      setError("Failed to save note. Please try again later.");
    }
  };

  return (
    <form className={style["form"]} onSubmit={handleNoteSubmit}>
  <div className={style["input-container"]}> 
    <input
      type="text"
      value={newNoteText}
      onChange={handleNoteInputChange}
      placeholder="Enter your note"
      className={style["input"]}
    />
    <button type="submit" className={style["button"]}>
      Add Note
    </button>
  </div>
  {error && <p className={style["error-message"]}>{error}</p>}
</form>
  );
};

export default AddNoteForm;