import ReactMapGL, { Layer, Source } from "react-map-gl";
import { useState, useEffect } from "react";
import LayerUtile from "../factory/layers/LayerUtile";
import { usePoi, useRoute } from "../context/TravelContext";
import Location from "../factory/layers/Location";
import User from "../factory/User";
import Task from "../factory/lists/Task";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext"
import {
  fetchTripById,
  createPoi,
  createStep,
  movePoi,
  moveStep
} from "../apiCaller";
import { createRef } from "react";
import mapboxgl from "mapbox-gl";
import { useParams } from "react-router-dom";
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
import LocationFinder from "./LocationFinder";
import TaskListUtile from "../factory/lists/TaskListUtile";
import { useTaskList } from "../context/TravelContext";
export default function MapGl({
  setContentPage,
  contentPage,
  setPoiId,
  setStepId,
  setTravelers,
  movingPoi,
  setMovingPoi,
  movingStep,
  setMovingStep,
  exploring
}) {
  const [user] = useUser();
  const navigate = useNavigate()
  const [redirect, setRedirect] = useState(false)
  const [poiSource, setPoiSource] = usePoi();
  const [routeSource, setRouteSource] = useRoute();
  const [editing, setEditing] = useState(true);
  const [typeLocation, setTypeLocation] = useState("route");
  const [taskList, setTaskList] = useTaskList();
  const [height, setHeight] = useState("100%");
  const [width, setWidth] = useState("100%");
  const [viewport, setViewport] = useState({
    latitude: 48.85837,
    longitude: 2.294481,
    zoom: 7,
    bearing: 0,
    pitch: 0,
  });
  const { id } = useParams();
  const _mapRef = createRef();
  useEffect(() => {
    const map = _mapRef.current.getMap();
    map.loadImage(
      "http://placekitten.com/50/50",
      (error, image) => {
        if (error) throw error;
        // Add the loaded image to the style's sprite with the ID 'poiImage'.
        map.addImage("poiImage", image);
      }
    );
    map.loadImage("http://placekitten.com/50/50", (error, image) => {
      if (error) throw error;
      // Add the loaded image to the style's sprite with the ID 'poiImage'.
      map.addImage("stepImage", image);
    });
  }, []);
  useEffect(async () => {
    const tripData = await fetchTripById(id);
    if (tripData == -1) {
      setRedirect(true)
    }
    const user = tripData.travelers;
    const poi = tripData.pointsOfInterest;
    const step = tripData.steps;
    const todoLists = tripData.toDoLists;
    //const poi = await fetchPointOfInterest();
    //const step = await fetchStep();
    let lstUser = [];
    let lstPoi = [];
    let lstStep = [];
    let lstTodoList = [];
    window.addEventListener("resize", () => {
      setWidth("100%");
      setHeight("100%");
    });

    user?.map((item) => {
      lstUser.push(new User(item.id, item.firstname, item.name, item.email));
    });
    poi?.map((item) => {
      lstPoi.push(
        new Location(
          item.id,
          item.description,
          item.title,
          item.location.longitude,
          item.location.latitude,
          item?.step?.id
        )
      );
    });
    step?.map((item) =>
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
    todoLists?.map((taskList) => {
      let tasks = [];
      //  let tasks = new TaskList(taskList.id, taskList.name);
      taskList?.tasks?.map((item) => {
        tasks.push(
          new Task(
            item.id,
            item.creator,
            item.name,
            item.description,
            new Date(item.date).toLocaleDateString()
          )
        );
      });
      lstTodoList.push(new TaskListUtile(taskList?.id, taskList?.name, tasks));
    });
    setTaskList(lstTodoList);
    if (!exploring) setTravelers(lstUser);
    setPoiSource(new LayerUtile(lstPoi));
    setRouteSource(new LayerUtile(lstStep));
    setViewport({
      latitude: lstStep[lstStep.length - 1]?.latitude,
      longitude: lstStep[lstStep.length - 1]?.longitude,
      zoom: 7,
      bearing: 0,
      pitch: 0,
    });
  }, []);
  const handleClick = async (e) => {
    if (exploring) return
    if (movingPoi != null) {
      movePoi(movingPoi, e.lngLat[1], e.lngLat[0])
      setMovingPoi(null);
      return
    }
    if (movingStep != null) {
      moveStep(movingStep, e.lngLat[1], e.lngLat[0])
      setMovingStep(null);
      return
    }
    if (!editing) {
      if (e.features[0] != undefined) {
        if (e.features[0].source === typeLocation) {
          if (typeLocation === "poi") {
            setContentPage("poiInfo");
            setPoiId(e.features[0].id);
          } else {
            //TODO(Gautier) Show Route details
            setContentPage("stepInfo");
            setStepId(e.features[0].id);
            //            setRouteSource(routeSource.removeItem(e.features[0].id));
          }
          return;
        }
      }
      setContentPage("map");
      return;
    }
    if (contentPage === "poiInfo") {
      setContentPage("map");
    } else if (typeLocation === "poi") {
      let newPoi = await createPoi(e.lngLat[1], e.lngLat[0], id, user);
      setPoiSource(
        poiSource.addItem(
          new Location(
            newPoi.id,
            "",
            "",
            newPoi.location.longitude,
            newPoi.location.latitude
          )
        )
      );
    } else {
      let newStep = await createStep(e.lngLat[1], e.lngLat[0], id, user);
      setRouteSource(
        routeSource.addItem(
          new Location(
            routeSource.newId,
            "",
            "",
            newStep.location.longitude,
            newStep.location.latitude
          )
        )
      );
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
  if (redirect) navigate("/")
  return (
    <>
      {!exploring && <LocationFinder
        typeLocation={typeLocation}
        setTypeLocation={setTypeLocation}
        setEditing={setEditing}
      />}
      <ReactMapGL
        ref={_mapRef}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        height={height}
        width={width}
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
