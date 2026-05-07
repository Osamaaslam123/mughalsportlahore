"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        transition: "all 0.3s",
        background: scrolled
          ? "rgba(10,10,15,0.95)"
          : "linear-gradient(to bottom, rgba(10,10,15,0.8), transparent)",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,162,39,0.2)" : "none",
        padding: "0 2rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "70px" }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "50%",
            background: "linear-gradient(135deg, #c9a227, #f0c94b)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.2rem", boxShadow: "0 0 15px rgba(201,162,39,0.5)",
          }}>⚽</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: "1rem", lineHeight: 1, color: "#f0c94b" }}>MUGHAL SPORTS</div>
            <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Lahore, Pakistan</div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desktop-nav">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link">{l.label}</Link>
          ))}
          <Link href="/admin" className="btn-gold" style={{ padding: "0.5rem 1.2rem", fontSize: "0.85rem" }}>
            Admin Panel
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "0.5rem", display: "none" }}
          className="hamburger"
          aria-label="Menu"
        >
          <div style={{ width: "24px", height: "2px", background: "#f0c94b", marginBottom: "5px", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
          <div style={{ width: "24px", height: "2px", background: "#f0c94b", marginBottom: "5px", opacity: menuOpen ? 0 : 1 }} />
          <div style={{ width: "24px", height: "2px", background: "#f0c94b", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none", transition: "all 0.3s" }} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: "rgba(10,10,15,0.98)", padding: "1rem 2rem 1.5rem",
          borderTop: "1px solid rgba(201,162,39,0.2)",
        }}>
          {links.map((l) => (
            <div key={l.href} style={{ marginBottom: "1rem" }}>
              <Link href={l.href} className="nav-link" onClick={() => setMenuOpen(false)} style={{ fontSize: "1.1rem" }}>{l.label}</Link>
            </div>
          ))}
          <Link href="/admin" className="btn-gold" style={{ fontSize: "0.9rem" }} onClick={() => setMenuOpen(false)}>
            Admin Panel
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
