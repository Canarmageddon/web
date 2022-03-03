import React from "react";
import "../../style/nav.css";

const SideMenu = ({ setContentPage, showMenu }) => {
  return (
    <div className="sidenav" style={{ width: showMenu ? 250 : 0 }}>
      <a onClick={() => setContentPage("map")}>Carte</a>
      <a onClick={() => setContentPage("toDoLists")}>Listes de tâches</a>
    </div>
  );
};

export default SideMenu;
