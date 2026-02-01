"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  // 👇 Updated to match your Backend (collegeId instead of email)
  const [collegeId, setCollegeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To show red error text
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault(); // Prevent page reload if triggered by form
    setError("");
    setLoading(true);

    if (!collegeId.trim() || !password.trim()) {
      setError("Please enter College ID and Password");
      setLoading(false);
      return;
    }

    try {
      // 👇 CONNECTING TO YOUR API
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeId, password }),
      });

      if (res.ok) {
        // ✅ Login Success
        // The cookie is now set automatically by the browser.
        const data: any = await res.json();
        localStorage.setItem("currentUser", data.user.collegeId);
        router.refresh(); // Tell Next.js to re-check the middleware
        router.push("/courses"); // Redirect to the protected page
      } else {
        // ❌ Login Failed
        const data = await res.json();
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
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
            marginBottom: "20px",
          }}
        >
          Login to continue to Professor Review System
        </p>

        {/* 👇 ERROR MESSAGE (Only shows if there is an error) */}
        {error && (
          <div
            style={{
              background: "rgba(255, 82, 82, 0.2)",
              color: "#ff8a80",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontSize: "14px",
              textAlign: "center",
              border: "1px solid rgba(255, 82, 82, 0.4)",
            }}
          >
            {error}
          </div>
        )}

        {/* WRAP INPUTS IN FORM FOR "ENTER" KEY SUPPORT */}
        <form onSubmit={handleLogin}>
          {/* COLLEGE ID (Changed from Email) */}
          <label style={{ fontSize: "14px", color: "#ccc" }}>College ID</label>
          <input
            type="text"
            placeholder="e.g. 2023BTCS001"
            value={collegeId}
            onChange={(e) => setCollegeId(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "6px",
              marginBottom: "18px",
              borderRadius: "8px",
              border: "none",
              outline: "none",
              fontSize: "15px",
              color: "#333", // Make text readable
            }}
          />

          {/* PASSWORD */}
          <label style={{ fontSize: "14px", color: "#ccc" }}>Password</label>
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
              color: "#333",
            }}
          />

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              fontSize: "16px",
              fontWeight: "600",
              background: loading
                ? "#555" // Gray out when loading
                : "linear-gradient(135deg, #1d8cf8, #3358f4)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "transform 0.2s ease",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
{/* REGISTER LINK */}
<p
  style={{
    marginTop: "18px",
    textAlign: "center",
    fontSize: "14px",
    color: "#bbb",
  }}
>
  Don’t have an account?{" "}
  <span
    onClick={() => router.push("/register")}
    style={{
      color: "#4f9cff",
      fontWeight: "600",
      cursor: "pointer",
      textDecoration: "underline",
    }}
  >
    Register
  </span>
</p>

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