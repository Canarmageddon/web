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
function App() {
  const [contentPage, setContentPage] = useState("map");
  const [showMenu, setShowMenu] = useState(false);
  const displayMap = () => createMap();
  useEffect(() => {
    displayMap();
  }, []);

  return (
    <>
      <TravelProvider>
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
              }}
              id="map"
            >
              <Map showMenu={showMenu} />
            </div>
          </div>
        </div>
        <SideMenu showMenu={showMenu} setContentPage={setContentPage} />
      </TravelProvider>
    </>
  );
}
export default App;
