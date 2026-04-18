/**
 * StudioLearningMatrix
 * Learning & Growing Matrix tab in Studio.
 * Shows all pages in a table. Each row has three dropdowns:
 * Deeper, Wider, Simpler. Owner picks a page from the dropdown and saves.
 * Changes go to the learning_flow DB table immediately.
 */

import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

// All known pages — slug + label for the dropdown options
const ALL_PAGES = [
  { slug: "rules", label: "Five Rules" },
  { slug: "road-protocol", label: "Road Protocol" },
  { slug: "promptolinguistics", label: "Promptolinguistics" },
  { slug: "alcm", label: "ALCM" },
  { slug: "lexicon", label: "Living Lexicon" },
  { slug: "frameworks", label: "Framework Families" },
  { slug: "taxonomy", label: "AI Family Taxonomy" },
  { slug: "prompt-games", label: "Prompt Games" },
  { slug: "flower-presets", label: "Flower Presets" },
  { slug: "playground", label: "Promptology Playground" },
  { slug: "whelm-scale", label: "Whelm Scale" },
  { slug: "variable-scale", label: "Variable Scale Theory" },
  { slug: "malbolge", label: "Malbolge Geofence" },
  { slug: "math-prompting", label: "Math Through Prompting" },
  { slug: "drift", label: "Drift" },
  { slug: "anthropomorphism", label: "Anthropomorphism" },
  { slug: "hallucinations", label: "Hallucinations" },
  { slug: "human-line", label: "The Human Line" },
  { slug: "scaffold", label: "The Scaffold" },
  { slug: "three-voices", label: "The Three Voices" },
  { slug: "user-governance", label: "User-Side Governance" },
  { slug: "dual-strategy", label: "Dual Strategy" },
  { slug: "gallantry-ai", label: "GallantryAI" },
  { slug: "eu-ai-act", label: "EU AI Act" },
  { slug: "what-claude-admitted", label: "What Claude Admitted" },
  { slug: "what-the-ai-said", label: "What the AI Said" },
  { slug: "open-door", label: "The Open Door" },
  { slug: "counter-arguments", label: "Counter Arguments" },
  { slug: "screenshot-sharing", label: "Screenshot Sharing" },
  { slug: "field-report-review", label: "Field Report Review" },
  { slug: "gallery", label: "Gallery" },
  { slug: "articles", label: "Articles" },
  { slug: "if-you-need-to-stop", label: "Safety Page" },
  { slug: "school-board", label: "School Board" },
  { slug: "kids-learn", label: "Kids Learn" },
  { slug: "field-papers", label: "Field Papers" },
  { slug: "citizen-researcher", label: "Citizen Researcher" },
  { slug: "research-hub", label: "Research Hub" },
  { slug: "builder", label: "The Builder" },
  { slug: "builder-origin", label: "Builder Origin" },
  { slug: "builders-kids", label: "Builder's Kids" },
  { slug: "for/everyday", label: "Everyday Person Lens" },
  { slug: "for/child", label: "Child Lens" },
  { slug: "for/teenager", label: "Teenager Lens" },
  { slug: "for/guardian-teacher", label: "Guardian & Teacher Lens" },
  { slug: "for/prompt-engineer", label: "Prompt Engineer Lens" },
  { slug: "for/linguist", label: "Linguist Lens" },
  { slug: "for/mathematician", label: "Mathematician Lens" },
  { slug: "for/cognitive-science", label: "Cognitive Science Lens" },
  { slug: "for/psychology", label: "Psychology Lens" },
  { slug: "for/researcher", label: "Researcher Lens" },
  { slug: "for/watcher", label: "Watcher Lens" },
];

function slugToLabel(slug: string | null | undefined): string {
  if (!slug) return "— none —";
  const found = ALL_PAGES.find((p) => p.slug === slug);
  return found ? found.label : slug;
}

interface RowState {
  deeperSlug: string | null;
  widerSlug: string | null;
  simplerSlug: string | null;
  dirty: boolean;
  saving: boolean;
}

export default function StudioLearningMatrix() {
  const { data: flowRows, isLoading, refetch } = trpc.studio.getLearningFlow.useQuery();
  const upsert = trpc.studio.upsertLearningFlow.useMutation();

  // Local editable state per page slug
  const [edits, setEdits] = useState<Record<string, RowState>>({});
  const [search, setSearch] = useState("");

  // Build a merged view: ALL_PAGES with DB data overlaid
  const rows = useMemo(() => {
    const dbMap: Record<string, { deeperSlug: string | null; widerSlug: string | null; simplerSlug: string | null }> = {};
    if (flowRows) {
      for (const row of flowRows) {
        dbMap[row.pageSlug] = {
          deeperSlug: row.deeperSlug ?? null,
          widerSlug: row.widerSlug ?? null,
          simplerSlug: row.simplerSlug ?? null,
        };
      }
    }
    return ALL_PAGES.map((page) => {
      const db = dbMap[page.slug] ?? { deeperSlug: null, widerSlug: null, simplerSlug: null };
      const local = edits[page.slug];
      return {
        slug: page.slug,
        label: page.label,
        deeperSlug: local ? local.deeperSlug : db.deeperSlug,
        widerSlug: local ? local.widerSlug : db.widerSlug,
        simplerSlug: local ? local.simplerSlug : db.simplerSlug,
        dirty: local?.dirty ?? false,
        saving: local?.saving ?? false,
      };
    });
  }, [flowRows, edits]);

  const filtered = useMemo(() => {
    if (!search.trim()) return rows;
    const q = search.toLowerCase();
    return rows.filter((r) => r.label.toLowerCase().includes(q) || r.slug.includes(q));
  }, [rows, search]);

  function setField(slug: string, field: "deeperSlug" | "widerSlug" | "simplerSlug", value: string | null) {
    setEdits((prev) => {
      const current = prev[slug] ?? {
        deeperSlug: rows.find((r) => r.slug === slug)?.deeperSlug ?? null,
        widerSlug: rows.find((r) => r.slug === slug)?.widerSlug ?? null,
        simplerSlug: rows.find((r) => r.slug === slug)?.simplerSlug ?? null,
        dirty: false,
        saving: false,
      };
      return {
        ...prev,
        [slug]: { ...current, [field]: value, dirty: true },
      };
    });
  }

  async function saveRow(slug: string) {
    const row = edits[slug];
    if (!row) return;
    setEdits((prev) => ({ ...prev, [slug]: { ...row, saving: true } }));
    try {
      await upsert.mutateAsync({
        pageSlug: slug,
        deeperSlug: row.deeperSlug || null,
        widerSlug: row.widerSlug || null,
        simplerSlug: row.simplerSlug || null,
      });
      toast.success(`Saved connections for ${slugToLabel(slug)}`);
      setEdits((prev) => {
        const next = { ...prev };
        delete next[slug];
        return next;
      });
      refetch();
    } catch {
      toast.error("Save failed. Try again.");
      setEdits((prev) => ({ ...prev, [slug]: { ...row, saving: false } }));
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-6 h-6 border-2 border-[#E8520A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-[#1a1610]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Learning & Growing Matrix
        </h2>
        <p className="text-sm text-[#6b5e4e] mt-1">
          For each page, choose where the three buttons point. <strong>Go Deeper</strong> = harder/more detailed.{" "}
          <strong>Go Wider</strong> = related sideways. <strong>Go Simpler</strong> = easier starting point.
          Pick from the dropdown and hit <strong>Save</strong>.
        </p>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search pages..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-[#e8e0d0] rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E8520A]/30"
      />

      {/* Table — mobile: stacked cards; desktop: table */}
      <div className="space-y-3">
        {filtered.map((row) => (
          <div
            key={row.slug}
            className="border border-[#e8e0d0] rounded-xl bg-white p-4 space-y-3"
          >
            {/* Page name */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-[#1a1610] text-sm">{row.label}</div>
                <div className="text-xs text-[#9e8e7e]">/{row.slug}</div>
              </div>
              {row.dirty && (
                <button
                  onClick={() => saveRow(row.slug)}
                  disabled={row.saving}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#E8520A] hover:bg-[#c44208] disabled:opacity-50 transition-colors"
                >
                  {row.saving ? "Saving…" : "Save"}
                </button>
              )}
            </div>

            {/* Three dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(["deeperSlug", "widerSlug", "simplerSlug"] as const).map((field) => {
                const labels = { deeperSlug: "Go Deeper", widerSlug: "Go Wider", simplerSlug: "Go Simpler" };
                const colors = { deeperSlug: "#4F46E5", widerSlug: "#059669", simplerSlug: "#E8520A" };
                return (
                  <div key={field}>
                    <label
                      className="block text-xs font-bold mb-1"
                      style={{ color: colors[field] }}
                    >
                      {labels[field]}
                    </label>
                    <select
                      value={row[field] ?? ""}
                      onChange={(e) => setField(row.slug, field, e.target.value || null)}
                      className="w-full border border-[#e8e0d0] rounded-lg px-2 py-1.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#E8520A]/30"
                    >
                      <option value="">— none —</option>
                      {ALL_PAGES.filter((p) => p.slug !== row.slug).map((p) => (
                        <option key={p.slug} value={p.slug}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-[#9e8e7e] text-sm">No pages match your search.</div>
      )}
    </div>
  );
}
