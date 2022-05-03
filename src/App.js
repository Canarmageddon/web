import React, { useState, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "./style/map.css";
import ToDoLists from "./components/toDoLists/ToDoLists";
import TravelsList from "./components/travelList/TravelList";
import NavBar from "./components/navBar/NavBar";
import SideMenu from "./components/navBar/SideMenu";
import Admin from "./components/admin/Admin";
import { TravelProvider } from "./context/TravelContext";
import { Route, Routes, HashRouter } from "react-router-dom";
import MapGl from "./mapHandler/MapGl";
import PoiInformation from "./mapHandler/PoiInformation";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import Details from "./components/Details";

function App() {
  const [contentPage, setContentPage] = useState("map");
  const [showMenu, setShowMenu] = useState(false);
  const [poiId, setPoiId] = useState(false);
  const [travelers, setTravelers] = useState([]);

  return (
    <TravelProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/trips" element={<TravelsList />} />
          <Route
            path="/map/:id"
            element={
              <>
                <div
                  style={{
                    marginLeft: showMenu ? 200 : 0,
                    transition: "0.5s",
                  }}
                >
                  <NavBar setShowMenu={setShowMenu} />
                  <div style={{ display: "flex" }}>
                    <ToDoLists display={contentPage === "toDoLists"} />
                    <Admin
                      display={contentPage === "admin"}
                      travelers={travelers}
                      setTravelers={setTravelers}
                    />
                    <PoiInformation
                      display={contentPage === "poiInfo"}
                      setContentPage={setContentPage}
                      poiId={poiId}
                    />
                    <Details
                      display={contentPage === "details"}
                      setContentPage={setContentPage}
                    />
                    <div
                      style={{
                        flex:
                          contentPage === "map"
                            ? 1
                            : contentPage === "details" ||
                              contentPage === "admin"
                            ? 0
                            : 0.7,
                        width: "100%",
                        height: "93vh",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <MapGl
                        setContentPage={setContentPage}
                        contentPage={contentPage}
                        setPoiId={setPoiId}
                        setTravelers={setTravelers}
                      />
                    </div>
                  </div>
                </div>
                <SideMenu showMenu={showMenu} setContentPage={setContentPage} />
              </>
            }
          />
        </Routes>
      </HashRouter>
    </TravelProvider>
  );
}
export default App;
