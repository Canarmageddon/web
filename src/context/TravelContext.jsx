import React, { useContext, useState } from "react";
import LayerUtile from "../factory/layers/LayerUtile";
import TaskListUtile from "../factory/lists/TaskListUtile";
const TravelContext = React.createContext();
const PoiContext = React.createContext();
const LocationContext = React.createContext();
const RouteContext = React.createContext();
const TaskListContext = React.createContext();
export function useTravel() {
  return useContext(TravelContext);
}

export function usePoi() {
  return useContext(PoiContext);
}

export function useLocation() {
  return useContext(LocationContext);
}

export function useRoute() {
  return useContext(RouteContext);
}

export function useTaskList() {
  return useContext(TaskListContext);
}
export function TravelProvider({ children }) {
  const [travel, setTravel] = useState(null);
  const [poiSource, setPoiSource] = useState(new LayerUtile());
  const [locationSource, setLocationSource] = useState(new LayerUtile());
  const [routeSource, setRouteSource] = useState(new LayerUtile());
  const [taskLists, setTaskLists] = useState([]);
  return (
    <TravelContext.Provider value={[travel, setTravel]}>
      <PoiContext.Provider value={[poiSource, setPoiSource]}>
        <LocationContext.Provider value={[locationSource, setLocationSource]}>
          <RouteContext.Provider value={[routeSource, setRouteSource]}>
            <TaskListContext.Provider value={[taskLists, setTaskLists]}>
              {children}
            </TaskListContext.Provider>
          </RouteContext.Provider>
        </LocationContext.Provider>
      </PoiContext.Provider>
    </TravelContext.Provider>
  );
}
