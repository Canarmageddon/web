import React from "react";
import ReactMapGL, { Marker, Layer, Source } from "react-map-gl";
import { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiamJoYXJpIiwiYSI6ImNreXlmeWZsYzBqczEydnFrZjZoeDJqMmEifQ.7Z9vGxLMr0cWskUyVAZXZQ"; // Set your mapbox token here

function App() {
  const [viewport, setViewport] = useState({
    latitude: 48.57,
    longitude: 7.75,
    zoom: 12,
    bearing: 0,
    pitch: 0,
  });

  const [listeMarkers, setListeMarkers] = useState([]);

  function addMarker(event) {
    const coordinates = {
      latitude: event.lngLat[1],
      longitude: event.lngLat[0],
    };
    setListeMarkers([...listeMarkers, coordinates]);
  }

  const CustomMarker = ({ index, marker }) => {
    return (
      <Marker latitude={marker.latitude} longitude={marker.longitude}>
        <div className="marker temporary-marker">
          <span>
            <b>{index + 1}</b>
          </span>
        </div>
      </Marker>
    );
  };
  const dataOne = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [
        [-122.41510269913951, 37.77909036739809],
        [39.5423, -77.0564],
        [0, 0],
      ],
    },
  };
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
        })}{" "}
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
              "line-color": "rgba(3, 170, 238, 0.5)",
              "line-width": 5,
            }}
          />
        </Source>
      </ReactMapGL>
    </div>
  );
}
export default App;
