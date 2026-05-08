import { NextRequest, NextResponse } from "next/server";
import db, { initDb } from "@/lib/db";

async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomUUID();
  const encoder = new TextEncoder();
  const buf = await crypto.subtle.digest("SHA-256", encoder.encode(salt + password));
  const hex = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
  return `${salt}:${hex}`;
}

export async function POST(req: NextRequest) {
  await initDb();
  const { name, email, password, phone, school } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Name, email and password are required" }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
  }

  // Check if email exists
  const { rows } = await db.execute({ sql: "SELECT id FROM customers WHERE email=?", args: [email] });
  if (rows.length > 0) {
    return NextResponse.json({ error: "Email already registered" }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);
  const { lastInsertRowid } = await db.execute({
    sql: "INSERT INTO customers (name, email, password_hash, phone, school) VALUES (?,?,?,?,?)",
    args: [name, email.toLowerCase(), passwordHash, phone || "", school || ""],
  });

  const customerId = Number(lastInsertRowid);
  const token = await makeSessionToken(customerId, email);

  const res = NextResponse.json({ success: true, customer: { id: customerId, name, email } });
  res.cookies.set("customer_token", token, {
    httpOnly: true, secure: process.env.NODE_ENV === "production",
    sameSite: "lax", maxAge: 60 * 60 * 24 * 7, path: "/",
  });
  return res;
}

async function makeSessionToken(id: number, email: string): Promise<string> {
  const secret = process.env.ADMIN_SECRET ?? "fallback-secret";
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(`${id}:${email}`));
  const hex = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, "0")).join("");
  return `${id}:${hex}`;
}
