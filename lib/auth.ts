import jwt from "jsonwebtoken";
import { cookies } from "next/headers"; // 👈 Use this for Next.js 13+ App Router

export async function verifyToken(req?: Request) {
  // 1. Try to get token from Cookies (Best for Page/Server Actions)
  const cookieStore = await cookies();
  let token = cookieStore.get("token")?.value;

  // 2. Fallback: Try Authorization Header (Best for Postman/External API calls)
  if (!token && req?.headers) {
    const authHeader = req.headers.get("authorization");
    if (authHeader) {
      token = authHeader.split(" ")[1];
    }
  }

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded; // { userId: ... }
  } catch {
    return null;
  }
}