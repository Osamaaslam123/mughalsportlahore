"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#06060a", borderTop: "1px solid rgba(201,162,39,0.15)", paddingTop: "3rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2.5rem", marginBottom: "2.5rem" }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "linear-gradient(135deg,#c9a227,#f0c94b)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>⚽</div>
              <div>
                <div style={{ fontWeight: 900, color: "#f0c94b", fontSize: "0.95rem" }}>MUGHAL SPORTS</div>
                <div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em" }}>LAHORE, PAKISTAN</div>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.88rem", lineHeight: 1.7 }}>
              Supplying quality sports equipment to schools, clubs, and athletes across Lahore since 2005. Your game, our passion.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
              {["📘","📸","▶️","🐦"].map((icon, i) => (
                <div key={i} style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "1rem" }}>{icon}</div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: "#f0c94b", fontWeight: 700, marginBottom: "1rem", fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Quick Links</h4>
            {[["Home","/"],["Products","/products"],["About Us","/about"],["Contact","/contact"],["Admin Panel","/admin"]].map(([label, href]) => (
              <div key={href} style={{ marginBottom: "0.5rem" }}>
                <Link href={href} style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none", fontSize: "0.88rem", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#f0c94b")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                >
                  → {label}
                </Link>
              </div>
            ))}
          </div>

          {/* Sports Categories */}
          <div>
            <h4 style={{ color: "#f0c94b", fontWeight: 700, marginBottom: "1rem", fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Sports</h4>
            {["Cricket","Football","Hockey","Badminton","Basketball","Volleyball","Athletics","Boxing"].map((sport) => (
              <div key={sport} style={{ marginBottom: "0.5rem" }}>
                <Link href={`/products?category=${sport.toLowerCase()}`} style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none", fontSize: "0.88rem", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#f0c94b")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                >
                  → {sport}
                </Link>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ color: "#f0c94b", fontWeight: 700, marginBottom: "1rem", fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Contact Us</h4>
            {[
              ["📍", "Lahore, Punjab, Pakistan"],
              ["📞", "+92 300 0000000"],
              ["✉️", "mughalspors@gmail.com"],
              ["🕐", "Mon–Sat: 9AM – 8PM"],
            ].map(([icon, text]) => (
              <div key={text} style={{ display: "flex", gap: "0.6rem", marginBottom: "0.75rem", color: "rgba(255,255,255,0.55)", fontSize: "0.88rem" }}>
                <span>{icon}</span><span>{text}</span>
              </div>
            ))}
            <div style={{ marginTop: "1rem" }}>
              <span className="badge-gold">School Supplier</span>{" "}
              <span style={{ marginLeft: "0.4rem" }} className="badge-green">Trusted Since 2005</span>
            </div>
          </div>
        </div>

        <div className="divider" />
        <div style={{ padding: "1.25rem 0", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}>© 2025 Mughal Sports Lahore. All rights reserved.</p>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}>Made with ❤️ in Lahore, Pakistan</p>
        </div>
      </div>
    </footer>
  );
}
