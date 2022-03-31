import React, { useEffect, useState } from "react";
import DestinationInput from "./DestinationInput";
import Form from "react-bootstrap/Form";

const LocationFinder = ({ setTypeLocation }) => {
  const [switchChecked, setSwitchChecked] = useState(false);

  useEffect(() => {
    setTypeLocation(switchChecked ? "route" : "poi");
  }, [switchChecked]);

  return (
    <>
      <div
        style={{
          alignItems: "center",
          position: "absolute",
          left: 10,
          top: 10,
          zIndex: 1,
          padding: 12,
          backgroundColor: "rgb(255,255,255)",
          borderRadius: 8,
        }}
      >
        <div>
          <Form.Check
            type="switch"
            value={switchChecked}
            label={switchChecked ? "Étape" : "Point d'intérêt"}
            onChange={(e) => setSwitchChecked(e.target.checked)}
          />
        </div>
        <DestinationInput />
      </div>
    </>
  );
};
export default LocationFinder;
