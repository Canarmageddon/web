import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useTravel } from "../../context/TravelContext";
import Travel from "../../factory/Travel"
import Itinerary from "../../factory/Itinerary";
import { fetchTravels } from "../../apiCaller";



const TravelsList = ({ display }) => {
  const [timing, setTiming] = useState("planned");
  const [role, setRole] = useState("admin");
  const [travel, setTravel] = useTravel()
  const [lstTravel, setLstTravel] = useState([])
  useEffect(async () => {
    const data = await fetchTravels()
    let res = [];
    data.map((d) => {
      let itinerary = new Itinerary(d.itinerary.description, d.itinerary.id)
      let travel = new Travel(d.duration, d.id, itinerary);
      res = [...res, travel];
    })
    setLstTravel(res)
  }, [])
  const displayLstTravel = () => {
    return lstTravel.map((t) =>
      <li key={t.id} onClick={() => setTravel(t)}>
        {t.itinerary.description}
      </li>)
  }
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
      <ul>{displayLstTravel()}</ul>

    </div>
  );
};

export default TravelsList;
