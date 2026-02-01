"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Subject = {
  _id: string;
  name: string;
};

export default function CoursesPage() {
  const router = useRouter();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch("/api/subjects");
        const data = await res.json();
        setSubjects(data);
      } catch (err) {
        console.error("Failed to fetch subjects");
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = async () => {
    try {
      // 1. Call the API to delete the cookie
      const res = await fetch("/api/logout", { method: "POST" });

      if (res.ok) {
        // 2. Refresh to clear Next.js cache of the protected data
        router.refresh();
        
        // 3. Send them back to Login
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
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
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="flex flex-row justify-between items-center">
        <h1 style={{ fontSize: "46px", fontWeight: "800" }}>Courses</h1>
        <button
        onClick={handleLogout}
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
          </div>

        <p style={{ marginTop: "10px", fontSize: "18px", color: "#cfd8dc" }}>
          Search and select a course to explore professor reviews
        </p>

        {/* SEARCH */}
        <input
  type="text"
  placeholder="Search subject (MAI-101, Physics...)"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    marginTop: "30px",
    width: "100%",
    maxWidth: "420px",
    padding: "14px",
    borderRadius: "12px",
    border: "2px solid white",
    outline: "none",
    fontSize: "16px",
    background: "transparent",
    color: "white",
  }}
/>

      </div>

      {/* GRID */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "50px auto 0",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "28px",
        }}
      >
        {loading && <p>Loading subjects...</p>}

        {!loading && filteredSubjects.length === 0 && (
          <p>No subjects found.</p>
        )}

        {filteredSubjects.map((subject) => (
          <a
            key={subject._id}
            href={`/courses/${subject._id}`}
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
    cursor: "pointer",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-6px) scale(1.02)";
    e.currentTarget.style.boxShadow =
      "0 30px 60px rgba(79,156,255,0.35)";
    e.currentTarget.style.background =
      "rgba(0, 0, 0, 0.65)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0) scale(1)";
    e.currentTarget.style.boxShadow =
      "0 20px 40px rgba(0,0,0,0.45)";
    e.currentTarget.style.background =
      "rgba(0, 0, 0, 0.55)";
  }}
>

              <p
                style={{
                  fontSize: "14px",
                  color: "#90caf9",
                  fontWeight: "600",
                }}
              >
                COURSE
              </p>

              <h2
                style={{
                  marginTop: "10px",
                  fontSize: "26px",
                  fontWeight: "700",
                }}
              >
                {subject.name}
              </h2>

              <p
                style={{
                  marginTop: "8px",
                  fontSize: "15px",
                  color: "#b0bec5",
                }}
              >
                View professors & reviews →
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
