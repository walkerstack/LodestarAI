/**
 * StudioBlockForm
 * Create or edit a content block — full ownership of every field.
 * Supports: text, card, doc, image block types.
 * Every property editable: text, heading, photo, link, card color, background image, font, size.
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

// Colour swatch picker — quick palette + custom hex input
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
      <input
        style={inputStyle}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#hex or rgba(…)"
      />
    </div>
  );
}

// Image picker — paste URL or pick from Media Library
function ImagePicker({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  const { data: media } = trpc.studio.getMedia.useQuery();
  type MediaItem = { id: number; url: string; filename: string; mediaType: string };

  return (
    <div style={fieldStyle}>
      <label style={labelStyle}>{label}</label>
      <input
        style={inputStyle}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste image URL or pick from library below"
      />
      {hint && <p style={hintStyle}>{hint}</p>}
      {value && (
        <img
          src={value}
          alt="preview"
          style={{ marginTop: "0.5rem", maxHeight: "120px", borderRadius: "6px", border: "1px solid #2a2218", objectFit: "cover" }}
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
        />
      )}
      {media && media.length > 0 && (
        <>
          <p style={{ ...hintStyle, marginTop: "0.5rem" }}>Or pick from your Media Library:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.35rem", maxHeight: "140px", overflowY: "auto" }}>
            {media.map((m: MediaItem) => (
              <button
                key={m.id}
                onClick={() => onChange(m.url)}
                title={m.filename}
                style={{
                  padding: 0,
                  border: value === m.url ? "2px solid #E8520A" : "1px solid #2a2218",
                  borderRadius: "4px",
                  cursor: "pointer",
                  background: "transparent",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <img
                  src={m.url}
                  alt={m.filename}
                  style={{ width: "56px", height: "56px", objectFit: "cover", display: "block" }}
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

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

      {/* ── CARD BLOCK ── */}
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
          <ImagePicker
            label="Card Photo"
            value={cardImageUrl}
            onChange={setCardImageUrl}
            hint="Pick from your Media Library or paste any image URL."
          />

          <p style={sectionHeadStyle}>Background</p>
          <ColorPicker label="Card Background Colour" value={cardBgColor} onChange={setCardBgColor} />
          <ImagePicker
            label="Card Background Image (optional)"
            value={cardBgImage}
            onChange={setCardBgImage}
            hint="Overlays on top of the background colour. Leave blank for solid colour only."
          />

          <p style={sectionHeadStyle}>Colours</p>
          <ColorPicker label="Title Colour" value={cardTitleColor} onChange={setCardTitleColor} />
          <ColorPicker label="Description Colour" value={cardDescColor} onChange={setCardDescColor} />
          <ColorPicker label="Accent / Link Colour" value={cardAccentColor} onChange={setCardAccentColor} />

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
          <ImagePicker
            label="Image"
            value={imageUrl}
            onChange={setImageUrl}
            hint="Pick from your Media Library or paste any image URL."
          />
          <div style={fieldStyle}>
            <label style={labelStyle}>Alt Text (required for accessibility)</label>
            <input style={inputStyle} value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} placeholder="Describe the image briefly — e.g. 'The sloth sits beside the buffalo'" />
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
        <button
          onClick={onCancel}
          style={{ flex: 1, background: "transparent", border: "1px solid #2a2218", borderRadius: "8px", color: "#8a7a6a", padding: "0.75rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "1rem" }}
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={isPending}
          style={{ flex: 2, background: "#E8520A", border: "none", borderRadius: "8px", color: "#fff", padding: "0.75rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", fontWeight: 600, opacity: isPending ? 0.7 : 1 }}
        >
          {isPending ? "Saving…" : mode === "create" ? "Add Block" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
