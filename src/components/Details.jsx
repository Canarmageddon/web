import { useState } from "react";
import { usePoi, useRoute } from "../context/TravelContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { deleteStep, deletePoi } from "../apiCaller";
import TrashAlt from "./icons/TrashAlt";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useToken } from "../context/userContext";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Dropdown from "react-bootstrap/Dropdown";
import "./details.css";

export default function ({ display, setContentPage, setStepId, setPoiId }) {
  const { t } = useTranslation("translation");
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
      toast.warning(t("map.step_not_deleted"));
    },
    onSuccess: (data) => {
      toast.warning(t("map.step_deleted"));
    },
    onSettled: (data) => {
      queryClient.invalidateQueries(["steps", id]);
    },
  });

  const mutationDeletePoi = useMutation(deletePoi, {
    onMutate: (data) => {
      setCurrentPoi(poi.getPoiByStep(data.id));
    },
    onSettled: (data) => {
      queryClient.invalidateQueries(["steps", id]);
      queryClient.invalidateQueries(["poi", id]);
      //setCurrentPoi(poi.getPoiByStep(id));

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
    e.stopPropagation()
    mutationDeletePoi.mutate({ token, id })
    //setPoi(poi.removeItem({ token, id }));
  };
  return (
    <div
      style={{
        display: display ? "flex" : "none",
      }}
      className="locations-container"
    >
      {route.listLocations.map((step) => {
        return (
          <div
            key={step.id}
            onClick={() => handleClick(step.id)}
            className="location-item"
          >
            <div className="step-info">
              <p style={{ minWidth: 200 }}>{step.description ?? "-"}</p>
              <FontAwesomeIcon
                icon={faPen}
                onClick={() => {
                  setStepId(step.id);
                  setContentPage("stepInfo");
                }}
                size="2x"
                className="edit-icon"
              />
              {TrashAlt(handleDeleteStep, step.id)}
            </div>
            {currentRoute == step.id && (
              <div>
                <Dropdown.Divider
                  style={{ backgroundColor: "black", height: 4 }}
                />
                <h4 className="location-poi-title">
                  {t("linked_poi")}
                </h4>
                {currentPoi.map((e) => (
                  <>
                    <div className="location-poi-info">
                      <p>{e.title ?? "-"}</p>
                      <FontAwesomeIcon
                        icon={faPen}
                        onClick={() => {
                          setPoiId(e.id);
                          setContentPage("poiInfo");
                        }}
                        className="edit-icon"
                      />
                      {TrashAlt(handleDeletePoi, e.id)}
                    </div>
                    <Dropdown.Divider
                      style={{ backgroundColor: "black", height: 4 }}
                    />
                  </>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
