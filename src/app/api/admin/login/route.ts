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

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const correct = process.env.ADMIN_PASSWORD ?? "MughalAdmin@2025";

  if (password !== correct) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = await makeToken(password);
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
