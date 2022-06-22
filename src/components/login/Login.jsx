import React, { useState } from "react";
import "./connection.css";
import { Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { useUser } from "../../context/userContext";
import { checkCredentials } from "../../apiCaller";
import { useToken } from "../../context/userContext";
import updateToken from "../../updateTokens";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { validateEmail } from "../../Functions";
import imgLoader from "../../resources/images/loader-blue.svg";
import { useTranslation } from "react-i18next";
import LanguageModal from "../LanguageModal";

const Login = () => {
  const { t } = useTranslation("translation", { keyPrefix: "login" });
  const invalidEmail = () => toast.warning(t("invalid_email"));
  const noPassword = () => toast.warning(t("no_password"));
  const credentialsError = () => toast.error(t("credentials_error"));
  const successLog = () => toast.success(t("success_log"));
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useToken();
  const [user] = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLockIcon, setShowLockIcon] = useState(true);
  const [showUserIcon, setShowUserIcon] = useState(true);
  const [isCheckingCredentials, setIsCheckingCredentials] = useState(false);
  const queryClient = useQueryClient();

  if (user != "" && user != null) {
    return <Navigate to="/home/trips" replace={true} />;
  }

  return (
    <>
      <FontAwesomeIcon
        onClick={() => setShowModal(true)}
        icon={faGlobe}
        className="language-icon"
        size={"3x"}
      />
      <h1 className="h1-title">Duck-Trotter</h1>
      <form className="form-connection">
        <div className="input-container">
          <label htmlFor="email" className="input-label">
            E-mail
          </label>
          <FormControl
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && checkConnexionInfo()}
            onFocus={() => setShowUserIcon(false)}
            onBlur={() => setShowUserIcon(true)}
            type="text"
          />
          {showUserIcon && email === "" && (
            <FontAwesomeIcon icon={faUser} className="input-icon" />
          )}
        </div>
        <div className="input-container">
          <label htmlFor="password" className="input-label">
            {t("mdp")}
          </label>
          <FormControl
            type="password"
            name="password"
            value={password}
            onFocus={() => setShowLockIcon(false)}
            onBlur={() => setShowLockIcon(true)}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && checkConnexionInfo()}
          />
          {showLockIcon && password === "" && (
            <FontAwesomeIcon icon={faLock} className="input-icon" />
          )}
        </div>
        <div style={{ width: "100%" }}>
          <Button
            type="button"
            size="sm"
            onClick={checkConnexionInfo}
            className="button"
          >
            {t("se_connecter")}
          </Button>
          {isCheckingCredentials && <img src={imgLoader} className="loader" />}
          <Button
            type="button"
            size="sm"
            onClick={() => {
              navigate("/signup");
            }}
            variant="secondary"
            className="button"
          >
            {t("creer_compte")}
          </Button>
        </div>
      </form>
      <LanguageModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );

  async function checkConnexionInfo() {
    if (!validateEmail(email)) {
      invalidEmail();
    } else if (!password) {
      noPassword();
    } else {
      try {
        setIsCheckingCredentials(true);
        const tokens = await checkCredentials(email, password);
        successLog();
        await updateToken({
          setToken,
          token: tokens.token,
          refresh_token: tokens.refresh_token,
        });
        queryClient.invalidateQueries("whoami");
      } catch (error) {
        credentialsError();
      }
      setIsCheckingCredentials(false);
    }
  }
};

export default Login;
