import React, { useState } from "react";
import { useDrop } from "react-dnd";
import NoteList from "../noteList/NoteList.jsx";
import style from "./NoteColumns.module.scss";

const NoteColumns = () => {
  const [columns, setColumns] = useState(() => {
    const savedColumns = localStorage.getItem('columns');
    return savedColumns ? JSON.parse(savedColumns) : { todo: [], inProgress: [], done: [] };
  });
  
  const handleDrop = (columnId, item) => {
    const { _id, text } = item;

    setColumns(prevColumns => {
      const newColumns = {};
      Object.keys(prevColumns).forEach(key => {
        if (key === columnId) {
          if (!prevColumns[key].some(note => note._id === _id)) {
            newColumns[key] = [...prevColumns[key], { _id, text }];
          } else {
            newColumns[key] = prevColumns[key];
          }
        } else {
          newColumns[key] = prevColumns[key].filter(note => note._id !== _id);
        }
      });
      localStorage.setItem('columns', JSON.stringify(newColumns)); // Store updated state in local storage
      return newColumns;
    });
  };


  const [, dropTodo] = useDrop({
    accept: "NOTE",
    drop(item) {
      handleDrop("todo", item);
    }
  });

  const [, dropInProgress] = useDrop({
    accept: "NOTE",
    drop(item) {
      handleDrop("inProgress", item);
    }
  });

  const [, dropDone] = useDrop({
    accept: "NOTE",
    drop(item) {
      handleDrop("done", item);
    }
  });

  return (
    <div className={style.columns}>
      <div className={style.column} ref={dropTodo}>
        <h2>Todo</h2>
        <NoteList
          columnId="todo"
          notes={columns.todo}
          setColumns={setColumns}
        />
      </div>
      <div className={style.column} ref={dropInProgress}>
        <h2>In Progress</h2>
        <NoteList
          columnId="inProgress"
          notes={columns.inProgress}
          setColumns={setColumns}
        />
      </div>
      <div className={style.column} ref={dropDone}>
        <h2>Done</h2>
        <NoteList
          columnId="done"
          notes={columns.done}
          setColumns={setColumns}
        />
      </div>
    </div>
  );
};

export default NoteColumns;