import { useToken, useUser } from "./userContext";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { refresh } from "../apiCaller";
import updateToken from "../updateTokens";
export default function RequireAuth() {
    const navigate = useNavigate()
    const [token, setToken] = useToken()
    const [user, setUser] = useUser();
    const logout = () => {
        window.localStorage.clear()
        setToken("")
    }

    if (user == undefined) {
        navigate("/")
    }

    useEffect(() => {
        const interval = setInterval(async () => {
            const res = await refresh(window.localStorage.getItem("refresh_token"))
            updateToken({ setToken, token: res.token, refresh_token: res.refresh_token })
        }, 55 * 60 * 1000);// refresh toutes les 55 minutes
        return () => {
            clearInterval(interval);
        };
    }, [])
    return (
        <>
            <Outlet />
            <button onClick={() => logout()}>déconnexion</button>
        </>
    );
}
