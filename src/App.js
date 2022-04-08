import React, { useState, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "./style/map.css";
import ToDoLists from "./compoonents/toDoLists/ToDoLists";
import TravelsList from "./compoonents/travelList/TravelList";
import NavBar from "./compoonents/navBar/NavBar";
import SideMenu from "./compoonents/navBar/SideMenu";
import Admin from "./compoonents/admin/Admin";
import { TravelProvider } from "./context/TravelContext";
import { Route, Routes, HashRouter } from "react-router-dom";
import MapGl from "./mapHandler/MapGl";
import PoiInformation from "./mapHandler/PoiInformation";

function App() {
  const [contentPage, setContentPage] = useState("map");
  const [showMenu, setShowMenu] = useState(false);
  const [poiId, setPoiId] = useState(false);

  return (
    <TravelProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<TravelsList display={true} />} />
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
                    <Admin display={contentPage === "admin"} />
                    <PoiInformation
                      display={contentPage === "poiInfo"}
                      setContentPage={setContentPage}
                      poiId={poiId}
                    />
                    <div
                      style={{
                        flex: contentPage === "map" ? 1 : 0.7,
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
