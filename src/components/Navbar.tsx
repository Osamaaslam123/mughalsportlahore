"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { href: "/",         label: "Home"      },
    { href: "/products", label: "Products"  },
    { href: "/about",    label: "About Us"  },
    { href: "/contact",  label: "Contact"   },
  ];

  return (
    <>
      {/* ── Top info strip ── */}
      <div style={{
        background: "linear-gradient(135deg,#0B1426,#070D1A)",
        borderBottom: "1px solid rgba(66,165,245,0.1)",
        padding: "0.35rem 2rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: "0.75rem", color: "rgba(255,255,255,0.45)",
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1001,
      }}>
        <span>📍 Lahore, Punjab, Pakistan</span>
        <div style={{ display:"flex", gap:"1.5rem" }}>
          <a href="tel:03002787977" style={{ color:"rgba(255,255,255,0.6)", textDecoration:"none" }}>📞 0300-2787977</a>
          <span>🕐 Mon–Sat: 9AM – 8PM</span>
        </div>
      </div>

      {/* ── Main nav ── */}
      <nav style={{
        position: "fixed", top: "29px", left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(4,8,15,0.97)" : "linear-gradient(to bottom,rgba(4,8,15,0.85),transparent)",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(66,165,245,0.15)" : "none",
        transition: "all 0.35s",
        padding: "0 2rem",
      }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:"68px" }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:"0.8rem" }}>
            <div style={{ width:"44px", height:"44px", borderRadius:"10px", overflow:"hidden", flexShrink:0, boxShadow:"0 0 20px rgba(21,101,192,0.6),0 0 0 1px rgba(66,165,245,0.3)" }}>
              <Image src="/logo.svg" alt="Mughal Sports Lahore" width={44} height={44} style={{ display:"block" }} />
            </div>
            <div>
              <div style={{ fontWeight:900, fontSize:"1.05rem", color:"#fff", lineHeight:1, letterSpacing:"0.04em" }}>
                MUGHAL <span style={{ color:"#42A5F5" }}>SPORTS</span>
              </div>
              <div style={{ fontSize:"0.6rem", color:"rgba(255,255,255,0.4)", letterSpacing:"0.18em", textTransform:"uppercase", marginTop:"2px" }}>
                Lahore · Pakistan
              </div>
            </div>
          </Link>

          {/* Desktop nav — NO admin button visible to customers */}
          <div style={{ display:"flex", gap:"2.5rem", alignItems:"center" }} className="desk-nav">
            {links.map(l => (
              <Link key={l.href} href={l.href} className="nav-link">{l.label}</Link>
            ))}
            <a href="tel:03002787977" style={{
              background:"rgba(21,101,192,0.15)", border:"1px solid rgba(66,165,245,0.35)",
              color:"#42A5F5", borderRadius:"999px", padding:"0.45rem 1.25rem",
              fontSize:"0.82rem", fontWeight:700, textDecoration:"none", transition:"all 0.2s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(21,101,192,0.3)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(21,101,192,0.15)"; }}
            >
              📞 Call Us
            </a>
            <Link href="/contact" className="btn-primary" style={{ padding:"0.5rem 1.3rem", fontSize:"0.85rem", borderRadius:"0.5rem" }}>
              Get Quote
            </Link>
          </div>

          {/* Hamburger — mobile only */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background:"none", border:"none", cursor:"pointer", padding:"0.5rem", display:"none" }} className="ham" aria-label="Menu">
            {[0,1,2].map(i => (
              <div key={i} style={{
                width:"22px", height:"2px", background:"#42A5F5", marginBottom: i < 2 ? "5px" : 0,
                transition:"all 0.3s",
                transform: menuOpen ? (i===0?"rotate(45deg) translate(5px,5px)":i===2?"rotate(-45deg) translate(5px,-5px)":"") : "",
                opacity: menuOpen && i===1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div style={{ background:"rgba(4,8,15,0.98)", padding:"1.25rem 2rem 1.75rem", borderTop:"1px solid rgba(66,165,245,0.12)" }}>
            {links.map(l => (
              <div key={l.href} style={{ marginBottom:"1.1rem" }}>
                <Link href={l.href} className="nav-link" onClick={() => setMenuOpen(false)} style={{ fontSize:"1rem" }}>{l.label}</Link>
              </div>
            ))}
            <div style={{ display:"flex", gap:"0.75rem", marginTop:"0.5rem", flexWrap:"wrap" }}>
              <a href="tel:03002787977" className="btn-primary" style={{ fontSize:"0.88rem" }}>📞 0300-2787977</a>
              <Link href="/contact" className="btn-ghost" style={{ fontSize:"0.88rem" }} onClick={() => setMenuOpen(false)}>Get Quote</Link>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 900px) { .desk-nav { display:none !important; } .ham { display:block !important; } }
      `}</style>
    </>
  );
}
