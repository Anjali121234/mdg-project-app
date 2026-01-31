"use client";

import { useState } from "react";

export default function CoursesPage() {
  const courses = [
    { id: "maths-1", code: "MAI-101", name: "Engineering Mathematics I", emoji: "📐" },
    { id: "physics", code: "PHI-101", name: "Engineering Physics", emoji: "⚡" },
    { id: "dsa", code: "DAI-101", name: "Data Structures", emoji: "🧠" },
    { id: "os", code: "OS-101", name: "Operating Systems", emoji: "💻" },
  ];

  const [search, setSearch] = useState("");

  const filteredCourses = courses.filter((course) => {
    const q = search.toLowerCase();
    return (
      course.name.toLowerCase().includes(q) ||
      course.code.toLowerCase().includes(q) ||
      course.id.toLowerCase().includes(q)
    );
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #1f3b4d, #0f2027)",
        padding: "40px",
        color: "white",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* HEADER */}
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "46px", fontWeight: "800" }}>Courses</h1>

        <p style={{ marginTop: "10px", fontSize: "18px", color: "#cfd8dc" }}>
          Search and select a course to explore professor reviews
        </p>

        {/* 🔍 IMPROVED SEARCH BAR */}
        <div
          style={{
            marginTop: "30px",
            maxWidth: "460px",
            position: "relative",
          }}
        >
          {/* Icon */}
          <span
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "18px",
              color: "#90caf9",
              pointerEvents: "none",
            }}
          >
            🔍
          </span>

          <input
            type="text"
            placeholder="Search by course name or code (MAI-101, Physics)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 16px 14px 46px",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.15)",
              outline: "none",
              fontSize: "16px",
              color: "white",
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
              transition: "all 0.25s ease",
            }}
            onFocus={(e) => {
              e.currentTarget.style.border = "1px solid #90caf9";
              e.currentTarget.style.boxShadow =
                "0 0 0 3px rgba(144,202,249,0.25)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.border =
                "1px solid rgba(255,255,255,0.15)";
              e.currentTarget.style.boxShadow =
                "0 8px 30px rgba(0,0,0,0.35)";
            }}
          />

          <p style={{ marginTop: "8px", fontSize: "13px", color: "#b0bec5" }}>
            Try codes like <strong>MAI-101</strong> or names like <strong>Physics</strong>
          </p>
        </div>
      </div>

      {/* COURSES GRID */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "50px auto 0",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "28px",
        }}
      >
        {filteredCourses.length === 0 && (
          <p style={{ opacity: 0.7 }}>No courses found.</p>
        )}

        {filteredCourses.map((course) => (
          <a
            key={course.id}
            href={`/courses/${course.id}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <div
              style={{
                padding: "32px",
                borderRadius: "18px",
                background: "rgba(0, 0, 0, 0.55)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.45)",
                transition: "all 0.25s ease",
                height: "100%",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <div style={{ fontSize: "46px" }}>{course.emoji}</div>

              <p
                style={{
                  marginTop: "14px",
                  fontSize: "14px",
                  color: "#90caf9",
                  fontWeight: "600",
                  letterSpacing: "1px",
                }}
              >
                {course.code}
              </p>

              <h2
                style={{
                  marginTop: "10px",
                  fontSize: "26px",
                  fontWeight: "700",
                }}
              >
                {course.name}
              </h2>

              <p
                style={{
                  marginTop: "8px",
                  fontSize: "15px",
                  color: "#b0bec5",
                }}
              >
                Click to view professors & reviews
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
