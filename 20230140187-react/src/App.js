import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import DashboardPage from "./components/DashboardPage";

function Navbar() {
  const location = useLocation();

  // Hide navbar on dashboard
  if (location.pathname === "/dashboard") return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <nav
        className="bg-black/40 backdrop-blur-lg px-8 py-3 rounded-full shadow-lg
        border border-white/10 flex items-center gap-6 text-gray-200"
      >
        <Link className="hover:text-indigo-300 font-semibold" to="/login">Login</Link>
        <Link className="hover:text-indigo-300 font-semibold" to="/register">Register</Link>
      </nav>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
