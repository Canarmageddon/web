import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAlbum } from "../apiCaller";
import "./home.css";

export default function () {
  const navigate = useNavigate();
  const { id, link } = useParams();
  const { isLoading, isError, data } = useQuery(["album", id], () =>
    getAlbum(id)
  );

  return (
    <>
      {!isError && !isLoading && (
        <div className="home-container">
          <button onClick={() => navigate(`/unregistered/${id}/${link}/map`)}>
            Afficher la carte
          </button>
          <button
            onClick={() =>
              navigate(`/unregistered/${id}/${link}/album/${data.id}`)
            }
          >
            Afficher l'album
          </button>
        </div>
      )}
    </>
  );
}
