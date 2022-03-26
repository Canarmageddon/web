import { useState, useEffect } from "react";
import DestinationInput from "./DestinationInput";
import Button from "react-bootstrap/Button";
import TravelTransport from "./TravelTransport";
import { fetchTravels } from "../apiCaller";
import MapGl from "./MapGl";
const Map = ({ showMenu }) => {
  const displayMap = () => createMap();
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
  useEffect(() => {
    //    displayMap();
  }, []);
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
        <TravelTransport ></TravelTransport>
        <DestinationInput addLocation={addLocation} />

        {lstLocations.map((loc) => (
          <div style={{ marginLeft: 10 }}>
            <Button onClick={() => removeElement(loc)}>X</Button>
            {loc}
          </div>
        ))}

      </div>
    </>
  );
};
export default Map;
