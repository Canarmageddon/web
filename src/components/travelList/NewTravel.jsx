import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { createTrip } from "../../apiCaller";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
export default function ({ lstTrips, setLstTrips }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const handleClose = () => setShow(false);
  const queryClient = useQueryClient()
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
    mutationNewTrip.mutate({ token, name })
    /*     const newTrip = await createTrip(name);
        setLstTrips([
          ...lstTrips,
          {
            id: newTrip.id,
            name: newTrip.name,
            start: newTrip.travels[0]?.start?.name,
            end: newTrip.travels[newTrip.travels.length - 1]?.end?.name,
          },
        ]); */
  };
  return (
    <>
      <button className="button-new" onClick={handleShow}>
        Nouveau voyage
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Créez un nouveau voyage</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label>
              Nom du voyage
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <input type="submit" value="Créer" />
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
