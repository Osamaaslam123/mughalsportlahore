import Link from "next/link";
import Image from "next/image";

/* ─── data ─────────────────────────────────────────────── */
const categories = [
  { icon:"🏏", name:"Cricket",    count:"120+ items", color:"#1E88E5" },
  { icon:"⚽", name:"Football",   count:"90+ items",  color:"#42A5F5" },
  { icon:"🏑", name:"Hockey",     count:"60+ items",  color:"#1E88E5" },
  { icon:"🏸", name:"Badminton",  count:"45+ items",  color:"#42A5F5" },
  { icon:"🏀", name:"Basketball", count:"35+ items",  color:"#1E88E5" },
  { icon:"🏐", name:"Volleyball", count:"30+ items",  color:"#42A5F5" },
  { icon:"🥊", name:"Boxing",     count:"50+ items",  color:"#1E88E5" },
  { icon:"🏃", name:"Athletics",  count:"40+ items",  color:"#42A5F5" },
];

const stats = [
  { value:"20+",  label:"Years Experience", icon:"📅" },
  { value:"500+", label:"Products",         icon:"📦" },
  { value:"200+", label:"Schools Supplied", icon:"🏫" },
  { value:"10K+", label:"Happy Customers",  icon:"😊" },
];

const testimonials = [
  { name:"Principal Ahmed",  org:"Lahore Grammar School",       text:"Mughal Sports has been our go-to supplier for every school sports event. Quality products, on-time delivery!", stars:5 },
  { name:"Coach Rafiq",      org:"DPS Cricket Academy",          text:"Best cricket equipment in Lahore at the most competitive prices. Highly recommended for all academies.",    stars:5 },
  { name:"Mr. Tariq",        org:"Punjab Education Foundation",  text:"Supplied sports kits to 50+ schools across Lahore. Professional service and 100% genuine products.",       stars:5 },
];

const marqueeItems = ["🏏 Cricket","⚽ Football","🏑 Hockey","🏸 Badminton","🏀 Basketball","🏐 Volleyball","🥊 Boxing","🏃 Athletics","🏫 School Kits","📦 Bulk Orders"];

/* ─── page ─────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div style={{ background: "#04080F", paddingTop: "97px" }}>

      {/* ══════════════════════════════════════════
          HERO — FULL PREMIUM 3-D
      ══════════════════════════════════════════ */}
      <section style={{
        minHeight: "calc(100vh - 97px)",
        background: `
          radial-gradient(ellipse 80% 60% at 15% 50%, rgba(21,101,192,0.18) 0%, transparent 60%),
          radial-gradient(ellipse 60% 80% at 85% 30%, rgba(66,165,245,0.10) 0%, transparent 55%),
          radial-gradient(ellipse 40% 40% at 50% 100%, rgba(21,101,192,0.08) 0%, transparent 50%),
          #04080F
        `,
        position:"relative", overflow:"hidden",
        display:"flex", alignItems:"center",
      }}>

        {/* Grid overlay */}
        <div style={{
          position:"absolute", inset:0,
          backgroundImage:`
            linear-gradient(rgba(66,165,245,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(66,165,245,0.04) 1px, transparent 1px)
          `,
          backgroundSize:"60px 60px",
          maskImage:"radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }} />

        {/* Floating particles */}
        {[...Array(18)].map((_,i) => (
          <div key={i} className="particle" style={{
            left:`${5 + (i*5.5)%90}%`,
            bottom:`${10 + (i*7)%60}%`,
            animationDelay:`${i*0.38}s`,
            animationDuration:`${4 + (i%4)}s`,
            width: i%4===0?"5px":"2px", height: i%4===0?"5px":"2px",
            opacity: 0.15 + (i%5)*0.1,
            background: i%3===0?"#42A5F5":i%3===1?"#1565C0":"#90CAF9",
          }} />
        ))}

        {/* Huge background wordmark */}
        <div style={{
          position:"absolute", top:"50%", left:"50%",
          transform:"translate(-50%,-50%)",
          fontSize:"clamp(8rem,20vw,22rem)", fontWeight:900,
          color:"rgba(21,101,192,0.05)", whiteSpace:"nowrap",
          userSelect:"none", letterSpacing:"-0.05em", lineHeight:1,
          pointerEvents:"none",
        }}>MUGHAL</div>

        <div style={{ maxWidth:"1240px", margin:"0 auto", padding:"4rem 2rem", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem", alignItems:"center", position:"relative", zIndex:2, width:"100%" }}>

          {/* ── LEFT: COPY ── */}
          <div>
            {/* Badge */}
            <div className="fade-in-up" style={{ marginBottom:"1.25rem", display:"flex", gap:"0.6rem", flexWrap:"wrap" }}>
              <span className="badge-blue">🏆 Lahore's #1 Sports Shop</span>
              <span className="badge-outline">Since 2005</span>
            </div>

            {/* Headline */}
            <h1 className="hero-title fade-in-up-2">
              <span style={{ color:"#fff", display:"block" }}>MUGHAL</span>
              <span className="brand-text" style={{ display:"block" }}>SPORTS</span>
              <span style={{ color:"rgba(255,255,255,0.35)", fontSize:"0.35em", fontWeight:700, letterSpacing:"0.25em", display:"block", marginTop:"0.3em" }}>LAHORE · PAKISTAN</span>
            </h1>

            {/* Glow line */}
            <div className="fade-in-up-3" style={{ margin:"1.5rem 0", display:"flex", alignItems:"center", gap:"1rem" }}>
              <div style={{ height:"3px", width:"60px", background:"linear-gradient(90deg,#1565C0,#42A5F5)", borderRadius:"2px" }} />
              <span style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.78rem", letterSpacing:"0.2em", textTransform:"uppercase" }}>Premium Sports Equipment</span>
            </div>

            <p className="fade-in-up-3" style={{ color:"rgba(255,255,255,0.6)", fontSize:"1.05rem", lineHeight:1.85, maxWidth:"460px", marginBottom:"2rem" }}>
              Pakistan's most trusted sports supplier for schools, clubs &amp; athletes. From cricket bats to full school kits — we deliver quality across all of Lahore.
            </p>

            {/* CTAs */}
            <div className="fade-in-up-4" style={{ display:"flex", gap:"1rem", flexWrap:"wrap", marginBottom:"3rem" }}>
              <Link href="/products" className="btn-primary glow-pulse">
                🛒 Shop Products
              </Link>
              <a href="tel:03002787977" className="btn-ghost">
                📞 0300-2787977
              </a>
            </div>

            {/* Stats row */}
            <div className="fade-in-up-5" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1rem" }}>
              {stats.map(s => (
                <div key={s.label} style={{
                  background:"rgba(21,101,192,0.08)",
                  border:"1px solid rgba(66,165,245,0.15)",
                  borderRadius:"0.85rem", padding:"0.9rem 0.5rem",
                  textAlign:"center",
                  transition:"all 0.3s",
                }}>
                  <div style={{ fontSize:"1.1rem", marginBottom:"0.2rem" }}>{s.icon}</div>
                  <div className="brand-text" style={{ fontSize:"1.45rem", fontWeight:900, lineHeight:1 }}>{s.value}</div>
                  <div style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.68rem", marginTop:"0.3rem", lineHeight:1.3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: 3D VISUAL ── */}
          <div style={{ display:"flex", justifyContent:"center", alignItems:"center", position:"relative", height:"520px" }}>

            {/* Outer orbit ring */}
            <div style={{
              position:"absolute", width:"420px", height:"420px", borderRadius:"50%",
              border:"1px solid rgba(66,165,245,0.08)",
            }} />
            <div style={{
              position:"absolute", width:"340px", height:"340px", borderRadius:"50%",
              border:"1px solid rgba(66,165,245,0.12)",
              animation:"border-glow 4s ease-in-out infinite",
            }} />
            <div style={{
              position:"absolute", width:"260px", height:"260px", borderRadius:"50%",
              border:"2px solid rgba(66,165,245,0.2)",
              animation:"border-glow 3s ease-in-out 1s infinite",
            }} />

            {/* Central Logo 3D */}
            <div className="float-anim" style={{
              position:"relative", zIndex:3,
              width:"160px", height:"160px",
              borderRadius:"28px",
              overflow:"hidden",
              boxShadow:`
                0 0 0 1px rgba(66,165,245,0.3),
                0 0 40px rgba(21,101,192,0.6),
                0 0 80px rgba(21,101,192,0.3),
                0 30px 80px rgba(0,0,0,0.6),
                inset 0 1px 0 rgba(255,255,255,0.15)
              `,
              transform:"perspective(600px) rotateX(10deg)",
            }}>
              <Image src="/logo.svg" alt="Mughal Sports" width={160} height={160} style={{ display:"block" }} />
              {/* Shine overlay */}
              <div style={{
                position:"absolute", inset:0,
                background:"linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)",
                pointerEvents:"none",
              }} />
            </div>

            {/* Orbiting sport icons */}
            {categories.slice(0,6).map((cat, i) => {
              const angle = (i / 6) * 360;
              const rad   = (angle * Math.PI) / 180;
              const r     = 180;
              const x     = r * Math.cos(rad);
              const y     = r * Math.sin(rad) * 0.55; // flatten orbit
              return (
                <div key={cat.name} style={{
                  position:"absolute",
                  left:`calc(50% + ${x}px - 32px)`,
                  top:`calc(50% + ${y}px - 32px)`,
                  width:"64px", height:"64px",
                  borderRadius:"16px",
                  background:"rgba(21,101,192,0.12)",
                  border:"1px solid rgba(66,165,245,0.25)",
                  backdropFilter:"blur(12px)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"1.6rem",
                  boxShadow:"0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
                  animation:`float-slow ${3.5 + i*0.3}s ease-in-out ${i*0.5}s infinite`,
                  zIndex:2,
                }}>
                  {cat.icon}
                  <div style={{
                    position:"absolute", bottom:"-1.6rem",
                    fontSize:"0.6rem", color:"rgba(255,255,255,0.4)",
                    whiteSpace:"nowrap", fontWeight:600,
                  }}>{cat.name}</div>
                </div>
              );
            })}

            {/* Glow floor shadow */}
            <div style={{
              position:"absolute", bottom:"-20px",
              width:"200px", height:"30px",
              background:"rgba(21,101,192,0.3)",
              borderRadius:"50%",
              filter:"blur(20px)",
            }} />
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position:"absolute", bottom:"2rem", left:"50%", transform:"translateX(-50%)", textAlign:"center", zIndex:2 }}>
          <div style={{ color:"rgba(255,255,255,0.25)", fontSize:"0.7rem", letterSpacing:"0.2em", marginBottom:"0.5rem" }}>SCROLL</div>
          <div style={{ width:"1px", height:"40px", background:"linear-gradient(to bottom, #42A5F5, transparent)", margin:"0 auto", animation:"float 1.5s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MARQUEE STRIP
      ══════════════════════════════════════════ */}
      <div style={{ background:"linear-gradient(135deg,#0D2350,#1565C0,#0D2350)", padding:"0.85rem 0", overflow:"hidden", borderTop:"1px solid rgba(66,165,245,0.2)", borderBottom:"1px solid rgba(66,165,245,0.2)" }}>
        <div className="marquee-track">
          {[...marqueeItems,...marqueeItems].map((item,i)=>(
            <span key={i} style={{ padding:"0 2.5rem", color:"#fff", fontWeight:700, fontSize:"0.82rem", letterSpacing:"0.08em", whiteSpace:"nowrap", opacity:0.9 }}>
              {item}  ·
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          CATEGORIES
      ══════════════════════════════════════════ */}
      <section style={{ padding:"7rem 2rem", maxWidth:"1240px", margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:"4rem" }}>
          <span className="badge-outline" style={{ marginBottom:"1rem", display:"inline-block" }}>All Sports</span>
          <h2 className="section-title" style={{ marginBottom:"1rem" }}>
            <span style={{ color:"#fff" }}>Shop By </span>
            <span className="brand-text">Sport</span>
          </h2>
          <div style={{ width:"60px", height:"3px", background:"linear-gradient(90deg,#1565C0,#42A5F5)", borderRadius:"2px", margin:"1rem auto 1.5rem" }} />
          <p style={{ color:"rgba(255,255,255,0.45)", maxWidth:"500px", margin:"0 auto", lineHeight:1.75 }}>
            From professional cricket gear to complete school football kits — everything in one place in Lahore.
          </p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:"1.25rem" }}>
          {categories.map((cat,i) => (
            <Link key={cat.name} href={`/products?category=${cat.name.toLowerCase()}`} style={{ textDecoration:"none" }}>
              <div className="glass-blue cat-card" style={{ padding:"2rem 1.75rem", position:"relative", overflow:"hidden", animationDelay:`${i*0.08}s` }}>
                {/* Corner accent */}
                <div style={{ position:"absolute", top:0, right:0, width:"80px", height:"80px", background:`radial-gradient(circle at top right, rgba(66,165,245,0.12), transparent)` }} />
                <div style={{ fontSize:"2.8rem", marginBottom:"1rem", display:"inline-block",
                  filter:"drop-shadow(0 4px 12px rgba(66,165,245,0.4))" }}>{cat.icon}</div>
                <h3 style={{ color:"#fff", fontWeight:800, fontSize:"1.15rem", marginBottom:"0.35rem" }}>{cat.name}</h3>
                <p style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.8rem" }}>{cat.count}</p>
                <div style={{ marginTop:"1.25rem", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ color:"#42A5F5", fontSize:"0.78rem", fontWeight:700 }}>Browse →</span>
                  <div style={{ width:"32px", height:"32px", borderRadius:"50%", background:"rgba(21,101,192,0.15)", border:"1px solid rgba(66,165,245,0.2)", display:"flex", alignItems:"center", justifyContent:"center", color:"#42A5F5", fontSize:"0.9rem" }}>→</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ══════════════════════════════════════════
          WHY CHOOSE US — 3D CARDS
      ══════════════════════════════════════════ */}
      <section style={{
        padding:"7rem 2rem",
        background:"radial-gradient(ellipse 80% 60% at 50% 50%, rgba(21,101,192,0.06) 0%, transparent 70%)",
      }}>
        <div style={{ maxWidth:"1240px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"4rem" }}>
            <h2 className="section-title">
              <span style={{ color:"#fff" }}>Why Schools &amp; Clubs </span>
              <span className="brand-text">Choose Us</span>
            </h2>
            <div style={{ width:"60px", height:"3px", background:"linear-gradient(90deg,#1565C0,#42A5F5)", borderRadius:"2px", margin:"1.25rem auto 0" }} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"1.5rem" }}>
            {[
              { icon:"🏆", title:"20+ Years Trust",   desc:"Serving Lahore schools and sports clubs since 2005 with genuine products." },
              { icon:"✅", title:"100% Authentic",    desc:"All equipment certified and sourced directly from top manufacturers." },
              { icon:"🚚", title:"Fast Delivery",     desc:"Bulk school orders delivered across Lahore within 24–48 hours." },
              { icon:"💰", title:"Best Prices",       desc:"Special bulk discounts for schools, academies and government institutions." },
              { icon:"📦", title:"Custom Kits",       desc:"Branded jerseys, custom printing and complete sports kit packages." },
              { icon:"🤝", title:"After-Sales Care",  desc:"Warranty, exchange and dedicated support for every purchase." },
            ].map((item,i) => (
              <div key={item.title} className="glass card-3d" style={{ padding:"2rem 1.75rem", textAlign:"center", animationDelay:`${i*0.1}s` }}>
                <div style={{
                  width:"64px", height:"64px", borderRadius:"18px",
                  background:"rgba(21,101,192,0.12)",
                  border:"1px solid rgba(66,165,245,0.2)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"2rem", margin:"0 auto 1.25rem",
                  boxShadow:"0 4px 20px rgba(21,101,192,0.2)",
                }}>{item.icon}</div>
                <h3 style={{ color:"#fff", fontWeight:800, marginBottom:"0.6rem", fontSize:"1rem" }}>{item.title}</h3>
                <p style={{ color:"rgba(255,255,255,0.45)", fontSize:"0.83rem", lineHeight:1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ══════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section style={{ padding:"7rem 2rem", maxWidth:"1240px", margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:"4rem" }}>
          <h2 className="section-title">
            <span className="brand-text">What Schools</span>
            <span style={{ color:"#fff" }}> Say About Us</span>
          </h2>
          <div style={{ width:"60px", height:"3px", background:"linear-gradient(90deg,#1565C0,#42A5F5)", borderRadius:"2px", margin:"1.25rem auto 0" }} />
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"1.5rem" }}>
          {testimonials.map(t => (
            <div key={t.name} className="glass-blue card-3d" style={{ padding:"2.25rem" }}>
              <div style={{ fontSize:"3.5rem", color:"rgba(66,165,245,0.15)", lineHeight:1, marginBottom:"0.75rem" }}>"</div>
              <div style={{ color:"#42A5F5", marginBottom:"1rem", fontSize:"1.05rem", letterSpacing:"0.05em" }}>{"★".repeat(t.stars)}</div>
              <p style={{ color:"rgba(255,255,255,0.7)", fontSize:"0.9rem", lineHeight:1.8, marginBottom:"1.5rem", fontStyle:"italic" }}>"{t.text}"</p>
              <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
                <div style={{ width:"40px", height:"40px", borderRadius:"50%", background:"linear-gradient(135deg,#1565C0,#42A5F5)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.1rem", flexShrink:0 }}>👤</div>
                <div>
                  <div style={{ color:"#fff", fontWeight:700, fontSize:"0.9rem" }}>{t.name}</div>
                  <div style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.75rem" }}>{t.org}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SCHOOL CTA BANNER
      ══════════════════════════════════════════ */}
      <section style={{ padding:"2rem 2rem 6rem" }}>
        <div style={{
          maxWidth:"1240px", margin:"0 auto",
          background:"linear-gradient(135deg, #0D2350 0%, #0B1426 40%, #0D2350 100%)",
          border:"1px solid rgba(66,165,245,0.2)",
          borderRadius:"2rem", padding:"5rem 3rem",
          textAlign:"center", position:"relative", overflow:"hidden",
        }}>
          {/* Background glow orbs */}
          <div style={{ position:"absolute", top:"-40px", left:"-40px", width:"200px", height:"200px", borderRadius:"50%", background:"radial-gradient(circle, rgba(21,101,192,0.3) 0%, transparent 70%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:"-40px", right:"-40px", width:"200px", height:"200px", borderRadius:"50%", background:"radial-gradient(circle, rgba(66,165,245,0.2) 0%, transparent 70%)", pointerEvents:"none" }} />
          <div style={{ position:"relative", zIndex:1 }}>
            <div style={{ fontSize:"4rem", marginBottom:"1.25rem" }}>🏫</div>
            <h2 className="section-title" style={{ color:"#fff", marginBottom:"1rem" }}>
              Are You a <span className="brand-text">School or Academy?</span>
            </h2>
            <p style={{ color:"rgba(255,255,255,0.55)", maxWidth:"520px", margin:"0 auto 2.5rem", lineHeight:1.8 }}>
              Special bulk pricing for schools, government institutions and sports academies. Custom kits, branded uniforms, complete sports packages available. Call us or send an enquiry.
            </p>
            <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
              <Link href="/contact" className="btn-primary">📋 Get School Quote</Link>
              <a href="tel:03002787977" className="btn-ghost">📞 Call 0300-2787977</a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="repeat(4,1fr)"] { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </div>
  );
}
