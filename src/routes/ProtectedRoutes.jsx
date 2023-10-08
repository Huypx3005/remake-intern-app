import { Navigate, Outlet } from "react-router-dom";

// import { useAuth } from "../contexts/authContext";
import { fetchUser } from "../utils/fetchUser";

const ProtectedRoutes = ({ children }) => {
  // const { user } = useAuth();
  const user = fetchUser();

  console.log("from protected route", user);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
