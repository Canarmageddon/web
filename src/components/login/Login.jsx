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

const Login = () => {
  const invalidEmail = () =>
    toast.warning("Cette adresse e-mail n'est pas valide");
  const noPassword = () => toast.warning("Veuilez renseigner un mot de passe");
  const credentialsError = () =>
    toast.error("E-mail / mot de passe incorrect, veuillez réessayer");

  const navigate = useNavigate();
  const [token, setToken] = useToken();
  const [user, setUser] = useUser();
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [password, setPassword] = useState("");
  const [showLockIcon, setShowLockIcon] = useState(true);
  const [showUserIcon, setShowUserIcon] = useState(true);
  const queryClient = useQueryClient();

  if (user != "" && user != null) {
    return <Navigate to="/home/trips" replace={true} />;
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

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
        <label>
          Rester connecter
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(!rememberMe)}
          ></input>
        </label>
        <Button type="button" size="sm" onClick={checkConnexionInfo}>
          Se connecter
        </Button>
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
        const tokens = await checkCredentials(email, password);
        await updateToken({
          setToken,
          token: tokens.token,
          refresh_token: tokens.refresh_token,
        });
        queryClient.invalidateQueries("whoami");
      } catch (error) {
        credentialsError();
      }
    }
  }
};

export default Login;
