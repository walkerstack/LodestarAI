/**
 * MirrorEditor — /studio/mirror/:pageSlug
 *
 * One screen to edit and publish.
 *
 * Phone layout:
 *   Top: live page preview (scrollable, blocks tappable)
 *   Drag handle: resize the split
 *   Bottom: block list with drag-to-reorder, tap to open inline editor, Add Block, Publish All
 *
 * Desktop layout (≥768px):
 *   Left: live page preview (scrollable, blocks tappable)
 *   Right: block list + inline editor (380px fixed)
 *
 * Tap any block in the preview → it glows orange → inline editor opens
 * Tap any block in the list → same
 * Drag handle in list → reorder
 * Delete button → in inline editor header (already built)
 * Add Block → appends a new text block at the end
 * Publish All → publishes every draft on this page
 */

import { useState, useCallback, useRef, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import StudioSiteBannerManager from "@/components/studio/StudioSiteBannerManager";
import StudioLearningMatrix from "@/components/studio/StudioLearningMatrix";
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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import InlineBlockEditor from "@/components/InlineBlockEditor";
import type { ContentBlock } from "../../../drizzle/schema";

// ── Types ────────────────────────────────────────────────────────────────────

type Block = ContentBlock;

// ── Helpers ──────────────────────────────────────────────────────────────────

function blockPreview(block: Block): string {
  try {
    const p = JSON.parse(block.content);
    if (block.blockType === "text") return (p.heading || p.title || p.body || "").slice(0, 80);
    if (block.blockType === "card") return (p.title || p.heading || p.description || "").slice(0, 80);
    if (block.blockType === "image") return p.alt || p.caption || "Image";
    if (block.blockType === "video") return "Video";
    if (block.blockType === "carousel") return `Carousel (${(p.items || []).length} items)`;
    if (block.blockType === "rule-card") return `Rule cards (${(p.items || []).length} items)`;
    if (block.blockType === "sticker") return "Sticker";
    if (block.blockType === "doc") return p.label || p.title || "Document";
  } catch {}
  return block.blockType;
}

const TYPE_COLORS: Record<string, string> = {
  text: "#4a9eff",
  card: "#E8520A",
  doc: "#7ecb8f",
  image: "#c47eff",
  video: "#ff9f43",
  carousel: "#ff6b9d",
  "rule-card": "#ffd93d",
  sticker: "#6bcb77",
};

// ── Sortable block row in the editor panel ────────────────────────────────────

function SortableBlockRow({
  block,
  isSelected,
  onSelect,
}: {
  block: Block;
  isSelected: boolean;
  onSelect: (block: Block) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: block.id });

  const isDraft =
    block.status === "draft" ||
    (block.draftContent && block.draftContent !== block.content);

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition ?? "border-color 0.15s, background 0.15s",
        opacity: isDragging ? 0.4 : 1,
        background: isSelected ? "#1a1208" : "#130f0a",
        border: isSelected
          ? "1px solid #E8520A"
          : isDraft
          ? "1px solid #E8520A44"
          : "1px solid #2a2218",
        borderRadius: "8px",
        padding: "0.75rem 0.875rem",
        display: "flex",
        alignItems: "center",
        gap: "0.625rem",
        marginBottom: "0.375rem",
        cursor: "pointer",
      }}
      onClick={() => onSelect(block)}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()}
        style={{
          cursor: "grab",
          color: "#4a3a2a",
          fontSize: "1rem",
          userSelect: "none",
          flexShrink: 0,
          padding: "0.2rem",
          touchAction: "none",
        }}
        title="Drag to reorder"
      >
        ⠿
      </div>

      {/* Type badge */}
      <span
        style={{
          fontSize: "0.6rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: TYPE_COLORS[block.blockType] ?? "#8a7a6a",
          fontFamily: "'DM Sans', sans-serif",
          background: "#1a1208",
          padding: "0.15rem 0.4rem",
          borderRadius: "4px",
          flexShrink: 0,
        }}
      >
        {block.blockType}
      </span>

      {/* Draft badge */}
      {isDraft && (
        <span
          style={{
            fontSize: "0.55rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#E8520A",
            fontFamily: "'DM Sans', sans-serif",
            background: "#E8520A18",
            border: "1px solid #E8520A44",
            padding: "0.1rem 0.35rem",
            borderRadius: "4px",
            flexShrink: 0,
          }}
        >
          draft
        </span>
      )}

      {/* Preview text */}
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.8rem",
          color: "#c8b89a",
          flex: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {blockPreview(block) || <em style={{ color: "#5a4a3a" }}>empty</em>}
      </span>

      {/* Selected indicator */}
      {isSelected && (
        <span style={{ color: "#E8520A", fontSize: "0.75rem", flexShrink: 0 }}>✎</span>
      )}
    </div>
  );
}

// ── Live preview panel ────────────────────────────────────────────────────────

function LivePreview({
  pageSlug,
  pagePath,
  selectedBlockId,
  onBlockTap,
  refreshKey,
}: {
  pageSlug: string;
  pagePath: string;
  selectedBlockId: number | null;
  onBlockTap: (blockId: number) => void;
  refreshKey: number;
}) {
  // We use an iframe pointing at the live page so it renders exactly as visitors see it.
  // We pass a ?mirror=1 param so the page knows not to show the STUDIO overlay buttons
  // (which would be confusing in the mirror view).
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // When refreshKey changes (after a save/publish), reload the iframe
  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.src = `${pagePath}?mirror=1&t=${Date.now()}`;
    }
  }, [refreshKey, pagePath]);

  // Listen for messages from the iframe when a block is tapped
  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data?.type === "MIRROR_BLOCK_TAP" && typeof e.data.blockId === "number") {
        onBlockTap(e.data.blockId);
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onBlockTap]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        background: "#080604",
        overflow: "hidden",
      }}
    >
      <iframe
        ref={iframeRef}
        src={`${pagePath}?mirror=1`}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
        }}
        title={`Live preview: ${pageSlug}`}
      />

      {/* Overlay label */}
      <div
        style={{
          position: "absolute",
          top: "0.5rem",
          left: "0.5rem",
          background: "#E8520A",
          color: "#fff",
          fontSize: "0.6rem",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "0.2rem 0.5rem",
          borderRadius: "4px",
          pointerEvents: "none",
        }}
      >
        Live Preview
      </div>
    </div>
  );
}

// ── Add Block panel ───────────────────────────────────────────────────────────

function AddBlockPanel({
  pageSlug,
  nextPosition,
  onAdded,
  onCancel,
}: {
  pageSlug: string;
  nextPosition: number;
  onAdded: () => void;
  onCancel: () => void;
}) {
  const utils = trpc.useUtils();
  const [blockType, setBlockType] = useState<"text" | "card" | "doc" | "image">("text");
  const [heading, setHeading] = useState("");

  const createMutation = trpc.studio.createBlock.useMutation({
    onSuccess: () => {
      utils.studio.getDraftBlocks.invalidate({ pageSlug });
      toast.success("Block added");
      onAdded();
    },
    onError: () => toast.error("Could not add block"),
  });

  const handleAdd = () => {
    const defaultContent: Record<string, unknown> = {};
    if (blockType === "text") defaultContent.heading = heading || "New heading";
    if (blockType === "card") defaultContent.title = heading || "New card";
    if (blockType === "image") defaultContent.url = "";
    if (blockType === "doc") defaultContent.label = heading || "New document";

    createMutation.mutate({
      pageSlug,
      blockType,
      position: nextPosition,
      content: JSON.stringify(defaultContent),
    });
  };

  return (
    <div
      style={{
        background: "#0d0a07",
        border: "1px solid #E8520A44",
        borderRadius: "10px",
        padding: "1rem",
        marginBottom: "0.75rem",
      }}
    >
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#c8b89a", margin: "0 0 0.75rem" }}>
        Add a new block at the end of this page
      </p>

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
        {(["text", "card", "image", "doc"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setBlockType(t)}
            style={{
              background: blockType === t ? "#E8520A" : "transparent",
              border: `1px solid ${blockType === t ? "#E8520A" : "#2a2218"}`,
              borderRadius: "6px",
              color: blockType === t ? "#fff" : "#8a7a6a",
              fontSize: "0.75rem",
              fontFamily: "'DM Sans', sans-serif",
              padding: "0.3rem 0.6rem",
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {(blockType === "text" || blockType === "card" || blockType === "doc") && (
        <input
          type="text"
          placeholder={blockType === "text" ? "Heading (optional)" : blockType === "card" ? "Card title" : "Document label"}
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          style={{
            width: "100%",
            background: "#130f0a",
            border: "1px solid #2a2218",
            borderRadius: "6px",
            color: "#f0e8d8",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.875rem",
            padding: "0.5rem 0.75rem",
            marginBottom: "0.75rem",
            boxSizing: "border-box",
          }}
        />
      )}

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={onCancel}
          style={{
            flex: 1,
            background: "transparent",
            border: "1px solid #2a2218",
            borderRadius: "8px",
            color: "#8a7a6a",
            padding: "0.6rem",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.8rem",
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleAdd}
          disabled={createMutation.isPending}
          style={{
            flex: 2,
            background: "#E8520A",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
            padding: "0.6rem",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.8rem",
            fontWeight: 700,
            opacity: createMutation.isPending ? 0.7 : 1,
          }}
        >
          {createMutation.isPending ? "Adding…" : "Add Block"}
        </button>
      </div>
    </div>
  );
}

// ── Main MirrorEditor ─────────────────────────────────────────────────────────

export default function MirrorEditor() {
  const params = useParams<{ pageSlug: string }>();
  const pageSlug = params.pageSlug ?? "";
  const [, setLocation] = useLocation();

  const utils = trpc.useUtils();

  // Fetch page metadata to get the path
  const { data: pageList } = trpc.studio.getPageList.useQuery();
  const page = pageList?.find((p) => p.slug === pageSlug);

  // Fetch draft blocks
  const { data: blocks, isLoading } = trpc.studio.getDraftBlocks.useQuery(
    { pageSlug },
    { enabled: !!pageSlug }
  );

  // Auth check
  const { data: me } = trpc.auth.me.useQuery();

  // Local state
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [showAddBlock, setShowAddBlock] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState<"page" | "banner" | "matrix">("page");

  // Resizable split — phone: top panel height as % of viewport
  const [splitPct, setSplitPct] = useState(50);
  const isDraggingHandle = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Mutations
  const reorderMutation = trpc.studio.reorderBlocks.useMutation({
    onSuccess: () => {
      utils.studio.getDraftBlocks.invalidate({ pageSlug });
      setRefreshKey((k) => k + 1);
    },
    onError: () => toast.error("Failed to reorder"),
  });

  const publishAllMutation = trpc.studio.publishAllDrafts.useMutation({
    onSuccess: () => {
      utils.studio.getDraftBlocks.invalidate({ pageSlug });
      utils.studio.getPublishedBlocks.invalidate({ pageSlug });
      setRefreshKey((k) => k + 1);
      toast.success("All drafts published — page is now live");
    },
    onError: () => toast.error("Failed to publish"),
  });

  // Drag-to-reorder handler
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id || !blocks) return;
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return;
      const reordered = arrayMove(blocks as Block[], oldIndex, newIndex);
      reorderMutation.mutate({ pageSlug, orderedIds: reordered.map((b) => b.id) });
    },
    [blocks, pageSlug, reorderMutation]
  );

  // When a block is tapped in the preview iframe
  const handleBlockTap = useCallback(
    (blockId: number) => {
      const block = (blocks as Block[] | undefined)?.find((b) => b.id === blockId);
      if (block) setSelectedBlock(block);
    },
    [blocks]
  );

  // Resizable handle — mouse
  const handleHandleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingHandle.current = true;
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingHandle.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = ((e.clientY - rect.top) / rect.height) * 100;
      setSplitPct(Math.min(80, Math.max(20, pct)));
    };
    const onMouseUp = () => { isDraggingHandle.current = false; };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  // Resizable handle — touch
  useEffect(() => {
    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingHandle.current || !containerRef.current) return;
      e.preventDefault();
      const rect = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      const pct = ((touch.clientY - rect.top) / rect.height) * 100;
      setSplitPct(Math.min(80, Math.max(20, pct)));
    };
    const onTouchEnd = () => { isDraggingHandle.current = false; };
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [])

  // Auth guard
  if (!me || me.role !== "admin") {
    return (
      <div style={{ minHeight: "100vh", background: "#080604", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8a7a6a" }}>Not authorised</p>
      </div>
    );
  }

  const blockList = (blocks as Block[] | undefined) ?? [];
  const draftCount = blockList.filter(
    (b) => b.status === "draft" || (b.draftContent && b.draftContent !== b.content)
  ).length;

  const pagePath = page?.path ?? `/${pageSlug}`;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080604",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Top bar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.625rem 1rem",
          background: "#0d0a07",
          borderBottom: "1px solid #2a2218",
          flexShrink: 0,
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setLocation("/studio")}
          style={{
            background: "transparent",
            border: "1px solid #2a2218",
            borderRadius: "6px",
            color: "#8a7a6a",
            padding: "0.35rem 0.7rem",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.75rem",
          }}
        >
          ← Studio
        </button>

        {/* Tabs */}
        {(["page", "banner", "matrix"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: activeTab === tab ? "#E8520A" : "transparent",
              border: `1px solid ${activeTab === tab ? "#E8520A" : "#2a2218"}`,
              borderRadius: "6px",
              color: activeTab === tab ? "#fff" : "#8a7a6a",
              padding: "0.35rem 0.7rem",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.75rem",
              fontWeight: activeTab === tab ? 700 : 400,
              textTransform: "capitalize",
            }}
          >
            {tab === "page" ? "Page" : tab === "banner" ? "Banner" : "Matrix"}
          </button>
        ))}

        <div style={{ flex: 1 }}>
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1rem",
              color: "#f0e8d8",
            }}
          >
            {page?.label ?? pageSlug}
          </span>
          {draftCount > 0 && (
            <span
              style={{
                marginLeft: "0.5rem",
                background: "#E8520A22",
                color: "#E8520A",
                fontSize: "0.65rem",
                fontFamily: "'DM Sans', sans-serif",
                padding: "0.1rem 0.4rem",
                borderRadius: "4px",
              }}
            >
              {draftCount} draft{draftCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        <button
          onClick={() => publishAllMutation.mutate({ pageSlug })}
          disabled={publishAllMutation.isPending || draftCount === 0}
          style={{
            background: draftCount > 0 ? "#E8520A" : "#1a1208",
            border: "none",
            borderRadius: "8px",
            color: draftCount > 0 ? "#fff" : "#3a2a1a",
            padding: "0.5rem 1rem",
            cursor: draftCount > 0 ? "pointer" : "default",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.8rem",
            fontWeight: 700,
            opacity: publishAllMutation.isPending ? 0.7 : 1,
            transition: "background 0.15s",
          }}
        >
          {publishAllMutation.isPending ? "Publishing…" : `Publish All${draftCount > 0 ? ` (${draftCount})` : ""}`}
        </button>
      </div>

      {/* ── Banner tab ── */}
      {activeTab === "banner" && (
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem", background: "#080604" }}>
          <StudioSiteBannerManager />
        </div>
      )}

      {/* ── Learning Matrix tab ── */}
      {activeTab === "matrix" && (
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem", background: "#080604" }}>
          <StudioLearningMatrix />
        </div>
      )}

      {/* ── Main split area (Page tab) ── */}
      {activeTab === "page" && (<div
        ref={containerRef}
        className="mirror-editor-body"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Live preview (top on phone, left on desktop) */}
        <div
          className="mirror-preview-pane"
          style={{ height: `${splitPct}%`, flexShrink: 0, overflow: "hidden" }}
        >
          <LivePreview
            pageSlug={pageSlug}
            pagePath={pagePath}
            selectedBlockId={selectedBlock?.id ?? null}
            onBlockTap={handleBlockTap}
            refreshKey={refreshKey}
          />
        </div>

        {/* Drag handle */}
        <div
          onMouseDown={handleHandleMouseDown}
          onTouchStart={(e) => { e.preventDefault(); isDraggingHandle.current = true; }}
          style={{
            height: "10px",
            background: "#0d0a07",
            borderTop: "1px solid #2a2218",
            borderBottom: "1px solid #2a2218",
            cursor: "row-resize",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            userSelect: "none",
            touchAction: "none",
          }}
        >
          <div style={{ width: "40px", height: "3px", borderRadius: "2px", background: "#3a2a1a" }} />
        </div>

        {/* Editor panel (bottom on phone, right on desktop) */}
        <div
          className="mirror-editor-pane"
          style={{
            flex: 1,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            background: "#080604",
          }}
        >
          {/* Panel header */}
          <div
            style={{
              padding: "0.625rem 1rem",
              borderBottom: "1px solid #1a1208",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                color: "#8a7a6a",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {isLoading ? "Loading…" : `${blockList.length} block${blockList.length !== 1 ? "s" : ""}`}
            </span>
            <button
              onClick={() => { setShowAddBlock((v) => !v); setSelectedBlock(null); }}
              style={{
                background: showAddBlock ? "#E8520A22" : "transparent",
                border: "1px solid #E8520A88",
                borderRadius: "6px",
                color: "#E8520A",
                padding: "0.3rem 0.7rem",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 600,
              }}
            >
              + Add Block
            </button>
          </div>

          {/* Scrollable block list */}
          <div style={{ flex: 1, overflowY: "auto", padding: "0.75rem 1rem" }}>
            {showAddBlock && (
              <AddBlockPanel
                pageSlug={pageSlug}
                nextPosition={blockList.length}
                onAdded={() => { setShowAddBlock(false); setRefreshKey((k) => k + 1); }}
                onCancel={() => setShowAddBlock(false)}
              />
            )}

            {isLoading ? (
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#5a4a3a", fontSize: "0.875rem" }}>
                Loading blocks…
              </p>
            ) : blockList.length === 0 ? (
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#5a4a3a", fontSize: "0.875rem" }}>
                No blocks yet. Tap + Add Block to start.
              </p>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={blockList.map((b) => b.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {blockList.map((block) => (
                    <SortableBlockRow
                      key={block.id}
                      block={block}
                      isSelected={selectedBlock?.id === block.id}
                      onSelect={(b) => {
                        setSelectedBlock(b);
                        setShowAddBlock(false);
                      }}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            )}
          </div>
        </div>

        {/* ── Inline editor (slides up over everything when a block is selected) ── */}
        {selectedBlock && (
          <InlineBlockEditor
            block={selectedBlock}
            onClose={() => setSelectedBlock(null)}
            onSaved={() => {
              utils.studio.getDraftBlocks.invalidate({ pageSlug });
              setRefreshKey((k) => k + 1);
              setSelectedBlock(null);
            }}
          />
        )}
      </div>)}

      {/* Desktop layout overrides */}
      <style>{`
        @media (min-width: 768px) {
          .mirror-editor-body {
            flex-direction: row !important;
          }
          .mirror-preview-pane {
            height: 100% !important;
            width: 60% !important;
            flex-shrink: 0 !important;
            border-right: 1px solid #2a2218;
          }
          .mirror-editor-pane {
            width: 40% !important;
          }
        }
      `}</style>
    </div>
  );
}
