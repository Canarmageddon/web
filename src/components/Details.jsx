import { useState } from "react";
import { usePoi, useRoute } from "../context/TravelContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPen } from "@fortawesome/free-solid-svg-icons";
import { deleteStep } from "../apiCaller";
import Dropdown from "react-bootstrap/Dropdown";
import { Tabs, Tab } from "react-bootstrap";
import PoiInformation from "../mapHandler/PoiInformation";
import TrashAlt from "./icons/TrashAlt";

export default function ({ display, setContentPage }) {
  const [poi, setPoi] = usePoi();
  const [route, setRoute] = useRoute();
  const [currentPoi, setCurrentPoi] = useState([]);
  const [currentRoute, setCurrentRoute] = useState(null);
  const handleClick = (id) => {
    if (currentRoute == id) {
      setCurrentRoute(null);
      return;
    }
    setCurrentPoi(poi.getPoiByStep(id));
    setCurrentRoute(id);
  };
  const handleDeleteStep = async (id) => {
    setRoute(route.removeItem(id));
    //await deleteStep(id)
  };
  const handleDeletePoi = async (id) => {
    setPoi(poi.removeItem(id));
    await deletePoi(id);
  };
  return (
    <div
      style={{
        display: display ? "block" : "none",
        flex: 1,
      }}
    >
      {route.listLocations.map((step) => {
        return (
          <div
            key={step.id}
            onClick={() => handleClick(step.id)}
            style={{ cursor: "pointer" }}
          >
            {" "}
            {step.description}
            <FontAwesomeIcon
              icon={faPen}
              onClick={() => setContentPage("stepInfo")}
              style={{
                backgroundColor: "white",
                color: "#000000",
                marginLeft: 30,
                marginTop: 10,
              }}
            />
            {TrashAlt(handleDeleteStep, step.id)}
            {currentRoute == step.id && (
              <div style={{ marginLeft: "2rem" }}>
                {currentPoi.map((e) => (
                  <div
                    style={{ display: "flex", flexDirection: "row" }}
                    key={e.id}
                  >
                    {" "}
                    <p>{e.description}</p>
                    <FontAwesomeIcon
                      icon={faPen}
                      onClick={() => setContentPage("poiInfo")}
                      style={{
                        backgroundColor: "white",
                        color: "#000000",
                        marginLeft: 30,
                        marginTop: 10,
                      }}
                    />

                    {TrashAlt(handleDeletePoi, e.id)}
                  </div>
                ))}
              </div>
            )}
            <Dropdown.Divider
              style={{ backgroundColor: "#0096ff", height: 4 }}
            />
          </div>
        );
      })}
    </div>
  );
}
