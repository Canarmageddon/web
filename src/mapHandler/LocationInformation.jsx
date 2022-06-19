import React, { useState, useEffect } from "react";
import { useLocation } from "../context/TravelContext";
import Form from "react-bootstrap/Form";
import "../style/destinationInput.css";
import FileUploader from "./FileUploader";
import { useTranslation } from "react-i18next";

const LocationInformation = ({ display, locationId }) => {
  const { t } = useTranslation("translation", { keyPrefix: "location_info" });

  const [location] = useLocation();
  const [currentLocation, setCurrentLocation] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState([]);
  const [selectedStep, setSelectedStep] = useState("");

  useEffect(() => {
    setCurrentLocation(location.getItemById(locationId));
  }, [location, locationId]);

  useEffect(() => {
    setTitle(currentLocation?.title ? currentLocation.title : "");
    setDescription(
      currentLocation?.description ? currentLocation.description : ""
    );
    setSelectedStep(currentLocation?.step ? currentLocation.step : "");
  }, [currentLocation]);
  console.log(currentLocation);
  return (
    <div
      style={{
        display: display ? "block" : "none",
        flex: 0.4,
        textAlign: "center",
      }}
    >
      <h2>{t("location_details")}</h2>
      <Form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        {/* <Form.Control
          type="text"
          placeholder="Titre"
          value={title}
          className="mb-3"
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "70%", marginLeft: 10 }}
        />
        <Form.Control
          type="text"
          placeholder="Commentaire"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "70%", marginLeft: 10 }}
        />
        <FileUploader
          file={file}
          setFile={setFile}
          mapElement={currentLocation}
          getDocumentFromElement={getDocumentsFromLocation}
        />
        {t("associate_step")} */}
      </Form>
    </div>
  );
};

export default LocationInformation;
