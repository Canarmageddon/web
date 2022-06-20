import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faAdd, faHome } from "@fortawesome/free-solid-svg-icons";
import "../../style/nav.css";
import { useNavigate } from "react-router-dom";

const UnregisteredNavBar = () => {
    const navigate = useNavigate();
    return (
        <>
            <div>
                <FontAwesomeIcon
                    className="home-nav-icon bg-primary"
                    icon={faBackward}
                    size="2x"
                    onClick={() => navigate(-1)}
                />
            </div>
        </>
    );
};

export default UnregisteredNavBar;
