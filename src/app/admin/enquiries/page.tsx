"use client";
import { useEffect, useState } from "react";

interface Enquiry { id:number; name:string; email:string; phone:string; school:string; message:string; created_at:string; }

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [search,    setSearch]    = useState("");
  const [expanded,  setExpanded]  = useState<number|null>(null);

  useEffect(() => {
    fetch("/api/enquiries").then(r=>r.json()).then(d=>{ setEnquiries(d.enquiries??[]); setLoading(false); });
  }, []);

  const filtered = enquiries.filter(e =>
    !search ||
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.school?.toLowerCase().includes(search.toLowerCase()) ||
    e.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom:"1.75rem" }}>
        <h1 style={{ color:"#fff", fontWeight:900, fontSize:"1.4rem", marginBottom:"0.2rem" }}>Enquiries</h1>
        <p style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.8rem" }}>{enquiries.length} total enquiries from customers</p>
      </div>

      {/* Search */}
      <div style={{ position:"relative", maxWidth:"400px", marginBottom:"1.5rem" }}>
        <span style={{ position:"absolute", left:"0.85rem", top:"50%", transform:"translateY(-50%)", opacity:0.35 }}>🔍</span>
        <input
          style={{ width:"100%", padding:"0.7rem 1rem 0.7rem 2.5rem", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"0.6rem", color:"#fff", fontSize:"0.88rem", outline:"none" }}
          placeholder="Search by name, school, message…"
          value={search} onChange={e=>setSearch(e.target.value)}
        />
      </div>

      {/* Summary cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:"1rem", marginBottom:"2rem" }}>
        {[
          { label:"Total",   value:enquiries.length,                                          color:"#1E88E5", bg:"rgba(30,136,229,0.1)" },
          { label:"Schools", value:enquiries.filter(e=>e.school).length,                     color:"#8B5CF6", bg:"rgba(139,92,246,0.1)" },
          { label:"Today",   value:enquiries.filter(e=>new Date(e.created_at).toDateString()===new Date().toDateString()).length, color:"#10B981", bg:"rgba(16,185,129,0.1)" },
        ].map(s=>(
          <div key={s.label} style={{ background:s.bg, border:`1px solid ${s.color}25`, borderRadius:"0.85rem", padding:"1.1rem" }}>
            <p style={{ color:"rgba(255,255,255,0.35)", fontSize:"0.7rem", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"0.35rem" }}>{s.label}</p>
            <p style={{ color:s.color, fontSize:"1.9rem", fontWeight:900 }}>{loading ? "—" : s.value}</p>
          </div>
        ))}
      </div>

      {/* Enquiry list */}
      <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
        {loading ? (
          <p style={{ color:"rgba(255,255,255,0.2)", fontSize:"0.85rem", padding:"2rem", textAlign:"center" }}>Loading enquiries…</p>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign:"center", padding:"4rem", color:"rgba(255,255,255,0.2)" }}>
            <div style={{ fontSize:"3rem", marginBottom:"0.75rem" }}>📭</div>
            <p>No enquiries found.</p>
          </div>
        ) : (
          filtered.map(eq => (
            <div key={eq.id} style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(66,165,245,0.08)", borderRadius:"1rem", overflow:"hidden", transition:"border-color 0.2s" }}
              onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.borderColor="rgba(66,165,245,0.2)"}
              onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.borderColor="rgba(66,165,245,0.08)"}
            >
              {/* Header row */}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1rem 1.25rem", cursor:"pointer" }} onClick={()=>setExpanded(expanded===eq.id?null:eq.id)}>
                <div style={{ display:"flex", alignItems:"center", gap:"0.85rem" }}>
                  <div style={{ width:"38px", height:"38px", borderRadius:"50%", background:"linear-gradient(135deg,#1565C0,#42A5F5)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:"0.9rem", flexShrink:0 }}>
                    {eq.name[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p style={{ color:"#fff", fontWeight:700, fontSize:"0.88rem", marginBottom:"0.15rem" }}>{eq.name}</p>
                    <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap" }}>
                      {eq.school && <span style={{ color:"#8B5CF6", fontSize:"0.7rem", fontWeight:600 }}>🏫 {eq.school}</span>}
                      {eq.phone  && <span style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.7rem" }}>📞 {eq.phone}</span>}
                      {eq.email  && <span style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.7rem" }}>✉️ {eq.email}</span>}
                    </div>
                  </div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
                  <span style={{ color:"rgba(255,255,255,0.25)", fontSize:"0.72rem", whiteSpace:"nowrap" }}>{new Date(eq.created_at).toLocaleString("en-PK",{dateStyle:"medium",timeStyle:"short"})}</span>
                  <span style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.85rem" }}>{expanded===eq.id?"▲":"▼"}</span>
                </div>
              </div>

              {/* Preview */}
              {expanded !== eq.id && (
                <div style={{ padding:"0 1.25rem 1rem" }}>
                  <p style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.8rem", lineHeight:1.55, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{eq.message}</p>
                </div>
              )}

              {/* Expanded */}
              {expanded === eq.id && (
                <div style={{ padding:"0 1.25rem 1.25rem", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
                  <p style={{ color:"rgba(255,255,255,0.65)", fontSize:"0.85rem", lineHeight:1.75, marginTop:"1rem", marginBottom:"1.25rem" }}>{eq.message}</p>
                  <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap" }}>
                    {eq.phone && <a href={`tel:${eq.phone}`} style={{ background:"rgba(21,101,192,0.15)", border:"1px solid rgba(66,165,245,0.25)", color:"#42A5F5", borderRadius:"0.5rem", padding:"0.45rem 1rem", fontSize:"0.8rem", textDecoration:"none", fontWeight:700 }}>📞 Call</a>}
                    {eq.phone && <a href={`https://wa.me/92${eq.phone.replace(/^0/,"")}`} target="_blank" rel="noopener noreferrer" style={{ background:"rgba(37,211,102,0.1)", border:"1px solid rgba(37,211,102,0.25)", color:"#25D366", borderRadius:"0.5rem", padding:"0.45rem 1rem", fontSize:"0.8rem", textDecoration:"none", fontWeight:700 }}>💬 WhatsApp</a>}
                    {eq.email  && <a href={`mailto:${eq.email}`} style={{ background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.25)", color:"#F59E0B", borderRadius:"0.5rem", padding:"0.45rem 1rem", fontSize:"0.8rem", textDecoration:"none", fontWeight:700 }}>✉️ Email</a>}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
