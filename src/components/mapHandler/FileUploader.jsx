import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap/";
import { addDocument, deleteDocument, getDocument } from "../../apiCaller";
import { useToken, useUser } from "../../context/userContext";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import TrashAlt from "../../components/icons/TrashAlt";
import { useTranslation } from "react-i18next";
export default function FileUploader({
  file,
  setFile,
  mapElement,
  getDocumentFromElement,
}) {
  const { t } = useTranslation("translation", { keyPrefix: "file_uploader" });
  const [token] = useToken();
  const queryClient = useQueryClient();
  const [user] = useUser();
  const handleUpload = (file) => {
    setFile(file);
  };
  const {
    isLoading,
    isError,
    error,
    data: dataDocuments,
  } = useQuery(
    ["document", mapElement?.id],
    () => getDocumentFromElement(token, mapElement.id),
    {
      enabled: mapElement != undefined,
    }
  );
  const mutationAddDocument = useMutation(addDocument, {
    onMutate: (data) => {},
    onSuccess: () => {
      toast.success(t("added_document"));
    },
    onError: () => {
      toast.error(t("not_added_document"));
    },
    onSettled: (data) => {
      setFile([]);
      queryClient.invalidateQueries(["document", mapElement.id]);
    },
  });
  const mutationDeleteDocument = useMutation(deleteDocument, {
    onMutate: (data) => {
      const oldData = queryClient.getQueryData(["document", mapElement.id]);
      queryClient.setQueryData(["document", mapElement.id], () =>
        oldData.filter((element) => element.id != mapElement.id)
      );
      return { oldData };
    },
    onSuccess: () => {
      toast.success(t("deleted_document"));
    },
    onError: () => {
      toast.error();
    },
    onSettled: (data) => {
      queryClient.invalidateQueries(["document", mapElement.id]);
    },
  });

  const handleDelete = (e, id) => {
    mutationDeleteDocument.mutate({ token, id });
  };

  if (isLoading || isError || dataDocuments == undefined) return <></>;
  return (
    <>
      {dataDocuments.map((document) => (
        <div key={document.id}>
          {document.name}
          <FontAwesomeIcon
            icon={faDownload}
            size="2x"
            style={{
              cursor: "pointer",
              backgroundColor: "white",
              color: "#dc3545",
              marginLeft: 30,
              marginTop: 10,
            }}
            onClick={() => getDocument(token, document.id, document.name)}
          />
          {TrashAlt(handleDelete, document.id)}
        </div>
      ))}
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>{t("add_file")}</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => handleUpload(e.target.files[0])}
        />
        <Button
          type="button"
          onClick={() =>
            mutationAddDocument.mutate({
              token,
              file,
              creator: parseInt(user),
              mapElement: mapElement.id,
              name: file.name,
            })
          }
          style={{ marginTop: 10 }}
        >
          {t("validate_file")}
        </Button>
      </Form.Group>
    </>
  );
}
