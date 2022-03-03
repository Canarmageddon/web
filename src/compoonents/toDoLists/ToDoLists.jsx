import React, { useState, useEffect } from "react";
import ToDoList from "./ToDoList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import FormControl from "react-bootstrap/FormControl";
import Stack from "react-bootstrap/Stack";

const ToDoLists = () => {
  const [toDoLists, setToDoLists] = useState(
    JSON.parse(localStorage.getItem("toDoLists"))
  );
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    localStorage.setItem("toDoLists", JSON.stringify(toDoLists));
  }, [toDoLists]);

  return (
    <>
      <Stack direction="horizontal" gap={3} className="d-flex mb-2">
        <FontAwesomeIcon
          icon={faPlusCircle}
          size="2x"
          onClick={() => setShowForm((oldValue) => !oldValue)}
        />
        {showForm && (
          <>
            <FormControl
              placeholder="Nom"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ flex: 0.1 }}
              type="text"
            />
            <Button
              onClick={() => {
                setToDoLists((oldList) => [
                  ...oldList,
                  { id: 10, title: title, tasks: [] },
                ]);
                setTitle("");
              }}
              style={{ flex: 0.1 }}
            >
              Ajouter
            </Button>
          </>
        )}
      </Stack>

      <ListGroup>
        {toDoLists.map((l) => (
          <ToDoList toDoList={l} setToDoLists={setToDoLists} key={l.id} />
        ))}
      </ListGroup>
    </>
  );
};

export default ToDoLists;
