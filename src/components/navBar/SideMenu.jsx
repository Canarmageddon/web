import React from "react";
import "../../style/nav.css";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import Button from "react-bootstrap/Button";

const SideMenu = ({ setContentPage, showMenu }) => {
  const [user, setUser] = useUser();
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.clear();
    setUser(undefined);
  };

  return (
    <div className="sidenav" style={{ width: showMenu ? 200 : 0 }}>
      <FontAwesomeIcon
        icon={faArrowLeft}
        onClick={() => navigate("/trips")}
        size="2x"
        style={{
          color: "red",
          marginLeft: 30,
          marginTop: 10,
        }}
      />
      <a onClick={() => setContentPage("map")}>Carte</a>
      <a onClick={() => setContentPage("toDoLists")}>Listes de tâches</a>
      <a onClick={() => setContentPage("admin")}>Administration</a>
      <a onClick={() => setContentPage("details")}>Details</a>
      <Button
        variant="danger"
        onClick={logout}
        style={{ position: "absolute", bottom: 5, left: 38 }}
      >
        Déconnexion
      </Button>
    </div>
  );
};

export default SideMenu;
