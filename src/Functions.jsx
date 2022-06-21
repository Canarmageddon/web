import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const renderPrevArrow = (prevClickhandler) => {
  return (
    <FontAwesomeIcon
      icon={faChevronLeft}
      onClick={prevClickhandler}
      size={"4x"}
      className="arrow prev-carousel-arrow"
    />
  );
};

export const renderNextArrow = (nextClickhandler) => {
  return (
    <FontAwesomeIcon
      icon={faChevronRight}
      onClick={nextClickhandler}
      size={"4x"}
      className="arrow next-carousel-arrow"
    />
  );
};
