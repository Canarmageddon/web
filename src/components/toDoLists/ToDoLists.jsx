import React, { useState, useEffect } from "react";
import ToDoList from "./ToDoList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useTaskList } from "../../context/TravelContext";
import FormControl from "react-bootstrap/FormControl";
import "../../style/toDoLists.css";
import TaskListUtile from "../../factory/lists/TaskListUtile";
import ListPicker from "./ListPicker";

const ToDoLists = ({ display }) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [taskList, setTaskList] = useTaskList();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      setTaskList([...taskList, new TaskListUtile("", title, [])]);
      setTitle("");
      setShowForm(false);
    }
  };

  return (
    <div
      style={{
        display: display ? "block" : "none",
        position: "relative",
        flex: 0.4,
        textAlign: "center",
      }}
    >
      <ListPicker
        listTitle={
          taskList[currentIndex]
            ? taskList[currentIndex].name
            : "Liste introuvable"
        }
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        listLength={taskList.length}
      />
      <FontAwesomeIcon
        icon={faPlusCircle}
        size="2x"
        onClick={() => setShowForm((oldValue) => !oldValue)}
        className="add-list-icon"
        style={{ position: "absolute", top: 5, right: 5 }}
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

      {taskList.length > 0 && (
        <ToDoList
          toDoList={taskList[currentIndex]}
          setToDoLists={setTaskList}
        />
      )}
    </div>
  );
};

export default ToDoLists;
