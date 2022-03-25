import { useState } from "react";
import DestinationInput from "./DestinationInput";
import Button from "react-bootstrap/Button";
import TravelTransport from "./TravelTransport";
import PoiHandler from "./PoiHandler";
import { fetchTravels } from "../apiCaller";
const Map = ({ showMenu }) => {
  const [lstLocations, setLstLocations] = useState([]);
  const MAPBOX_TOKEN =
    "pk.eyJ1IjoiamJoYXJpIiwiYSI6ImNreXlmeWZsYzBqczEydnFrZjZoeDJqMmEifQ.7Z9vGxLMr0cWskUyVAZXZQ";
  const addLocation = (newLocation) => {
    setLstLocations([...lstLocations, newLocation]);
    addLocationToMap(newLocation);
  };
  const removeElement = (loc) => {
    removePlace(lstLocations.indexOf(loc));
    setLstLocations(lstLocations.filter((e) => e != loc));
  };

  return (
    <>
      <div
        style={{
          alignItems: "center",
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 1,
        }}
      >
        <TravelTransport></TravelTransport>
        <DestinationInput addLocation={addLocation} />

        {lstLocations.map((loc) => (
          <div style={{ marginLeft: 10 }}>
            <Button onClick={() => removeElement(loc)}>X</Button>
            {loc}
          </div>
        ))}
        <PoiHandler ref={(PoiHandler => { window.PoiHandler = PoiHandler })}></PoiHandler>
      </div>
    </>
  );
};
export default Map;
