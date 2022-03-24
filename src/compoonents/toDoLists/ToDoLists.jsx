import React, { useState, useEffect } from "react";
import ToDoList from "./ToDoList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import FormControl from "react-bootstrap/FormControl";

import "../../style/toDoLists.css";

const ToDoLists = ({ display }) => {
  const [toDoLists, setToDoLists] = useState(
    JSON.parse(localStorage.getItem("toDoLists")) !== null
      ? JSON.parse(localStorage.getItem("toDoLists"))
      : []
  );
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    localStorage.setItem("toDoLists", JSON.stringify(toDoLists));
  }, [toDoLists]);

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      setToDoLists((oldList) => {
        let id = 0;

        if (oldList.length > 0) {
          id =
            Math.max.apply(
              Math,
              oldList.map(function (o) {
                return o.id;
              })
            ) + 1;
        }
        return [...oldList, { id: id, title: title, tasks: [] }];
      });
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
        style={{ marginTop: -10, marginBottom: 5 }}
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
        {toDoLists.map((l) => (
          <ToDoList toDoList={l} setToDoLists={setToDoLists} key={l.id} />
        ))}
      </div>
    </div>
  );
};

export default ToDoLists;
