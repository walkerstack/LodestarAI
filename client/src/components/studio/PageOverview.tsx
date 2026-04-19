/**
 * PageOverview — Build 3, Step 6
 * Grid of real rendered block thumbnails using snapdom.
 * - 2-3 column grid
 * - Real rendered previews, cached after first generation
 * - Draft blocks: orange border on thumbnail
 * - Drag thumbnails to reorder (rectSortingStrategy)
 * - "+ Add Block" tile at end
 * - "Refresh" button in header
 * - requestIdleCallback loop — one thumbnail at a time
 * - Fallback card if capture fails
 */

import { useState, useEffect, useRef, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Block = {
  id: number;
  pageSlug: string;
  blockType: "text" | "card" | "doc" | "image";
  position: number;
  content: string;
  isMirror: boolean;
  mirrorSourceId: number | null;
  status?: string | null;
  draftContent?: string | null;
  previousContent?: string | null;
};

type ThumbnailCache = Record<number, string | "loading" | "failed">;

// ── Fallback card when snapdom fails ─────────────────────────────────────
function FallbackCard({ block }: { block: Block }) {
  const typeColors: Record<string, string> = {
    text: "#4a9eff",
    card: "#E8520A",
    doc: "#7ecb8f",
    image: "#c47eff",
  };

  let preview = "";
  try {
    const parsed = JSON.parse(block.content);
    preview =
      parsed.heading ?? parsed.title ?? parsed.label ?? parsed.alt ?? parsed.body?.slice(0, 60) ?? "";
  } catch {}

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#130f0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        padding: "0.75rem",
      }}
    >
      <span
        style={{
          fontSize: "0.6rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: typeColors[block.blockType] ?? "#8a7a6a",
          fontFamily: "'DM Sans', sans-serif",
          background: "#1a1208",
          padding: "0.2rem 0.5rem",
          borderRadius: "4px",
        }}
      >
        {block.blockType}
      </span>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.7rem",
          color: "#8a7a6a",
          textAlign: "center",
          margin: 0,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
        }}
      >
        {preview || <em style={{ color: "#4a3a2a" }}>empty</em>}
      </p>
    </div>
  );
}

// ── Single sortable thumbnail tile ───────────────────────────────────────
function ThumbnailTile({
  block,
  thumbnail,
  onEdit,
}: {
  block: Block;
  thumbnail: string | "loading" | "failed" | undefined;
  onEdit: (block: Block) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const isDraft =
    block.status === "draft" ||
    (block.draftContent && block.draftContent !== block.content);

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        position: "relative",
        borderRadius: "8px",
        overflow: "hidden",
        border: isDraft ? "2px solid #E8520A" : "1px solid #2a2218",
        background: "#130f0a",
        cursor: "grab",
        aspectRatio: "4/3",
        display: "flex",
        flexDirection: "column",
      }}
      {...attributes}
      {...listeners}
    >
      {/* Thumbnail area */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        {thumbnail === "loading" || thumbnail === undefined ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#0d0b08",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                color: "#4a3a2a",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            >
              rendering…
            </span>
          </div>
        ) : thumbnail === "failed" ? (
          <FallbackCard block={block} />
        ) : (
          <img
            src={thumbnail}
            alt={`Block ${block.id} preview`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
              display: "block",
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          background: "#0d0b08cc",
          borderTop: "1px solid #2a2218",
          padding: "0.3rem 0.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.55rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#5a4a3a",
            flex: 1,
          }}
        >
          #{block.position + 1} · {block.blockType}
        </span>
        {isDraft && (
          <span
            style={{
              fontSize: "0.5rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#E8520A",
              fontFamily: "'DM Sans', sans-serif",
              background: "#E8520A18",
              border: "1px solid #E8520A44",
              padding: "0.1rem 0.3rem",
              borderRadius: "3px",
            }}
          >
            draft
          </span>
        )}
        {/* Edit button — stops drag propagation */}
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onEdit(block);
          }}
          style={{
            background: "transparent",
            border: "1px solid #E8520A44",
            borderRadius: "3px",
            color: "#E8520A",
            fontSize: "0.55rem",
            padding: "0.1rem 0.35rem",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

// ── Add Block tile ────────────────────────────────────────────────────────
function AddBlockTile({ onClick }: { onClick: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        aspectRatio: "4/3",
        background: hover ? "#221508" : "#130f0a",
        border: "1px dashed #E8520A66",
        borderRadius: "8px",
        color: "#E8520A",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "1.5rem",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.4rem",
        transition: "background 0.15s",
      }}
    >
      <span>+</span>
      <span style={{ fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
        Add Block
      </span>
    </button>
  );
}

// ── Main PageOverview ─────────────────────────────────────────────────────
export default function PageOverview({
  blocks,
  pageSlug,
  onEdit,
  onAddBlock,
  onReorder,
  thumbnailVersion,
}: {
  blocks: Block[];
  pageSlug: string;
  onEdit: (block: Block) => void;
  onAddBlock: () => void;
  onReorder: (orderedIds: number[]) => void;
  thumbnailVersion: number; // bump to force re-render
}) {
  const [thumbnails, setThumbnails] = useState<ThumbnailCache>({});
  const [localBlocks, setLocalBlocks] = useState<Block[]>(blocks);
  const generatingRef = useRef(false);
  const versionRef = useRef(thumbnailVersion);

  // Sync local blocks when parent updates
  useEffect(() => {
    setLocalBlocks(blocks);
  }, [blocks]);

  // Re-generate thumbnails when version bumps (after publish)
  useEffect(() => {
    if (thumbnailVersion !== versionRef.current) {
      versionRef.current = thumbnailVersion;
      setThumbnails({});
    }
  }, [thumbnailVersion]);

  // Generate thumbnails one at a time via requestIdleCallback
  useEffect(() => {
    if (generatingRef.current) return;

    const pending = localBlocks.filter(
      (b) => thumbnails[b.id] === undefined
    );
    if (pending.length === 0) return;

    generatingRef.current = true;

    // Mark all pending as loading
    setThumbnails((prev) => {
      const next = { ...prev };
      for (const b of pending) {
        if (next[b.id] === undefined) next[b.id] = "loading";
      }
      return next;
    });

    let index = 0;

    const captureNext = () => {
      if (index >= pending.length) {
        generatingRef.current = false;
        return;
      }

      const block = pending[index++];

      const run = async () => {
        try {
          // Build an offscreen container with the block's content rendered
          const container = document.createElement("div");
          container.style.cssText = `
            position: fixed;
            left: -9999px;
            top: 0;
            width: 800px;
            background: #080604;
            overflow: hidden;
            z-index: -1;
          `;

          // Render a visual representation of the block
          container.innerHTML = buildBlockHtml(block);
          document.body.appendChild(container);

          // Small delay to allow any images to load
          await new Promise((r) => setTimeout(r, 150));

          // Dynamic import of snapdom
          const { snapdom } = await import("@zumer/snapdom");

          const result = await snapdom(container, {
            scale: 1,
            embedFonts: false,
            backgroundColor: "#080604",
            fallbackURL: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
          });

          const imgEl = await result.toPng();
          const dataUrl = imgEl.src;
          document.body.removeChild(container);

          setThumbnails((prev) => ({ ...prev, [block.id]: dataUrl }));
        } catch {
          setThumbnails((prev) => ({ ...prev, [block.id]: "failed" }));
        }

        // Yield to browser, then do next
        if ("requestIdleCallback" in window) {
          (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(captureNext);
        } else {
          setTimeout(captureNext, 50);
        }
      };

      run();
    };

    if ("requestIdleCallback" in window) {
      (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(captureNext);
    } else {
      setTimeout(captureNext, 50);
    }
  }, [localBlocks, thumbnails]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = localBlocks.findIndex((b) => b.id === active.id);
      const newIndex = localBlocks.findIndex((b) => b.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return;

      const reordered = arrayMove(localBlocks, oldIndex, newIndex);
      setLocalBlocks(reordered);
      onReorder(reordered.map((b) => b.id));
    },
    [localBlocks, onReorder]
  );

  const handleRefresh = () => {
    setThumbnails({});
    generatingRef.current = false;
  };

  const generatingCount = Object.values(thumbnails).filter((v) => v === "loading").length;

  return (
    <div>
      {/* Overview header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          marginBottom: "1rem",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.75rem",
            color: "#8a7a6a",
          }}
        >
          {localBlocks.length} block{localBlocks.length !== 1 ? "s" : ""}
          {generatingCount > 0 && (
            <span style={{ color: "#E8520A", marginLeft: "0.5rem" }}>
              · rendering {generatingCount}…
            </span>
          )}
        </span>
        <button
          onClick={handleRefresh}
          style={{
            background: "transparent",
            border: "1px solid #2a2218",
            borderRadius: "5px",
            color: "#8a7a6a",
            fontSize: "0.7rem",
            fontFamily: "'DM Sans', sans-serif",
            padding: "0.25rem 0.6rem",
            cursor: "pointer",
          }}
        >
          ↺ Refresh thumbnails
        </button>
      </div>

      {/* Grid */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={localBlocks.map((b) => b.id)} strategy={rectSortingStrategy}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "0.75rem",
            }}
          >
            {localBlocks.map((block) => (
              <ThumbnailTile
                key={block.id}
                block={block}
                thumbnail={thumbnails[block.id]}
                onEdit={onEdit}
              />
            ))}
            <AddBlockTile onClick={onAddBlock} />
          </div>
        </SortableContext>
      </DndContext>

      {/* Pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ── Build a simple HTML representation of a block for snapdom ────────────
function buildBlockHtml(block: Block): string {
  let parsed: Record<string, unknown> = {};
  try {
    parsed = JSON.parse(block.content);
  } catch {}

  const bg = (parsed.bgColor as string) || "#080604";
  const textColor = (parsed.textColor as string) || "#e8ddd0";

  if (block.blockType === "image") {
    const url = (parsed.url as string) || "";
    const alt = (parsed.alt as string) || "";
    return `
      <div style="width:800px;min-height:200px;background:${bg};display:flex;align-items:center;justify-content:center;overflow:hidden;">
        ${url ? `<img src="${url}" alt="${alt}" crossorigin="anonymous" style="max-width:100%;max-height:300px;object-fit:contain;" />` : `<span style="color:#4a3a2a;font-family:sans-serif;font-size:14px;">image</span>`}
      </div>
    `;
  }

  if (block.blockType === "card") {
    const title = (parsed.title as string) || (parsed.heading as string) || "";
    const desc = (parsed.description as string) || (parsed.body as string) || "";
    const imgUrl = (parsed.imageUrl as string) || (parsed.image as string) || "";
    return `
      <div style="width:800px;background:${bg};padding:24px;font-family:sans-serif;">
        ${imgUrl ? `<img src="${imgUrl}" crossorigin="anonymous" style="width:100%;max-height:160px;object-fit:cover;border-radius:6px;margin-bottom:12px;" />` : ""}
        ${title ? `<h2 style="color:${textColor};font-size:22px;margin:0 0 8px;">${title}</h2>` : ""}
        ${desc ? `<p style="color:#c8b89a;font-size:14px;margin:0;line-height:1.5;">${desc.slice(0, 120)}</p>` : ""}
      </div>
    `;
  }

  if (block.blockType === "doc") {
    const label = (parsed.label as string) || (parsed.title as string) || "";
    const url = (parsed.url as string) || "";
    return `
      <div style="width:800px;background:${bg};padding:24px;font-family:sans-serif;display:flex;align-items:center;gap:16px;">
        <span style="font-size:32px;">📄</span>
        <div>
          ${label ? `<p style="color:${textColor};font-size:16px;margin:0 0 4px;font-weight:600;">${label}</p>` : ""}
          ${url ? `<p style="color:#5a4a3a;font-size:12px;margin:0;">${url.split("/").pop()?.split("?")[0] ?? ""}</p>` : ""}
        </div>
      </div>
    `;
  }

  // text (default)
  const heading = (parsed.heading as string) || (parsed.title as string) || "";
  const body = (parsed.body as string) || (parsed.text as string) || "";
  return `
    <div style="width:800px;background:${bg};padding:32px;font-family:sans-serif;">
      ${heading ? `<h1 style="color:${textColor};font-size:28px;margin:0 0 16px;line-height:1.2;">${heading}</h1>` : ""}
      ${body ? `<p style="color:#c8b89a;font-size:15px;margin:0;line-height:1.6;">${body.slice(0, 200)}</p>` : ""}
    </div>
  `;
}
