import React from "react";
import ReactMapGL, { Layer, Source } from "react-map-gl";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "mapbox-gl/dist/mapbox-gl.css";
import "./style/map.css";
import CustomMarker from "./compoonents/CustomMarker";
import ToDoLists from "./compoonents/toDoLists/ToDoLists";
import Map from "./mapHandler/Map";

function App() {
  return (
    <>
      <Map></Map>
    </>
  );
}
export default App;
