import React from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getLogBookEntries, getPictures } from "../apiCaller";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import ScreenLogo from "../components/loadingScreen/ScreenLogo";
import { useToken } from "../context/userContext";
import LogBookEntry from "./LogBookEntry";
import Picture from "./Picture";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./album.css";

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
    return <ScreenLogo />;
  }

  const renderPrevArrow = (prevClickhandler) => {
    return (
      <FontAwesomeIcon
        icon={faChevronLeft}
        onClick={prevClickhandler}
        size={"4x"}
        className="arrow prev-carousel-arrow"
      />
    );
  };

  const renderNextArrow = (nextClickhandler) => {
    return (
      <FontAwesomeIcon
        icon={faChevronRight}
        onClick={nextClickhandler}
        size={"4x"}
        className="arrow next-carousel-arrow"
      />
    );
  };

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
          {dataPictures.map((image, index) => (
            <div className="carousel-item">
              <Picture id={image.id} key={index} />
              {dataLogBook[index] && (
                <p className="pic-legend">{dataLogBook[index]?.content}</p>
              )}
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}
