import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import "./nav.css";
import { useNavigate } from "react-router-dom";

const UnregisteredNavBar = ({ setContentPage, map }) => {
  const navigate = useNavigate();
  return (
    <>
      <FontAwesomeIcon
        className={
          map
            ? "back-arrow-unregistered map-icon"
            : "back-arrow-unregistered album-icon"
        }
        icon={faBackward}
        size="2x"
        onClick={() => {
          setContentPage();
          navigate(-1);
        }}
      />
    </>
  );
};

export default UnregisteredNavBar;
