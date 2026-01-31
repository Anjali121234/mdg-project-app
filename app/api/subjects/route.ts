
import connectDB from "@/lib/db";
import Subject from "@/models/Subject";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const subjects = await Subject.find();
    return NextResponse.json(subjects);

  } catch (err) {
    console.error("Error in /api/subjects:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
