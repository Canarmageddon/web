import React, { useState, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "./style/map.css";
import ToDoLists from "./compoonents/toDoLists/ToDoLists";

import NavBar from "./compoonents/navBar/NavBar";
import SideMenu from "./compoonents/navBar/SideMenu";
import Map from "./mapHandler/Map";
function App() {
  const [contentPage, setContentPage] = useState("map");
  const [showMenu, setShowMenu] = useState(false);
  const displayMap = () => createMap();

  useEffect(() => {
    displayMap();
  }, []);

  return (
    <>
      <div style={{ marginLeft: showMenu ? 250 : 0 }}>
        <NavBar setShowMenu={setShowMenu} />
        <Map />

        <div
          id="map"
          style={{
            width: "100%",
            display: contentPage === "map" ? "block" : "none",
          }}
        ></div>
        {/*         <ToDoLists
          style={{ display: contentPage === "toDoLists" ? "block" : "none" }}
        /> */}
      </div>
      <SideMenu showMenu={showMenu} setContentPage={setContentPage} />
    </>
  );
}
export default App;
