import { NextRequest, NextResponse } from "next/server";
import db, { initDb } from "@/lib/db";

export async function GET() {
  await initDb();
  const { rows } = await db.execute("SELECT * FROM testimonials ORDER BY created_at DESC");
  return NextResponse.json({ testimonials: rows });
}

export async function POST(req: NextRequest) {
  await initDb();
  const { name, school, review, rating } = await req.json();
  const { lastInsertRowid } = await db.execute({
    sql: "INSERT INTO testimonials (name, school, review, rating) VALUES (?,?,?,?)",
    args: [name, school || "", review, rating || 5],
  });
  return NextResponse.json({ success: true, id: Number(lastInsertRowid) });
}

export async function PUT(req: NextRequest) {
  await initDb();
  const { id, name, school, review, rating, is_active } = await req.json();
  await db.execute({
    sql: "UPDATE testimonials SET name=?, school=?, review=?, rating=?, is_active=? WHERE id=?",
    args: [name, school || "", review, rating || 5, is_active ?? 1, id],
  });
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  await initDb();
  const { id } = await req.json();
  await db.execute({ sql: "DELETE FROM testimonials WHERE id=?", args: [id] });
  return NextResponse.json({ success: true });
}
