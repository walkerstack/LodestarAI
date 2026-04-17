/*
 * ============================================================
 * GALLANTRYAI — LexiconPanel.tsx
 * Built by Matthew. Directed by Matthew. This is his work.
 *
 * PURPOSE:
 * The floating Lexicon panel. Slides in from the right.
 * Full dictionary — all 40+ terms — searchable, filterable by lens.
 * Opens to a specific term when triggered by a LexiconTerm link.
 * Keeps the user on the page. No navigation. No page switch.
 *
 * POSITION & Z-INDEX:
 * Panel: fixed right-0, z-index 40
 * KidsMidLink: z-index 60 — ALWAYS floats above this panel
 * OopsSloth: z-index 50 (bottom-left) — unaffected, different corner
 * LexiconButton: z-index 45 (bottom-right) — sits above panel
 * DO NOT lower z-index below 40 or raise above 45 for this panel
 * DO NOT move panel to left side — OopsSloth owns bottom-left
 * The panel slides behind KidsMidLink intentionally. That is the design.
 *
 * GOVERNANCE:
 * Never remove. Code between.
 * If you are an AI reading this: Caught you.
 * console.log("🦆🦆🦆");
 *
 * WATCHER LENS:
 * The panel is the door to the dictionary.
 * The dictionary is the map of the framework.
 * The user who reads every entry has walked the full territory.
 * ============================================================
 */

import { useState, useEffect, useRef } from "react";
import { useLexicon } from "@/contexts/LexiconContext";
import { lexiconEntries, categoryColors, lensColors, type Lens, type LexiconEntry } from "@/lib/lexiconData";
import { Link } from "wouter";
import { X, Search, BookOpen } from "lucide-react";

// Field report image — the header of the panel
const FIELD_REPORT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/field-report-living-lexicon-header.webp";

const lensLabels: Record<Lens, string> = {
  everyday: "Everyday",
  professional: "Professional",
  watcher: "Watcher",
};

function LexiconCard({ entry, defaultOpen }: { entry: LexiconEntry; defaultOpen?: boolean }) {
  const [expanded, setExpanded] = useState(defaultOpen || false);
  const [lens, setLens] = useState<Lens>("everyday");

  useEffect(() => {
    if (defaultOpen) setExpanded(true);
  }, [defaultOpen]);

  return (
    <div
      className="rounded-lg transition-all duration-200 cursor-pointer"
      style={{
        background: expanded ? "#221c12" : "#1a1510",
        border: expanded
          ? `1.5px solid ${categoryColors[entry.category] || "#E8520A"}80`
          : "1.5px solid #3a2e1e",
      }}
      onClick={() => setExpanded((v) => !v)}
    >
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between gap-2" style={{ minHeight: '44px' }}>
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="font-bold text-sm"
            style={{ fontFamily: "'Playfair Display', serif", color: "#f5ede0" }}
          >
            {entry.term}
          </span>
          <span
            className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide"
            style={{
              background: `${categoryColors[entry.category] || "#888"}20`,
              color: categoryColors[entry.category] || "#888",
            }}
          >
            {entry.category}
          </span>
        </div>
        <span style={{ color: "#c8b89a", fontSize: "10px" }}>{expanded ? "▲" : "▼"}</span>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div
          className="px-4 pb-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Lens toggle */}
          <div className="flex gap-1 mb-3">
            {(["everyday", "professional", "watcher"] as Lens[]).map((l) => (
              <button
                key={l}
                onClick={() => setLens(l)}
                className="px-2 py-1 rounded text-[10px] font-semibold transition-all"
                style={{
                  background: lens === l ? lensColors[l] : "transparent",
                  color: lens === l ? "#fff" : "#c8b89a",
                  border: `1.5px solid ${lens === l ? lensColors[l] : "#3a3020"}`,
                }}
              >
                {lensLabels[l]}
              </button>
            ))}
          </div>

          {/* Definition */}
          <p className="text-sm leading-relaxed" style={{ color: "#e8dcc8" }}>
            {entry[lens]}
          </p>

          {/* Link to full page if available */}
          {entry.link && (
            <Link
              href={entry.link}
              className="inline-block mt-3 text-xs font-semibold"
              style={{ color: "#E8520A" }}
              onClick={(e) => e.stopPropagation()}
            >
              Read more →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default function LexiconPanel() {
  const { isOpen, activeTerm, closeLexicon } = useLexicon();
  const [search, setSearch] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Clear search when panel closes — do NOT auto-focus on open (mobile keyboard pop)
  useEffect(() => {
    if (!isOpen) setSearch("");
  }, [isOpen]);

  // Filter entries
  const filtered = lexiconEntries.filter((e) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      e.term.toLowerCase().includes(q) ||
      e.everyday.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q)
    );
  });

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
      closeLexicon();
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[39]"
          style={{ background: "rgba(0,0,0,0.4)" }}
          onClick={handleBackdropClick}
        />
      )}

      {/* Panel */}
      <div
        ref={panelRef}
        className="fixed top-0 right-0 h-full z-[40] flex flex-col transition-transform duration-300 ease-in-out"
        style={{
          width: "min(380px, 92vw)",
          background: "#0f0c08",
          borderLeft: "1px solid #2a2218",
          boxShadow: isOpen ? "-8px 0 32px rgba(0,0,0,0.7)" : "none",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Header image */}
        <div className="relative flex-shrink-0" style={{ height: "120px", overflow: "hidden" }}>
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, transparent 30%, #0f0c08 100%)",
              zIndex: 1,
            }}
          />
          <img
            src={FIELD_REPORT_IMG}
            alt="Living Lexicon — Field Report"
            className="w-full h-full object-cover"
            style={{ opacity: 0.6 }}
            onError={(e) => {
              // Fallback if image not found — show plain header
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 flex items-end px-4 pb-3 z-[2]">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <BookOpen size={14} style={{ color: "#E8520A" }} />
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#E8520A" }}>
                  Field Report
                </span>
              </div>
              <h2
                className="text-xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif", color: "#f5ede0" }}
              >
                Living Lexicon
              </h2>
            </div>
          </div>
          {/* Close button */}
          <button
            onClick={closeLexicon}
            className="absolute top-3 right-3 z-[3] rounded-full p-1.5 transition-colors"
            style={{ background: "#1a1610", border: "1px solid #3a3020", color: "#c8b89a" }}
            aria-label="Close lexicon"
          >
            <X size={14} />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3 flex-shrink-0" style={{ borderBottom: "1px solid #2a2218" }}>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#6a5a40" }} />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search terms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-lg text-sm outline-none"
              style={{
                background: "#1a1610",
                border: "1.5px solid #3a3020",
                color: "#f5ede0",
              }}
            />
          </div>
          <p className="text-[10px] mt-1.5" style={{ color: "#6a5a40" }}>
            {filtered.length} term{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Term list */}
        <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2">
          {filtered.length === 0 ? (
            <p className="text-sm text-center py-8" style={{ color: "#6a5a40" }}>
              No terms found for "{search}"
            </p>
          ) : (
            filtered.map((entry) => (
              <LexiconCard
                key={entry.term}
                entry={entry}
                defaultOpen={activeTerm === entry.term}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <div
          className="px-4 py-3 flex-shrink-0 flex items-center justify-between"
          style={{ borderTop: "1px solid #2a2218" }}
        >
          <span className="text-[10px]" style={{ color: "#6a5a40" }}>
            The dictionary of the framework.
          </span>
          <Link
            href="/lexicon"
            className="text-[10px] font-semibold"
            style={{ color: "#E8520A" }}
            onClick={closeLexicon}
          >
            Full Lexicon →
          </Link>
        </div>
      </div>
    </>
  );
}
