import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useTranslation } from 'react-i18next';

const LocationFinder = ({ typeLocation, setTypeLocation, setEditing }) => {
  const { t } = useTranslation("translation");
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
            label={switchChecked ? t("editing") : t("reading")}
            onChange={(e) => setSwitchChecked(e.target.checked)}
          />
          <Form>
            <div key="radio">
              <Form.Check
                type="radio"
                name="group1"
                checked={"route" == typeLocation}
                value="route"
                label={(t("step"))}
                onChange={(e) => setTypeLocation(e.target.value)}
              />
              <Form.Check
                type="radio"
                name="group1"
                checked={"poi" == typeLocation}
                value="poi"
                label={t("poi")}
                onChange={(e) => setTypeLocation(e.target.value)}
              />
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
export default LocationFinder;
