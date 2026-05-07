import { NextRequest, NextResponse } from "next/server";
import db, { initDb } from "@/lib/db";

export async function GET(req: NextRequest) {
  await initDb();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const featured  = searchParams.get("featured");
  const school    = searchParams.get("school");
  const search    = searchParams.get("search");

  let sql    = "SELECT * FROM products WHERE 1=1";
  const args: (string | number)[] = [];

  if (category) { sql += " AND LOWER(category) = LOWER(?)"; args.push(category); }
  if (featured === "1") { sql += " AND is_featured = 1"; }
  if (school   === "1") { sql += " AND is_school_item = 1"; }
  if (search)  { sql += " AND (LOWER(name) LIKE LOWER(?) OR LOWER(description) LIKE LOWER(?))"; args.push(`%${search}%`, `%${search}%`); }
  sql += " ORDER BY is_featured DESC, id DESC";

  const { rows } = await db.execute({ sql, args });
  return NextResponse.json({ products: rows });
}

export async function POST(req: NextRequest) {
  await initDb();
  const body = await req.json();
  const { name, description, price, category, brand, image_url, stock, is_featured, is_school_item } = body;
  if (!name || !price || !category)
    return NextResponse.json({ error: "name, price, and category are required" }, { status: 400 });

  const result = await db.execute({
    sql: "INSERT INTO products (name, description, price, category, brand, image_url, stock, is_featured, is_school_item) VALUES (?,?,?,?,?,?,?,?,?)",
    args: [name, description ?? "", price, category, brand ?? "", image_url ?? "", stock ?? 0, is_featured ? 1 : 0, is_school_item ? 1 : 0],
  });
  return NextResponse.json({ id: result.lastInsertRowid, success: true });
}
