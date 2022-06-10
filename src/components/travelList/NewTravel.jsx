import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { createTrip } from "../../apiCaller";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { useToken, useUser } from "../../context/userContext";
import { useTranslation } from 'react-i18next';
export default function ({ lstTrips, setLstTrips }) {
  const { t } = useTranslation('translation', { "keyPrefix": "new_trip" });
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const handleClose = () => setShow(false);
  const queryClient = useQueryClient()
  const [token] = useToken()
  const [user] = useUser()
  const handleShow = () => {
    setName("");
    setShow(true);
  };
  const mutationNewTrip = useMutation(createTrip, {
    onMutate: (data) => {
      setShow(false);
      setName("");
      const oldData = queryClient.getQueryData("trips")
      queryClient.setQueryData("trips", old => [...old, { name: data.name }])
      return { oldData }

    },
    onSettled: () => {
      queryClient.invalidateQueries("trips")
    },
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    mutationNewTrip.mutate({ token, name, user })
  };
  return (
    <>
      <button className="button-new" onClick={handleShow}>
        {t("btn_new_trip")}
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>t{("new_trip")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label>
              {t("trip_name")}
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <input type="submit" value={t("create")} />
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
