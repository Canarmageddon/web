import React from "react";
import Modal from "react-bootstrap/Modal";
import franceFlag from "../resources/franceFlag.png";
import ukFlag from "../resources/ukFlag.png";
import { FlagImg } from "./styledComponents/LanguageStyle";
import { useTranslation } from "react-i18next";
import i18n from "../translation/i18n";

const LanguageModal = ({ showModal, setShowModal }) => {
  const { t } = useTranslation("translation", {
    keyPrefix: "language_selection",
  });
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{t("choose_language")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <FlagImg
            selected={i18n.language === "fr" || i18n.language === "fr-FR"}
            src={franceFlag}
            alt="Drapeau français"
            onClick={() => i18n.changeLanguage("fr")}
          />
          <FlagImg
            selected={i18n.language === "en"}
            src={ukFlag}
            alt="Drapeau anglais"
            onClick={() => i18n.changeLanguage("en")}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default LanguageModal;
