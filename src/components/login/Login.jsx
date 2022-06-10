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

const Login = () => {
  const invalidEmail = () =>
    toast.warning("Cette adresse e-mail n'est pas valide");
  const noPassword = () => toast.warning("Veuilez renseigner un mot de passe");
  const credentialsError = () =>
    toast.error("E-mail / mot de passe incorrect, veuillez réessayer");
  const successLog = () => toast.success("Connection réussie");

  const navigate = useNavigate();
  const [setToken] = useToken();
  const [user] = useUser();
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [password, setPassword] = useState("");
  const [showLockIcon, setShowLockIcon] = useState(true);
  const [showUserIcon, setShowUserIcon] = useState(true);
  const [isCheckingCredentials, setIsCheckingCredentials] = useState(false);
  const queryClient = useQueryClient();

  if (user != "" && user != null) {
    return <Navigate to="/home/trips" replace={true} />;
  }

  return (
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
          Mot de passe
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
          Se connecter
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
        <label
          style={{
            fontSize: 12,
          }}
        >
          Rester connecté
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(!rememberMe)}
            style={{
              cursor: "pointer",
              marginLeft: 5,
            }}
          ></input>
        </label>
        <p
          onClick={() => navigate("/signup")}
          style={{
            marginTop: 0,
            marginBottom: 0,
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          Créer un compte
        </p>
      </div>
    </form>
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
