"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    // 🔹 Demo-only: store user email
    localStorage.setItem("userEmail", email);

    router.push("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #1f3b4d, #0f2027)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', system-ui, sans-serif",
        color: "white",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(14px)",
          borderRadius: "20px",
          padding: "36px",
          boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
        }}
      >
        {/* TITLE */}
        <h1 style={{ fontSize: "32px", fontWeight: "800" }}>
          Create Account
        </h1>

        <p style={{ color: "#cfd8dc", marginTop: "8px" }}>
          Register to review professors 
        </p>

        {/* NAME */}
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        {/* REGISTER BUTTON */}
        <button
          onClick={handleRegister}
          style={{
            marginTop: "22px",
            width: "100%",
            padding: "14px",
            background: "linear-gradient(135deg, #2196f3, #21cbf3)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "transform 0.2s ease",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.transform = "scale(1.03)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
          Register
        </button>

        {/* LOGIN LINK */}
        <p
          style={{
            marginTop: "24px",
            textAlign: "center",
            color: "#b0bec5",
          }}
        >
          Already have an account?{" "}
          <a
            href="/login"
            style={{
              color: "#90caf9",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

/* ---------- Input Style ---------- */
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  marginTop: "16px",
  borderRadius: "10px",
  border: "none",
  outline: "none",
  fontSize: "15px",
};
