import React from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getLogBookEntries, getPictures, getAlbumElements } from "../apiCaller";
import ScreenLogo from "../components/loadingScreen/ScreenLogo";
import { useToken } from "../context/userContext";
import LogBookEntry from "./LogBookEntry";
import Picture from "./Picture";
import { renderNextArrow, renderPrevArrow } from "../Functions";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./album.css";
import RotatingDuck from "../components/loadingScreen/RotatingDuck";
import { logBookEntries } from "../mapHandler/queries/Fetchs";

export default function Album() {
  const { id, link, idAlbum } = useParams();
  const [token] = useToken();

  const { data: albumData, status: dataStatus } = useQuery(
    ["albumData", idAlbum],
    () => getAlbumElements(token, idAlbum),
    {
      // getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    }
  );

  if (dataStatus === "loading" || dataStatus === "error" || !albumData) {
    return <RotatingDuck />;
  }

  return (
    <>
      <div className="album-container">
        <Carousel
          showStatus={false}
          showIndicators={false}
          renderArrowNext={renderNextArrow}
          renderArrowPrev={renderPrevArrow}
          showThumbs={false}
          style={{ width: "100%" }}
        >
          {albumData?.map((data, index) =>
            data.type2 === "picture" ? (
              <div className="carousel-item" key={index}>
                <Picture id={data.id} width={"25vw"} />
              </div>
            ) : data.type2 === "log_book_entry" ? (
              <div className="logbook-item" key={index}>
                <p>{data.creator ?? "-"}</p>
                <p>{data.content ?? "-"}</p>
                <p>
                  {new Date(data?.creationDate).toLocaleDateString() ?? "-"}
                </p>
              </div>
            ) : (
              <></>
            )
          )}
        </Carousel>
      </div>
    </>
  );
}
