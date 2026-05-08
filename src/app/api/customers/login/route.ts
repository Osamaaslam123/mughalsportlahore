import { NextRequest, NextResponse } from "next/server";
import db, { initDb } from "@/lib/db";

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hash] = stored.split(":");
  const encoder = new TextEncoder();
  const buf = await crypto.subtle.digest("SHA-256", encoder.encode(salt + password));
  const hex = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
  return hex === hash;
}

async function makeSessionToken(id: number, email: string): Promise<string> {
  const secret = process.env.ADMIN_SECRET ?? "fallback-secret";
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(`${id}:${email}`));
  const hex = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, "0")).join("");
  return `${id}:${hex}`;
}

export async function POST(req: NextRequest) {
  await initDb();
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  const { rows } = await db.execute({ sql: "SELECT * FROM customers WHERE email=?", args: [email.toLowerCase()] });
  if (rows.length === 0) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const customer = rows[0] as unknown as { id: number; name: string; email: string; password_hash: string; phone: string; school: string };
  const valid = await verifyPassword(password, customer.password_hash);
  if (!valid) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const token = await makeSessionToken(customer.id, customer.email);
  const res = NextResponse.json({ success: true, customer: { id: customer.id, name: customer.name, email: customer.email, phone: customer.phone, school: customer.school } });
  res.cookies.set("customer_token", token, {
    httpOnly: true, secure: process.env.NODE_ENV === "production",
    sameSite: "lax", maxAge: 60 * 60 * 24 * 7, path: "/",
  });
  return res;
}
