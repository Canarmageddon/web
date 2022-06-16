import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { cloneTrip, fetchAllTrips } from "../apiCaller";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleRight,
  faAngleLeft,
  faAdd,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import ExploringNavBar from "../components/navBar/ExploringNavBar";
import { useMutation, useQuery } from "react-query";
import { useTranslation } from 'react-i18next';
import { useUser } from "../context/userContext";
import { toast } from "react-toastify";
export default function ExploreTrips({ context }) {
  const { t } = useTranslation('translation', { "keyPrefix": "trip_list " });
  const [currentPage, setCurrentPage] = useOutletContext();
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const [show, setShow] = useState(false)
  const [name, setName] = useState("")
  const [user] = useUser();
  const [selectedTrip, setSelectedTrip] = useState(null)
  const { isLoading, isError, error, data, refetch } = useQuery(
    ["explore", currentPage],
    () => fetchAllTrips(currentPage),
    {
      onSuccess: (data) => {
        if (data["hydra:view"] !== undefined) {
          setLastPage(data["hydra:view"]["hydra:last"].split("page=")[1]);
        }
      },
    }
  );
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setName("");
    setShow(true);
  };
  const mutationClone = useMutation(cloneTrip, {
    onSuccess: () => {
      toast.success("Votre voyage a bien été cloné")
      navigate("/home/trips")
    },
    onError: () => {
      toast.warning("Le voyage n'a pas pu être cloné")
    },
    onSettled: () => {
      handleClose()
    }
  });
  const handleSubmit = (e) => {
    e.preventDefault()
    mutationClone.mutate({ id: selectedTrip, name, creator: user });
  }

  const displayTrips = () => {
    if (isLoading || isError) return "";
    return data["hydra:member"].map((t) => (
      <React.Fragment key={t.id}>
        <div className="travel-list-item">
          <p style={{ marginTop: 0, marginBottom: 0, flex: 0.3 }}>{t.name}</p>
          <p style={{ marginTop: 0, marginBottom: 0, flex: 0.3 }}>{t.start}</p>
          <p style={{ marginTop: 0, marginBottom: 0, flex: 0.3 }}>{t.end}</p>
          <FontAwesomeIcon icon={faAdd} size={"2x"}
            onClick={() => {
              setSelectedTrip(t.id)
              handleShow()
            }} />
          <FontAwesomeIcon
            icon={faEye}
            size={"2x"}
            onClick={() => navigate(`/home/explore/map/${t.id}`)}
          />
        </div>
        <Dropdown.Divider />
      </React.Fragment>
    ));
  };

  const handleClick = (action) => {
    switch (action) {
      case "first":
        currentPage != 1 && setCurrentPage(1);
        break;
      case "prev":
        currentPage > 1 && setCurrentPage(currentPage - 1);
        break;
      case "next":
        currentPage < lastPage && setCurrentPage(currentPage + 1);
        break;
      case "last":
        currentPage != lastPage && setCurrentPage(lastPage);
        break;
      default:
        setCurrentPage(1);
        break;
    }
  };
  const displayLstTravel = () => {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            marginBottom: 1,
            marginTop: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
          className="nav-item"
        >
          <p
            style={{
              marginTop: 0,
              marginBottom: 0,
              flex: 0.3,
              color: "#0096ff",
              fontWeight: 500,
            }}
          >
            {t("name")}
          </p>
          <p
            style={{
              marginTop: 0,
              marginBottom: 0,
              flex: 0.3,
              color: "#0096ff",
              fontWeight: 500,
            }}
          >
            {t("start")}
          </p>
          <p
            style={{
              marginTop: 0,
              marginBottom: 0,
              flex: 0.3,
              color: "#0096ff",
              fontWeight: 500,
            }}
          >
            {t("end")}
          </p>
        </div>

        <Dropdown.Divider style={{ backgroundColor: "#0096ff", height: 4 }} />
        {displayTrips()}
        {lastPage > 1 && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <FontAwesomeIcon
              icon={faAngleDoubleLeft}
              size={"2x"}
              style={{ color: "rgb(13, 110, 253, 1)" }}
              onClick={() => handleClick("first")}
            />
            <FontAwesomeIcon
              icon={faAngleLeft}
              size={"2x"}
              style={{ color: "rgb(13, 110, 253, 1)" }}
              onClick={() => handleClick("prev")}
            />
            <p>
              {currentPage} / {lastPage}
            </p>
            <FontAwesomeIcon
              icon={faAngleRight}
              size={"2x"}
              style={{ color: "rgb(13, 110, 253, 1)" }}
              onClick={() => handleClick("next")}
            />
            <FontAwesomeIcon
              icon={faAngleDoubleRight}
              size={"2x"}
              style={{ color: "rgb(13, 110, 253, 1)" }}
              onClick={() => handleClick("last")}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="root-list"
      style={{
        flex: 0.4,
      }}
    >
      <Modal show={show} >
        <Modal.Header closeButton>
          <Modal.Title>t{("new_trip")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label>
              {t("trip_name")}
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <input type="submit" value={t("create")} />
          </form>
        </Modal.Body>
      </Modal>
      <ExploringNavBar />
      <h1 className="list-title">
        {t("others_trips")}
      </h1>
      <hr style={{ marginBottom: 5 + "px" }} />
      {displayLstTravel()}
    </div>
  );
}
