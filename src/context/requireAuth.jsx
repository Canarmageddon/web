import { useToken, useUser } from "./userContext";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth() {
  const [user, setUser] = useUser();
  const [token, setToken] = useToken();
  if (user == undefined) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
