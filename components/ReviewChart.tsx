"use client";

import { useMemo } from "react";

export default function ReviewChart({ reviews }: { reviews: any[] }) {
  // 1. Calculate Averages
  const stats = useMemo(() => {
    if (!reviews.length) return [];

    const total = reviews.length;
    
    // Sum up all scores
    const sums = reviews.reduce(
      (acc, r) => ({
        teaching: acc.teaching + (r.teachingQuality || 0),
        clarity: acc.clarity + (r.conceptClarity || 0),
        grading: acc.grading + (r.gradingQuality || 0),
        chillness: acc.chillness + (r.chillness || 0),
        approachable: acc.approachable + (r.approachability || 0),
      }),
      { teaching: 0, clarity: 0, grading: 0, chillness: 0, approachable: 0 }
    );

    // Create array for the chart
    return [
      { label: "Teaching", value: sums.teaching / total, color: "#4caf50" },       // Green
      { label: "Clarity", value: sums.clarity / total, color: "#2196f3" },         // Blue
      { label: "Grading", value: sums.grading / total, color: "#ff9800" },         // Orange
      { label: "Chillness", value: sums.chillness / total, color: "#9c27b0" },     // Purple
      { label: "Approachable", value: sums.approachable / total, color: "#e91e63" } // Pink
    ];
  }, [reviews]);

  if (reviews.length === 0) return null;

  return (
    <div style={{ 
      background: "rgba(0,0,0,0.3)", 
      padding: "25px", 
      borderRadius: "15px", 
      marginTop: "30px",
      border: "1px solid rgba(255,255,255,0.1)"
    }}>
      <h3 style={{ marginTop: 0, marginBottom: "20px" }}>📊 Review Breakdown</h3>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{ display: "flex", alignItems: "center", fontSize: "14px" }}>
            {/* Label */}
            <div style={{ width: "100px", fontWeight: "bold", color: "#ccc" }}>
              {stat.label}
            </div>

            {/* Bar Container */}
            <div style={{ flex: 1, background: "rgba(255,255,255,0.1)", height: "10px", borderRadius: "5px", overflow: "hidden", marginRight: "15px" }}>
              {/* The Actual Bar */}
              <div 
                style={{ 
                  width: `${(stat.value / 5) * 100}%`, // Convert score (0-5) to percentage
                  background: stat.color, 
                  height: "100%", 
                  borderRadius: "5px",
                  transition: "width 0.5s ease"
                }} 
              />
            </div>

            {/* Score Number */}
            <div style={{ width: "30px", textAlign: "right", fontWeight: "bold" }}>
              {stat.value.toFixed(1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}