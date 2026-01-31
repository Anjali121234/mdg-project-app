import connectDB from "@/lib/db";
import Review from "@/models/Review";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const review = await Review.create(body);

    return NextResponse.json(
      { message: "Review submitted", review },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Error submitting review" },
      { status: 500 }
    );
  }
}
