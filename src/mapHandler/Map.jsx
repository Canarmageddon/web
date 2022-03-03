import { useState } from "react";
const Map = () => {
    const [location, setLocation] = useState("plobsheim");
    const [lstLocations, setLstLocations] = useState([]);
    const MAPBOX_TOKEN =
        "pk.eyJ1IjoiamJoYXJpIiwiYSI6ImNreXlmeWZsYzBqczEydnFrZjZoeDJqMmEifQ.7Z9vGxLMr0cWskUyVAZXZQ";
    const displayMap = () => createMap();
    const handleClickLocation = () => {
        setLstLocations([...lstLocations, location])
        searchPlace(location);
        setLocation("");
    };
    const removeElement = (loc) => {
        removePlace(lstLocations.indexOf(loc))
        setLstLocations(lstLocations.filter(e => e != loc))
    }
    return <>
        <button onClick={displayMap}>display map</button>
        <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={handleClickLocation}>search</button>
        <input type="checkbox" />
        {lstLocations.map((loc) =>
            <div>
                <button onClick={() => removeElement(loc)}>X</button>
                <li>{loc}</li>
            </div>)}
        <div id="map"></div>

    </>
}
export default Map;