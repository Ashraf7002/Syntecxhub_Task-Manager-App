import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // ✅ IMPORTANT

  const handleRegister = async () => {
    if (!name || !email || !password) {
      return alert("Please fill all fields");
    }

    try {
      await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password,
      });

      alert("Registered Successfully ✅");

      // ✅ AUTO REDIRECT TO LOGIN
      navigate("/");

    } catch (err) {
      alert(err.response?.data?.msg || "Registration Failed ❌");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        
        {/* App Title */}
        <h1 style={appTitle}>📝 Task Manager</h1>

        <h2 style={heading}>Create Account 🚀</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

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

        <button onClick={handleRegister} style={primaryBtn}>
          Register
        </button>

        <p style={text}>Already have an account?</p>

        {/* ✅ FIXED BUTTON */}
        <button
          onClick={() => navigate("/")}
          style={secondaryBtn}
        >
          Login
        </button>
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
  cursor: "pointer"
};

const secondaryBtn = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  background: "#4facfe",
  color: "white",
  cursor: "pointer"
};

const text = {
  textAlign: "center",
  marginTop: "15px"
};

export default Register;