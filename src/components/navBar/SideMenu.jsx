import React from "react";
import "../../style/nav.css";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { usePoi, useRoute } from "../../context/TravelContext";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const SideMenu = ({ setContentPage, showMenu }) => {
  const { t } = useTranslation("translation", { keyPrefix: "side_menu" });

  const [poiSource] = usePoi();
  const [routeSource] = useRoute();
  const [user, setUser] = useUser();
  const navigate = useNavigate();

  const logout = () => {
    setContentPage();
    window.localStorage.clear();
    setUser(undefined);
  };

  const handleClickDetails = () => {
    console.log(poiSource);
    console.log(routeSource);
    if (
      poiSource?.listLocations?.length === 0 &&
      routeSource?.listLocations?.length === 0
    ) {
      toast.warning("Créez d'abord un point d'intérêt ou une étape");
    } else {
      setContentPage("details");
    }
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
      <a onClick={handleClickDetails}>{t("details")}</a>
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
