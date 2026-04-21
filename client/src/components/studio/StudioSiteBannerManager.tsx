/**
 * StudioSiteBannerManager
 *
 * Studio admin panel for the site-wide announcement banner.
 * Lets the owner:
 *   - Toggle the banner on or off
 *   - Edit the banner text
 *   - Change the banner background color
 *
 * Changes save immediately to the DB via setSiteSetting.
 * The banner fetches settings on every page load (staleTime 5 min),
 * so changes propagate within minutes without a deploy.
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

  // Local state mirrors the DB values — edit locally, save on button press
  const [enabled, setEnabled] = useState(false);
  const [text, setText] = useState("");
  const [color, setColor] = useState("#E8520A");
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  // Sync local state when DB data arrives
  useEffect(() => {
    if (!settings) return;
    setEnabled(settings.bannerEnabled === "true");
    setText(settings.bannerText ?? "Welcome to GallantryAI");
    setColor(settings.bannerColor ?? "#E8520A");
    setDirty(false);
  }, [settings]);

  const setSettingMutation = trpc.studio.setSiteSetting.useMutation({
    onSuccess: () => {
      utils.studio.getSiteSettings.invalidate();
    },
    onError: (err) => {
      toast.error("Save failed: " + err.message);
    },
  });

  async function handleSave() {
    setSaving(true);
    try {
      await setSettingMutation.mutateAsync({ key: "bannerEnabled", value: enabled ? "true" : "false" });
      await setSettingMutation.mutateAsync({ key: "bannerText", value: text });
      await setSettingMutation.mutateAsync({ key: "bannerColor", value: color });
      toast.success("Banner settings saved.");
      setDirty(false);
    } finally {
      setSaving(false);
    }
  }

  // Quick toggle — saves enabled state immediately without touching text/color
  async function handleToggle(newEnabled: boolean) {
    setEnabled(newEnabled);
    setDirty(true);
    try {
      await setSettingMutation.mutateAsync({ key: "bannerEnabled", value: newEnabled ? "true" : "false" });
      toast.success(newEnabled ? "Banner turned on." : "Banner turned off.");
    } catch {
      // error already handled in onError
    }
  }

  if (isLoading) {
    return (
      <p style={{ color: "#8a7a6a", fontFamily: "'DM Sans', sans-serif" }}>
        Loading banner settings…
      </p>
    );
  }

  return (
    <div>
      {/* Explanation card */}
      <div
        style={{
          background: "#130f0a",
          border: "1px solid #2a2218",
          borderRadius: "10px",
          padding: "1.25rem 1.5rem",
          marginBottom: "2rem",
        }}
      >
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.1rem",
            color: "#f0e8d8",
            marginBottom: "0.5rem",
          }}
        >
          Site-Wide Announcement Banner
        </p>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.875rem",
            color: "#8a7a6a",
            lineHeight: "1.6",
          }}
        >
          This banner appears above the navigation on every page of the site.
          Toggle it on when you have something to say — a new page, a note to visitors,
          a reminder. Toggle it off when you're done. Changes go live within minutes.
        </p>
      </div>

      {/* Toggle row */}
      <div
        style={{
          background: "#130f0a",
          border: `1px solid ${enabled ? "#E8520A" : "#2a2218"}`,
          borderRadius: "10px",
          padding: "1.25rem 1.5rem",
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem",
              color: "#e8ddd0",
              fontWeight: 500,
              marginBottom: "0.2rem",
            }}
          >
            Banner is currently{" "}
            <span style={{ color: enabled ? "#E8520A" : "#5a4a3a" }}>
              {enabled ? "ON" : "OFF"}
            </span>
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8rem",
              color: "#5a4a3a",
            }}
          >
            {enabled
              ? "Visitors can see the banner right now."
              : "The banner is hidden from all visitors."}
          </p>
        </div>

        {/* Toggle switch */}
        <button
          onClick={() => handleToggle(!enabled)}
          aria-label={enabled ? "Turn banner off" : "Turn banner on"}
          style={{
            width: "52px",
            height: "28px",
            borderRadius: "14px",
            background: enabled ? "#E8520A" : "#2a2218",
            border: "none",
            cursor: "pointer",
            position: "relative",
            transition: "background 0.2s",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "3px",
              left: enabled ? "27px" : "3px",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              background: "#f0e8d8",
              transition: "left 0.2s",
              display: "block",
            }}
          />
        </button>
      </div>

      {/* Text + color editors */}
      <div
        style={{
          background: "#130f0a",
          border: "1px solid #2a2218",
          borderRadius: "10px",
          padding: "1.25rem 1.5rem",
          marginBottom: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        {/* Banner text */}
        <div>
          <label style={labelStyle}>Banner Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => { setText(e.target.value); setDirty(true); }}
            placeholder="Welcome to GallantryAI"
            style={inputStyle}
            maxLength={200}
          />
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.75rem",
              color: "#5a4a3a",
              marginTop: "0.35rem",
            }}
          >
            Keep it short — one clear sentence works best. ({text.length}/200)
          </p>
        </div>

        {/* Banner color */}
        <div>
          <label style={labelStyle}>Banner Color</label>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <input
              type="color"
              value={color}
              onChange={(e) => { setColor(e.target.value); setDirty(true); }}
              style={{
                width: "48px",
                height: "36px",
                border: "1px solid #2a2218",
                borderRadius: "6px",
                background: "none",
                cursor: "pointer",
                padding: "2px",
              }}
            />
            <input
              type="text"
              value={color}
              onChange={(e) => { setColor(e.target.value); setDirty(true); }}
              placeholder="#E8520A"
              style={{ ...inputStyle, width: "140px" }}
              maxLength={7}
            />
            <button
              onClick={() => { setColor("#E8520A"); setDirty(true); }}
              style={{
                background: "none",
                border: "1px solid #2a2218",
                borderRadius: "6px",
                color: "#8a7a6a",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                padding: "0.4rem 0.75rem",
                cursor: "pointer",
              }}
            >
              Reset to orange
            </button>
          </div>
        </div>

        {/* Live preview */}
        <div>
          <label style={labelStyle}>Preview</label>
          <div
            style={{
              backgroundColor: color,
              borderRadius: "6px",
              padding: "0.6rem 2.5rem 0.6rem 1rem",
              position: "relative",
              minHeight: "2.5rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <p
              style={{
                color: "#ffffff",
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(0.75rem, 2vw, 1rem)",
                margin: 0,
                wordBreak: "break-word",
              }}
            >
              {text || "Your banner text will appear here"}
            </p>
            {/* Fake close button in preview */}
            <span
              style={{
                position: "absolute",
                right: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#ffffff",
                opacity: 0.6,
                fontSize: "0.875rem",
              }}
            >
              ✕
            </span>
          </div>
        </div>
      </div>

      {/* Save button */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={handleSave}
          disabled={saving || !dirty}
          style={{
            background: dirty ? "#E8520A" : "#2a2218",
            border: "none",
            borderRadius: "8px",
            color: dirty ? "#fff" : "#5a4a3a",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.875rem",
            fontWeight: 600,
            padding: "0.6rem 1.5rem",
            cursor: dirty ? "pointer" : "not-allowed",
            transition: "background 0.2s",
          }}
        >
          {saving ? "Saving…" : dirty ? "Save Banner Settings" : "No changes"}
        </button>
      </div>
    </div>
  );
}
