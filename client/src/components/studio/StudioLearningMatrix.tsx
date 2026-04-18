/**
 * StudioLearningMatrix — Learning & Growing Matrix tab in Studio.
 *
 * Each page has three sections: Go Deeper, Go Wider, Go Simpler.
 * Each section supports MULTIPLE cards (label + href + description).
 * You can add cards, remove cards, edit descriptions, and save per page.
 */

import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface FlowLink {
  label: string;
  href: string;
  description: string;
}

interface PageRow {
  slug: string;
  label: string;
  deeper: FlowLink[];
  wider: FlowLink[];
  simpler: FlowLink[];
  dirty: boolean;
  saving: boolean;
}

// All known site pages for the "add card" dropdown
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

const SECTION_CONFIG = [
  { key: "deeper" as const, label: "Go Deeper", color: "#4F46E5" },
  { key: "wider" as const, label: "Go Wider", color: "#059669" },
  { key: "simpler" as const, label: "Go Simpler", color: "#E8520A" },
];

function parseLinks(raw: unknown): FlowLink[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw as FlowLink[];
  if (typeof raw === "string") {
    try { return JSON.parse(raw) as FlowLink[]; } catch { return []; }
  }
  return [];
}

export default function StudioLearningMatrix() {
  const { data: flowRows, isLoading, refetch } = trpc.studio.getLearningFlow.useQuery();
  const upsert = trpc.studio.upsertLearningFlow.useMutation();

  const [edits, setEdits] = useState<Record<string, Omit<PageRow, "slug" | "label">>>({});
  const [expandedPage, setExpandedPage] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Build display rows from DB + local edits
  const rows = useMemo<PageRow[]>(() => {
    const dbMap: Record<string, { deeper: FlowLink[]; wider: FlowLink[]; simpler: FlowLink[] }> = {};
    if (flowRows) {
      for (const row of flowRows) {
        dbMap[row.pageSlug] = {
          deeper: parseLinks(row.deeper),
          wider: parseLinks(row.wider),
          simpler: parseLinks(row.simpler),
        };
      }
    }
    return ALL_PAGES.map((page) => {
      const db = dbMap[page.slug] ?? { deeper: [], wider: [], simpler: [] };
      const local = edits[page.slug];
      return {
        slug: page.slug,
        label: page.label,
        deeper: local ? local.deeper : db.deeper,
        wider: local ? local.wider : db.wider,
        simpler: local ? local.simpler : db.simpler,
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

  function getRowState(slug: string) {
    return rows.find(r => r.slug === slug) ?? { deeper: [], wider: [], simpler: [], dirty: false, saving: false };
  }

  function updateSection(slug: string, section: "deeper" | "wider" | "simpler", links: FlowLink[]) {
    const current = getRowState(slug);
    setEdits(prev => ({
      ...prev,
      [slug]: {
        deeper: section === "deeper" ? links : current.deeper,
        wider: section === "wider" ? links : current.wider,
        simpler: section === "simpler" ? links : current.simpler,
        dirty: true,
        saving: false,
      },
    }));
  }

  function addCard(slug: string, section: "deeper" | "wider" | "simpler", pageSlug: string) {
    const pageInfo = ALL_PAGES.find(p => p.slug === pageSlug);
    if (!pageInfo) return;
    const current = getRowState(slug);
    const existing = current[section];
    if (existing.some(c => c.href === `/${pageSlug}`)) {
      toast.error("Already added");
      return;
    }
    updateSection(slug, section, [...existing, { label: pageInfo.label, href: `/${pageSlug}`, description: "" }]);
  }

  function removeCard(slug: string, section: "deeper" | "wider" | "simpler", idx: number) {
    const current = getRowState(slug);
    updateSection(slug, section, current[section].filter((_, i) => i !== idx));
  }

  function updateDescription(slug: string, section: "deeper" | "wider" | "simpler", idx: number, desc: string) {
    const current = getRowState(slug);
    updateSection(slug, section, current[section].map((c, i) => i === idx ? { ...c, description: desc } : c));
  }

  async function saveRow(slug: string) {
    const row = getRowState(slug);
    setEdits(prev => ({ ...prev, [slug]: { ...prev[slug]!, saving: true } }));
    try {
      await upsert.mutateAsync({
        pageSlug: slug,
        deeperLinks: row.deeper,
        widerLinks: row.wider,
        simplerLinks: row.simpler,
      });
      toast.success(`Saved`);
      setEdits(prev => { const next = { ...prev }; delete next[slug]; return next; });
      refetch();
    } catch {
      toast.error("Save failed. Try again.");
      setEdits(prev => ({ ...prev, [slug]: { ...prev[slug]!, saving: false } }));
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
      <div>
        <h2 className="text-lg font-bold text-[#1a1610]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Learning & Growing Matrix
        </h2>
        <p className="text-sm text-[#6b5e4e] mt-1">
          Each page can have multiple cards per direction. Click a page to expand it.
          Add cards, remove cards, edit descriptions, then hit <strong>Save</strong>.
        </p>
      </div>

      <input
        type="text"
        placeholder="Search pages..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-[#e8e0d0] rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E8520A]/30"
      />

      <div className="space-y-2">
        {filtered.map((row) => {
          const isExpanded = expandedPage === row.slug;
          return (
            <div
              key={row.slug}
              className="border rounded-xl bg-white overflow-hidden"
              style={{ borderColor: row.dirty ? "#E8520A" : "#e8e0d0" }}
            >
              {/* Collapsed header */}
              <button
                onClick={() => setExpandedPage(isExpanded ? null : row.slug)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[#faf7f4] transition-colors"
              >
                <div>
                  <span className="font-semibold text-[#1a1610] text-sm">{row.label}</span>
                  {row.dirty && <span className="ml-2 text-[#E8520A] text-xs font-bold">● unsaved</span>}
                  <div className="text-xs text-[#9e8e7e] mt-0.5">
                    /{row.slug} · {row.deeper.length} deeper · {row.wider.length} wider · {row.simpler.length} simpler
                  </div>
                </div>
                <span className="text-[#9e8e7e] text-sm ml-2">{isExpanded ? "▲" : "▼"}</span>
              </button>

              {/* Expanded editor */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-[#f0ebe4] space-y-4 pt-4">
                  {SECTION_CONFIG.map(section => (
                    <div key={section.key}>
                      <div
                        className="text-xs font-bold uppercase tracking-wider mb-2"
                        style={{ color: section.color }}
                      >
                        {section.label}
                      </div>

                      {/* Card list */}
                      {row[section.key].length === 0 && (
                        <p className="text-xs text-[#9e8e7e] mb-2">No cards yet.</p>
                      )}
                      {row[section.key].map((card, idx) => (
                        <div
                          key={idx}
                          className="flex gap-2 items-start mb-2 p-2 rounded-lg border border-[#f0ebe4] bg-[#faf7f4]"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-[#1a1610]">{card.label}</div>
                            <div className="text-xs text-[#9e8e7e]">{card.href}</div>
                            <input
                              type="text"
                              value={card.description}
                              onChange={e => updateDescription(row.slug, section.key, idx, e.target.value)}
                              placeholder="Short description…"
                              className="mt-1 w-full border border-[#e8e0d0] rounded px-2 py-1 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#E8520A]/30"
                            />
                          </div>
                          <button
                            onClick={() => removeCard(row.slug, section.key, idx)}
                            className="text-[#9e8e7e] hover:text-red-500 text-sm mt-0.5 flex-shrink-0 transition-colors"
                            title="Remove"
                          >
                            ✕
                          </button>
                        </div>
                      ))}

                      {/* Add card row */}
                      <AddCardRow
                        currentSlugs={row[section.key].map(c => c.href.replace("/", ""))}
                        pageSelf={row.slug}
                        color={section.color}
                        onAdd={(pageSlug) => addCard(row.slug, section.key, pageSlug)}
                      />
                    </div>
                  ))}

                  {/* Save button */}
                  <button
                    onClick={() => saveRow(row.slug)}
                    disabled={row.saving || !row.dirty}
                    className="px-4 py-2 rounded-lg text-sm font-bold text-white transition-colors disabled:opacity-50"
                    style={{ background: row.dirty ? "#E8520A" : "#9e8e7e", cursor: row.dirty ? "pointer" : "default" }}
                  >
                    {row.saving ? "Saving…" : "Save"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-[#9e8e7e] text-sm">No pages match your search.</div>
      )}
    </div>
  );
}

function AddCardRow({
  currentSlugs,
  pageSelf,
  color,
  onAdd,
}: {
  currentSlugs: string[];
  pageSelf: string;
  color: string;
  onAdd: (slug: string) => void;
}) {
  const [selected, setSelected] = useState("");
  const available = ALL_PAGES.filter(p => p.slug !== pageSelf && !currentSlugs.includes(p.slug));

  return (
    <div className="flex gap-2 mt-1">
      <select
        value={selected}
        onChange={e => setSelected(e.target.value)}
        className="flex-1 border border-[#e8e0d0] rounded-lg px-2 py-1.5 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#E8520A]/30"
      >
        <option value="">+ Add a page…</option>
        {available.map(p => (
          <option key={p.slug} value={p.slug}>{p.label}</option>
        ))}
      </select>
      <button
        onClick={() => { if (selected) { onAdd(selected); setSelected(""); } }}
        disabled={!selected}
        className="px-3 py-1.5 rounded-lg text-xs font-bold text-white flex-shrink-0 disabled:opacity-40 transition-colors"
        style={{ background: selected ? color : "#9e8e7e", cursor: selected ? "pointer" : "default" }}
      >
        Add
      </button>
    </div>
  );
}
