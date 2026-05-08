"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Customer { id: number; name: string; email: string; phone: string; school: string; created_at: string; }

export default function AccountPage() {
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    fetch("/api/customers/me").then(r => r.json()).then(d => {
      if (!d.customer) { router.push("/login"); return; }
      setCustomer(d.customer); setLoading(false);
    });
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/customers/logout", { method: "POST" });
    router.push("/");
  };

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#04080F", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "rgba(255,255,255,0.3)" }}>Loading…</p>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(21,101,192,0.12) 0%, transparent 60%), #04080F", paddingTop: "100px", padding: "120px 2rem 4rem" }}>
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", overflow: "hidden", boxShadow: "0 0 15px rgba(21,101,192,0.4)" }}>
              <Image src="/logo.svg" alt="Logo" width={40} height={40} />
            </div>
          </Link>
          <div>
            <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "1.3rem" }}>My Account</h1>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem" }}>Mughal Sports Lahore</p>
          </div>
          <button onClick={handleLogout} style={{ marginLeft: "auto", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#EF4444", borderRadius: "0.5rem", padding: "0.45rem 1rem", cursor: "pointer", fontSize: "0.82rem", fontWeight: 700 }}>
            Sign Out
          </button>
        </div>

        {/* Profile card */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(66,165,245,0.15)", borderRadius: "1.25rem", padding: "2rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "1.75rem" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "linear-gradient(135deg,#1565C0,#42A5F5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", fontWeight: 900, flexShrink: 0 }}>
              {customer?.name[0]?.toUpperCase()}
            </div>
            <div>
              <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "1.2rem" }}>{customer?.name}</h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.82rem" }}>Member since {new Date(customer?.created_at ?? "").toLocaleDateString("en-PK", { month: "long", year: "numeric" })}</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[
              { icon: "✉️", label: "Email",        value: customer?.email },
              { icon: "📞", label: "Phone",        value: customer?.phone || "Not provided" },
              { icon: "🏫", label: "School",       value: customer?.school || "Not provided" },
              { icon: "📅", label: "Member Since", value: new Date(customer?.created_at ?? "").toLocaleDateString("en-PK", { dateStyle: "medium" }) },
            ].map(item => (
              <div key={item.label} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "0.75rem", padding: "1rem" }}>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.35rem" }}>{item.icon} {item.label}</p>
                <p style={{ color: "#fff", fontSize: "0.88rem", fontWeight: 600 }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <Link href="/products" style={{ textDecoration: "none", background: "rgba(21,101,192,0.1)", border: "1px solid rgba(66,165,245,0.2)", borderRadius: "0.85rem", padding: "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontSize: "1.5rem" }}>🛒</span>
            <div>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>Browse Products</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>Shop all sports equipment</p>
            </div>
          </Link>
          <Link href="/contact" style={{ textDecoration: "none", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: "0.85rem", padding: "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontSize: "1.5rem" }}>📋</span>
            <div>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>Get a Quote</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>Bulk orders & school kits</p>
            </div>
          </Link>
        </div>

        <p style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", fontSize: "0.82rem" }}>← Back to Home</Link>
        </p>
      </div>
    </div>
  );
}
