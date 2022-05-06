import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { deleteStep } from "../apiCaller";
import { useRoute } from "../context/TravelContext";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import FileUploader from "./FileUploader";

export default function ({ display, stepId, setContentPage }) {
    const [routeSource, setRouteSource] = useRoute();
    const [description, setDescription] = useState("");
    const [currentRoute, setCurrentRoute] = useState();
    const [lstFile, setLstFile] = useState([]);

    useEffect(() => {
        setDescription(currentRoute?.title ? currentRoute.title : "")
    }, [currentRoute])

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
        console.log(res)
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
                <FileUploader setLstFile={setLstFile} />
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
}