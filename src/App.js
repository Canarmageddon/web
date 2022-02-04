import React from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import {useState, useEffect} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGlLanguage from "@mapbox/mapbox-gl-language";

const MAPBOX_TOKEN = 'pk.eyJ1IjoiamJoYXJpIiwiYSI6ImNreXlmeWZsYzBqczEydnFrZjZoeDJqMmEifQ.7Z9vGxLMr0cWskUyVAZXZQ'; // Set your mapbox token here

function App() {
  const [viewport, setViewport] = useState({
        latitude: 48.57,
        longitude: 7.75,
        zoom: 12,
        bearing: 0,
        pitch: 0
  });
  const [listeMarkers, setListeMarkers] = useState([]);
  const [mapContainer] = useState(React.createRef());

  const addMarker = (event) => {
    const coordinates = {
      latitude: event.lngLat[1],
      longitude: event.lngLat[0]
    }
    setListeMarkers([...listeMarkers, coordinates]);
  }

  const CustomMarker = ({index, marker}) => {
    return (
      <Marker latitude={marker.latitude} longitude={marker.longitude}>
          <div className="marker temporary-marker"><span><b>{index + 1}</b></span></div>
      </Marker>
  )};


  useEffect(() => {
    if (mapContainer.current) {
      const mapInstance = mapContainer.current.getMap();
      if (mapInstance) {
        mapInstance.addControl(
          new MapboxGlLanguage({
            defaultLanguage: "fr",
          })
        );
      }
    }
  }, [mapContainer]);
  
  return (
    <div>
      <ReactMapGL
        mapboxApiAccessToken={MAPBOX_TOKEN}
        {...viewport}
        width="100vw"
        height="100vh"
        onViewportChange={(viewport) => setViewport(viewport)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onClick={addMarker}
        ref={mapContainer}
      >
        {
          listeMarkers.map((marker, index) => {
            return <React.Fragment key={index}>
              <CustomMarker index={index} marker={marker}/>
            </React.Fragment>
          })
        }
      </ReactMapGL>
    </div>
  );
}
export default App;