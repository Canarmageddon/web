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
    generatedLink("lien de pd: artage copier dans le press-papier");
  };
  const logout = () => {
    setContentPage();
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
          <p className="travel-text">{t("name")}</p>
          <p className="travel-text">{t("start")}</p>
          <p className="travel-text">{t("end")}</p>
        </div>

        <Dropdown.Divider style={{ backgroundColor: "#0096ff", height: 4 }} />
        {!isLoadingTravels &&
          dataTravels?.map((t, index) => (
            <React.Fragment key={index}>
              <div className="travel-list-item" onClick={(e) => handleClick(t)}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ marginTop: 0, marginBottom: 0, flex: 0.3 }}>
                    {t.name}
                  </p>
                  <p style={{ marginTop: 0, marginBottom: 0, flex: 0.3 }}>
                    {t.steps[0]?.description ?? "-"}
                  </p>
                  <p style={{ marginTop: 0, marginBottom: 0, flex: 0.3 }}>
                    {t.steps[t.steps.length - 1]?.description ?? "-"}
                  </p>
                </div>
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
          <p className="travel-text">{t("name")}</p>
          <p className="travel-text">{t("start")}</p>
          <p className="travel-text">{t("end")}</p>
        </div>

        <Dropdown.Divider style={{ backgroundColor: "#0096ff", height: 4 }} />
        {!isLoadingHistory &&
          dataHistory?.map((t, index) => (
            <React.Fragment key={index}>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ marginTop: 0, marginBottom: 0, flex: 0.3 }}>
                    {t.name}
                  </p>
                  <p style={{ marginTop: 0, marginBottom: 0, flex: 0.3 }}>
                    {t.steps[0]?.description}
                  </p>
                  <p style={{ marginTop: 0, marginBottom: 0, flex: 0.3 }}>
                    {t.steps[t.steps.length - 1]?.description}
                  </p>
                </div>
                <FontAwesomeIcon
                  icon={faGlobe}
                  size="2x"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/home/map/${t.id}/history`)}
                />
                <FontAwesomeIcon
                  icon={faImage}
                  size="2x"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (t.album == null)
                      toast.warning("Il n'y a rien à voir ici pour l'instant");
                    else navigate(`/home/album/${t.album.id}`);
                  }}
                />
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
        <Button onClick={() => navigate("/home/explore/list")}>
          {t("explore")}
        </Button>
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
        <LanguageModal showModal={showModal} setShowModal={setShowModal} />
      </div>
      <Button
        variant="danger"
        onClick={logout}
        style={{ position: "absolute", bottom: 20, left: 25 }}
      >
        {t("disconnect")}
      </Button>
    </>
  );
};

export default TravelsList;
