import { useUser } from "./userContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
export default function RequireAuth() {
    const [user, setUser] = useUser();
    let location = useLocation();
    if (user == null || user == "") {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/" state={{ from: location }} replace={true} />;
    }

    return (
        <>
            <Outlet />
            <button onClick={() => setUser(null)}>déconnexion</button>
        </>
    );
}
