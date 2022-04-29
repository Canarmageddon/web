import React, { useContext, useState } from "react";
import LayerUtile from "../factory/layers/LayerUtile";
import TaskListUtile from "../factory/lists/TaskListUtile";
const TravelContext = React.createContext();
const PoiContext = React.createContext();
const RouteContext = React.createContext();
const TaskListContext = React.createContext();
export function useTravel() {
  return useContext(TravelContext);
}

export function usePoi() {
  return useContext(PoiContext);
}

export function useRoute() {
  return useContext(RouteContext);
}

export function useTaskList() {
  return useContext(TaskListContext)
}
export function TravelProvider({ children }) {
  const [travel, setTravel] = useState(null);
  const [poiSource, setPoiSource] = useState(new LayerUtile());
  const [routeSource, setRouteSource] = useState(new LayerUtile());
  const [TaskLists, setTaskLists] = useState([]);
  return (
    <TravelContext.Provider value={[travel, setTravel]}>
      <PoiContext.Provider value={[poiSource, setPoiSource]}>
        <RouteContext.Provider value={[routeSource, setRouteSource]}>
          <TaskListContext.Provider value={[TaskLists, setTaskLists]}>
            {children}
          </TaskListContext.Provider>
        </RouteContext.Provider>
      </PoiContext.Provider>
    </TravelContext.Provider>
  );
}
