import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

function makeToken(password: string) {
  const secret = process.env.ADMIN_SECRET ?? "fallback-secret";
  return crypto.createHmac("sha256", secret).update(password).digest("hex");
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token    = req.cookies.get("admin_token")?.value ?? "";
    const password = process.env.ADMIN_PASSWORD ?? "MughalAdmin@2025";
    const valid    = makeToken(password);

    if (token !== valid) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
