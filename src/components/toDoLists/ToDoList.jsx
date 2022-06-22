import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import "../../style/toDoLists.css";
import { CardToDoList, CardItem } from "../styledComponents/ToDoListsStyle";
import { deleteTodoList, deleteTask, createTask } from "../../apiCaller";
import { useToken, useUser } from "../../context/userContext";
import { useMutation, useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
const ToDoList = ({ toDoList, setCurrentIndex, idTrip }) => {
  const { t } = useTranslation("translation", { keyPrefix: "task" });
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [token] = useToken();
  const [user] = useUser();
  const mutationDeleteTodoList = useMutation(deleteTodoList, {
    onMutate: (data) => {
      /*       const oldData = queryClient.getQueryData(["toDoLists", idTrip])
            queryClient.setQueryData(["toDoLists", idTrip], old => old.filter(item => item.id != data))
            return oldData */
    },
    onSuccess: () => {
      toast.error(t("deleted_list"));
    },
    onError: () => {
      toast.warning(t("not_deleted_list"));
    },
    onSettled: () => {
      setCurrentIndex((old) => old - 1);
      queryClient.invalidateQueries(["toDoLists", idTrip]);
    },
  });
  const mutationAddTask = useMutation(createTask, {
    onMutate: (data) => {
      /*       const oldData = queryClient.getQueryData(["toDoLists", idTrip])
            queryClient.setQueryData(["toDoLists", idTrip], [...old, { title: data.title, data: data.date }])
            return oldData */
    },
    onSuccess: () => {
      toast.success(t("created"));
    },
    onError: () => {
      toast.warning(t("not_created"));
    },
    onSettled: () => {
      queryClient.invalidateQueries(["toDoLists", idTrip]);
    },
  });
  const mutationDeleteTask = useMutation(deleteTask, {
    onMutate: (data) => {
      const oldData = queryClient.getQueryData(["toDoLists", idTrip]);
      // queryClient.setQueryData(["toDoLists", idTrip], [...old, { title: data.title, data: data.date }])
      return oldData;
    },
    onSuccess: () => {
      toast.error(t("deleted"));
    },
    onError: () => {
      toast.warning(t("not_deleted"));
    },
    onSettled: () => {
      queryClient.invalidateQueries(["toDoLists", idTrip]);
    },
  });

  return (
    <CardToDoList className="card-todo-list">
      <div onClick={(e) => e.stopPropagation()} className="todo-detail">
        <FontAwesomeIcon
          icon={faTimesCircle}
          size="lg"
          onClick={() => {
            mutationDeleteTodoList.mutate({ token, id: toDoList.id });
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
              placeholder={t("task_name")}
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
                if (title !== "") {
                  let formatedDate = date;
                  if (date != "") {
                    let splitDate = date.split("-");
                    formatedDate = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
                  }
                  mutationAddTask.mutate({
                    token,
                    title,
                    id: toDoList.id,
                    date: formatedDate,
                    creator: user,
                  });
                  setTitle("");
                  setDate("");
                  setShowForm(false);
                }
              }}
              className="add-to-do-list-btn"
            >
              {t("add")}
            </Button>
          </div>
        )}
        <div style={{ overflowY: "scroll", height: "65vh" }}>
          {toDoList?.tasks?.map((t) => (
            <CardItem
              key={t.id}
              style={{
                position: "relative",
                justifyContent: "space-between",
                paddingTop: "50px",
                paddingBottom: "50px",
                whiteSpace: "pre-wrap",
                overflowWrap: "break-word",
              }}
            >
              <p style={{ lineHeight: 2 }}>
                {t.date && `${new Date(t.date).toLocaleDateString()} :`}{" "}
                {t.name}
              </p>

              <FontAwesomeIcon
                icon={faTimesCircle}
                size="lg"
                onClick={() => {
                  mutationDeleteTask.mutate({ token, id: t.id });
                }}
                style={{ position: "relative", right: 5, color: "red" }}
              />
            </CardItem>
          ))}
        </div>
      </div>
    </CardToDoList>
  );
};

export default ToDoList;
