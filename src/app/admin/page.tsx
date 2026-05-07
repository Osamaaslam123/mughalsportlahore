"use client";
import { useState, useEffect, useRef } from "react";

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

interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  school: string;
  message: string;
  created_at: string;
}

const CATEGORIES = ["Cricket", "Football", "Hockey", "Badminton", "Basketball", "Volleyball", "Boxing", "Athletics"];
const EMPTY_FORM = { name: "", description: "", price: "", category: "Cricket", brand: "Mughal Sports", image_url: "", stock: "", is_featured: false, is_school_item: false };

export default function AdminPage() {
  const [tab, setTab] = useState<"products" | "enquiries" | "add">("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchAll = async () => {
    const [pr, eq] = await Promise.all([
      fetch("/api/products").then((r) => r.json()),
      fetch("/api/enquiries").then((r) => r.json()),
    ]);
    setProducts(pr.products ?? []);
    setEnquiries(eq.enquiries ?? []);
  };

  useEffect(() => { fetchAll(); }, []);

  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(""), 3000); };

  const handleSave = async () => {
    if (!form.name || !form.price || !form.category) { flash("❌ Name, price, category are required"); return; }
    setSaving(true);
    const payload = { ...form, price: parseFloat(form.price), stock: parseInt(form.stock) || 0 };
    const url = editId ? `/api/products/${editId}` : "/api/products";
    const method = editId ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    flash(editId ? "✅ Product updated!" : "✅ Product added!");
    setForm(EMPTY_FORM);
    setEditId(null);
    setTab("products");
    fetchAll();
    setSaving(false);
  };

  const handleEdit = (p: Product) => {
    setForm({ name: p.name, description: p.description, price: String(p.price), category: p.category, brand: p.brand, image_url: p.image_url, stock: String(p.stock), is_featured: p.is_featured === 1, is_school_item: p.is_school_item === 1 });
    setEditId(p.id);
    setTab("add");
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setDeleteConfirm(null);
    flash("🗑️ Product deleted");
    fetchAll();
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) { setForm((f) => ({ ...f, image_url: data.url })); flash("✅ Image uploaded!"); }
    else { flash("❌ Upload failed"); }
    setUploading(false);
  };

  const catIcons: Record<string, string> = { Cricket:"🏏", Football:"⚽", Hockey:"🏑", Badminton:"🏸", Basketball:"🏀", Volleyball:"🏐", Boxing:"🥊", Athletics:"🏃" };

  const inputStyle = { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(201,162,39,0.3)", borderRadius: "0.5rem", color: "#fff", padding: "0.65rem 1rem", width: "100%", outline: "none", fontSize: "0.9rem" };
  const labelStyle = { color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", marginBottom: "0.4rem", display: "block", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.05em" };

  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh", paddingTop: "70px" }}>

      {/* Admin Header */}
      <div style={{ background: "linear-gradient(135deg, #111118, #0a0a0f)", borderBottom: "1px solid rgba(201,162,39,0.2)", padding: "2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ color: "#f0c94b", fontWeight: 900, fontSize: "1.5rem", marginBottom: "0.25rem" }}>🛡️ Admin Panel</h1>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>Mughal Sports Lahore — Content Management</p>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ textAlign: "center", background: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.2)", borderRadius: "0.75rem", padding: "0.75rem 1.25rem" }}>
              <div style={{ color: "#f0c94b", fontWeight: 800, fontSize: "1.3rem" }}>{products.length}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem" }}>Products</div>
            </div>
            <div style={{ textAlign: "center", background: "rgba(42,138,62,0.1)", border: "1px solid rgba(42,138,62,0.2)", borderRadius: "0.75rem", padding: "0.75rem 1.25rem" }}>
              <div style={{ color: "#2a8a3e", fontWeight: 800, fontSize: "1.3rem" }}>{enquiries.length}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem" }}>Enquiries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Flash Message */}
      {msg && (
        <div style={{ background: msg.startsWith("❌") ? "rgba(220,50,50,0.15)" : "rgba(42,138,62,0.15)", border: `1px solid ${msg.startsWith("❌") ? "rgba(220,50,50,0.4)" : "rgba(42,138,62,0.4)"}`, color: "#fff", padding: "0.75rem 2rem", textAlign: "center", fontSize: "0.9rem" }}>
          {msg}
        </div>
      )}

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", borderBottom: "1px solid rgba(201,162,39,0.15)", paddingBottom: "1rem" }}>
          {([["products", "📦 Products"], ["add", editId ? "✏️ Edit Product" : "➕ Add Product"], ["enquiries", "📋 Enquiries"]] as const).map(([key, label]) => (
            <button key={key} onClick={() => { setTab(key); if (key !== "add") { setEditId(null); setForm(EMPTY_FORM); } }} style={{
              background: tab === key ? "linear-gradient(135deg,#c9a227,#f0c94b)" : "rgba(255,255,255,0.06)",
              color: tab === key ? "#000" : "rgba(255,255,255,0.7)",
              border: "none", borderRadius: "0.5rem", padding: "0.6rem 1.25rem",
              fontWeight: 700, fontSize: "0.85rem", cursor: "pointer",
            }}>
              {label}
            </button>
          ))}
        </div>

        {/* ── PRODUCTS TAB ── */}
        {tab === "products" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
              <h2 style={{ color: "#fff", fontWeight: 700 }}>All Products ({products.length})</h2>
              <button onClick={() => { setTab("add"); setEditId(null); setForm(EMPTY_FORM); }} className="btn-gold" style={{ fontSize: "0.85rem" }}>
                ➕ Add New Product
              </button>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(201,162,39,0.2)" }}>
                    {["#", "Image", "Name", "Category", "Price", "Stock", "Featured", "Actions"].map((h) => (
                      <th key={h} style={{ padding: "0.75rem", textAlign: "left", color: "rgba(201,162,39,0.8)", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, i) => (
                    <tr key={p.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", transition: "background 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(201,162,39,0.04)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={{ padding: "0.75rem", color: "rgba(255,255,255,0.3)" }}>{i + 1}</td>
                      <td style={{ padding: "0.75rem" }}>
                        <div style={{ width: "44px", height: "44px", borderRadius: "0.4rem", background: "#111", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", fontSize: "1.5rem" }}>
                          {p.image_url
                            // eslint-disable-next-line @next/next/no-img-element
                            ? <img src={p.image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            : catIcons[p.category] ?? "🏅"
                          }
                        </div>
                      </td>
                      <td style={{ padding: "0.75rem", color: "#fff", fontWeight: 600, maxWidth: "180px" }}>
                        <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
                        {p.is_school_item === 1 && <span className="badge-green" style={{ marginTop: "0.2rem", display: "inline-block" }}>School</span>}
                      </td>
                      <td style={{ padding: "0.75rem", color: "rgba(255,255,255,0.6)" }}>{catIcons[p.category]} {p.category}</td>
                      <td style={{ padding: "0.75rem", color: "#f0c94b", fontWeight: 700 }}>Rs {p.price.toLocaleString()}</td>
                      <td style={{ padding: "0.75rem", color: p.stock > 0 ? "#2a8a3e" : "#e44" }}>{p.stock}</td>
                      <td style={{ padding: "0.75rem" }}>{p.is_featured === 1 ? "⭐" : "—"}</td>
                      <td style={{ padding: "0.75rem" }}>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <button onClick={() => handleEdit(p)} style={{ background: "rgba(201,162,39,0.15)", border: "1px solid rgba(201,162,39,0.3)", color: "#f0c94b", borderRadius: "0.35rem", padding: "0.35rem 0.7rem", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600 }}>✏️ Edit</button>
                          {deleteConfirm === p.id ? (
                            <>
                              <button onClick={() => handleDelete(p.id)} style={{ background: "rgba(220,50,50,0.2)", border: "1px solid rgba(220,50,50,0.4)", color: "#ff6b6b", borderRadius: "0.35rem", padding: "0.35rem 0.7rem", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600 }}>Confirm</button>
                              <button onClick={() => setDeleteConfirm(null)} style={{ background: "rgba(255,255,255,0.06)", border: "none", color: "rgba(255,255,255,0.5)", borderRadius: "0.35rem", padding: "0.35rem 0.7rem", cursor: "pointer", fontSize: "0.78rem" }}>Cancel</button>
                            </>
                          ) : (
                            <button onClick={() => setDeleteConfirm(p.id)} style={{ background: "rgba(220,50,50,0.1)", border: "1px solid rgba(220,50,50,0.25)", color: "#ff6b6b", borderRadius: "0.35rem", padding: "0.35rem 0.7rem", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600 }}>🗑️ Del</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {products.length === 0 && (
                <div style={{ textAlign: "center", padding: "3rem", color: "rgba(255,255,255,0.3)" }}>No products yet. Add your first product!</div>
              )}
            </div>
          </div>
        )}

        {/* ── ADD/EDIT FORM TAB ── */}
        {tab === "add" && (
          <div style={{ maxWidth: "700px" }}>
            <h2 style={{ color: "#fff", fontWeight: 700, marginBottom: "2rem" }}>{editId ? "✏️ Edit Product" : "➕ Add New Product"}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>

              {/* Name */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Product Name *</label>
                <input style={inputStyle} placeholder="e.g. Kashmir Willow Cricket Bat" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
              </div>

              {/* Category */}
              <div>
                <label style={labelStyle}>Category *</label>
                <select style={{ ...inputStyle, cursor: "pointer" }} value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                  {CATEGORIES.map((c) => <option key={c} value={c} style={{ background: "#111" }}>{catIcons[c]} {c}</option>)}
                </select>
              </div>

              {/* Brand */}
              <div>
                <label style={labelStyle}>Brand</label>
                <input style={inputStyle} placeholder="e.g. Mughal Sports, Gray-Nicolls" value={form.brand} onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))} />
              </div>

              {/* Price */}
              <div>
                <label style={labelStyle}>Price (Rs) *</label>
                <input type="number" style={inputStyle} placeholder="e.g. 2500" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
              </div>

              {/* Stock */}
              <div>
                <label style={labelStyle}>Stock Quantity</label>
                <input type="number" style={inputStyle} placeholder="e.g. 50" value={form.stock} onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))} />
              </div>

              {/* Description */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Description</label>
                <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} placeholder="Describe the product, material, size options..." value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
              </div>

              {/* Image Upload */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Product Image</label>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                  <button onClick={() => fileRef.current?.click()} style={{ background: "rgba(201,162,39,0.1)", border: "2px dashed rgba(201,162,39,0.4)", color: "#f0c94b", borderRadius: "0.75rem", padding: "1rem 1.5rem", cursor: "pointer", fontWeight: 600, fontSize: "0.88rem", flex: 1, minWidth: "200px" }}>
                    {uploading ? "⏳ Uploading..." : "📸 Click to Upload Image"}
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => { if (e.target.files?.[0]) handleImageUpload(e.target.files[0]); }} />
                  {form.image_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={form.image_url} alt="Preview" style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "0.5rem", border: "2px solid rgba(201,162,39,0.4)" }} />
                  )}
                </div>
                <input style={{ ...inputStyle, marginTop: "0.5rem", fontSize: "0.8rem" }} placeholder="Or paste image URL..." value={form.image_url} onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))} />
              </div>

              {/* Toggles */}
              <div style={{ display: "flex", gap: "2rem", gridColumn: "1 / -1" }}>
                {[["is_featured", "⭐ Featured Product"], ["is_school_item", "🏫 School Item"]].map(([key, label]) => (
                  <label key={key} style={{ display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer", color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>
                    <input type="checkbox" checked={form[key as "is_featured" | "is_school_item"] as boolean} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.checked }))} style={{ width: "18px", height: "18px", accentColor: "#c9a227" }} />
                    {label}
                  </label>
                ))}
              </div>

              {/* Save */}
              <div style={{ gridColumn: "1 / -1", display: "flex", gap: "1rem" }}>
                <button onClick={handleSave} disabled={saving} className="btn-gold" style={{ opacity: saving ? 0.7 : 1, fontSize: "0.95rem" }}>
                  {saving ? "⏳ Saving..." : editId ? "✅ Update Product" : "✅ Add Product"}
                </button>
                <button onClick={() => { setForm(EMPTY_FORM); setEditId(null); setTab("products"); }} className="btn-outline" style={{ fontSize: "0.95rem" }}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* ── ENQUIRIES TAB ── */}
        {tab === "enquiries" && (
          <div>
            <h2 style={{ color: "#fff", fontWeight: 700, marginBottom: "1.5rem" }}>Customer Enquiries ({enquiries.length})</h2>
            {enquiries.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem", color: "rgba(255,255,255,0.3)" }}>No enquiries yet.</div>
            ) : (
              <div style={{ display: "grid", gap: "1rem" }}>
                {enquiries.map((eq) => (
                  <div key={eq.id} className="glass" style={{ padding: "1.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
                      <div>
                        <span style={{ color: "#f0c94b", fontWeight: 700 }}>{eq.name}</span>
                        {eq.school && <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.82rem", marginLeft: "0.5rem" }}>• {eq.school}</span>}
                      </div>
                      <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem" }}>{new Date(eq.created_at).toLocaleString("en-PK")}</span>
                    </div>
                    <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>{eq.message}</p>
                    <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                      {eq.email && <a href={`mailto:${eq.email}`} style={{ color: "#c9a227", fontSize: "0.8rem", textDecoration: "none" }}>✉️ {eq.email}</a>}
                      {eq.phone && <a href={`tel:${eq.phone}`} style={{ color: "#c9a227", fontSize: "0.8rem", textDecoration: "none" }}>📞 {eq.phone}</a>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
