import ReactMapGL, { Layer, Source } from "react-map-gl";
import { useState, useEffect } from "react";
import { usePoi, useRoute } from "../context/TravelContext";
import Location from "../factory/layers/Location";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { createPoi, createStep, movePoi, moveStep } from "../apiCaller";
import { createRef } from "react";
import mapboxgl from "mapbox-gl";
import { useParams } from "react-router-dom";
import { pictures, pois, steps } from "./queries/Fetchs";
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
import LocationFinder from "./LocationFinder";
import { useUser, useToken } from "../context/userContext";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import ImageModal from "./ImageModal";
export default function MapGl({
  setContentPage,
  contentPage,
  setPoiId,
  setStepId,
  movingPoi,
  setMovingPoi,
  movingStep,
  setMovingStep,
  exploring = false,
}) {
  const poiSuccess = () => toast.success("Point d'intérêt créé !");
  const stepSuccess = () => toast.success("Etape créée !");
  const successPoiMoved = () => toast.info("Point d'intérêt déplacé");
  const successStepMoved = () => toast.info("Etape déplacée");

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const [user] = useUser();
  const [poiSource, setPoiSource] = usePoi();
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

  const {
    isLoading: isLoadingSteps,
    isError: isErrorSteps,
    error: errorSteps,
    data: dataSteps,
  } = steps(token, id, setRouteSource);

  const {
    isLoading: isLoadingPoi,
    isError: isErrorPoi,
    error: errorPoi,
    data: dataPoi,
  } = pois(token, id, setPoiSource);
  const [imageList, setImageList] = useState([]);
  const {
    isLoading: isLoadingPictures,
    isError: isErrorPictures,
    data: dataPictures,
  } = pictures(token, id, setImageList, exploring);

  const mutationStep = useMutation(createStep, {
    onMutate: (data) => {
      setRouteSource(
        routeSource.addItem(
          new Location(data.id, "", "", data.longitude, data.latitude)
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
      setContentPage("stepInfo");
      setStepId(data.id);
    },
  });
  const mutationPoi = useMutation(createPoi, {
    onMutate: (data) => {
      setPoiSource(
        poiSource.addItem(
          new Location(data.id, "", "", data.longitude, data.latitude)
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
      setRouteSource(routeSource.updateItem(step));
      setMovingStep(null);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["steps", id]);
      successStepMoved();
    },
  });

  useEffect(async () => {
    const map = _mapRef.current.getMap();
    map.loadImage("http://placekitten.com/50/50", (error, image) => {
      if (error) throw error;
      // Add the loaded image to the style's sprite with the ID 'poiImage'.
      map.addImage("poiImage", image);
    });
    map.loadImage("http://placekitten.com/50/50", (error, image) => {
      if (error) throw error;
      // Add the loaded image to the style's sprite with the ID 'poiImage'.
      map.addImage("stepImage", image);
    });
  }, []);

  const handleClick = async (e) => {
    if (exploring) {
      console.log(exploring);
      if (e.features[0].source === "images") {
        setCurrentImage(e.features[0].id);
        setShow(true);
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
      console.log(contentPage);
      if (!displayMapElement(e)) {
        setContentPage("map");
      }
      return;
    }

    if (!editing) {
      console.log("a");
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
    },
  };
  const imageLayer = {
    id: "images",
    type: "symbol",
    layout: {
      "icon-image": "stepImage", // reference the image
      "icon-size": 0.25,
    },
  };

  const routeLayer2 = {
    id: "route2",
    type: "symbol",
    layout: {
      "icon-image": "stepImage", // reference the image
      "icon-size": 0.25,
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
  console.log(!isLoadingPictures, !isErrorPictures, exploring);
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
        {!isLoadingPoi && !isErrorPoi && (
          <Source id="poi" type="geojson" data={poiSource.templateSource}>
            <Layer {...poiLayer} />
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
        {!isLoadingPictures && !isErrorPictures && exploring && (
          <Source id="images" type="geojson" data={imageList}>
            <Layer {...imageLayer} />
          </Source>
        )}
      </ReactMapGL>
      <ImageModal id={currentImage} show={show} setShow={setShow} />
    </>
  );
}
