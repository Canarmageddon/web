import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
const CreateAccount = () => {
  const navigate = useNavigate();
  const [user] = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  if (user != "" && user != null) {
    return <Navigate to="/home/trips" replace={true} />
  }
  useEffect(() => {
    // useFetch(() => {
    //   return API.getUsers();
    // }).then((data) => setAllUsers(data));
  }, []);

  return (
    <>
      <form>
        <label htmlFor="username">E-mail</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
      </form>
    </>
  );

  function checkInfo() {
    if (allUsers.filter((user) => user.name === username).length === 0) {
      if (password === confirmPassword) {
        navigate("/");
        // useFetch(() => {
        //   return API.createUser(username, password);
        // }).then(() => navigate("/signin"));
      } else {
        alert("Les mots de passes ne correspondent pas !");
      }
    } else {
      alert("L'utilisateur existe déjà");
    }
  }
};

export default CreateAccount;
