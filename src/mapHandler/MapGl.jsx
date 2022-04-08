import ReactMapGL, { Layer, Source } from "react-map-gl";
import { useState, useEffect } from "react";
import LayerUtile from "../factory/layers/LayerUtile";
import { usePoi } from "../context/TravelContext";
import Location from "../factory/layers/Location";
import { useTravel } from "../context/TravelContext";
import { fetchPointOfInterest, fetchStep, fetchTripById } from "../apiCaller";
import mapboxgl from "mapbox-gl";
import { useParams } from "react-router-dom";

mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
import LocationFinder from "./LocationFinder";

export default function MapGl({ setContentPage, contentPage, setPoiId }) {
  const [poiSource, setPoiSource] = usePoi();
  const [routeSource, setRouteSource] = useState(new LayerUtile());
  const [editing, setEditing] = useState(true);
  const [typeLocation, setTypeLocation] = useState("route");
  const [viewport, setViewport] = useState({
    latitude: 48.85837,
    longitude: 2.294481,
    zoom: 7,
    bearing: 0,
    pitch: 0,
  });
  const { id } = useParams();
  const [travel, setTravel] = useTravel();
  useEffect(async () => {
    const a = await fetchTripById(id);
    const poi = a.pointsOfInterest;
    const step = a.steps;
    //const poi = await fetchPointOfInterest();
    //const step = await fetchStep();
    let lstPoi = [];
    let lstStep = [];
    poi.map((item) => {
      lstPoi.push(
        new Location(
          item.id,
          item.description,
          item.title,
          item.location.longitude,
          item.location.latitude
        )
      );
    });
    step.map((item) =>
      lstStep.push(
        new Location(
          item.id,
          item.description,
          "",
          item.location.longitude,
          item.location.latitude
        )
      )
    );
    setPoiSource(new LayerUtile(lstPoi));
    setRouteSource(new LayerUtile(lstStep));
    setViewport({
      latitude: lstStep[lstStep.length - 1].latitude,
      longitude: lstStep[lstStep.length - 1].longitude,
      zoom: 7,
      bearing: 0,
      pitch: 0,
    });
  }, []);
  const handleClick = (e) => {
    if (!editing) return;
    if (e.features[0] != undefined) {
      if (e.features[0].source === typeLocation) {
        if (typeLocation === "poi") {
          setContentPage("poiInfo");
          setPoiId(e.features[0].id);
        } else {
          //TODO(Gautier) Show Route details
          setRouteSource(routeSource.removeItem(e.features[0].id));
        }
        return;
      }
    }
    if (contentPage === "poiInfo") {
      setContentPage("map");
    } else if (typeLocation === "poi") {
      setPoiSource(
        poiSource.addItem(
          new Location(poiSource.newId, "", "", e.lngLat[0], e.lngLat[1])
        )
      );
    } else {
      setRouteSource(
        routeSource.addItem(
          new Location(routeSource.newId, "", "", e.lngLat[0], e.lngLat[1])
        )
      );
    }
  };

  const poiLayer = {
    id: "places",
    type: "circle",
    paint: {
      "circle-color": "#4264fb",
      "circle-radius": 6,
      "circle-stroke-width": 2,
      "circle-stroke-color": "#ffffff",
    },
  };
  const routeLayer2 = {
    id: "route2",
    type: "circle",
    paint: {
      "circle-color": "#000000",
      "circle-opacity": 0,
      "circle-radius": 4,
    },
  };
  const routeLayer = {
    id: "theRoute",
    type: "line",

    paint: {
      "line-color": "#000000",
      "line-opacity": 1,
      "line-width": 4,
      "line-blur": 0.5,
    },
  };

  return (
    <>
      <LocationFinder
        typeLocation={typeLocation}
        setTypeLocation={setTypeLocation}
        setEditing={setEditing}
      />
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        height="100%"
        width="100%"
        {...viewport}
        onViewportChange={(viewport) => setViewport(viewport)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onClick={(e) => handleClick(e)}
      >
        <Source id="poi" type="geojson" data={poiSource.templateSource}>
          <Layer {...poiLayer} />
        </Source>
        {/* 
            on affiche routeSource avec 2 layers parce que on n'a pas
            l'id du point lors du clique avec un layer en ligne
        */}
        <Source id="routeLine" type="geojson" data={routeSource.route}>
          <Layer {...routeLayer} />
        </Source>
        <Source id="route" type="geojson" data={routeSource.templateSource}>
          <Layer {...routeLayer2} />
        </Source>
      </ReactMapGL>
    </>
  );
}
