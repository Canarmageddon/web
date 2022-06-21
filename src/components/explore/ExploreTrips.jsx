import React, { useState } from "react";
import { cloneTrip, fetchAllTrips } from "../../apiCaller";
import "./explore.css";
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
import ExploringNavBar from "../navBar/ExploringNavBar";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";
import { useUser } from "../../context/userContext";
import { toast } from "react-toastify";
import ImportModal from "./ImportModal";
import "./exploreTrips.css";

export default function ExploreTrips({ context }) {
  const { t } = useTranslation("translation", { keyPrefix: "trip_list" });
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useOutletContext();
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [user] = useUser();
  const [selectedTrip, setSelectedTrip] = useState(null);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length > 0)
      mutationClone.mutate({ id: selectedTrip, name, creator: user });
    else toast.warning(t("name_empty"));
  };

  const displayTrips = () => {
    if (isLoading || isError) return "";
    return data["hydra:member"].map((t) => (
      <React.Fragment key={t.id}>
        <div className="explore-item">
          <p style={{ marginTop: 0, marginBottom: 0, flex: 0.3 }}>
            {t.name ?? "-"}
          </p>
          <p style={{ marginTop: 0, marginBottom: 0, flex: 0.3 }}>
            {t.start ?? "-"}
          </p>
          <p style={{ marginTop: 0, marginBottom: 0, flex: 0.3 }}>
            {t.end ?? "-"}
          </p>
          <FontAwesomeIcon
            className="list-icon"
            icon={faAdd}
            size={"2x"}
            onClick={() => {
              setSelectedTrip(t.id);
              handleShow();
            }}
          />
          <FontAwesomeIcon
            className="list-icon"
            icon={faEye}
            size={"2x"}
            style={{
              marginLeft: 10,
            }}
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
      <div className="list-container">
        <div className="travel-list-header">
          <p className="travel-text">{t("name")}</p>
          <p className="travel-text">{t("start")}</p>
          <p className="travel-text">{t("end")}</p>
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
              style={{ color: "var(--primary)" }}
              onClick={() => handleClick("first")}
            />
            <FontAwesomeIcon
              icon={faAngleLeft}
              size={"2x"}
              style={{ color: "var(--primary)" }}
              onClick={() => handleClick("prev")}
            />
            <p>
              {currentPage} / {lastPage}
            </p>
            <FontAwesomeIcon
              icon={faAngleRight}
              size={"2x"}
              style={{ color: "var(--primary)" }}
              onClick={() => handleClick("next")}
            />
            <FontAwesomeIcon
              icon={faAngleDoubleRight}
              size={"2x"}
              style={{ color: "var(--primary)" }}
              onClick={() => handleClick("last")}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="explore-trips-container">
        <div style={{ display: "flex" }}>
          <ExploringNavBar />
          <h1 className="list-title">{t("others_trips")}</h1>
        </div>
        <hr style={{ marginBottom: 5 }} />
        {displayLstTravel()}
      </div>
      <ImportModal
        show={show}
        setShow={setShow}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        name={name}
        setName={setName}
      />
    </>
  );
}
