import { createClient } from "@libsql/client";
import path from "path";
import fs from "fs";

let db: ReturnType<typeof createClient>;

if (process.env.DATABASE_URL) {
  db = createClient({ url: process.env.DATABASE_URL, authToken: process.env.DATABASE_AUTH_TOKEN });
} else {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  db = createClient({ url: `file:${path.join(dataDir, "mughal-sports.db")}` });
}

export async function initDb() {
  await db.executeMultiple(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL, description TEXT, price REAL NOT NULL,
      category TEXT NOT NULL, brand TEXT, image_url TEXT,
      stock INTEGER DEFAULT 0, is_featured INTEGER DEFAULT 0,
      is_school_item INTEGER DEFAULT 0, created_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL, email TEXT, phone TEXT, school TEXT,
      message TEXT, status TEXT DEFAULT 'new',
      created_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS site_content (
      key TEXT PRIMARY KEY, value TEXT NOT NULL,
      updated_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL, school TEXT, review TEXT NOT NULL,
      rating INTEGER DEFAULT 5, is_active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL, email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL, phone TEXT, school TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // Seed products
  const { rows: pr } = await db.execute("SELECT COUNT(*) as c FROM products");
  if (Number((pr[0] as unknown as { c: number }).c) === 0) {
    const products = [
      ["Kashmir Willow Cricket Bat",   "Professional grade Kashmir willow bat, ideal for school & club cricket.", 2500,  "Cricket",   "Mughal Sports", 50,  1, 1],
      ["English Willow Cricket Bat",   "Tournament grade English willow, full size Grade 1.",                     8500,  "Cricket",   "Mughal Sports", 20,  1, 0],
      ["Leather Cricket Ball",         "Red leather ball, 5.5 oz, hand-stitched, PTCB approved.",                850,   "Cricket",   "Mughal Sports", 200, 0, 1],
      ["Football Match Ball",          "FIFA quality match ball, size 5, all-weather PU cover.",                 1800,  "Football",  "Mughal Sports", 80,  1, 1],
      ["Football School Kit (11 pcs)", "Complete school football kit — jerseys, shorts & socks for 11 players.", 12000, "Football",  "Mughal Sports", 15,  1, 1],
      ["Hockey Stick Fibreglass",      "Composite fibreglass hockey stick, mid-bow, various sizes.",             3200,  "Hockey",    "Mughal Sports", 40,  0, 1],
      ["Badminton Racket Pro",         "Carbon fibre badminton racket, lightweight, pre-strung.",                1500,  "Badminton", "Mughal Sports", 60,  1, 1],
      ["Boxing Gloves 12oz",           "Premium leather boxing gloves, foam padding, velcro strap.",             2800,  "Boxing",    "Mughal Sports", 30,  0, 0],
    ];
    for (const p of products) {
      await db.execute({ sql: "INSERT INTO products (name,description,price,category,brand,stock,is_featured,is_school_item) VALUES (?,?,?,?,?,?,?,?)", args: p });
    }
  }

  // Seed site_content
  const { rows: cr } = await db.execute("SELECT COUNT(*) as c FROM site_content");
  if (Number((cr[0] as unknown as { c: number }).c) === 0) {
    const defaults = [
      ["hero_badge",           "🏆 Lahore's #1 Sports Shop"],
      ["hero_description",     "Pakistan's most trusted sports supplier for schools, clubs & athletes. From cricket bats to full school kits — we deliver quality across all of Lahore."],
      ["stats_years",          "20+"],
      ["stats_products",       "500+"],
      ["stats_schools",        "200+"],
      ["stats_customers",      "10K+"],
      ["school_section_title", "Are You a School or Academy?"],
      ["school_section_desc",  "Special bulk pricing for schools, government institutions and sports academies. Custom kits, branded uniforms, complete sports packages available."],
      ["about_story",          "Mughal Sports Lahore was founded in 2005 with a simple mission: provide quality sports equipment to schools and clubs across Lahore at fair prices. Over 20 years, we have grown to become the most trusted sports supplier in Punjab."],
      ["about_mission",        "Our mission is to make quality sports equipment accessible to every school, club, and athlete in Pakistan. We believe sport builds character, and we are proud to support the next generation of Pakistani champions."],
      ["about_vision",         "To be Pakistan's most trusted sports equipment brand, known for quality, reliability, and exceptional service."],
      ["contact_address",      "Lahore, Punjab, Pakistan"],
      ["contact_phone",        "0300-2787977"],
      ["contact_email",        "mughalspors@gmail.com"],
      ["contact_hours",        "Mon–Sat: 9AM – 8PM"],
    ];
    for (const [key, value] of defaults) {
      await db.execute({ sql: "INSERT INTO site_content (key, value) VALUES (?,?)", args: [key, value] });
    }
  }

  // Seed testimonials
  const { rows: tr } = await db.execute("SELECT COUNT(*) as c FROM testimonials");
  if (Number((tr[0] as unknown as { c: number }).c) === 0) {
    const testimonials = [
      ["Principal Ahmed", "Lahore Grammar School",    "Mughal Sports has been our go-to supplier for every school sports event. Quality products, on-time delivery!", 5],
      ["Coach Rafiq",     "DPS Cricket Academy",      "Best cricket equipment in Lahore at the most competitive prices. Highly recommended for all academies.",        5],
      ["Mr. Tariq",       "Punjab Education Foundation", "Supplied sports kits to 50+ schools across Lahore. Professional service and 100% genuine products.",         5],
    ];
    for (const t of testimonials) {
      await db.execute({ sql: "INSERT INTO testimonials (name,school,review,rating) VALUES (?,?,?,?)", args: t });
    }
  }
}

export default db;
