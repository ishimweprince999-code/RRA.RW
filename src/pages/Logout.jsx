import useAuth from "../store/auth.js";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
export default function Logout(){
  const { logout } = useAuth();
  useEffect(()=>{ logout(); }, []);
  return <Navigate to="/login" replace />;
}
