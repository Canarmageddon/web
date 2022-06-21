import React, { useState } from "react";
import { Tabs, Tab, Button } from "react-bootstrap";
import {
  fetchTravels,
  deleteTrip,
  generateTripLink,
  fetchTrips,
} from "../../apiCaller";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import "./travel.css";
import NewTravel from "./NewTravel";
import TrashAlt from "../icons/TrashAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useToken, useUser } from "../../context/userContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import LanguageModal from "../LanguageModal";

const TravelsList = ({ setContentPage }) => {
  const { t } = useTranslation("translation", { keyPrefix: "trip_list" });
  const navigate = useNavigate();
  const [timing, setTiming] = useState("planned");
  const [role, setRole] = useState("admin");
  const [lstTrips, setLstTrips] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useUser();
  const [token] = useToken();
  const generatedLink = (message) => toast.success(message);
  const queryClient = useQueryClient();
  const emptyAlbum = () => toast.warning(t("empty_album"));

  const { isLoading: isLoadingTravels, data: dataTravels } = useQuery(
    "trips",
    () => fetchTrips({ token, user, isEnded: 0 }),
    {
      staleTime: 60 * 1000,
    }
  );
  const { isLoading: isLoadingHistory, data: dataHistory } = useQuery(
    "history",
    () => fetchTravels({ token, user }),
    {
      staleTime: 60 * 1000,
    }
  );

  const handleClick = (t) => {
    setContentPage("map");
    navigate(`/home/map/${t.id}`);
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

    navigator.clipboard.writeText(
      `${window.location.hostname}:${location.port}/unregistered/${id}/${res.message}/home`
    ); //TODO
    generatedLink(t("trip_link"));
  };
  const logout = () => {
    setContentPage();
    window.localStorage.clear();
    setUser(undefined);
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
        {!isLoadingTravels &&
          dataTravels?.map((t, index) => (
            <React.Fragment key={index}>
              <div onClick={(e) => handleClick(t)}>
                <div className="travel-item">
                  <p style={{ marginTop: 0, marginBottom: 0, flex: 0.3 }}>
                    {t.name}
                  </p>
                  <p style={{ marginTop: 0, marginBottom: 0, flex: 0.3 }}>
                    {t?.steps[0]?.description ?? "-"}
                  </p>
                  <p style={{ marginTop: 0, marginBottom: 0, flex: 0.3 }}>
                    {t?.steps[t?.steps.length - 1]?.description ?? "-"}
                  </p>
                  {TrashAlt(handleDelete, t)}
                  <FontAwesomeIcon
                    className="list-icon"
                    icon={faShareAlt}
                    size="2x"
                    style={{
                      marginLeft: 10,
                    }}
                    onClick={(e) => createLink(e, t.id)}
                  />
                </div>
              </div>
              <Dropdown.Divider />
            </React.Fragment>
          ))}
      </div>
    );
  };
  const displayHistory = () => {
    return (
      <div className="list-container">
        <div className="travel-list-header">
          <p className="travel-text">{t("name")}</p>
          <p className="travel-text">{t("start")}</p>
          <p className="travel-text">{t("end")}</p>
        </div>

        <Dropdown.Divider style={{ backgroundColor: "#0096ff", height: 4 }} />
        {!isLoadingHistory &&
          dataHistory?.map((t, index) => (
            <React.Fragment key={index}>
              <div>
                <div className="travel-item">
                  <p style={{ marginTop: 0, marginBottom: 0, flex: 0.3 }}>
                    {t.name}
                  </p>
                  <p style={{ marginTop: 0, marginBottom: 0, flex: 0.3 }}>
                    {t.steps[0]?.description}
                  </p>
                  <p style={{ marginTop: 0, marginBottom: 0, flex: 0.3 }}>
                    {t.steps[t.steps.length - 1]?.description}
                  </p>
                  <FontAwesomeIcon
                    className="list-icon"
                    icon={faGlobe}
                    size="2x"
                    onClick={() => {
                      if (t.albumElements.length == 0) emptyAlbum();
                      else navigate(`/home/map/${t.id}/history`);
                    }}
                  />
                  <FontAwesomeIcon
                    className="list-icon"
                    icon={faImage}
                    size="2x"
                    style={{
                      marginLeft: 10,
                    }}
                    onClick={() => {
                      if (t.albumElements.length == 0) emptyAlbum();
                      else navigate(`/home/album/${t.album.id}`);
                    }}
                  />
                  <FontAwesomeIcon
                    className="list-icon"
                    icon={faShareAlt}
                    size="2x"
                    style={{
                      marginLeft: 10,
                    }}
                    onClick={(e) => createLink(e, t.id)}
                  />
                </div>
              </div>
              <Dropdown.Divider />
            </React.Fragment>
          ))}
      </div>
    );
  };
  return (
    <>
      <FontAwesomeIcon
        onClick={() => setShowModal(true)}
        icon={faGlobe}
        className="language-icon"
        size={"2x"}
      />
      <div className="travellist-container">
        <h1 className="list-title">{t("trips")}</h1>
        <Button
          className="explore-btn"
          onClick={() => navigate("/home/explore/list")}
        >
          {t("explore")}
        </Button>
        <NewTravel lstTrips={lstTrips} setLstTrips={setLstTrips} />
        <FontAwesomeIcon
          className="p-2 nav-icon"
          icon={faUser}
          size="2x"
          style={{
            float: "right",
            background: "var(--primary)",
            borderRadius: "50%",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => navigate("/home/profile")}
        />
        <hr style={{ marginBottom: 5 }} />
        <Tabs
          id="tabs-timing"
          activeKey={timing}
          onSelect={(k) => setTiming(k)}
        >
          <Tab eventKey="planned" title={t("planned_trip")}></Tab>
          <Tab eventKey="past" title={t("history")}></Tab>
        </Tabs>
        {timing == "planned" ? displayLstTravel() : displayHistory()}
      </div>
      <Button
        variant="danger"
        onClick={logout}
        style={{ position: "absolute", bottom: 20, left: 25 }}
      >
        {t("disconnect")}
      </Button>
      <LanguageModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default TravelsList;
