import React, { useState } from "react";
import { Tabs, Tab, Button } from "react-bootstrap";
import { fetchTravels, deleteTrip } from "../../apiCaller";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import "./travel.css";
import NewTravel from "./NewTravel";
import TrashAlt from "../icons/TrashAlt";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useToken, useUser } from "../../context/userContext";
const TravelsList = () => {
  const navigate = useNavigate();
  const [timing, setTiming] = useState("planned");
  const [role, setRole] = useState("admin");
  const [lstTrips, setLstTrips] = useState([]);
  const [user, setUser] = useUser();
  const [token] = useToken();

  const queryClient = useQueryClient();
  const { isLoading: isLoadingTravels, data: dataTravels } = useQuery(
    "trips",
    () => fetchTravels({ token, id: user }),
    {
      staleTime: 60 * 1000,
    }
  );

  const handleClick = (t) => {
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
      <Button onClick={() => navigate("/home/explore/list")}>Explorer</Button>
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
      <Button
        variant="danger"
        onClick={logout}
        style={{ position: "absolute", bottom: 10, left: 15 }}
      >
        Déconnexion
      </Button>
    </div>
  );
};

export default TravelsList;
