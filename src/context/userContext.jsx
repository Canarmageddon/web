import React, { useState, useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { refresh, whoAmI } from "../apiCaller";
import updateToken from "../updateTokens";
const UserContext = React.createContext();
const TokenContext = React.createContext();

export function useUser() {
    return useContext(UserContext);
}

export function useToken() {
    return useContext(TokenContext)
}

export function UserProvider({ children }) {
    const [user, setUser] = useState(undefined);
    const updateUser = (newUser) => {
        setUser(newUser);
    }
    const [token, setToken] = useState(window.localStorage.getItem("token"))
    const { isLoading } = useQuery(["whoami", token], async () => {
        if (token != "" && token != null) {
            console.log("here")
            const res = await refresh(window.localStorage.getItem("refresh_token"))
            updateToken({ setToken, token: res.token, refresh_token: res.refresh_token })
            const whoami = await whoAmI(token)
            setUser(whoami.user.id)
        }
        else {
            setUser(undefined)
        }
    })

    useEffect(async () => {
        if (token != "" && token != null) {
            console.log("here")
            const res = await refresh(window.localStorage.getItem("refresh_token"))
            updateToken({ setToken, token: res.token, refresh_token: res.refresh_token })
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
                {isLoading ? <p>loading</p> : children}
            </UserContext.Provider>
        </TokenContext.Provider>
    );
}
