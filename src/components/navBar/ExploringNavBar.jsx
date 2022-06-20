import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faAdd, faHome } from "@fortawesome/free-solid-svg-icons";
import "../../style/nav.css";
import { useNavigate } from "react-router-dom";

const ExploringNavBar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <FontAwesomeIcon
          className="home-nav-icon bg-primary"
          icon={faHome}
          size="2x"
          onClick={() => navigate("/home/trips")}
        />
      </div>
    </>
  );
};

export default ExploringNavBar;
