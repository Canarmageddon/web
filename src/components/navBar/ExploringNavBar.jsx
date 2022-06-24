import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import "./nav.css";
import { useNavigate } from "react-router-dom";

const ExploringNavBar = () => {
  const navigate = useNavigate();
  return (
    <FontAwesomeIcon
      className="home-nav-icon"
      icon={faHome}
      size="2x"
      onClick={() => navigate("/home/trips")}
    />
  );
};

export default ExploringNavBar;
