import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faAdd, faHome } from "@fortawesome/free-solid-svg-icons";
import "../../style/nav.css";
import { useNavigate, useParams } from "react-router-dom";
import ImportModal from "../explore/ImportModal";
import { useMutation, useQueryClient } from "react-query";
import { cloneTrip } from "../../apiCaller";
import { useTranslation } from "react-i18next";
import { useUser } from "../../context/userContext";
import { toast } from "react-toastify";

const ExploringMapNavBar = ({ setContentPage }) => {
  const [user] = useUser();
  const { t } = useTranslation("translation", { keyPrefix: "trip_list" });
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const handleClose = () => setShow(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length > 0) mutationClone.mutate({ id, name, creator: user });
    else toast.warning(t("name_empty"));
  };
  const mutationClone = useMutation(cloneTrip, {
    onSuccess: () => {
      toast.success("Votre voyage a bien été cloné");
      queryClient.invalidateQueries("trips");
      navigate("/home/trips");
    },
    onError: () => {
      toast.warning("Le voyage n'a pas pu être cloné");
    },
    onSettled: () => {
      handleClose();
    },
  });
  const handleShow = () => {
    setName("");
    setShow(true);
  };
  const navigate = useNavigate();
  return (
    <>
      <ImportModal
        show={show}
        setShow={setShow}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        name={name}
        setName={setName}
      />

      <div
        className="d-flex justify-content-between bg-primary navbar"
        style={{ height: "fit-content" }}
      >
        <FontAwesomeIcon
          className="p-2 nav-icon"
          icon={faBackward}
          size="2x"
          onClick={() => {
            setContentPage();
            navigate(-1);
          }}
        />
        <FontAwesomeIcon
          className="p-2 nav-icon"
          icon={faHome}
          size="2x"
          onClick={() => {
            setContentPage();
            navigate("/home/trips");
          }}
        />
        <FontAwesomeIcon
          className="p-2 nav-icon"
          icon={faAdd}
          size="2x"
          onClick={() => {
            handleShow();
          }}
        />
      </div>
    </>
  );
};

export default ExploringMapNavBar;
