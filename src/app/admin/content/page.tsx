"use client";
import { useEffect, useState } from "react";

type Field = { key: string; label: string; hint?: string; textarea?: boolean };
type Section = { title: string; fields: Field[] };

const SECTIONS: Section[] = [
  {
    title: "🏠 Homepage Hero",
    fields: [
      { key: "hero_badge",       label: "Badge Text",    hint: "e.g. 🏆 Lahore's #1 Sports Shop" },
      { key: "hero_description", label: "Hero Description", hint: "Main tagline under the title", textarea: true },
    ],
  },
  {
    title: "📊 Statistics",
    fields: [
      { key: "stats_years",     label: "Years Experience", hint: "e.g. 20+" },
      { key: "stats_products",  label: "Products Count",   hint: "e.g. 500+" },
      { key: "stats_schools",   label: "Schools Supplied", hint: "e.g. 200+" },
      { key: "stats_customers", label: "Happy Customers",  hint: "e.g. 10K+" },
    ],
  },
  {
    title: "🏫 School Section",
    fields: [
      { key: "school_section_title", label: "Section Title",       hint: "e.g. Are You a School or Academy?" },
      { key: "school_section_desc",  label: "Section Description", hint: "Text below the title", textarea: true },
    ],
  },
  {
    title: "📖 About Page",
    fields: [
      { key: "about_story",   label: "Our Story",   textarea: true },
      { key: "about_mission", label: "Our Mission", textarea: true },
      { key: "about_vision",  label: "Our Vision",  textarea: true },
    ],
  },
  {
    title: "📞 Contact Info",
    fields: [
      { key: "contact_address", label: "Address" },
      { key: "contact_phone",   label: "Phone Number" },
      { key: "contact_email",   label: "Email" },
      { key: "contact_hours",   label: "Business Hours" },
    ],
  },
];

export default function ContentPage() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/content").then(r => r.json()).then(d => { setContent(d.content ?? {}); setLoading(false); });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ updates: content }) });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputStyle = { width: "100%", padding: "0.65rem 0.9rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(66,165,245,0.2)", borderRadius: "0.5rem", color: "#fff", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" as const };

  if (loading) return <div style={{ color: "rgba(255,255,255,0.3)", padding: "3rem", textAlign: "center" }}>Loading content…</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "1.4rem", marginBottom: "0.2rem" }}>Content Manager</h1>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}>Edit all text content on your website</p>
        </div>
        <button onClick={handleSave} disabled={saving} style={{ background: saved ? "rgba(16,185,129,0.2)" : "rgba(21,101,192,0.3)", border: `1px solid ${saved ? "#10B981" : "rgba(66,165,245,0.4)"}`, color: saved ? "#10B981" : "#42A5F5", borderRadius: "0.6rem", padding: "0.6rem 1.5rem", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer" }}>
          {saving ? "Saving…" : saved ? "✅ Saved!" : "💾 Save All Changes"}
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {SECTIONS.map(section => (
          <div key={section.title} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(66,165,245,0.08)", borderRadius: "1rem", padding: "1.5rem" }}>
            <h2 style={{ color: "#42A5F5", fontWeight: 800, fontSize: "0.95rem", marginBottom: "1.25rem", letterSpacing: "0.04em" }}>{section.title}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
              {section.fields.map(field => (
                <div key={field.key} style={{ gridColumn: field.textarea ? "1 / -1" : undefined }}>
                  <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", fontWeight: 700, marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {field.label}
                    {field.hint && <span style={{ color: "rgba(255,255,255,0.25)", fontWeight: 400, textTransform: "none", letterSpacing: 0, marginLeft: "0.5rem", fontSize: "0.72rem" }}>— {field.hint}</span>}
                  </label>
                  {field.textarea ? (
                    <textarea
                      rows={3}
                      style={{ ...inputStyle, resize: "vertical", minHeight: "80px" }}
                      value={content[field.key] ?? ""}
                      onChange={e => setContent(c => ({ ...c, [field.key]: e.target.value }))}
                    />
                  ) : (
                    <input
                      style={inputStyle}
                      value={content[field.key] ?? ""}
                      onChange={e => setContent(c => ({ ...c, [field.key]: e.target.value }))}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "1.5rem", textAlign: "right" }}>
        <button onClick={handleSave} disabled={saving} style={{ background: saved ? "rgba(16,185,129,0.2)" : "rgba(21,101,192,0.3)", border: `1px solid ${saved ? "#10B981" : "rgba(66,165,245,0.4)"}`, color: saved ? "#10B981" : "#42A5F5", borderRadius: "0.6rem", padding: "0.6rem 1.5rem", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer" }}>
          {saving ? "Saving…" : saved ? "✅ Saved!" : "💾 Save All Changes"}
        </button>
      </div>
    </div>
  );
}
