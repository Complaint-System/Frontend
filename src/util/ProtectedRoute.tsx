import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useEffect } from "react";

type Props = {};

const ProtectedRoute = () => {
  const location = useLocation();
  const { session, verifySession } = useAuth();

  useEffect(() => {
    verifySession();
  }, []);

  if (!session) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
