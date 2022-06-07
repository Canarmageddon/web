import { Form } from "react-bootstrap/";
import { addDocument, deleteDocument, getDocument } from "../apiCaller";
import { useToken, useUser } from "../context/userContext";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
export default function FileUploader({
  file,
  setFile,
  mapElement,
  getDocumentFromElement,
}) {
  const [token] = useToken();
  const queryClient = useQueryClient()
  const [user] = useUser();
  const handleUpload = (file) => {
    setFile(file);
  };
  const { isLoading, isError, error, data: dataDocuments } = useQuery(["documents", mapElement?.id], () =>
    getDocumentFromElement(token, mapElement.id),
    {
      enabled: mapElement != undefined
    }
  )
  const mutationAddDocument = useMutation(addDocument, {
    onMutate: (data) => {
      console.log(data)
    },
    onSettled: (data) => {
      setFile([])
      toast.success("document ajouté")
      queryClient.invalidateQueries(["document", mapElement.id])
    }
  });
  const mutationDeleteDocument = useMutation(deleteDocument, {
    onMutate: (data) => {
      const oldData = queryClient.getQueryData(["document", mapElement.id])
      queryClient.setQueryData(["document", mapElement.id], (old) => old.filter(element => element.id != mapElement.id))
      return { oldData }
    },
    onSettled: (data) => {
      toast.success("document supprimé")
      queryClient.invalidateQueries(["document", mapElement.id])
    }
  });

  if (isLoading || isError) return <></>
  return (
    <>
      {dataDocuments.map((document) => (
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
            onClick={() => mutationDeleteDocument.mutate({ token, id: document.id })}
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
            mutationAddDocument.mutate({ token, file, creator: parseInt(user), mapElement: mapElement.id, name: file.name })
          }
          style={{ marginTop: 10 }}
        >
          Valider ce fichier
        </Button>
      </Form.Group>
    </>
  );
}
