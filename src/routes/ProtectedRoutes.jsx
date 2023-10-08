import { Navigate, Outlet } from "react-router-dom";

import { fetchUser } from "../utils/fetchUser";

const ProtectedRoutes = ({ children }) => {
  const user = fetchUser();

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
