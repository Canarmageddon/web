import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormControl from "react-bootstrap/FormControl";

export default function ({ show, handleSubmit, handleClose, name, setName }) {
  const { t } = useTranslation("translation", { keyPrefix: "trip_list" });

  return (
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
            {t("create")}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
