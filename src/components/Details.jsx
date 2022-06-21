import { useState } from "react";
import { usePoi, useRoute } from "../context/TravelContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { deleteStep, deletePoi } from "../apiCaller";
import Dropdown from "react-bootstrap/Dropdown";
import TrashAlt from "./icons/TrashAlt";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useToken } from "../context/userContext";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function ({ display, setContentPage }) {
  const { t } = useTranslation("translation", { keyPrefix: "map" });
  const [token] = useToken();
  const { id } = useParams();
  const [poi, setPoi] = usePoi();
  const [route, setRoute] = useRoute();
  const [currentPoi, setCurrentPoi] = useState([]);
  const [currentRoute, setCurrentRoute] = useState(null);
  const queryClient = useQueryClient();
  const mutationDeleteStep = useMutation(deleteStep, {
    onMutate: (data) => {
      setRoute(route.removeItem(data.id));
    },
    onError: (data) => {
      toast.warning(t("step_not_deleted"))
    },
    onSuccess: (data) => {
      toast.warning(t("step_deleted"))
    },
    onSettled: (data) => {
      queryClient.invalidateQueries(["steps", id]);
    },
  });
  const mutationDeletePoi = useMutation(deletePoi, {
    onMutate: (data) => {
      setRoute(poi.removeItem(data.id));
    },
    onSettled: (data) => {
      queryClient.invalidateQueries(["poi", id]);
    },
  });
  const handleClick = (id) => {
    if (currentRoute == id) {
      setCurrentRoute(null);
      return;
    }
    setCurrentPoi(poi.getPoiByStep(id));
    setCurrentRoute(id);
  };
  const handleDeleteStep = async (e, id) => {
    mutationDeleteStep.mutate({ token, id });
    //await deleteStep(id)
  };
  const handleDeletePoi = async (e, id) => {
    setPoi(poi.removeItem({ token, id }));
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
