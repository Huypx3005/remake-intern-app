import { Route, Routes } from "react-router-dom";

import "./App.css";

import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Admin from "./pages/Admin/Admin";
import NotFound from "./pages/NotFound/NotFound";

import Loading from "./components/Loading/Loading";

import ProtectedRoutes from "./routes/ProtectedRoutes";
import { useAuth } from "./contexts/authContext";

function App() {
  const { loading } = useAuth();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
}

export default App;
