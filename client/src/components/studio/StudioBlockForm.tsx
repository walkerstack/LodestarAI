/*
 * StudioBlockForm
 * Create or edit a content block — full ownership of every field.
 *
 * EDIT MODE layout (side-by-side on desktop, stacked on mobile):
 *   Zone 1 — Live mirror: the block exactly as it appears on the site right now (read-only)
 *   Zone 2 — Edit preview: same block, tap any element to edit it, updates live as you type
 *   Zone 3 — Form fields: full form below as fallback (always available)
 *
 * CREATE MODE: form fields only (no preview — nothing exists yet)
 *
 * Ghost code: Build 2A — April 19, 2026
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

type BlockType = "text" | "card" | "doc" | "image";

type Block = {
  id: number;
  pageSlug: string;
  blockType: BlockType;
  position: number;
  content: string;
  isMirror: boolean;
  mirrorSourceId: number | null;
};

interface Props {
  pageSlug: string;
  mode: "create" | "edit";
  block?: Block;
  onDone: () => void;
  onCancel: () => void;
  nextPosition: number;
}

const FONTS = [
  { value: "playfair", label: "Playfair Display — headings, formal" },
  { value: "dmsans", label: "DM Sans — body text, clean" },
  { value: "mono", label: "Monospace — code, technical" },
];

const SIZES = [
  { value: "xlarge", label: "X-Large" },
  { value: "large", label: "Large" },
  { value: "medium", label: "Medium" },
  { value: "small", label: "Small" },
];

const TEXT_ALIGN = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
];

// Site palette presets — full colour picker upgrade logged in todo.md for later
const PALETTE = [
  { hex: "#080604", label: "Site Black" },
  { hex: "#130f0a", label: "Deep Dark" },
  { hex: "#1a1208", label: "Dark Brown" },
  { hex: "#f0e8d8", label: "Cream" },
  { hex: "#c8b89a", label: "Warm Tan" },
  { hex: "#E8520A", label: "Gallantry Orange" },
  { hex: "#D4722A", label: "Amber" },
  { hex: "#C4923A", label: "Gold" },
  { hex: "#ffffff", label: "White" },
  { hex: "#000000", label: "Black" },
];

const BUTTON_SIZES = [
  { value: "sm", label: "Small", px: "0.4rem 0.9rem", fontSize: "0.75rem" },
  { value: "md", label: "Medium", px: "0.6rem 1.2rem", fontSize: "0.875rem" },
  { value: "lg", label: "Large", px: "0.85rem 1.75rem", fontSize: "1rem" },
];

const BUTTON_ICONS = [
  { value: "", label: "None" },
  { value: "→", label: "Arrow →" },
  { value: "↗", label: "Arrow ↗" },
  { value: "▶", label: "Play ▶" },
  { value: "★", label: "Star ★" },
  { value: "✦", label: "Diamond ✦" },
];

const BORDER_WIDTHS = [
  { value: "0", label: "None" },
  { value: "1", label: "Thin" },
  { value: "2", label: "Medium" },
  { value: "3", label: "Thick" },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#0d0b08",
  border: "1px solid #2a2218",
  borderRadius: "6px",
  color: "#e8ddd0",
  padding: "0.65rem 0.75rem",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "1rem",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.8rem",
  color: "#8a7a6a",
  display: "block",
  marginBottom: "0.35rem",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
};

const fieldStyle: React.CSSProperties = {
  marginBottom: "1rem",
};

const hintStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.72rem",
  color: "#5a4a3a",
  marginTop: "0.25rem",
};

const sectionHeadStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.7rem",
  color: "#E8520A",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  marginBottom: "0.75rem",
  marginTop: "1.25rem",
  paddingBottom: "0.35rem",
  borderBottom: "1px solid #1a1208",
};

// ── Palette swatch picker ────────────────────────────────────────────────────
function PalettePicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div style={fieldStyle}>
      <label style={labelStyle}>{label}</label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "0.5rem" }}>
        {PALETTE.map((p) => (
          <button
            key={p.hex}
            onClick={() => onChange(p.hex)}
            title={p.label}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "6px",
              background: p.hex,
              border: value === p.hex ? "2px solid #E8520A" : "1px solid #3a2a1a",
              cursor: "pointer",
              flexShrink: 0,
              transition: "transform 0.1s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1.15)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")}
          />
        ))}
      </div>
      <input
        style={inputStyle}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#hex or rgba(…)"
      />
    </div>
  );
}

// Legacy ColorPicker alias for text block (keeps full swatch set)
function ColorPicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const swatches = [
    "#080604", "#130f0a", "#1a1208", "#f0e8d8", "#c8b89a",
    "#E8520A", "#D4722A", "#C4923A", "#4a9eff", "#7ecb8f",
    "#c47eff", "#ff6b6b", "#ffffff", "#000000",
  ];
  return (
    <div style={fieldStyle}>
      <label style={labelStyle}>{label}</label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "0.5rem" }}>
        {swatches.map((s) => (
          <button
            key={s}
            onClick={() => onChange(s)}
            title={s}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "4px",
              background: s,
              border: value === s ? "2px solid #E8520A" : "1px solid #2a2218",
              cursor: "pointer",
              flexShrink: 0,
            }}
          />
        ))}
      </div>
      <input style={inputStyle} value={value} onChange={(e) => onChange(e.target.value)} placeholder="#hex or rgba(…)" />
    </div>
  );
}

// Image picker — paste URL or pick from Media Library
function ImagePicker({ label, value, onChange, hint }: { label: string; value: string; onChange: (v: string) => void; hint?: string }) {
  const { data: media } = trpc.studio.getMedia.useQuery();
  type MediaItem = { id: number; url: string; filename: string; mediaType: string };
  return (
    <div style={fieldStyle}>
      <label style={labelStyle}>{label}</label>
      <input style={inputStyle} value={value} onChange={(e) => onChange(e.target.value)} placeholder="Paste image URL or pick from library below" />
      {hint && <p style={hintStyle}>{hint}</p>}
      {value && (
        <img src={value} alt="preview" style={{ marginTop: "0.5rem", maxHeight: "120px", borderRadius: "6px", border: "1px solid #2a2218", objectFit: "cover" }}
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")} />
      )}
      {media && media.length > 0 && (
        <>
          <p style={{ ...hintStyle, marginTop: "0.5rem" }}>Or pick from your Media Library:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.35rem", maxHeight: "140px", overflowY: "auto" }}>
            {media.map((m: MediaItem) => (
              <button key={m.id} onClick={() => onChange(m.url)} title={m.filename}
                style={{ padding: 0, border: value === m.url ? "2px solid #E8520A" : "1px solid #2a2218", borderRadius: "4px", cursor: "pointer", background: "transparent", overflow: "hidden", flexShrink: 0 }}>
                <img src={m.url} alt={m.filename} style={{ width: "56px", height: "56px", objectFit: "cover", display: "block" }}
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")} />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── Card Live Preview ────────────────────────────────────────────────────────
// Renders the card exactly as it appears on the live site.
// Used for both Zone 1 (frozen) and Zone 2 (live-updating).
interface CardPreviewProps {
  title: string;
  desc: string;
  imageUrl: string;
  linkLabel: string;
  linkUrl: string;
  font: string;
  size: string;
  bgColor: string;
  titleColor: string;
  descColor: string;
  accentColor: string;
  borderColor: string;
  borderWidth: string;
  btnSize: string;
  btnIcon: string;
  pageBg: "dark" | "light";
  interactive?: boolean;
  activeField?: string | null;
  onTap?: (field: string) => void;
}

function CardPreview({
  title, desc, imageUrl, linkLabel, linkUrl,
  font, size, bgColor, titleColor, descColor, accentColor,
  borderColor, borderWidth, btnSize, btnIcon,
  pageBg, interactive = false, activeField, onTap,
}: CardPreviewProps) {
  const fontClass = font === "playfair" ? "'Playfair Display', serif" : "'DM Sans', sans-serif";
  const sizeMap: Record<string, { heading: string; body: string }> = {
    xlarge: { heading: "1.5rem", body: "1.1rem" },
    large: { heading: "1.25rem", body: "1rem" },
    medium: { heading: "1.05rem", body: "0.9rem" },
    small: { heading: "0.9rem", body: "0.8rem" },
  };
  const sz = sizeMap[size] || sizeMap.medium;
  const bw = parseInt(borderWidth || "0");

  const btnSizeMap = BUTTON_SIZES.find((b) => b.value === btnSize) || BUTTON_SIZES[1];

  const tapStyle = (field: string): React.CSSProperties =>
    interactive
      ? {
          cursor: "pointer",
          outline: activeField === field ? "2px solid #E8520A" : "1px dashed #3a2a1a44",
          outlineOffset: "2px",
          borderRadius: "3px",
          transition: "outline 0.15s",
        }
      : {};

  return (
    <div
      style={{
        padding: "1rem",
        background: pageBg === "dark" ? "#080604" : "#f0e8d8",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          border: bw > 0 ? `${bw}px solid ${borderColor}` : "1px solid #2a2218",
          background: bgColor || "#130f0a",
          fontFamily: fontClass,
        }}
      >
        {imageUrl && (
          <div style={{ ...tapStyle("imageUrl"), position: "relative" }} onClick={() => onTap?.("imageUrl")}>
            <img src={imageUrl} alt={title} style={{ width: "100%", height: "160px", objectFit: "cover", display: "block" }}
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")} />
            {interactive && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(0,0,0,0.35)", opacity: 0, transition: "opacity 0.15s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = "1")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = "0")}>
                <span style={{ color: "#fff", fontSize: "0.75rem", fontFamily: "'DM Sans', sans-serif" }}>Tap to change photo</span>
              </div>
            )}
          </div>
        )}
        {!imageUrl && interactive && (
          <div onClick={() => onTap?.("imageUrl")}
            style={{ width: "100%", height: "80px", background: "#1a1208", display: "flex", alignItems: "center",
              justifyContent: "center", cursor: "pointer", borderBottom: "1px solid #2a2218" }}>
            <span style={{ color: "#5a4a3a", fontSize: "0.75rem", fontFamily: "'DM Sans', sans-serif" }}>+ Add photo</span>
          </div>
        )}
        <div style={{ padding: "1.25rem" }}>
          <div style={{ ...tapStyle("title"), marginBottom: "0.5rem" }} onClick={() => onTap?.("title")}>
            <h3 style={{ margin: 0, fontSize: sz.heading, fontWeight: 700, color: titleColor, fontFamily: fontClass }}>
              {title || (interactive ? <span style={{ color: "#3a2a1a", fontStyle: "italic" }}>Tap to add title</span> : "")}
            </h3>
          </div>
          <div style={{ ...tapStyle("desc"), marginBottom: "0.75rem" }} onClick={() => onTap?.("desc")}>
            <p style={{ margin: 0, fontSize: sz.body, color: descColor, lineHeight: 1.5, fontFamily: fontClass }}>
              {desc || (interactive ? <span style={{ color: "#3a2a1a", fontStyle: "italic" }}>Tap to add description</span> : "")}
            </p>
          </div>
          {(linkLabel || interactive) && (
            <div style={{ ...tapStyle("btn"), display: "inline-block" }} onClick={() => onTap?.("btn")}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "0.35rem",
                padding: btnSizeMap.px, borderRadius: "8px", fontSize: btnSizeMap.fontSize,
                fontWeight: 600, background: accentColor, color: "#fff",
                fontFamily: "'DM Sans', sans-serif", cursor: interactive ? "pointer" : "default",
              }}>
                {linkLabel || (interactive ? "Button label" : "")}
                {btnIcon && <span>{btnIcon}</span>}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Tap-to-edit inline input box ─────────────────────────────────────────────
function InlineEditor({
  field, activeField, label, value, onChange, multiline = false,
}: {
  field: string; activeField: string | null; label: string;
  value: string; onChange: (v: string) => void; multiline?: boolean;
}) {
  if (activeField !== field) return null;
  return (
    <div style={{ background: "#1a1208", border: "1px solid #E8520A44", borderRadius: "8px", padding: "0.75rem", marginTop: "0.5rem" }}>
      <label style={{ ...labelStyle, color: "#E8520A" }}>{label}</label>
      {multiline ? (
        <textarea autoFocus style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={value}
          onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input autoFocus style={inputStyle} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function StudioBlockForm({ pageSlug, mode, block, onDone, onCancel, nextPosition }: Props) {
  const initialType: BlockType = block?.blockType ?? "text";

  const parseContent = () => {
    if (!block?.content) return {};
    try { return JSON.parse(block.content); } catch { return {}; }
  };
  const existing = parseContent();

  const [blockType, setBlockType] = useState<BlockType>(initialType);

  // ── TEXT fields ──────────────────────────────────────────────────────────
  const [textHeading, setTextHeading] = useState(existing.heading ?? "");
  const [textBody, setTextBody] = useState(existing.body ?? "");
  const [textFont, setTextFont] = useState(existing.font ?? "dmsans");
  const [textSize, setTextSize] = useState(existing.size ?? "medium");
  const [textAlign, setTextAlign] = useState(existing.align ?? "left");
  const [textHeadingColor, setTextHeadingColor] = useState(existing.headingColor ?? "#f0e8d8");
  const [textBodyColor, setTextBodyColor] = useState(existing.bodyColor ?? "#c8b89a");
  const [textBg, setTextBg] = useState(existing.bg ?? "");

  // ── CARD fields ──────────────────────────────────────────────────────────
  const [cardTitle, setCardTitle] = useState(existing.title ?? existing.heading ?? "");
  const [cardDesc, setCardDesc] = useState(existing.description ?? existing.body ?? "");
  const [cardImageUrl, setCardImageUrl] = useState(existing.imageUrl ?? "");
  const [cardLinkLabel, setCardLinkLabel] = useState(existing.linkLabel ?? "");
  const [cardLinkUrl, setCardLinkUrl] = useState(existing.linkUrl ?? "");
  const [cardFont, setCardFont] = useState(existing.font ?? "dmsans");
  const [cardSize, setCardSize] = useState(existing.size ?? "medium");
  const [cardBgColor, setCardBgColor] = useState(existing.bgColor ?? "#130f0a");
  const [cardBgImage, setCardBgImage] = useState(existing.bgImage ?? "");
  const [cardTitleColor, setCardTitleColor] = useState(existing.titleColor ?? "#f0e8d8");
  const [cardDescColor, setCardDescColor] = useState(existing.descColor ?? "#c8b89a");
  const [cardAccentColor, setCardAccentColor] = useState(existing.accentColor ?? "#E8520A");
  // New card controls — Build 2A
  const [cardBorderColor, setCardBorderColor] = useState(existing.borderColor ?? "#2a2218");
  const [cardBorderWidth, setCardBorderWidth] = useState(existing.borderWidth ?? "1");
  const [cardBtnSize, setCardBtnSize] = useState(existing.btnSize ?? "md");
  const [cardBtnIcon, setCardBtnIcon] = useState(existing.btnIcon ?? "→");

  // ── DOC fields ───────────────────────────────────────────────────────────
  const [docLabel, setDocLabel] = useState(existing.label ?? "");
  const [docUrl, setDocUrl] = useState(existing.url ?? "");
  const [docDesc, setDocDesc] = useState(existing.description ?? "");
  const [docIcon, setDocIcon] = useState(existing.icon ?? "📄");

  // ── IMAGE fields ─────────────────────────────────────────────────────────
  const [imageUrl, setImageUrl] = useState(existing.url ?? "");
  const [imageAlt, setImageAlt] = useState(existing.alt ?? "");
  const [imageCaption, setImageCaption] = useState(existing.caption ?? "");
  const [imageWidth, setImageWidth] = useState(existing.width ?? "full");

  // ── Preview state ─────────────────────────────────────────────────────────
  const [pageBg, setPageBg] = useState<"dark" | "light">("dark");
  const [activeField, setActiveField] = useState<string | null>(null);

  // ── Mutations ────────────────────────────────────────────────────────────
  const createMutation = trpc.studio.createBlock.useMutation({
    onSuccess: () => { toast.success("Block created"); onDone(); },
    onError: (e) => toast.error(`Failed: ${e.message}`),
  });

  const updateMutation = trpc.studio.updateBlock.useMutation({
    onSuccess: () => { toast.success("Block saved"); onDone(); },
    onError: (e) => toast.error(`Failed: ${e.message}`),
  });

  const buildContent = (): string => {
    if (blockType === "text") return JSON.stringify({
      heading: textHeading, body: textBody, font: textFont, size: textSize,
      align: textAlign, headingColor: textHeadingColor, bodyColor: textBodyColor, bg: textBg,
    });
    if (blockType === "card") return JSON.stringify({
      title: cardTitle, description: cardDesc, imageUrl: cardImageUrl,
      linkLabel: cardLinkLabel, linkUrl: cardLinkUrl, font: cardFont, size: cardSize,
      bgColor: cardBgColor, bgImage: cardBgImage,
      titleColor: cardTitleColor, descColor: cardDescColor, accentColor: cardAccentColor,
      borderColor: cardBorderColor, borderWidth: cardBorderWidth,
      btnSize: cardBtnSize, btnIcon: cardBtnIcon,
    });
    if (blockType === "doc") return JSON.stringify({ label: docLabel, url: docUrl, description: docDesc, icon: docIcon });
    if (blockType === "image") return JSON.stringify({ url: imageUrl, alt: imageAlt, caption: imageCaption, width: imageWidth });
    return "{}";
  };

  const handleSave = () => {
    const content = buildContent();
    if (mode === "create") {
      createMutation.mutate({ pageSlug, blockType, position: nextPosition, content });
    } else if (block) {
      updateMutation.mutate({ id: block.id, content });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  const blockTypes: { value: BlockType; label: string; desc: string }[] = [
    { value: "text", label: "Text", desc: "Heading + body paragraph" },
    { value: "card", label: "Card", desc: "Photo + title + description + link" },
    { value: "doc", label: "Doc / Link", desc: "Document or web article reference" },
    { value: "image", label: "Image", desc: "Standalone photo" },
  ];

  // ── Card preview props (shared between Zone 1 and Zone 2) ────────────────
  const cardPreviewProps = {
    title: cardTitle, desc: cardDesc, imageUrl: cardImageUrl,
    linkLabel: cardLinkLabel, linkUrl: cardLinkUrl, font: cardFont, size: cardSize,
    bgColor: cardBgColor, titleColor: cardTitleColor, descColor: cardDescColor,
    accentColor: cardAccentColor, borderColor: cardBorderColor, borderWidth: cardBorderWidth,
    btnSize: cardBtnSize, btnIcon: cardBtnIcon, pageBg,
  };

  // ── Zone 1 — frozen live mirror (uses original saved values) ─────────────
  const frozenProps = mode === "edit" && block ? (() => {
    const orig = parseContent();
    return {
      title: orig.title ?? orig.heading ?? "",
      desc: orig.description ?? orig.body ?? "",
      imageUrl: orig.imageUrl ?? "",
      linkLabel: orig.linkLabel ?? "",
      linkUrl: orig.linkUrl ?? "",
      font: orig.font ?? "dmsans",
      size: orig.size ?? "medium",
      bgColor: orig.bgColor ?? "#130f0a",
      titleColor: orig.titleColor ?? "#f0e8d8",
      descColor: orig.descColor ?? "#c8b89a",
      accentColor: orig.accentColor ?? "#E8520A",
      borderColor: orig.borderColor ?? "#2a2218",
      borderWidth: orig.borderWidth ?? "1",
      btnSize: orig.btnSize ?? "md",
      btnIcon: orig.btnIcon ?? "→",
      pageBg,
    };
  })() : null;

  const showPreviewZones = mode === "edit" && blockType === "card";

  return (
    <div
      style={{
        background: "#130f0a",
        border: "1px solid #E8520A44",
        borderRadius: "10px",
        padding: "1.5rem",
        marginTop: "1rem",
      }}
    >
      <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#f0e8d8", fontSize: "1.1rem", marginBottom: "1.25rem" }}>
        {mode === "create" ? "Add New Block" : `Edit ${blockType.charAt(0).toUpperCase() + blockType.slice(1)} Block`}
      </h3>

      {/* Block type selector — only shown when creating */}
      {mode === "create" && (
        <div style={fieldStyle}>
          <label style={labelStyle}>Block Type</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
            {blockTypes.map((bt) => (
              <button
                key={bt.value}
                onClick={() => setBlockType(bt.value)}
                style={{
                  background: blockType === bt.value ? "#221508" : "#0d0b08",
                  border: `1px solid ${blockType === bt.value ? "#E8520A" : "#2a2218"}`,
                  borderRadius: "6px",
                  padding: "0.65rem 0.75rem",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: blockType === bt.value ? "#E8520A" : "#c8b89a", fontWeight: 600 }}>
                  {bt.label}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#5a4a3a", marginTop: "0.15rem" }}>
                  {bt.desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── PREVIEW ZONES (card edit mode only) ── */}
      {showPreviewZones && (
        <div style={{ marginBottom: "1.5rem" }}>
          {/* Page background toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#8a7a6a", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Preview on:
            </span>
            {(["dark", "light"] as const).map((bg) => (
              <button
                key={bg}
                onClick={() => setPageBg(bg)}
                style={{
                  background: pageBg === bg ? "#221508" : "transparent",
                  border: `1px solid ${pageBg === bg ? "#E8520A" : "#2a2218"}`,
                  borderRadius: "6px",
                  color: pageBg === bg ? "#E8520A" : "#8a7a6a",
                  padding: "0.25rem 0.75rem",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8rem",
                  textTransform: "capitalize",
                }}
              >
                {bg} page
              </button>
            ))}
          </div>

          {/* Side-by-side on desktop, stacked on mobile */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1rem",
          }}>
            {/* Zone 1 — Live mirror (frozen) */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#7ecb8f" }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "#7ecb8f", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Current — live on site
                </span>
              </div>
              {frozenProps && <CardPreview {...frozenProps} interactive={false} />}
            </div>

            {/* Zone 2 — Edit preview (live-updating) */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E8520A" }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "#E8520A", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  After save
                </span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "#5a4a3a", marginLeft: "auto" }}>
                  Tap anything to edit it
                </span>
              </div>
              <CardPreview
                {...cardPreviewProps}
                interactive={true}
                activeField={activeField}
                onTap={(field) => setActiveField(activeField === field ? null : field)}
              />

              {/* Inline editors — appear below the element you tapped */}
              <div style={{ marginTop: "0.5rem" }}>
                <InlineEditor field="title" activeField={activeField} label="Title" value={cardTitle} onChange={setCardTitle} />
                <InlineEditor field="desc" activeField={activeField} label="Description" value={cardDesc} onChange={setCardDesc} multiline />
                {activeField === "imageUrl" && (
                  <div style={{ background: "#1a1208", border: "1px solid #E8520A44", borderRadius: "8px", padding: "0.75rem", marginTop: "0.5rem" }}>
                    <ImagePicker label="Card Photo" value={cardImageUrl} onChange={setCardImageUrl} hint="Pick from your Media Library or paste any image URL." />
                  </div>
                )}
                {activeField === "btn" && (
                  <div style={{ background: "#1a1208", border: "1px solid #E8520A44", borderRadius: "8px", padding: "0.75rem", marginTop: "0.5rem" }}>
                    <label style={labelStyle}>Button Label</label>
                    <input style={{ ...inputStyle, marginBottom: "0.75rem" }} value={cardLinkLabel} onChange={(e) => setCardLinkLabel(e.target.value)} placeholder="e.g. Read more" />
                    <label style={labelStyle}>Button Link</label>
                    <input style={{ ...inputStyle, marginBottom: "0.75rem" }} value={cardLinkUrl} onChange={(e) => setCardLinkUrl(e.target.value)} placeholder="/page-path or https://…" />
                    <label style={labelStyle}>Button Size</label>
                    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
                      {BUTTON_SIZES.map((bs) => (
                        <button key={bs.value} onClick={() => setCardBtnSize(bs.value)}
                          style={{ flex: 1, background: cardBtnSize === bs.value ? "#221508" : "transparent", border: `1px solid ${cardBtnSize === bs.value ? "#E8520A" : "#2a2218"}`, borderRadius: "6px", color: cardBtnSize === bs.value ? "#E8520A" : "#8a7a6a", padding: "0.35rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem" }}>
                          {bs.label}
                        </button>
                      ))}
                    </div>
                    <label style={labelStyle}>Button Colour</label>
                    <PalettePicker label="" value={cardAccentColor} onChange={setCardAccentColor} />
                    <label style={labelStyle}>Button Icon</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {BUTTON_ICONS.map((ic) => (
                        <button key={ic.value} onClick={() => setCardBtnIcon(ic.value)}
                          style={{ background: cardBtnIcon === ic.value ? "#221508" : "transparent", border: `1px solid ${cardBtnIcon === ic.value ? "#E8520A" : "#2a2218"}`, borderRadius: "6px", color: cardBtnIcon === ic.value ? "#E8520A" : "#c8b89a", padding: "0.35rem 0.6rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem" }}>
                          {ic.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card size visual samples */}
          <div style={{ marginTop: "1rem" }}>
            <label style={labelStyle}>Card Size</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {SIZES.map((s) => (
                <button key={s.value} onClick={() => setCardSize(s.value)}
                  style={{
                    flex: 1, background: cardSize === s.value ? "#221508" : "transparent",
                    border: `1px solid ${cardSize === s.value ? "#E8520A" : "#2a2218"}`,
                    borderRadius: "8px", color: cardSize === s.value ? "#E8520A" : "#8a7a6a",
                    padding: "0.5rem 0.25rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8rem", textAlign: "center",
                  }}>
                  <div style={{ fontWeight: 600 }}>{s.label}</div>
                  <div style={{ fontSize: "0.65rem", marginTop: "0.2rem", color: "#5a4a3a" }}>
                    {s.value === "xlarge" ? "Very large text" : s.value === "large" ? "Large text" : s.value === "medium" ? "Standard" : "Compact"}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Border controls */}
          <div style={{ marginTop: "1rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div>
              <label style={labelStyle}>Border Thickness</label>
              <div style={{ display: "flex", gap: "0.4rem" }}>
                {BORDER_WIDTHS.map((bw) => (
                  <button key={bw.value} onClick={() => setCardBorderWidth(bw.value)}
                    style={{ flex: 1, background: cardBorderWidth === bw.value ? "#221508" : "transparent", border: `1px solid ${cardBorderWidth === bw.value ? "#E8520A" : "#2a2218"}`, borderRadius: "6px", color: cardBorderWidth === bw.value ? "#E8520A" : "#8a7a6a", padding: "0.35rem 0.2rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem" }}>
                    {bw.label}
                  </button>
                ))}
              </div>
            </div>
            <PalettePicker label="Border Colour" value={cardBorderColor} onChange={setCardBorderColor} />
          </div>

          {/* Colour controls */}
          <div style={{ marginTop: "0.75rem" }}>
            <PalettePicker label="Card Background Colour" value={cardBgColor} onChange={setCardBgColor} />
            <PalettePicker label="Title Colour" value={cardTitleColor} onChange={setCardTitleColor} />
            <PalettePicker label="Description Colour" value={cardDescColor} onChange={setCardDescColor} />
          </div>

          {/* Divider */}
          <div style={{ borderTop: "1px solid #1a1208", marginTop: "1.25rem", paddingTop: "0.75rem" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "#3a2a1a", textAlign: "center" }}>
              Or edit fields directly below
            </p>
          </div>
        </div>
      )}

      {/* ── TEXT BLOCK ── */}
      {blockType === "text" && (
        <>
          <p style={sectionHeadStyle}>Content</p>
          <div style={fieldStyle}>
            <label style={labelStyle}>Heading (optional)</label>
            <input style={inputStyle} value={textHeading} onChange={(e) => setTextHeading(e.target.value)} placeholder="Leave blank for body-only block" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Body Text</label>
            <textarea style={{ ...inputStyle, minHeight: "120px", resize: "vertical" }} value={textBody} onChange={(e) => setTextBody(e.target.value)} placeholder="Write your content here…" />
          </div>
          <p style={sectionHeadStyle}>Style</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Font</label>
              <select style={inputStyle} value={textFont} onChange={(e) => setTextFont(e.target.value)}>
                {FONTS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
              </select>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Size</label>
              <select style={inputStyle} value={textSize} onChange={(e) => setTextSize(e.target.value)}>
                {SIZES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Align</label>
              <select style={inputStyle} value={textAlign} onChange={(e) => setTextAlign(e.target.value)}>
                {TEXT_ALIGN.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
              </select>
            </div>
          </div>
          <ColorPicker label="Heading Colour" value={textHeadingColor} onChange={setTextHeadingColor} />
          <ColorPicker label="Body Text Colour" value={textBodyColor} onChange={setTextBodyColor} />
          <div style={fieldStyle}>
            <label style={labelStyle}>Background Colour (optional)</label>
            <input style={inputStyle} value={textBg} onChange={(e) => setTextBg(e.target.value)} placeholder="Leave blank for transparent" />
          </div>
        </>
      )}

      {/* ── CARD BLOCK — form fields fallback ── */}
      {blockType === "card" && (
        <>
          <p style={sectionHeadStyle}>Content</p>
          <div style={fieldStyle}>
            <label style={labelStyle}>Title</label>
            <input style={inputStyle} value={cardTitle} onChange={(e) => setCardTitle(e.target.value)} placeholder="Card title" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Description</label>
            <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={cardDesc} onChange={(e) => setCardDesc(e.target.value)} placeholder="Short description…" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Link Label</label>
              <input style={inputStyle} value={cardLinkLabel} onChange={(e) => setCardLinkLabel(e.target.value)} placeholder="e.g. Read more" />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Link URL</label>
              <input style={inputStyle} value={cardLinkUrl} onChange={(e) => setCardLinkUrl(e.target.value)} placeholder="/page-path or https://…" />
            </div>
          </div>
          <p style={sectionHeadStyle}>Photo</p>
          <ImagePicker label="Card Photo" value={cardImageUrl} onChange={setCardImageUrl} hint="Pick from your Media Library or paste any image URL." />
          <p style={sectionHeadStyle}>Background</p>
          <PalettePicker label="Card Background Colour" value={cardBgColor} onChange={setCardBgColor} />
          <ImagePicker label="Card Background Image (optional)" value={cardBgImage} onChange={setCardBgImage} hint="Overlays on top of the background colour." />
          <p style={sectionHeadStyle}>Colours</p>
          <PalettePicker label="Title Colour" value={cardTitleColor} onChange={setCardTitleColor} />
          <PalettePicker label="Description Colour" value={cardDescColor} onChange={setCardDescColor} />
          <PalettePicker label="Accent / Button Colour" value={cardAccentColor} onChange={setCardAccentColor} />
          <p style={sectionHeadStyle}>Border</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Border Thickness</label>
              <select style={inputStyle} value={cardBorderWidth} onChange={(e) => setCardBorderWidth(e.target.value)}>
                {BORDER_WIDTHS.map((bw) => <option key={bw.value} value={bw.value}>{bw.label}</option>)}
              </select>
            </div>
            <PalettePicker label="Border Colour" value={cardBorderColor} onChange={setCardBorderColor} />
          </div>
          <p style={sectionHeadStyle}>Button</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Button Size</label>
              <select style={inputStyle} value={cardBtnSize} onChange={(e) => setCardBtnSize(e.target.value)}>
                {BUTTON_SIZES.map((bs) => <option key={bs.value} value={bs.value}>{bs.label}</option>)}
              </select>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Button Icon</label>
              <select style={inputStyle} value={cardBtnIcon} onChange={(e) => setCardBtnIcon(e.target.value)}>
                {BUTTON_ICONS.map((ic) => <option key={ic.value} value={ic.value}>{ic.label}</option>)}
              </select>
            </div>
          </div>
          <p style={sectionHeadStyle}>Typography</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Font</label>
              <select style={inputStyle} value={cardFont} onChange={(e) => setCardFont(e.target.value)}>
                {FONTS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
              </select>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Size</label>
              <select style={inputStyle} value={cardSize} onChange={(e) => setCardSize(e.target.value)}>
                {SIZES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>
        </>
      )}

      {/* ── DOC BLOCK ── */}
      {blockType === "doc" && (
        <>
          <p style={sectionHeadStyle}>Document Details</p>
          <div style={fieldStyle}>
            <label style={labelStyle}>Label / Title</label>
            <input style={inputStyle} value={docLabel} onChange={(e) => setDocLabel(e.target.value)} placeholder="e.g. Field Paper FR-2026-08" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>URL</label>
            <input style={inputStyle} value={docUrl} onChange={(e) => setDocUrl(e.target.value)} placeholder="Paste URL from Media Library or any web address" />
            <p style={hintStyle}>Can be a PDF from your Media Library, a Google Doc, or any web article.</p>
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Description (optional)</label>
            <textarea style={{ ...inputStyle, minHeight: "60px", resize: "vertical" }} value={docDesc} onChange={(e) => setDocDesc(e.target.value)} placeholder="Brief note about this document…" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Icon (emoji)</label>
            <input style={{ ...inputStyle, maxWidth: "80px" }} value={docIcon} onChange={(e) => setDocIcon(e.target.value)} placeholder="📄" />
            <p style={hintStyle}>Any emoji works: 📄 📋 🔗 📰 📖 🎓</p>
          </div>
        </>
      )}

      {/* ── IMAGE BLOCK ── */}
      {blockType === "image" && (
        <>
          <p style={sectionHeadStyle}>Photo</p>
          <ImagePicker label="Image" value={imageUrl} onChange={setImageUrl} hint="Pick from your Media Library or paste any image URL." />
          <div style={fieldStyle}>
            <label style={labelStyle}>Alt Text (required for accessibility)</label>
            <input style={inputStyle} value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} placeholder="Describe the image briefly" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Caption (optional)</label>
            <input style={inputStyle} value={imageCaption} onChange={(e) => setImageCaption(e.target.value)} placeholder="Short caption shown below the image" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Width</label>
            <select style={inputStyle} value={imageWidth} onChange={(e) => setImageWidth(e.target.value)}>
              <option value="full">Full width</option>
              <option value="wide">Wide (80%)</option>
              <option value="medium">Medium (60%)</option>
              <option value="small">Small (40%)</option>
            </select>
          </div>
        </>
      )}

      {/* Action buttons */}
      <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem" }}>
        <button onClick={onCancel}
          style={{ flex: 1, background: "transparent", border: "1px solid #2a2218", borderRadius: "8px", color: "#8a7a6a", padding: "0.75rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "1rem" }}>
          Cancel
        </button>
        <button onClick={handleSave} disabled={isPending}
          style={{ flex: 2, background: "#E8520A", border: "none", borderRadius: "8px", color: "#fff", padding: "0.75rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", fontWeight: 600, opacity: isPending ? 0.7 : 1 }}>
          {isPending ? "Saving…" : mode === "create" ? "Add Block" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
