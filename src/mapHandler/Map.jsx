import { useState } from "react";
import DestinationInput from './DestinationInput'
const Map = () => {
    const [lstLocations, setLstLocations] = useState([]);
    const MAPBOX_TOKEN =
        "pk.eyJ1IjoiamJoYXJpIiwiYSI6ImNreXlmeWZsYzBqczEydnFrZjZoeDJqMmEifQ.7Z9vGxLMr0cWskUyVAZXZQ";
    const addLocation = (newLocation) => {
        setLstLocations([...lstLocations, newLocation])
        console.log(newLocation)
        searchPlace(newLocation);
    };
    const removeElement = (loc) => {
        removePlace(lstLocations.indexOf(loc))
        setLstLocations(lstLocations.filter(e => e != loc))
    }
    return <>
        <div style={{ display: "flex", flexDirection: "row" }}>
            <DestinationInput addLocation={addLocation} />

            {lstLocations.map((loc) =>
                <div>
                    <button onClick={() => removeElement(loc)}>X</button>
                    {loc}
                </div>)}
        </div>
    </>
}
export default Map;