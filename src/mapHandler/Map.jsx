import { useState } from "react";
import DestinationInput from "./DestinationInput";
import Button from "react-bootstrap/Button";
import TravelTransport from "./TravelTransport";
import LocationHandler from "./LocationHandler";
import { fetchTravels } from "../apiCaller";
const Map = ({ showMenu }) => {
  const [lstLocations, setLstLocations] = useState([]);
  const [typeLocation, setTypeLocation] = useState(false)
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
        <input type="checkbox" onChange={() => setTypeLocation(!typeLocation)}></input>
        <p>{typeLocation ? "Ajouter des points d'intérêts" : "Ajouter des étapes"}</p>
        <TravelTransport></TravelTransport>
        <DestinationInput addLocation={addLocation} />

        {lstLocations.map((loc) => (
          <div style={{ marginLeft: 10 }}>
            <Button onClick={() => removeElement(loc)}>X</Button>
            {loc}
          </div>
        ))}
        <LocationHandler ref={(LocationHandler => { window.LocationHandler = LocationHandler })} typeLocation={typeLocation}></LocationHandler>
      </div>
    </>
  );
};
export default Map;
