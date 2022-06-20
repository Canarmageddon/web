import React from "react";
import "../../style/nav.css";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
const SideMenu = ({ setContentPage, showMenu }) => {
  const { t } = useTranslation("translation", { keyPrefix: "side_menu" });

  const [user, setUser] = useUser();
  const navigate = useNavigate();

  const logout = () => {
    setContentPage();
    window.localStorage.clear();
    setUser(undefined);
  };

  return (
    <div className="sidenav" style={{ width: showMenu ? 200 : 0 }}>
      <FontAwesomeIcon
        icon={faArrowLeft}
        onClick={() => {
          setContentPage();
          navigate("/trips");
        }}
        size="2x"
        style={{
          color: "red",
          marginLeft: 30,
          marginTop: 10,
        }}
      />
      <a onClick={() => setContentPage("map")}>{t("map")}</a>
      <a onClick={() => setContentPage("toDoLists")}>{t("todo_list")}</a>
      <a onClick={() => setContentPage("admin")}>{t("admin")}</a>
      <a onClick={() => setContentPage("details")}>{t("details")}</a>
      <Button
        variant="danger"
        onClick={logout}
        style={{ position: "absolute", bottom: 5, left: 38 }}
      >
        {t("disconnect")}
      </Button>
    </div>
  );
};

export default SideMenu;
