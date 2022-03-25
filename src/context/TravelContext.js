import React, { useContext, useState } from "react";
const TravelContext = React.createContext();

export function useTravel() {
  return useContext(TravelContext);
}
export function TravelProvider({ children }) {
  const [travel, setTravel] = useState(null);
  return (
    <TravelContext.Provider value={[travel, setTravel]}>
      {children}
    </TravelContext.Provider>
  );
}
