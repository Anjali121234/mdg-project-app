import connectDB from "@/lib/db";
import Professor from "@/models/Professor";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  context: { params: Promise<{ subjectId: string }> }
) {
  try {
    await connectDB();

    // ✅ await params
    const { subjectId } = await context.params;

    const objectId = new mongoose.Types.ObjectId(subjectId);

    const professors = await Professor.find({
      subjects: objectId,
    });

    return NextResponse.json(professors);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
