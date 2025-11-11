import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../store/auth.js";

export default function ProtectedRoute({ allowedRoles }) {
  const { token, role } = useAuth();
  const location = useLocation();

  if (!token) return <Navigate to="/login" replace state={{ from: location }} />;
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/" replace />;

  return <Outlet />;
}
