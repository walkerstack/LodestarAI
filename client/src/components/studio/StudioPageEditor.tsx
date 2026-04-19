/**
 * StudioPageEditor
 * Shows all content blocks for a page.
 * Supports: view, edit, delete, drag-to-reorder, create new block, mirror.
 * Build 3: Live/Draft lens toggle, Publish All, draft badges per block.
 */

import { useState, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
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
import StudioBlockForm from "./StudioBlockForm";
import PageOverview from "./PageOverview";

type Page = { slug: string; label: string; path: string };
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

type Lens = "live" | "draft";

// ── Sortable Block Item ──────────────────────────────────────────────────
function SortableBlock({
  block,
  lens,
  onEdit,
  onDelete,
  onMirror,
}: {
  block: Block;
  lens: Lens;
  onEdit: (block: Block) => void;
  onDelete: (id: number) => void;
  onMirror: (id: number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const isDraft = block.status === "draft" || (block.draftContent && block.draftContent !== block.content);

  let contentPreview = "";
  try {
    const parsed = JSON.parse(block.content);
    if (block.blockType === "text") {
      contentPreview = (parsed.heading || parsed.title || "") + (parsed.body ? " — " + parsed.body.slice(0, 60) : "");
      contentPreview = contentPreview.trim().replace(/^\s*—\s*/, "").slice(0, 90);
    }
    if (block.blockType === "card") {
      contentPreview = parsed.title ?? parsed.heading ?? parsed.name ?? "";
      if (!contentPreview && parsed.description) contentPreview = parsed.description.slice(0, 60);
      if (!contentPreview && parsed.body) contentPreview = parsed.body.slice(0, 60);
    }
    if (block.blockType === "doc") {
      contentPreview = parsed.label ?? parsed.title ?? parsed.name ?? "";
      if (!contentPreview && parsed.url) contentPreview = parsed.url.split("/").pop() ?? "";
    }
    if (block.blockType === "image") {
      contentPreview = parsed.alt ?? "";
      if (!contentPreview && parsed.url) contentPreview = parsed.url.split("/").pop()?.split("?")[0] ?? "";
    }
  } catch {}

  const typeColors: Record<string, string> = {
    text: "#4a9eff",
    card: "#E8520A",
    doc: "#7ecb8f",
    image: "#c47eff",
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        background: "#130f0a",
        border: isDraft && lens === "draft" ? "1px solid #E8520A55" : "1px solid #2a2218",
        borderRadius: "8px",
        padding: "0.875rem 1rem",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "0.5rem",
      }}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        style={{
          cursor: "grab",
          color: "#4a3a2a",
          fontSize: "1.1rem",
          userSelect: "none",
          flexShrink: 0,
          padding: "0.25rem",
        }}
        title="Drag to reorder"
      >
        ⠿
      </div>

      {/* Block type badge */}
      <span
        style={{
          fontSize: "0.65rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: typeColors[block.blockType] ?? "#8a7a6a",
          fontFamily: "'DM Sans', sans-serif",
          background: "#1a1208",
          padding: "0.2rem 0.5rem",
          borderRadius: "4px",
          flexShrink: 0,
        }}
      >
        {block.blockType}
      </span>

      {/* Draft badge — only shown in draft lens */}
      {isDraft && lens === "draft" && (
        <span
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#E8520A",
            fontFamily: "'DM Sans', sans-serif",
            background: "#E8520A18",
            border: "1px solid #E8520A44",
            padding: "0.15rem 0.4rem",
            borderRadius: "4px",
            flexShrink: 0,
          }}
        >
          draft
        </span>
      )}

      {/* Content preview */}
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.875rem",
          color: "#c8b89a",
          flex: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {contentPreview || <em style={{ color: "#5a4a3a" }}>empty</em>}
      </span>

      {block.isMirror && (
        <span style={{ fontSize: "0.65rem", color: "#5a4a3a", fontFamily: "'DM Sans', sans-serif", flexShrink: 0 }}>
          mirror
        </span>
      )}

      {/* Actions */}
      <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
        <ActionBtn onClick={() => onEdit(block)} label="Edit" color="#E8520A" />
        <ActionBtn onClick={() => onMirror(block.id)} label="Mirror" color="#7ecb8f" />
        <ActionBtn onClick={() => onDelete(block.id)} label="Delete" color="#ff6b6b" />
      </div>
    </div>
  );
}

function ActionBtn({ onClick, label, color }: { onClick: () => void; label: string; color: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "transparent",
        border: `1px solid ${color}44`,
        borderRadius: "4px",
        color,
        fontSize: "0.75rem",
        padding: "0.2rem 0.5rem",
        cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = `${color}22`)}
      onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}
    >
      {label}
    </button>
  );
}

// ── Lens Toggle ──────────────────────────────────────────────────────────
function LensToggle({ lens, onChange }: { lens: Lens; onChange: (l: Lens) => void }) {
  return (
    <div
      style={{
        display: "flex",
        background: "#0d0b08",
        border: "1px solid #2a2218",
        borderRadius: "6px",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {(["live", "draft"] as Lens[]).map((l) => (
        <button
          key={l}
          onClick={() => onChange(l)}
          style={{
            background: lens === l ? "#E8520A" : "transparent",
            border: "none",
            color: lens === l ? "#fff" : "#8a7a6a",
            fontSize: "0.75rem",
            fontFamily: "'DM Sans', sans-serif",
            padding: "0.35rem 0.75rem",
            cursor: "pointer",
            textTransform: "capitalize",
            transition: "background 0.15s, color 0.15s",
          }}
        >
          {l === "live" ? "Live" : "Working Draft"}
        </button>
      ))}
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────
export default function StudioPageEditor({ page, onBack }: { page: Page; onBack: () => void }) {
  const utils = trpc.useUtils();
  const [editingBlock, setEditingBlock] = useState<Block | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [mirrorTarget, setMirrorTarget] = useState<{ blockId: number } | null>(null);
  const [mirrorPageSlug, setMirrorPageSlug] = useState("");
  const [lens, setLens] = useState<Lens>("draft");
  const [showOverview, setShowOverview] = useState(false);
  const [thumbnailVersion, setThumbnailVersion] = useState(0);

  // Live lens: published blocks only
  const { data: liveBlocks, isLoading: liveLoading } = trpc.studio.getPublishedBlocks.useQuery(
    { pageSlug: page.slug },
    { enabled: lens === "live" }
  );

  // Draft lens: all blocks including drafts
  const { data: draftBlocks, isLoading: draftLoading } = trpc.studio.getDraftBlocks.useQuery(
    { pageSlug: page.slug },
    { enabled: lens === "draft" }
  );

  const blocks = (lens === "live" ? liveBlocks : draftBlocks) as Block[] | undefined;
  const isLoading = lens === "live" ? liveLoading : draftLoading;

  const draftCount = (draftBlocks as Block[] | undefined)?.filter(
    (b) => b.status === "draft" || (b.draftContent && b.draftContent !== b.content)
  ).length ?? 0;

  const { data: pageList } = trpc.studio.getPageList.useQuery();

  const publishAllMutation = trpc.studio.publishAllDrafts.useMutation({
    onSuccess: () => {
      utils.studio.getDraftBlocks.invalidate({ pageSlug: page.slug });
      utils.studio.getPublishedBlocks.invalidate({ pageSlug: page.slug });
      setThumbnailVersion((v) => v + 1);
      toast.success(`All drafts published — page is now live`);
    },
    onError: () => toast.error("Failed to publish all drafts"),
  });

  const reorderMutation = trpc.studio.reorderBlocks.useMutation({
    onSuccess: () => {
      utils.studio.getDraftBlocks.invalidate({ pageSlug: page.slug });
      utils.studio.getPublishedBlocks.invalidate({ pageSlug: page.slug });
    },
    onError: () => toast.error("Failed to reorder blocks"),
  });

  const deleteMutation = trpc.studio.deleteBlock.useMutation({
    onSuccess: () => {
      utils.studio.getDraftBlocks.invalidate({ pageSlug: page.slug });
      utils.studio.getPublishedBlocks.invalidate({ pageSlug: page.slug });
      toast.success("Block deleted");
    },
    onError: () => toast.error("Failed to delete block"),
  });

  const mirrorMutation = trpc.studio.mirrorBlock.useMutation({
    onSuccess: () => {
      setMirrorTarget(null);
      setMirrorPageSlug("");
      toast.success("Block mirrored to page");
    },
    onError: () => toast.error("Failed to mirror block"),
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id || !blocks) return;

      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return;

      const reordered = arrayMove(blocks, oldIndex, newIndex);
      reorderMutation.mutate({
        pageSlug: page.slug,
        orderedIds: reordered.map((b) => b.id),
      });
    },
    [blocks, page.slug, reorderMutation]
  );

  const handleDelete = (id: number) => {
    if (confirm("Delete this block? This cannot be undone.")) {
      deleteMutation.mutate({ id });
    }
  };

  const handleMirrorConfirm = () => {
    if (!mirrorTarget || !mirrorPageSlug) return;
    mirrorMutation.mutate({ sourceId: mirrorTarget.blockId, targetPageSlug: mirrorPageSlug });
  };

  const invalidateAll = () => {
    utils.studio.getDraftBlocks.invalidate({ pageSlug: page.slug });
    utils.studio.getPublishedBlocks.invalidate({ pageSlug: page.slug });
  };

  return (
    <div>
      {/* Back + page header + lens toggle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "transparent",
            border: "1px solid #2a2218",
            borderRadius: "6px",
            color: "#8a7a6a",
            padding: "0.4rem 0.75rem",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.8rem",
          }}
        >
          ← All Pages
        </button>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#f0e8d8", margin: 0 }}>
            {page.label}
          </h2>
          <a
            href={page.path}
            target="_blank"
            rel="noreferrer"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#5a4a3a" }}
          >
            {page.path} ↗
          </a>
        </div>

        {/* Page Overview toggle */}
        <button
          onClick={() => setShowOverview((v) => !v)}
          style={{
            background: showOverview ? "#1a1208" : "transparent",
            border: showOverview ? "1px solid #E8520A88" : "1px solid #2a2218",
            borderRadius: "6px",
            color: showOverview ? "#E8520A" : "#8a7a6a",
            fontSize: "0.75rem",
            fontFamily: "'DM Sans', sans-serif",
            padding: "0.35rem 0.75rem",
            cursor: "pointer",
            transition: "all 0.15s",
            flexShrink: 0,
          }}
          title={showOverview ? "Switch to list view" : "Switch to overview (thumbnails)"}
        >
          {showOverview ? "☰ List" : "⊞ Overview"}
        </button>

        {/* Lens toggle */}
        <LensToggle lens={lens} onChange={setLens} />

        {/* Publish All — only shown in draft lens when there are drafts */}
        {lens === "draft" && draftCount > 0 && (
          <button
            onClick={() => publishAllMutation.mutate({ pageSlug: page.slug })}
            disabled={publishAllMutation.isPending}
            style={{
              background: "#E8520A",
              border: "none",
              borderRadius: "6px",
              color: "#fff",
              fontSize: "0.8rem",
              fontFamily: "'DM Sans', sans-serif",
              padding: "0.4rem 0.875rem",
              cursor: publishAllMutation.isPending ? "not-allowed" : "pointer",
              opacity: publishAllMutation.isPending ? 0.7 : 1,
              transition: "opacity 0.15s",
              flexShrink: 0,
            }}
          >
            {publishAllMutation.isPending ? "Publishing…" : `Publish All (${draftCount})`}
          </button>
        )}
      </div>

      {/* Lens context hint */}
      {lens === "live" && (
        <div
          style={{
            background: "#0d1a0d",
            border: "1px solid #2a4a2a",
            borderRadius: "6px",
            padding: "0.5rem 0.875rem",
            marginBottom: "1rem",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.75rem",
            color: "#7ecb8f",
          }}
        >
          Live view — this is exactly what visitors see right now.
        </div>
      )}
      {lens === "draft" && draftCount > 0 && (
        <div
          style={{
            background: "#1a0d00",
            border: "1px solid #4a2a00",
            borderRadius: "6px",
            padding: "0.5rem 0.875rem",
            marginBottom: "1rem",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.75rem",
            color: "#E8520A",
          }}
        >
          {draftCount} unpublished {draftCount === 1 ? "change" : "changes"} — visitors still see the old version until you publish.
        </div>
      )}

      {/* Page Overview — thumbnail grid */}
      {showOverview && blocks && blocks.length > 0 && (
        <div style={{ marginBottom: "1.5rem" }}>
          <PageOverview
            blocks={blocks as Block[]}
            pageSlug={page.slug}
            onEdit={setEditingBlock}
            onAddBlock={() => {
              setShowOverview(false);
              setShowCreateForm(true);
            }}
            onReorder={(orderedIds) =>
              reorderMutation.mutate({ pageSlug: page.slug, orderedIds })
            }
            thumbnailVersion={thumbnailVersion}
          />
        </div>
      )}

      {/* Block list — hidden when overview is active */}
      {!showOverview && (isLoading ? (
        <p style={{ color: "#8a7a6a", fontFamily: "'DM Sans', sans-serif" }}>Loading blocks…</p>
      ) : !blocks || blocks.length === 0 ? (
        <div
          style={{
            background: "#130f0a",
            border: "1px dashed #2a2218",
            borderRadius: "8px",
            padding: "2rem",
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          <p style={{ color: "#5a4a3a", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem" }}>
            {lens === "live"
              ? "No published blocks on this page yet."
              : "No Studio blocks on this page yet. Add one below."}
          </p>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
            <div style={{ marginBottom: "1.5rem" }}>
              {blocks.map((block) => (
                <SortableBlock
                  key={block.id}
                  block={block as Block}
                  lens={lens}
                  onEdit={setEditingBlock}
                  onDelete={handleDelete}
                  onMirror={(id) => setMirrorTarget({ blockId: id })}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ))}

      {/* Add block button — only in draft lens */}
      {lens === "draft" && !showCreateForm && !editingBlock && (
        <button
          onClick={() => setShowCreateForm(true)}
          style={{
            background: "#1a1208",
            border: "1px dashed #E8520A88",
            borderRadius: "8px",
            color: "#E8520A",
            padding: "0.75rem 1.5rem",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.875rem",
            width: "100%",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#221508")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#1a1208")}
        >
          + Add Block
        </button>
      )}

      {/* Create form */}
      {showCreateForm && (
        <StudioBlockForm
          pageSlug={page.slug}
          mode="create"
          onDone={() => {
            setShowCreateForm(false);
            invalidateAll();
          }}
          onCancel={() => setShowCreateForm(false)}
          nextPosition={blocks ? blocks.length : 0}
        />
      )}

      {/* Edit form — full-screen modal */}
      {editingBlock && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#000000cc",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            zIndex: 200,
            overflowY: "auto",
            padding: "1rem",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setEditingBlock(null); }}
        >
          <div
            style={{
              width: "min(900px, 100%)",
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
          >
            <StudioBlockForm
              pageSlug={page.slug}
              mode="edit"
              block={editingBlock}
              onDone={() => {
                setEditingBlock(null);
                invalidateAll();
              }}
              onCancel={() => setEditingBlock(null)}
              nextPosition={0}
            />
          </div>
        </div>
      )}

      {/* Mirror modal */}
      {mirrorTarget && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#000000aa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
        >
          <div
            style={{
              background: "#130f0a",
              border: "1px solid #2a2218",
              borderRadius: "12px",
              padding: "2rem",
              width: "min(480px, 90vw)",
            }}
          >
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#f0e8d8", marginBottom: "1rem", fontSize: "1.1rem" }}>
              Mirror block to another page
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8a7a6a", fontSize: "0.875rem", marginBottom: "1rem" }}>
              The block will appear at the bottom of the selected page. Same content, no rebuild needed.
            </p>
            <select
              value={mirrorPageSlug}
              onChange={(e) => setMirrorPageSlug(e.target.value)}
              style={{
                width: "100%",
                background: "#0d0b08",
                border: "1px solid #2a2218",
                borderRadius: "6px",
                color: "#e8ddd0",
                padding: "0.5rem 0.75rem",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.875rem",
                marginBottom: "1.25rem",
              }}
            >
              <option value="">— Select a page —</option>
              {(pageList ?? [])
                .filter((p) => p.slug !== page.slug)
                .map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.label}
                  </option>
                ))}
            </select>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
              <button
                onClick={() => { setMirrorTarget(null); setMirrorPageSlug(""); }}
                style={{
                  background: "transparent",
                  border: "1px solid #2a2218",
                  borderRadius: "6px",
                  color: "#8a7a6a",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.875rem",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleMirrorConfirm}
                disabled={!mirrorPageSlug}
                style={{
                  background: mirrorPageSlug ? "#7ecb8f" : "#2a2218",
                  border: "none",
                  borderRadius: "6px",
                  color: mirrorPageSlug ? "#0a1a0a" : "#5a4a3a",
                  padding: "0.5rem 1rem",
                  cursor: mirrorPageSlug ? "pointer" : "not-allowed",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                }}
              >
                Mirror Block
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
