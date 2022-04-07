import React from "react";
import "../../style/nav.css";

const SideMenu = ({ setContentPage, showMenu }) => {
  return (
    <div className="sidenav" style={{ width: showMenu ? 200 : 0 }}>
      <a onClick={() => setContentPage("map")}>Carte</a>
      <a onClick={() => setContentPage("toDoLists")}>Listes de tâches</a>
      <a onClick={() => setContentPage("admin")}>Administration</a>
    </div>
  );
};

export default SideMenu;
