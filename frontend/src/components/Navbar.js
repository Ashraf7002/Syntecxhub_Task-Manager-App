import { useState } from "react";

function Navbar({ dark, setDark }) {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "15px 30px",
      background: dark ? "#1e1e1e" : "#222",
      color: "white"
    }}>
      <h2>📝 Task Manager</h2>

      <div>
        <button
          onClick={() => setDark(!dark)}
          style={{ marginRight: "10px" }}
        >
          {dark ? "Light ☀️" : "Dark 🌙"}
        </button>

        <button onClick={handleLogout} style={{
          background: "red",
          color: "white"
        }}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;