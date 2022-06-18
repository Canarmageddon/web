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
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import imgLoader from "../../resources/images/loader-blue.svg";
import { useTranslation } from "react-i18next";
import LanguageModal from "../LanguageModal";
import Background from "../Background";

const CreateAccount = () => {
  const { t } = useTranslation("translation", { keyPrefix: "create_account" });

  const [showModal, setShowModal] = useState(false);
  const invalidEmail = () => toast.warning(t("invalidEmail"));
  const emailNotAvailable = () => toast.error(t("user_email"));
  const noPassword = () => toast.warning(t("no_password"));
  const noConfirmPassword = () => toast.warning(t("confirm_password"));
  const divergentPasswords = () => toast.warning(t("divergent_passwords"));
  const successCreate = () => toast.success(t("success"));

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
      <Background />
      <FontAwesomeIcon
        onClick={() => setShowModal(true)}
        icon={faGlobe}
        style={{ position: "absolute", top: 20, left: 5, color: "white" }}
        size={"2x"}
      />
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
            {t("first_name")}
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
            {t("last_name")}
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
            {t("confirm_password")}
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
        <div style={{ width: "11%", zIndex: 1 }}>
          <Button
            type="button"
            onClick={checkInfo}
            style={{
              marginTop: 10,
              width: "100%",
            }}
          >
            {t("create_account")}
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
      <LanguageModal showModal={showModal} setShowModal={setShowModal} />
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
