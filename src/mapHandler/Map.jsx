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
        <div >
          <p>Que voulez-vous ajouter ?</p>
          <input type="radio" value="poi" name="Point d'intérêt" checked={typeLocation === "poi"} onChange={e => setTypeLocation(e.target.value)} /> Point d'intérêt
          <input type="radio" value="route" name="Etape" checked={typeLocation === "route"} onChange={e => setTypeLocation(e.target.value)} /> Etape
        </div>
        <DestinationInput />
      </div>
    </>
  );
};
export default Map;
