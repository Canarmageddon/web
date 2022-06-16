import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../../style/nav.css";

const NavBar = ({ setShowMenu }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="d-flex justify-content-between bg-primary nav"
        style={{ height: "fit-content" }}
      >
        <FontAwesomeIcon
          className="p-2 nav-icon"
          icon={faBars}
          size="2x"
          onClick={() => { setShowMenu((oldValue) => !oldValue) }}
        />
         <FontAwesomeIcon className="p-2 nav-icon" icon={faUser} size="2x"
          onClick={() => navigate("/home/profile")}
          style={{cursor: "pointer"}}
        />
      </div>
    </>
  );
};

export default NavBar;
