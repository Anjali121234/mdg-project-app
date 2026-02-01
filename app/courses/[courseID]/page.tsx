"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";

type Professor = {
  _id: string;
  name: string;
};

type PageProps = {
  params: Promise<{ courseID: string }>;
};

export default function CourseDetailPage({ params }: PageProps) {
  const { courseID } = use(params); // subjectId

  const [professors, setProfessors] = useState<Professor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const res = await fetch(
          `/api/subjects/${courseID}/professors`
        );
        const data = await res.json();
        setProfessors(data);
      } catch (err) {
        console.error("Failed to load professors");
      } finally {
        setLoading(false);
      }
    };

    fetchProfessors();
  }, [courseID]);

  return (
    <div style={{ padding: "60px", color: "white" }}>
      <h1 style={{ fontSize: "40px", fontWeight: "800" }}>
        Professors
      </h1>

      {loading && <p>Loading...</p>}

      {!loading && professors.length === 0 && (
        <p>No professors found for this subject.</p>
      )}

      <div
        style={{
          marginTop: "40px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "30px",
        }}
      >
        {professors.map((prof) => (
          <Link
            key={prof._id}
          href={`/professors/${prof._id}?subjectId=${courseID}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <div
              style={{
                padding: "28px",
                borderRadius: "20px",
                background: "rgba(255,255,255,0.06)",
              }}
            >
              <h3 style={{ fontSize: "22px", fontWeight: "700" }}>
                {prof.name}
              </h3>

              <p style={{ marginTop: "10px", color: "#90caf9" }}>
                View Reviews →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
