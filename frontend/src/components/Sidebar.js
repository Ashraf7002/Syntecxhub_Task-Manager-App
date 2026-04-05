import { FaTasks, FaMoon, FaSignOutAlt } from "react-icons/fa";

function Sidebar({ dark, setDark }) {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={{
      width: "220px",
      height: "100vh",
      background: dark ? "#1e1e1e" : "#ffffff",
      color: dark ? "white" : "black",
      padding: "20px",
      boxShadow: "2px 0 10px rgba(0,0,0,0.1)"
    }}>
      
      <h2 style={{ marginBottom: "30px" }}>📝 Task Manager</h2>

      <div style={menuItem}>
        <FaTasks /> <span style={{ marginLeft: "10px" }}>Tasks</span>
      </div>

      <div style={menuItem} onClick={() => setDark(!dark)}>
        <FaMoon /> <span style={{ marginLeft: "10px" }}>
          {dark ? "Light Mode" : "Dark Mode"}
        </span>
      </div>

      <div style={menuItem} onClick={logout}>
        <FaSignOutAlt /> <span style={{ marginLeft: "10px" }}>Logout</span>
      </div>
    </div>
  );
}

const menuItem = {
  display: "flex",
  alignItems: "center",
  padding: "10px",
  marginBottom: "15px",
  cursor: "pointer",
  borderRadius: "8px"
};

export default Sidebar;