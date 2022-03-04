import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import "../../style/nav.css";

const NavBar = ({ setShowMenu }) => {
  return (
    <>
      <div className="d-flex justify-content-between bg-primary nav">
        <FontAwesomeIcon
          className="p-2 nav-icon"
          icon={faBars}
          size="2x"
          onClick={() => setShowMenu((oldValue) => !oldValue)}
        />
        <FontAwesomeIcon className="p-2 nav-icon" icon={faUser} size="2x" />
      </div>
    </>
  );
};

export default NavBar;
