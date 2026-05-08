"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/admin/dashboard",    icon: "▣",  label: "Dashboard"    },
  { href: "/admin/products",     icon: "📦", label: "Products"     },
  { href: "/admin/enquiries",    icon: "💬", label: "Enquiries"    },
  { href: "/admin/content",      icon: "🎨", label: "Content"      },
  { href: "/admin/testimonials", icon: "⭐", label: "Testimonials" },
  { href: "/admin/customers",    icon: "👥", label: "Customers"    },
];

function Sidebar({ collapsed, setCollapsed }: { collapsed: boolean; setCollapsed: (v: boolean) => void }) {
  const pathname = usePathname();
  const router   = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <aside style={{
      width: collapsed ? "72px" : "240px",
      minHeight: "100vh",
      background: "#070D1A",
      borderRight: "1px solid rgba(66,165,245,0.1)",
      display: "flex", flexDirection: "column",
      transition: "width 0.3s cubic-bezier(0.34,1.2,0.64,1)",
      flexShrink: 0,
      position: "sticky", top: 0,
    }}>
      {/* Logo area */}
      <div style={{ padding: collapsed ? "1.25rem 0" : "1.25rem 1.25rem", display: "flex", alignItems: "center", gap: "0.75rem", borderBottom: "1px solid rgba(66,165,245,0.08)", justifyContent: collapsed ? "center" : "flex-start" }}>
        <div style={{ width: "38px", height: "38px", borderRadius: "10px", overflow: "hidden", flexShrink: 0, boxShadow: "0 0 15px rgba(21,101,192,0.5)" }}>
          <Image src="/logo.svg" alt="Logo" width={38} height={38} />
        </div>
        {!collapsed && (
          <div>
            <div style={{ color: "#fff", fontWeight: 900, fontSize: "0.88rem", letterSpacing: "0.04em" }}>MUGHAL <span style={{ color: "#42A5F5" }}>SPORTS</span></div>
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.58rem", letterSpacing: "0.12em" }}>ADMIN PANEL</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "1rem 0" }}>
        {navItems.map(item => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link key={item.href} href={item.href} style={{ textDecoration: "none", display: "block", margin: "0.2rem 0.75rem" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                padding: collapsed ? "0.75rem 0" : "0.75rem 1rem",
                borderRadius: "0.6rem",
                justifyContent: collapsed ? "center" : "flex-start",
                background: active ? "rgba(21,101,192,0.2)" : "transparent",
                border: active ? "1px solid rgba(66,165,245,0.3)" : "1px solid transparent",
                transition: "all 0.2s",
                cursor: "pointer",
              }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
              >
                <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{item.icon}</span>
                {!collapsed && <span style={{ color: active ? "#fff" : "rgba(255,255,255,0.55)", fontWeight: active ? 700 : 500, fontSize: "0.88rem" }}>{item.label}</span>}
                {active && !collapsed && <div style={{ marginLeft: "auto", width: "6px", height: "6px", borderRadius: "50%", background: "#42A5F5" }} />}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: "1rem 0.75rem", borderTop: "1px solid rgba(66,165,245,0.08)" }}>
        <button onClick={handleLogout} style={{
          width: "100%", display: "flex", alignItems: "center", gap: "0.75rem",
          padding: collapsed ? "0.75rem 0" : "0.75rem 1rem",
          justifyContent: collapsed ? "center" : "flex-start",
          background: "none", border: "none", borderRadius: "0.6rem",
          cursor: "pointer", transition: "background 0.2s",
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.1)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
        >
          <span style={{ fontSize: "1rem", flexShrink: 0 }}>🚪</span>
          {!collapsed && <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", fontWeight: 500 }}>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // Login page uses its own full-screen layout
  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#04080F" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top bar */}
        <header style={{
          height: "60px", background: "#070D1A",
          borderBottom: "1px solid rgba(66,165,245,0.1)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 1.5rem", flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button onClick={() => setCollapsed(c => !c)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)", fontSize: "1.1rem", padding: "0.4rem" }}>
              ☰
            </button>
            <div>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem" }}>Mughal Sports Lahore</span>
              <span style={{ color: "rgba(255,255,255,0.15)", margin: "0 0.4rem" }}>/</span>
              <span style={{ color: "#fff", fontSize: "0.82rem", fontWeight: 600 }}>
                {navItems.slice().reverse().find(n => pathname.startsWith(n.href))?.label ?? "Admin"}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <a href="/" target="_blank" rel="noopener noreferrer" style={{
              color: "#42A5F5", fontSize: "0.78rem", textDecoration: "none",
              border: "1px solid rgba(66,165,245,0.25)", borderRadius: "999px",
              padding: "0.3rem 0.8rem", fontWeight: 600,
            }}>
              🌐 View Site
            </a>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg,#1565C0,#42A5F5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>A</div>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem" }}>Admin</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, overflow: "auto", padding: "2rem" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
