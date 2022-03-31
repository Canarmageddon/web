import React, { useState, useEffect } from "react";
import DestinationInput from "./DestinationInput";

const LocationFinder = ({ typeLocation, setTypeLocation }) => {
  return (
    <>
      <div
        style={{
          alignItems: "center",
          position: "relative",
          height: 0,
          left: 10,
          top: 10,
          zIndex: 1,
        }}
      >
        <div>
          <p>Que voulez-vous ajouter ?</p>
          <input
            type="radio"
            value="poi"
            name="Point d'intérêt"
            checked={typeLocation === "poi"}
            onChange={(e) => setTypeLocation(e.target.value)}
          />
          Point d'intérêt
          <input
            type="radio"
            value="route"
            name="Etape"
            checked={typeLocation === "route"}
            onChange={(e) => setTypeLocation(e.target.value)}
          />
          Etape
        </div>
        <DestinationInput />
      </div>
    </>
  );
};
export default LocationFinder;
