import { useState, useEffect } from "react";
import DestinationInput from "./DestinationInput";
import Button from "react-bootstrap/Button";
import TravelTransport from "./TravelTransport";
import { fetchTravels } from "../apiCaller";
import MapGl from "./MapGl";
const Map = ({ showMenu, typeLocation, setTypeLocation }) => {
  return (
    <>
      <div
        style={{
          alignItems: "center",
          position: "absolute",
          top: '7vh',
          zIndex: 1,
        }}
      >
        <input type="checkbox" onChange={() => setTypeLocation(typeLocation === "poi" ? "route" : "poi")}></input>
        {typeLocation === "route" ? "Ajouter des points d'intérêts" : "Ajouter des étapes"}
        <DestinationInput />
      </div>
    </>
  );
};
export default Map;
