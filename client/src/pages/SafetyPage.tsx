/*
 * ============================================================
 * GALLANTRYAI — If You Need to Stop
 * DB-driven shell — content from content_blocks for pageSlug "if-you-need-to-stop".
 * DARK THEME PAGE (#1A1A2E).
 *
 * SPECIAL PAGE — Safety is the first value.
 *
 * PAGE STANDARD:
 * 1. KidsMidLink — bottom before footer              [DONE]
 * 2. LearningFlow — bottom of page                   [DONE]
 * (No KidsRedirect on this page — by design. Children
 *  should see this page too if they need it.)
 *
 * NON-EDITABLE FROM STUDIO:
 * - LocalResourceSearch interaction (Google search form)
 * - LearningFlow links — edit via Studio Learning Matrix tab
 * - KidsMidLink position (locked)
 *
 * EDITABLE FROM STUDIO:
 * - All text headings and body content
 * - Crisis resource phone numbers and URLs (via card blocks)
 * - Welcome banner text and images
 * - Watcher observation text
 * ============================================================
 */

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import KidsMidLink from "@/components/KidsMidLink";
import LearningFlow from "@/components/LearningFlow";
import { flowMap } from "@/lib/learningFlowMap";
import StudioBlocks from "@/components/studio/StudioBlocks";

const PAGE_SLUG = "if-you-need-to-stop";

/* ── Interactive local resource search — stays React ── */
const searchCategories = [
  { label: "Free mental health clinic", query: "free mental health clinic near" },
  { label: "Crisis mental health hospital", query: "crisis mental health hospital near" },
  { label: "Counselling / therapy", query: "free counselling therapy services near" },
  { label: "Youth mental health", query: "youth mental health services near" },
  { label: "Addiction support", query: "addiction support services near" },
  { label: "Domestic violence help", query: "domestic violence help near" },
];

function LocalResourceSearch() {
  const [area, setArea] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(searchCategories[0].query);

  const handleSearch = () => {
    if (!area.trim()) return;
    const q = encodeURIComponent(`${selectedCategory} ${area.trim()}`);
    window.open(`https://www.google.com/search?q=${q}`, "_blank", "noopener,noreferrer");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="rounded-xl border border-[#E8520A]/30 bg-[#E8520A]/5 p-5 md:p-6 mb-2">
      <p className="text-xs text-[#888] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        Choose what you{"\u2019"}re looking for, type your area, and hit search. This opens Google with the right terms.
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {searchCategories.map((cat) => (
          <button
            key={cat.query}
            onClick={() => setSelectedCategory(cat.query)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedCategory === cat.query
                ? "bg-[#E8520A] text-white"
                : "bg-[#222] text-[#888] border border-[#333] hover:border-[#555]"
            }`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="flex gap-3">
        <input
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter your city or area..."
          className="flex-1 px-4 py-3 rounded-xl bg-[#111] border border-[#333] text-[#FAF6EF] text-sm placeholder-[#555] focus:outline-none focus:border-[#E8520A] transition-colors"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        />
        <button
          onClick={handleSearch}
          disabled={!area.trim()}
          className="px-5 py-3 rounded-xl bg-[#E8520A] text-white text-sm font-semibold hover:bg-[#d04a08] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Search
        </button>
      </div>
      <p className="text-[10px] text-[#555] mt-3 italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        This opens a Google search in a new tab. GallantryAI does not collect or store your location.
      </p>
    </div>
  );
}

export default function SafetyPage() {
  const safetyFlow = flowMap["if-you-need-to-stop"] ?? flowMap.safety;

  return (
    <div className="min-h-screen flex flex-col bg-[#1A1A2E] text-[#FAF6EF]">
      <Nav />

      {/* DB-driven content blocks */}
      <StudioBlocks pageSlug={PAGE_SLUG} />

      {/* Interactive local resource search — stays React */}
      <div className="container max-w-2xl py-4">
        <div className="section-label mb-4" style={{ color: '#E8520A' }}>Find Local Resources</div>
        <p className="text-sm text-[#aaa] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Type your city or area below. We{"\u2019"}ll open a Google search with the right terms to help you find real, local help.
        </p>
        <LocalResourceSearch />
      </div>

      <div className="flex justify-center py-4">
        <KidsMidLink />
      </div>
      {safetyFlow && (
        <LearningFlow
          current="Safety"
          deeper={safetyFlow.deeper ?? []}
          wider={safetyFlow.wider ?? []}
          simpler={safetyFlow.simpler ?? []}
          dark
        />
      )}
      <Footer />
    </div>
  );
}
