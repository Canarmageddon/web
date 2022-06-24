import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAlbum } from "../../apiCaller";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { faGlobeAsia } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import "./home.css";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function () {
  const { t } = useTranslation("translation", {
    keyPrefix: "unregistered_home",
  });
  const navigate = useNavigate();
  const { id, link } = useParams();
  const { isLoading, isError, data } = useQuery(["album", id], () =>
    getAlbum(id)
  );
  const emptyAlbum = () => toast.warning(t("empty_album"));
  return (
    <>
      {!isError && !isLoading && (
        <div className="home-container">
          <Button
            className="home-button"
            style={{ marginRight: 40 }}
            onClick={() => {
              navigate(`/unregistered/${id}/${link}/map`);
            }}
          >
            Afficher la carte
            <FontAwesomeIcon
              className="home-icon"
              icon={faGlobeAsia}
              size={"3x"}
            />
          </Button>
          <Button
            className="home-button"
            style={{ marginLeft: 40 }}
            onClick={() => {
              if (data.albumElements.length > 1)
                navigate(`/unregistered/${id}/${link}/album/${data.id}`);
              else emptyAlbum();
            }}
          >
            Afficher l'album
            <FontAwesomeIcon
              className="home-icon"
              icon={faImages}
              size={"3x"}
            />
          </Button>
        </div>
      )}
    </>
  );
}
