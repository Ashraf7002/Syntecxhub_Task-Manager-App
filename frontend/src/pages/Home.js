import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={container}>
      
      {/* NAVBAR */}
      <div style={navbar}>
        <h2>📝 Task Manager</h2>
        <div>
          {/* ✅ FIXED HERE */}
          <button style={navBtn} onClick={() => navigate("/login")}>
            Login
          </button>

          <button style={navBtn} onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <div style={hero}>
        <h1 style={title}>Manage Your Tasks Smartly 🚀</h1>
        <p style={subtitle}>
          Organize your daily work, boost productivity, and stay focused.
        </p>

        <button style={cta} onClick={() => navigate("/register")}>
          Get Started Free
        </button>
      </div>

      {/* FEATURES */}
      <div style={features}>
        <div style={card}>
          <h3>⚡ Fast</h3>
          <p>Quickly add, edit, and manage tasks</p>
        </div>

        <div style={card}>
          <h3>🔒 Secure</h3>
          <p>Your data is safe with authentication</p>
        </div>

        <div style={card}>
          <h3>📱 Simple UI</h3>
          <p>Clean and easy-to-use interface</p>
        </div>
      </div>

      {/* FOOTER */}
      <p style={footer}>© 2026 Task Manager App</p>
    </div>
  );
}

/* 🎨 STYLES */

const container = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  color: "white",
  padding: "20px",
};

const navbar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const navBtn = {
  marginLeft: "10px",
  padding: "8px 14px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
};

const hero = {
  textAlign: "center",
  marginTop: "80px",
};

const title = {
  fontSize: "40px",
  marginBottom: "10px",
};

const subtitle = {
  opacity: 0.8,
  marginBottom: "20px",
};

const cta = {
  padding: "12px 25px",
  fontSize: "16px",
  borderRadius: "10px",
  border: "none",
  background: "#fff",
  color: "#333",
  cursor: "pointer",
};

const features = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginTop: "80px",
  flexWrap: "wrap",
};

const card = {
  background: "rgba(255,255,255,0.1)",
  padding: "20px",
  borderRadius: "12px",
  width: "200px",
  textAlign: "center",
};

const footer = {
  textAlign: "center",
  marginTop: "60px",
  opacity: 0.7,
};

export default Home;