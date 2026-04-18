/**
 * StudioBlockForm
 * Create or edit a content block.
 * Supports: text, card, doc, image block types.
 * Mobile-first: large tap targets, clear labels, simple layout.
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
];

const SIZES = [
  { value: "large", label: "Large" },
  { value: "medium", label: "Medium" },
  { value: "small", label: "Small" },
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

export default function StudioBlockForm({ pageSlug, mode, block, onDone, onCancel, nextPosition }: Props) {
  // Determine initial block type
  const initialType: BlockType = block?.blockType ?? "text";

  // Parse existing content if editing
  const parseContent = () => {
    if (!block?.content) return {};
    try { return JSON.parse(block.content); } catch { return {}; }
  };
  const existing = parseContent();

  const [blockType, setBlockType] = useState<BlockType>(initialType);

  // Text block fields
  const [textHeading, setTextHeading] = useState(existing.heading ?? "");
  const [textBody, setTextBody] = useState(existing.body ?? "");
  const [textFont, setTextFont] = useState(existing.font ?? "dmsans");
  const [textSize, setTextSize] = useState(existing.size ?? "medium");

  // Card block fields
  // Support both 'title'/'description' (new format) and 'heading'/'body' (migration format)
  const [cardTitle, setCardTitle] = useState(existing.title ?? existing.heading ?? "");
  const [cardDesc, setCardDesc] = useState(existing.description ?? existing.body ?? "");
  const [cardImageUrl, setCardImageUrl] = useState(existing.imageUrl ?? "");
  const [cardLinkLabel, setCardLinkLabel] = useState(existing.linkLabel ?? "");
  const [cardLinkUrl, setCardLinkUrl] = useState(existing.linkUrl ?? "");
  const [cardFont, setCardFont] = useState(existing.font ?? "dmsans");
  const [cardSize, setCardSize] = useState(existing.size ?? "medium");

  // Doc block fields
  const [docLabel, setDocLabel] = useState(existing.label ?? "");
  const [docUrl, setDocUrl] = useState(existing.url ?? "");
  const [docDesc, setDocDesc] = useState(existing.description ?? "");

  // Image block fields
  const [imageUrl, setImageUrl] = useState(existing.url ?? "");
  const [imageAlt, setImageAlt] = useState(existing.alt ?? "");

  const createMutation = trpc.studio.createBlock.useMutation({
    onSuccess: () => { toast.success("Block created"); onDone(); },
    onError: (e) => toast.error(`Failed: ${e.message}`),
  });

  const updateMutation = trpc.studio.updateBlock.useMutation({
    onSuccess: () => { toast.success("Block saved"); onDone(); },
    onError: (e) => toast.error(`Failed: ${e.message}`),
  });

  const buildContent = (): string => {
    if (blockType === "text") return JSON.stringify({ heading: textHeading, body: textBody, font: textFont, size: textSize });
    if (blockType === "card") return JSON.stringify({ title: cardTitle, description: cardDesc, imageUrl: cardImageUrl, linkLabel: cardLinkLabel, linkUrl: cardLinkUrl, font: cardFont, size: cardSize });
    if (blockType === "doc") return JSON.stringify({ label: docLabel, url: docUrl, description: docDesc });
    if (blockType === "image") return JSON.stringify({ url: imageUrl, alt: imageAlt });
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
    { value: "text", label: "Text", desc: "Heading and/or body paragraph" },
    { value: "card", label: "Card", desc: "Photo + title + description + link" },
    { value: "doc", label: "Doc / Link", desc: "Reference to a document or web article" },
    { value: "image", label: "Image", desc: "A standalone photo" },
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
        {mode === "create" ? "Add New Block" : "Edit Block"}
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

      {/* TEXT BLOCK FIELDS */}
      {blockType === "text" && (
        <>
          <div style={fieldStyle}>
            <label style={labelStyle}>Heading (optional)</label>
            <input style={inputStyle} value={textHeading} onChange={(e) => setTextHeading(e.target.value)} placeholder="Leave blank for body-only block" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Body Text</label>
            <textarea style={{ ...inputStyle, minHeight: "120px", resize: "vertical" }} value={textBody} onChange={(e) => setTextBody(e.target.value)} placeholder="Write your content here…" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
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
          </div>
        </>
      )}

      {/* CARD BLOCK FIELDS */}
      {blockType === "card" && (
        <>
          <div style={fieldStyle}>
            <label style={labelStyle}>Title</label>
            <input style={inputStyle} value={cardTitle} onChange={(e) => setCardTitle(e.target.value)} placeholder="Card title" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Description</label>
            <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={cardDesc} onChange={(e) => setCardDesc(e.target.value)} placeholder="Short description…" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Photo URL (from Media Library)</label>
            <input style={inputStyle} value={cardImageUrl} onChange={(e) => setCardImageUrl(e.target.value)} placeholder="Paste CDN URL from Media Library" />
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

      {/* DOC BLOCK FIELDS */}
      {blockType === "doc" && (
        <>
          <div style={fieldStyle}>
            <label style={labelStyle}>Label</label>
            <input style={inputStyle} value={docLabel} onChange={(e) => setDocLabel(e.target.value)} placeholder="e.g. Field Paper FR-2026-08" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>URL (doc from library or web article)</label>
            <input style={inputStyle} value={docUrl} onChange={(e) => setDocUrl(e.target.value)} placeholder="Paste URL from Media Library or any web address" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Description (optional)</label>
            <textarea style={{ ...inputStyle, minHeight: "60px", resize: "vertical" }} value={docDesc} onChange={(e) => setDocDesc(e.target.value)} placeholder="Brief note about this document…" />
          </div>
        </>
      )}

      {/* IMAGE BLOCK FIELDS */}
      {blockType === "image" && (
        <>
          <div style={fieldStyle}>
            <label style={labelStyle}>Image URL (from Media Library)</label>
            <input style={inputStyle} value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Paste CDN URL from Media Library" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Alt Text (description for accessibility)</label>
            <input style={inputStyle} value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} placeholder="Describe the image briefly" />
          </div>
        </>
      )}

      {/* Action buttons */}
      <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
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
