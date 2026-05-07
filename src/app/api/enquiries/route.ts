import { NextRequest, NextResponse } from "next/server";
import db, { initDb } from "@/lib/db";

export async function POST(req: NextRequest) {
  await initDb();
  const { name, email, phone, school, message } = await req.json();
  if (!name || !message) return NextResponse.json({ error: "Name and message required" }, { status: 400 });
  const result = await db.execute({
    sql: "INSERT INTO enquiries (name, email, phone, school, message) VALUES (?,?,?,?,?)",
    args: [name, email ?? "", phone ?? "", school ?? "", message],
  });
  return NextResponse.json({ id: result.lastInsertRowid, success: true });
}

export async function GET() {
  await initDb();
  const { rows } = await db.execute("SELECT * FROM enquiries ORDER BY created_at DESC");
  return NextResponse.json({ enquiries: rows });
}
