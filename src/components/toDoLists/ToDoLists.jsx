import React, { useState, useEffect } from "react";
import ToDoList from "./ToDoList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useTaskList } from "../../context/TravelContext";
import FormControl from "react-bootstrap/FormControl";
import "../../style/toDoLists.css";
import TaskListUtile from "../../factory/lists/TaskListUtile";
import ListPicker from "./ListPicker";
import { createTodoList } from "../../apiCaller";
import { useParams } from "react-router-dom";

const ToDoLists = ({ display }) => {
  const { id } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [taskList, setTaskList] = useTaskList();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      setTaskList([...taskList, new TaskListUtile("", title, [])]);
      setTitle("");
      setShowForm(false);
      setCurrentIndex(taskList.length);
      createTodoList(title, id);
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <FontAwesomeIcon
          icon={faPlusCircle}
          size="2x"
          onClick={() => setShowForm((oldValue) => !oldValue)}
          className="add-list-icon"
          style={{ marginRight: 15 }}
        />
        {showForm && (
          <FormControl
            placeholder="Nom"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e)}
            className="add-list-input"
            type="text"
          />
        )}
      </div>

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
