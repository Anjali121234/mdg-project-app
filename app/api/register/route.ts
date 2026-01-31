import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, collegeId, password } = body;

    if (!name || !collegeId || !password) {
      return NextResponse.json(
        { message: "Name, College ID and password required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ collegeId });
    if (existingUser) {
      return NextResponse.json(
        { message: "College ID already registered" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await User.create({
      name,
      collegeId,
      password: hashedPassword,
    });

    return NextResponse.json({
      message: "User registered successfully",
      userId: user._id,
      name: user.name,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error registering user" },
      { status: 500 }
    );
  }
}
