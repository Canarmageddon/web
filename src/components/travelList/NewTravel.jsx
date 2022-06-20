import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormControl from "react-bootstrap/FormControl";
import { useState } from "react";
import { createTrip } from "../../apiCaller";
import { useMutation, useQueryClient } from "react-query";
import { useToken, useUser } from "../../context/userContext";
import { useTranslation } from "react-i18next";
export default function ({ lstTrips, setLstTrips }) {
  const { t } = useTranslation("translation", { keyPrefix: "new_trip" });
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const handleClose = () => setShow(false);
  const queryClient = useQueryClient();
  const [token] = useToken();
  const [user] = useUser();
  const handleShow = () => {
    setName("");
    setShow(true);
  };
  const mutationNewTrip = useMutation(createTrip, {
    onMutate: (data) => {
      setShow(false);
      setName("");
      const oldData = queryClient.getQueryData("trips");
      queryClient.setQueryData("trips", (old) => [
        ...old,
        { name: data.name, steps: [], pointOfInterests: [], id: null },
      ]);
      return { oldData };
    },
    onSettled: () => {
      queryClient.invalidateQueries("trips");
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    mutationNewTrip.mutate({ token, name, user });
  };
  return (
    <>
      <Button onClick={handleShow} style={{ marginLeft: 20 }}>
        {t("btn_new_trip")}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("new_trip")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="name" style={{ fontSize: 14 }}>
              {t("trip_name")}
            </label>
            <FormControl
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button type="submit" style={{ marginTop: 5 }}>
              {t("btn_new_trip")}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
