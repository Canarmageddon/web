import "./rotation.css"
export default function () {
    return <div id="centerDiv">
        <img id="centeredImage" style={{ animation: `spin 3s linear infinite` }} src={process.env.PUBLIC_URL + "/duck.png"} alt="img" />
    </div>
}