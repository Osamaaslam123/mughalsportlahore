import { createClient } from "@libsql/client";
import path from "path";
import fs from "fs";

// If DATABASE_URL is set → use Turso cloud (works locally + on Vercel)
// Otherwise             → use local SQLite file (dev fallback)
let db: ReturnType<typeof createClient>;

if (process.env.DATABASE_URL) {
  db = createClient({
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });
} else {
  // Local SQLite file fallback
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  const dbPath = path.join(dataDir, "mughal-sports.db");
  db = createClient({ url: `file:${dbPath}` });
}

export async function initDb() {
  await db.executeMultiple(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      category TEXT NOT NULL,
      brand TEXT,
      image_url TEXT,
      stock INTEGER DEFAULT 0,
      is_featured INTEGER DEFAULT 0,
      is_school_item INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      school TEXT,
      message TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // Seed products if empty
  const { rows } = await db.execute("SELECT COUNT(*) as c FROM products");
  const count = Number((rows[0] as unknown as { c: number }).c);

  if (count === 0) {
    const products = [
      { name: "Kashmir Willow Cricket Bat",    desc: "Professional grade Kashmir willow bat, ideal for school & club cricket.", price: 2500,  cat: "Cricket",   brand: "Mughal Sports", stock: 50,  feat: 1, school: 1 },
      { name: "English Willow Cricket Bat",    desc: "Tournament grade English willow, full size Grade 1.",                     price: 8500,  cat: "Cricket",   brand: "Mughal Sports", stock: 20,  feat: 1, school: 0 },
      { name: "Leather Cricket Ball",          desc: "Red leather ball, 5.5 oz, hand-stitched, PTCB approved.",                price: 850,   cat: "Cricket",   brand: "Mughal Sports", stock: 200, feat: 0, school: 1 },
      { name: "Football Match Ball",           desc: "FIFA quality match ball, size 5, all-weather PU cover.",                 price: 1800,  cat: "Football",  brand: "Mughal Sports", stock: 80,  feat: 1, school: 1 },
      { name: "Football School Kit (11 pcs)",  desc: "Complete school football kit — jerseys, shorts & socks for 11 players.", price: 12000, cat: "Football",  brand: "Mughal Sports", stock: 15,  feat: 1, school: 1 },
      { name: "Hockey Stick Fibreglass",       desc: "Composite fibreglass hockey stick, mid-bow, various sizes.",             price: 3200,  cat: "Hockey",    brand: "Mughal Sports", stock: 40,  feat: 0, school: 1 },
      { name: "Badminton Racket Pro",          desc: "Carbon fibre badminton racket, lightweight, pre-strung.",                price: 1500,  cat: "Badminton", brand: "Mughal Sports", stock: 60,  feat: 1, school: 1 },
      { name: "Boxing Gloves 12oz",            desc: "Premium leather boxing gloves, foam padding, velcro strap.",             price: 2800,  cat: "Boxing",    brand: "Mughal Sports", stock: 30,  feat: 0, school: 0 },
    ];
    for (const p of products) {
      await db.execute({
        sql: "INSERT INTO products (name, description, price, category, brand, stock, is_featured, is_school_item) VALUES (?,?,?,?,?,?,?,?)",
        args: [p.name, p.desc, p.price, p.cat, p.brand, p.stock, p.feat, p.school],
      });
    }
  }
}

export default db;
