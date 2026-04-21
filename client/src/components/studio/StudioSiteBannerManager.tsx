/**
 * StudioSiteBannerManager
 *
 * Studio admin panel for two banners:
 *
 * 1. SITE-WIDE ANNOUNCEMENT BANNER
 *    Appears above the navigation bar on every page.
 *    Keys: bannerEnabled, bannerText, bannerColor
 *
 * 2. HOMEPAGE HERO BANNER
 *    A scrolling ribbon in the homepage hero area,
 *    between the hero image and the Watcher quote.
 *    Keys: heroBannerEnabled, heroBannerText, heroBannerColor, heroBannerSpeed
 *
 * Changes save to DB via setSiteSetting.
 * Banners fetch settings on every page load (staleTime 5 min).
 */
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const inputStyle: React.CSSProperties = {
  background: "#1a1410",
  border: "1px solid #2a2218",
  borderRadius: "6px",
  color: "#e8ddd0",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.875rem",
  padding: "0.5rem 0.75rem",
  width: "100%",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  color: "#8a7a6a",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.75rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  display: "block",
  marginBottom: "0.35rem",
};

export default function StudioSiteBannerManager() {
  const utils = trpc.useUtils();
  const { data: settings, isLoading } = trpc.studio.getSiteSettings.useQuery();

  // ── SITE-WIDE BANNER STATE ──
  const [enabled, setEnabled] = useState(false);
  const [text, setText] = useState("");
  const [color, setColor] = useState("#E8520A");
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  // ── HERO BANNER STATE ──
  const [heroEnabled, setHeroEnabled] = useState(false);
  const [heroText, setHeroText] = useState("");
  const [heroColor, setHeroColor] = useState("#E8520A");
  const [heroSpeed, setHeroSpeed] = useState<"slow" | "medium" | "off">("slow");
  const [heroDirty, setHeroDirty] = useState(false);
  const [heroSaving, setHeroSaving] = useState(false);

  useEffect(() => {
    if (!settings) return;
    setEnabled(settings.bannerEnabled === "true");
    setText(settings.bannerText ?? "Welcome to GallantryAI");
    setColor(settings.bannerColor ?? "#E8520A");
    setHeroEnabled(settings.heroBannerEnabled === "true");
    setHeroText(settings.heroBannerText ?? "Welcome. This is the builder.");
    setHeroColor(settings.heroBannerColor ?? "#E8520A");
    setHeroSpeed((settings.heroBannerSpeed as "slow" | "medium" | "off") ?? "slow");
    setDirty(false);
    setHeroDirty(false);
  }, [settings]);

  const setSettingMutation = trpc.studio.setSiteSetting.useMutation({
    onSuccess: () => { utils.studio.getSiteSettings.invalidate(); },
    onError: (err) => { toast.error("Save failed: " + err.message); },
  });

  async function handleSave() {
    setSaving(true);
    try {
      await setSettingMutation.mutateAsync({ key: "bannerEnabled", value: enabled ? "true" : "false" });
      await setSettingMutation.mutateAsync({ key: "bannerText", value: text });
      await setSettingMutation.mutateAsync({ key: "bannerColor", value: color });
      toast.success("Banner settings saved.");
      setDirty(false);
    } finally { setSaving(false); }
  }

  async function handleToggle(newEnabled: boolean) {
    setEnabled(newEnabled);
    setDirty(true);
    try {
      await setSettingMutation.mutateAsync({ key: "bannerEnabled", value: newEnabled ? "true" : "false" });
      toast.success(newEnabled ? "Banner turned on." : "Banner turned off.");
    } catch { /* handled in onError */ }
  }

  async function handleHeroSave() {
    setHeroSaving(true);
    try {
      await setSettingMutation.mutateAsync({ key: "heroBannerEnabled", value: heroEnabled ? "true" : "false" });
      await setSettingMutation.mutateAsync({ key: "heroBannerText", value: heroText });
      await setSettingMutation.mutateAsync({ key: "heroBannerColor", value: heroColor });
      await setSettingMutation.mutateAsync({ key: "heroBannerSpeed", value: heroSpeed });
      toast.success("Hero banner settings saved.");
      setHeroDirty(false);
    } finally { setHeroSaving(false); }
  }

  async function handleHeroToggle(newEnabled: boolean) {
    setHeroEnabled(newEnabled);
    setHeroDirty(true);
    try {
      await setSettingMutation.mutateAsync({ key: "heroBannerEnabled", value: newEnabled ? "true" : "false" });
      toast.success(newEnabled ? "Hero banner turned on." : "Hero banner turned off.");
    } catch { /* handled in onError */ }
  }

  if (isLoading) {
    return <p style={{ color: "#8a7a6a", fontFamily: "'DM Sans', sans-serif" }}>Loading banner settings…</p>;
  }

  return (
    <div>

      {/* ══ SECTION 1: SITE-WIDE ANNOUNCEMENT BANNER ══ */}
      <div style={{ background: "#130f0a", border: "1px solid #2a2218", borderRadius: "10px", padding: "1.25rem 1.5rem", marginBottom: "2rem" }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#f0e8d8", marginBottom: "0.5rem" }}>
          Site-Wide Announcement Banner
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#8a7a6a", lineHeight: "1.6" }}>
          This banner appears above the navigation on every page of the site.
          Toggle it on when you have something to say. Toggle it off when you're done.
        </p>
      </div>

      {/* Toggle */}
      <div style={{ background: "#130f0a", border: `1px solid ${enabled ? "#E8520A" : "#2a2218"}`, borderRadius: "10px", padding: "1.25rem 1.5rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#e8ddd0", fontWeight: 500, marginBottom: "0.2rem" }}>
            Banner is currently <span style={{ color: enabled ? "#E8520A" : "#5a4a3a" }}>{enabled ? "ON" : "OFF"}</span>
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#5a4a3a" }}>
            {enabled ? "Visitors can see the banner right now." : "The banner is hidden from all visitors."}
          </p>
        </div>
        <button onClick={() => handleToggle(!enabled)} aria-label={enabled ? "Turn banner off" : "Turn banner on"}
          style={{ width: "52px", height: "28px", borderRadius: "14px", background: enabled ? "#E8520A" : "#2a2218", border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
          <span style={{ position: "absolute", top: "3px", left: enabled ? "27px" : "3px", width: "22px", height: "22px", borderRadius: "50%", background: "#f0e8d8", transition: "left 0.2s", display: "block" }} />
        </button>
      </div>

      {/* Text + color */}
      <div style={{ background: "#130f0a", border: "1px solid #2a2218", borderRadius: "10px", padding: "1.25rem 1.5rem", marginBottom: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div>
          <label style={labelStyle}>Banner Text</label>
          <input type="text" value={text} onChange={(e) => { setText(e.target.value); setDirty(true); }} placeholder="Welcome to GallantryAI" style={inputStyle} maxLength={200} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#5a4a3a", marginTop: "0.35rem" }}>Keep it short — one clear sentence. ({text.length}/200)</p>
        </div>
        <div>
          <label style={labelStyle}>Banner Color</label>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <input type="color" value={color} onChange={(e) => { setColor(e.target.value); setDirty(true); }} style={{ width: "48px", height: "36px", border: "1px solid #2a2218", borderRadius: "6px", background: "none", cursor: "pointer", padding: "2px" }} />
            <input type="text" value={color} onChange={(e) => { setColor(e.target.value); setDirty(true); }} placeholder="#E8520A" style={{ ...inputStyle, width: "140px" }} maxLength={7} />
            <button onClick={() => { setColor("#E8520A"); setDirty(true); }} style={{ background: "none", border: "1px solid #2a2218", borderRadius: "6px", color: "#8a7a6a", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", padding: "0.4rem 0.75rem", cursor: "pointer" }}>Reset to orange</button>
          </div>
        </div>
        <div>
          <label style={labelStyle}>Preview</label>
          <div style={{ backgroundColor: color, borderRadius: "6px", padding: "0.6rem 2.5rem 0.6rem 1rem", position: "relative", minHeight: "2.5rem", display: "flex", alignItems: "center" }}>
            <p style={{ color: "#ffffff", fontFamily: "'Playfair Display', serif", fontSize: "clamp(0.75rem, 2vw, 1rem)", margin: 0, wordBreak: "break-word" }}>{text || "Your banner text will appear here"}</p>
            <span style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#ffffff", opacity: 0.6, fontSize: "0.875rem" }}>✕</span>
          </div>
        </div>
      </div>

      {/* Save — site-wide */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "3rem" }}>
        <button onClick={handleSave} disabled={saving || !dirty}
          style={{ background: dirty ? "#E8520A" : "#2a2218", border: "none", borderRadius: "8px", color: dirty ? "#fff" : "#5a4a3a", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 600, padding: "0.6rem 1.5rem", cursor: dirty ? "pointer" : "not-allowed", transition: "background 0.2s" }}>
          {saving ? "Saving…" : dirty ? "Save Banner Settings" : "No changes"}
        </button>
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid #2a2218", marginBottom: "3rem" }} />

      {/* ══ SECTION 2: HOMEPAGE HERO BANNER ══ */}
      <div style={{ background: "#130f0a", border: "1px solid #2a2218", borderRadius: "10px", padding: "1.25rem 1.5rem", marginBottom: "2rem" }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#f0e8d8", marginBottom: "0.5rem" }}>
          Homepage Hero Banner
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#8a7a6a", lineHeight: "1.6" }}>
          A scrolling ribbon in the homepage hero area — sits between the buffalo/sloth image and the Watcher quote.
          Use it for personal messages: "Welcome guys, builder had a rough day." Visitors can dismiss it. Does not cover any faces.
        </p>
      </div>

      {/* Hero toggle */}
      <div style={{ background: "#130f0a", border: `1px solid ${heroEnabled ? "#E8520A" : "#2a2218"}`, borderRadius: "10px", padding: "1.25rem 1.5rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#e8ddd0", fontWeight: 500, marginBottom: "0.2rem" }}>
            Hero banner is currently <span style={{ color: heroEnabled ? "#E8520A" : "#5a4a3a" }}>{heroEnabled ? "ON" : "OFF"}</span>
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#5a4a3a" }}>
            {heroEnabled ? "Visitors see the ribbon on the homepage." : "The ribbon is hidden."}
          </p>
        </div>
        <button onClick={() => handleHeroToggle(!heroEnabled)} aria-label={heroEnabled ? "Turn hero banner off" : "Turn hero banner on"}
          style={{ width: "52px", height: "28px", borderRadius: "14px", background: heroEnabled ? "#E8520A" : "#2a2218", border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
          <span style={{ position: "absolute", top: "3px", left: heroEnabled ? "27px" : "3px", width: "22px", height: "22px", borderRadius: "50%", background: "#f0e8d8", transition: "left 0.2s", display: "block" }} />
        </button>
      </div>

      {/* Hero text + color + speed */}
      <div style={{ background: "#130f0a", border: "1px solid #2a2218", borderRadius: "10px", padding: "1.25rem 1.5rem", marginBottom: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div>
          <label style={labelStyle}>Message Text</label>
          <textarea value={heroText} onChange={(e) => { setHeroText(e.target.value); setHeroDirty(true); }} placeholder="Welcome. This is the builder." maxLength={280} rows={3}
            style={{ ...inputStyle, resize: "vertical" as const, lineHeight: "1.5" }} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: heroText.length > 240 ? "#E8520A" : "#5a4a3a", marginTop: "0.35rem" }}>
            {heroText.length}/280 — shorter scrolls faster and reads cleaner.
          </p>
        </div>
        <div>
          <label style={labelStyle}>Ribbon Color</label>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <input type="color" value={heroColor} onChange={(e) => { setHeroColor(e.target.value); setHeroDirty(true); }} style={{ width: "48px", height: "36px", border: "1px solid #2a2218", borderRadius: "6px", background: "none", cursor: "pointer", padding: "2px" }} />
            <input type="text" value={heroColor} onChange={(e) => { setHeroColor(e.target.value); setHeroDirty(true); }} placeholder="#E8520A" style={{ ...inputStyle, width: "140px" }} maxLength={7} />
            <button onClick={() => { setHeroColor("#E8520A"); setHeroDirty(true); }} style={{ background: "none", border: "1px solid #2a2218", borderRadius: "6px", color: "#8a7a6a", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", padding: "0.4rem 0.75rem", cursor: "pointer" }}>Reset to orange</button>
          </div>
        </div>
        <div>
          <label style={labelStyle}>Scroll Speed</label>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" as const }}>
            {(["slow", "medium", "off"] as const).map((s) => (
              <button key={s} onClick={() => { setHeroSpeed(s); setHeroDirty(true); }}
                style={{ background: heroSpeed === s ? "#E8520A" : "#1a1410", border: `1px solid ${heroSpeed === s ? "#E8520A" : "#2a2218"}`, borderRadius: "6px", color: heroSpeed === s ? "#fff" : "#8a7a6a", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: heroSpeed === s ? 600 : 400, padding: "0.4rem 1rem", cursor: "pointer", transition: "all 0.15s" }}>
                {s === "off" ? "Static (no scroll)" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#5a4a3a", marginTop: "0.35rem" }}>
            Slow = 30s loop. Medium = 18s loop. Static = no movement.
          </p>
        </div>
        <div>
          <label style={labelStyle}>Preview</label>
          <div style={{ backgroundColor: `${heroColor}dd`, borderTop: `1px solid ${heroColor}`, borderBottom: `1px solid ${heroColor}`, borderRadius: "6px", padding: "0.6rem 2.5rem 0.6rem 1rem", position: "relative", minHeight: "2.75rem", display: "flex", alignItems: "center", overflow: "hidden" }}>
            <p style={{ color: "#ffffff", fontFamily: "'Playfair Display', serif", fontSize: "clamp(0.75rem, 1.8vw, 1rem)", margin: 0, wordBreak: "break-word", textShadow: "0 1px 3px rgba(0,0,0,0.4)", letterSpacing: "0.02em" }}>
              {heroText || "Your message will scroll here"}
              {heroSpeed !== "off" && <span style={{ opacity: 0.5, marginLeft: "2rem", fontSize: "0.8em" }}>◆</span>}
            </p>
            <span style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#ffffff", opacity: 0.6, fontSize: "0.875rem" }}>✕</span>
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "#5a4a3a", marginTop: "0.35rem" }}>
            Preview is static — scroll animation only plays on the live homepage.
          </p>
        </div>
      </div>

      {/* Save — hero */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={handleHeroSave} disabled={heroSaving || !heroDirty}
          style={{ background: heroDirty ? "#E8520A" : "#2a2218", border: "none", borderRadius: "8px", color: heroDirty ? "#fff" : "#5a4a3a", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 600, padding: "0.6rem 1.5rem", cursor: heroDirty ? "pointer" : "not-allowed", transition: "background 0.2s" }}>
          {heroSaving ? "Saving…" : heroDirty ? "Save Hero Banner Settings" : "No changes"}
        </button>
      </div>

    </div>
  );
}
