import { useToken, useUser } from "./userContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function RequireAuth() {
    const navigate = useNavigate()
    const [token, setToken] = useToken()
    const [user, setUser] = useUser();
    const logout = () => {
        window.localStorage.setItem("token", "")
        window.localStorage.setItem("refresh_token", "")
        setToken("")
    }

    if (user == undefined) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/" replace={true} />;
    }
    return (
        <>
            <Outlet />
            <button onClick={() => logout()}>déconnexion</button>
        </>
    );
}
