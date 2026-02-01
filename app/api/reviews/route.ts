import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Review from "@/models/Review";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const professorId = searchParams.get("professorId");

    if (!professorId) {
      return NextResponse.json([], { status: 200 });
    }

    // 👇 FIXED: The model field is 'professor', not 'professorId'
    const reviews = await Review.find({ professor: professorId }).sort({ createdAt: -1 });
    
    return NextResponse.json(reviews);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    console.log("1. Connecting to DB...");
    await connectDB();
    const body = await req.json();
console.log("2. Received Payload:", body);
if (!body.collegeId) {
      console.log("❌ Error: Missing collegeId");
      return NextResponse.json({ message: "Missing collegeId" }, { status: 400 });
    }
    console.log("3. Creating Review Document...");
    const review = new Review({
      subject: body.subject, 
      professor: body.professor,
      collegeId: body.collegeId, // 👇 FIXED: Saving the email
      teachingQuality: body.teaching,
      conceptClarity: body.clarity,
      gradingQuality: body.grading,
      chillness: body.chillness,
      approachability: body.approachable,
    });
    console.log("4. Saving to DB...");

    await review.save();
    console.log("✅ Saved Successfully!");
    return NextResponse.json({ success: true, review });
  } catch (err) {
    console.error("Error saving review:", err);
    return NextResponse.json({ error: "Failed to save review" }, { status: 500 });
  }
}