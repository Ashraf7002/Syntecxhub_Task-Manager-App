import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // ✅ prevent multiple clicks

  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Login button clicked"); // ✅ debug

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      console.log("Login success:", res.data); // ✅ debug

      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      // ✅ Redirect
      navigate("/dashboard");

    } catch (err) {
      console.log("Login error:", err); // ✅ debug
      alert(err.response?.data?.msg || "Login Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <div style={card}>

        {/* App Title */}
        <h1 style={appTitle}>📝 Task Manager</h1>

        <h2 style={heading}>Welcome Back 👋</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            ...primaryBtn,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={text}>Don't have an account?</p>

        <button
          onClick={() => navigate("/register")}
          style={secondaryBtn}
        >
          Register
        </button>

        {/* Back to Home */}
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          <span
            onClick={() => navigate("/")}
            style={{ cursor: "pointer", color: "#4facfe" }}
          >
            ← Back to Home
          </span>
        </p>

      </div>
    </div>
  );
}

/* 🎨 Styles */
const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #667eea, #764ba2)"
};

const card = {
  width: "360px",
  background: "rgba(255,255,255,0.95)",
  padding: "30px",
  borderRadius: "16px",
  boxShadow: "0 15px 40px rgba(0,0,0,0.25)"
};

const appTitle = {
  textAlign: "center",
  marginBottom: "5px"
};

const heading = {
  textAlign: "center",
  marginBottom: "20px",
  color: "#333"
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const primaryBtn = {
  width: "100%",
  padding: "12px",
  background: "linear-gradient(135deg, #43e97b, #38f9d7)",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
};

const secondaryBtn = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  background: "#4facfe",
  color: "white",
};

const text = {
  textAlign: "center",
  marginTop: "15px"
};

export default Login;