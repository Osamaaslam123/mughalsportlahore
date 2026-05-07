import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, school, message } = body;
  if (!name || !message) return NextResponse.json({ error: "Name and message required" }, { status: 400 });
  const result = db.prepare("INSERT INTO enquiries (name, email, phone, school, message) VALUES (?, ?, ?, ?, ?)")
    .run(name, email ?? "", phone ?? "", school ?? "", message);
  return NextResponse.json({ id: result.lastInsertRowid, success: true });
}

export async function GET() {
  const enquiries = db.prepare("SELECT * FROM enquiries ORDER BY created_at DESC").all();
  return NextResponse.json({ enquiries });
}
