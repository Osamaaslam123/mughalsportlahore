"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface Product { id:number; name:string; description:string; price:number; category:string; brand:string; image_url:string; stock:number; is_featured:number; is_school_item:number; }

const CATS = ["Cricket","Football","Hockey","Badminton","Basketball","Volleyball","Boxing","Athletics"];
const CAT_ICONS: Record<string,string> = { Cricket:"🏏", Football:"⚽", Hockey:"🏑", Badminton:"🏸", Basketball:"🏀", Volleyball:"🏐", Boxing:"🥊", Athletics:"🏃" };
const EMPTY = { name:"", description:"", price:"", category:"Cricket", brand:"Mughal Sports", image_url:"", stock:"", is_featured:false, is_school_item:false };

function ProductsContent() {
  const sp = useSearchParams();
  const [products, setProducts]   = useState<Product[]>([]);
  const [loading,  setLoading]    = useState(true);
  const [view,     setView]       = useState<"list"|"form">(sp.get("action") === "add" ? "form" : "list");
  const [editId,   setEditId]     = useState<number|null>(null);
  const [form,     setForm]       = useState(EMPTY);
  const [saving,   setSaving]     = useState(false);
  const [uploading,setUploading]  = useState(false);
  const [flash,    setFlash]      = useState<{msg:string;type:"ok"|"err"}|null>(null);
  const [search,   setSearch]     = useState("");
  const [catFilter,setCatFilter]  = useState("All");
  const [delId,    setDelId]      = useState<number|null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const showFlash = (msg:string, type:"ok"|"err"="ok") => { setFlash({msg,type}); setTimeout(()=>setFlash(null),3000); };

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data.products ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd  = () => { setForm(EMPTY); setEditId(null); setView("form"); };
  const openEdit = (p:Product) => { setForm({ name:p.name, description:p.description, price:String(p.price), category:p.category, brand:p.brand, image_url:p.image_url, stock:String(p.stock), is_featured:!!p.is_featured, is_school_item:!!p.is_school_item }); setEditId(p.id); setView("form"); };
  const cancel   = () => { setView("list"); setEditId(null); setForm(EMPTY); };

  const handleSave = async () => {
    if (!form.name.trim() || !form.price || !form.category) { showFlash("Name, price and category are required","err"); return; }
    setSaving(true);
    const body = { ...form, price:parseFloat(form.price), stock:parseInt(form.stock)||0 };
    const url    = editId ? `/api/products/${editId}` : "/api/products";
    const method = editId ? "PUT" : "POST";
    const res = await fetch(url, { method, headers:{"Content-Type":"application/json"}, body:JSON.stringify(body) });
    if (res.ok) { showFlash(editId ? "Product updated ✓" : "Product added ✓"); await load(); cancel(); }
    else        { showFlash("Save failed — try again","err"); }
    setSaving(false);
  };

  const handleDelete = async (id:number) => {
    await fetch(`/api/products/${id}`, { method:"DELETE" });
    showFlash("Product deleted");
    setDelId(null);
    await load();
  };

  const handleUpload = async (file:File) => {
    setUploading(true);
    const fd = new FormData(); fd.append("file", file);
    const res  = await fetch("/api/upload", { method:"POST", body:fd });
    const data = await res.json();
    if (data.url) { setForm(f => ({...f, image_url:data.url})); showFlash("Image uploaded ✓"); }
    else          { showFlash("Upload failed","err"); }
    setUploading(false);
  };

  const filtered = products.filter(p => {
    const matchCat = catFilter === "All" || p.category === catFilter;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const inp = (extra={}) => ({ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"0.55rem", color:"#fff", padding:"0.7rem 0.9rem", width:"100%", outline:"none", fontSize:"0.88rem", ...extra });

  /* ── LIST VIEW ── */
  if (view === "list") return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.75rem", flexWrap:"wrap", gap:"1rem" }}>
        <div>
          <h1 style={{ color:"#fff", fontWeight:900, fontSize:"1.4rem", marginBottom:"0.2rem" }}>Products</h1>
          <p style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.8rem" }}>{products.length} total products</p>
        </div>
        <button onClick={openAdd} style={{ background:"linear-gradient(135deg,#1565C0,#42A5F5)", color:"#fff", fontWeight:800, padding:"0.65rem 1.3rem", border:"none", borderRadius:"0.6rem", cursor:"pointer", fontSize:"0.88rem", boxShadow:"0 4px 16px rgba(21,101,192,0.4)" }}>
          ＋ Add Product
        </button>
      </div>

      {/* Flash */}
      {flash && <div style={{ padding:"0.75rem 1rem", marginBottom:"1rem", borderRadius:"0.6rem", background:flash.type==="ok"?"rgba(16,185,129,0.15)":"rgba(239,68,68,0.15)", border:`1px solid ${flash.type==="ok"?"rgba(16,185,129,0.3)":"rgba(239,68,68,0.3)"}`, color:"#fff", fontSize:"0.85rem" }}>{flash.msg}</div>}

      {/* Filters */}
      <div style={{ display:"flex", gap:"0.75rem", marginBottom:"1.25rem", flexWrap:"wrap", alignItems:"center" }}>
        <div style={{ position:"relative", flex:1, minWidth:"200px" }}>
          <span style={{ position:"absolute", left:"0.8rem", top:"50%", transform:"translateY(-50%)", fontSize:"0.9rem", opacity:0.4 }}>🔍</span>
          <input style={{ ...inp(), paddingLeft:"2.4rem" }} placeholder="Search products…" value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
        <div style={{ display:"flex", gap:"0.4rem", flexWrap:"wrap" }}>
          {["All",...CATS].map(c => (
            <button key={c} onClick={()=>setCatFilter(c)} style={{ background:catFilter===c?"linear-gradient(135deg,#1565C0,#42A5F5)":"rgba(255,255,255,0.06)", color:catFilter===c?"#fff":"rgba(255,255,255,0.5)", border:"none", borderRadius:"999px", padding:"0.35rem 0.85rem", fontSize:"0.75rem", fontWeight:catFilter===c?700:500, cursor:"pointer" }}>
              {CAT_ICONS[c]??""} {c}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(66,165,245,0.08)", borderRadius:"1rem", overflow:"hidden" }}>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ background:"rgba(21,101,192,0.08)", borderBottom:"1px solid rgba(66,165,245,0.12)" }}>
                {["","Product","Category","Price","Stock","Tags","Actions"].map(h => (
                  <th key={h} style={{ padding:"0.85rem 1rem", textAlign:"left", color:"rgba(255,255,255,0.35)", fontSize:"0.7rem", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.1em", whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} style={{ padding:"3rem", textAlign:"center", color:"rgba(255,255,255,0.2)" }}>Loading products…</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} style={{ padding:"3rem", textAlign:"center", color:"rgba(255,255,255,0.2)" }}>No products found.</td></tr>
              ) : filtered.map(p => (
                <tr key={p.id} style={{ borderBottom:"1px solid rgba(255,255,255,0.04)", transition:"background 0.15s" }}
                  onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.025)")}
                  onMouseLeave={e=>(e.currentTarget.style.background="transparent")}
                >
                  {/* Image */}
                  <td style={{ padding:"0.85rem 0.75rem 0.85rem 1rem" }}>
                    <div style={{ width:"44px", height:"44px", borderRadius:"0.5rem", background:"rgba(21,101,192,0.1)", border:"1px solid rgba(66,165,245,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.4rem", overflow:"hidden", flexShrink:0 }}>
                      {p.image_url
                        // eslint-disable-next-line @next/next/no-img-element
                        ? <img src={p.image_url} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                        : CAT_ICONS[p.category]??"🏅"}
                    </div>
                  </td>
                  {/* Name */}
                  <td style={{ padding:"0.85rem 1rem" }}>
                    <p style={{ color:"#fff", fontWeight:700, fontSize:"0.85rem", marginBottom:"0.15rem" }}>{p.name}</p>
                    <p style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.72rem" }}>{p.brand}</p>
                  </td>
                  {/* Category */}
                  <td style={{ padding:"0.85rem 1rem" }}>
                    <span style={{ background:"rgba(21,101,192,0.15)", color:"#42A5F5", fontSize:"0.72rem", fontWeight:700, padding:"0.2rem 0.6rem", borderRadius:"999px" }}>
                      {CAT_ICONS[p.category]} {p.category}
                    </span>
                  </td>
                  {/* Price */}
                  <td style={{ padding:"0.85rem 1rem", color:"#fff", fontWeight:800, fontSize:"0.88rem", whiteSpace:"nowrap" }}>
                    Rs {p.price.toLocaleString()}
                  </td>
                  {/* Stock */}
                  <td style={{ padding:"0.85rem 1rem" }}>
                    <span style={{ color:p.stock>0?"#10B981":"#ef4444", fontWeight:700, fontSize:"0.82rem" }}>
                      {p.stock > 0 ? `✓ ${p.stock}` : "✗ 0"}
                    </span>
                  </td>
                  {/* Tags */}
                  <td style={{ padding:"0.85rem 1rem" }}>
                    <div style={{ display:"flex", gap:"0.3rem", flexWrap:"wrap" }}>
                      {!!p.is_featured   && <span style={{ background:"rgba(245,158,11,0.15)", color:"#F59E0B", fontSize:"0.65rem", fontWeight:700, padding:"0.15rem 0.5rem", borderRadius:"999px", whiteSpace:"nowrap" }}>⭐ Featured</span>}
                      {!!p.is_school_item && <span style={{ background:"rgba(139,92,246,0.15)", color:"#8B5CF6", fontSize:"0.65rem", fontWeight:700, padding:"0.15rem 0.5rem", borderRadius:"999px", whiteSpace:"nowrap" }}>🏫 School</span>}
                    </div>
                  </td>
                  {/* Actions */}
                  <td style={{ padding:"0.85rem 1rem" }}>
                    <div style={{ display:"flex", gap:"0.4rem" }}>
                      <button onClick={()=>openEdit(p)} style={{ background:"rgba(21,101,192,0.15)", border:"1px solid rgba(66,165,245,0.25)", color:"#42A5F5", borderRadius:"0.4rem", padding:"0.35rem 0.7rem", cursor:"pointer", fontSize:"0.75rem", fontWeight:700 }}>✏️ Edit</button>
                      {delId === p.id ? (
                        <>
                          <button onClick={()=>handleDelete(p.id)} style={{ background:"rgba(239,68,68,0.2)", border:"1px solid rgba(239,68,68,0.35)", color:"#f87171", borderRadius:"0.4rem", padding:"0.35rem 0.7rem", cursor:"pointer", fontSize:"0.75rem", fontWeight:700 }}>Confirm</button>
                          <button onClick={()=>setDelId(null)} style={{ background:"rgba(255,255,255,0.05)", border:"none", color:"rgba(255,255,255,0.35)", borderRadius:"0.4rem", padding:"0.35rem 0.5rem", cursor:"pointer", fontSize:"0.75rem" }}>✕</button>
                        </>
                      ) : (
                        <button onClick={()=>setDelId(p.id)} style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.2)", color:"#f87171", borderRadius:"0.4rem", padding:"0.35rem 0.7rem", cursor:"pointer", fontSize:"0.75rem", fontWeight:700 }}>🗑️</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  /* ── FORM VIEW ── */
  return (
    <div style={{ maxWidth:"720px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"2rem" }}>
        <button onClick={cancel} style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.6)", borderRadius:"0.5rem", padding:"0.5rem 0.9rem", cursor:"pointer", fontSize:"0.82rem" }}>← Back</button>
        <div>
          <h1 style={{ color:"#fff", fontWeight:900, fontSize:"1.3rem", marginBottom:"0.15rem" }}>{editId ? "Edit Product" : "Add New Product"}</h1>
          <p style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.78rem" }}>{editId ? "Update product details" : "Fill in the product information below"}</p>
        </div>
      </div>

      {flash && <div style={{ padding:"0.75rem 1rem", marginBottom:"1.25rem", borderRadius:"0.6rem", background:flash.type==="ok"?"rgba(16,185,129,0.15)":"rgba(239,68,68,0.15)", border:`1px solid ${flash.type==="ok"?"rgba(16,185,129,0.3)":"rgba(239,68,68,0.3)"}`, color:"#fff", fontSize:"0.85rem" }}>{flash.msg}</div>}

      <div style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(66,165,245,0.1)", borderRadius:"1.25rem", padding:"2rem" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.25rem" }}>

          {/* Name */}
          <div style={{ gridColumn:"1/-1" }}>
            <label style={{ color:"rgba(255,255,255,0.45)", fontSize:"0.72rem", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.08em", display:"block", marginBottom:"0.45rem" }}>Product Name *</label>
            <input style={inp()} placeholder="e.g. Kashmir Willow Cricket Bat" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} />
          </div>

          {/* Category */}
          <div>
            <label style={{ color:"rgba(255,255,255,0.45)", fontSize:"0.72rem", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.08em", display:"block", marginBottom:"0.45rem" }}>Category *</label>
            <select style={{ ...inp(), cursor:"pointer" }} value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>
              {CATS.map(c=><option key={c} value={c} style={{ background:"#111" }}>{CAT_ICONS[c]} {c}</option>)}
            </select>
          </div>

          {/* Brand */}
          <div>
            <label style={{ color:"rgba(255,255,255,0.45)", fontSize:"0.72rem", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.08em", display:"block", marginBottom:"0.45rem" }}>Brand</label>
            <input style={inp()} placeholder="e.g. Mughal Sports, Gray-Nicolls" value={form.brand} onChange={e=>setForm(f=>({...f,brand:e.target.value}))} />
          </div>

          {/* Price */}
          <div>
            <label style={{ color:"rgba(255,255,255,0.45)", fontSize:"0.72rem", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.08em", display:"block", marginBottom:"0.45rem" }}>Price (Rs) *</label>
            <input type="number" min="0" style={inp()} placeholder="2500" value={form.price} onChange={e=>setForm(f=>({...f,price:e.target.value}))} />
          </div>

          {/* Stock */}
          <div>
            <label style={{ color:"rgba(255,255,255,0.45)", fontSize:"0.72rem", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.08em", display:"block", marginBottom:"0.45rem" }}>Stock Quantity</label>
            <input type="number" min="0" style={inp()} placeholder="50" value={form.stock} onChange={e=>setForm(f=>({...f,stock:e.target.value}))} />
          </div>

          {/* Description */}
          <div style={{ gridColumn:"1/-1" }}>
            <label style={{ color:"rgba(255,255,255,0.45)", fontSize:"0.72rem", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.08em", display:"block", marginBottom:"0.45rem" }}>Description</label>
            <textarea style={{ ...inp(), minHeight:"100px", resize:"vertical" }} placeholder="Describe the product — material, size, specifications…" value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} />
          </div>

          {/* Image Upload */}
          <div style={{ gridColumn:"1/-1" }}>
            <label style={{ color:"rgba(255,255,255,0.45)", fontSize:"0.72rem", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.08em", display:"block", marginBottom:"0.45rem" }}>Product Image</label>
            <div style={{ display:"flex", gap:"1rem", alignItems:"center", flexWrap:"wrap" }}>
              <button onClick={()=>fileRef.current?.click()} style={{ flex:1, minWidth:"180px", background:"rgba(21,101,192,0.08)", border:"2px dashed rgba(66,165,245,0.3)", borderRadius:"0.75rem", padding:"1.25rem", color:"#42A5F5", cursor:"pointer", fontWeight:700, fontSize:"0.85rem", transition:"all 0.2s" }}
                onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.borderColor="rgba(66,165,245,0.6)";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.borderColor="rgba(66,165,245,0.3)";}}
              >
                {uploading ? "⏳ Uploading…" : "📸 Click to Upload Photo"}
              </button>
              <input ref={fileRef} type="file" accept="image/*" style={{ display:"none" }} onChange={e=>{ if(e.target.files?.[0]) handleUpload(e.target.files[0]); }} />
              {form.image_url && (
                <div style={{ position:"relative" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={form.image_url} alt="Preview" style={{ width:"80px", height:"80px", objectFit:"cover", borderRadius:"0.6rem", border:"2px solid rgba(66,165,245,0.3)" }} />
                  <button onClick={()=>setForm(f=>({...f,image_url:""}))} style={{ position:"absolute", top:"-8px", right:"-8px", background:"#ef4444", border:"none", borderRadius:"50%", width:"20px", height:"20px", color:"#fff", cursor:"pointer", fontSize:"0.7rem", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
                </div>
              )}
            </div>
            <input style={{ ...inp(), marginTop:"0.5rem", fontSize:"0.78rem" }} placeholder="Or paste an image URL…" value={form.image_url} onChange={e=>setForm(f=>({...f,image_url:e.target.value}))} />
          </div>

          {/* Toggles */}
          <div style={{ gridColumn:"1/-1", display:"flex", gap:"2rem", flexWrap:"wrap" }}>
            {([["is_featured","⭐ Mark as Featured"],["is_school_item","🏫 School Item"]] as const).map(([key,label])=>(
              <label key={key} style={{ display:"flex", alignItems:"center", gap:"0.65rem", cursor:"pointer" }}>
                <div onClick={()=>setForm(f=>({...f,[key]:!f[key]}))} style={{ width:"44px", height:"24px", borderRadius:"999px", background:form[key]?"linear-gradient(135deg,#1565C0,#42A5F5)":"rgba(255,255,255,0.1)", border:form[key]?"none":"1px solid rgba(255,255,255,0.15)", position:"relative", transition:"all 0.2s", cursor:"pointer" }}>
                  <div style={{ width:"18px", height:"18px", borderRadius:"50%", background:"#fff", position:"absolute", top:"3px", left:form[key]?"23px":"3px", transition:"left 0.2s", boxShadow:"0 1px 4px rgba(0,0,0,0.3)" }} />
                </div>
                <span style={{ color:"rgba(255,255,255,0.65)", fontSize:"0.85rem" }}>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Save/Cancel */}
        <div style={{ display:"flex", gap:"1rem", marginTop:"2rem", paddingTop:"1.5rem", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
          <button onClick={handleSave} disabled={saving} style={{ background:saving?"rgba(21,101,192,0.5)":"linear-gradient(135deg,#1565C0,#42A5F5)", color:"#fff", fontWeight:800, padding:"0.8rem 1.75rem", border:"none", borderRadius:"0.6rem", cursor:saving?"not-allowed":"pointer", fontSize:"0.9rem", boxShadow:"0 4px 16px rgba(21,101,192,0.4)" }}>
            {saving ? "Saving…" : editId ? "✓ Update Product" : "✓ Add Product"}
          </button>
          <button onClick={cancel} style={{ background:"rgba(255,255,255,0.05)", color:"rgba(255,255,255,0.5)", fontWeight:600, padding:"0.8rem 1.5rem", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"0.6rem", cursor:"pointer", fontSize:"0.9rem" }}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return <Suspense><ProductsContent /></Suspense>;
}
