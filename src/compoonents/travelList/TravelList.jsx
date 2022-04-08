import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useTravel } from "../../context/TravelContext";
import { fetchTravels } from "../../apiCaller";
import generateObject from "../../factory/ObjectFactory";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import "../../style/travel.css";

const TravelsList = ({ display }) => {
  const navigate = useNavigate();
  const [timing, setTiming] = useState("planned");
  const [role, setRole] = useState("admin");
  const [travel, setTravel] = useTravel();
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
    setTravel(t);
    navigate("/map");
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
            justifyContent: "space-evenly",
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
            <div
              style={{
                display: "flex",
                marginBottom: 10,
                marginTop: 10,
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
              onClick={() => handleClick(t)}
            >
              <p style={{ marginTop: 0, marginBottom: 0, flex: 0.3 }}>
                {t.name}
              </p>
              <p style={{ marginTop: 0, marginBottom: 0, flex: 0.3 }}>
                {t.start}
              </p>
              <p style={{ marginTop: 0, marginBottom: 0, flex: 0.3 }}>
                {t.end}
              </p>
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
        display: display ? "block" : "none",
        flex: 0.4,
      }}
    >
      <h1 className="list-title">Voyages</h1>
      <button className="button-new">Nouveau voyage</button>
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
      {/* <button class="button-tab">Voyages planifies</button>
            <button class="button-tab">Historique</button> */}
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
