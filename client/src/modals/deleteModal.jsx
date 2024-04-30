import React from "react";
import style from "./deleteModal.module.scss";

const DeleteModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className={style["overlay"]}>
      <div className={style["modal"]}>
        <p>Are you sure you want to delete this note?</p>
        <div className={style["buttonContainer"]}>
        <button onClick={onConfirm}>Confirm</button>{" "}
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;