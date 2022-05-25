import React, { useState, useContext, useEffect } from "react";
import { whoAmI } from "../apiCaller";
const UserContext = React.createContext();
const TokenContext = React.createContext();

export function useUser() {
    return useContext(UserContext);
}

export function useToken() {
    return useContext(TokenContext)
}

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(window.localStorage.getItem("token"))
    const updateUser = (newUser) => {
        setUser(newUser);
    }
    useEffect(async () => {
        if (token != "" && token != null) {
            const whoami = await whoAmI(token)
            setUser(whoami.user.id)
        }
        else {
            setUser(undefined)
        }
    }, [token])

    return (
        <TokenContext.Provider value={[token, setToken]}>
            <UserContext.Provider value={[user, updateUser]}>
                {children}
            </UserContext.Provider>
        </TokenContext.Provider>
    );
}
