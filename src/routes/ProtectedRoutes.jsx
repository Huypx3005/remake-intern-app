import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../contexts/authContext";

const ProtectedRoutes = ({ children }) => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
