import { Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./routes/Login/Login";
import Profile from "./routes/Profile/Profile";
import Admin from "./routes/Admin/Admin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
