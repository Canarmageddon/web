import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { deleteStep, getDocumentsFromStep, updateStep } from "../apiCaller";
import { useMutation } from "react-query";
import { useRoute } from "../context/TravelContext";
import { useToken } from "../context/userContext";
import FileUploader from "./FileUploader";
import TrashAlt from "../components/icons/TrashAlt";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';

export default function ({ display, stepId, setContentPage, setMovingStep }) {
  const { t } = useTranslation('translation', { "keyPrefix": "step_info" });
  const [routeSource, setRouteSource] = useRoute();
  const [token] = useToken();
  const [description, setDescription] = useState("");
  const [currentRoute, setCurrentRoute] = useState();
  const [file, setFile] = useState([]);
  const successEdit = () => toast.success(t("step_updated"));
  const mutationUpdateStep = useMutation(updateStep, {
    onMutate: () => {
      currentRoute.description = description;
      setRouteSource(routeSource.updateItem(currentRoute));
    },

    onSettled: () => {
      successEdit();
    },
  });
  useEffect(() => {
    setCurrentRoute(routeSource.getItemById(stepId));
    setDescription(
      routeSource.getItemById(stepId)?.description
        ? routeSource.getItemById(stepId).description
        : ""
    );
  }, [routeSource, stepId]);
  const handleClick = async () => {
    mutationUpdateStep.mutate({
      token,
      id: currentRoute.id,
      description: description,
    });
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
            {t("move")}
          </Button>
        </div>
      </Form>
    </div>
  );
}
