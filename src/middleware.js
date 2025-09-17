// middleware.js
import { NextResponse } from "next/server";
import { verifyToken } from "./helpers/verifyToken";

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // ✅ Public auth pages
  const publicAuthPages = ["/login", "/register"];
  if (publicAuthPages.includes(pathname)) {
    if (token) {
      const user = await verifyToken(token);
      if (user) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
    return NextResponse.next();
  }

  // ✅ Protected dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const user = await verifyToken(token);
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Allow access if token is valid
    return NextResponse.next();
  }

  // ✅ All other routes allowed
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*"],
};
