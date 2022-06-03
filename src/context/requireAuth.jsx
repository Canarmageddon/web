import { useToken, useUser } from "./userContext";
import { Navigate, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { refresh } from "../apiCaller";
import updateToken from "../updateTokens";
import { useQuery } from "react-query";
export default function RequireAuth() {
    const [user, setUser] = useUser();
    const [token, setToken] = useToken();
    const logout = () => {
        window.localStorage.clear()
        setUser(undefined)
    }
    if (user == undefined) {
        return <Navigate to="/" />
    }


    return (
        <>
            <Outlet />
            <button onClick={() => logout()}>déconnexion</button>
        </>
    );
}
