import React from "react";
import ReactMapGL, { Layer, Source } from "react-map-gl";
import { useState, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "./style/map.css";
import CustomMarker from "./compoonents/CustomMarker";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiamJoYXJpIiwiYSI6ImNreXlmeWZsYzBqczEydnFrZjZoeDJqMmEifQ.7Z9vGxLMr0cWskUyVAZXZQ";

function App() {
  const [viewport, setViewport] = useState({
    latitude: 48.85837,
    longitude: 2.294481,
    zoom: 12,
    bearing: 0,
    pitch: 0,
  });
  const [dataOne, setDataOne] = useState({
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [],
    },
  });
  useEffect(() => {
    fetch(
      "https://api.mapbox.com/directions/v5/mapbox/driving/7.752075%2C48.573048%3B7.71442%2C48.524669.json?geometries=polyline&alternatives=true&steps=true&overview=full&access_token=pk.eyJ1IjoiamJoYXJpIiwiYSI6ImNreXlmeWZsYzBqczEydnFrZjZoeDJqMmEifQ.7Z9vGxLMr0cWskUyVAZXZQ",
      { method: "get", headers: { "Content-Type": "application/json" } }
    )
      .then((res) => res.json())
      .then((res) => {
        let coordinates = [];
        console.log(res.routes[1].legs[0].steps);
        res.routes[0].legs[0].steps.forEach((data) => {
          coordinates.push(data.maneuver.location);
        });
        setDataOne({
          ...dataOne,
          geometry: { type: "LineString", coordinates },
        });
        console.log(coordinates);
      });
  }, []);

  const [listeMarkers, setListeMarkers] = useState([]);

  function addMarker(event) {
    const coordinates = {
      latitude: event.lngLat[1],
      longitude: event.lngLat[0],
    };
    setListeMarkers([...listeMarkers, coordinates]);
  }

  return (
    <div>
      <ReactMapGL
        mapboxApiAccessToken={MAPBOX_TOKEN}
        {...viewport}
        width="90vw"
        height="90vh"
        onViewportChange={(viewport) => setViewport(viewport)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onClick={addMarker}
      >
        {listeMarkers.map((marker, index) => {
          return (
            <React.Fragment key={index}>
              <CustomMarker index={index} marker={marker} />
            </React.Fragment>
          );
        })}
        <>
          {/*           {travel.waypoints != undefined &&
            travel.waypoints.map((marker, index) => {
              return (
                <React.Fragment key={index}>
                  <CustomMarker index={index} marker={marker.location} />
                </React.Fragment>
              );
            })} */}
        </>
        <Source id="polylineLayer" type="geojson" data={dataOne}>
          <Layer
            id="lineLayer"
            type="line"
            source="my-data"
            layout={{
              "line-join": "round",
              "line-cap": "round",
            }}
            paint={{
              "line-color": "rgba(250, 0, 8, 1)",
              "line-width": 20,
            }}
          />
        </Source>
      </ReactMapGL>
    </div>
  );
}
export default App;
