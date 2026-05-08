"use client";
import { useEffect, useState } from "react";

interface Customer { id: number; name: string; email: string; phone: string; school: string; created_at: string; }

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [search,    setSearch]    = useState("");

  useEffect(() => {
    fetch("/api/admin/customers").then(r => r.json()).then(d => { setCustomers(d.customers ?? []); setLoading(false); });
  }, []);

  const filtered = customers.filter(c =>
    !search ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.school?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: "1.75rem" }}>
        <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "1.4rem", marginBottom: "0.2rem" }}>Registered Customers</h1>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}>{customers.length} total registered accounts</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "1rem", marginBottom: "1.75rem" }}>
        {[
          { label: "Total",   value: customers.length,                                         color: "#1E88E5", bg: "rgba(30,136,229,0.1)" },
          { label: "Schools", value: customers.filter(c => c.school).length,                   color: "#8B5CF6", bg: "rgba(139,92,246,0.1)" },
          { label: "Today",   value: customers.filter(c => new Date(c.created_at).toDateString() === new Date().toDateString()).length, color: "#10B981", bg: "rgba(16,185,129,0.1)" },
        ].map(s => (
          <div key={s.label} style={{ background: s.bg, border: `1px solid ${s.color}25`, borderRadius: "0.85rem", padding: "1.1rem" }}>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.35rem" }}>{s.label}</p>
            <p style={{ color: s.color, fontSize: "1.9rem", fontWeight: 900 }}>{loading ? "—" : s.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ position: "relative", maxWidth: "400px", marginBottom: "1.5rem" }}>
        <span style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", opacity: 0.35 }}>🔍</span>
        <input style={{ width: "100%", padding: "0.7rem 1rem 0.7rem 2.5rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.6rem", color: "#fff", fontSize: "0.88rem", outline: "none" }}
          placeholder="Search by name, email, school…" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Table */}
      <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(66,165,245,0.08)", borderRadius: "1rem", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1.5fr 1.5fr 1fr", padding: "0.75rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.2)" }}>
          {["Name", "Email", "Phone", "School", "Joined"].map(h => (
            <span key={h} style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</span>
          ))}
        </div>
        {loading ? (
          <p style={{ color: "rgba(255,255,255,0.2)", textAlign: "center", padding: "3rem" }}>Loading…</p>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "rgba(255,255,255,0.2)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>👥</div>
            <p>No customers yet. Share your website to get signups!</p>
          </div>
        ) : filtered.map(c => (
          <div key={c.id} style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1.5fr 1.5fr 1fr", padding: "0.9rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.03)", alignItems: "center" }}
            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.02)"}
            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "transparent"}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg,#1565C0,#42A5F5)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.85rem", flexShrink: 0 }}>
                {c.name[0]?.toUpperCase()}
              </div>
              <span style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 600 }}>{c.name}</span>
            </div>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem" }}>{c.email}</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.82rem" }}>{c.phone || "—"}</span>
            <span style={{ color: c.school ? "#8B5CF6" : "rgba(255,255,255,0.2)", fontSize: "0.82rem" }}>{c.school || "—"}</span>
            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem" }}>{new Date(c.created_at).toLocaleDateString("en-PK", { dateStyle: "medium" })}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
