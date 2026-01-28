import { Outlet, Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
export default function ProtectedPath() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (isAuthenticated === false) {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
}
