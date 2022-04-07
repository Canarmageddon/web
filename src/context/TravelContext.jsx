import React, { useContext, useState } from "react";
import LayerUtile from "../factory/layers/LayerUtile";
const TravelContext = React.createContext();
const PoiContext = React.createContext();

export function useTravel() {
  return useContext(TravelContext);
}

export function usePoi() {
  return useContext(PoiContext);
}

export function TravelProvider({ children }) {
  const [travel, setTravel] = useState(null);
  const [poiSource, setPoiSource] = useState(new LayerUtile());
  return (
    <TravelContext.Provider value={[travel, setTravel]}>
      <PoiContext.Provider value={[poiSource, setPoiSource]}>
        {children}
      </PoiContext.Provider>
    </TravelContext.Provider>
  );
}
