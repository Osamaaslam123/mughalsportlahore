import { NextRequest, NextResponse } from "next/server";
import db, { initDb } from "@/lib/db";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await initDb();
  const { id } = await params;
  const { rows } = await db.execute({ sql: "SELECT * FROM products WHERE id = ?", args: [id] });
  if (!rows[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ product: rows[0] });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await initDb();
  const { id } = await params;
  const { name, description, price, category, brand, image_url, stock, is_featured, is_school_item } = await req.json();
  await db.execute({
    sql: "UPDATE products SET name=?,description=?,price=?,category=?,brand=?,image_url=?,stock=?,is_featured=?,is_school_item=? WHERE id=?",
    args: [name, description, price, category, brand, image_url, stock, is_featured ? 1 : 0, is_school_item ? 1 : 0, id],
  });
  return NextResponse.json({ success: true });
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await initDb();
  const { id } = await params;
  await db.execute({ sql: "DELETE FROM products WHERE id = ?", args: [id] });
  return NextResponse.json({ success: true });
}
