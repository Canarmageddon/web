import React, { useState } from "react";
import "./connection.css";

import { Navigate, useNavigate } from "react-router-dom";
import { signup } from "../../apiCaller";
import { useUser } from "../../context/userContext";
import { toast } from "react-toastify";
import { validateEmail } from "../../Functions";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import imgLoader from "../../resources/loader-blue.svg";
import { useTranslation } from "react-i18next";
import LanguageModal from "../LanguageModal";

const CreateAccount = () => {
  const { t } = useTranslation("translation", { keyPrefix: "create_account" });

  const [showModal, setShowModal] = useState(false);
  const invalidEmail = () => toast.warning(t("invalid_email"));
  const emailNotAvailable = () => toast.error(t("user_email"));
  const noFirstName = () => toast.warning(t("no_firstname"));
  const noLastName = () => toast.warning(t("no_lastname"));
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
      <FontAwesomeIcon
        onClick={() => setShowModal(true)}
        icon={faGlobe}
        className="language-icon"
        size={"3x"}
      />
      <form className="form-connection">
        <div className="input-container">
          <label htmlFor="email" className="input-label">
            E-mail
          </label>
          <FormControl
            type="text"
            name="email"
            value={email}
            onFocus={() => setShowUserIcon(false)}
            onBlur={() => setShowUserIcon(true)}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && checkInfo()}
          />
          {showUserIcon && email === "" && (
            <FontAwesomeIcon icon={faUser} className="input-icon" />
          )}
        </div>
        <div className="input-container">
          <label htmlFor="firstName" className="input-label">
            {t("first_name")}
          </label>
          <FormControl
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && checkInfo()}
          />
        </div>
        <div className="input-container">
          <label htmlFor="lastName" className="input-label">
            {t("last_name")}
          </label>
          <FormControl
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && checkInfo()}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password" className="input-label">
            Mot de passe
          </label>
          <FormControl
            type="password"
            name="password"
            value={password}
            onFocus={() => setShowLockIcon(false)}
            onBlur={() => setShowLockIcon(true)}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && checkInfo()}
          />
          {showLockIcon && password === "" && (
            <FontAwesomeIcon icon={faLock} className="input-icon" />
          )}
        </div>
        <div className="input-container">
          <label htmlFor="confirmPassword" className="input-label">
            {t("confirm_password")}
          </label>
          <FormControl
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onFocus={() => setShowConfirmLockIcon(false)}
            onBlur={() => setShowConfirmLockIcon(true)}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && checkInfo()}
          />
          {showConfirmLockIcon && confirmPassword === "" && (
            <FontAwesomeIcon icon={faLock} className="input-icon" />
          )}
        </div>
        <div style={{ width: "100%" }}>
          <Button
            type="button"
            size="sm"
            onClick={checkInfo}
            className="button"
          >
            {t("create_account")}
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => navigate("/")}
            variant="secondary"
            className="button"
          >
            Connexion
          </Button>
          {isCheckingCredentials && <img src={imgLoader} className="loader" />}
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
    } else if (firstName.length == 0) {
      noFirstName();
    } else if (lastName.length == 0) {
      noLastName();
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
        setIsCheckingCredentials(false);
      }
    }
  }
};

export default CreateAccount;
