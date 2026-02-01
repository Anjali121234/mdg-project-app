import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Professor from "@/models/Professor";
import Subject from "@/models/Subject"; // 👈 Import this so populate works!

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    // 👇 ADD .populate("subjects") to get real names instead of just IDs
    const professor = await Professor.findById(id).populate("subjects");

    if (!professor) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(professor);
  } catch (err) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}