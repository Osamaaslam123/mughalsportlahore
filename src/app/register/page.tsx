"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form,    setForm]    = useState({ name: "", email: "", password: "", phone: "", school: "" });
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    const res = await fetch("/api/customers/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error); return; }
    router.push("/account");
  };

  const inputStyle = { width: "100%", padding: "0.75rem 1rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(66,165,245,0.2)", borderRadius: "0.6rem", color: "#fff", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" as const };

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(21,101,192,0.15) 0%, transparent 60%), #04080F", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: "460px" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", overflow: "hidden", boxShadow: "0 0 20px rgba(21,101,192,0.5)" }}>
              <Image src="/logo.svg" alt="Mughal Sports" width={48} height={48} />
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ color: "#fff", fontWeight: 900, fontSize: "1.1rem", letterSpacing: "0.04em" }}>MUGHAL <span style={{ color: "#42A5F5" }}>SPORTS</span></div>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.6rem", letterSpacing: "0.15em" }}>LAHORE · PAKISTAN</div>
            </div>
          </Link>
        </div>

        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(66,165,245,0.15)", borderRadius: "1.25rem", padding: "2rem" }}>
          <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "1.4rem", marginBottom: "0.3rem" }}>Create Account</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginBottom: "1.75rem" }}>Join Mughal Sports — get exclusive deals & order updates</p>

          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "0.5rem", padding: "0.7rem 1rem", color: "#EF4444", fontSize: "0.82rem", marginBottom: "1rem" }}>
                ⚠️ {error}
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "0.72rem", fontWeight: 700, marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Full Name *</label>
                <input required style={inputStyle} placeholder="Your full name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "0.72rem", fontWeight: 700, marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Phone</label>
                <input style={inputStyle} placeholder="03XX-XXXXXXX" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              </div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "0.72rem", fontWeight: 700, marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Email Address *</label>
              <input type="email" required style={inputStyle} placeholder="your@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "0.72rem", fontWeight: 700, marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>School / Organization (optional)</label>
              <input style={inputStyle} placeholder="e.g. Lahore Grammar School" value={form.school} onChange={e => setForm(f => ({ ...f, school: e.target.value }))} />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "0.72rem", fontWeight: 700, marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Password *</label>
              <input type="password" required minLength={6} style={inputStyle} placeholder="Minimum 6 characters" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
            </div>

            <button type="submit" disabled={loading} style={{ width: "100%", padding: "0.85rem", background: "linear-gradient(135deg,#1565C0,#1976D2)", border: "none", borderRadius: "0.6rem", color: "#fff", fontWeight: 800, fontSize: "0.95rem", cursor: "pointer", opacity: loading ? 0.7 : 1 }}>
              {loading ? "Creating account…" : "Create Account →"}
            </button>
          </form>

          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.35)", fontSize: "0.83rem", marginTop: "1.25rem" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#42A5F5", textDecoration: "none", fontWeight: 700 }}>Sign in</Link>
          </p>
        </div>

        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", fontSize: "0.82rem" }}>← Back to Home</Link>
        </p>
      </div>
    </div>
  );
}
