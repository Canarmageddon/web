import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { checkCredentials, signup } from "../../apiCaller";
import { useUser } from "../../context/userContext";
import { toast } from "react-toastify";
import { validateEmail } from "../../Functions";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import imgLoader from "../../resources/images/loader-blue.svg";

const CreateAccount = () => {
  const invalidEmail = () =>
    toast.warning("Cette adresse e-mail n'est pas valide");
  const emailNotAvailable = () =>
    toast.error("Cette adresse e-mail est déjà utilisée");
  const noPassword = () => toast.warning("Veuilez renseigner un mot de passe");
  const noConfirmPassword = () =>
    toast.warning("Veuilez confirmer le mot de passe");
  const divergentPasswords = () =>
    toast.warning("Les mots de passe ne correspondent pas");
  const successCreate = () => toast.success("Compte créé !");

  const navigate = useNavigate();
  const [user] = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showLockIcon, setShowLockIcon] = useState(true);
  const [showConfirmLockIcon, setShowConfirmLockIcon] = useState(true);
  const [showUserIcon, setShowUserIcon] = useState(true);
  const [isCheckingCredentials, setIsCheckingCredentials] = useState(false);

  if (user != "" && user != null) {
    return <Navigate to="/home/trips" replace={true} />;
  }

  return (
    <>
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
            type="text"
            name="email"
            value={email}
            onFocus={() => setShowUserIcon(false)}
            onBlur={() => setShowUserIcon(true)}
            onChange={(e) => setEmail(e.target.value)}
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
          <label htmlFor="firstName" style={{ fontSize: 11 }}>
            Prénom
          </label>
          <FormControl
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label htmlFor="lastName" style={{ fontSize: 11 }}>
            Nom
          </label>
          <FormControl
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
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
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label htmlFor="confirmPassword" style={{ fontSize: 11 }}>
            Confirmez le mot de passe
          </label>
          <FormControl
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onFocus={() => setShowConfirmLockIcon(false)}
            onBlur={() => setShowConfirmLockIcon(true)}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {showConfirmLockIcon && confirmPassword === "" && (
            <FontAwesomeIcon
              icon={faLock}
              style={{ position: "absolute", top: 26, left: 5 }}
            />
          )}
        </div>
        <div style={{ width: "11%" }}>
          <Button
            type="button"
            onClick={checkInfo}
            style={{
              marginTop: 10,
              width: "100%",
            }}
          >
            Créer mon compte
          </Button>
          <Button
            type="button"
            onClick={() => navigate("/")}
            variant="secondary"
            style={{
              marginTop: 10,
              width: "100%",
            }}
          >
            Connexion
          </Button>
          {isCheckingCredentials && (
            <img
              src={imgLoader}
              style={{ height: 40, position: "absolute", bottom: 325 }}
            />
          )}
        </div>
      </form>
    </>
  );

  async function checkInfo() {
    if (!validateEmail(email)) {
      invalidEmail();
    } else if (!password) {
      noPassword();
    } else if (!confirmPassword) {
      noConfirmPassword();
    } else if (password !== confirmPassword) {
      divergentPasswords();
    } else {
      try {
        setIsCheckingCredentials(true);
        await signup(email, password, firstName, lastName);
        successCreate();
        navigate("/");
      } catch (error) {
        emailNotAvailable();
      }
      setIsCheckingCredentials(false);
    }
  }
};

export default CreateAccount;
