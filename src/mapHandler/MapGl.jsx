import ReactMapGL, { Layer, Source } from "react-map-gl";
import { useState, useEffect } from "react";
import { useLocation, usePoi, useRoute } from "../context/TravelContext";
import Location from "../factory/layers/Location";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { createPoi, createStep, movePoi, moveStep } from "../apiCaller";
import { createRef } from "react";
import mapboxgl from "mapbox-gl";
import { useParams } from "react-router-dom";
import {
  pictures,
  pois,
  steps,
  locations,
  logBookEntries,
} from "./queries/Fetchs";
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
import LocationFinder from "./LocationFinder";
import { useUser, useToken } from "../context/userContext";
import { toast } from "react-toastify";
import ImageModal from "./ImageModal";
import { useTranslation } from "react-i18next";

export default function MapGl({
  setContentPage,
  contentPage,
  setPoiId,
  setLocationId,
  setStepId,
  movingPoi,
  setMovingPoi,
  movingStep,
  setMovingStep,
  exploring = false,
  displayAlbum = false,
}) {
  const { t } = useTranslation("translation", { keyPrefix: "map" });
  const poiSuccess = () => toast.success(t("poi_created"));
  const stepSuccess = () => toast.success(t("step_created"));
  const successPoiMoved = () => toast.info(t("poi_moved"));
  const successStepMoved = () => toast.info(t("step_moved"));

  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [user] = useUser();
  const [poiSource, setPoiSource] = usePoi();
  const [locationSource, setLocationSource] = useLocation();
  const [routeSource, setRouteSource] = useRoute();
  const [editing, setEditing] = useState(true);
  const [typeLocation, setTypeLocation] = useState("route");
  const [token] = useToken();
  const [currentImage, setCurrentImage] = useState(null);
  const [show, setShow] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 7,
    bearing: 0,
    pitch: 0,
  });
  const { id, link } = useParams();

  const _mapRef = createRef();

  useEffect(() => {
    setContentPage("map");
  }, []);

  const {
    isLoading: isLoadingSteps,
    isError: isErrorSteps,
    error: errorSteps,
    data: dataSteps,
  } = steps(token, id, routeSource, setRouteSource, setViewport);
  const {
    isLoading: isLoadingPoi,
    isError: isErrorPoi,
    error: errorPoi,
    data: dataPoi,
  } = pois(token, id, setPoiSource);

  const {
    isLoading: isLoadingLocation,
    isError: isErrorLocation,
    error: errorLocation,
    data: dataLocation,
  } = locations(token, id, setLocationSource, displayAlbum);

  const [imageList, setImageList] = useState([]);
  /*   const {
      isLoading: isLoadingPictures,
      isError: isErrorPictures,
      data: dataPictures,
    } = pictures(token, selectedLocation, setImageList, exploring); */
  /*   const {
      isLoading: isLoadingLogBook,
      isError: isErrorLogBook,
      data: dataLogBook,
    } = logBookEntries(selectedLocation, exploring); */

  const mutationStep = useMutation(createStep, {
    onMutate: (data) => {
      setRouteSource(
        routeSource.addItem(
          new Location({ id: data.id, longitude: data.longitude, latitude: data.latitude })
        )
      );
      const oldData = queryClient.getQueryData(["steps", id]);
      queryClient.setQueryData(["steps", id], (old) => [
        ...old,
        {
          location: { longitude: data.longitude, latitude: data.latitude },
          id: routeSource.newId,
        },
      ]);
      return { oldData };
    },
    onSettled: (data) => {
      queryClient.invalidateQueries(["steps", id]);
      stepSuccess();
      //setContentPage("stepInfo");
      setStepId(data.id);
    },
  });

  const mutationPoi = useMutation(createPoi, {
    onMutate: (data) => {
      setPoiSource(
        poiSource.addItem(
          new Location({ id: data.id, longitude: data.longitude, latitude: data.latitude, step: data.step })
        )
      );
      const oldData = queryClient.getQueryData(["poi", id]);
      queryClient.setQueryData(["poi", id], (old) => [
        ...old,
        {
          location: { longitude: data.longitude, latitude: data.latitude },
          id: routeSource.newId,
        },
      ]);
      return { oldData };
    },
    onSettled: (data) => {
      queryClient.invalidateQueries(["poi", id]);
      poiSuccess();
      setContentPage("poiInfo");
      setPoiId(data.id);
    },
  });

  const mutationPoiLocation = useMutation(movePoi, {
    onMutate: () => {
      let poi = poiSource.getItemById(data.id);
      poi.longitude = data.longitude;
      poi.latitude = data.latitude;
      setPoiSource(poiSource.updateItem(poi));
      setMovingPoi(null);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["poi", id]);
      successPoiMoved();
    },
  });

  const mutationStepLocation = useMutation(moveStep, {
    onMutate: (data) => {
      let step = routeSource.getItemById(data.id);
      step.longitude = data.longitude;
      step.latitude = data.latitude;
      setRouteSource(routeSource.updateItem(step));
      setMovingStep(null);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["steps", id]);
      successStepMoved();
    },
  });
  useEffect(() => {
    //Sinon la carte risque de rester plus petite lorsqu'on ouvre d'autres fenêtres
    setViewport({ ...viewport, width: "100%", height: "100%" })
  }, [contentPage])

  useEffect(async () => {
    if (dataSteps != undefined) {
      setViewport({
        latitude: dataSteps[dataSteps?.length - 1]?.location?.latitude,
        longitude: dataSteps[dataSteps?.length - 1]?.location?.longitude,
        zoom: 3,
        bearing: 0,
        pitch: 0,
      });
    }
    const map = _mapRef.current.getMap();
    map.loadImage(
      process.env.PUBLIC_URL + "/red_marker.png",
      (error, image) => {
        if (error) throw error;
        // Add the loaded image to the style's sprite with the ID 'poiImage'.
        map.addImage("poiImage", image);
      }
    );
    map.loadImage(
      process.env.PUBLIC_URL + "/blue_marker.png",
      (error, image) => {
        if (error) throw error;
        // Add the loaded image to the style's sprite with the ID 'poiImage'.
        map.addImage("stepImage", image);
      }
    );
    map.loadImage(process.env.PUBLIC_URL + "/3926045.png", (error, image) => {
      if (error) throw error;
      // Add the loaded image to the style's sprite with the ID 'poiImage'.
      map.addImage("locationImage", image);
    });
  }, []);

  const handleClick = async (e) => {
    if (displayAlbum) {
      if (e.features[0].source === "location") {
        setContentPage("locationInfo");
        setLocationId(e.features[0].id);
      }
      else {
        setContentPage("map")
      }
      return;
    }
    if (movingPoi != null) {
      mutationPoiLocation.mutate({
        token,
        id: movingPoi,
        latitude: e.lngLat[1],
        longitude: e.lngLat[0],
      });
      return;
    }
    if (movingStep != null) {
      mutationStepLocation.mutate({
        token,
        id: movingStep,
        latitude: e.lngLat[1],
        longitude: e.lngLat[0],
      });
      return;
    }
    if (contentPage == "poiInfo" || contentPage == "stepInfo") {
      if (!displayMapElement(e)) {
        setContentPage("map");
      }
      return;
    }

    if (!editing) {
      displayMapElement(e);
      return;
    }
    if (editing && !displayMapElement(e)) {
      if (contentPage === "poiInfo") {
        setContentPage("map");
      } else if (typeLocation === "poi") {
        mutationPoi.mutate({
          token,
          latitude: e.lngLat[1],
          longitude: e.lngLat[0],
          id,
          creator: user,
        });
      } else {
        mutationStep.mutate({
          token,
          latitude: e.lngLat[1],
          longitude: e.lngLat[0],
          id,
          creator: user,
        });
      }
    }
  };
  const displayMapElement = (e) => {
    if (e.features[0] != undefined) {
      if (e.features[0].source === "poi") {
        setContentPage("poiInfo");
        setPoiId(e.features[0].id);
        return true;
      } else if (e.features[0].source === "route") {
        setContentPage("stepInfo");
        setStepId(e.features[0].id);
        return true;
      } else if (e.features[0].source === "location") {
        setContentPage("locationInfo");
        setLocationId(e.features[0].id);
        return true;
      }
      return false;
    }
  };

  const poiLayer = {
    id: "places",
    type: "symbol",
    layout: {
      "icon-image": "poiImage", // reference the image
      "icon-size": 0.25,
      "icon-anchor": "bottom",
      "icon-allow-overlap": true,
    },
  };

  const locationLayer = {
    id: "locations",
    type: "symbol",
    layout: {
      "icon-image": "locationImage", // reference the image
      "icon-size": 0.5,
      "icon-anchor": "bottom",
      "icon-allow-overlap": true,
    },
  };

  const routeLayer2 = {
    id: "route2",
    type: "symbol",
    layout: {
      "icon-image": "stepImage", // reference the image
      "icon-size": 0.1,
      "icon-anchor": "bottom",
      "icon-allow-overlap": true,
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
      {!exploring && (
        <LocationFinder
          typeLocation={typeLocation}
          setTypeLocation={setTypeLocation}
          setEditing={setEditing}
        />
      )}
      <ReactMapGL
        ref={_mapRef}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        height={"100%"}
        width={"100%"}
        {...viewport}
        onViewportChange={(viewport) => setViewport(viewport)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onClick={(e) => handleClick(e)}
      >
        {!isLoadingLocation && !isErrorLocation && (
          <Source
            id="location"
            type="geojson"
            data={locationSource.templateSource}
          >
            <Layer {...locationLayer} />
          </Source>
        )}
        {/* 
            on affiche routeSource avec 2 layers parce que on n'a pas
            l'id du point lors du clique avec un layer en ligne
        */}
        {!isLoadingSteps && !isErrorSteps && (
          <>
            <Source id="routeLine" type="geojson" data={routeSource.route}>
              <Layer {...routeLayer} />
            </Source>
            <Source id="route" type="geojson" data={routeSource.templateSource}>
              <Layer {...routeLayer2} />
            </Source>
          </>
        )}
        {!isLoadingPoi && !isErrorPoi && (
          <Source id="poi" type="geojson" data={poiSource.templateSource}>
            <Layer {...poiLayer} />
          </Source>
        )}
      </ReactMapGL>
      <ImageModal id={currentImage} show={show} setShow={setShow} />
    </>
  );
}
