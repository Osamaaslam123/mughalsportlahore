"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";

function LoginForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const [pw, setPw]  = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    if (res.ok) {
      const from = searchParams.get("from") ?? "/admin/dashboard";
      router.push(from);
    } else {
      setErr("Incorrect password. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #04080F 0%, #0B1426 50%, #04080F 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "2rem",
      backgroundImage: `
        linear-gradient(rgba(66,165,245,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(66,165,245,0.03) 1px, transparent 1px),
        linear-gradient(135deg, #04080F 0%, #0B1426 50%, #04080F 100%)
      `,
      backgroundSize: "60px 60px, 60px 60px, 100% 100%",
    }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>

        {/* Logo + Brand */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{
            width: "80px", height: "80px", borderRadius: "20px",
            overflow: "hidden", margin: "0 auto 1.25rem",
            boxShadow: "0 0 40px rgba(21,101,192,0.6), 0 0 0 1px rgba(66,165,245,0.3)",
          }}>
            <Image src="/logo.svg" alt="Mughal Sports" width={80} height={80} />
          </div>
          <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "1.4rem", letterSpacing: "0.04em", marginBottom: "0.3rem" }}>
            MUGHAL <span style={{ color: "#42A5F5" }}>SPORTS</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Admin Panel · Lahore
          </p>
        </div>

        {/* Login Card */}
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(66,165,245,0.15)",
          borderRadius: "1.5rem",
          padding: "2.5rem",
          backdropFilter: "blur(20px)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}>
          <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.4rem" }}>Sign In</h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.82rem", marginBottom: "2rem" }}>
            Enter your admin password to continue
          </p>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.5rem" }}>
                Password
              </label>
              <input
                type="password"
                value={pw}
                onChange={e => setPw(e.target.value)}
                required
                placeholder="Enter admin password"
                style={{
                  width: "100%", padding: "0.85rem 1rem",
                  background: "rgba(255,255,255,0.06)",
                  border: `1px solid ${err ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`,
                  borderRadius: "0.6rem", color: "#fff",
                  fontSize: "0.95rem", outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={e => { e.currentTarget.style.borderColor = "rgba(66,165,245,0.6)"; }}
                onBlur={e => { e.currentTarget.style.borderColor = err ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"; }}
              />
              {err && <p style={{ color: "#f87171", fontSize: "0.78rem", marginTop: "0.4rem" }}>{err}</p>}
            </div>

            <button type="submit" disabled={loading} style={{
              width: "100%", padding: "0.9rem",
              background: loading ? "rgba(21,101,192,0.5)" : "linear-gradient(135deg, #1565C0, #1E88E5, #42A5F5)",
              color: "#fff", fontWeight: 800, fontSize: "0.95rem",
              border: "none", borderRadius: "0.6rem", cursor: loading ? "not-allowed" : "pointer",
              boxShadow: loading ? "none" : "0 6px 24px rgba(21,101,192,0.5)",
              transition: "all 0.2s",
            }}>
              {loading ? "Signing In…" : "Sign In →"}
            </button>
          </form>

          <div style={{ marginTop: "2rem", padding: "1rem", background: "rgba(21,101,192,0.08)", borderRadius: "0.6rem", border: "1px solid rgba(66,165,245,0.1)" }}>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.72rem", lineHeight: 1.6 }}>
              🔒 This panel is for authorised staff only. All actions are logged. Unauthorised access is prohibited.
            </p>
          </div>
        </div>

        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.2)", fontSize: "0.72rem", marginTop: "2rem" }}>
          © 2025 Mughal Sports Lahore · Admin Portal
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
