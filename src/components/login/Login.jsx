import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
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
import { useTranslation } from 'react-i18next';
import i18next from "i18next";
import i18n from "../../translation/i18n";
const Login = () => {
  const { t } = useTranslation('translation', { "keyPrefix": "login" });
  const invalidEmail = () =>
    toast.warning(t("invalid_email"));
  const noPassword = () => toast.warning(t("no_password"));
  const credentialsError = () =>
    toast.error(t("credentials_error"));
  const successLog = () => toast.success(t("success_log"));
  const [language, setLanguage] = useState(i18n.language)
  const navigate = useNavigate();
  const [token, setToken] = useToken();
  const [user, setUser] = useUser();
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [password, setPassword] = useState("");
  const [showLockIcon, setShowLockIcon] = useState(true);
  const [showUserIcon, setShowUserIcon] = useState(true);
  const [isCheckingCredentials, setIsCheckingCredentials] = useState(false);
  const queryClient = useQueryClient();
  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  if (user != "" && user != null) {
    return <Navigate to="/home/trips" replace={true} />;
  }

  return (
    <>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="fr">Fr</option>
        <option value="en">En</option>
      </select>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label htmlFor="email" style={{ fontSize: 11 }}>
            E-mail
          </label>
          <FormControl
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setShowUserIcon(false)}
            onBlur={() => setShowUserIcon(true)}
            type="text"
          />
          {showUserIcon && email === "" && (
            <FontAwesomeIcon
              icon={faUser}
              style={{ position: "absolute", top: 26, left: 5 }}
            />
          )}
        </div>
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label htmlFor="password" style={{ fontSize: 11 }}>
            {t("mdp")}
          </label>
          <FormControl
            type="password"
            name="password"
            value={password}
            onFocus={() => setShowLockIcon(false)}
            onBlur={() => setShowLockIcon(true)}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showLockIcon && password === "" && (
            <FontAwesomeIcon
              icon={faLock}
              style={{ position: "absolute", top: 26, left: 5 }}
            />
          )}
        </div>
        <div style={{ width: "11%" }}>
          <Button
            type="button"
            size="sm"
            onClick={checkConnexionInfo}
            style={{
              marginTop: 10,
              width: "100%",
            }}
          >
            {t("se_connecter")}
          </Button>
          {isCheckingCredentials && (
            <img
              src={imgLoader}
              style={{ height: 40, position: "absolute", marginTop: 5 }}
            />
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            marginTop: 5,
            width: "15%",
            justifyContent: "space-around",
          }}
        >

          <p
            onClick={() => navigate("/signup")}
            style={{
              marginTop: 0,
              marginBottom: 0,
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            {t("creer_compte")}
          </p>
        </div>
      </form>
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
