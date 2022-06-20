import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function ({ show, handleSubmit, handleClose, name, setName }) {
    const { t } = useTranslation("translation", { keyPrefix: "trip_list" });

    return <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
            <Modal.Title>{t("new_trip")}</Modal.Title>
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
}