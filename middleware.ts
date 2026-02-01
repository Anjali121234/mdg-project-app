import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Get the token from the browser cookies
  const token = request.cookies.get("token")?.value;

  // 2. Get the current URL path
  const { pathname } = request.nextUrl;

  // 3. Define the ONLY paths that are public
  // Add "/" if you want the home page to be visible to everyone.
  const publicPaths = ["/login", "/register", "/api/login", "/api/register", "/"];

  // Check if the user is currently on a public path
  const isPublicPath = publicPaths.some((path) => pathname === path);

  // ---------------------------------------------------------
  // 🛡️ SECURITY LOGIC
  // ---------------------------------------------------------

  // RULE 1: If user is NOT logged in and tries to access a PRIVATE page...
  // (i.e., not in the public list, and not a static asset like an image)
  if (!token && !isPublicPath) {
    // ... Redirect them to Login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // RULE 2: If user IS logged in but tries to visit Login/Register...
  if (token && (pathname === "/login" || pathname === "/register")) {
    // ... Redirect them to the Dashboard/Courses (User is already logged in!)
    return NextResponse.redirect(new URL("/courses", request.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

// ---------------------------------------------------------
// ⚙️ CONFIGURATION
// ---------------------------------------------------------
export const config = {
  // This matcher ensures the middleware runs on ALL paths except:
  // - _next/static (system files)
  // - _next/image (images)
  // - favicon.ico
  // - public folder assets (images, fonts, etc.)
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};