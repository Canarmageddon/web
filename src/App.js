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

function App() {
  const [location, setLocation] = useState("plobsheim");
  const MAPBOX_TOKEN =
    "pk.eyJ1IjoiamJoYXJpIiwiYSI6ImNreXlmeWZsYzBqczEydnFrZjZoeDJqMmEifQ.7Z9vGxLMr0cWskUyVAZXZQ";
  const [display, setdisplay] = useState(false);
  const displayMap = () => createMap();
  return (
    <>
      <ToDoLists />
      <button onClick={displayMap}>display map</button>
      <button onClick={generateRoute}>get itinerary</button>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={() => searchPlace(location)}>search</button>
      <input type="checkbox" />
      <div id="map"></div>
    </>
  );
}
export default App;
