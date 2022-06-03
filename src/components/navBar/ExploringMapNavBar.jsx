import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faAdd, faHome } from "@fortawesome/free-solid-svg-icons";
import "../../style/nav.css";
import { useNavigate } from "react-router-dom";

const ExploringMapNavBar = () => {
    const navigate = useNavigate()
    return (
        <>
            <div
                className="d-flex justify-content-between bg-primary nav"
                style={{ height: "fit-content" }}
            >
                <FontAwesomeIcon
                    className="p-2 nav-icon"
                    icon={faBackward}
                    size="2x"
                    onClick={() => navigate(-1)}
                />
                <FontAwesomeIcon
                    className="p-2 nav-icon"
                    icon={faHome}
                    size="2x"
                    onClick={() => navigate("/home/trips")}
                />
                <FontAwesomeIcon className="p-2 nav-icon" icon={faAdd} size="2x" />
            </div>
        </>
    );
};

export default ExploringMapNavBar;
