import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");
  const school = searchParams.get("school");
  const search = searchParams.get("search");

  let query = "SELECT * FROM products WHERE 1=1";
  const params: (string | number)[] = [];

  if (category) { query += " AND LOWER(category) = LOWER(?)"; params.push(category); }
  if (featured === "1") { query += " AND is_featured = 1"; }
  if (school === "1") { query += " AND is_school_item = 1"; }
  if (search) { query += " AND (LOWER(name) LIKE LOWER(?) OR LOWER(description) LIKE LOWER(?))"; params.push(`%${search}%`, `%${search}%`); }
  query += " ORDER BY is_featured DESC, id DESC";

  const products = db.prepare(query).all(...params);
  return NextResponse.json({ products });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, description, price, category, brand, image_url, stock, is_featured, is_school_item } = body;

  if (!name || !price || !category) {
    return NextResponse.json({ error: "name, price, and category are required" }, { status: 400 });
  }

  const result = db.prepare(
    "INSERT INTO products (name, description, price, category, brand, image_url, stock, is_featured, is_school_item) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).run(name, description ?? "", price, category, brand ?? "", image_url ?? "", stock ?? 0, is_featured ? 1 : 0, is_school_item ? 1 : 0);

  return NextResponse.json({ id: result.lastInsertRowid, success: true });
}
