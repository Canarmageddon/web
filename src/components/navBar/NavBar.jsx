import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../../style/nav.css";
import LanguageModal from "../LanguageModal";

const NavBar = ({ setShowMenu }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="nav" style={{ height: "5vh" }}>
        <FontAwesomeIcon
          className="nav-icon bars-icon"
          icon={faBars}
          size="2x"
          onClick={() => {
            setShowMenu((oldValue) => !oldValue);
          }}
        />
        <FontAwesomeIcon
          className="nav-icon"
          onClick={() => setShowModal(true)}
          icon={faGlobe}
          size={"2x"}
        />
        <FontAwesomeIcon
          className="nav-icon"
          icon={faUser}
          size="2x"
          onClick={() => navigate("/home/profile")}
          style={{ cursor: "pointer" }}
        />
        <LanguageModal showModal={showModal} setShowModal={setShowModal} />
      </div>
    </>
  );
};

export default NavBar;
