import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = db.prepare("SELECT * FROM products WHERE id = ?").get(id);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ product });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { name, description, price, category, brand, image_url, stock, is_featured, is_school_item } = body;

  db.prepare(
    "UPDATE products SET name=?, description=?, price=?, category=?, brand=?, image_url=?, stock=?, is_featured=?, is_school_item=? WHERE id=?"
  ).run(name, description, price, category, brand, image_url, stock, is_featured ? 1 : 0, is_school_item ? 1 : 0, id);

  return NextResponse.json({ success: true });
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  db.prepare("DELETE FROM products WHERE id = ?").run(id);
  return NextResponse.json({ success: true });
}
