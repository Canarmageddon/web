import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export function updateToken({ setToken, token, refresh_token }) {
  window.localStorage.setItem("token", token);
  window.localStorage.setItem("refresh_token", refresh_token);
  setToken(function () {
    return token;
  });
}

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

export const generateLink = (id, link) =>
  `${window.location.hostname}:${location.port}/unregistered/${id}/${link}/home`;

export function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

export function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
  var earthRadiusKm = 6371;

  var dLat = degreesToRadians(lat2 - lat1);
  var dLon = degreesToRadians(lon2 - lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}
