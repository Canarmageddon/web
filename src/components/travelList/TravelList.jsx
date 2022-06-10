import React, { useState } from "react";
import { Tabs, Tab, Button } from "react-bootstrap";
import { fetchTravels, deleteTrip, generateTripLink } from "../../apiCaller";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import "./travel.css";
import NewTravel from "./NewTravel";
import TrashAlt from "../icons/TrashAlt";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useToken, useUser } from "../../context/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faImage,
  faMap,
  faMapLocation,
  faShare,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
const TravelsList = () => {
  const { t } = useTranslation('translation', { "keyPrefix": "trip_list" });
  const navigate = useNavigate();
  const [timing, setTiming] = useState("planned");
  const [role, setRole] = useState("admin");
  const [lstTrips, setLstTrips] = useState([]);
  const [user, setUser] = useUser();
  const [token] = useToken();
  const generatedLink = (message) =>
    toast.success(message, { autoClose: false });
  const queryClient = useQueryClient();
  const { isLoading: isLoadingTravels, data: dataTravels } = useQuery(
    "trips",
    () => fetchTravels({ token, id: user }),
    {
      staleTime: 60 * 1000,
    }
  );
  const { isLoading: isLoadingHistory, data: dataHistory } = useQuery(
    "history",
    () => fetchTravels({ token, id: user }),
    {
      staleTime: 60 * 1000,
    }
  );

  const handleClick = (t) => {
    navigate(`/home/map/${t.id}/discovery`);
  };
  const mutationDeleteTrip = useMutation(deleteTrip, {
    onSettled: () => {
      queryClient.invalidateQueries("trips");
    },
  });

  const handleDelete = async (event, t) => {
    event.stopPropagation();
    mutationDeleteTrip.mutate({ token, id: t.id });
  };
  const createLink = async (event, id) => {
    event.stopPropagation();
    const res = await generateTripLink(token, id);
    navigator.clipboard.writeText(res.message);//TODO
    generatedLink(res.message);
  };
  const logout = () => {
    window.localStorage.clear();
    setUser(undefined);
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
        {!isLoadingTravels &&
          dataTravels.map((t, index) => (
            <React.Fragment key={index}>
              <div className="travel-list-item" onClick={(e) => handleClick(t)}>
                <p style={{ marginTop: 0, marginBottom: 0, flex: 0.3 }}>
                  {t.name}
                </p>
                <p style={{ marginTop: 0, marginBottom: 0, flex: 0.3 }}>
                  {t.start}
                </p>
                <p style={{ marginTop: 0, marginBottom: 0, flex: 0.3 }}>
                  {t.end}
                </p>
                {TrashAlt(handleDelete, t)}
                <FontAwesomeIcon
                  icon={faShareAlt}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={(e) => createLink(e, t.id)}
                />
              </div>
              <Dropdown.Divider />
            </React.Fragment>
          ))}
      </div>
    );
  };
  const displayHistory = () => {
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
            {t("star")}
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
        {!isLoadingHistory &&
          dataHistory.map((t, index) => (
            <React.Fragment key={index}>
              <div>
                <p style={{ marginTop: 0, marginBottom: 0, flex: 0.3 }}>
                  {t.name}
                </p>
                <p style={{ marginTop: 0, marginBottom: 0, flex: 0.3 }}>
                  {t.start}
                </p>
                <p style={{ marginTop: 0, marginBottom: 0, flex: 0.3 }}>
                  {t.end}
                </p>
                <FontAwesomeIcon
                  icon={faGlobe}
                  size="2x"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => handleClick(t)}
                />
                <FontAwesomeIcon
                  icon={faImage}
                  size="2x"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/home/album/${t.id}`)}
                />
              </div>
              <Dropdown.Divider />
            </React.Fragment>
          ))}
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
      <h1 className="list-title">{t("trips")}</h1>
      <Button onClick={() => navigate("/home/explore/list")}>{t("explore")}</Button>
      <NewTravel lstTrips={lstTrips} setLstTrips={setLstTrips} />
      <hr style={{ marginBottom: 5 + "px" }} />
      <Tabs
        id="tabs-timing"
        activeKey={timing}
        onSelect={(k) => setTiming(k)}
        className="tabs-travel"
      >
        <Tab eventKey="planned" title={t("planned_trip")}></Tab>
        <Tab eventKey="past" title={t("history")}></Tab>
      </Tabs>
      {timing == "planned" ? displayLstTravel() : displayHistory()}
      <Button
        variant="danger"
        onClick={logout}
        style={{ position: "absolute", bottom: 10, left: 15 }}
      >
        {t("disconnect")}
      </Button>
    </div>
  );
};

export default TravelsList;
