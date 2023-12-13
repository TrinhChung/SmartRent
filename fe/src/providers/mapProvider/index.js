import React from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { createContext } from "react";

export const MapContext = createContext();

const MapProvider = ({ children }) => {
  const { isLoaded } = useJsApiLoader({
    mapIds: process.env.REACT_APP_MAP_ID,
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    libraries: ["drawing", "places"],
  });

  return (
    <MapContext.Provider
      value={{
        isLoaded,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export default MapProvider;
