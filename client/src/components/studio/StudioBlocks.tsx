/**
 * StudioBlocks — renders database-stored content blocks on any live page.
 * 
 * Usage: Add <StudioBlocks pageSlug="rules" /> to the bottom of any page.
 * If the page has blocks in the database, they render here.
 * If not, nothing renders — the page looks exactly as before.
 * 
 * This is additive. It never replaces existing page content.
 * The original hardcoded content stays above this component.
 */

import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

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
  title: string;
  description: string;
  imageUrl?: string;
  linkLabel?: string;
  linkUrl?: string;
  font: string;
  size: string;
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
          alt={content.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h3
          className={`${sizes.heading} font-bold mb-3`}
          style={{ color: "#e8c98a" }}
        >
          {content.title}
        </h3>
        <p
          className={`${sizes.body} leading-relaxed mb-4`}
          style={{ color: "#c8b89a" }}
        >
          {content.description}
        </p>
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
// Main component
// ─────────────────────────────────────────────

export default function StudioBlocks({ pageSlug, className = "" }: StudioBlocksProps) {
  const { data: blocks, isLoading } = trpc.studio.getPublicBlocks.useQuery(
    { pageSlug },
    { staleTime: 30_000 }
  );

  // Nothing to show — no blocks or still loading
  if (isLoading || !blocks || blocks.length === 0) return null;

  return (
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
      })}
    </section>
  );
}
