import React, { useState, useEffect } from "react";
import ToDoList from "./ToDoList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useTaskList } from "../../context/TravelContext";
import FormControl from "react-bootstrap/FormControl";
import "./toDoLists.css";
import TaskListUtile from "../../factory/lists/TaskListUtile";
import ListPicker from "./ListPicker";
import { createTodoList, fetchTodoLists } from "../../apiCaller";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import Task from "../../factory/lists/Task";
import { useToken } from "../../context/userContext";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
const ToDoLists = ({ display }) => {
  const { t } = useTranslation("translation");
  const { id } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [taskList, setTaskList] = useTaskList();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [token] = useToken();
  const queryClient = useQueryClient();
  const {
    isLoading: isLoadingToDoLists,
    isError: isErrorToDoLists,
    error: errorToDoLists,
    data: dataToDoLists,
  } = useQuery(["toDoLists", id], () => fetchTodoLists({ token, id }), {
    onSuccess: (data) => {
      let lstTodoList = [];
      data?.map((taskList) => {
        let tasks = [];
        taskList?.tasks?.map((item) => {
          tasks.push(
            new Task(
              item.id,
              item.creator,
              item.name,
              item.description,
              item.date
            )
          );
        });
        lstTodoList.push(
          new TaskListUtile(taskList?.id, taskList?.name, tasks)
        );
      });
    },
  });

  const mutationAddToDoList = useMutation(createTodoList, {
    onMutate: (data) => {
      queryClient.setQueryData(["toDoLists", id], (old) => [
        ...old,
        { id: id, name: title },
      ]);
    },
    onSuccess: () => {
      toast.success(t("todolist_created"));
    },
    onError: () => {
      toast.success(t("todolist_not_created"));
    },
    onSettled: () => {
      queryClient.invalidateQueries(["toDoLists", id]);
      setCurrentIndex(dataToDoLists.length);
    },
  });

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      if (title !== "") {
        setTaskList([...taskList, new TaskListUtile("", title, [])]);
        setTitle("");
        setShowForm(false);
        mutationAddToDoList.mutate({ token, title, id });
      }
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
      {!isLoadingToDoLists && !isErrorToDoLists && (
        <ListPicker
          listTitle={
            dataToDoLists[currentIndex]
              ? dataToDoLists[currentIndex].name
              : "Liste introuvable"
          }
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          listLength={dataToDoLists.length}
        />
      )}
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
            placeholder={t("todolist_name")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e)}
            className="add-list-input"
            type="text"
          />
        )}
      </div>

      {!isLoadingToDoLists && !isErrorToDoLists && dataToDoLists.length > 0 && (
        <ToDoList
          toDoList={dataToDoLists[currentIndex]}
          setCurrentIndex={setCurrentIndex}
          idTrip={id}
        />
      )}
    </div>
  );
};

export default ToDoLists;
