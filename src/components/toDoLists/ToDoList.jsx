import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import "../../style/toDoLists.css";
import { CardToDoList, CardItem } from "../styledComponents/ToDoListsStyle";
import { deleteTodoList, deleteTask, createTask } from "../../apiCaller";
import { useUser } from "../../context/userContext"
const ToDoList = ({ toDoList, setToDoLists }) => {
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [user] = useUser()

  return (
    <CardToDoList className="card-todo-list">
      <div onClick={(e) => e.stopPropagation()} className="todo-detail">
        <FontAwesomeIcon
          icon={faTimesCircle}
          size="lg"
          onClick={() => {
            setToDoLists((oldLists) => {
              deleteTodoList(toDoList.id);
              const index = oldLists.findIndex((ol) => ol.id === toDoList?.id);
              if (index !== -1) {
                oldLists.splice(index, 1);
              }

              return [...oldLists];
            });
          }}
        />
        <FontAwesomeIcon
          icon={faPlusCircle}
          size="lg"
          onClick={() => setShowForm((oldValue) => !oldValue)}
        />

        {showForm && (
          <div>
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
              className="mt-2"
            />
            <Button
              onClick={() => {
                setToDoLists((oldLists) => {
                  createTask(title, toDoList.id, date, user);
                  const index = oldLists.findIndex(
                    (ol) => ol.id === toDoList?.id
                  );
                  let id = 0;

                  if (oldLists[index]?.listTasks?.length > 0) {
                    id =
                      Math.max.apply(
                        Math,
                        oldLists[index].listTasks?.map(function (o) {
                          return o.id;
                        })
                      ) + 1;
                  }
                  oldLists[index]?.listTasks?.push({
                    id: id,
                    name: title,
                    date: date != "" ? date : null,
                  });

                  return [...oldLists];
                });
                setTitle("");
                setDate("");
                setShowForm(false);
              }}
              style={{ flex: 0.1 }}
            >
              Ajouter
            </Button>
          </div>
        )}
        <div>
          {toDoList?.listTasks?.map((t) => (
            <CardItem key={t.id}>
              <p style={{ marginBottom: 0 }}>
                {t.date} : {t.name}
              </p>
              <FontAwesomeIcon
                icon={faTimesCircle}
                size="lg"
                onClick={() => {
                  deleteTask(t.id);
                  setToDoLists((oldLists) => {
                    const listIndex = oldLists.findIndex(
                      (ol) => ol.id === toDoList?.id
                    );

                    const taskIndex = oldLists[listIndex].listTasks?.findIndex(
                      (task) => task.id === t.id
                    );

                    if (taskIndex !== -1) {
                      oldLists[listIndex].listTasks?.splice(taskIndex, 1);
                    }
                    return [...oldLists];
                  });
                }}
              />
            </CardItem>
          ))}
        </div>
      </div>
    </CardToDoList>
  );
};

export default ToDoList;
