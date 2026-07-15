import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface DecodedToken {
  userId: string;
  email: string;
  role: "MEMBER" | "ADMIN" | "COACH";
  exp?: number;
}

function decodeJwt(token: string): DecodedToken | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded) as DecodedToken;
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const { pathname } = req.nextUrl;

  const decoded = token ? decodeJwt(token) : null;
  const isExpired = decoded?.exp ? decoded.exp * 1000 < Date.now() : true;
  const user = !isExpired ? decoded : null;

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    if (!user) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    if (user.role !== "ADMIN") {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!user) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // Redirect logged-in users away from login/register pages
  if (pathname === "/login" || pathname === "/register") {
    if (user) {
      const url = req.nextUrl.clone();
      url.pathname = user.role === "ADMIN" ? "/admin" : "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/login",
    "/register",
  ],
};
