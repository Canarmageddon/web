import React from "react";
import "../../style/nav.css";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const SideMenu = ({ setContentPage, showMenu }) => {
  const navigate = useNavigate();

  return (
    <div className="sidenav" style={{ width: showMenu ? 200 : 0 }}>
      <a onClick={() => setContentPage("map")}>Carte</a>
      <a onClick={() => setContentPage("toDoLists")}>Listes de tâches</a>
      <a onClick={() => setContentPage("admin")}>Administration</a>
      <a onClick={() => setContentPage("details")}>Details</a>
      <FontAwesomeIcon
        icon={faArrowLeft}
        onClick={() => navigate('/trips')}
        size="2x"
        style={{
          backgroundColor: "white",
          color: "#dc3545",
          marginLeft: 30,
          marginTop: 10,
        }}
      />
    </div>
  );
};

export default SideMenu;
