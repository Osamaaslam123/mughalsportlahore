import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

function makeToken(password: string) {
  const secret = process.env.ADMIN_SECRET ?? "fallback-secret";
  return crypto.createHmac("sha256", secret).update(password).digest("hex");
}

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const correct = process.env.ADMIN_PASSWORD ?? "MughalAdmin@2025";

  if (password !== correct) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = makeToken(password);
  const res   = NextResponse.json({ success: true });

  res.cookies.set("admin_token", token, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge:   60 * 60 * 8, // 8 hours
    path:     "/",
  });

  return res;
}
