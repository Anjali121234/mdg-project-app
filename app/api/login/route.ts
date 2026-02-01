import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  await connectDB();

  const { collegeId, password } = await req.json();

  if (!collegeId || !password) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  const user = await User.findOne({ collegeId });
  if (!user) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  // 👇 CREATE RESPONSE OBJECT
  const response = NextResponse.json({
    message: "Login successful",
    user: { id: user._id, name: user.name, collegeId: user.collegeId },
  });

  // 👇 SET THE COOKIE (This is the key to Middleware!)
  response.cookies.set("token", token, {
    httpOnly: true, // Secure: JavaScript cannot read this (prevents XSS)
    path: "/", // Available on whole site
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}