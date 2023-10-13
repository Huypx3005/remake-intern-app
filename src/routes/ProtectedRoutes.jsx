import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/authContext";

const ProtectedRoutes = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
