"use client";

import { useState, useMemo, useEffect, use } from "react";

/* ---------- Types ---------- */
type ProfessorPageProps = {
  params: Promise<{
    professorID: string;
  }>;
};

type Review = {
  email: string;
  teaching: number;
  clarity: number;
  grading: number;
  chillness: number;
  approachable: number;
  lateAttendance: string;
  lateSubmission: string;
  standingQuestions: string;
  createdAt: string;
};

/* ---------- Star Components ---------- */
function Stars({ value }: { value: number }) {
  return (
    <span style={{ color: "#FFD700", fontSize: "18px" }}>
      {"★".repeat(value)}
      {"☆".repeat(5 - value)}
    </span>
  );
}

function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div style={{ fontSize: "24px", marginBottom: "14px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onChange(star)}
          style={{
            cursor: "pointer",
            color: star <= value ? "#FFD700" : "#555",
            marginRight: "4px",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
function YesNoPill({
  value,
  onChange,
  disabled = false,
}: {
  value: "yes" | "no";
  onChange: (v: "yes" | "no") => void;
  disabled?: boolean;
}) {
  return (
    <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
      {(["yes", "no"] as const).map((option) => {
        const active = value === option;
        return (
          <button
            key={option}
            onClick={() => !disabled && onChange(option)}
            style={{
              padding: "6px 18px",
              borderRadius: "999px",
              border: active ? "1px solid #FFD700" : "1px solid #555",
              background: active ? "rgba(255,215,0,0.15)" : "transparent",
              color: active ? "#FFD700" : "#bbb",
              fontSize: "14px",
              cursor: disabled ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              opacity: disabled ? 0.6 : 1,
            }}
          >
            {option === "yes" ? "Yes" : "No"}
          </button>
        );
      })}
    </div>
  );
}

/* ---------- Main Page ---------- */
export default function ProfessorDetailPage({ params }: ProfessorPageProps) {
  const { professorID } = use(params);

  const professorData: Record<string, { name: string; course: string }> = {
    "prof-sharma": { name: "Dr. Sharma", course: "Maths-1" },
    "prof-verma": { name: "Prof. Verma", course: "Maths-1" },
  };

  const professor = professorData[professorID];

  const [reviews, setReviews] = useState<Review[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const [form, setForm] = useState({
    teaching: 0,
    clarity: 0,
    grading: 0,
    chillness: 0,
    approachable: 0,
    lateAttendance: "no",
    lateSubmission: "no",
    standingQuestions: "no",
  });

  /* ---------- Load logged-in email ---------- */
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) setUserEmail(email);
  }, []);

  if (!professor) {
    return <div style={{ padding: "40px", color: "white" }}>Professor not found</div>;
  }

  /* ---------- Prevent duplicate review ---------- */
  const hasReviewed = reviews.some((r) => r.email === userEmail);

  /* ---------- Overall Rating ---------- */
  const overallRating = useMemo(() => {
    if (reviews.length === 0) return 0;

    const total = reviews.reduce(
      (sum, r) =>
        sum +
        (r.teaching +
          r.clarity +
          r.grading +
          r.chillness +
          r.approachable) /
          5,
      0
    );

    return Math.round(total / reviews.length);
  }, [reviews]);

  /* ---------- Submit Review ---------- */
  const submitReview = () => {
    if (!userEmail) {
      alert("Please login first");
      return;
    }

    if (hasReviewed) {
      alert("You have already reviewed this professor.");
      return;
    }

    const newReview: Review = {
      email: userEmail,
      ...form,
      createdAt: new Date().toLocaleString(),
    };

    setReviews([newReview, ...reviews]);
  };

  const visibleReviews = showAll ? reviews : reviews.slice(0, 2);

  /* ---------- UI ---------- */
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "50px",
        background: "radial-gradient(circle at top, #0f2027, #000)",
        color: "white",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* TOP GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "50px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* LEFT PANEL */}
        <div
          style={{
            padding: "30px",
            borderRadius: "20px",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(12px)",
          }}
        >
          <h1 style={{ fontSize: "36px" }}>{professor.name}</h1>
          <p style={{ opacity: 0.8, marginTop: "6px" }}>
            Course: {professor.course}
          </p>

          <h2 style={{ marginTop: "25px" }}>Overall Rating</h2>
          {overallRating === 0 ? (
            <p style={{ opacity: 0.6 }}>No reviews yet</p>
          ) : (
            <Stars value={overallRating} />
          )}
        </div>

        {/* RIGHT PANEL */}
        <div
          style={{
            padding: "30px",
            borderRadius: "20px",
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(14px)",
          }}
        >
          <h2
  style={{
    fontSize: "32px",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: "30px",
    letterSpacing: "0.5px",
  }}
>
  Give Your Review
</h2>


          <p>Teaching Quality</p>
          <StarRating value={form.teaching} onChange={(v) => setForm({ ...form, teaching: v })} />

          <p>Concept Clarity</p>
          <StarRating value={form.clarity} onChange={(v) => setForm({ ...form, clarity: v })} />

          <p>Grading Quality</p>
          <StarRating value={form.grading} onChange={(v) => setForm({ ...form, grading: v })} />

          <p>Chillness</p>
          <StarRating value={form.chillness} onChange={(v) => setForm({ ...form, chillness: v })} />

          <p>Approachable Outside Class</p>
          <StarRating
            value={form.approachable}
            onChange={(v) => setForm({ ...form, approachable: v })}
          />

          {[
            { key: "lateAttendance", label: "Late attendance allowed?" },
            { key: "lateSubmission", label: "Late submission allowed?" },
            { key: "standingQuestions", label: "Stands students for questioning?" },
          ].map((q) => (
            <div key={q.key} style={{ marginTop: "12px" }}>
              <p>{q.label}</p>
            <YesNoPill
  value={(form as any)[q.key]}
  onChange={(v) => setForm({ ...form, [q.key]: v })}
  disabled={hasReviewed}
/>

            </div>
          ))}

          <button
            onClick={submitReview}
            disabled={hasReviewed}
            style={{
              marginTop: "25px",
              width: "100%",
              padding: "14px",
              background: hasReviewed ? "#555" : "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: hasReviewed ? "not-allowed" : "pointer",
              fontSize: "16px",
            }}
          >
            {hasReviewed ? "You already reviewed" : "Submit Review"}
          </button>
        </div>
      </div>

      {/* REVIEWS */}
      <div style={{ maxWidth: "1200px", margin: "50px auto 0" }}>
        <h2>All Reviews</h2>

        {visibleReviews.map((r, i) => (
          <div
            key={i}
            style={{
              marginTop: "18px",
              padding: "20px",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.05)",
            }}
          >
            <p style={{ fontWeight: "600" }}>by {r.email}</p>
            <p style={{ fontSize: "12px", opacity: 0.6 }}>{r.createdAt}</p>

            <p>Teaching: <Stars value={r.teaching} /></p>
            <p>Clarity: <Stars value={r.clarity} /></p>
            <p>Grading: <Stars value={r.grading} /></p>
            <p>Chillness: <Stars value={r.chillness} /></p>
            <p>Approachable: <Stars value={r.approachable} /></p>

            <p>Late Attendance: {r.lateAttendance}</p>
            <p>Late Submission: {r.lateSubmission}</p>
            <p>Standing Questions: {r.standingQuestions}</p>
          </div>
        ))}

        {reviews.length > 2 && (
          <button
            onClick={() => setShowAll(!showAll)}
            style={{
              marginTop: "20px",
              background: "transparent",
              color: "#4fc3f7",
              border: "none",
              cursor: "pointer",
            }}
          >
            {showAll ? "Show Less" : "See More"}
          </button>
        )}
      </div>
    </div>
  );
}
