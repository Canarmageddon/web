import React, { useEffect, useState } from "react";
import DestinationInput from "./DestinationInput";
import Form from "react-bootstrap/Form";

const LocationFinder = ({ typeLocation, setTypeLocation, setEditing }) => {
  const [switchChecked, setSwitchChecked] = useState(false);
  useEffect(() => {
    setEditing(switchChecked);
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
            label={switchChecked ? "Edition" : "Lecture"}
            onChange={(e) => setSwitchChecked(e.target.checked)}
          />
          <Form>
            <div key="radio">
              <Form.Check type="radio" name="group1" checked={"route" == typeLocation}
                value="route" label="Étape" onChange={(e) => setTypeLocation(e.target.value)} />
              <Form.Check type="radio" name="group1" checked={"poi" == typeLocation}
                value="poi" label="Point d'intérêt" onChange={(e) => setTypeLocation(e.target.value)} />
            </div>
          </Form>


        </div>
        <DestinationInput />
      </div>
    </>
  );
};
export default LocationFinder;
