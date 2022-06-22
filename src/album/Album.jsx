import React from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getLogBookEntries, getPictures } from "../apiCaller";
import ScreenLogo from "../components/loadingScreen/ScreenLogo";
import { useToken } from "../context/userContext";
import LogBookEntry from "./LogBookEntry";
import Picture from "./Picture";
import { renderNextArrow, renderPrevArrow } from "../Functions";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./album.css";
import RotatingDuck from "../components/loadingScreen/RotatingDuck";

export default function Album() {
  const { id, link, idAlbum } = useParams();
  const [token] = useToken();
  const { data: dataLogBook, status: statusLogBook } = useQuery(
    ["album", idAlbum],
    () => getLogBookEntries(token, idAlbum),
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    }
  );

  const { data: dataPictures, status: statusPictures } = useQuery(
    ["pictures", idAlbum],
    () => getPictures(token, idAlbum),
    {
      // getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    }
  );

  if (
    statusLogBook === "loading" ||
    statusPictures === "loading" ||
    statusLogBook === "error" ||
    statusPictures === "error"
  ) {
    return <RotatingDuck />;
  }

  return (
    <>
      <div className="album-container">
        {dataPictures.length > 0 ? (
          <Carousel
            showStatus={false}
            showIndicators={false}
            renderArrowNext={renderNextArrow}
            renderArrowPrev={renderPrevArrow}
            showThumbs={false}
            style={{ width: "100%" }}
          >
            {dataPictures.map((image, index) => (
              <div className="carousel-item">
                <Picture id={image.id} key={index} width={"25vw"} />
                {dataLogBook[index] && (
                  <p className="pic-legend">{dataLogBook[index]?.content}</p>
                )}
              </div>
            ))}
          </Carousel>
        ) : (
          <p className="warning-missing">
            Aucunes photos enregitrées dans ce voyage
          </p>
        )}
      </div>
    </>
  );
}
