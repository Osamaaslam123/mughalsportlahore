import { NextRequest, NextResponse } from "next/server";
import db, { initDb } from "@/lib/db";

export async function GET() {
  await initDb();
  const { rows } = await db.execute("SELECT key, value FROM site_content");
  const content: Record<string, string> = {};
  for (const row of rows) {
    const r = row as unknown as { key: string; value: string };
    content[r.key] = r.value;
  }
  return NextResponse.json({ content });
}

export async function PUT(req: NextRequest) {
  await initDb();
  const { updates } = await req.json() as { updates: Record<string, string> };
  for (const [key, value] of Object.entries(updates)) {
    await db.execute({
      sql: "INSERT INTO site_content (key, value, updated_at) VALUES (?,?,datetime('now')) ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=excluded.updated_at",
      args: [key, value],
    });
  }
  return NextResponse.json({ success: true });
}
