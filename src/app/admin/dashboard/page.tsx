"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Stats { products: number; enquiries: number; featured: number; schoolItems: number; }

const CAT_ICONS: Record<string,string> = { Cricket:"🏏", Football:"⚽", Hockey:"🏑", Badminton:"🏸", Basketball:"🏀", Volleyball:"🏐", Boxing:"🥊", Athletics:"🏃" };

export default function DashboardPage() {
  const [stats,     setStats]     = useState<Stats>({ products:0, enquiries:0, featured:0, schoolItems:0 });
  const [enquiries, setEnquiries] = useState<{id:number;name:string;school:string;message:string;created_at:string}[]>([]);
  const [products,  setProducts]  = useState<{category:string}[]>([]);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/products").then(r => r.json()),
      fetch("/api/enquiries").then(r => r.json()),
    ]).then(([pd, ed]) => {
      const prods = pd.products ?? [];
      const enqs  = ed.enquiries ?? [];
      setStats({
        products:   prods.length,
        enquiries:  enqs.length,
        featured:   prods.filter((p:{is_featured:number}) => p.is_featured).length,
        schoolItems:prods.filter((p:{is_school_item:number}) => p.is_school_item).length,
      });
      setEnquiries(enqs.slice(0, 5));
      setProducts(prods);
      setLoading(false);
    });
  }, []);

  // Category breakdown
  const catMap: Record<string,number> = {};
  products.forEach(p => { catMap[p.category] = (catMap[p.category] ?? 0) + 1; });

  const statCards = [
    { label:"Total Products",  value:stats.products,   icon:"📦", color:"#1E88E5", bg:"rgba(30,136,229,0.1)" },
    { label:"Enquiries",       value:stats.enquiries,  icon:"💬", color:"#10B981", bg:"rgba(16,185,129,0.1)" },
    { label:"Featured Items",  value:stats.featured,   icon:"⭐", color:"#F59E0B", bg:"rgba(245,158,11,0.1)"  },
    { label:"School Items",    value:stats.schoolItems, icon:"🏫", color:"#8B5CF6", bg:"rgba(139,92,246,0.1)" },
  ];

  return (
    <div>
      <div style={{ marginBottom:"2rem" }}>
        <h1 style={{ color:"#fff", fontWeight:900, fontSize:"1.5rem", marginBottom:"0.3rem" }}>Dashboard</h1>
        <p style={{ color:"rgba(255,255,255,0.35)", fontSize:"0.82rem" }}>Welcome back. Here's what's happening with Mughal Sports.</p>
      </div>

      {/* Stat Cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"1.25rem", marginBottom:"2rem" }}>
        {statCards.map(s => (
          <div key={s.label} style={{ background: s.bg, border:`1px solid ${s.color}30`, borderRadius:"1rem", padding:"1.5rem" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <div>
                <p style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.75rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"0.5rem" }}>{s.label}</p>
                <p style={{ color:s.color, fontSize:"2.2rem", fontWeight:900, lineHeight:1 }}>
                  {loading ? "—" : s.value}
                </p>
              </div>
              <div style={{ fontSize:"1.75rem", opacity:0.7 }}>{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem" }}>

        {/* Recent Enquiries */}
        <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(66,165,245,0.1)", borderRadius:"1rem", padding:"1.5rem" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.25rem" }}>
            <h2 style={{ color:"#fff", fontWeight:800, fontSize:"0.95rem" }}>Recent Enquiries</h2>
            <Link href="/admin/enquiries" style={{ color:"#42A5F5", fontSize:"0.75rem", textDecoration:"none", fontWeight:600 }}>View All →</Link>
          </div>
          {loading ? (
            <p style={{ color:"rgba(255,255,255,0.2)", fontSize:"0.82rem" }}>Loading…</p>
          ) : enquiries.length === 0 ? (
            <div style={{ textAlign:"center", padding:"2rem", color:"rgba(255,255,255,0.2)", fontSize:"0.82rem" }}>
              <div style={{ fontSize:"2rem", marginBottom:"0.5rem" }}>📭</div>No enquiries yet.
            </div>
          ) : (
            enquiries.map(eq => (
              <div key={eq.id} style={{ padding:"0.85rem 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.25rem" }}>
                  <span style={{ color:"#fff", fontWeight:700, fontSize:"0.85rem" }}>{eq.name}</span>
                  <span style={{ color:"rgba(255,255,255,0.25)", fontSize:"0.72rem" }}>{new Date(eq.created_at).toLocaleDateString("en-PK")}</span>
                </div>
                {eq.school && <p style={{ color:"#42A5F5", fontSize:"0.72rem", marginBottom:"0.25rem" }}>🏫 {eq.school}</p>}
                <p style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.78rem", lineHeight:1.5, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{eq.message}</p>
              </div>
            ))
          )}
        </div>

        {/* Products by Category */}
        <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(66,165,245,0.1)", borderRadius:"1rem", padding:"1.5rem" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.25rem" }}>
            <h2 style={{ color:"#fff", fontWeight:800, fontSize:"0.95rem" }}>Products by Category</h2>
            <Link href="/admin/products" style={{ color:"#42A5F5", fontSize:"0.75rem", textDecoration:"none", fontWeight:600 }}>Manage →</Link>
          </div>
          {loading ? (
            <p style={{ color:"rgba(255,255,255,0.2)", fontSize:"0.82rem" }}>Loading…</p>
          ) : (
            Object.entries(catMap).map(([cat, count]) => (
              <div key={cat} style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"0.75rem" }}>
                <span style={{ fontSize:"1.1rem", width:"24px" }}>{CAT_ICONS[cat] ?? "🏅"}</span>
                <span style={{ color:"rgba(255,255,255,0.6)", fontSize:"0.82rem", flex:1 }}>{cat}</span>
                <div style={{ flex:2, background:"rgba(255,255,255,0.06)", borderRadius:"999px", height:"6px", overflow:"hidden" }}>
                  <div style={{ height:"100%", borderRadius:"999px", background:"linear-gradient(90deg,#1565C0,#42A5F5)", width:`${Math.min((count / Math.max(...Object.values(catMap))) * 100, 100)}%` }} />
                </div>
                <span style={{ color:"#42A5F5", fontSize:"0.78rem", fontWeight:700, width:"20px", textAlign:"right" }}>{count}</span>
              </div>
            ))
          )}
          <div style={{ marginTop:"1.25rem", paddingTop:"1rem", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
            <Link href="/admin/products?action=add" className="btn-primary" style={{ display:"inline-flex", alignItems:"center", gap:"0.4rem", padding:"0.55rem 1.1rem", fontSize:"0.82rem", borderRadius:"0.5rem", textDecoration:"none" }}>
              ＋ Add New Product
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
