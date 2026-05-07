"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", school: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSent(true);
    setSending(false);
  };

  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh", paddingTop: "70px" }}>
      <div style={{ background: "linear-gradient(135deg, #0d1a0d, #0a0a0f)", padding: "4rem 2rem 3rem", textAlign: "center", borderBottom: "1px solid rgba(201,162,39,0.15)" }}>
        <h1 className="section-title gold-text" style={{ marginBottom: "0.75rem" }}>Contact Us</h1>
        <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: "450px", margin: "0 auto" }}>Get in touch for bulk orders, school quotes, or any enquiry</p>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "4rem 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>

        {/* Contact Info */}
        <div>
          <h2 style={{ color: "#f0c94b", fontWeight: 800, fontSize: "1.4rem", marginBottom: "2rem" }}>Get In Touch</h2>
          {[
            { icon: "📍", title: "Our Location", detail: "Lahore, Punjab, Pakistan" },
            { icon: "📞", title: "Phone / WhatsApp", detail: "+92 300 0000000" },
            { icon: "✉️", title: "Email", detail: "mughalspors@gmail.com" },
            { icon: "🕐", title: "Business Hours", detail: "Monday – Saturday: 9AM – 8PM" },
          ].map((item) => (
            <div key={item.title} className="glass" style={{ display: "flex", gap: "1rem", padding: "1.25rem", marginBottom: "1rem", alignItems: "flex-start" }}>
              <div style={{ fontSize: "1.75rem" }}>{item.icon}</div>
              <div>
                <div style={{ color: "#f0c94b", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.2rem" }}>{item.title}</div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.88rem" }}>{item.detail}</div>
              </div>
            </div>
          ))}

          <div className="glass" style={{ padding: "1.5rem", marginTop: "1.5rem" }}>
            <h3 style={{ color: "#f0c94b", fontWeight: 700, marginBottom: "0.75rem" }}>🏫 School & Bulk Orders</h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", lineHeight: 1.7 }}>
              Special pricing available for schools, government institutions, and sports academies. Mention your school name in the enquiry form for a custom quote.
            </p>
          </div>
        </div>

        {/* Form */}
        <div>
          <h2 style={{ color: "#f0c94b", fontWeight: 800, fontSize: "1.4rem", marginBottom: "2rem" }}>Send Enquiry</h2>
          {sent ? (
            <div style={{ textAlign: "center", padding: "3rem", background: "rgba(42,138,62,0.1)", border: "1px solid rgba(42,138,62,0.3)", borderRadius: "1rem" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
              <h3 style={{ color: "#2a8a3e", fontWeight: 700, marginBottom: "0.5rem" }}>Message Sent!</h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>We will contact you within 24 hours. Thank you for reaching out to Mughal Sports Lahore!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              {[
                { key: "name", label: "Your Name *", placeholder: "Muhammad Ahmed", type: "text", required: true },
                { key: "phone", label: "Phone / WhatsApp", placeholder: "+92 300 0000000", type: "tel", required: false },
                { key: "email", label: "Email Address", placeholder: "your@email.com", type: "email", required: false },
                { key: "school", label: "School / Institution (if applicable)", placeholder: "Lahore Grammar School", type: "text", required: false },
              ].map(({ key, label, placeholder, type, required }) => (
                <div key={key}>
                  <label style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", display: "block", marginBottom: "0.4rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
                  <input type={type} required={required} className="input-dark" placeholder={placeholder} value={form[key as keyof typeof form]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} />
                </div>
              ))}
              <div>
                <label style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", display: "block", marginBottom: "0.4rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Message / What do you need? *</label>
                <textarea required className="input-dark" style={{ minHeight: "130px", resize: "vertical" }} placeholder="I need 20 cricket bats and 5 sets of pads for our school cricket team..." value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} />
              </div>
              <button type="submit" disabled={sending} className="btn-gold" style={{ fontSize: "1rem", opacity: sending ? 0.7 : 1 }}>
                {sending ? "⏳ Sending..." : "📤 Send Enquiry"}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`@media (max-width: 768px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
