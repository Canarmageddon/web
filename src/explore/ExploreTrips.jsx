import React, { useEffect, useState } from "react";
import { fetchAllTrips } from "../apiCaller";
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
import { useQuery } from "react-query";

export default function ExploreTrips({ context }) {
  const [currentPage, setCurrentPage] = useOutletContext();
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [lastPage, setLastPage] = useState(1);
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

  const displayTrips = () => {
    if (isLoading || isError) return "";
    return data["hydra:member"].map((t) => (
      <React.Fragment key={t.id}>
        <div className="travel-list-item">
          <p style={{ marginTop: 0, marginBottom: 0, flex: 0.3 }}>{t.name}</p>
          <p style={{ marginTop: 0, marginBottom: 0, flex: 0.3 }}>{t.start}</p>
          <p style={{ marginTop: 0, marginBottom: 0, flex: 0.3 }}>{t.end}</p>
          <FontAwesomeIcon icon={faAdd} size={"2x"} />
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
            Nom
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
            Départ
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
            Arrivée
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
      <ExploringNavBar />
      <h1 className="list-title">
        Découvrez les voyages des autres utilisateurs
      </h1>
      <hr style={{ marginBottom: 5 + "px" }} />
      {displayLstTravel()}
    </div>
  );
}
