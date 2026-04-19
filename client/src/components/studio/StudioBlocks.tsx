/**
 * StudioBlocks — renders database-stored content blocks on any live page.
 *
 * Usage: Add <StudioBlocks pageSlug="rules" /> to the bottom of any page.
 * If the page has blocks in the database, they render here.
 * If not, nothing renders — the page looks exactly as before.
 *
 * This is additive. It never replaces existing page content.
 * The original hardcoded content stays above this component.
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
// Block content types
// ─────────────────────────────────────────────

interface TextBlockContent {
  heading?: string;
  body: string;
  font: "playfair" | "dmsans";
  size: "large" | "medium" | "small";
}

interface CardBlockContent {
  title?: string;
  description?: string;
  heading?: string;
  body?: string;
  subtitle?: string;
  cardId?: string;
  tags?: string[];
  imageUrl?: string;
  linkLabel?: string;
  linkUrl?: string;
  font?: string;
  size?: string;
}

interface DocBlockContent {
  label: string;
  url: string;
  description?: string;
}

interface ImageBlockContent {
  url: string;
  alt: string;
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
  const sizes = sizeMap[content.size] || sizeMap.medium;
  const fontClass = content.font === "playfair"
    ? "font-['Playfair_Display']"
    : "font-['DM_Sans']";

  return (
    <div className={`studio-block studio-text-block py-8 px-4 md:px-8 ${fontClass}`}>
      {content.heading && (
        <h2
          className={`${sizes.heading} font-bold mb-4`}
          style={{ color: "#e8c98a" }}
        >
          {content.heading}
        </h2>
      )}
      <p
        className={`${sizes.body} leading-relaxed whitespace-pre-line`}
        style={{ color: "#c8b89a" }}
      >
        {content.body}
      </p>
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

  return (
    <div
      className={`studio-block studio-card-block rounded-xl overflow-hidden border ${fontClass}`}
      style={{ borderColor: "#2a2218", background: "#0f0c08" }}
    >
      {content.imageUrl && (
        <img
          src={content.imageUrl}
          alt={displayTitle}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        {content.cardId && (
          <div className="text-xs mb-2 font-mono" style={{ color: "#5a4a3a" }}>{content.cardId}</div>
        )}
        <h3
          className={`${sizes.heading} font-bold mb-3`}
          style={{ color: "#e8c98a" }}
        >
          {displayTitle}
        </h3>
        {content.subtitle && (
          <div className="text-sm mb-2 italic" style={{ color: "#8a7a6a" }}>{content.subtitle}</div>
        )}
        <p
          className={`${sizes.body} leading-relaxed mb-4`}
          style={{ color: "#c8b89a" }}
        >
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
            <a
              href={content.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{ background: "#E8520A", color: "#fff" }}
            >
              {content.linkLabel} →
            </a>
          ) : (
            <Link
              href={content.linkUrl}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{ background: "#E8520A", color: "#fff" }}
            >
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
      <div
        className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-lg"
        style={{ background: "#1a1410", color: "#E8520A" }}
      >
        📄
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium mb-1" style={{ color: "#e8c98a", fontFamily: "'DM Sans', sans-serif" }}>
          {content.label}
        </div>
        {content.description && (
          <p className="text-sm mb-2" style={{ color: "#8a7a6a" }}>
            {content.description}
          </p>
        )}
        {isExternal ? (
          <a
            href={content.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline"
            style={{ color: "#E8520A" }}
          >
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
  return (
    <div className="studio-block studio-image-block">
      <img
        src={content.url}
        alt={content.alt}
        className="w-full rounded-xl object-cover"
        style={{ maxHeight: "480px" }}
      />
      {content.alt && (
        <p className="text-center text-sm mt-2" style={{ color: "#8a7a6a" }}>
          {content.alt}
        </p>
      )}
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

  // On touch devices, always show the outline so blocks are visible without hover
  const showOutline = isTouchDevice || isHovered;

  // Tap+hold for mobile (500ms)
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

  // Desktop click
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
      {/* Draft indicator badge */}
      {hasDraft && (
        <div
          style={{
            position: "absolute",
            top: "-8px",
            right: "8px",
            background: "#E8520A",
            color: "#fff",
            fontSize: "0.6rem",
            fontWeight: 700,
            padding: "2px 6px",
            borderRadius: "4px",
            zIndex: 10,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          DRAFT
        </div>
      )}

      {/* Edit hint — shows on hover (desktop) or always (mobile) */}
      {showOutline && (
        <div
          style={{
            position: "absolute",
            top: "8px",
            left: "8px",
            background: "#E8520A",
            color: "#fff",
            fontSize: "0.65rem",
            fontWeight: 600,
            padding: "3px 8px",
            borderRadius: "4px",
            zIndex: 10,
            pointerEvents: "none",
            letterSpacing: "0.05em",
          }}
        >
          ✏ EDIT
        </div>
      )}

      {/* Drag handle */}
      {showOutline && (
        <div
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            color: "#E8520A",
            fontSize: "1rem",
            zIndex: 10,
            cursor: "grab",
            padding: "4px",
            background: "#1a1410",
            borderRadius: "4px",
            lineHeight: 1,
          }}
          onPointerDown={(e) => e.stopPropagation()} // don't trigger edit on drag handle
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

  // Nothing to show — no blocks or still loading
  if (isLoading || !blocks || blocks.length === 0) return null;

  return (
    <>
      <section
        className={`studio-blocks-section w-full max-w-4xl mx-auto px-4 md:px-8 py-8 space-y-6 ${className}`}
        aria-label="Additional content"
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
              default:
                return null;
            }
          })();

          if (!blockNode) return null;

          // Admin mode: wrap with glow border + edit trigger
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

          // Visitor mode: render as-is
          return blockNode;
        })}
      </section>

      {/* Inline editor panel — mounts as portal on document.body */}
      {isAdmin && editingBlock && (
        <InlineBlockEditor
          block={editingBlock}
          onClose={handleClose}
        />
      )}
    </>
  );
}
