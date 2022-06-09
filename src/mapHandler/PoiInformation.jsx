import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { usePoi, useRoute } from "../context/TravelContext";
import Form from "react-bootstrap/Form";
import "../style/destinationInput.css";
import { deletePoi, getDocumentsFromPoi, updatePoi } from "../apiCaller";
import FileUploader from "./FileUploader";
import TrashAlt from "../components/icons/TrashAlt";
import { useMutation, useQueryClient } from "react-query";
import { useToken } from "../context/userContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const PoiInformation = ({ display, poiId, setContentPage, setMovingPoi }) => {
  const successDelete = () => toast.info("Point d'intérêt supprimé");

  const [poi, setpoi] = usePoi();
  const [routeSource, setRouteSource] = useRoute();
  const [currentPoi, setCurrentPoi] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState([]);
  const [selectedStep, setSelectedStep] = useState("");
  const queryCLient = useQueryClient();
  const [token] = useToken();
  const { id } = useParams();
  useEffect(() => {
    setCurrentPoi(poi.getItemById(poiId));
  }, [poi, poiId]);
  useEffect(() => {
    setTitle(currentPoi?.title ? currentPoi.title : "");
    setDescription(currentPoi?.description ? currentPoi.description : "");
    setSelectedStep(currentPoi?.step ? currentPoi.step : "");
  }, [currentPoi]);

  const handleClick = async () => {
    mutationUpdatePoi.mutate({
      token,
      id: currentPoi.id,
      title,
      description,
      step: selectedStep,
    });
  };
  const mutationUpdatePoi = useMutation(updatePoi, {
    onMutate: () => {
      currentPoi.title = title;
      currentPoi.description = description;
      currentPoi.step = selectedStep;
      setpoi(poi.updateItem(currentPoi));
      setContentPage("map");
    },
    onSettled: () => {
      queryCLient.invalidateQueries(["poi", id]);
    },
  });
  const mutationDeletePoi = useMutation(deletePoi, {
    onMutate: () => {
      setpoi(poi.removeItem(poiId));
      setContentPage("map");
    },
    onSettled: (data) => {
      queryCLient.invalidateQueries(["poi", id]);
      successDelete();
    },
  });

  const handleDelete = async () => {
    mutationDeletePoi.mutate({ token, id: currentPoi.id });
  };
  const handleChange = (e) => {
    setSelectedStep(e.target.value);
  };
  return (
    <div
      style={{
        display: display ? "block" : "none",
        flex: 0.4,
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
        <FileUploader
          file={file}
          setFile={setFile}
          mapElement={currentPoi}
          getDocumentFromElement={getDocumentsFromPoi}
        />
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
          {TrashAlt(handleDelete)}
          <Button
            type="button"
            onClick={() => setMovingPoi(currentPoi.id)}
            style={{ marginTop: 10 }}
          >
            Déplacer
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PoiInformation;
