import React, { useState, useEffect } from "react";
import { useLocation } from "../context/TravelContext";
import "../style/destinationInput.css";
import { useTranslation } from "react-i18next";
import Picture from "../album/Picture";
import LogBookEntry from "../album/LogBookEntry";
import "./locationInformation.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { renderNextArrow, renderPrevArrow } from "../Functions";

const LocationInformation = ({ display, locationId }) => {
  const { t } = useTranslation("translation", { keyPrefix: "location_info" });

  const [location] = useLocation();
  const [currentLocation, setCurrentLocation] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState([]);
  const [selectedStep, setSelectedStep] = useState("");

  useEffect(() => {
    setCurrentLocation(location.getItemById(locationId));
  }, [location, locationId]);

  useEffect(() => {
    setTitle(currentLocation?.title ? currentLocation.title : "");
    setDescription(
      currentLocation?.description ? currentLocation.description : ""
    );
    setSelectedStep(currentLocation?.step ? currentLocation.step : "");
  }, [currentLocation]);

  let pictures = [];
  let logBooks = [];
  console.log(currentLocation);
  currentLocation?.albumElements.map((element, index) => {
    if (element.type2 === "picture") {
      pictures.push(element);
    } else if (element.type2 === "log_book_entry") {
      logBooks.push(element);
    }
  });
  return (
    <div
      style={{
        display: display ? "block" : "none",
        flex: 0.4,
      }}
      className="loc-info-container"
    >
      <h2>{t("location_details")}</h2>
      <div className="location-info">
        <Carousel
          showStatus={false}
          showIndicators={false}
          renderArrowNext={renderNextArrow}
          renderArrowPrev={renderPrevArrow}
          showThumbs={false}
        >
          {pictures?.map((element, index) => (
            <div className="carousel-item" key={index}>
              <Picture id={element.id} width={"20vw"} />
            </div>
          ))}
        </Carousel>

        <h3 style={{ marginTop: 20 }}>Entrées du journal</h3>
        {logBooks?.map((element, index) => (
          <LogBookEntry
            key={index}
            author={element?.creator}
            date={element?.creationDate}
            text={element?.content}
          />
        ))}
      </div>
    </div>
  );
};

export default LocationInformation;
