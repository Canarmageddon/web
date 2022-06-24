import "./rotation.css";
import Duck from "./../../resources/duck.png";
export default function () {
  return (
    <div id="centerDiv">
      <img
        id="centeredImage"
        style={{ animation: `spin 3s linear infinite` }}
        src={Duck}
        alt="img"
      />
    </div>
  );
}
