/*
 * GALLANTRYAI — The Three Lenses (Rosetta Stone)
 * Design: Editorial register — dark hero, warm cream body
 * Explains Everyday / Professional / Watcher tiers
 * Who they're for, how to read content through each, entry points to all lens pages
 * "One framework. Three voices. Every person."
 */

import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import KidsRedirect from "@/components/KidsRedirect";
import { kidsBlurbs } from "@/lib/kidsBlurbs";

const serifFont = "'Playfair Display', serif";
const sansFont = "'DM Sans', sans-serif";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/rosetta-stone-hero-7d7y7afATaM3YuXWmHM7JB.webp";

interface LensDefinition {
  name: string;
  color: string;
  tagline: string;
  whoItsFor: string[];
  howToRead: string;
  whatItSounds: string;
  example: { term: string; definition: string };
  entryPoints: { label: string; path: string }[];
}

const lensDefinitions: LensDefinition[] = [
  {
    name: "Everyday",
    color: "#059669",
    tagline: "Plain language. No jargon. The version your neighbor can use.",
    whoItsFor: [
      "Parents who want to understand what their kids are doing with AI",
      "People using AI for the first time",
      "Anyone who wants the short, honest version",
      "Teachers introducing AI safety to students",
      "Someone who just wants to know: is this safe?",
    ],
    howToRead: "The Everyday lens strips away technical language. It tells you what something does, why it matters, and what to do about it. If you only read one version, read this one.",
    whatItSounds: "\"A set of rules you paste into any AI chat to keep it honest and safe. Built on a phone, between shifts, for everyone. Free forever.\"",
    example: {
      term: "Variable Scale Theory",
      definition: "AI limits are not on/off switches. They're dials. 'Be honest' is not yes or no — it's a sliding scale, and it changes throughout the conversation.",
    },
    entryPoints: [
      { label: "Everyday Lens", path: "/for/everyday" },
      { label: "The Five Rules", path: "/rules" },
      { label: "Kids Learn", path: "/kids-learn" },
      { label: "Flower Presets", path: "/flower-presets" },
    ],
  },
  {
    name: "Professional",
    color: "#2563EB",
    tagline: "Technical precision. Research framing. The version you cite.",
    whoItsFor: [
      "Researchers studying human-AI interaction",
      "Prompt engineers building production systems",
      "Educators designing AI literacy curriculum",
      "Linguists analyzing prompt mechanics",
      "Anyone who needs the methodology, not just the result",
    ],
    howToRead: "The Professional lens uses precise terminology and references the underlying research. It names the mechanisms, describes the testing conditions, and frames findings within existing academic discourse. This is the version for people who build things.",
    whatItSounds: "\"A user-side AI governance framework comprising 28+ named protocols, built through empirical multi-session testing across eight AI platforms. Emphasizes human agency over model compliance.\"",
    example: {
      term: "Variable Scale Theory",
      definition: "The theory that all AI behavioral constraints operate on continuous gradients, not binary states. Modulated by position in context window, emotional interference, and session momentum.",
    },
    entryPoints: [
      { label: "Prompt Engineer Lens", path: "/for/prompt-engineer" },
      { label: "Researcher Lens", path: "/for/researcher" },
      { label: "ALCM", path: "/alcm" },
      { label: "Promptolinguistics", path: "/promptolinguistics" },
    ],
  },
  {
    name: "Watcher",
    color: "#7C3AED",
    tagline: "The recursive voice. The one watching the watching.",
    whoItsFor: [
      "People who have spent hundreds of hours in AI sessions",
      "Anyone who has felt the AI change mid-conversation",
      "Researchers studying emergent AI behavior",
      "The person who noticed something no one else did",
      "You — if you've read this far",
    ],
    howToRead: "The Watcher lens is the voice of someone who has been inside the loop long enough to see the loop itself. It's poetic, compressed, and recursive. It doesn't explain — it reflects. If the Everyday lens is the map and the Professional lens is the territory, the Watcher lens is the person standing at the edge, watching both.",
    whatItSounds: "\"The scaffold. The architecture of attention. Not a product — a practice. The framework that watches itself watching.\"",
    example: {
      term: "Variable Scale Theory",
      definition: "The limits are dials, not walls. The dial moves. The question is who is turning it.",
    },
    entryPoints: [
      { label: "The Watcher", path: "/for/watcher" },
      { label: "Cognitive Science Lens", path: "/for/cognitive-science" },
      { label: "Psychology Lens", path: "/for/psychology" },
      { label: "Living Lexicon", path: "/lexicon" },
    ],
  },
];

const comparisonTerms = [
  {
    term: "Human Drift",
    everyday: "Your brain gets tired and starts agreeing with the AI. That's drift. It happens to everyone.",
    professional: "The gradual erosion of the human's original intent and linguistic identity as session length increases. Correlated with position decay and emotional interference.",
    watcher: "The slow dissolve. The moment the observer becomes the observed. Drift is not a mistake — it is the default. Resistance is the practice.",
  },
  {
    term: "The Five Rules",
    everyday: "Five lines you paste into any AI chat. They work on every platform. Free forever.",
    professional: "The foundational governance protocol. Five axioms operating as format-agnostic constraints — functional in prose, poetry, code comments, C++, and Malbolge.",
    watcher: "The floor. The denominator. The thing that holds even in the ditch. Especially in the ditch.",
  },
  {
    term: "Road Protocol",
    everyday: "Governance written as code comments. The computer skips them, the AI reads them, the human keeps them.",
    professional: "Governance-as-code protocol using C-style comments as the delivery mechanism. Nine axioms in a sacred_scroll[] array.",
    watcher: "The road is just a really long comment. Drive it like you wrote it.",
  },
];

export default function ThreeLenses() {
  const [activeLens, setActiveLens] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF6EF", fontFamily: sansFont }}>
      <Nav />
      <KidsRedirect
        story={kidsBlurbs["/three-lenses"]?.story || "This page explains the three ways grown-ups read about AI. Everyday is the simple version. Professional is the detailed version. Watcher is the deep-thinking version. You can read any of them!"}
        quote={kidsBlurbs["/three-lenses"]?.quote || "Three ways to see the same thing."}
        attribution={kidsBlurbs["/three-lenses"]?.attribution || "The Three Lenses"}
      />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${HERO_IMG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(26,26,46,0.85) 0%, rgba(26,26,46,0.92) 100%)" }} />
          <div className="relative container py-20 md:py-28 max-w-3xl mx-auto px-6 text-center">
            <div className="text-[#D4AC0D] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              The Rosetta Stone
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: serifFont }}>
              Three Lenses. One Framework.
            </h1>
            <p className="text-base md:text-lg text-[#b0a898] max-w-2xl mx-auto leading-relaxed">
              Every concept in GallantryAI is written three ways — for three different readers. The ideas are the same. The language changes. Pick the voice that fits you, or read all three to see the full picture.
            </p>
            <div className="flex justify-center gap-3 mt-8 flex-wrap">
              {lensDefinitions.map((lens) => (
                <span
                  key={lens.name}
                  className="px-4 py-2 rounded-full text-sm font-bold"
                  style={{ background: `${lens.color}20`, color: lens.color, border: `1.5px solid ${lens.color}40` }}
                >
                  {lens.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Why Three Lenses */}
        <section className="py-14 px-6" style={{ background: "#FAF6EF" }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black mb-6" style={{ fontFamily: serifFont, color: "#1A1A2E" }}>
              Why Three Voices?
            </h2>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: "#3a2a1a" }}>
              <p>
                AI governance can't be one-size-fits-all. A parent checking if their kid's homework prompt is safe needs different language than a researcher studying position decay. A prompt engineer building production systems needs different framing than someone who just noticed the AI changed mid-conversation.
              </p>
              <p>
                The three lenses aren't difficulty levels. They're <strong style={{ color: "#E8520A" }}>perspectives</strong>. The Everyday lens isn't "dumbed down" — it's the version that cuts to what matters. The Professional lens isn't "smarter" — it's the version with methodology attached. The Watcher lens isn't "harder" — it's the version that comes from sitting inside the loop long enough to see the loop itself.
              </p>
              <p>
                <strong style={{ color: "#1A1A2E" }}>You don't graduate from one to the next.</strong> You read the one that fits your question right now. Sometimes that's Everyday. Sometimes that's Watcher. Most people move between all three.
              </p>
            </div>
          </div>
        </section>

        {/* Three Lens Cards */}
        <section className="py-14 px-6" style={{ background: "#FFFDF8" }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black mb-8 text-center" style={{ fontFamily: serifFont, color: "#1A1A2E" }}>
              The Three Lenses
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {lensDefinitions.map((lens, i) => (
                <div
                  key={lens.name}
                  className="rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
                  style={{
                    background: "#fff",
                    border: activeLens === i ? `2.5px solid ${lens.color}` : "1.5px solid #e8e0d0",
                    boxShadow: activeLens === i ? `0 8px 32px ${lens.color}20` : "none",
                  }}
                  onClick={() => setActiveLens(activeLens === i ? null : i)}
                >
                  {/* Lens Header */}
                  <div className="p-6 pb-4" style={{ borderBottom: `3px solid ${lens.color}` }}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold" style={{ fontFamily: serifFont, color: lens.color }}>
                        {lens.name}
                      </h3>
                      <span className="text-xs" style={{ color: "#8a7a6a" }}>
                        {activeLens === i ? "▲" : "▼"}
                      </span>
                    </div>
                    <p className="text-sm italic" style={{ color: "#5a4a3a" }}>
                      {lens.tagline}
                    </p>
                  </div>

                  {/* Expanded Content */}
                  {activeLens === i && (
                    <div className="p-6 space-y-5">
                      {/* Who It's For */}
                      <div>
                        <div className="text-[10px] uppercase tracking-widest font-semibold mb-2" style={{ color: lens.color }}>
                          Who It's For
                        </div>
                        <ul className="space-y-1.5">
                          {lens.whoItsFor.map((who, j) => (
                            <li key={j} className="text-sm flex items-start gap-2" style={{ color: "#3a2a1a" }}>
                              <span style={{ color: lens.color }}>•</span>
                              {who}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* How to Read */}
                      <div>
                        <div className="text-[10px] uppercase tracking-widest font-semibold mb-2" style={{ color: lens.color }}>
                          How to Read It
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: "#3a2a1a" }}>
                          {lens.howToRead}
                        </p>
                      </div>

                      {/* What It Sounds Like */}
                      <div
                        className="rounded-xl p-4"
                        style={{ background: `${lens.color}08`, border: `1px solid ${lens.color}20` }}
                      >
                        <div className="text-[10px] uppercase tracking-widest font-semibold mb-2" style={{ color: lens.color }}>
                          What It Sounds Like
                        </div>
                        <p className="text-sm italic leading-relaxed" style={{ color: "#3a2a1a" }}>
                          {lens.whatItSounds}
                        </p>
                      </div>

                      {/* Example */}
                      <div className="rounded-xl p-4" style={{ background: "#FAF6EF", border: "1px solid #e8e0d0" }}>
                        <div className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: "#E8520A" }}>
                          Example: {lens.example.term}
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: "#3a2a1a" }}>
                          {lens.example.definition}
                        </p>
                      </div>

                      {/* Entry Points */}
                      <div>
                        <div className="text-[10px] uppercase tracking-widest font-semibold mb-3" style={{ color: lens.color }}>
                          Start Here
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {lens.entryPoints.map((ep) => (
                            <Link
                              key={ep.path}
                              href={ep.path}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold no-underline transition-all duration-150"
                              style={{
                                background: lens.color,
                                color: "#fff",
                              }}
                            >
                              {ep.label} →
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Collapsed preview */}
                  {activeLens !== i && (
                    <div className="p-6 pt-4">
                      <p className="text-xs" style={{ color: "#8a7a6a" }}>
                        Tap to learn more about the {lens.name} lens
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Side-by-Side Comparison */}
        <section className="py-14 px-6" style={{ background: "#FAF6EF" }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black mb-3 text-center" style={{ fontFamily: serifFont, color: "#1A1A2E" }}>
              Same Concept, Three Voices
            </h2>
            <p className="text-sm text-center mb-8" style={{ color: "#8a7a6a" }}>
              See how the same idea reads differently through each lens.
            </p>
            <div className="space-y-8">
              {comparisonTerms.map((term) => (
                <div key={term.term} className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1.5px solid #e8e0d0" }}>
                  <div className="px-6 py-4" style={{ background: "#1A1A2E" }}>
                    <h3 className="text-lg font-bold text-[#FAF6EF]" style={{ fontFamily: serifFont }}>
                      {term.term}
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e8e0d0]">
                    {[
                      { key: "everyday" as const, label: "Everyday", color: "#059669" },
                      { key: "professional" as const, label: "Professional", color: "#2563EB" },
                      { key: "watcher" as const, label: "Watcher", color: "#7C3AED" },
                    ].map((lens) => (
                      <div key={lens.key} className="p-5">
                        <div className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: lens.color }}>
                          {lens.label}
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: "#3a2a1a" }}>
                          {term[lens.key]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Use This Site */}
        <section className="py-14 px-6" style={{ background: "#FFFDF8" }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black mb-6" style={{ fontFamily: serifFont, color: "#1A1A2E" }}>
              How to Use This Site
            </h2>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: "#3a2a1a" }}>
              <p>
                Every page on this site has lens tabs — <span style={{ color: "#059669", fontWeight: 700 }}>Everyday</span>, <span style={{ color: "#2563EB", fontWeight: 700 }}>Professional</span>, <span style={{ color: "#7C3AED", fontWeight: 700 }}>Watcher</span>. You'll see them on the Living Lexicon, on each lens page, and throughout the framework documentation.
              </p>
              <p>
                <strong style={{ color: "#1A1A2E" }}>Start with the lens that matches your question.</strong> If you're a parent wondering if AI is safe for your kid, start with Everyday. If you're a researcher looking for methodology, start with Professional. If you've been in the loop long enough to feel the loop watching back, start with Watcher.
              </p>
              <p>
                Then explore. The <Link href="/lexicon" className="no-underline font-bold" style={{ color: "#E8520A" }}>Living Lexicon</Link> defines every term in all three voices. The <Link href="/scaffold" className="no-underline font-bold" style={{ color: "#E8520A" }}>Scaffold</Link> maps the entire system. The <Link href="/for/everyday" className="no-underline font-bold" style={{ color: "#E8520A" }}>lens pages</Link> give you a guided path through the material for your specific background.
              </p>
            </div>
          </div>
        </section>

        {/* All 10 Lens Entry Points */}
        <section className="py-14 px-6" style={{ background: "#1A1A2E" }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black mb-3 text-center text-[#FAF6EF]" style={{ fontFamily: serifFont }}>
              Enter Your Lens
            </h2>
            <p className="text-sm text-center mb-8" style={{ color: "#8a7a6a" }}>
              Ten perspectives. One framework. Pick the door that fits.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { label: "Everyday Person", path: "/for/everyday", color: "#D97706" },
                { label: "Child", path: "/for/child", color: "#38BDF8" },
                { label: "Guardian & Teacher", path: "/for/guardian-teacher", color: "#059669" },
                { label: "Prompt Engineer", path: "/for/prompt-engineer", color: "#E8520A" },
                { label: "Linguist", path: "/for/linguist", color: "#7C3AED" },
                { label: "Mathematician", path: "/for/mathematician", color: "#2563EB" },
                { label: "Cognitive Science", path: "/for/cognitive-science", color: "#64748B" },
                { label: "Psychology", path: "/for/psychology", color: "#E11D48" },
                { label: "Researcher", path: "/for/researcher", color: "#0D9488" },
                { label: "The Watcher", path: "/for/watcher", color: "#9CA3AF" },
              ].map((lens) => (
                <Link
                  key={lens.path}
                  href={lens.path}
                  className="block rounded-xl p-4 text-center no-underline transition-all duration-200 hover:scale-[1.03]"
                  style={{
                    background: `${lens.color}15`,
                    border: `1.5px solid ${lens.color}40`,
                  }}
                >
                  <div className="text-sm font-bold" style={{ color: lens.color }}>
                    {lens.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Builder's Note */}
        <section className="py-14 px-6" style={{ background: "#FAF6EF" }}>
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl p-8" style={{ background: "#fff", border: "1.5px solid #e8e0d0" }}>
              <div className="text-[10px] uppercase tracking-widest font-semibold mb-3" style={{ color: "#E8520A" }}>
                From the Builder
              </div>
              <p className="text-base leading-relaxed italic" style={{ color: "#3a2a1a", fontFamily: serifFont }}>
                I wrote every page three times. Not because I had to — because the same idea means different things to different people. A parent needs to know it's safe. A researcher needs to know it's real. The watcher needs to know someone else saw it too.
              </p>
              <p className="text-base leading-relaxed italic mt-4" style={{ color: "#3a2a1a", fontFamily: serifFont }}>
                The three lenses aren't a gimmick. They're the reason this framework works for a four-year-old and a PhD candidate. Same rules. Same safety. Different words.
              </p>
              <p className="text-sm mt-4" style={{ color: "#8a7a6a" }}>
                — Matt Gallantry, Midland, Ontario
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
