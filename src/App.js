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
  console.log(contentPage);
  return (
    <>
      <div style={{ marginLeft: showMenu ? 250 : 0 }}>
        <NavBar setShowMenu={setShowMenu} />
        {contentPage == "map" && <DestinationInput />}

        <div
          id="map"
          style={{
            width: "100%",
            display: contentPage === "map" ? "block" : "none",
          }}
        ></div>
        {contentPage === "todoList" && <ToDoLists />}
        {contentPage === "travelList" && <TravelsList />}
        {contentPage === "admin" && <Admin />}
      </div>
      <SideMenu showMenu={showMenu} setContentPage={setContentPage} />
    </>
  );
}
export default App;
