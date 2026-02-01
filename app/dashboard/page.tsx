"use client";

export default function DashboardPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1f3b4d, #0f2027)",
        padding: "40px",
        fontFamily: "'Inter', system-ui, sans-serif",
        color: "white",
      }}
    >
      {/* TOP BAR */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* LEFT TITLE */}
        <div>
          <h1
            style={{
              fontSize: "42px",
              fontWeight: "800",
              letterSpacing: "0.5px",
            }}
          >
            Dashboard
          </h1>
          <p
            style={{
              marginTop: "8px",
              fontSize: "18px",
              color: "#cfd8dc",
            }}
          >
            Welcome to the Professor Review System
          </p>
        </div>

        {/* LOGOUT BUTTON */}
        <a
          href="/login"
          style={{
            textDecoration: "none",
          }}
        >
          <button
            style={{
              padding: "10px 18px",
              background: "rgba(0,0,0,0.5)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            🚪 Logout
          </button>
        </a>
      </div>
      {/* MAIN CONTENT */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "60px auto 0",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "32px",
        }}
      >
        {/* VIEW COURSES CARD */}
        <a
          href="/courses"
          style={{
            textDecoration: "none",
            color: "white",
          }}
        >
          <div
            style={{
              padding: "40px",
              borderRadius: "20px",
              background: "rgba(0, 0, 0, 0.55)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.45)",
              transition: "all 0.25s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.04)";
              e.currentTarget.style.boxShadow =
                "0 25px 50px rgba(0,0,0,0.6)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 20px 40px rgba(0,0,0,0.45)";
            }}
          >
            <div style={{ fontSize: "52px" }}>📘</div>

            <h2
              style={{
                marginTop: "20px",
                fontSize: "30px",
                fontWeight: "700",
              }}
            >
              View Courses
            </h2>

            <p
              style={{
                marginTop: "12px",
                fontSize: "18px",
                color: "#b0bec5",
                lineHeight: "1.6",
              }}
            >
              Browse all courses, explore professors,  
              and read honest student reviews.
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}
