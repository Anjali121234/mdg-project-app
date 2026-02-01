"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleRegister = async () => {
  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, collegeId: email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Registration failed");
      return;
    }
    alert("Registration successful!");
    router.push("/dashboard");
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Try again.");
  }
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
       
        <h1 style={{ fontSize: "32px", fontWeight: "800" }}>
          Create Account
        </h1>

        <p style={{ color: "#cfd8dc", marginTop: "8px" }}>
          Register to review professors 
        </p>

        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

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


const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  marginTop: "16px",
  borderRadius: "10px",
  border: "none",
  outline: "none",
  fontSize: "15px",
};
