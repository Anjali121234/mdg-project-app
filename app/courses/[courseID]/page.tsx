"use client";

import Link from "next/link";
import { use } from "react";

type CoursePageProps = {
  params: Promise<{
    courseID: string;
  }>;
};

export default function CourseDetailPage({ params }: CoursePageProps) {
  const { courseID } = use(params);

  const courseData: Record<
    string,
    {
      name: string;
      code: string;
      description: string;
      professors: { id: string; name: string; title: string }[];
    }
  > = {
    "maths-1": {
      name: "Engineering Mathematics I",
      code: "MAI-101",
      description:
        "Foundational mathematics course covering calculus, matrices and differential equations.",
      professors: [
        { id: "prof-sharma", name: "Dr. Sharma", title: "Senior Professor" },
        { id: "prof-verma", name: "Prof. Verma", title: "Associate Professor" },
      ],
    },
  };

  const course = courseData[courseID];

  if (!course) {
    return (
      <div style={{ padding: "40px", color: "white" }}>
        Course not found
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1e3c50 0%, #0b1117 60%)",
        color: "white",
        padding: "60px 30px",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* HEADER */}
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <p
          style={{
            color: "#90caf9",
            letterSpacing: "1px",
            fontWeight: "600",
          }}
        >
          COURSE · {course.code}
        </p>

        <h1
          style={{
            fontSize: "52px",
            fontWeight: "900",
            marginTop: "10px",
          }}
        >
          {course.name}
        </h1>

        <p
          style={{
            marginTop: "12px",
            maxWidth: "700px",
            fontSize: "18px",
            color: "#cfd8dc",
            lineHeight: 1.6,
          }}
        >
          {course.description}
        </p>
      </div>

      {/* PROFESSORS */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "70px auto 0",
        }}
      >
        <h2
          style={{
            fontSize: "34px",
            fontWeight: "800",
            marginBottom: "30px",
          }}
        >
          Professors Teaching This Course
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "30px",
          }}
        >
          {course.professors.map((prof) => (
            <Link
              key={prof.id}
              href={`/professors/${prof.id}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              <div
                style={{
                  padding: "28px",
                  borderRadius: "20px",
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(14px)",
                  boxShadow: "0 30px 60px rgba(0,0,0,0.55)",
                  transition: "all 0.35s ease",
                  height: "100%",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 40px 80px rgba(0,0,0,0.8)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 30px 60px rgba(0,0,0,0.55)";
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #42a5f5, #7e57c2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "26px",
                    fontWeight: "800",
                  }}
                >
                  {prof.name.charAt(0)}
                </div>

                <h3
                  style={{
                    marginTop: "18px",
                    fontSize: "24px",
                    fontWeight: "700",
                  }}
                >
                  {prof.name}
                </h3>

                <p
                  style={{
                    marginTop: "6px",
                    fontSize: "15px",
                    color: "#b0bec5",
                  }}
                >
                  {prof.title}
                </p>

                <div
                  style={{
                    marginTop: "18px",
                    display: "inline-block",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    background: "#0070f3",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  View Reviews →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
