import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { usePoi, useRoute } from "../context/TravelContext";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "../style/destinationInput.css";
import { deletePoi, updatePoi } from "../apiCaller";
import FileUploader from "./FileUploader";
const PoiInformation = ({ display, poiId, setContentPage }) => {
  const [poi, setpoi] = usePoi();
  const [routeSource, setRouteSource] = useRoute();
  const [currentPoi, setCurrentPoi] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lstFile, setLstFile] = useState([]);
  const [selectedStep, setSelectedStep] = useState("");
  useEffect(() => {
    setCurrentPoi(poi.getItemById(poiId));
  }, [poi, poiId]);
  useEffect(() => {
    setTitle(currentPoi?.title ? currentPoi.title : "");
    setDescription(currentPoi?.description ? currentPoi.description : "");
    setSelectedStep(currentPoi?.step ? currentPoi.step : "");
  }, [currentPoi]);

  const handleClick = async () => {
    currentPoi.title = title;
    currentPoi.description = description;
    currentPoi.step = selectedStep;
    setpoi(poi.updateItem(currentPoi));
    setContentPage("map");
    updatePoi(currentPoi.id, title, description, selectedStep);
  };

  const handleDelete = async () => {
    setpoi(poi.removeItem(poiId));
    setContentPage("map");
    await deletePoi(poiId);
  };
  const handleChange = (e) => {
    setSelectedStep(e.target.value);
  };
  return (
    <div
      style={{
        display: display ? "block" : "none",
        flex: 0.3,
        textAlign: "center",
      }}
    >
      <h2>Détails du point d'intérêt</h2>
      <Form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Form.Control
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
        <FileUploader setLstFile={setLstFile} />
        Associer à une étape
        <select value={selectedStep} onChange={(e) => handleChange(e)}>
          <option value={null}></option>
          {routeSource.listLocations.map((step) => {
            return (
              <option key={step.id} value={step.id}>
                {step.description}
              </option>
            );
          })}
        </select>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button type="button" onClick={handleClick} style={{ marginTop: 10 }}>
            Enregistrer
          </Button>
          <FontAwesomeIcon
            icon={faTrashAlt}
            size="2x"
            onClick={handleDelete}
            style={{
              backgroundColor: "white",
              color: "#dc3545",
              marginLeft: 30,
              marginTop: 10,
            }}
          />
        </div>
      </Form>
    </div>
  );
};

export default PoiInformation;
