import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/login", "/"],
  runtime: "nodejs",
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const { pathname } = request.nextUrl;

  const { verifyToken } = require("./lib/jwt");

  if (pathname.startsWith("/login") || pathname === "/") {
    if (token) {
      const payload = verifyToken(token);
      console.log(payload);
      if (payload && payload.role === "user") {
        return NextResponse.redirect(new URL("/user/dashboard", request.url));
      } else if (payload && payload.role === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
    }
  }

  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const payload = verifyToken(token);
    if (!payload || payload.role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (pathname.startsWith("/user")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const payload = verifyToken(token);
    if (!payload || payload.role !== "user") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
