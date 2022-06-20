import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAlbum } from "../apiCaller";
export default function () {
  const navigate = useNavigate();
  const { id, link } = useParams();
  const { isLoading, isError, data } = useQuery(["album", id], () =>
    getAlbum(id)
  );
  return (
    <>
      {!isError && !isLoading && (
        <>
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
        </>
      )}
    </>
  );
}
