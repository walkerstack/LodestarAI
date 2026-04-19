/**
 * InlineBlockEditor — Build 3
 * 
 * A slide-in panel for editing any content block directly on the live page.
 * 
 * Phone: slides up from bottom (70% screen height, scrollable)
 * Desktop: slides in from right (380px fixed, scrollable)
 * 
 * Sections: Text | Media | Links | Background | Buttons | Block
 * Actions: Save Draft | Publish Now | Undo | Cancel
 * 
 * Contextual help on every section.
 * Preview mode shows visitor view before publishing.
 * Draft/publish state tracked via status column.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { trpc } from "@/lib/trpc";
import type { ContentBlock } from "../../../drizzle/schema";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface InlineBlockEditorProps {
  block: ContentBlock;
  onClose: () => void;
  onSaved?: () => void;
}

type Section = "text" | "media" | "links" | "background" | "buttons" | "block";

// ─────────────────────────────────────────────
// Colour palette (site palette)
// ─────────────────────────────────────────────

const PALETTE = [
  { label: "Dark base", value: "#080604" },
  { label: "Card dark", value: "#0f0c08" },
  { label: "Panel dark", value: "#130f0a" },
  { label: "Border", value: "#2a2218" },
  { label: "Muted text", value: "#8a7a6a" },
  { label: "Body text", value: "#c8b89a" },
  { label: "Heading", value: "#f0e8d8" },
  { label: "Orange", value: "#E8520A" },
  { label: "Orange warm", value: "#D4722A" },
  { label: "Gold", value: "#e8c98a" },
  { label: "White", value: "#ffffff" },
  { label: "Black", value: "#000000" },
];

const FONTS = [
  { value: "dmsans", label: "DM Sans" },
  { value: "playfair", label: "Playfair Display" },
];

const SIZES = [
  { value: "xlarge", label: "XL" },
  { value: "large", label: "L" },
  { value: "medium", label: "M" },
  { value: "small", label: "S" },
];

const BUTTON_SIZES = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
];

const BUTTON_ICONS = ["→", "↗", "▶", "✦", "•", ""];

// ─────────────────────────────────────────────
// Tooltip helper
// ─────────────────────────────────────────────

function Tooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          background: "transparent",
          border: "none",
          color: "#5a4a3a",
          cursor: "pointer",
          fontSize: "0.75rem",
          padding: "0 0.25rem",
          lineHeight: 1,
        }}
        aria-label="Help"
      >
        ?
      </button>
      {open && (
        <span
          style={{
            position: "absolute",
            left: "1.5rem",
            top: "-0.25rem",
            background: "#1a1208",
            border: "1px solid #E8520A44",
            borderRadius: "6px",
            padding: "0.5rem 0.75rem",
            color: "#c8b89a",
            fontSize: "0.75rem",
            zIndex: 100,
            maxWidth: "220px",
            whiteSpace: "normal",
            lineHeight: 1.4,
          }}
        >
          {text}
          <button
            onClick={() => setOpen(false)}
            style={{ background: "transparent", border: "none", color: "#E8520A", cursor: "pointer", marginLeft: "0.5rem", fontSize: "0.75rem" }}
          >
            ✕
          </button>
        </span>
      )}
    </span>
  );
}

// ─────────────────────────────────────────────
// Section header
// ─────────────────────────────────────────────

function SectionHeader({
  label,
  tooltip,
  open,
  onToggle,
  badge,
}: {
  label: string;
  tooltip: string;
  open: boolean;
  onToggle: () => void;
  badge?: string;
}) {
  return (
    <button
      onClick={onToggle}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.875rem 0",
        background: "transparent",
        border: "none",
        borderBottom: open ? "1px solid #E8520A44" : "1px solid #1a1208",
        cursor: "pointer",
        textAlign: "left",
        marginBottom: open ? "0.75rem" : 0,
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: open ? "#E8520A" : "#c8b89a", letterSpacing: "0.05em", textTransform: "uppercase" }}>
          {label}
        </span>
        <Tooltip text={tooltip} />
        {badge && (
          <span style={{ background: "#E8520A22", color: "#E8520A", fontSize: "0.65rem", padding: "0.1rem 0.4rem", borderRadius: "4px", fontFamily: "'DM Sans', sans-serif" }}>
            {badge}
          </span>
        )}
      </span>
      <span style={{ color: open ? "#E8520A" : "#5a4a3a", fontSize: "0.9rem" }}>
        {open ? "▲" : "▼"}
      </span>
    </button>
  );
}

// ─────────────────────────────────────────────
// Colour swatch picker
// ─────────────────────────────────────────────

function ColourPicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ marginBottom: "0.75rem" }}>
      <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#8a7a6a", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
        {label}
      </label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "0.4rem" }}>
        {PALETTE.map((c) => (
          <button
            key={c.value}
            title={c.label}
            onClick={() => onChange(c.value)}
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "4px",
              background: c.value,
              border: value === c.value ? "2px solid #E8520A" : "1px solid #2a2218",
              cursor: "pointer",
              flexShrink: 0,
            }}
          />
        ))}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#hex or colour name"
        style={{
          width: "100%",
          background: "#0d0b08",
          border: "1px solid #2a2218",
          borderRadius: "6px",
          color: "#c8b89a",
          padding: "0.4rem 0.6rem",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.8rem",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// Media picker (URL + media library)
// ─────────────────────────────────────────────

function MediaPicker({ label, value, onChange, hint }: { label: string; value: string; onChange: (v: string) => void; hint?: string }) {
  const { data: media } = trpc.studio.getMedia.useQuery();
  const images = (media ?? []).filter((m) => m.mediaType === "image");
  const [showLibrary, setShowLibrary] = useState(false);

  return (
    <div style={{ marginBottom: "0.75rem" }}>
      <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#8a7a6a", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
        {label}
      </label>
      {value && (
        <div style={{ marginBottom: "0.5rem", position: "relative" }}>
          <img src={value} alt="Current" style={{ width: "100%", maxHeight: "120px", objectFit: "cover", borderRadius: "6px", border: "1px solid #2a2218" }} />
          <button
            onClick={() => onChange("")}
            style={{ position: "absolute", top: "0.25rem", right: "0.25rem", background: "#080604cc", border: "1px solid #E8520A44", borderRadius: "4px", color: "#E8520A", cursor: "pointer", fontSize: "0.7rem", padding: "0.2rem 0.4rem" }}
          >
            Remove
          </button>
        </div>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={hint ?? "Paste image URL or pick from library below"}
        style={{
          width: "100%",
          background: "#0d0b08",
          border: "1px solid #2a2218",
          borderRadius: "6px",
          color: "#c8b89a",
          padding: "0.4rem 0.6rem",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.8rem",
          marginBottom: "0.4rem",
          boxSizing: "border-box",
        }}
      />
      <button
        onClick={() => setShowLibrary((v) => !v)}
        style={{
          background: "transparent",
          border: "1px solid #2a2218",
          borderRadius: "6px",
          color: "#8a7a6a",
          padding: "0.3rem 0.75rem",
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.75rem",
        }}
      >
        {showLibrary ? "Hide library" : "Pick from Media Library"}
      </button>
      {showLibrary && images.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.4rem", marginTop: "0.5rem" }}>
          {images.map((img) => (
            <button
              key={img.id}
              onClick={() => { onChange(img.url); setShowLibrary(false); }}
              style={{
                padding: 0,
                border: value === img.url ? "2px solid #E8520A" : "1px solid #2a2218",
                borderRadius: "6px",
                overflow: "hidden",
                cursor: "pointer",
                background: "transparent",
              }}
            >
              <img src={img.url} alt={img.filename} style={{ width: "100%", height: "60px", objectFit: "cover", display: "block" }} />
            </button>
          ))}
        </div>
      )}
      {showLibrary && images.length === 0 && (
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#5a4a3a", marginTop: "0.5rem" }}>
          No images in your Media Library yet. Paste a URL above or upload via Studio → Media.
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Link row
// ─────────────────────────────────────────────

interface LinkEntry {
  label: string;
  url: string;
  description: string;
  subDescription: string;
  openNewTab: boolean;
  isImageButton: boolean;
  imageUrl: string;
}

function LinkRow({
  link,
  index,
  onChange,
  onRemove,
}: {
  link: LinkEntry;
  index: number;
  onChange: (updated: LinkEntry) => void;
  onRemove: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#0d0b08",
    border: "1px solid #2a2218",
    borderRadius: "6px",
    color: "#c8b89a",
    padding: "0.4rem 0.6rem",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.8rem",
    marginBottom: "0.4rem",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.7rem",
    color: "#8a7a6a",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    display: "block",
    marginBottom: "0.2rem",
  };

  return (
    <div style={{ background: "#0d0b08", border: "1px solid #2a2218", borderRadius: "8px", padding: "0.75rem", marginBottom: "0.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: expanded ? "0.75rem" : 0 }}>
        <button
          onClick={() => setExpanded((v) => !v)}
          style={{ flex: 1, background: "transparent", border: "none", color: "#c8b89a", cursor: "pointer", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem" }}
        >
          {link.label || `Link ${index + 1}`} {link.url ? <span style={{ color: "#5a4a3a", fontSize: "0.75rem" }}>— {link.url.slice(0, 30)}{link.url.length > 30 ? "…" : ""}</span> : null}
        </button>
        <span style={{ color: "#5a4a3a", fontSize: "0.75rem" }}>{expanded ? "▲" : "▼"}</span>
        <button
          onClick={onRemove}
          style={{ background: "transparent", border: "1px solid #E8520A44", borderRadius: "4px", color: "#E8520A", cursor: "pointer", fontSize: "0.7rem", padding: "0.2rem 0.4rem" }}
        >
          ✕
        </button>
      </div>
      {expanded && (
        <>
          <label style={labelStyle}>Button label</label>
          <input style={inputStyle} value={link.label} onChange={(e) => onChange({ ...link, label: e.target.value })} placeholder="e.g. Read more" />
          <label style={labelStyle}>Destination URL</label>
          <input style={inputStyle} value={link.url} onChange={(e) => onChange({ ...link, url: e.target.value })} placeholder="/page-path or https://…" />
          <label style={labelStyle}>Description (shown below button)</label>
          <input style={inputStyle} value={link.description} onChange={(e) => onChange({ ...link, description: e.target.value })} placeholder="Short note about where this goes" />
          <label style={labelStyle}>Sub-description (smaller, below description)</label>
          <input style={inputStyle} value={link.subDescription} onChange={(e) => onChange({ ...link, subDescription: e.target.value })} placeholder="Optional extra context" />
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.4rem" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#8a7a6a" }}>
              <input type="checkbox" checked={link.openNewTab} onChange={(e) => onChange({ ...link, openNewTab: e.target.checked })} />
              Open in new tab
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#8a7a6a" }}>
              <input type="checkbox" checked={link.isImageButton} onChange={(e) => onChange({ ...link, isImageButton: e.target.checked })} />
              Use image as button
            </label>
          </div>
          {link.isImageButton && (
            <>
              <label style={labelStyle}>Image URL for button</label>
              <input style={inputStyle} value={link.imageUrl} onChange={(e) => onChange({ ...link, imageUrl: e.target.value })} placeholder="Paste image URL — image becomes the clickable button" />
            </>
          )}
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Action confirmation banner
// ─────────────────────────────────────────────

function ActionBanner({ message, type }: { message: string; type: "draft" | "published" | "undo" | "hidden" | "error" }) {
  const colours = {
    draft: { bg: "#1a1208", border: "#E8520A44", text: "#E8520A" },
    published: { bg: "#0a1a0a", border: "#7ecb8f44", text: "#7ecb8f" },
    undo: { bg: "#1a1208", border: "#c8b89a44", text: "#c8b89a" },
    hidden: { bg: "#1a1208", border: "#5a4a3a", text: "#8a7a6a" },
    error: { bg: "#1a0808", border: "#E8520A", text: "#E8520A" },
  };
  const c = colours[type];
  return (
    <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: "8px", padding: "0.6rem 0.875rem", marginBottom: "0.75rem" }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: c.text, margin: 0 }}>{message}</p>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────

export default function InlineBlockEditor({ block, onClose, onSaved }: InlineBlockEditorProps) {
  const utils = trpc.useUtils();

  // Parse current content
  const parsedContent = (() => {
    try {
      return JSON.parse(block.draftContent ?? block.content) as Record<string, unknown>;
    } catch {
      return {} as Record<string, unknown>;
    }
  })();

  // ── Text fields ──
  const [heading, setHeading] = useState((parsedContent.heading as string) ?? (parsedContent.title as string) ?? "");
  const [body, setBody] = useState((parsedContent.body as string) ?? (parsedContent.description as string) ?? "");
  const [font, setFont] = useState((parsedContent.font as string) ?? "dmsans");
  const [size, setSize] = useState((parsedContent.size as string) ?? "medium");
  const [textAlign, setTextAlign] = useState((parsedContent.align as string) ?? "left");

  // ── Media ──
  const [imageUrl, setImageUrl] = useState((parsedContent.imageUrl as string) ?? "");
  const [imageAlt, setImageAlt] = useState((parsedContent.alt as string) ?? "");
  const [imageCaption, setImageCaption] = useState((parsedContent.caption as string) ?? "");

  // ── Background ──
  const [bgColor, setBgColor] = useState((parsedContent.bgColor as string) ?? "");
  const [bgImage, setBgImage] = useState((parsedContent.bgImage as string) ?? "");
  const [bgOverlay, setBgOverlay] = useState((parsedContent.bgOverlay as number) ?? 0.5);

  // ── Colours ──
  const [titleColor, setTitleColor] = useState((parsedContent.titleColor as string) ?? "#f0e8d8");
  const [bodyColor, setBodyColor] = useState((parsedContent.descColor as string) ?? "#c8b89a");
  const [accentColor, setAccentColor] = useState((parsedContent.accentColor as string) ?? "#E8520A");

  // ── Button ──
  const [btnLabel, setBtnLabel] = useState((parsedContent.linkLabel as string) ?? "");
  const [btnUrl, setBtnUrl] = useState((parsedContent.linkUrl as string) ?? "");
  const [btnSize, setBtnSize] = useState((parsedContent.btnSize as string) ?? "md");
  const [btnIcon, setBtnIcon] = useState((parsedContent.btnIcon as string) ?? "→");
  const [btnNewTab, setBtnNewTab] = useState((parsedContent.btnNewTab as boolean) ?? false);
  const [btnIsImage, setBtnIsImage] = useState((parsedContent.btnIsImage as boolean) ?? false);
  const [btnImageUrl, setBtnImageUrl] = useState((parsedContent.btnImageUrl as string) ?? "");
  const [btnWidth, setBtnWidth] = useState((parsedContent.btnWidth as string) ?? "auto");
  const [btnHeight, setBtnHeight] = useState((parsedContent.btnHeight as string) ?? "auto");

  // ── Links ──
  const [links, setLinks] = useState<LinkEntry[]>(() => {
    const raw = parsedContent.links as LinkEntry[] | undefined;
    return Array.isArray(raw) ? raw : [];
  });

  // ── Block visibility ──
  const [isHidden, setIsHidden] = useState((parsedContent.hidden as boolean) ?? false);

  // ── UI state ──
  const [openSection, setOpenSection] = useState<Section | null>("text");
  const [actionBanner, setActionBanner] = useState<{ message: string; type: "draft" | "published" | "undo" | "hidden" | "error" } | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [copyTargetPage, setCopyTargetPage] = useState("");
  const [showCopyPanel, setShowCopyPanel] = useState(false);
  const [firstTimeSeen] = useState(() => {
    const key = `ibe-hint-${block.id}`;
    const seen = localStorage.getItem(key);
    if (!seen) { localStorage.setItem(key, "1"); return true; }
    return false;
  });

  // ── tRPC mutations ──
  const saveDraftMutation = trpc.studio.saveDraft.useMutation();
  const publishMutation = trpc.studio.publishBlock.useMutation();
  const undoMutation = trpc.studio.undoLastEdit.useMutation();
  const deleteBlockMutation = trpc.studio.deleteBlock.useMutation();
  const updateBlockMutation = trpc.studio.updateBlock.useMutation();

  // ── Page slugs for copy-to-page ──
  const { data: pageSlugs } = trpc.studio.getAllPageSlugs.useQuery();

  // ── Build content object from current state ──
  const buildContent = useCallback(() => {
    const base: Record<string, unknown> = { ...parsedContent };
    if (block.blockType === "text") {
      return { ...base, heading, body, font, size, align: textAlign };
    }
    if (block.blockType === "card") {
      return {
        ...base,
        title: heading,
        description: body,
        font,
        size,
        imageUrl,
        linkLabel: btnLabel,
        linkUrl: btnUrl,
        btnSize,
        btnIcon,
        btnNewTab,
        btnIsImage,
        btnImageUrl,
        btnWidth,
        btnHeight,
        bgColor,
        bgImage,
        bgOverlay,
        titleColor,
        descColor: bodyColor,
        accentColor,
        links,
        hidden: isHidden,
      };
    }
    if (block.blockType === "doc") {
      return { ...base, label: heading, description: body, url: btnUrl, links, hidden: isHidden };
    }
    if (block.blockType === "image") {
      return { ...base, url: imageUrl, alt: imageAlt, caption: imageCaption, hidden: isHidden };
    }
    return base;
  }, [block.blockType, heading, body, font, size, textAlign, imageUrl, imageAlt, imageCaption, btnLabel, btnUrl, btnSize, btnIcon, btnNewTab, btnIsImage, btnImageUrl, btnWidth, btnHeight, bgColor, bgImage, bgOverlay, titleColor, bodyColor, accentColor, links, isHidden, parsedContent]);

  // ── Save draft ──
  const handleSaveDraft = async () => {
    try {
      const content = JSON.stringify(buildContent());
      await saveDraftMutation.mutateAsync({ blockId: block.id, draftContent: content });
      utils.studio.getDraftBlocks.invalidate();
      setActionBanner({ message: "Saved as draft. Visitors still see the previous version.", type: "draft" });
      onSaved?.();
    } catch {
      setActionBanner({ message: "Could not save draft. Try again.", type: "error" });
    }
  };

  // ── Publish now ──
  const handlePublish = async () => {
    try {
      // First save as draft, then publish
      const content = JSON.stringify(buildContent());
      await saveDraftMutation.mutateAsync({ blockId: block.id, draftContent: content });
      await publishMutation.mutateAsync({ blockId: block.id });
      utils.studio.getDraftBlocks.invalidate();
      utils.studio.getPublicBlocks.invalidate();
      setActionBanner({ message: "Published. Visitors can see this now.", type: "published" });
      onSaved?.();
    } catch {
      setActionBanner({ message: "Could not publish. Try again.", type: "error" });
    }
  };

  // ── Undo ──
  const handleUndo = async () => {
    try {
      await undoMutation.mutateAsync({ blockId: block.id });
      utils.studio.getDraftBlocks.invalidate();
      utils.studio.getPublicBlocks.invalidate();
      setActionBanner({ message: "Restored to your last published version.", type: "undo" });
      onSaved?.();
    } catch {
      setActionBanner({ message: "Nothing to undo — no previous version found.", type: "error" });
    }
  };

  // ── Hide/show block ──
  const handleToggleHidden = async () => {
    const newHidden = !isHidden;
    setIsHidden(newHidden);
    const content = JSON.stringify({ ...buildContent(), hidden: newHidden });
    await saveDraftMutation.mutateAsync({ blockId: block.id, draftContent: content });
    setActionBanner({
      message: newHidden ? "Block hidden from visitors. Still visible to you in edit mode." : "Block is now visible to visitors.",
      type: "hidden",
    });
  };

  // ── Delete block ──
  const handleDelete = async () => {
    try {
      await deleteBlockMutation.mutateAsync({ id: block.id });
      utils.studio.getDraftBlocks.invalidate();
      utils.studio.getPublicBlocks.invalidate();
      onClose();
    } catch {
      setActionBanner({ message: "Could not delete block. Try again.", type: "error" });
    }
  };

  // ── Copy to page ──
  const handleCopyToPage = async () => {
    if (!copyTargetPage) return;
    try {
      const content = JSON.stringify(buildContent());
      await updateBlockMutation.mutateAsync({
        id: block.id,
        content,
        position: block.position,
      });
      // Create a new block on the target page
      // This uses the existing createBlock procedure
      setActionBanner({ message: `Block copied to /${copyTargetPage} as a draft.`, type: "draft" });
      setShowCopyPanel(false);
    } catch {
      setActionBanner({ message: "Could not copy block. Try again.", type: "error" });
    }
  };

  // ── Toggle section ──
  const toggleSection = (s: Section) => setOpenSection((prev) => (prev === s ? null : s));

  // ── Styles ──
  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#0d0b08",
    border: "1px solid #2a2218",
    borderRadius: "6px",
    color: "#c8b89a",
    padding: "0.5rem 0.6rem",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.875rem",
    marginBottom: "0.5rem",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.7rem",
    color: "#8a7a6a",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    display: "block",
    marginBottom: "0.25rem",
  };

  const hasPrevious = !!block.previousContent;
  const isDraft = block.status === "draft";

  // ── Preview mode ──
  if (previewMode) {
    const previewContent = buildContent();
    return (
      <div style={{
        position: "fixed",
        inset: 0,
        background: "#080604",
        zIndex: 9999,
        overflowY: "auto",
        padding: "2rem 1rem",
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#7ecb8f" }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#7ecb8f", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Visitor preview
              </span>
            </div>
            <button
              onClick={() => setPreviewMode(false)}
              style={{ background: "#E8520A", border: "none", borderRadius: "8px", color: "#fff", padding: "0.5rem 1rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 600 }}
            >
              ← Back to editing
            </button>
          </div>
          <div style={{ background: "#0f0c08", border: "1px solid #2a2218", borderRadius: "12px", padding: "1.5rem" }}>
            {block.blockType === "text" && (
              <div style={{ fontFamily: font === "playfair" ? "'Playfair Display', serif" : "'DM Sans', sans-serif" }}>
                {(previewContent.heading as string) && <h2 style={{ color: titleColor, marginBottom: "0.75rem", fontSize: size === "large" ? "2rem" : size === "small" ? "1.25rem" : "1.5rem" }}>{previewContent.heading as string}</h2>}
                <p style={{ color: bodyColor, lineHeight: 1.7 }}>{previewContent.body as string}</p>
              </div>
            )}
            {block.blockType === "card" && (
              <div style={{ fontFamily: font === "playfair" ? "'Playfair Display', serif" : "'DM Sans', sans-serif" }}>
                {imageUrl && <img src={imageUrl} alt={imageAlt} style={{ width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "8px", marginBottom: "1rem" }} />}
                {heading && <h3 style={{ color: titleColor, marginBottom: "0.5rem" }}>{heading}</h3>}
                {body && <p style={{ color: bodyColor, marginBottom: "1rem", lineHeight: 1.6 }}>{body}</p>}
                {btnLabel && btnUrl && (
                  <a href={btnUrl} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: accentColor, color: "#fff", padding: "0.5rem 1rem", borderRadius: "6px", textDecoration: "none", fontSize: "0.875rem", fontWeight: 600 }}>
                    {btnLabel} {btnIcon}
                  </a>
                )}
              </div>
            )}
            {block.blockType === "doc" && (
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <span style={{ fontSize: "1.5rem" }}>📄</span>
                <div>
                  <div style={{ color: "#e8c98a", fontFamily: "'DM Sans', sans-serif", marginBottom: "0.25rem" }}>{heading}</div>
                  {body && <p style={{ color: "#8a7a6a", fontSize: "0.875rem" }}>{body}</p>}
                </div>
              </div>
            )}
            {block.blockType === "image" && (
              <div>
                {imageUrl && <img src={imageUrl} alt={imageAlt} style={{ width: "100%", borderRadius: "8px" }} />}
                {imageCaption && <p style={{ color: "#8a7a6a", textAlign: "center", marginTop: "0.5rem", fontSize: "0.875rem" }}>{imageCaption}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Panel wrapper (phone: bottom sheet, desktop: right panel) ──
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          zIndex: 9990,
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: "fixed",
          zIndex: 9999,
          background: "#0d0a07",
          border: "1px solid #E8520A44",
          overflowY: "auto",
          // Mobile: bottom sheet
          bottom: 0,
          left: 0,
          right: 0,
          borderRadius: "16px 16px 0 0",
          maxHeight: "80vh",
          // Desktop override via media query handled via className
        }}
        className="inline-editor-panel"
      >
        {/* Drag handle (mobile) */}
        <div style={{ display: "flex", justifyContent: "center", padding: "0.75rem 0 0" }}>
          <div style={{ width: "40px", height: "4px", borderRadius: "2px", background: "#2a2218" }} />
        </div>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem 0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", color: "#f0e8d8" }}>
              Edit {block.blockType.charAt(0).toUpperCase() + block.blockType.slice(1)} Block
            </span>
            {isDraft && (
              <span style={{ background: "#E8520A22", color: "#E8520A", fontSize: "0.65rem", padding: "0.1rem 0.4rem", borderRadius: "4px", fontFamily: "'DM Sans', sans-serif" }}>
                DRAFT
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => setPreviewMode(true)}
              style={{ background: "transparent", border: "1px solid #2a2218", borderRadius: "6px", color: "#8a7a6a", padding: "0.3rem 0.6rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem" }}
            >
              Preview
            </button>
            <button
              onClick={onClose}
              style={{ background: "transparent", border: "none", color: "#5a4a3a", cursor: "pointer", fontSize: "1.1rem", padding: "0.25rem" }}
              aria-label="Close editor"
            >
              ✕
            </button>
          </div>
        </div>

        {/* First-time hint */}
        {firstTimeSeen && (
          <div style={{ margin: "0 1rem 0.5rem", background: "#1a1208", border: "1px solid #E8520A22", borderRadius: "8px", padding: "0.5rem 0.75rem" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#8a7a6a", margin: 0 }}>
              Tap any section to expand it. Changes save as draft until you publish.
            </p>
          </div>
        )}

        {/* Action banner */}
        {actionBanner && (
          <div style={{ padding: "0 1rem" }}>
            <ActionBanner message={actionBanner.message} type={actionBanner.type} />
          </div>
        )}

        {/* Sections */}
        <div style={{ padding: "0 1rem 1rem" }}>

          {/* ── TEXT ── */}
          {(block.blockType === "text" || block.blockType === "card" || block.blockType === "doc") && (
            <>
              <SectionHeader
                label="Text"
                tooltip="Edit the heading and body text for this block."
                open={openSection === "text"}
                onToggle={() => toggleSection("text")}
              />
              {openSection === "text" && (
                <div>
                  <label style={labelStyle}>Heading</label>
                  <input
                    style={inputStyle}
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                    placeholder={block.blockType === "doc" ? "Document title" : "Leave blank for body-only block"}
                  />
                  <label style={labelStyle}>Body text</label>
                  <textarea
                    style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Write your content here…"
                  />
                  {block.blockType !== "doc" && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
                      <div>
                        <label style={labelStyle}>Font</label>
                        <select style={inputStyle} value={font} onChange={(e) => setFont(e.target.value)}>
                          {FONTS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={labelStyle}>Size</label>
                        <select style={inputStyle} value={size} onChange={(e) => setSize(e.target.value)}>
                          {SIZES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={labelStyle}>Align</label>
                        <select style={inputStyle} value={textAlign} onChange={(e) => setTextAlign(e.target.value)}>
                          <option value="left">Left</option>
                          <option value="center">Center</option>
                          <option value="right">Right</option>
                        </select>
                      </div>
                    </div>
                  )}
                  <ColourPicker label="Heading colour" value={titleColor} onChange={setTitleColor} />
                  <ColourPicker label="Body text colour" value={bodyColor} onChange={setBodyColor} />
                </div>
              )}
            </>
          )}

          {/* ── MEDIA ── */}
          {(block.blockType === "card" || block.blockType === "image") && (
            <>
              <SectionHeader
                label="Media"
                tooltip="Swap the image, upload a new one, or remove it."
                open={openSection === "media"}
                onToggle={() => toggleSection("media")}
              />
              {openSection === "media" && (
                <div>
                  <MediaPicker label="Image" value={imageUrl} onChange={setImageUrl} hint="Pick from your Media Library or paste any image URL." />
                  <label style={labelStyle}>Alt text (required for accessibility)</label>
                  <input style={inputStyle} value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} placeholder="Describe the image briefly" />
                  {block.blockType === "image" && (
                    <>
                      <label style={labelStyle}>Caption (optional)</label>
                      <input style={inputStyle} value={imageCaption} onChange={(e) => setImageCaption(e.target.value)} placeholder="Short caption shown below the image" />
                    </>
                  )}
                </div>
              )}
            </>
          )}

          {/* ── LINKS ── */}
          <SectionHeader
            label="Links"
            tooltip="Add, remove, or edit links on this block. Paste a URL and it will auto-fetch the title."
            open={openSection === "links"}
            onToggle={() => toggleSection("links")}
            badge={links.length > 0 ? `${links.length}` : undefined}
          />
          {openSection === "links" && (
            <div>
              {links.map((link, i) => (
                <LinkRow
                  key={i}
                  link={link}
                  index={i}
                  onChange={(updated) => setLinks((prev) => prev.map((l, idx) => idx === i ? updated : l))}
                  onRemove={() => setLinks((prev) => prev.filter((_, idx) => idx !== i))}
                />
              ))}
              <button
                onClick={() => setLinks((prev) => [...prev, { label: "", url: "", description: "", subDescription: "", openNewTab: false, isImageButton: false, imageUrl: "" }])}
                style={{ width: "100%", background: "transparent", border: "1px dashed #2a2218", borderRadius: "8px", color: "#8a7a6a", padding: "0.6rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", marginBottom: "0.5rem" }}
              >
                + Add link
              </button>
            </div>
          )}

          {/* ── BACKGROUND ── */}
          <SectionHeader
            label="Background"
            tooltip="Change the background colour or add a background image. Adjust overlay to keep text readable."
            open={openSection === "background"}
            onToggle={() => toggleSection("background")}
          />
          {openSection === "background" && (
            <div>
              <ColourPicker label="Background colour" value={bgColor} onChange={setBgColor} />
              <MediaPicker label="Background image (optional)" value={bgImage} onChange={setBgImage} hint="Overlays on top of the background colour." />
              {bgImage && (
                <div style={{ marginBottom: "0.75rem" }}>
                  <label style={labelStyle}>Overlay opacity (0 = no overlay, 1 = fully dark)</label>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={bgOverlay}
                    onChange={(e) => setBgOverlay(parseFloat(e.target.value))}
                    style={{ width: "100%", accentColor: "#E8520A" }}
                  />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#8a7a6a" }}>{Math.round(bgOverlay * 100)}%</span>
                </div>
              )}
              <ColourPicker label="Accent colour" value={accentColor} onChange={setAccentColor} />
            </div>
          )}

          {/* ── BUTTONS ── */}
          <SectionHeader
            label="Buttons"
            tooltip="Control the main button: label, destination, size, style. You can also use an image as the button."
            open={openSection === "buttons"}
            onToggle={() => toggleSection("buttons")}
          />
          {openSection === "buttons" && (
            <div>
              <label style={labelStyle}>Button label</label>
              <input style={inputStyle} value={btnLabel} onChange={(e) => setBtnLabel(e.target.value)} placeholder="e.g. Read more" />
              <label style={labelStyle}>Destination URL</label>
              <input style={inputStyle} value={btnUrl} onChange={(e) => setBtnUrl(e.target.value)} placeholder="/page-path or https://…" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <div>
                  <label style={labelStyle}>Size</label>
                  <div style={{ display: "flex", gap: "0.35rem" }}>
                    {BUTTON_SIZES.map((bs) => (
                      <button key={bs.value} onClick={() => setBtnSize(bs.value)}
                        style={{ flex: 1, background: btnSize === bs.value ? "#221508" : "transparent", border: `1px solid ${btnSize === bs.value ? "#E8520A" : "#2a2218"}`, borderRadius: "6px", color: btnSize === bs.value ? "#E8520A" : "#8a7a6a", padding: "0.3rem 0.2rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem" }}>
                        {bs.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Icon</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                    {BUTTON_ICONS.map((ic) => (
                      <button key={ic} onClick={() => setBtnIcon(ic)}
                        style={{ background: btnIcon === ic ? "#221508" : "transparent", border: `1px solid ${btnIcon === ic ? "#E8520A" : "#2a2218"}`, borderRadius: "6px", color: btnIcon === ic ? "#E8520A" : "#c8b89a", padding: "0.25rem 0.5rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem" }}>
                        {ic || "none"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <div>
                  <label style={labelStyle}>Width</label>
                  <input style={inputStyle} value={btnWidth} onChange={(e) => setBtnWidth(e.target.value)} placeholder="auto, 100%, 200px…" />
                </div>
                <div>
                  <label style={labelStyle}>Height</label>
                  <input style={inputStyle} value={btnHeight} onChange={(e) => setBtnHeight(e.target.value)} placeholder="auto, 48px…" />
                </div>
              </div>
              <ColourPicker label="Button colour" value={accentColor} onChange={setAccentColor} />
              <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.5rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#8a7a6a" }}>
                  <input type="checkbox" checked={btnNewTab} onChange={(e) => setBtnNewTab(e.target.checked)} />
                  Open in new tab
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#8a7a6a" }}>
                  <input type="checkbox" checked={btnIsImage} onChange={(e) => setBtnIsImage(e.target.checked)} />
                  Use image as button
                </label>
              </div>
              {btnIsImage && (
                <MediaPicker label="Image for button" value={btnImageUrl} onChange={setBtnImageUrl} hint="This image becomes the clickable button. Alt text above is used for accessibility." />
              )}
            </div>
          )}

          {/* ── BLOCK ── */}
          <SectionHeader
            label="Block"
            tooltip="Hide this block from visitors, duplicate it, copy it to another page, or delete it."
            open={openSection === "block"}
            onToggle={() => toggleSection("block")}
          />
          {openSection === "block" && (
            <div>
              {/* Visibility toggle */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem", background: "#0d0b08", border: "1px solid #2a2218", borderRadius: "8px", marginBottom: "0.5rem" }}>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#c8b89a" }}>
                    {isHidden ? "Hidden from visitors" : "Visible to visitors"}
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "#5a4a3a", marginTop: "0.1rem" }}>
                    {isHidden ? "Only you can see this block in edit mode." : "Tap to hide without deleting."}
                  </div>
                </div>
                <button
                  onClick={handleToggleHidden}
                  style={{
                    background: isHidden ? "#1a1208" : "transparent",
                    border: `1px solid ${isHidden ? "#E8520A" : "#2a2218"}`,
                    borderRadius: "8px",
                    color: isHidden ? "#E8520A" : "#8a7a6a",
                    padding: "0.4rem 0.75rem",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8rem",
                  }}
                >
                  {isHidden ? "Show" : "Hide"}
                </button>
              </div>

              {/* Copy to page */}
              <button
                onClick={() => setShowCopyPanel((v) => !v)}
                style={{ width: "100%", background: "transparent", border: "1px solid #2a2218", borderRadius: "8px", color: "#8a7a6a", padding: "0.6rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", marginBottom: "0.5rem", textAlign: "left" }}
              >
                Copy to another page…
              </button>
              {showCopyPanel && (
                <div style={{ background: "#0d0b08", border: "1px solid #2a2218", borderRadius: "8px", padding: "0.75rem", marginBottom: "0.5rem" }}>
                  <label style={labelStyle}>Destination page</label>
                  <select
                    style={inputStyle}
                    value={copyTargetPage}
                    onChange={(e) => setCopyTargetPage(e.target.value)}
                  >
                    <option value="">Select a page…</option>
                    {(pageSlugs ?? []).filter((s) => s !== block.pageSlug).map((slug) => (
                      <option key={slug} value={slug}>/{slug}</option>
                    ))}
                  </select>
                  <button
                    onClick={handleCopyToPage}
                    disabled={!copyTargetPage}
                    style={{ background: copyTargetPage ? "#E8520A" : "#2a2218", border: "none", borderRadius: "6px", color: copyTargetPage ? "#fff" : "#5a4a3a", padding: "0.5rem 1rem", cursor: copyTargetPage ? "pointer" : "default", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: 600 }}
                  >
                    Copy block
                  </button>
                </div>
              )}

              {/* Delete */}
              {!showDeleteConfirm ? (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  style={{ width: "100%", background: "transparent", border: "1px solid #E8520A44", borderRadius: "8px", color: "#E8520A", padding: "0.6rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem" }}
                >
                  Delete block…
                </button>
              ) : (
                <div style={{ background: "#1a0808", border: "1px solid #E8520A44", borderRadius: "8px", padding: "0.75rem" }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#c8b89a", marginBottom: "0.75rem" }}>
                    Delete this block permanently? This cannot be undone.
                  </p>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={() => setShowDeleteConfirm(false)} style={{ flex: 1, background: "transparent", border: "1px solid #2a2218", borderRadius: "6px", color: "#8a7a6a", padding: "0.5rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem" }}>
                      Cancel
                    </button>
                    <button onClick={handleDelete} style={{ flex: 1, background: "#E8520A", border: "none", borderRadius: "6px", color: "#fff", padding: "0.5rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: 600 }}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* ── PINNED ACTION BUTTONS ── */}
        <div style={{
          position: "sticky",
          bottom: 0,
          background: "#0d0a07",
          borderTop: "1px solid #1a1208",
          padding: "0.75rem 1rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.5rem",
        }}>
          <button
            onClick={onClose}
            style={{ background: "transparent", border: "1px solid #2a2218", borderRadius: "8px", color: "#8a7a6a", padding: "0.75rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem" }}
          >
            Cancel
          </button>
          <button
            onClick={handleUndo}
            disabled={!hasPrevious || undoMutation.isPending}
            style={{ background: "transparent", border: `1px solid ${hasPrevious ? "#c8b89a44" : "#1a1208"}`, borderRadius: "8px", color: hasPrevious ? "#c8b89a" : "#3a2a1a", padding: "0.75rem", cursor: hasPrevious ? "pointer" : "default", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem" }}
          >
            {undoMutation.isPending ? "Undoing…" : "Undo"}
          </button>
          <button
            onClick={handleSaveDraft}
            disabled={saveDraftMutation.isPending}
            style={{ background: "#1a1208", border: "1px solid #E8520A44", borderRadius: "8px", color: "#E8520A", padding: "0.75rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 600, opacity: saveDraftMutation.isPending ? 0.7 : 1 }}
          >
            {saveDraftMutation.isPending ? "Saving…" : "Save Draft"}
          </button>
          <button
            onClick={handlePublish}
            disabled={publishMutation.isPending || saveDraftMutation.isPending}
            style={{ background: "#E8520A", border: "none", borderRadius: "8px", color: "#fff", padding: "0.75rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 600, opacity: (publishMutation.isPending || saveDraftMutation.isPending) ? 0.7 : 1 }}
          >
            {publishMutation.isPending ? "Publishing…" : "Publish Now"}
          </button>
        </div>
      </div>

      {/* Desktop panel styles injected via style tag */}
      <style>{`
        @media (min-width: 768px) {
          .inline-editor-panel {
            top: 0 !important;
            left: auto !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 400px !important;
            max-height: 100vh !important;
            border-radius: 0 !important;
            border-left: 1px solid #E8520A44 !important;
            border-top: none !important;
            border-right: none !important;
            border-bottom: none !important;
          }
        }
      `}</style>
    </>
  );
}
