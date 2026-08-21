import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ========================= */}
        {/* LOGIN */}
        {/* ========================= */}

        <Route
          path="/"
          element={<Login />}
        />

        {/* ========================= */}
        {/* USER */}
        {/* ========================= */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* ========================= */}
        {/* ADMIN */}
        {/* ========================= */}

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        {/* ========================= */}
        {/* FORGOT PASSWORD */}
        {/* ========================= */}

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
