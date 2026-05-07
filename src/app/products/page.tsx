"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  image_url: string;
  stock: number;
  is_featured: number;
  is_school_item: number;
}

const CATEGORIES = ["All", "Cricket", "Football", "Hockey", "Badminton", "Basketball", "Volleyball", "Boxing", "Athletics"];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [schoolOnly, setSchoolOnly] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (activeCategory !== "All") params.set("category", activeCategory);
    if (search) params.set("search", search);
    if (schoolOnly) params.set("school", "1");
    const res = await fetch(`/api/products?${params}`);
    const data = await res.json();
    setProducts(data.products ?? []);
    setLoading(false);
  }, [activeCategory, search, schoolOnly]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const catIcons: Record<string, string> = {
    All: "🏅", Cricket: "🏏", Football: "⚽", Hockey: "🏑",
    Badminton: "🏸", Basketball: "🏀", Volleyball: "🏐", Boxing: "🥊", Athletics: "🏃",
  };

  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh", paddingTop: "70px" }}>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0d1a0d 0%, #0a0a0f 50%, #1a1500 100%)",
        padding: "4rem 2rem 3rem", textAlign: "center",
        borderBottom: "1px solid rgba(201,162,39,0.15)",
      }}>
        <h1 className="section-title" style={{ marginBottom: "0.75rem" }}>
          <span className="gold-text">All Products</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: "500px", margin: "0 auto 2rem" }}>
          Quality sports equipment for schools, clubs, and individual athletes in Lahore
        </p>

        {/* Search */}
        <div style={{ maxWidth: "500px", margin: "0 auto", position: "relative" }}>
          <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", fontSize: "1.1rem" }}>🔍</span>
          <input
            className="input-dark"
            placeholder="Search cricket bats, footballs, jerseys..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: "2.8rem", fontSize: "0.95rem" }}
          />
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>

        {/* Filters Row */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem", alignItems: "center" }}>
          {/* Category tabs */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", flex: 1 }}>
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                background: activeCategory === cat ? "linear-gradient(135deg, #c9a227, #f0c94b)" : "rgba(255,255,255,0.06)",
                color: activeCategory === cat ? "#000" : "rgba(255,255,255,0.7)",
                border: activeCategory === cat ? "none" : "1px solid rgba(201,162,39,0.2)",
                borderRadius: "999px", padding: "0.4rem 1rem", cursor: "pointer",
                fontWeight: activeCategory === cat ? 700 : 500, fontSize: "0.85rem",
                transition: "all 0.2s",
              }}>
                {catIcons[cat]} {cat}
              </button>
            ))}
          </div>
          {/* School filter toggle */}
          <button onClick={() => setSchoolOnly(!schoolOnly)} style={{
            background: schoolOnly ? "linear-gradient(135deg, #1a5c2a, #2a8a3e)" : "rgba(255,255,255,0.06)",
            color: "#fff", border: "1px solid rgba(42,138,62,0.4)",
            borderRadius: "999px", padding: "0.4rem 1rem", cursor: "pointer", fontSize: "0.85rem",
            fontWeight: schoolOnly ? 700 : 500, transition: "all 0.2s",
          }}>
            🏫 {schoolOnly ? "✓ School Items" : "School Items"}
          </button>
        </div>

        {/* Results count */}
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
          {loading ? "Loading..." : `${products.length} product${products.length !== 1 ? "s" : ""} found`}
        </p>

        {/* Products Grid */}
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1.5rem" }}>
            {[...Array(8)].map((_, i) => (
              <div key={i} className="glass" style={{ height: "320px", opacity: 0.4, animation: "glow-pulse 1.5s ease-in-out infinite" }} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem", color: "rgba(255,255,255,0.4)" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔍</div>
            <p>No products found. Try a different search or category.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1.5rem" }}>
            {products.map((p) => (
              <div key={p.id} className="glass card-3d" style={{ overflow: "hidden", position: "relative" }}>
                {/* Image */}
                <div style={{
                  height: "180px", background: "linear-gradient(135deg, #111118, #1a1500)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "4rem", position: "relative", overflow: "hidden",
                }}>
                  {p.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image_url} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} className="product-img" />
                  ) : (
                    <span>{catIcons[p.category] ?? "🏅"}</span>
                  )}
                  {p.is_featured === 1 && (
                    <span className="badge-gold" style={{ position: "absolute", top: "0.6rem", left: "0.6rem" }}>Featured</span>
                  )}
                  {p.is_school_item === 1 && (
                    <span className="badge-green" style={{ position: "absolute", top: "0.6rem", right: "0.6rem" }}>School</span>
                  )}
                </div>
                {/* Info */}
                <div style={{ padding: "1.25rem" }}>
                  <div style={{ color: "rgba(201,162,39,0.7)", fontSize: "0.75rem", marginBottom: "0.3rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>{p.category}</div>
                  <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.4rem", lineHeight: 1.3 }}>{p.name}</h3>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.78rem", lineHeight: 1.5, marginBottom: "1rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {p.description}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ color: "#f0c94b", fontWeight: 900, fontSize: "1.1rem" }}>Rs {p.price.toLocaleString()}</span>
                      <div style={{ color: p.stock > 0 ? "#2a8a3e" : "#e44", fontSize: "0.72rem" }}>
                        {p.stock > 0 ? `✓ ${p.stock} in stock` : "✗ Out of stock"}
                      </div>
                    </div>
                    <Link href="/contact" style={{
                      background: "linear-gradient(135deg,#c9a227,#f0c94b)",
                      color: "#000", fontWeight: 700, fontSize: "0.78rem",
                      padding: "0.45rem 0.9rem", borderRadius: "0.4rem",
                      textDecoration: "none", transition: "all 0.2s",
                    }}>
                      Enquire
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
