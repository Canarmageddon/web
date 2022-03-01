import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import FormControl from "react-bootstrap/FormControl";
import Stack from "react-bootstrap/Stack";

const ToDoList = ({ toDoList, setToDoLists }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  return (
    <ListGroup.Item onClick={() => setShowDetails((oldValue) => !oldValue)}>
      <Stack direction="horizontal" gap={2} className="mb-2">
        <h5>{toDoList.title}</h5>
        <FontAwesomeIcon
          icon={faTimesCircle}
          size="2x"
          onClick={() => {
            setToDoLists((oldLists) => {
              const index = oldLists.findIndex((ol) => ol.id === toDoList.id);
              oldLists.splice(index, 1);
              return [...oldLists];
            });
          }}
        />
      </Stack>

      {showDetails && (
        <div onClick={(e) => e.stopPropagation()}>
          <FontAwesomeIcon
            icon={faPlusCircle}
            size="2x"
            onClick={() => setShowForm((oldValue) => !oldValue)}
          />

          {showForm && (
            <Stack direction="horizontal" gap={3} className="d-flex mb-2">
              <FormControl
                placeholder="Nom"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ flex: 0.1 }}
                type="text"
              />
              <FormControl
                placeholder="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ flex: 0.1 }}
                type="date"
              />
              <Button
                onClick={() => {
                  setToDoLists((oldLists) => {
                    const index = oldLists.findIndex(
                      (ol) => ol.id === toDoList.id
                    );
                    oldLists[index].tasks.push({
                      id: 15,
                      title: title,
                      date: date != "" ? date : null,
                    });

                    return [...oldLists];
                  });
                  setTitle("");
                  setDate("");
                }}
                style={{ flex: 0.1 }}
              >
                Ajouter
              </Button>
            </Stack>
          )}
          <ListGroup>
            {toDoList.tasks.map((t) => (
              <ListGroup.Item key={t.id}>
                <Stack direction="horizontal" gap={2}>
                  <p>
                    {t.date} : {t.title}
                  </p>
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    size="2x"
                    onClick={() => {
                      setToDoLists((oldLists) => {
                        const index = oldLists.findIndex(
                          (ol) => ol.id === toDoList.id
                        );
                        oldLists.splice(index, 1);
                        return [...oldLists];
                      });
                    }}
                  />
                </Stack>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}
    </ListGroup.Item>
  );
};

export default ToDoList;
