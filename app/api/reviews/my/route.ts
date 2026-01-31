import connectDB from "@/lib/db";
import Review from "@/models/Review";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const subjectId = searchParams.get("subjectId");
    const professorId = searchParams.get("professorId");
    const userId = searchParams.get("userId"); // senior's id

    if (!subjectId || !professorId || !userId) {
      return NextResponse.json(
        { message: "subjectId, professorId and userId are required" },
        { status: 400 }
      );
    }

    const review = await Review.findOne({
      subject: new mongoose.Types.ObjectId(subjectId),
      professor: new mongoose.Types.ObjectId(professorId),
      user: new mongoose.Types.ObjectId(userId),
    });

    if (!review) {
      return NextResponse.json(null); // no review submitted yet
    }

    return NextResponse.json(review);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
