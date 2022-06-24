import React, { useState, useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { refresh, whoAmI } from "../apiCaller";
import RotatingDuck from "../components/loadingScreen/RotatingDuck";
import { updateToken } from "../Functions";
const UserContext = React.createContext();
const TokenContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export function useToken() {
  return useContext(TokenContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const updateUser = (newUser) => {
    setUser(newUser);
  };
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const { isLoading } = useQuery("whoami", async () => {
    if (
      window.localStorage.getItem("token") != "" &&
      window.localStorage.getItem("token") != null
    ) {
      const res = await refresh(window.localStorage.getItem("refresh_token"));
      updateToken({
        setToken,
        token: res.token,
        refresh_token: res.refresh_token,
      });
      const whoami = await whoAmI(res.token);
      setUser(whoami.id);
    } else {
      setUser(undefined);
    }
  });

  return (
    <TokenContext.Provider value={[token, setToken]}>
      <UserContext.Provider value={[user, updateUser]}>
        {isLoading ? <RotatingDuck /> : children}
      </UserContext.Provider>
    </TokenContext.Provider>
  );
}
