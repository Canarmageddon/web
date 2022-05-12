import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { fetchTravels, deleteTrip } from "../../apiCaller";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./travel.css";
import NewTravel from "./NewTravel";
const TravelsList = () => {
  const navigate = useNavigate();
  const [timing, setTiming] = useState("planned");
  const [role, setRole] = useState("admin");
  const [lstTrips, setLstTrips] = useState([]);
  useEffect(async () => {
    const data = await fetchTravels();
    let res = [];
    data.map((d) => {
      res.push({
        id: d.id,
        name: d.name,
        start: d.travels[0]?.start?.name,
        end: d.travels[d.travels.length - 1]?.end?.name,
      });
    });

    setLstTrips(res);
  }, []);

  const handleClick = (t) => {
    navigate(`/map/${t.id}`);
  };

  const handleDelete = async (event, t) => {
    event.stopPropagation();
    setLstTrips((oldList) => oldList.filter((trip) => trip.id !== t.id));
    await deleteTrip(t.id);
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
        {lstTrips.map((t) => (
          <React.Fragment key={t.id}>
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
              <FontAwesomeIcon
                icon={faTrashAlt}
                size="2x"
                onClick={(event) => handleDelete(event, t)}
                style={{
                  color: "#dc3545",
                  cursor: "pointer",
                }}
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
      <h1 className="list-title">Voyages</h1>
      <NewTravel lstTrips={lstTrips} setLstTrips={setLstTrips} />
      <hr style={{ marginBottom: 5 + "px" }} />
      <Tabs
        id="tabs-timing"
        activeKey={timing}
        onSelect={(k) => setTiming(k)}
        className="tabs-travel"
      >
        <Tab eventKey="planned" title="Voyages planifies"></Tab>
        <Tab eventKey="past" title="Historique"></Tab>
      </Tabs>
      <Tabs
        id="tabs-role"
        activeKey={role}
        onSelect={(k) => setRole(k)}
        className="tabs-travel"
      >
        <Tab eventKey="admin" title="Admin"></Tab>
        <Tab eventKey="member" title="Membre"></Tab>
      </Tabs>
      {displayLstTravel()}
    </div>
  );
};

export default TravelsList;
