"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm]     = useState({ name:"", email:"", phone:"", school:"", message:"" });
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await fetch("/api/enquiries", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) });
    setSent(true);
    setSending(false);
  };

  const inputStyle = { background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"0.6rem", color:"#fff", padding:"0.75rem 1rem", width:"100%", outline:"none", fontSize:"0.92rem", transition:"border-color 0.2s, box-shadow 0.2s" };

  return (
    <div style={{ background:"#04080F", minHeight:"100vh", paddingTop:"97px" }}>

      {/* Header */}
      <div style={{ background:"linear-gradient(135deg,#0B1426,#04080F)", padding:"4rem 2rem 3rem", textAlign:"center", borderBottom:"1px solid rgba(66,165,245,0.1)" }}>
        <span className="badge-outline" style={{ marginBottom:"1rem", display:"inline-block" }}>Get In Touch</span>
        <h1 className="section-title" style={{ marginBottom:"0.75rem" }}>
          <span style={{ color:"#fff" }}>Contact </span>
          <span className="brand-text">Mughal Sports</span>
        </h1>
        <div style={{ width:"60px", height:"3px", background:"linear-gradient(90deg,#1565C0,#42A5F5)", borderRadius:"2px", margin:"1.25rem auto 1rem" }} />
        <p style={{ color:"rgba(255,255,255,0.45)", maxWidth:"440px", margin:"0 auto", lineHeight:1.75 }}>
          Get in touch for bulk orders, school quotes, or any sports equipment enquiry
        </p>
      </div>

      <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"4rem 2rem", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3rem" }}>

        {/* Info */}
        <div>
          <h2 style={{ color:"#fff", fontWeight:800, fontSize:"1.35rem", marginBottom:"2rem" }}>Get In Touch</h2>
          {[
            { icon:"📞", title:"Phone / WhatsApp", detail:"0300-2787977",        href:"tel:03002787977" },
            { icon:"📍", title:"Our Location",     detail:"Lahore, Punjab, Pakistan", href:null },
            { icon:"✉️", title:"Email",             detail:"mughalspors@gmail.com",   href:"mailto:mughalspors@gmail.com" },
            { icon:"🕐", title:"Business Hours",   detail:"Monday – Saturday: 9AM – 8PM", href:null },
          ].map(item=>(
            <div key={item.title} className="glass-blue" style={{ display:"flex", gap:"1rem", padding:"1.25rem", marginBottom:"1rem", alignItems:"flex-start", borderRadius:"1rem" }}>
              <div style={{ fontSize:"1.75rem", flexShrink:0 }}>{item.icon}</div>
              <div>
                <div style={{ color:"#42A5F5", fontWeight:700, fontSize:"0.82rem", marginBottom:"0.25rem", textTransform:"uppercase", letterSpacing:"0.06em" }}>{item.title}</div>
                {item.href
                  ? <a href={item.href} style={{ color:"rgba(255,255,255,0.75)", fontSize:"0.92rem", textDecoration:"none", fontWeight:600 }}>{item.detail}</a>
                  : <div style={{ color:"rgba(255,255,255,0.65)", fontSize:"0.92rem" }}>{item.detail}</div>
                }
              </div>
            </div>
          ))}

          {/* WhatsApp CTA */}
          <a href="https://wa.me/923002787977" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"0.6rem", marginTop:"1.5rem", textAlign:"center" }}>
            <span style={{ fontSize:"1.2rem" }}>💬</span> Chat on WhatsApp
          </a>

          <div className="glass-blue" style={{ padding:"1.5rem", marginTop:"1.5rem", borderRadius:"1rem" }}>
            <h3 style={{ color:"#42A5F5", fontWeight:700, marginBottom:"0.6rem", fontSize:"0.9rem" }}>🏫 School &amp; Bulk Orders</h3>
            <p style={{ color:"rgba(255,255,255,0.5)", fontSize:"0.83rem", lineHeight:1.7 }}>
              Special pricing for schools, government institutions and sports academies. Mention your school name for a custom quote.
            </p>
          </div>
        </div>

        {/* Form */}
        <div>
          <h2 style={{ color:"#fff", fontWeight:800, fontSize:"1.35rem", marginBottom:"2rem" }}>Send Enquiry</h2>
          {sent ? (
            <div style={{ textAlign:"center", padding:"3rem", background:"rgba(21,101,192,0.1)", border:"1px solid rgba(66,165,245,0.25)", borderRadius:"1.25rem" }}>
              <div style={{ fontSize:"3.5rem", marginBottom:"1rem" }}>✅</div>
              <h3 style={{ color:"#42A5F5", fontWeight:800, marginBottom:"0.6rem" }}>Message Sent!</h3>
              <p style={{ color:"rgba(255,255,255,0.55)", fontSize:"0.9rem", lineHeight:1.7 }}>
                We will contact you within 24 hours. Thank you for reaching out to Mughal Sports Lahore!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"1.1rem" }}>
              {[
                { key:"name",   label:"Your Name *",                    placeholder:"Muhammad Ahmed",           type:"text",  required:true  },
                { key:"phone",  label:"Phone / WhatsApp",               placeholder:"0300-0000000",              type:"tel",   required:false },
                { key:"email",  label:"Email Address",                  placeholder:"your@email.com",            type:"email", required:false },
                { key:"school", label:"School / Institution (optional)",placeholder:"Lahore Grammar School",     type:"text",  required:false },
              ].map(({ key, label, placeholder, type, required })=>(
                <div key={key}>
                  <label style={{ color:"rgba(255,255,255,0.5)", fontSize:"0.78rem", display:"block", marginBottom:"0.4rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em" }}>{label}</label>
                  <input type={type} required={required} style={inputStyle} placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}
                    onFocus={e=>{e.currentTarget.style.borderColor="rgba(66,165,245,0.6)"; e.currentTarget.style.boxShadow="0 0 0 3px rgba(21,101,192,0.15)";}}
                    onBlur={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow="none";}}
                  />
                </div>
              ))}
              <div>
                <label style={{ color:"rgba(255,255,255,0.5)", fontSize:"0.78rem", display:"block", marginBottom:"0.4rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em" }}>Message *</label>
                <textarea required style={{ ...inputStyle, minHeight:"130px", resize:"vertical" }}
                  placeholder="I need 20 cricket bats and pads for our school team..."
                  value={form.message}
                  onChange={e=>setForm(f=>({...f,message:e.target.value}))}
                  onFocus={e=>{e.currentTarget.style.borderColor="rgba(66,165,245,0.6)";}}
                  onBlur={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.1)";}}
                />
              </div>
              <button type="submit" disabled={sending} className="btn-primary" style={{ opacity:sending?0.7:1, fontSize:"0.95rem" }}>
                {sending ? "⏳ Sending..." : "📤 Send Enquiry"}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`@media(max-width:768px){div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr !important;}}`}</style>
    </div>
  );
}
