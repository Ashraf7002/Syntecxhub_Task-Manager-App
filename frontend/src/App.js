import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";          // ✅ NEW
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Landing Page */}
        <Route path="/" element={<Home />} />

        {/* ✅ Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;