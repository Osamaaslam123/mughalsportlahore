import { NextRequest, NextResponse } from "next/server";
import db, { initDb } from "@/lib/db";

async function verifySessionToken(token: string): Promise<number | null> {
  const [idStr, tokenHash] = token.split(":");
  if (!idStr || !tokenHash) return null;
  const id = parseInt(idStr);
  if (isNaN(id)) return null;

  const { rows } = await db.execute({ sql: "SELECT email FROM customers WHERE id=?", args: [id] });
  if (rows.length === 0) return null;

  const email = (rows[0] as unknown as { email: string }).email;
  const secret = process.env.ADMIN_SECRET ?? "fallback-secret";
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(`${id}:${email}`));
  const hex = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, "0")).join("");
  return hex === tokenHash ? id : null;
}

export async function GET(req: NextRequest) {
  await initDb();
  const token = req.cookies.get("customer_token")?.value ?? "";
  if (!token) return NextResponse.json({ customer: null });

  const id = await verifySessionToken(token);
  if (!id) return NextResponse.json({ customer: null });

  const { rows } = await db.execute({ sql: "SELECT id, name, email, phone, school, created_at FROM customers WHERE id=?", args: [id] });
  if (rows.length === 0) return NextResponse.json({ customer: null });

  return NextResponse.json({ customer: rows[0] });
}
