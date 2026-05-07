import Link from "next/link";

const categories = [
  { icon: "🏏", name: "Cricket", desc: "Bats, balls, pads, gloves, helmets", color: "#c9a227", count: "120+ items" },
  { icon: "⚽", name: "Football", desc: "Balls, boots, jerseys, shin guards", color: "#2a8a3e", count: "90+ items" },
  { icon: "🏑", name: "Hockey", desc: "Sticks, balls, goalkeeper gear", color: "#c9a227", count: "60+ items" },
  { icon: "🏸", name: "Badminton", desc: "Rackets, shuttles, nets, bags", color: "#2a8a3e", count: "45+ items" },
  { icon: "🏀", name: "Basketball", desc: "Balls, hoops, jerseys, shoes", color: "#c9a227", count: "35+ items" },
  { icon: "🏐", name: "Volleyball", desc: "Balls, nets, knee pads, uniforms", color: "#2a8a3e", count: "30+ items" },
  { icon: "🥊", name: "Boxing", desc: "Gloves, punching bags, wraps", color: "#c9a227", count: "50+ items" },
  { icon: "🏃", name: "Athletics", desc: "Track shoes, stopwatches, cones", color: "#2a8a3e", count: "40+ items" },
];

const stats = [
  { value: "20+", label: "Years Experience" },
  { value: "500+", label: "Products Available" },
  { value: "200+", label: "Schools Supplied" },
  { value: "10K+", label: "Happy Customers" },
];

const testimonials = [
  { name: "Principal Ahmed", school: "Lahore Grammar School", text: "Mughal Sports has been our go-to supplier for all school sports events. Quality products, on-time delivery!", stars: 5 },
  { name: "Coach Rafiq", school: "DPS Cricket Academy", text: "Best cricket equipment in Lahore at the most competitive prices. Highly recommended for academies.", stars: 5 },
  { name: "Mr. Tariq", school: "Punjab Education Foundation", text: "Supplied sports kits for 50 schools across Lahore. Professional service and genuine products.", stars: 5 },
];

export default function HomePage() {
  return (
    <div style={{ background: "#0a0a0f" }}>

      {/* ── HERO SECTION ── */}
      <section style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 20% 50%, rgba(26,92,42,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(201,162,39,0.12) 0%, transparent 50%), #0a0a0f",
        display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden",
        paddingTop: "70px",
      }} className="stadium-bg">

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${(i * 8.3) % 100}%`,
            top: `${20 + (i * 13) % 70}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${3 + (i % 3)}s`,
            width: i % 3 === 0 ? "6px" : "3px",
            height: i % 3 === 0 ? "6px" : "3px",
            opacity: 0.2 + (i % 4) * 0.1,
          }} />
        ))}

        {/* Big background text */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          fontSize: "clamp(6rem,18vw,18rem)",
          fontWeight: 900, color: "rgba(201,162,39,0.04)",
          whiteSpace: "nowrap", userSelect: "none",
          letterSpacing: "-0.05em",
        }}>MUGHAL</div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", position: "relative", zIndex: 1 }}>

          {/* Left: Text */}
          <div>
            <div className="fade-in-up" style={{ marginBottom: "1rem" }}>
              <span className="badge-gold">🏆 Lahore's #1 Sports Shop</span>
            </div>
            <h1 className="hero-title fade-in-up-2">
              <span className="gold-text">MUGHAL</span><br />
              <span style={{ color: "#fff" }}>SPORTS</span><br />
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.55em", fontWeight: 600, letterSpacing: "0.2em" }}>LAHORE</span>
            </h1>
            <p className="fade-in-up-3" style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.1rem", lineHeight: 1.8, margin: "1.5rem 0", maxWidth: "460px" }}>
              Pakistan's most trusted sports equipment supplier. From cricket bats to football boots — we equip schools, academies, and champions.
            </p>
            <div className="fade-in-up-4" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/products" className="btn-gold glow-pulse" style={{ fontSize: "1rem" }}>
                🛒 Shop Now
              </Link>
              <Link href="/contact" className="btn-outline" style={{ fontSize: "1rem" }}>
                📞 Get Quote
              </Link>
            </div>
            <div className="fade-in-up-5" style={{ display: "flex", gap: "2rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="shimmer" style={{ fontSize: "1.8rem", fontWeight: 900 }}>{s.value}</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: 3D Visual */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
            {/* Outer glow ring */}
            <div style={{
              position: "absolute",
              width: "320px", height: "320px",
              borderRadius: "50%",
              border: "1px solid rgba(201,162,39,0.15)",
              animation: "glow-pulse 3s ease-in-out infinite",
            }} />
            <div style={{
              position: "absolute",
              width: "260px", height: "260px",
              borderRadius: "50%",
              border: "2px solid rgba(201,162,39,0.25)",
            }} />

            {/* Central 3D trophy */}
            <div className="trophy-3d float-anim" style={{ zIndex: 2 }}>🏆</div>

            {/* Orbiting sport icons */}
            {[
              { icon: "🏏", angle: 0 },
              { icon: "⚽", angle: 60 },
              { icon: "🏑", angle: 120 },
              { icon: "🏸", angle: 180 },
              { icon: "🥊", angle: 240 },
              { icon: "🏀", angle: 300 },
            ].map(({ icon, angle }) => {
              const rad = (angle * Math.PI) / 180;
              const r = 150;
              const x = r * Math.cos(rad);
              const y = r * Math.sin(rad);
              return (
                <div key={angle} style={{
                  position: "absolute",
                  left: `calc(50% + ${x}px - 24px)`,
                  top: `calc(50% + ${y}px - 24px)`,
                  width: "48px", height: "48px",
                  borderRadius: "50%",
                  background: "rgba(201,162,39,0.1)",
                  border: "1px solid rgba(201,162,39,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.4rem",
                  animation: `float ${3 + (angle / 60) * 0.3}s ease-in-out ${(angle / 60) * 0.5}s infinite`,
                }}>
                  {icon}
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", marginBottom: "0.5rem", letterSpacing: "0.15em" }}>SCROLL DOWN</div>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, #c9a227, transparent)", margin: "0 auto", animation: "float 1.5s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ── MARQUEE BANNER ── */}
      <div style={{ background: "linear-gradient(135deg, #c9a227, #f0c94b)", padding: "0.75rem 0", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: "3rem", animation: "shimmer 0s linear infinite", whiteSpace: "nowrap", color: "#000", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.05em" }}>
          {[...Array(6)].map((_, i) => (
            <span key={i} style={{ display: "inline-flex", gap: "3rem" }}>
              🏏 Cricket Equipment &nbsp;⚽ Football Gear &nbsp;🏑 Hockey Sticks &nbsp;🏸 Badminton Rackets &nbsp;🏀 Basketball &nbsp;🥊 Boxing Gear &nbsp;🏃 Athletics &nbsp;📦 School Bulk Orders
            </span>
          ))}
        </div>
      </div>

      {/* ── CATEGORIES SECTION ── */}
      <section style={{ padding: "6rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span className="badge-green" style={{ fontSize: "0.75rem", marginBottom: "0.75rem", display: "inline-block" }}>All Sports</span>
          <h2 className="section-title gold-text" style={{ marginBottom: "1rem" }}>Shop By Sport</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            From professional cricket gear to school football kits — everything you need under one roof in Lahore.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1.5rem" }}>
          {categories.map((cat) => (
            <Link key={cat.name} href={`/products?category=${cat.name.toLowerCase()}`} style={{ textDecoration: "none" }}>
              <div className="glass card-3d category-card" style={{ padding: "1.75rem", cursor: "pointer", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, right: 0, width: "80px", height: "80px", borderRadius: "0 0 0 80px", background: `${cat.color}11` }} />
                <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>{cat.icon}</div>
                <h3 style={{ color: cat.color, fontWeight: 800, fontSize: "1.15rem", marginBottom: "0.4rem" }}>{cat.name}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", lineHeight: 1.6 }}>{cat.desc}</p>
                <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: cat.color, fontSize: "0.78rem", fontWeight: 600 }}>{cat.count}</span>
                  <span style={{ color: cat.color, fontSize: "1.2rem" }}>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── WHY CHOOSE US ── */}
      <section style={{ padding: "6rem 2rem", background: "radial-gradient(ellipse at center, rgba(201,162,39,0.05) 0%, transparent 70%)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <h2 className="section-title" style={{ color: "#fff" }}>Why Schools &amp; Clubs <span className="gold-text">Choose Us</span></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem" }}>
            {[
              { icon: "🏆", title: "20+ Years Trust", desc: "Serving Lahore schools and sports clubs since 2005 with genuine products." },
              { icon: "✅", title: "100% Authentic", desc: "All equipment is certified and sourced directly from top manufacturers." },
              { icon: "🚚", title: "Fast Delivery", desc: "Bulk school orders delivered across Lahore within 24–48 hours." },
              { icon: "💰", title: "Best Prices", desc: "Special bulk discounts for schools, academies, and government institutions." },
              { icon: "📦", title: "Custom Kits", desc: "Branded jerseys, custom printing, and complete sports kit packages." },
              { icon: "🤝", title: "After-Sales Support", desc: "Warranty, exchange, and dedicated support for every purchase." },
            ].map((item) => (
              <div key={item.title} className="glass" style={{ padding: "1.75rem", textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{item.icon}</div>
                <h3 style={{ color: "#f0c94b", fontWeight: 700, marginBottom: "0.5rem" }}>{item.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "6rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2 className="section-title"><span className="gold-text">What Schools</span> Say About Us</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {testimonials.map((t) => (
            <div key={t.name} className="glass" style={{ padding: "2rem", position: "relative" }}>
              <div style={{ fontSize: "3rem", color: "rgba(201,162,39,0.2)", position: "absolute", top: "1rem", right: "1.5rem", lineHeight: 1 }}>"</div>
              <div style={{ color: "#c9a227", marginBottom: "0.75rem", fontSize: "1.1rem" }}>{"★".repeat(t.stars)}</div>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", lineHeight: 1.75, marginBottom: "1.25rem", fontStyle: "italic" }}>"{t.text}"</p>
              <div>
                <div style={{ color: "#f0c94b", fontWeight: 700, fontSize: "0.9rem" }}>{t.name}</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem" }}>{t.school}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section style={{
        margin: "0 2rem 4rem", borderRadius: "1.5rem",
        background: "linear-gradient(135deg, #1a2a1a 0%, #0a1a0a 40%, #1a1500 70%, #0a0a0f 100%)",
        border: "1px solid rgba(201,162,39,0.25)",
        padding: "4rem 2rem", textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,162,39,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🏫</div>
          <h2 className="section-title" style={{ color: "#fff", marginBottom: "1rem" }}>Are You a <span className="gold-text">School or Academy?</span></h2>
          <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: "500px", margin: "0 auto 2rem", lineHeight: 1.75 }}>
            Get special bulk pricing for schools, government institutions, and sports academies. Custom kits, branded uniforms, and complete sports packages available.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-gold" style={{ fontSize: "1rem" }}>📋 Get School Quote</Link>
            <Link href="/products" className="btn-outline" style={{ fontSize: "1rem" }}>🏷️ View All Products</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
