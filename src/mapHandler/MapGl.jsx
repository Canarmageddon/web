import ReactMapGL, { Layer, Source } from "react-map-gl";
import { useState, useEffect } from "react";
import LayerUtile from "./layers/LayerUtile";
import Location from "./layers/Location";
import LocationHandler from "./LocationHandler";
import { fetchPointOfInterest, fetchStep } from "../apiCaller";
export default function MapGl({ typeLocation }) {
    const [poiSource, setPoiSource] = useState(
        new LayerUtile()
    );
    const [routeSource, setRouteSource] = useState(
        new LayerUtile()
    );
    useEffect(async () => {
        const poi = await fetchPointOfInterest();
        const step = await fetchStep();
        let lstPoi = []
        let lstStep = [];
        poi.map(item => lstPoi.push(new Location(item.id, item.description, item.location.longitude, item.location.latitude)));
        step.map((item) => lstStep.push(new Location(item.id, item.description, item.location.longitude, item.location.latitude)));
        setPoiSource(new LayerUtile(lstPoi));
        setRouteSource(new LayerUtile(lstStep));
    }, [])

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
            "circle-radius": 4,
            "circle-stroke-width": 2,
            "circle-stroke-color": "#ffffff",
        },
    }
    const routeLayer = {
        id: "theRoute",
        type: "line",

        paint: {
            "line-color": "#000000",
            "line-opacity": 1,
            "line-width": 4,
            "line-blur": 0.5,
        },
    }
    const [viewport, setViewport] = useState({
        latitude: 48.85837,
        longitude: 2.294481,
        zoom: 7,
        bearing: 0,
        pitch: 0,

    });
    const handleClick = (e) => {
        if (e.features[0] != undefined) {
            if (e.features[0].source === typeLocation) {
                if (typeLocation === "poi") {
                    setPoiSource(poiSource.removeItem(e.features[0].id))
                }
                else {
                    setRouteSource(routeSource.removeItem(e.features[0].id))
                }
                return
            }
        }
        if (typeLocation === "poi") {
            setPoiSource(poiSource.addItem(new Location(poiSource.newId, "", e.lngLat[0], e.lngLat[1])))
        }
        else {
            setRouteSource(routeSource.addItem(new Location(routeSource.newId, "", e.lngLat[0], e.lngLat[1])))
        }
    }
    return <ReactMapGL
        mapboxApiAccessToken={
            process.env.REACT_APP_MAPBOX_TOKEN
        }
        width="100%"
        height="100%"
        {...viewport}
        onViewportChange={(viewport) => setViewport(viewport)}
        mapStyle="mapbox://styles/mapbox/streets-v11"

        onClick={(e) => handleClick(e)}
    >
        <Source id="poi" type="geojson" data={poiSource.templateSource} >
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
    </ReactMapGL >
}