/**
 * StudioPageBuilder — Tab 6 in Studio
 *
 * Two modes:
 * 1. MY PAGES — list of pages you created in Studio (database-driven)
 *    - See all your custom pages
 *    - Click to open block editor for that page
 *    - Toggle published / unpublished
 *    - Delete a page
 *
 * 2. NEW PAGE — create a page from a template
 *    - Pick template: blank, article, lens, card-grid
 *    - Set title, URL slug, nav category
 *    - Creates page + seeds starter blocks
 *    - Opens block editor immediately
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import StudioPageEditor from "./StudioPageEditor";

type Template = "blank" | "article" | "lens" | "card-grid";

interface StudioPage {
  id: number;
  slug: string;
  label: string;
  path: string;
  template: Template;
  isPublished: boolean;
  navCategory: string | null;
}

const NAV_CATEGORIES = [
  { value: "", label: "— Not in nav —" },
  { value: "who-are-you", label: "Who Are You?" },
  { value: "foundation", label: "Foundation" },
  { value: "for-you", label: "For You" },
  { value: "tools", label: "Tools" },
  { value: "research", label: "Research" },
];

const TEMPLATES: { id: Template; label: string; desc: string; icon: string }[] = [
  {
    id: "blank",
    label: "Blank Page",
    desc: "Start from scratch. Add any blocks you want.",
    icon: "□",
  },
  {
    id: "article",
    label: "Article",
    desc: "Heading, intro text, body sections. Good for essays and explanations.",
    icon: "≡",
  },
  {
    id: "lens",
    label: "Lens Page",
    desc: "Intro card, three-voice sections (everyday, professional, watcher), learning flow.",
    icon: "◎",
  },
  {
    id: "card-grid",
    label: "Card Grid",
    desc: "A grid of cards with images, titles, descriptions, and links.",
    icon: "⊞",
  },
];

const inputStyle: React.CSSProperties = {
  background: "#0d0b08",
  border: "1px solid #2a2218",
  borderRadius: "6px",
  color: "#e8ddd0",
  padding: "0.55rem 0.75rem",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.9rem",
  width: "100%",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.8rem",
  color: "#8a7a6a",
  marginBottom: "0.35rem",
  display: "block",
};

export default function StudioPageBuilder() {
  const utils = trpc.useUtils();
  const [mode, setMode] = useState<"list" | "new">("list");
  const [editingPage, setEditingPage] = useState<{ slug: string; label: string; path: string } | null>(null);

  // New page form state
  const [newLabel, setNewLabel] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newTemplate, setNewTemplate] = useState<Template>("blank");
  const [newNavCategory, setNewNavCategory] = useState("");

  const { data: pages, isLoading } = trpc.studio.getStudioPages.useQuery();

  const createMutation = trpc.studio.createStudioPage.useMutation({
    onSuccess: () => {
      utils.studio.getStudioPages.invalidate();
      toast.success("Page created");
      // Open the new page in the block editor
      const path = `/${newSlug}`;
      setEditingPage({ slug: newSlug, label: newLabel, path });
      setMode("list");
      setNewLabel("");
      setNewSlug("");
      setNewTemplate("blank");
      setNewNavCategory("");
    },
    onError: (e) => toast.error(`Failed: ${e.message}`),
  });

  const updateMutation = trpc.studio.updateStudioPage.useMutation({
    onSuccess: () => {
      utils.studio.getStudioPages.invalidate();
      toast.success("Page updated");
    },
    onError: (e) => toast.error(`Failed: ${e.message}`),
  });

  const deleteMutation = trpc.studio.deleteStudioPage.useMutation({
    onSuccess: () => {
      utils.studio.getStudioPages.invalidate();
      toast.success("Page deleted");
    },
    onError: (e) => toast.error(`Failed: ${e.message}`),
  });

  // Auto-generate slug from label
  function handleLabelChange(val: string) {
    setNewLabel(val);
    const slug = val
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    setNewSlug(slug);
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newLabel.trim() || !newSlug.trim()) {
      toast.error("Title and URL are required");
      return;
    }
    createMutation.mutate({
      slug: newSlug,
      label: newLabel,
      path: `/${newSlug}`,
      template: newTemplate,
      navCategory: newNavCategory || undefined,
      isPublished: false,
    });
  }

  // If editing a page, show the block editor
  if (editingPage) {
    return (
      <StudioPageEditor
        page={editingPage}
        onBack={() => setEditingPage(null)}
      />
    );
  }

  return (
    <div>
      {/* Mode switcher */}
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2rem" }}>
        <button
          onClick={() => setMode("list")}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.875rem",
            padding: "0.6rem 1.25rem",
            borderRadius: "6px",
            border: mode === "list" ? "1px solid #E8520A" : "1px solid #2a2218",
            background: mode === "list" ? "#1a0e06" : "transparent",
            color: mode === "list" ? "#E8520A" : "#8a7a6a",
            cursor: "pointer",
          }}
        >
          My Pages
        </button>
        <button
          onClick={() => setMode("new")}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.875rem",
            padding: "0.6rem 1.25rem",
            borderRadius: "6px",
            border: mode === "new" ? "1px solid #E8520A" : "1px solid #2a2218",
            background: mode === "new" ? "#1a0e06" : "transparent",
            color: mode === "new" ? "#E8520A" : "#8a7a6a",
            cursor: "pointer",
          }}
        >
          + New Page
        </button>
      </div>

      {/* ── MY PAGES ── */}
      {mode === "list" && (
        <div>
          {isLoading && (
            <p style={{ color: "#8a7a6a", fontFamily: "'DM Sans', sans-serif" }}>Loading…</p>
          )}
          {!isLoading && (!pages || pages.length === 0) && (
            <div
              style={{
                background: "#130f0a",
                border: "1px solid #2a2218",
                borderRadius: "10px",
                padding: "2.5rem",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.25rem",
                  color: "#c8b89a",
                  marginBottom: "0.75rem",
                }}
              >
                No custom pages yet
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.875rem",
                  color: "#5a4a3a",
                  marginBottom: "1.5rem",
                }}
              >
                Create your first page from a template. It will appear here and in the site nav.
              </p>
              <button
                onClick={() => setMode("new")}
                style={{
                  background: "#E8520A",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "0.65rem 1.5rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                + Create First Page
              </button>
            </div>
          )}
          {!isLoading && pages && pages.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {(pages as StudioPage[]).map((page) => (
                <div
                  key={page.id}
                  style={{
                    background: "#130f0a",
                    border: "1px solid #2a2218",
                    borderRadius: "8px",
                    padding: "1rem 1.25rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  {/* Status dot */}
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: page.isPublished ? "#4caf50" : "#5a4a3a",
                      flexShrink: 0,
                    }}
                  />

                  {/* Page info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.95rem",
                        color: "#e8ddd0",
                        fontWeight: 500,
                      }}
                    >
                      {page.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.75rem",
                        color: "#5a4a3a",
                        marginTop: "0.15rem",
                      }}
                    >
                      {page.path}
                      {page.navCategory && (
                        <span style={{ marginLeft: "0.5rem", color: "#8a7a6a" }}>
                          · {NAV_CATEGORIES.find((c) => c.value === page.navCategory)?.label ?? page.navCategory}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                    <button
                      onClick={() =>
                        setEditingPage({ slug: page.slug, label: page.label, path: page.path })
                      }
                      style={{
                        background: "#1a1410",
                        border: "1px solid #2a2218",
                        borderRadius: "5px",
                        color: "#c8b89a",
                        padding: "0.4rem 0.85rem",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.8rem",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        updateMutation.mutate({
                          id: page.id,
                          isPublished: !page.isPublished,
                        })
                      }
                      style={{
                        background: page.isPublished ? "#1a2a1a" : "#1a1410",
                        border: `1px solid ${page.isPublished ? "#2a4a2a" : "#2a2218"}`,
                        borderRadius: "5px",
                        color: page.isPublished ? "#4caf50" : "#8a7a6a",
                        padding: "0.4rem 0.85rem",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.8rem",
                        cursor: "pointer",
                      }}
                    >
                      {page.isPublished ? "Published" : "Draft"}
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${page.label}"? This cannot be undone.`)) {
                          deleteMutation.mutate({ id: page.id });
                        }
                      }}
                      style={{
                        background: "transparent",
                        border: "1px solid #3a1a1a",
                        borderRadius: "5px",
                        color: "#8a4a3a",
                        padding: "0.4rem 0.85rem",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.8rem",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── NEW PAGE ── */}
      {mode === "new" && (
        <form onSubmit={handleCreate}>
          {/* Template picker */}
          <div style={{ marginBottom: "1.75rem" }}>
            <label style={{ ...labelStyle, marginBottom: "0.75rem" }}>Choose a template</label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "0.75rem",
              }}
            >
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setNewTemplate(t.id)}
                  style={{
                    background: newTemplate === t.id ? "#1a0e06" : "#130f0a",
                    border: `1px solid ${newTemplate === t.id ? "#E8520A" : "#2a2218"}`,
                    borderRadius: "8px",
                    padding: "1rem",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.5rem",
                      marginBottom: "0.5rem",
                      color: newTemplate === t.id ? "#E8520A" : "#5a4a3a",
                    }}
                  >
                    {t.icon}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.9rem",
                      color: newTemplate === t.id ? "#e8ddd0" : "#c8b89a",
                      fontWeight: 600,
                      marginBottom: "0.25rem",
                    }}
                  >
                    {t.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.775rem",
                      color: "#5a4a3a",
                      lineHeight: 1.4,
                    }}
                  >
                    {t.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Page title */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={labelStyle}>Page title</label>
            <input
              style={inputStyle}
              type="text"
              placeholder="e.g. My New Article"
              value={newLabel}
              onChange={(e) => handleLabelChange(e.target.value)}
              required
            />
          </div>

          {/* URL slug */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={labelStyle}>URL slug (auto-generated, you can edit)</label>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9rem",
                  color: "#5a4a3a",
                  whiteSpace: "nowrap",
                }}
              >
                gallantryai.com/
              </span>
              <input
                style={{ ...inputStyle, flex: 1 }}
                type="text"
                placeholder="my-new-article"
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                required
              />
            </div>
          </div>

          {/* Nav category */}
          <div style={{ marginBottom: "2rem" }}>
            <label style={labelStyle}>Add to nav menu (optional)</label>
            <select
              style={inputStyle}
              value={newNavCategory}
              onChange={(e) => setNewNavCategory(e.target.value)}
            >
              {NAV_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              type="submit"
              disabled={createMutation.isPending}
              style={{
                background: "#E8520A",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "0.7rem 1.75rem",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9rem",
                cursor: createMutation.isPending ? "not-allowed" : "pointer",
                fontWeight: 600,
                opacity: createMutation.isPending ? 0.7 : 1,
              }}
            >
              {createMutation.isPending ? "Creating…" : "Create Page"}
            </button>
            <button
              type="button"
              onClick={() => setMode("list")}
              style={{
                background: "transparent",
                border: "1px solid #2a2218",
                borderRadius: "6px",
                padding: "0.7rem 1.25rem",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9rem",
                color: "#8a7a6a",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
