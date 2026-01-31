"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      alert("Please enter email and password");
      return;
    }

    // save logged-in user
    localStorage.setItem("userEmail", email);
    router.push("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* CARD */}
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "40px",
          borderRadius: "14px",
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          color: "white",
        }}
      >
        {/* TITLE */}
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "700",
            marginBottom: "8px",
            textAlign: "center",
          }}
        >
          Welcome Back 👋
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#bdbdbd",
            marginBottom: "30px",
          }}
        >
          Login to continue to Professor Review System
        </p>

        {/* EMAIL */}
        <label style={{ fontSize: "14px", color: "#ccc" }}>
          Email
        </label>
        <input
          type="email"
          placeholder="you@college.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "6px",
            marginBottom: "18px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            fontSize: "15px",
          }}
        />

        {/* PASSWORD */}
        <label style={{ fontSize: "14px", color: "#ccc" }}>
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "6px",
            marginBottom: "25px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            fontSize: "15px",
          }}
        />

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "14px",
            fontSize: "16px",
            fontWeight: "600",
            background:
              "linear-gradient(135deg, #1d8cf8, #3358f4)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            transition: "transform 0.2s ease",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.transform = "scale(1.02)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
          Login
        </button>

        {/* FOOTER */}
        <p
          style={{
            marginTop: "25px",
            textAlign: "center",
            fontSize: "13px",
            color: "#aaa",
          }}
        >
          By continuing, you agree to share anonymous reviews
        </p>
      </div>
    </div>
  );
}
