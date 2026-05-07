import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dbDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

const db = new Database(path.join(dbDir, "mughal-sports.db"));

db.exec(`
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

  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    icon TEXT,
    description TEXT
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

// Seed categories if empty
const catCount = (db.prepare("SELECT COUNT(*) as c FROM categories").get() as { c: number }).c;
if (catCount === 0) {
  const cats = [
    { name: "Cricket",    icon: "🏏", description: "Bats, balls, pads, gloves, helmets & accessories" },
    { name: "Football",   icon: "⚽", description: "Balls, boots, jerseys, shin guards, nets" },
    { name: "Hockey",     icon: "🏑", description: "Sticks, balls, goalkeeper gear" },
    { name: "Badminton",  icon: "🏸", description: "Rackets, shuttles, nets, bags" },
    { name: "Basketball", icon: "🏀", description: "Balls, hoops, jerseys, shoes" },
    { name: "Volleyball", icon: "🏐", description: "Balls, nets, knee pads, uniforms" },
    { name: "Boxing",     icon: "🥊", description: "Gloves, punching bags, wraps, headgear" },
    { name: "Athletics",  icon: "🏃", description: "Track shoes, stopwatches, cones, batons" },
  ];
  const insertCat = db.prepare("INSERT OR IGNORE INTO categories (name, icon, description) VALUES (?, ?, ?)");
  cats.forEach((c) => insertCat.run(c.name, c.icon, c.description));
}

// Seed products if empty
const prodCount = (db.prepare("SELECT COUNT(*) as c FROM products").get() as { c: number }).c;
if (prodCount === 0) {
  const products = [
    { name: "Kashmir Willow Cricket Bat", description: "Professional grade Kashmir willow bat, ideal for school & club cricket.", price: 2500, category: "Cricket", brand: "Mughal Sports", stock: 50, is_featured: 1, is_school_item: 1 },
    { name: "English Willow Cricket Bat", description: "Tournament grade English willow, full size Grade 1.", price: 8500, category: "Cricket", brand: "Mughal Sports", stock: 20, is_featured: 1, is_school_item: 0 },
    { name: "Leather Cricket Ball", description: "Red leather ball, 5.5 oz, hand-stitched, PTCB approved.", price: 850, category: "Cricket", brand: "Mughal Sports", stock: 200, is_featured: 0, is_school_item: 1 },
    { name: "Football Match Ball", description: "FIFA quality match ball, size 5, all-weather PU cover.", price: 1800, category: "Football", brand: "Mughal Sports", stock: 80, is_featured: 1, is_school_item: 1 },
    { name: "Football School Kit (11 pcs)", description: "Complete school football kit with jerseys, shorts, socks for 11 players.", price: 12000, category: "Football", brand: "Mughal Sports", stock: 15, is_featured: 1, is_school_item: 1 },
    { name: "Hockey Stick Fibreglass", description: "Composite fibreglass hockey stick, mid-bow, sizes available.", price: 3200, category: "Hockey", brand: "Mughal Sports", stock: 40, is_featured: 0, is_school_item: 1 },
    { name: "Badminton Racket Pro", description: "Carbon fibre badminton racket, lightweight, pre-strung.", price: 1500, category: "Badminton", brand: "Mughal Sports", stock: 60, is_featured: 1, is_school_item: 1 },
    { name: "Boxing Gloves 12oz", description: "Premium leather boxing gloves, foam padding, velcro strap.", price: 2800, category: "Boxing", brand: "Mughal Sports", stock: 30, is_featured: 0, is_school_item: 0 },
  ];
  const insertProd = db.prepare("INSERT INTO products (name, description, price, category, brand, stock, is_featured, is_school_item) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  products.forEach((p) => insertProd.run(p.name, p.description, p.price, p.category, p.brand, p.stock, p.is_featured, p.is_school_item));
}

export default db;
