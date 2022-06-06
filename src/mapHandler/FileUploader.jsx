import { Form } from "react-bootstrap/";
import { addDocument, deleteDocument, getDocument } from "../apiCaller";
import { useToken, useUser } from "../context/userContext";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

export default function FileUploader({
  file,
  setFile,
  mapElement,
  getDocumentFromElement,
}) {
  const [lstDocuments, setLstDocuments] = useState([]);
  const [token] = useToken();
  useEffect(async () => {
    if (mapElement != undefined) {
      setLstDocuments(await getDocumentFromElement(token, mapElement.id));
    }
  }, [mapElement]);
  const [user] = useUser();
  const handleUpload = (file) => {
    setFile(file);
  };
  return (
    <>
      {lstDocuments.map((document) => (
        <div key={document.id}>
          {document.name}
          <FontAwesomeIcon
            icon={faDownload}
            size="2x"
            style={{
              backgroundColor: "white",
              color: "#dc3545",
              marginLeft: 30,
              marginTop: 10,
            }}
            onClick={() => getDocument(token, document.id, document.name)}
          />
          <FontAwesomeIcon
            icon={faTrashAlt}
            size="2x"
            style={{
              backgroundColor: "white",
              color: "#dc3545",
              marginLeft: 30,
              marginTop: 10,
            }}
            onClick={() => deleteDocument(token, document.id)}
          />
        </div>
      ))}
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Ajoutez un fichier</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => handleUpload(e.target.files[0])}
        />
        <Button
          type="button"
          onClick={() =>
            addDocument(token, file, parseInt(user), mapElement.id, file.name)
          }
          style={{ marginTop: 10 }}
        >
          Valider ce fichier
        </Button>
      </Form.Group>
    </>
  );
}
