"use client";
import { useEffect, useState } from "react";

interface Testimonial { id: number; name: string; school: string; review: string; rating: number; is_active: number; }

const blank = { name: "", school: "", review: "", rating: 5 };

export default function TestimonialsPage() {
  const [list,    setList]    = useState<Testimonial[]>([]);
  const [form,    setForm]    = useState(blank);
  const [editing, setEditing] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);

  const load = () => fetch("/api/testimonials").then(r => r.json()).then(d => { setList(d.testimonials ?? []); setLoading(false); });
  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    setSaving(true);
    if (editing !== null) {
      const t = list.find(t => t.id === editing)!;
      await fetch("/api/testimonials", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: editing, is_active: t.is_active }) });
    } else {
      await fetch("/api/testimonials", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    setSaving(false); setForm(blank); setEditing(null); load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this testimonial?")) return;
    await fetch("/api/testimonials", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  };

  const handleToggle = async (t: Testimonial) => {
    await fetch("/api/testimonials", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...t, is_active: t.is_active ? 0 : 1 }) });
    load();
  };

  const startEdit = (t: Testimonial) => { setEditing(t.id); setForm({ name: t.name, school: t.school, review: t.review, rating: t.rating }); };

  const inputStyle = { width: "100%", padding: "0.65rem 0.9rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(66,165,245,0.2)", borderRadius: "0.5rem", color: "#fff", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" as const };

  return (
    <div>
      <div style={{ marginBottom: "1.75rem" }}>
        <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "1.4rem", marginBottom: "0.2rem" }}>Testimonials</h1>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}>Manage customer reviews shown on homepage</p>
      </div>

      {/* Form */}
      <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(66,165,245,0.12)", borderRadius: "1rem", padding: "1.5rem", marginBottom: "1.5rem" }}>
        <h2 style={{ color: "#42A5F5", fontWeight: 800, fontSize: "0.9rem", marginBottom: "1rem" }}>{editing !== null ? "✏️ Edit Testimonial" : "➕ Add New Testimonial"}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          <div>
            <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "0.72rem", fontWeight: 700, marginBottom: "0.4rem", textTransform: "uppercase" }}>Customer Name *</label>
            <input style={inputStyle} placeholder="e.g. Principal Ahmed" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "0.72rem", fontWeight: 700, marginBottom: "0.4rem", textTransform: "uppercase" }}>School / Organization</label>
            <input style={inputStyle} placeholder="e.g. Lahore Grammar School" value={form.school} onChange={e => setForm(f => ({ ...f, school: e.target.value }))} />
          </div>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "0.72rem", fontWeight: 700, marginBottom: "0.4rem", textTransform: "uppercase" }}>Review *</label>
          <textarea rows={3} style={{ ...inputStyle, resize: "vertical" }} placeholder="Write the customer review…" value={form.review} onChange={e => setForm(f => ({ ...f, review: e.target.value }))} />
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <div>
            <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "0.72rem", fontWeight: 700, marginBottom: "0.4rem", textTransform: "uppercase" }}>Rating</label>
            <select style={{ ...inputStyle, width: "120px" }} value={form.rating} onChange={e => setForm(f => ({ ...f, rating: Number(e.target.value) }))}>
              {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
            </select>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: "0.75rem" }}>
            {editing !== null && <button onClick={() => { setEditing(null); setForm(blank); }} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", borderRadius: "0.5rem", padding: "0.55rem 1rem", cursor: "pointer", fontSize: "0.85rem" }}>Cancel</button>}
            <button onClick={handleSave} disabled={saving || !form.name || !form.review} style={{ background: "rgba(21,101,192,0.3)", border: "1px solid rgba(66,165,245,0.4)", color: "#42A5F5", borderRadius: "0.5rem", padding: "0.55rem 1.25rem", fontWeight: 700, cursor: "pointer", fontSize: "0.85rem" }}>
              {saving ? "Saving…" : editing !== null ? "Update" : "Add Testimonial"}
            </button>
          </div>
        </div>
      </div>

      {/* List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {loading ? <p style={{ color: "rgba(255,255,255,0.2)", textAlign: "center", padding: "2rem" }}>Loading…</p> :
          list.map(t => (
            <div key={t.id} style={{ background: "rgba(255,255,255,0.025)", border: `1px solid ${t.is_active ? "rgba(66,165,245,0.1)" : "rgba(255,255,255,0.04)"}`, borderRadius: "0.85rem", padding: "1.1rem 1.25rem", display: "flex", gap: "1rem", alignItems: "flex-start", opacity: t.is_active ? 1 : 0.5 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.3rem" }}>
                  <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>{t.name}</span>
                  {t.school && <span style={{ color: "#8B5CF6", fontSize: "0.72rem" }}>• {t.school}</span>}
                  <span style={{ color: "#F59E0B", fontSize: "0.78rem" }}>{"★".repeat(t.rating)}</span>
                  <span style={{ marginLeft: "auto", fontSize: "0.68rem", padding: "0.15rem 0.5rem", borderRadius: "999px", background: t.is_active ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.05)", color: t.is_active ? "#10B981" : "rgba(255,255,255,0.3)" }}>{t.is_active ? "Active" : "Hidden"}</span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", lineHeight: 1.6 }}>{t.review}</p>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                <button onClick={() => handleToggle(t)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", borderRadius: "0.4rem", padding: "0.35rem 0.7rem", cursor: "pointer", fontSize: "0.75rem" }}>{t.is_active ? "Hide" : "Show"}</button>
                <button onClick={() => startEdit(t)} style={{ background: "rgba(21,101,192,0.1)", border: "1px solid rgba(66,165,245,0.2)", color: "#42A5F5", borderRadius: "0.4rem", padding: "0.35rem 0.7rem", cursor: "pointer", fontSize: "0.75rem" }}>Edit</button>
                <button onClick={() => handleDelete(t.id)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#EF4444", borderRadius: "0.4rem", padding: "0.35rem 0.7rem", cursor: "pointer", fontSize: "0.75rem" }}>Delete</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
