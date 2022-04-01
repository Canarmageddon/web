import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { usePoi } from "../context/TravelContext";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "../style/destinationInput.css";

const PoiInformation = ({ display, poiId, setContentPage }) => {
  const [poiSource, setPoiSource] = usePoi();
  const [currentPoi, setCurrentPoi] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setCurrentPoi(poiSource.getItemById(poiId));
  }, [poiSource, poiId]);

  useEffect(() => {
    setTitle(currentPoi?.title ? currentPoi.title : "");
    setDescription(currentPoi?.description ? currentPoi.description : "");
  }, [currentPoi]);

  const handleClick = () => {
    currentPoi.title = title;
    currentPoi.description = description;
    setPoiSource(poiSource.updateItem(currentPoi));
    setContentPage("map");
  };

  const handleDelete = () => {
    setPoiSource(poiSource.removeItem(poiId));
    setContentPage("map");
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
