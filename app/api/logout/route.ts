import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });
  
  // 👇 Delete the cookie by setting it to expire immediately
  response.cookies.delete("token");

  return response;
}