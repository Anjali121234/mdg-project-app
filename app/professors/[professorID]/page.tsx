"use client";
import { use } from "react";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ReviewChart from "@/components/ReviewChart";

/* ---------- Types ---------- */
type PageProps = {
  params: Promise<{ professorID: string }>;
};

type Review = {
  collegeId: string;
  teachingQuality: number; // Updated to match DB response mapping if necessary, or map manually
  conceptClarity: number;
  gradingQuality: number;
  chillness: number;
  approachability: number;
  createdAt: string;
};

// ... Stars and StarRating components remain the same ...
function Stars({ value }: { value: number }) {
  return <span style={{ color: "#FFD700" }}>{"★".repeat(value)}{"☆".repeat(5 - value)}</span>;
}
function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} onClick={() => onChange(s)} style={{ cursor: "pointer", fontSize: "22px", color: s <= value ? "#FFD700" : "#444", marginRight: "4px" }}>★</span>
      ))}
    </div>
  );
}

/* ---------- Page ---------- */
export default function ProfessorPage({ params }: PageProps) {
  const { professorID } = use(params);
const [currentUser, setCurrentUser] = useState("");
  const [professor, setProfessor] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]); // simplified type for demo
  const [userEmail, setUserEmail] = useState("");

  const [form, setForm] = useState({
    teaching: 0,
    clarity: 0,
    grading: 0,
    chillness: 0,
    approachable: 0,
  });

  /* ---------- Load data ---------- */
  useEffect(() => {
    const load = async () => {
      // 1. Fetch Professor
      const p = await fetch(`/api/professors/${professorID}`).then((r) => r.json());
      setProfessor(p);

      // 2. Fetch Reviews
      const r = await fetch(`/api/reviews?professorId=${professorID}`).then((r) => r.json());
      setReviews(r);
    };
    load();
  }, [professorID]);

  useEffect(() => {
   const user = localStorage.getItem("currentUser");
    if (user) setCurrentUser(user);
  }, []);

  const hasReviewed = reviews.some((r) => r.collegeId === currentUser);
  const overallRating = useMemo(() => {
    if (!reviews.length) return 0;
    return Math.round(
      reviews.reduce(
        (s, r) =>
          s +
          // Note: Ensure these property names match what your API returns (teachingQuality vs teaching)
          (r.teachingQuality + r.conceptClarity + r.gradingQuality + r.chillness + r.approachability) / 5,
        0
      ) / reviews.length
    );
  }, [reviews]);

  /* ---------- Submit ---------- */
  /* ---------- Submit ---------- */
  const searchParams = useSearchParams();
  const subjectIdFromUrl = searchParams.get("subjectId");
 const submitReview = async (e: any) => {
    e.preventDefault();
    console.log("🚀 Submit button clicked!");

    // 1. Validation Checks
    if (!currentUser) {
      alert("Please login first.");
      return;
    }
    if (hasReviewed) {
      alert("You have already reviewed this professor.");
      return;
    }

    // 2. Resolve Subject ID
    let finalSubjectId = subjectIdFromUrl;
    if (!finalSubjectId && professor?.subjects?.length > 0) {
       const firstSub = professor.subjects[0];
       finalSubjectId = typeof firstSub === 'object' ? firstSub._id : firstSub;
    }
    if (!finalSubjectId) return alert("Error: No subject found.");

    // 3. Send Data to API
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: finalSubjectId, 
          professor: professorID,
          collegeId: currentUser,
          teaching: form.teaching,
          clarity: form.clarity,
          grading: form.grading,
          chillness: form.chillness,
          approachable: form.approachable,
        }),
      });

      const data = await res.json(); // Read the response

      if (res.ok) {
        // ✅ SUCCESS! Only now do we reload.
        alert("Review Saved!");
        location.reload();
      } else {
        // ❌ ERROR! Show the message and DO NOT reload.
        console.error("Server Error:", data);
        alert("Failed to save: " + (data.message || "Unknown Error"));
      }

    } catch (error) {
      console.error("Network Error:", error);
      alert("Something went wrong with the connection.");
    }
  };

  if (!professor) {
  return (
    <div className="flex items-center justify-center h-screen text-white">
      Loading...
    </div>
  );
}

return (
 <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] text-white px-0 sm:px-6 md:px-10 py-12">



    
    {/* Professor Header */}
    <div className="mb-10">
      <h1 className="text-4xl font-bold">{professor.name}</h1>
      <p className="text-lg text-gray-400 mt-1">{professor.course}</p>
    </div>

    {/* Main Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

      {/* LEFT: Ratings Overview */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Overall Rating</h2>

        {overallRating ? (
          <div className="flex items-center gap-4 mb-6">
            <Stars value={overallRating} />
            <span className="text-xl font-medium">
              {overallRating.toFixed(1)} / 5
            </span>
          </div>
        ) : (
          <p className="text-gray-400">No reviews yet</p>
        )}
<div className="w-full overflow-x-auto">
  <div className="min-w-[320px] h-[240px] sm:h-[280px] md:h-[320px]">
    <ReviewChart reviews={reviews} />
  </div>
</div>

      </div>

      {/* RIGHT: Review Form */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Give Your Review</h2>

        <div className="space-y-4">
          {["teaching", "clarity", "grading", "chillness", "approachable"].map((k) => (
            <div key={k} className="flex items-center justify-between">
              <p className="capitalize text-gray-300">{k}</p>
              <StarRating
                value={(form as any)[k]}
                onChange={(v) => setForm({ ...form, [k]: v })}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={submitReview}
          disabled={hasReviewed}
          className={`mt-8 w-full py-3 rounded-xl font-semibold transition
            ${hasReviewed
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-500"}
          `}
        >
          {hasReviewed ? "Already Reviewed" : "Submit Review"}
        </button>
      </div>
    </div>

    {/* ALL REVIEWS */}
    <div className="mt-14">
      <h2 className="text-3xl font-semibold mb-6">All Reviews</h2>

      {reviews.length === 0 && (
        <p className="text-gray-400">No reviews yet.</p>
      )}

      <div className="space-y-4">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="bg-white/5 backdrop-blur-md p-4 rounded-xl flex items-center justify-between"
          >
            <div>
              <p className="font-medium">{r.collegeId}</p>
           
            </div>
            <Stars value={r.teachingQuality} />
          </div>
        ))}
      </div>
    </div>
  </div>
);
}
