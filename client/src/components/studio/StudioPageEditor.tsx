/**
 * StudioPageEditor
 * Shows all content blocks for a page.
 * Supports: view, edit, delete, drag-to-reorder, create new block, mirror.
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

type Page = { slug: string; label: string; path: string };
type Block = {
  id: number;
  pageSlug: string;
  blockType: "text" | "card" | "doc" | "image";
  position: number;
  content: string;
  isMirror: boolean;
  mirrorSourceId: number | null;
};

// ── Sortable Block Item ──────────────────────────────────────────────────
function SortableBlock({
  block,
  onEdit,
  onDelete,
  onMirror,
}: {
  block: Block;
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

  let contentPreview = "";
  try {
    const parsed = JSON.parse(block.content);
    if (block.blockType === "text") contentPreview = parsed.body?.slice(0, 80) ?? parsed.heading ?? "";
    if (block.blockType === "card") contentPreview = parsed.title ?? "";
    if (block.blockType === "doc") contentPreview = parsed.label ?? "";
    if (block.blockType === "image") contentPreview = parsed.alt ?? parsed.url?.split("/").pop() ?? "";
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
        border: "1px solid #2a2218",
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

// ── Main Component ───────────────────────────────────────────────────────
export default function StudioPageEditor({ page, onBack }: { page: Page; onBack: () => void }) {
  const utils = trpc.useUtils();
  const [editingBlock, setEditingBlock] = useState<Block | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [mirrorTarget, setMirrorTarget] = useState<{ blockId: number } | null>(null);
  const [mirrorPageSlug, setMirrorPageSlug] = useState("");

  const { data: blocks, isLoading } = trpc.studio.getBlocks.useQuery({ pageSlug: page.slug });
  const { data: pageList } = trpc.studio.getPageList.useQuery();

  const reorderMutation = trpc.studio.reorderBlocks.useMutation({
    onSuccess: () => utils.studio.getBlocks.invalidate({ pageSlug: page.slug }),
    onError: () => toast.error("Failed to reorder blocks"),
  });

  const deleteMutation = trpc.studio.deleteBlock.useMutation({
    onSuccess: () => {
      utils.studio.getBlocks.invalidate({ pageSlug: page.slug });
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

  return (
    <div>
      {/* Back + page header */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
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
        <div>
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
      </div>

      {/* Block list */}
      {isLoading ? (
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
            No Studio blocks on this page yet. Add one below.
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
                  onEdit={setEditingBlock}
                  onDelete={handleDelete}
                  onMirror={(id) => setMirrorTarget({ blockId: id })}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Add block button */}
      {!showCreateForm && !editingBlock && (
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
            utils.studio.getBlocks.invalidate({ pageSlug: page.slug });
          }}
          onCancel={() => setShowCreateForm(false)}
          nextPosition={blocks ? blocks.length : 0}
        />
      )}

      {/* Edit form */}
      {editingBlock && (
        <StudioBlockForm
          pageSlug={page.slug}
          mode="edit"
          block={editingBlock}
          onDone={() => {
            setEditingBlock(null);
            utils.studio.getBlocks.invalidate({ pageSlug: page.slug });
          }}
          onCancel={() => setEditingBlock(null)}
          nextPosition={0}
        />
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
                style={{ background: "transparent", border: "1px solid #2a2218", borderRadius: "6px", color: "#8a7a6a", padding: "0.5rem 1rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem" }}
              >
                Cancel
              </button>
              <button
                onClick={handleMirrorConfirm}
                disabled={!mirrorPageSlug || mirrorMutation.isPending}
                style={{ background: "#E8520A", border: "none", borderRadius: "6px", color: "#fff", padding: "0.5rem 1rem", cursor: mirrorPageSlug ? "pointer" : "not-allowed", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", opacity: mirrorPageSlug ? 1 : 0.5 }}
              >
                {mirrorMutation.isPending ? "Mirroring…" : "Mirror Block"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
