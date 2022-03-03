import React, { useState, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "./style/map.css";
import ToDoLists from "./compoonents/toDoLists/ToDoLists";
import TravelsList from "./compoonents/travelList/TravelList";
import NavBar from "./compoonents/navBar/NavBar";
import SideMenu from "./compoonents/navBar/SideMenu";
import Map from "./mapHandler/Map";
import DestinationInput from "./mapHandler/DestinationInput";
import Admin from "./compoonents/admin/Admin";
function App() {
  const [contentPage, setContentPage] = useState("map");
  const [showMenu, setShowMenu] = useState(false);
  const displayMap = () => createMap();

  useEffect(() => {
    displayMap();
  }, []);

  return (
    <>
      <ToDoLists />
      <div style={{ marginLeft: showMenu ? 200 : 0 }}>
        <NavBar setShowMenu={setShowMenu} />
        {contentPage == "map" && <DestinationInput />}

        <div
          style={{
            width: "100%",
            display: contentPage === "map" ? "block" : "none",
          }}
          id="map"
        ></div>
        <ToDoLists display={contentPage === "toDoLists"} />
        {contentPage === "travelList" && <TravelsList />}
        {contentPage === "admin" && <Admin />}
      </div>
      <SideMenu showMenu={showMenu} setContentPage={setContentPage} />
    </>
  );
}
export default App;
