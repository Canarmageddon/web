import React, { useState, useEffect } from "react";
import ToDoList from "./ToDoList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useTaskList } from "../../context/TravelContext";
import FormControl from "react-bootstrap/FormControl";
import "../../style/toDoLists.css";
import TaskListUtile from "../../factory/lists/TaskListUtile";
const ToDoLists = ({ display }) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [TaskList, setTaskList] = useTaskList();
  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      setTaskList([...TaskList, new TaskListUtile("", title, [])]);
      setTitle("");
      setShowForm(false);
    }
  };

  return (
    <div
      style={{
        display: display ? "block" : "none",
        flex: 0.4,
        textAlign: "center",
      }}
    >
      <FontAwesomeIcon
        icon={faPlusCircle}
        size="2x"
        onClick={() => setShowForm((oldValue) => !oldValue)}
        className="add-list-icon"
        style={{ marginTop: 5, marginBottom: 5 }}
      />
      {showForm && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FormControl
            placeholder="Nom"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e)}
            className="add-list-input"
            type="text"
          />
        </div>
      )}

      <div className="d-flex justify-content-around flex-wrap">
        {TaskList.map((l, key) => (
          <ToDoList toDoList={l} setToDoLists={setTaskList} key={key} />
        ))}
      </div>
    </div>
  );
};

export default ToDoLists;
