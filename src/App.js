import React, { useState, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "./style/map.css";
import ToDoLists from "./compoonents/toDoLists/ToDoLists";
import TravelsList from "./compoonents/travelList/TravelList";
import NavBar from "./compoonents/navBar/NavBar";
import SideMenu from "./compoonents/navBar/SideMenu";
import Admin from "./compoonents/admin/Admin";
import Map from "./mapHandler/Map";
import { TravelProvider } from "./context/TravelContext";
import { Route, Routes, HashRouter, BrowserRouter } from "react-router-dom";
import MapGl from "./mapHandler/MapGl";
import RequireAuth from "./context/requireAuth";
function App() {
  const [contentPage, setContentPage] = useState("map");
  const [showMenu, setShowMenu] = useState(false);
  const [typeLocation, setTypeLocation] = useState("route");

  return (
    <TravelProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<p>signin</p>} />
          <Route path="/signup" element={<p>signup</p>} />
          <Route path="/user" element={<RequireAuth />}>
            <Route path="travel" element={<TravelsList display={true} />} />
            <Route
              path="map"
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
                      <TravelsList display={contentPage === "travelList"} />
                      <Admin display={contentPage === "admin"} />

                      <div
                        style={{
                          flex: contentPage === "map" ? 1 : 0.6,
                          width: "100%",
                          height: "93vh",
                        }}
                        id="map"
                      >
                        <MapGl typeLocation={typeLocation}></MapGl>
                        <Map
                          showMenu={showMenu}
                          typeLocation={typeLocation}
                          setTypeLocation={setTypeLocation}
                        />
                      </div>
                    </div>
                  </div>
                </>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </TravelProvider>
  );
}
export default App;
