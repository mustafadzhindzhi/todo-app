import React from "react";
import { useDrag } from "react-dnd";
import { FaEdit, FaTrash } from "react-icons/fa";
import style from "../noteList/NoteList.module.scss";

function DraggableNote({
  note,
  isEditing,
  onEdit,
  onDelete,
  onEditChange,
  onSave,
  onCancel,
}) {
  const [{ isDragging }, drag] = useDrag({
    type: "NOTE",
    item: { _id: note._id, text: note.text },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <li
      ref={drag}
      className={`${style.listItem} ${isDragging ? style.dragging : ""}`}
      draggable
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={note.text}
            onChange={(e) => onEditChange(note._id, e.target.value)}
            className={style.editInput}
          />
          <div className={style.buttonContainer}>
            <button className={style.updateButton} onClick={() => onSave()}>
              Update
            </button>
            <button className={style.cancelButton} onClick={() => onCancel()}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <span>{note.text}</span>
          <div className={style.editButtonContainer}>
            <FaEdit
              className={style.editIcon}
              onClick={() => onEdit(note._id, note.text)}
            />
            <FaTrash
              className={style.deleteIcon}
              onClick={() => onDelete(note._id)}
            />
          </div>
        </>
      )}
    </li>
  );
}

export default DraggableNote;