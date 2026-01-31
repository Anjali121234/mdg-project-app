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

    if (!subjectId || !professorId) {
      return NextResponse.json(
        { message: "subjectId and professorId required" },
        { status: 400 }
      );
    }

    const data = await Review.aggregate([
      {
        $match: {
          subject: new mongoose.Types.ObjectId(subjectId),
          professor: new mongoose.Types.ObjectId(professorId),
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },

          // ⭐ averages
          teachingQuality: { $avg: "$teachingQuality" },
          conceptClarity: { $avg: "$conceptClarity" },
          gradingQuality: { $avg: "$gradingQuality" },
          chillness: { $avg: "$chillness" },
          approachability: { $avg: "$approachability" },

          // yes/no → % yes
          lateAttendanceYes: {
            $avg: { $cond: ["$lateAttendanceAllowed", 1, 0] },
          },
          lateSubmissionYes: {
            $avg: { $cond: ["$lateSubmissionAllowed", 1, 0] },
          },
          standingQuestionsYes: {
            $avg: { $cond: ["$standingQuestionsAllowed", 1, 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          count: 1,

          teachingQuality: { $round: ["$teachingQuality", 1] },
          conceptClarity: { $round: ["$conceptClarity", 1] },
          gradingQuality: { $round: ["$gradingQuality", 1] },
          chillness: { $round: ["$chillness", 1] },
          approachability: { $round: ["$approachability", 1] },

          // ⭐ overall rating
          overallRating: {
            $round: [
              {
                $avg: [
                  "$teachingQuality",
                  "$conceptClarity",
                  "$gradingQuality",
                  "$chillness",
                  "$approachability",
                ],
              },
              1,
            ],
          },

          // percentages
          lateAttendancePercentage: {
            $round: [{ $multiply: ["$lateAttendanceYes", 100] }, 0],
          },
          lateSubmissionPercentage: {
            $round: [{ $multiply: ["$lateSubmissionYes", 100] }, 0],
          },
          standingQuestionsPercentage: {
            $round: [{ $multiply: ["$standingQuestionsYes", 100] }, 0],
          },

          // final yes/no (majority rule)
          lateAttendanceAllowed: { $gt: ["$lateAttendanceYes", 0.5] },
          lateSubmissionAllowed: { $gt: ["$lateSubmissionYes", 0.5] },
          standingQuestionsAllowed: { $gt: ["$standingQuestionsYes", 0.5] },
        },
      },
    ]);

   
    if (data.length === 0) {
      return NextResponse.json({
        count: 0,
        overallRating: 0,
        teachingQuality: 0,
        conceptClarity: 0,
        gradingQuality: 0,
        chillness: 0,
        approachability: 0,
        lateAttendanceAllowed: false,
        lateSubmissionAllowed: false,
        standingQuestionsAllowed: false,
        lateAttendancePercentage: 0,
        lateSubmissionPercentage: 0,
        standingQuestionsPercentage: 0,
      });
    }

    return NextResponse.json(data[0]);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
