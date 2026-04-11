/*
 * GALLANTRYAI — Living Lexicon
 * Design: Editorial Register
 * The word index. Every term defined in the GallantryAI framework.
 * "Words are the tools. The lexicon is the toolbox."
 */

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const terms = [
  {
    term: "Token Zero",
    category: "CORE",
    definition:
      "The pre-output force profile. The invisible first token — the human's internal state, intention, and awareness before a single word is typed. Token Zero is not in the prompt. It is the person holding the prompt.",
  },
  {
    term: "Register Integrity",
    category: "CORE",
    definition:
      "The human's ability to hold their own voice, tone, and intention throughout a session without drifting into the AI's register. The key variable in output quality across all tested models.",
  },
  {
    term: "Human Drift",
    category: "CORE",
    definition:
      "The gradual erosion of the human's original intent as the session progresses. The watcher stops watching. The voice becomes the AI's voice. The output becomes the AI's output.",
  },
  {
    term: "The Watcher",
    category: "CORE",
    definition:
      "The human in the session. The observer. The variable. The governance layer. The watcher is not passive — the watcher is the most active participant in any human-AI interaction.",
  },
  {
    term: "Promptolinguistics",
    category: "DISCIPLINE",
    definition:
      "The study of how language functions as a control mechanism in human-AI interaction. How words steer, constrain, scope, and authorize. The linguistics of the prompt.",
  },
  {
    term: "Atomic Language Control Model (ALCM)",
    category: "FRAMEWORK",
    definition:
      "The model that maps individual words to their functional roles in a prompt. Direction. Constraint. Scope. Authority. Each word is a dial. The ALCM shows you what each dial does.",
  },
  {
    term: "The Scaffold",
    category: "FRAMEWORK",
    definition:
      "The growth architecture of the GallantryAI framework. Not a wall. Not a ceiling. A scaffold — something that supports growth and can be removed when the structure can stand alone.",
  },
  {
    term: "The Correction Triad",
    category: "FRAMEWORK",
    definition:
      "The three-step recovery protocol when drift is detected: Identify (name what happened), Catch (stop the drift), Fix (return to intent). The scaffold's built-in repair mechanism.",
  },
  {
    term: "THE CUT",
    category: "FRAMEWORK",
    definition:
      "The decision point. The moment the human chooses to stop, redirect, or end the session. THE CUT is the human's ultimate governance tool. It is always available.",
  },
  {
    term: "Terrain Principle",
    category: "FRAMEWORK",
    definition:
      "The understanding that different prompting contexts require different approaches. The terrain determines the tools. A child's session is not a researcher's session. The terrain principle prevents one-size-fits-all thinking.",
  },
  {
    term: "Tri-Layer Model",
    category: "FRAMEWORK",
    definition:
      "The three-layer structure of a GallantryAI session: the human layer (intent, awareness, governance), the prompt layer (language, structure, mechanics), and the output layer (what the AI produces).",
  },
  {
    term: "Child Safety Protocol",
    category: "PROTOCOL",
    definition:
      "The specific safety framework for children using AI. Disclosure requirements, self-reflection prompts, and the principle that children must always know they are in charge.",
  },
  {
    term: "Register Collapse",
    category: "PHENOMENON",
    definition:
      "The failure mode where the AI's register overwhelms the human's register. The human's voice disappears. The output no longer sounds like the human. Documented across multiple engines in field testing.",
  },
  {
    term: "Pre-Session Intention",
    category: "PRACTICE",
    definition:
      "The practice of setting the room before the first token is typed. Who are you in this session? What do you need? What are your limits? Pre-session intention is Token Zero made conscious.",
  },
  {
    term: "The Missing Variable",
    category: "RESEARCH",
    definition:
      "The thesis that emerged from seven-lens analysis: the variable that explains output quality differences across models is not the model. It is the watcher. The human. The person holding the prompt.",
  },
];

const categories = ["ALL", "CORE", "DISCIPLINE", "FRAMEWORK", "PROTOCOL", "PHENOMENON", "PRACTICE", "RESEARCH"];

const categoryColors: Record<string, string> = {
  CORE: "bg-[#E8520A] text-white",
  DISCIPLINE: "bg-purple-600 text-white",
  FRAMEWORK: "bg-[#1A1A2E] text-white",
  PROTOCOL: "bg-[#2A9D8F] text-white",
  PHENOMENON: "bg-rose-600 text-white",
  PRACTICE: "bg-blue-600 text-white",
  RESEARCH: "bg-amber-700 text-white",
};

export default function LivingLexicon() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [search, setSearch] = useState("");

  const filtered = terms.filter((t) => {
    const matchesCategory = activeCategory === "ALL" || t.category === activeCategory;
    const matchesSearch =
      search === "" ||
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.definition.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EF]">
      <Nav />

      <main className="flex-1 container py-12">
        <div className="section-label mb-2">Word Index</div>
        <h1
          className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Living Lexicon
        </h1>
        <p className="text-sm text-[#888] mb-8 max-w-xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Every term in the GallantryAI framework. Defined in plain language. Built to grow. This lexicon is alive — new terms are added as the research evolves.
        </p>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search the lexicon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-[#e8e0d0] bg-white text-sm text-[#2D2D2D] focus:outline-none focus:border-[#E8520A]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 text-xs font-bold uppercase tracking-wide border transition-colors ${
                activeCategory === cat
                  ? "bg-[#E8520A] text-white border-[#E8520A]"
                  : "bg-white text-[#2D2D2D] border-[#e8e0d0] hover:border-[#E8520A] hover:text-[#E8520A]"
              }`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Terms */}
        <div className="space-y-4 max-w-2xl">
          {filtered.map((t) => (
            <div key={t.term} className="border border-[#e8e0d0] bg-white rounded-lg p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3
                  className="font-bold text-[#1A1A2E] text-base"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {t.term}
                </h3>
                <span className={`flex-shrink-0 tag-pill text-[10px] ${categoryColors[t.category] || 'bg-gray-200 text-gray-700'}`}>
                  {t.category}
                </span>
              </div>
              <p className="text-sm text-[#2D2D2D] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {t.definition}
              </p>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#888]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            No terms found. Try a different search.
          </div>
        )}

        <div className="mt-12 border-t border-[#e8e0d0] pt-8">
          <p className="text-sm text-[#888] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            The lexicon grows as the research grows. More terms coming.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
