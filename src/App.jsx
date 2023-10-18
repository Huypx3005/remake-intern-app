import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";

import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Admin from "./pages/Admin/Admin";
import NotFound from "./pages/NotFound/NotFound";

import Loading from "./components/Loading/Loading";

import ProtectedRoutes from "./routes/ProtectedRoutes";

// import { useAuth } from "./contexts/authContext";
import { checkAuthState } from "./features/auth/authSlice";
import Users from "./pages/Admin/Users/Users";
import Products from "./pages/Admin/Products/Products";

function App() {
  // const { loading } = useAuth();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoutes>
                <Admin />
              </ProtectedRoutes>
            }
          >
            <Route path="users" element={<Users />} />
            <Route path="products" element={<Products />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
      <ToastContainer />
    </>
  );
}

export default App;
