import { NextResponse } from "next/server";
import db, { initDb } from "@/lib/db";

export async function GET() {
  await initDb();
  const { rows } = await db.execute("SELECT id, name, email, phone, school, created_at FROM customers ORDER BY created_at DESC");
  return NextResponse.json({ customers: rows });
}
