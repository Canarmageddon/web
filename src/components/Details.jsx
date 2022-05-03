import { useState } from "react";
import { usePoi, useRoute } from "../context/TravelContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPen } from "@fortawesome/free-solid-svg-icons";
import { deleteStep } from "../apiCaller";
import Dropdown from "react-bootstrap/Dropdown";
import { Tabs, Tab } from "react-bootstrap";
import PoiInformation from "../mapHandler/PoiInformation";

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
          <div key={step.id}>
            {" "}
            {step.description}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-triangle-fill"
              viewBox="0 0 16 16"
              onClick={() => handleClick(step.id)}
            >
              <path
                fillRule="evenodd"
                d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z"
              />
            </svg>
            <FontAwesomeIcon
              icon={faTrashAlt}
              onClick={() => handleDeleteStep(step.id)}
              style={{
                backgroundColor: "white",
                color: "#000000",
                marginLeft: 30,
                marginTop: 10,
              }}
            />
            {currentRoute == step.id && (
              <div>
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
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      onClick={() => handleDeleteStep(step.id)}
                      style={{
                        backgroundColor: "white",
                        color: "#000000",
                        marginLeft: 30,
                        marginTop: 10,
                      }}
                    />{" "}
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
