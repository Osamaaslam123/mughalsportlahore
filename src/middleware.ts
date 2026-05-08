import { NextRequest, NextResponse } from "next/server";

async function makeToken(password: string): Promise<string> {
  const secret  = process.env.ADMIN_SECRET ?? "fallback-secret";
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(password));
  return Array.from(new Uint8Array(sig))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token    = req.cookies.get("admin_token")?.value ?? "";
    const password = process.env.ADMIN_PASSWORD ?? "MughalAdmin@2025";
    const valid    = await makeToken(password);

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
