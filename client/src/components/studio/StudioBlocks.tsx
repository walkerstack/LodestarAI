/**
 * StudioBlocks — renders database-stored content blocks on any live page.
 *
 * Usage: Add <StudioBlocks pageSlug="rules" /> anywhere on a page.
 * If the page has blocks in the database, they render here.
 * If not, nothing renders.
 *
 * Colour-aware: block renderers use colours from block content when provided,
 * falling back to dark-theme defaults. Works on both dark and light pages.
 *
 * Admin mode: when the logged-in user has role === "admin":
 *  - Each block gets an orange glow outline on hover
 *  - Tap+hold (mobile) or click (desktop) opens InlineBlockEditor
 *  - Drag handle appears for reordering
 */

import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { useState, useRef, useCallback } from "react";
import InlineBlockEditor from "@/components/InlineBlockEditor";
import type { ContentBlock } from "../../../../drizzle/schema";

interface StudioBlocksProps {
  pageSlug: string;
  className?: string;
}

// ─────────────────────────────────────────────
// Block content types — all colour/style fields optional
// ─────────────────────────────────────────────

interface TextBlockContent {
  heading?: string;
  body: string;
  font?: "playfair" | "dmsans";
  size?: "large" | "medium" | "small";
  eyebrow?: string;
  align?: "left" | "center" | "right";
  titleColor?: string;
  descColor?: string;
  bgColor?: string;
  bgImage?: string;
  links?: Array<{ label: string; url: string; description?: string }>;
}

interface CardBlockContent {
  title?: string;
  description?: string;
  heading?: string;
  body?: string;
  subtitle?: string;
  cardId?: string;
  number?: string;
  emoji?: string;
  tags?: string[];
  imageUrl?: string;
  linkLabel?: string;
  linkUrl?: string;
  font?: string;
  size?: string;
  titleColor?: string;
  descColor?: string;
  bgColor?: string;
  borderColor?: string;
}

interface DocBlockContent {
  label: string;
  url: string;
  description?: string;
}

interface ImageBlockContent {
  url: string;
  alt: string;
  caption?: string;
  eyebrow?: string;
  maxHeight?: string;
  rounded?: boolean;
}

interface CarouselItem {
  url: string;
  alt: string;
  label?: string;
  caption?: string;
  linkUrl?: string;
}
interface CarouselBlockContent {
  items: CarouselItem[];
  heading?: string;
  eyebrow?: string;
  description?: string;
  pdfUrl?: string;
}

interface RuleCardItem {
  imageUrl: string;
  rule: string;
  caption: string;
  linkUrl?: string;
}
interface RuleCardBlockContent {
  items: RuleCardItem[];
  heading?: string;
  eyebrow?: string;
  titleColor?: string;
  descColor?: string;
  bgColor?: string;
  cardBg?: string;
  cardBorder?: string;
}

interface StickerBlockContent {
  url: string;
  alt: string;
  position?: "left" | "center" | "right";
  size?: "small" | "medium" | "large";
  bgColor?: string;
}

// ─────────────────────────────────────────────
// Size map
// ─────────────────────────────────────────────

const sizeMap = {
  large: { heading: "text-3xl md:text-4xl", body: "text-lg md:text-xl" },
  medium: { heading: "text-2xl md:text-3xl", body: "text-base md:text-lg" },
  small: { heading: "text-xl md:text-2xl", body: "text-sm md:text-base" },
};

// ─────────────────────────────────────────────
// Individual block renderers
// ─────────────────────────────────────────────

function TextBlock({ content }: { content: TextBlockContent }) {
  const sizes = sizeMap[content.size || "medium"];
  const fontClass = content.font === "playfair"
    ? "font-['Playfair_Display']"
    : "font-['DM_Sans']";
  const alignClass = content.align === "center" ? "text-center" : content.align === "right" ? "text-right" : "text-left";
  const titleColor = content.titleColor || "#e8c98a";
  const descColor = content.descColor || "#c8b89a";
  const bgColor = content.bgColor;

  return (
    <div
      className={`studio-block studio-text-block w-full ${fontClass}`}
      style={bgColor ? { background: bgColor } : undefined}
    >
      <div className={`max-w-3xl mx-auto px-6 md:px-8 py-8 ${alignClass}`}>
        {content.eyebrow && (
          <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#E8520A" }}>
            {content.eyebrow}
          </div>
        )}
        {content.heading && (
          <h2 className={`${sizes.heading} font-bold mb-4`} style={{ color: titleColor }}>
            {content.heading}
          </h2>
        )}
        <p className={`${sizes.body} leading-relaxed whitespace-pre-line`} style={{ color: descColor }}>
          {content.body}
        </p>
        {content.links && content.links.length > 0 && (
          <div className="mt-6 flex flex-col gap-3">
            {content.links.map((link, i) => {
              const isExt = link.url.startsWith("http");
              return isExt ? (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium underline"
                  style={{ color: "#E8520A" }}>
                  {link.label} →
                </a>
              ) : (
                <Link key={i} href={link.url}
                  className="inline-flex items-center gap-2 text-sm font-medium underline"
                  style={{ color: "#E8520A" }}>
                  {link.label} →
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function CardBlock({ content }: { content: CardBlockContent }) {
  const displayTitle = content.title ?? content.heading ?? "";
  const displayDesc = content.description ?? content.body ?? "";
  const sizes = sizeMap[(content.size as keyof typeof sizeMap)] || sizeMap.medium;
  const fontClass = content.font === "playfair"
    ? "font-['Playfair_Display']"
    : "font-['DM_Sans']";
  const isExternal = content.linkUrl?.startsWith("http");
  const titleColor = content.titleColor || "#e8c98a";
  const descColor = content.descColor || "#c8b89a";
  const bgColor = content.bgColor || "#0f0c08";
  const borderColor = content.borderColor || "#2a2218";

  return (
    <div
      className={`studio-block studio-card-block rounded-xl overflow-hidden border ${fontClass}`}
      style={{ borderColor, background: bgColor }}
    >
      {content.imageUrl && (
        <img src={content.imageUrl} alt={displayTitle} className="w-full h-48 object-cover" />
      )}
      <div className="p-6">
        {(content.number || content.emoji) && (
          <div className="text-3xl mb-3">{content.emoji || content.number}</div>
        )}
        {content.cardId && (
          <div className="text-xs mb-2 font-mono" style={{ color: "#5a4a3a" }}>{content.cardId}</div>
        )}
        <h3 className={`${sizes.heading} font-bold mb-3`} style={{ color: titleColor }}>
          {displayTitle}
        </h3>
        {content.subtitle && (
          <div className="text-sm mb-2 italic" style={{ color: "#8a7a6a" }}>{content.subtitle}</div>
        )}
        <p className={`${sizes.body} leading-relaxed mb-4`} style={{ color: descColor }}>
          {displayDesc}
        </p>
        {content.tags && content.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {content.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 rounded" style={{ background: "#1a1410", color: "#E8520A" }}>{tag}</span>
            ))}
          </div>
        )}
        {content.linkUrl && content.linkLabel && (
          isExternal ? (
            <a href={content.linkUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
              style={{ background: "#E8520A", color: "#fff" }}>
              {content.linkLabel} →
            </a>
          ) : (
            <Link href={content.linkUrl}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
              style={{ background: "#E8520A", color: "#fff" }}>
              {content.linkLabel} →
            </Link>
          )
        )}
      </div>
    </div>
  );
}

function DocBlock({ content }: { content: DocBlockContent }) {
  const isExternal = content.url.startsWith("http");
  return (
    <div
      className="studio-block studio-doc-block flex items-start gap-4 p-5 rounded-xl border"
      style={{ borderColor: "#2a2218", background: "#0f0c08" }}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-lg"
        style={{ background: "#1a1410", color: "#E8520A" }}>
        📄
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium mb-1" style={{ color: "#e8c98a", fontFamily: "'DM Sans', sans-serif" }}>
          {content.label}
        </div>
        {content.description && (
          <p className="text-sm mb-2" style={{ color: "#8a7a6a" }}>{content.description}</p>
        )}
        {isExternal ? (
          <a href={content.url} target="_blank" rel="noopener noreferrer"
            className="text-sm underline" style={{ color: "#E8520A" }}>
            Open document →
          </a>
        ) : (
          <Link href={content.url} className="text-sm underline" style={{ color: "#E8520A" }}>
            Open document →
          </Link>
        )}
      </div>
    </div>
  );
}

function ImageBlock({ content }: { content: ImageBlockContent }) {
  const maxH = content.maxHeight || "480px";
  const rounded = content.rounded !== false;
  return (
    <div className="studio-block studio-image-block w-full">
      {content.eyebrow && (
        <div className="text-xs font-bold tracking-widest uppercase mb-3 px-4 text-center" style={{ color: "#E8520A" }}>
          {content.eyebrow}
        </div>
      )}
      <img
        src={content.url}
        alt={content.alt}
        className={`w-full object-cover ${rounded ? "rounded-xl" : ""}`}
        style={{ maxHeight: maxH }}
      />
      {content.caption && (
        <p className="text-center text-sm mt-2 px-4" style={{ color: "#8a7a6a" }}>
          {content.caption}
        </p>
      )}
    </div>
  );
}

function CarouselBlock({ content }: { content: CarouselBlockContent }) {
  const [current, setCurrent] = useState(0);
  const items = content.items || [];
  if (items.length === 0) return null;
  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);
  const next = () => setCurrent((c) => (c + 1) % items.length);
  const item = items[current];
  return (
    <div className="studio-block studio-carousel-block w-full">
      {(content.eyebrow || content.heading || content.description) && (
        <div className="max-w-3xl mx-auto px-4 mb-4 text-center">
          {content.eyebrow && (
            <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#E8520A" }}>
              {content.eyebrow}
            </div>
          )}
          {content.heading && (
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "#e8c98a", fontFamily: "'Playfair Display', serif" }}>
              {content.heading}
            </h2>
          )}
          {content.description && (
            <p className="text-base leading-relaxed" style={{ color: "#c8b89a" }}>
              {content.description}
            </p>
          )}
        </div>
      )}
      <div className="relative overflow-hidden rounded-xl" style={{ background: "#0f0c08" }}>
        <img src={item.url} alt={item.alt} className="w-full object-cover" style={{ maxHeight: "400px" }} />
        {(item.label || item.caption) && (
          <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: "linear-gradient(transparent, rgba(8,6,4,0.9))" }}>
            {item.label && <div className="font-bold text-lg" style={{ color: "#e8c98a", fontFamily: "'Playfair Display', serif" }}>{item.label}</div>}
            {item.caption && <div className="text-sm mt-1" style={{ color: "#c8b89a" }}>{item.caption}</div>}
          </div>
        )}
        {items.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white" style={{ background: "rgba(232,82,10,0.8)" }} aria-label="Previous">‹</button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white" style={{ background: "rgba(232,82,10,0.8)" }} aria-label="Next">›</button>
          </>
        )}
      </div>
      {items.length > 1 && (
        <div className="flex justify-center gap-2 mt-3">
          {items.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className="w-2 h-2 rounded-full transition-colors" style={{ background: i === current ? "#E8520A" : "#3a2a1a" }} aria-label={`Go to slide ${i + 1}`} />
          ))}
        </div>
      )}
      {content.pdfUrl && (
        <div className="text-center mt-4">
          <a href={content.pdfUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold"
            style={{ background: "#E8520A", color: "#fff" }}>
            📥 Download PDF
          </a>
        </div>
      )}
      {item.linkUrl && !content.pdfUrl && (
        <div className="text-center mt-3">
          <Link href={item.linkUrl} className="text-sm underline" style={{ color: "#E8520A" }}>Learn more →</Link>
        </div>
      )}
    </div>
  );
}

function RuleCardBlock({ content }: { content: RuleCardBlockContent }) {
  const items = content.items || [];
  if (items.length === 0) return null;
  const titleColor = content.titleColor || "#E8520A";
  const descColor = content.descColor || "#c8b89a";
  const cardBg = content.cardBg || "#0f0c08";
  const cardBorder = content.cardBorder || "#2a2218";
  return (
    <div className="studio-block studio-rule-card-block w-full">
      {(content.eyebrow || content.heading) && (
        <div className="max-w-3xl mx-auto px-4 mb-6 text-center">
          {content.eyebrow && (
            <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#E8520A" }}>
              {content.eyebrow}
            </div>
          )}
          {content.heading && (
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "#e8c98a", fontFamily: "'Playfair Display', serif" }}>
              {content.heading}
            </h2>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <div key={i} className="rounded-xl overflow-hidden border" style={{ borderColor: cardBorder, background: cardBg }}>
            <img src={item.imageUrl} alt={item.rule} className="w-full h-40 object-cover" />
            <div className="p-4">
              <div className="font-bold text-base mb-2" style={{ color: titleColor, fontFamily: "'Playfair Display', serif" }}>{item.rule}</div>
              <p className="text-sm leading-relaxed" style={{ color: descColor }}>{item.caption}</p>
              {item.linkUrl && (
                <Link href={item.linkUrl} className="inline-block mt-3 text-xs underline" style={{ color: "#E8520A" }}>Read more →</Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StickerBlock({ content }: { content: StickerBlockContent }) {
  const stickerSizeMap = { small: "w-16 h-16", medium: "w-28 h-28", large: "w-44 h-44" };
  const alignMap = { left: "justify-start", center: "justify-center", right: "justify-end" };
  const sizeClass = stickerSizeMap[content.size || "medium"];
  const alignClass = alignMap[content.position || "center"];
  return (
    <div
      className={`studio-block studio-sticker-block flex ${alignClass} py-4 px-4`}
      style={content.bgColor ? { background: content.bgColor } : undefined}
    >
      <img
        src={content.url}
        alt={content.alt}
        className={`${sizeClass} object-contain drop-shadow-lg`}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// Admin block wrapper — glow border + edit trigger
// ─────────────────────────────────────────────

interface AdminBlockWrapperProps {
  block: ContentBlock;
  onEdit: (block: ContentBlock) => void;
  children: React.ReactNode;
}

// Detect touch device once at module level
const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

function AdminBlockWrapper({ block, onEdit, children }: AdminBlockWrapperProps) {
  const [isHovered, setIsHovered] = useState(false);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isDraggingRef = useRef(false);

  const showOutline = isTouchDevice || isHovered;

  const handlePointerDown = useCallback(() => {
    isDraggingRef.current = false;
    holdTimerRef.current = setTimeout(() => {
      if (!isDraggingRef.current) {
        onEdit(block);
      }
    }, 500);
  }, [block, onEdit]);

  const handlePointerMove = useCallback(() => {
    isDraggingRef.current = true;
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  }, []);

  const handleClick = useCallback(() => {
    onEdit(block);
  }, [block, onEdit]);

  const hasDraft = block.status === "draft" || (block.draftContent && block.draftContent !== block.content);

  return (
    <div
      className="relative group"
      style={{
        outline: showOutline ? "2px solid #E8520A" : "2px solid transparent",
        outlineOffset: "4px",
        borderRadius: "12px",
        transition: "outline-color 0.15s ease",
        cursor: "pointer",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={handleClick}
    >
      {hasDraft && (
        <div style={{
          position: "absolute", top: "-8px", right: "8px",
          background: "#E8520A", color: "#fff",
          fontSize: "0.6rem", fontWeight: 700,
          padding: "2px 6px", borderRadius: "4px",
          zIndex: 10, letterSpacing: "0.05em", textTransform: "uppercase",
        }}>
          DRAFT
        </div>
      )}
      {showOutline && (
        <div style={{
          position: "absolute", top: "8px", left: "8px",
          background: "#E8520A", color: "#fff",
          fontSize: "0.65rem", fontWeight: 600,
          padding: "3px 8px", borderRadius: "4px",
          zIndex: 10, pointerEvents: "none", letterSpacing: "0.05em",
        }}>
          ✏ EDIT
        </div>
      )}
      {showOutline && (
        <div style={{
          position: "absolute", top: "8px", right: "8px",
          color: "#E8520A", fontSize: "1rem",
          zIndex: 10, cursor: "grab",
          padding: "4px", background: "#1a1410",
          borderRadius: "4px", lineHeight: 1,
        }}
          onPointerDown={(e) => e.stopPropagation()}
          title="Drag to reorder"
        >
          ⠿
        </div>
      )}
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────

type BlockRow = ContentBlock;

export default function StudioBlocks({ pageSlug, className = "" }: StudioBlocksProps) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const { data: blocks, isLoading } = trpc.studio.getPublicBlocks.useQuery(
    { pageSlug },
    { staleTime: 30_000 }
  );

  const [editingBlock, setEditingBlock] = useState<BlockRow | null>(null);

  const handleEdit = useCallback((block: BlockRow) => {
    setEditingBlock(block);
  }, []);

  const handleClose = useCallback(() => {
    setEditingBlock(null);
  }, []);

  if (isLoading || !blocks || blocks.length === 0) return null;

  return (
    <>
      <div
        className={`studio-blocks-section w-full ${className}`}
        aria-label="Page content"
      >
        {blocks.map((block) => {
          let content: unknown;
          try {
            content = JSON.parse(block.content);
          } catch {
            return null;
          }

          const blockNode = (() => {
            switch (block.blockType) {
              case "text":
                return <TextBlock key={block.id} content={content as TextBlockContent} />;
              case "card":
                return <CardBlock key={block.id} content={content as CardBlockContent} />;
              case "doc":
                return <DocBlock key={block.id} content={content as DocBlockContent} />;
              case "image":
                return <ImageBlock key={block.id} content={content as ImageBlockContent} />;
              case "carousel":
                return <CarouselBlock key={block.id} content={content as CarouselBlockContent} />;
              case "rule-card":
                return <RuleCardBlock key={block.id} content={content as RuleCardBlockContent} />;
              case "sticker":
                return <StickerBlock key={block.id} content={content as StickerBlockContent} />;
              default:
                return null;
            }
          })();

          if (!blockNode) return null;

          if (isAdmin) {
            return (
              <AdminBlockWrapper
                key={block.id}
                block={block as BlockRow}
                onEdit={handleEdit}
              >
                {blockNode}
              </AdminBlockWrapper>
            );
          }

          return blockNode;
        })}
      </div>

      {isAdmin && editingBlock && (
        <InlineBlockEditor
          block={editingBlock}
          onClose={handleClose}
        />
      )}
    </>
  );
}
