import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Review from "@/models/Review";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const professorId = searchParams.get("professorId");

    if (!professorId) {
      return NextResponse.json({}, { status: 200 });
    }

    const result = await Review.aggregate([
      { $match: { professorId } },
      {
        $group: {
          _id: "$professorId",
          avgTeaching: { $avg: "$teaching" },
          avgClarity: { $avg: "$clarity" },
          avgGrading: { $avg: "$grading" },
          avgChillness: { $avg: "$chillness" },
          avgApproachable: { $avg: "$approachable" },
        },
      },
    ]);

    return NextResponse.json(result[0] || {});
  } catch (err) {
    return NextResponse.json({ error: "Failed to aggregate reviews" }, { status: 500 });
  }
}