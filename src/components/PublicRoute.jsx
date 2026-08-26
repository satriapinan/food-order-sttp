import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicRoute = () => {
  const { user: pengguna } = useAuth();

  if (pengguna) {
    return <Navigate to="/foodmenu" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
