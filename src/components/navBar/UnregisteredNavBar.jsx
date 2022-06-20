import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import "../../style/nav.css";
import { useNavigate } from "react-router-dom";

const UnregisteredNavBar = ({ setContentPage }) => {
  const navigate = useNavigate();
  return (
    <>
      <FontAwesomeIcon
        className="back-arrow-unregistered"
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
