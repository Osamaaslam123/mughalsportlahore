"use client";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ background:"#030710", borderTop:"1px solid rgba(66,165,245,0.1)" }}>
      {/* Top glow line */}
      <div style={{ height:"2px", background:"linear-gradient(90deg, transparent, #1565C0, #42A5F5, #1565C0, transparent)" }} />

      <div style={{ maxWidth:"1240px", margin:"0 auto", padding:"4rem 2rem 2rem" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"2.5rem", marginBottom:"3rem" }}>

          {/* Brand */}
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1.25rem" }}>
              <div style={{ width:"44px", height:"44px", borderRadius:"10px", overflow:"hidden", boxShadow:"0 0 15px rgba(21,101,192,0.5)", flexShrink:0 }}>
                <Image src="/logo.svg" alt="Mughal Sports" width={44} height={44} />
              </div>
              <div>
                <div style={{ fontWeight:900, color:"#fff", fontSize:"0.95rem", letterSpacing:"0.04em" }}>MUGHAL <span style={{ color:"#42A5F5" }}>SPORTS</span></div>
                <div style={{ fontSize:"0.6rem", color:"rgba(255,255,255,0.35)", letterSpacing:"0.15em" }}>LAHORE · PAKISTAN</div>
              </div>
            </div>
            <p style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.83rem", lineHeight:1.75, marginBottom:"1.25rem" }}>
              Supplying quality sports equipment to schools, clubs and athletes across Lahore since 2005. Your game, our passion.
            </p>
            <a href="tel:03002787977" style={{
              display:"inline-flex", alignItems:"center", gap:"0.5rem",
              background:"rgba(21,101,192,0.15)", border:"1px solid rgba(66,165,245,0.25)",
              color:"#42A5F5", borderRadius:"999px", padding:"0.45rem 1rem",
              fontSize:"0.82rem", fontWeight:700, textDecoration:"none",
            }}>
              📞 0300-2787977
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color:"#42A5F5", fontWeight:800, marginBottom:"1.25rem", fontSize:"0.82rem", textTransform:"uppercase", letterSpacing:"0.12em" }}>Quick Links</h4>
            {[["Home","/"],["Products","/products"],["About Us","/about"],["Contact","/contact"]].map(([label,href])=>(
              <div key={href} style={{ marginBottom:"0.6rem" }}>
                <Link href={href} style={{ color:"rgba(255,255,255,0.45)", textDecoration:"none", fontSize:"0.85rem", transition:"color 0.2s" }}
                  onMouseEnter={e=>(e.currentTarget.style.color="#fff")}
                  onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.45)")}
                >→ {label}</Link>
              </div>
            ))}
          </div>

          {/* Sports */}
          <div>
            <h4 style={{ color:"#42A5F5", fontWeight:800, marginBottom:"1.25rem", fontSize:"0.82rem", textTransform:"uppercase", letterSpacing:"0.12em" }}>Sports</h4>
            {["Cricket","Football","Hockey","Badminton","Basketball","Volleyball","Boxing","Athletics"].map(s=>(
              <div key={s} style={{ marginBottom:"0.6rem" }}>
                <Link href={`/products?category=${s.toLowerCase()}`} style={{ color:"rgba(255,255,255,0.45)", textDecoration:"none", fontSize:"0.85rem", transition:"color 0.2s" }}
                  onMouseEnter={e=>(e.currentTarget.style.color="#fff")}
                  onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.45)")}
                >→ {s}</Link>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color:"#42A5F5", fontWeight:800, marginBottom:"1.25rem", fontSize:"0.82rem", textTransform:"uppercase", letterSpacing:"0.12em" }}>Contact Us</h4>
            {[
              ["📍","Lahore, Punjab, Pakistan"],
              ["📞","0300-2787977"],
              ["✉️","mughalspors@gmail.com"],
              ["🕐","Mon–Sat: 9AM – 8PM"],
            ].map(([icon,text])=>(
              <div key={text} style={{ display:"flex", gap:"0.6rem", marginBottom:"0.85rem", color:"rgba(255,255,255,0.45)", fontSize:"0.83rem" }}>
                <span style={{ flexShrink:0 }}>{icon}</span><span>{text}</span>
              </div>
            ))}
            <div style={{ marginTop:"1rem", display:"flex", gap:"0.5rem", flexWrap:"wrap" }}>
              <span className="badge-blue">🏫 School Supplier</span>
              <span className="badge-outline">Since 2005</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ height:"1px", background:"linear-gradient(90deg,transparent,rgba(66,165,245,0.2),transparent)", marginBottom:"1.5rem" }} />
        <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:"0.5rem" }}>
          <p style={{ color:"rgba(255,255,255,0.25)", fontSize:"0.78rem" }}>© 2025 Mughal Sports Lahore. All rights reserved.</p>
          <p style={{ color:"rgba(255,255,255,0.25)", fontSize:"0.78rem" }}>Made with ❤️ in Lahore, Pakistan</p>
        </div>
      </div>
    </footer>
  );
}
