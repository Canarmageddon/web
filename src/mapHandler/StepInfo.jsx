import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { deleteStep, getDocumentsFromStep, updatePoi } from "../apiCaller";
import { useRoute } from "../context/TravelContext";
import FileUploader from "./FileUploader";
import TrashAlt from "../components/icons/TrashAlt";
import { toast } from "react-toastify";

export default function ({ display, stepId, setContentPage, setMovingStep }) {
  const successDelete = () => toast.info("Etape supprimée");

  const [routeSource, setRouteSource] = useRoute();
  const [description, setDescription] = useState("");
  const [currentRoute, setCurrentRoute] = useState();
  const [file, setFile] = useState([]);

  useEffect(() => {
    setCurrentRoute(routeSource.getItemById(stepId));
    setDescription(
      routeSource.getItemById(stepId)?.title
        ? routeSource.getItemById(stepId).title
        : ""
    );
  }, [routeSource, stepId]);
  const handleClick = async () => {
    currentRoute.description = description;
    setRouteSource(routeSource.updateItem(currentRoute));
    setContentPage("map");
    updatePoi(currentRoute.id, description);
  };
  const handleDelete = async () => {
    setRouteSource(routeSource.removeItem(stepId));
    setContentPage("map");
    let res = await deleteStep(stepId);
    successDelete();
  };
  return (
    <div
      style={{
        display: display ? "block" : "none",
        flex: 0.4,
        textAlign: "center",
      }}
    >
      <h2>Détails de l'étape</h2>
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
          placeholder="Description"
          value={description}
          className="mb-3"
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "70%", marginLeft: 10 }}
        />
        <FileUploader
          file={file}
          setFile={setFile}
          mapElement={currentRoute}
          getDocumentFromElement={getDocumentsFromStep}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button type="button" onClick={handleClick} style={{ marginTop: 10 }}>
            Enregistrer
          </Button>
          {TrashAlt(handleDelete)}
          <Button
            type="button"
            onClick={() => setMovingStep(currentRoute.id)}
            style={{ marginTop: 10 }}
          >
            Déplacer
          </Button>
        </div>
      </Form>
    </div>
  );
}
