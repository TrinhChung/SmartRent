import React from "react";
import { Map, Marker } from "@vis.gl/react-google-maps";

const Home = () => {
  const position = { lat: 53.54992, lng: 10.00678 };
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Map
        center={position}
        zoom={10}
        mapId={process.env.REACT_APP_MAP_ID}
      ></Map>
    </div>
  );
};

export default Home;
