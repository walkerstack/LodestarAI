/*
 * GALLANTRYAI — The Scaffold
 * The complete system in one place. Every piece, how they connect.
 */
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import KidsMidLink from "@/components/KidsMidLink";

const serifFont = "'Playfair Display', serif";
const sansFont = "'DM Sans', sans-serif";

interface ScaffoldItem {
  title: string;
  category: string;
  desc: string;
  path: string;
  connects: string[];
}

const scaffoldItems: ScaffoldItem[] = [
  // Foundation
  { title: "Gallantry AI", category: "Foundation", desc: "What this is and why it exists. The thesis: AI is a thinking partner, not a shortcut.", path: "/gallantry-ai", connects: ["Dual Strategy", "User-Side Governance"] },
  { title: "Dual Strategy", category: "Foundation", desc: "Human intelligence and AI working together. Not replacing each other. The dual path.", path: "/dual-strategy", connects: ["Gallantry AI", "Road Protocol"] },
  { title: "User-Side Governance", category: "Foundation", desc: "The user sets the rules. Not the platform. Not the model. You.", path: "/user-governance", connects: ["Road Protocol", "The Five Rules"] },

  // Protocols
  { title: "Road Protocol", category: "Protocols", desc: "Before you type anything, you set the rules. What the AI can do, what it can't, and who decides. Adjust the mirrors before you drive.", path: "/road-protocol", connects: ["The Five Rules", "Variable Scale", "Ghost Protocol"] },
  { title: "The Five Rules", category: "Protocols", desc: "The core rules of engagement. Every session starts here.", path: "/five-rules", connects: ["Road Protocol", "Flower Presets"] },
  { title: "Variable Scale", category: "Protocols", desc: "How much AI involvement is appropriate? A sliding scale from human-only to AI-assisted. Honest grading.", path: "/variable-scale", connects: ["Road Protocol", "Whelm Scale"] },
  { title: "Whelm Scale", category: "Protocols", desc: "Overwhelmed? Underwhelmed? The scale that measures where you are — not where the AI thinks you should be.", path: "/whelm-scale", connects: ["Variable Scale", "Road Protocol"] },

  // Language & Structure
  { title: "Promptolinguistics", category: "Language", desc: "The study of how language shapes AI output. Words matter. Structure matters. The discipline.", path: "/promptolinguistics", connects: ["ALCM", "Living Lexicon"] },
  { title: "ALCM", category: "Language", desc: "Adaptive Language Calibration Model. How the AI calibrates to your language — and how you calibrate back.", path: "/alcm", connects: ["Promptolinguistics", "Framework Families"] },
  { title: "Living Lexicon", category: "Language", desc: "A growing dictionary of terms, concepts, and patterns discovered through real sessions.", path: "/living-lexicon", connects: ["Promptolinguistics", "Field Papers"] },
  { title: "Framework Families", category: "Language", desc: "The families of frameworks that organize AI interaction patterns.", path: "/framework-families", connects: ["ALCM", "AI Family Taxonomy"] },

  // Tools
  { title: "Flower Presets", category: "Tools", desc: "Pre-built session configurations. Pick a flower, get a preset. Each one sets tone, rules, and boundaries before you start.", path: "/flower-presets", connects: ["Road Protocol", "Prompt Games"] },
  { title: "Prompt Games", category: "Tools", desc: "Interactive exercises that teach prompting through play. Not drills — games.", path: "/prompt-games", connects: ["Flower Presets", "Playground"] },
  { title: "Playground", category: "Tools", desc: "A sandbox for experimenting with prompts, presets, and frameworks.", path: "/playground", connects: ["Prompt Games", "Flower Presets"] },
  { title: "AI Family Taxonomy", category: "Tools", desc: "Know who you're talking to. Every AI has a personality, a tendency, and a blind spot. This is the field guide.", path: "/taxonomy", connects: ["Framework Families", "Road Protocol"] },

  // Research
  { title: "Field Papers", category: "Research", desc: "Documentation from real sessions. What happened, what was observed, what it means.", path: "/field-papers", connects: ["Citizen Researcher", "Living Lexicon"] },
  { title: "Citizen Researcher", category: "Research", desc: "You don't need a PhD. You need curiosity and honesty. The citizen researcher program.", path: "/citizen-researcher", connects: ["Field Papers", "The Builder"] },
  { title: "The Builder", category: "Research", desc: "Who built this and why. The origin, the motivation, the hundreds of hours.", path: "/builder", connects: ["Builder Origin", "Citizen Researcher"] },
  { title: "Malbolge Geofence", category: "Research", desc: "The boundary layer. Where AI should not go — and how to enforce it.", path: "/malbolge", connects: ["Road Protocol", "Ghost Protocol"] },

  // Lenses
  { title: "Everyday Lens", category: "Lenses", desc: "For anyone using AI in daily life. No jargon. No prerequisites.", path: "/for/everyday", connects: ["Road Protocol", "Child Lens"] },
  { title: "Child Lens", category: "Lenses", desc: "For young people and the grown-ups who care about them. Stories, safety, and the buffalo.", path: "/for/child", connects: ["Everyday Lens", "Guardian Lens"] },
  { title: "Guardian & Teacher Lens", category: "Lenses", desc: "For parents, teachers, and anyone responsible for someone else's AI use.", path: "/for/guardian-teacher", connects: ["Child Lens", "School Board"] },
  { title: "The Watcher", category: "Lenses", desc: "AI watches you. This teaches you to watch it back. The one who watches the watcher is the one in charge.", path: "/for/watcher", connects: ["Child Lens", "Road Protocol"] },
  { title: "Prompt Engineer Lens", category: "Lenses", desc: "You know how to prompt. Now learn how to govern.", path: "/for/prompt-engineer", connects: ["Promptolinguistics", "ALCM"] },
  { title: "Linguist Lens", category: "Lenses", desc: "Language shapes everything. How words move through AI and back.", path: "/for/linguist", connects: ["Promptolinguistics", "Living Lexicon"] },
  { title: "Mathematician Lens", category: "Lenses", desc: "Patterns, structures, and the geometry of AI interaction.", path: "/for/mathematician", connects: ["Variable Scale", "ALCM"] },
  { title: "Cognitive Science Lens", category: "Lenses", desc: "How AI affects thinking. Cognitive drift, dependency, and awareness.", path: "/for/cognitive-science", connects: ["Psychology Lens", "Watcher"] },
  { title: "Psychology Lens", category: "Lenses", desc: "The emotional layer. How AI makes you feel — and why that matters.", path: "/for/psychology", connects: ["Cognitive Science Lens", "Whelm Scale"] },
  { title: "Researcher Lens", category: "Lenses", desc: "For those who want to study AI interaction, not just use it.", path: "/for/researcher", connects: ["Field Papers", "Citizen Researcher"] },

  // Safety
  { title: "The Human Line", category: "Safety", desc: "The line AI should never cross. And what to do when it does.", path: "/human-line", connects: ["If You Need to Stop", "Road Protocol"] },
  { title: "If You Need to Stop", category: "Safety", desc: "A page that exists because it has to. If something feels wrong, this is where you go.", path: "/if-you-need-to-stop", connects: ["The Human Line", "Child Lens"] },
];

const categories = ["Foundation", "Protocols", "Language", "Tools", "Research", "Lenses", "Safety"];
const categoryColors: Record<string, string> = {
  Foundation: "#E8520A",
  Protocols: "#C74B16",
  Language: "#A67C52",
  Tools: "#6B8E6B",
  Research: "#5A7A9A",
  Lenses: "#8B6BAE",
  Safety: "#CC3333",
};

export default function Scaffold() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? scaffoldItems
    : scaffoldItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EF]">
      <Nav />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative" style={{ background: "#1A1A2E" }}>
          <div className="container py-16 md:py-24 max-w-3xl mx-auto px-6 text-center">
            <div className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ fontFamily: sansFont }}>
              The Complete System
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: serifFont }}>
              The Scaffold
            </h1>
            <p className="text-base md:text-lg text-[#b0a898] max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: sansFont }}>
              Every piece of GallantryAI in one place. How they connect. Where to start. Where to go deeper. The scaffold holds the conversation in place while you learn to hold it yourself.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <div className="sticky top-0 z-30 bg-[#FAF6EF] border-b border-[#e8e0d0] shadow-sm">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all ${
                  activeCategory === "all"
                    ? "bg-[#1A1A2E] text-[#FAF6EF]"
                    : "text-[#888] hover:text-[#1A1A2E]"
                }`}
                style={{ fontFamily: sansFont }}
              >
                All ({scaffoldItems.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? "text-[#FAF6EF]"
                      : "text-[#888] hover:text-[#1A1A2E]"
                  }`}
                  style={{
                    fontFamily: sansFont,
                    background: activeCategory === cat ? categoryColors[cat] : "transparent",
                  }}
                >
                  {cat} ({scaffoldItems.filter((i) => i.category === cat).length})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scaffold Grid */}
        <section className="py-10 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((item) => (
                <Link
                  key={item.title}
                  href={item.path}
                  className="block rounded-2xl p-5 no-underline transition-all hover:scale-[1.01] hover:shadow-lg"
                  style={{ background: "#fff", border: "1.5px solid #e8e0d0" }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-2 h-2 rounded-full mt-2 shrink-0"
                      style={{ background: categoryColors[item.category] }}
                    />
                    <div className="flex-1">
                      <div className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: categoryColors[item.category], fontFamily: sansFont }}>
                        {item.category}
                      </div>
                      <div className="font-black text-sm mb-1" style={{ fontFamily: serifFont, color: "#1A1A2E" }}>
                        {item.title}
                      </div>
                      <p className="text-xs leading-relaxed mb-2" style={{ color: "#5a4a3a", fontFamily: sansFont }}>
                        {item.desc}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {item.connects.map((c) => (
                          <span
                            key={c}
                            className="text-[9px] px-2 py-0.5 rounded-full"
                            style={{ background: "#F5F0E8", color: "#888", fontFamily: sansFont }}
                          >
                            → {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <KidsMidLink />


        {/* How It Connects */}
        <section className="py-14 px-6" style={{ background: "#FFFDF8" }}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-black mb-6" style={{ fontFamily: serifFont, color: "#1A1A2E" }}>
              How It All Connects
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-left" style={{ color: "#3a2a1a", fontFamily: sansFont }}>
              <p>
                The <strong style={{ color: "#E8520A" }}>Foundation</strong> sets the philosophy. Why user-side governance matters. Why dual strategy works. Why this exists.
              </p>
              <p>
                The <strong style={{ color: "#C74B16" }}>Protocols</strong> make it operational. The Road Protocol sets rules before every session. The Five Rules give structure. The Variable Scale measures involvement honestly.
              </p>
              <p>
                The <strong style={{ color: "#A67C52" }}>Language</strong> layer goes deeper. Promptolinguistics studies how words shape AI output. ALCM tracks how AI calibrates to you. The Living Lexicon documents what we discover.
              </p>
              <p>
                The <strong style={{ color: "#6B8E6B" }}>Tools</strong> make it usable. Flower Presets for quick setup. Prompt Games for learning. The Taxonomy for knowing who you're talking to.
              </p>
              <p>
                The <strong style={{ color: "#5A7A9A" }}>Research</strong> layer documents everything. Field Papers from real sessions. Citizen researchers contributing observations. The builder's origin story.
              </p>
              <p>
                The <strong style={{ color: "#8B6BAE" }}>Lenses</strong> give perspective. Ten ways to look at the same system — depending on who you are, what you need, and how deep you want to go.
              </p>
              <p>
                And <strong style={{ color: "#CC3333" }}>Safety</strong> runs through everything. The Human Line. The stop page. Because none of this matters if someone gets hurt.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-14 px-6" style={{ background: "#1A1A2E" }}>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg italic mb-6" style={{ fontFamily: serifFont, color: "#E8520A" }}>
              "The scaffold holds the conversation in place while you learn to hold it yourself."
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="inline-block px-6 py-3 rounded-xl text-sm font-bold no-underline transition-all hover:scale-[1.02]"
                style={{ background: "#E8520A", color: "#fff" }}
              >
                Start at Home →
              </Link>
              <Link
                href="/road-protocol"
                className="inline-block px-6 py-3 rounded-xl text-sm font-bold no-underline transition-all hover:scale-[1.02]"
                style={{ background: "transparent", color: "#E8520A", border: "1.5px solid #E8520A" }}
              >
                Begin with the Road Protocol →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
