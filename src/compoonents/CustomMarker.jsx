import React from "react";
import { Marker } from "react-map-gl";

const CustomMarker = ({ index, marker }) => {
  return (
    <Marker latitude={marker.latitude} longitude={marker.longitude}>
      <div className="marker temporary-marker">
        <span>
          <b>{index + 1}</b>
        </span>
      </div>
    </Marker>
  );
};

export default CustomMarker;
