"use client";
import Link from "next/link";

export default function AboutPage() {
  const milestones = [
    { year: "2005", event: "Founded in Lahore, started supplying local cricket clubs" },
    { year: "2008", event: "Expanded to football and hockey equipment" },
    { year: "2012", event: "First bulk school contract with 15 Lahore schools" },
    { year: "2016", event: "Opened dedicated showroom in Lahore" },
    { year: "2020", event: "Launched online enquiry system, served 100+ schools" },
    { year: "2025", event: "Now supplying 200+ schools & institutions across Punjab" },
  ];

  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh", paddingTop: "70px" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0d1a0d, #0a0a0f, #1a1500)", padding: "5rem 2rem 4rem", textAlign: "center", position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(201,162,39,0.15)" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: "10rem", color: "rgba(201,162,39,0.04)", fontWeight: 900, whiteSpace: "nowrap", userSelect: "none" }}>MUGHAL</div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🏆</div>
          <h1 className="section-title gold-text" style={{ marginBottom: "1rem" }}>About Mughal Sports</h1>
          <p style={{ color: "rgba(255,255,255,0.55)", maxWidth: "550px", margin: "0 auto", lineHeight: 1.8, fontSize: "1.05rem" }}>
            Lahore's most trusted sports equipment supplier since 2005 — serving schools, clubs, and champions.
          </p>
        </div>
      </div>

      {/* Story */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "5rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <span className="badge-gold" style={{ marginBottom: "1rem", display: "inline-block" }}>Our Story</span>
            <h2 className="section-title" style={{ color: "#fff", marginBottom: "1.5rem" }}>Built on <span className="gold-text">Passion for Sports</span></h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.85, marginBottom: "1.25rem", fontSize: "0.95rem" }}>
              Mughal Sports Lahore was founded in 2005 by a group of sports enthusiasts who wanted to bring quality, affordable sports equipment to the athletes and schools of Lahore.
            </p>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.85, marginBottom: "1.25rem", fontSize: "0.95rem" }}>
              Starting with a small cricket equipment store, we expanded our range to cover every major sport — football, hockey, badminton, basketball, boxing, and athletics.
            </p>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.85, fontSize: "0.95rem" }}>
              Today we serve 200+ schools and institutions across Punjab, providing genuine equipment at prices that make sports accessible to every student and athlete.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[
              { value: "20+", label: "Years in Business", icon: "📅" },
              { value: "200+", label: "Schools Supplied", icon: "🏫" },
              { value: "500+", label: "Products Available", icon: "📦" },
              { value: "10K+", label: "Happy Customers", icon: "😊" },
            ].map((s) => (
              <div key={s.label} className="glass" style={{ padding: "1.5rem", textAlign: "center" }}>
                <div style={{ fontSize: "1.75rem", marginBottom: "0.4rem" }}>{s.icon}</div>
                <div className="shimmer" style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: "0.25rem" }}>{s.value}</div>
                <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.78rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Timeline */}
      <section style={{ maxWidth: "800px", margin: "0 auto", padding: "5rem 2rem" }}>
        <h2 className="section-title" style={{ textAlign: "center", marginBottom: "3rem", color: "#fff" }}>Our <span className="gold-text">Journey</span></h2>
        {milestones.map((m, i) => (
          <div key={m.year} style={{ display: "flex", gap: "1.5rem", marginBottom: "1.5rem", alignItems: "flex-start" }}>
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              <div style={{ background: "linear-gradient(135deg,#c9a227,#f0c94b)", color: "#000", fontWeight: 800, padding: "0.4rem 0.8rem", borderRadius: "0.5rem", fontSize: "0.9rem" }}>{m.year}</div>
              {i < milestones.length - 1 && <div style={{ width: "2px", height: "40px", background: "rgba(201,162,39,0.2)", margin: "0.4rem auto" }} />}
            </div>
            <div className="glass" style={{ padding: "1rem 1.25rem", flex: 1 }}>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem", lineHeight: 1.6 }}>{m.event}</p>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 className="section-title" style={{ marginBottom: "1rem", color: "#fff" }}>Ready to <span className="gold-text">Work With Us?</span></h2>
          <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "2rem", lineHeight: 1.7 }}>Whether you are a school, sports academy, or individual athlete — we have the right equipment at the right price.</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-gold">📋 Get a Quote</Link>
            <Link href="/products" className="btn-outline">🛒 Browse Products</Link>
          </div>
        </div>
      </section>

      <style>{`@media (max-width: 768px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
