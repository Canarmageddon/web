import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { signup } from "../../apiCaller";
import { useUser } from "../../context/userContext";
import { toast } from "react-toastify";
import { validateEmail } from "../../Functions";

const CreateAccount = () => {
  const invalidEmail = () =>
    toast.warning("Cette adresse e-mail n'est pas valide");
  const noPassword = () => toast.warning("Veuilez renseigner un mot de passe");
  const noConfirmPassword = () =>
    toast.warning("Veuilez confirmer le mot de passe");
  const divergentPasswords = () =>
    toast.warning("Les mots de passe ne correspondent pas");
  const credentialsError = () =>
    toast.error("E-mail / mot de passe incorrect, veuillez réessayer");

  const navigate = useNavigate();
  const [user] = useUser();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  if (user != "" && user != null) {
    return <Navigate to="/home/trips" replace={true} />;
  }
  useEffect(() => {
    // useFetch(() => {
    //   return API.getUsers();
    // }).then((data) => setAllUsers(data));
  }, []);

  return (
    <>
      <form>
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <br />
        <label htmlFor="firstName">Prénom</label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />
        <label htmlFor="lastName">Nom</label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <br />
        <label htmlFor="password">Mot de passe :</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label htmlFor="confirmPassword">Confirmez le mot de passe :</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />
        <button type="button" onClick={checkInfo}>
          Créer mon compte
        </button>
        <button type="button" onClick={() => navigate("/")}>
          connexion
        </button>
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
        await signup(email, password, firstName, lastName);
        accountCreation();
        navigate("/");
      } catch (error) {
        console.log(error);
        //TODO handler errors (toast)
      }
    }
  }
};

export default CreateAccount;
