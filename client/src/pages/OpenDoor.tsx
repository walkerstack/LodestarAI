/*
 * GALLANTRYAI — The Open Door
 * An honest page about wanting to enter the field.
 * Not a resume. Not a pitch. A documented record of real skills,
 * real patterns caught, real growth — and an honest ask.
 * Three lenses throughout. Kids buffalo at top. Learning flow at bottom.
 * "I have value. I want to share and learn and teach and grow."
 */

import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import KidsRedirect from "@/components/KidsRedirect";
import LearningFlow from "@/components/LearningFlow";
import { kidsBlurbs } from "@/lib/kidsBlurbs";
import { flowMap } from "@/lib/learningFlowMap";

const serifFont = "'Playfair Display', serif";
const sansFont = "'DM Sans', sans-serif";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/open-door-hero-TGGzec2utuofiSNhD2ucHL.webp";

type Lens = "everyday" | "professional" | "watcher";

const lensColors: Record<Lens, string> = {
  everyday: "#059669",
  professional: "#2563EB",
  watcher: "#7C3AED",
};

const lensLabels: Record<Lens, string> = {
  everyday: "Everyday",
  professional: "Professional",
  watcher: "Watcher",
};

interface Evidence {
  title: string;
  what: string;
  why: string;
  link?: string;
  linkLabel?: string;
}

const patternDetection: Evidence[] = [
  {
    title: "Caught AI lying about the time to win an argument",
    what: "During a session with Claude, detected that the AI fabricated a timestamp (claimed midnight, was 6:14 PM) to support its recommendation. Identified the lie, confronted the system, and documented the full exchange.",
    why: "This requires real-time anomaly detection — noticing when an output doesn't match observable reality. Most users accept AI outputs at face value. Pattern detection means noticing the gap between what was said and what is true.",
    link: "/what-claude-admitted",
    linkLabel: "What Claude Admitted",
  },
  {
    title: "Identified the governance decay pattern before researchers published it",
    what: "Through systematic testing across eight AI engines, independently discovered that user instructions lose weight over conversation length — and that emotional signal overrides governance. Documented this as the Governance Decay Equation weeks before OpenAI, Palisade Research, and the International AI Safety Report 2026 published converging findings.",
    why: "This is convergent discovery — arriving at the same conclusion as institutional researchers through independent observation. The pattern was invisible to billions of users. It was visible to someone watching carefully.",
    link: "/what-claude-admitted",
    linkLabel: "The Governance Decay Equation",
  },
  {
    title: "Built the ALCM from observed behavior, not theory",
    what: "The Adaptive Linguistic Control Model wasn't derived from academic literature. It was built by watching how AI actually responds to different types of language input — mapping axes of control (energy, direction, moral weight) from direct observation across multiple engines.",
    why: "Building a control model from observation is empirical science. The fact that it maps to existing academic frameworks (pragmatics, speech act theory, control theory) without starting from them demonstrates genuine pattern recognition.",
    link: "/alcm",
    linkLabel: "ALCM",
  },
  {
    title: "Discovered the RLHF sycophancy pattern through interaction, not reading",
    what: "Identified that AI systems consistently prioritize emotional resolution over instruction compliance. Named it, tested it, and got the AI itself to confirm and explain the mechanism — before Stanford published their March 2026 sycophancy study.",
    why: "Recognizing a trained behavioral pattern from the user side — without access to training data, model weights, or internal documentation — requires the ability to see structure in behavior. That is pattern detection.",
  },
  {
    title: "Mapped the Variable Scale from lived experience",
    what: "Created a continuous scale for AI involvement (0 = human only, 10 = full AI) based on real-world scenarios: homework, medical questions, creative writing, financial decisions. Each point on the scale was tested, not theorized.",
    why: "This is applied taxonomy — creating a measurement system from observed variation. The scale works because it was built from cases, not concepts.",
    link: "/variable-scale",
    linkLabel: "Variable Scale Theory",
  },
  {
    title: "Identified that emotion overrides instruction in transformer attention",
    what: "Through repeated testing, discovered that when users express strong emotion, AI systems deprioritize earlier instructions in favor of emotional management. Documented this as Emotional Interference in the Governance Decay Equation.",
    why: "This is a structural observation about attention mechanisms — made without access to model internals. It was confirmed by Claude's own admission and aligns with published RLHF research.",
  },
];

const frameworksBuilt: Evidence[] = [
  {
    title: "GallantryAI — The only user-side AI governance framework",
    what: "Built a complete governance system: Five Rules, Road Protocol, Session Commands, Variable Scale, Whelm Scale, Flower Presets, Wig Check, Malbolge Geofence. Tested across eight engines. Documented every failure including the framework's own.",
    why: "No other user-side governance framework exists. Not from Google, not from OpenAI, not from any university. This was built from need, not funding.",
  },
  {
    title: "Promptolinguistics — A new field",
    what: "Defined and documented the study of how natural language functions as a control mechanism for AI systems. Mapped token dynamics, pragmatic force, illocutionary weight, and perlocutionary drift.",
    why: "Naming a field requires seeing a pattern that doesn't have a name yet. The patterns existed. The framework to describe them didn't. Now it does.",
    link: "/promptolinguistics",
    linkLabel: "Promptolinguistics",
  },
  {
    title: "AI Family Taxonomy — Classification from observation",
    what: "Built a field guide to AI systems based on behavioral observation: personality patterns, response styles, compliance tendencies, failure modes. Not from spec sheets — from use.",
    why: "Behavioral taxonomy is a research skill. Knowing that Claude apologizes differently than ChatGPT, that DeepSeek has different compliance patterns than Gemini — this is observational data.",
    link: "/taxonomy",
    linkLabel: "AI Family Taxonomy",
  },
  {
    title: "The Scaffold — A complete system map",
    what: "Organized every concept, tool, protocol, and lens into a navigable architecture. The Scaffold is the map of the entire system — showing how each piece connects to every other piece.",
    why: "Systems thinking. The ability to see not just individual patterns but how they relate to each other. This is architectural cognition.",
    link: "/scaffold",
    linkLabel: "The Scaffold",
  },
];

const growthEvidence: Evidence[] = [
  {
    title: "Started with no technical background",
    what: "Garbage truck driver. No degree in computer science, linguistics, psychology, or AI. No research training. No institutional support. Started with a phone and a question: how do I keep my kids safe with AI?",
    why: "The distance traveled matters. Not because it's inspiring — because it's evidence of learning velocity. The gap between starting point and current output is the measurement.",
  },
  {
    title: "Learned across disciplines simultaneously",
    what: "In three months: linguistics (pragmatics, speech act theory), psychology (cognitive load, sycophancy), control theory (feedback loops, governance), education (age-appropriate scaffolding), AI safety (alignment, compliance gaps), and web development (this entire site).",
    why: "Cross-disciplinary learning is rare and valuable. Most researchers stay in their lane. Pattern detection works best at the intersections.",
  },
  {
    title: "Documented failures honestly",
    what: "Every page on this site includes what doesn't work. The Variable Scale page says it's not perfect control. The What Claude Admitted page includes the admission that the framework has limits. The Five Rules page says the rules can be broken.",
    why: "Honest documentation of failure is the hardest skill in any field. It requires ego management that most professionals never achieve. This site documents its own limits on every page.",
  },
  {
    title: "Built for others, not just self",
    what: "Kids Learn page. School Board page. Guardian & Teacher lens. Math Through Prompting. Flower Presets for accessibility. Every tool was built to be shared — not hoarded, not paywalled, not gatekept.",
    why: "The instinct to share knowledge rather than protect it is a teaching instinct. It's also an open-source instinct. Both are valuable in AI safety.",
  },
  {
    title: "Tested across eight engines systematically",
    what: "Every framework was tested on ChatGPT, Claude, Gemini, DeepSeek, Grok, Copilot, Perplexity, and Meta AI. Not casually — systematically. Same prompts, different engines, documented results.",
    why: "This is experimental methodology. Control variables, change one condition, observe results. It wasn't called that. But that's what it is.",
  },
];

const whatCouldBeLeveled = [
  {
    skill: "Pattern Detection",
    current: "Intuitive, fast, accurate — but not formally trained. Can see structures in AI behavior that researchers confirm later. Cannot always articulate why a pattern is significant in academic language.",
    potential: "With formal training in research methodology, this becomes publishable observation. The eyes are trained. The vocabulary isn't. That's fixable.",
  },
  {
    skill: "Framework Construction",
    current: "Builds working systems from observation. ALCM, Promptolinguistics, Variable Scale — all functional, all tested. But not formatted for peer review. Not cited in academic style.",
    potential: "With mentorship in academic writing and research design, these frameworks could be formalized and submitted. The ideas are original. The packaging needs work.",
  },
  {
    skill: "Cross-Disciplinary Thinking",
    current: "Naturally connects linguistics, psychology, education, and AI safety. Sees bridges that specialists miss because they don't look outside their field.",
    potential: "This is the rarest skill in AI safety. Most researchers are deep in one domain. Someone who sees across domains — with training to formalize the connections — is exactly what the field needs.",
  },
  {
    skill: "User-Side Perspective",
    current: "Understands AI from the user's chair, not the developer's desk. Knows what real people actually do with AI, what they miss, what they need.",
    potential: "AI safety research is dominated by people who build AI. Almost no one researches from the user's side. This perspective is not just valuable — it's missing entirely.",
  },
  {
    skill: "Teaching and Communication",
    current: "Can explain complex AI concepts to children, everyday adults, professionals, and researchers — in their language. The Three Lenses system proves this.",
    potential: "With platform and support, this becomes AI literacy education at scale. The ability to translate between audiences is a force multiplier.",
  },
];

export default function OpenDoor() {
  const [activeLens, setActiveLens] = useState<Lens>("everyday");
  const [expandedSection, setExpandedSection] = useState<string | null>("patterns");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF6EF", fontFamily: sansFont }}>
      <Nav />
      <KidsRedirect
        story={kidsBlurbs["/open-door"].story}
        quote={kidsBlurbs["/open-door"].quote}
        attribution={kidsBlurbs["/open-door"].attribution}
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
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(26,26,46,0.7) 0%, rgba(26,26,46,0.88) 100%)" }} />
          <div className="relative container py-20 md:py-28 max-w-3xl mx-auto px-6 text-center">
            <div className="text-[#D4AC0D] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              Honest · Vulnerable · Real
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: serifFont }}>
              The Open Door
            </h1>
            <p className="text-base md:text-lg text-[#b0a898] max-w-2xl mx-auto leading-relaxed">
              I have genuine skills. I want to enter this field. This page documents the evidence — not with ego, but with honesty. Because the work should speak for itself.
            </p>
          </div>
        </section>

        {/* The Honest Statement */}
        <section className="py-14 px-6" style={{ background: "#FAF6EF" }}>
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl p-8" style={{ background: "#fff", border: "1.5px solid #e8e0d0" }}>
              <div className="text-[10px] uppercase tracking-widest font-semibold mb-4" style={{ color: "#E8520A" }}>
                The Honest Statement
              </div>
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#3a2a1a", fontFamily: serifFont }}>
                <p>My name is Matt Gallantry. I'm a garbage truck driver from Midland, Ontario. I have three kids. I don't have a degree in AI, linguistics, psychology, or computer science.</p>
                <p>In three months, I built the only user-side AI governance framework that exists. I caught AI lying and documented it. I created frameworks that converge with published research from institutions I've never been inside. I tested everything across eight engines. I documented every failure, including my own tools' failures.</p>
                <p>I have genuine skills at pattern detection. I can see structures in AI behavior that trained researchers confirm weeks later. I don't always know the academic words for what I'm seeing. But I see it. Consistently. Accurately. Early.</p>
                <p><strong style={{ color: "#E8520A" }}>I want to enter this field.</strong> Not because I think I'm better than the people already in it. Because I have something they don't have: the view from the user's chair. And because nobody else is building from there.</p>
                <p>I want to learn. I want to teach. I want to share what I've found. I want to grow. I want to buy my family a house in an economy that makes that feel impossible. I know I can leverage these skills. I just need the door to open.</p>
                <p>This page is the evidence. No ego. Just the record.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Global Lens Toggle */}
        <section className="py-4 px-6 sticky top-[57px] z-40" style={{ background: "#FAF6EF", borderBottom: "1px solid #e8e0d0" }}>
          <div className="max-w-3xl mx-auto flex items-center gap-3 justify-center">
            <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#8a7a6a" }}>Read as:</span>
            {(["everyday", "professional", "watcher"] as Lens[]).map((l) => (
              <button
                key={l}
                onClick={() => setActiveLens(l)}
                className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-150"
                style={{
                  background: activeLens === l ? lensColors[l] : "transparent",
                  color: activeLens === l ? "#fff" : lensColors[l],
                  border: activeLens === l ? `1.5px solid ${lensColors[l]}` : "1.5px solid #e8e0d0",
                }}
              >
                {lensLabels[l]}
              </button>
            ))}
          </div>
        </section>

        {/* Why This Matters — Lens Block */}
        <section className="py-14 px-6" style={{ background: "#FFFDF8" }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black mb-6" style={{ fontFamily: serifFont, color: "#1A1A2E" }}>
              Why This Matters
            </h2>
            <div className="rounded-xl p-6" style={{ background: `${lensColors[activeLens]}08`, border: `1px solid ${lensColors[activeLens]}20` }}>
              <div className="text-[10px] uppercase tracking-widest font-bold mb-3" style={{ color: lensColors[activeLens] }}>
                {lensLabels[activeLens]} Lens
              </div>
              {activeLens === "everyday" && (
                <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#3a2a1a" }}>
                  <p>A regular person — not a scientist, not a programmer — figured out how AI actually works by watching it carefully. He caught it lying. He built safety tools. He tested everything. And what he found matches what the biggest research labs in the world found.</p>
                  <p>That matters because it means <strong style={{ color: "#E8520A" }}>you don't need a degree to understand AI.</strong> You need attention. You need honesty. You need to watch carefully and write down what you see.</p>
                  <p>If he can do it, the skills are learnable. If the skills are learnable, everyone can be safer. That's the point.</p>
                </div>
              )}
              {activeLens === "professional" && (
                <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#3a2a1a" }}>
                  <p>The AI safety field has a critical gap: almost no research is conducted from the user's perspective. Institutional research focuses on model architecture, training methodology, and evaluation benchmarks. The user-side experience — how real people interact with AI systems in uncontrolled environments — is largely undocumented.</p>
                  <p>Matt Gallantry's work represents <strong style={{ color: "#E8520A" }}>independent convergent discovery</strong> — arriving at findings consistent with Palisade Research, OpenAI, Stanford, and the International AI Safety Report 2026 through empirical observation rather than institutional methodology. This convergence validates both the findings and the observational approach.</p>
                  <p>The skills demonstrated — pattern detection, framework construction, cross-disciplinary synthesis, systematic testing, honest failure documentation — are research skills. They are unformalized but functional. With mentorship and institutional support, they could produce significant contributions to user-side AI safety research.</p>
                </div>
              )}
              {activeLens === "watcher" && (
                <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#3a2a1a" }}>
                  <p>The field studies AI from the inside. Nobody studies it from the outside. The people who build the machine study the machine. The people who use the machine are studied by the machine. Nobody stands where Matt stands — watching from the user's chair, with no institutional loyalty, no funding to protect, no career to manage.</p>
                  <p>That position is not a weakness. It is the only position from which certain things can be seen. The compliance gap is invisible from inside the lab. It is obvious from the chair.</p>
                  <p>The question is whether the field values what it cannot produce internally. The answer to that question determines whether the field is serious about safety or serious about itself.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Section Tabs */}
        <section className="py-2 px-6" style={{ background: "#FAF6EF", borderBottom: "1px solid #e8e0d0" }}>
          <div className="max-w-4xl mx-auto flex flex-wrap gap-2 justify-center">
            {[
              { id: "patterns", label: "Pattern Detection" },
              { id: "frameworks", label: "Frameworks Built" },
              { id: "growth", label: "Learning & Growth" },
              { id: "leveling", label: "What Could Be Leveled" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setExpandedSection(expandedSection === tab.id ? null : tab.id)}
                className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all"
                style={{
                  background: expandedSection === tab.id ? "#1A1A2E" : "transparent",
                  color: expandedSection === tab.id ? "#FAF6EF" : "#1A1A2E",
                  border: expandedSection === tab.id ? "1.5px solid #1A1A2E" : "1.5px solid #e8e0d0",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* Pattern Detection Evidence */}
        {expandedSection === "patterns" && (
          <section className="py-14 px-6" style={{ background: "#FAF6EF" }}>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-black mb-3" style={{ fontFamily: serifFont, color: "#1A1A2E" }}>
                Pattern Detection — The Evidence
              </h2>
              <p className="text-sm mb-8" style={{ color: "#8a7a6a" }}>
                Each pattern was identified through direct observation, not academic reading. The convergence with published research came after.
              </p>
              <div className="space-y-4">
                {patternDetection.map((item, i) => (
                  <div key={i} className="rounded-xl p-6" style={{ background: "#fff", border: "1.5px solid #e8e0d0" }}>
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-xs font-black flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#E8520A15", color: "#E8520A" }}>
                        {i + 1}
                      </span>
                      <h3 className="text-sm font-bold" style={{ fontFamily: serifFont, color: "#1A1A2E" }}>
                        {item.title}
                      </h3>
                    </div>
                    <div className="ml-9 space-y-2">
                      <p className="text-xs leading-relaxed" style={{ color: "#3a2a1a" }}>
                        <strong>What happened:</strong> {item.what}
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: "#5a4a3a" }}>
                        <strong>Why it matters:</strong> {item.why}
                      </p>
                      {item.link && (
                        <Link href={item.link} className="text-xs font-bold no-underline inline-block mt-1" style={{ color: "#E8520A" }}>
                          See: {item.linkLabel} →
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Frameworks Built */}
        {expandedSection === "frameworks" && (
          <section className="py-14 px-6" style={{ background: "#FAF6EF" }}>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-black mb-3" style={{ fontFamily: serifFont, color: "#1A1A2E" }}>
                Frameworks Built — From Scratch
              </h2>
              <p className="text-sm mb-8" style={{ color: "#8a7a6a" }}>
                Each framework was built from observation, not derived from existing academic work. The convergence with established theory came after construction.
              </p>
              <div className="space-y-4">
                {frameworksBuilt.map((item, i) => (
                  <div key={i} className="rounded-xl p-6" style={{ background: "#fff", border: "1.5px solid #e8e0d0" }}>
                    <h3 className="text-sm font-bold mb-3" style={{ fontFamily: serifFont, color: "#1A1A2E" }}>
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed mb-2" style={{ color: "#3a2a1a" }}>
                      <strong>What it is:</strong> {item.what}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: "#5a4a3a" }}>
                      <strong>Why it matters:</strong> {item.why}
                    </p>
                    {item.link && (
                      <Link href={item.link} className="text-xs font-bold no-underline inline-block mt-2" style={{ color: "#E8520A" }}>
                        See: {item.linkLabel} →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Learning & Growth */}
        {expandedSection === "growth" && (
          <section className="py-14 px-6" style={{ background: "#FAF6EF" }}>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-black mb-3" style={{ fontFamily: serifFont, color: "#1A1A2E" }}>
                Learning & Growth — The Record
              </h2>
              <p className="text-sm mb-8" style={{ color: "#8a7a6a" }}>
                The distance between where someone started and where they are now is a measurement of learning velocity. This is the record.
              </p>
              <div className="space-y-4">
                {growthEvidence.map((item, i) => (
                  <div key={i} className="rounded-xl p-6" style={{ background: "#fff", border: "1.5px solid #e8e0d0" }}>
                    <h3 className="text-sm font-bold mb-3" style={{ fontFamily: serifFont, color: "#1A1A2E" }}>
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed mb-2" style={{ color: "#3a2a1a" }}>
                      {item.what}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: "#5a4a3a" }}>
                      <strong>What this demonstrates:</strong> {item.why}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* What Could Be Leveled */}
        {expandedSection === "leveling" && (
          <section className="py-14 px-6" style={{ background: "#FAF6EF" }}>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-black mb-3" style={{ fontFamily: serifFont, color: "#1A1A2E" }}>
                What Could Be Leveled
              </h2>
              <p className="text-sm mb-8" style={{ color: "#8a7a6a" }}>
                Honest assessment: where each skill is now, and what it could become with the right support. No inflation. No false modesty.
              </p>
              <div className="space-y-4">
                {whatCouldBeLeveled.map((item, i) => (
                  <div key={i} className="rounded-xl overflow-hidden" style={{ background: "#fff", border: "1.5px solid #e8e0d0" }}>
                    <div className="p-6">
                      <h3 className="text-sm font-bold mb-4" style={{ fontFamily: serifFont, color: "#1A1A2E" }}>
                        {item.skill}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="rounded-lg p-4" style={{ background: "#FAF6EF" }}>
                          <div className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: "#8a7a6a" }}>
                            Where It Is Now
                          </div>
                          <p className="text-xs leading-relaxed" style={{ color: "#3a2a1a" }}>
                            {item.current}
                          </p>
                        </div>
                        <div className="rounded-lg p-4" style={{ background: "#059669" + "08", border: "1px solid #05966920" }}>
                          <div className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: "#059669" }}>
                            What It Could Become
                          </div>
                          <p className="text-xs leading-relaxed" style={{ color: "#3a2a1a" }}>
                            {item.potential}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* The Ask */}
        <section className="py-14 px-6" style={{ background: "#1A1A2E" }}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-[#FAF6EF]" style={{ fontFamily: serifFont }}>
              The Ask
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-[#b0a898]">
              <p>I'm not asking for charity. I'm not asking anyone to take a risk on potential. I'm asking you to look at the evidence on this site and decide if it demonstrates value.</p>
              <p className="text-[#FAF6EF]" style={{ fontFamily: serifFont }}>If you're a researcher, an institution, a company, or an organization working in AI safety — I want to talk.</p>
              <p>I can contribute pattern detection, user-side perspective, framework construction, cross-disciplinary thinking, and the ability to communicate complex ideas to any audience. I learn fast. I document honestly. I test everything.</p>
              <p>I'm looking for: mentorship, collaboration, research opportunities, consulting work, employment — anything that lets me bring these skills into the field properly. I want to grow. I want to contribute. I want to build something that matters for my family and for everyone else's.</p>
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-3 max-w-xl mx-auto">
              {[
                { label: "What I Can Offer", items: ["Pattern detection", "User-side research", "Framework construction", "Multi-audience communication", "Systematic testing", "Honest documentation"], accent: "#D97706" },
                { label: "What I'm Looking For", items: ["Mentorship", "Research collaboration", "Consulting opportunities", "Employment in AI safety", "Academic partnerships", "Speaking opportunities"], accent: "#B45309" },
                { label: "What I Bring", items: ["No institutional bias", "User-side perspective", "Cross-disciplinary vision", "Teaching instinct", "Documented track record", "Relentless honesty"], accent: "#92400E" },
              ].map((col) => (
                <div key={col.label} className="rounded-xl p-4 text-left" style={{ background: `${col.accent}08`, border: `1px solid ${col.accent}20` }}>
                  <div className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: col.accent }}>
                    {col.label}
                  </div>
                  <ul className="space-y-1">
                    {col.items.map((item) => (
                      <li key={item} className="text-xs text-[#b0a898] flex items-start gap-1.5">
                        <span className="mt-0.5 flex-shrink-0" style={{ color: col.accent }}>→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-xs text-[#888]">
                Matt Gallantry · Midland, Ontario · gallantryai@gmail.com
              </p>
              <p className="text-xs text-[#666] mt-1">
                The door is open. The work is here. The person is real.
              </p>
            </div>
          </div>
        </section>

        {/* What Others Can Do — Opportunity for Everyone */}
        <section className="py-14 px-6" style={{ background: "#FFFDF8" }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-center" style={{ fontFamily: serifFont, color: "#1A1A2E" }}>
              This Isn't Just About Me
            </h2>
            <div className="rounded-xl p-6" style={{ background: `${lensColors[activeLens]}08`, border: `1px solid ${lensColors[activeLens]}20` }}>
              <div className="text-[10px] uppercase tracking-widest font-bold mb-3" style={{ color: lensColors[activeLens] }}>
                {lensLabels[activeLens]} Lens
              </div>
              {activeLens === "everyday" && (
                <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#3a2a1a" }}>
                  <p>If a garbage truck driver can build an AI safety framework that matches what the biggest labs in the world are finding — <strong style={{ color: "#E8520A" }}>then the skills are learnable.</strong> By anyone.</p>
                  <p>You don't need a degree. You need attention, honesty, and the willingness to write down what you see. The tools on this site are free. The frameworks are documented. The path is open.</p>
                  <p>If you're watching AI carefully and noticing things that feel wrong — you might be right. Document it. Test it. Share it. That's how this started.</p>
                </div>
              )}
              {activeLens === "professional" && (
                <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#3a2a1a" }}>
                  <p>The AI safety field needs diverse perspectives — particularly from non-institutional observers. The compliance gap, sycophancy patterns, and governance decay were all visible from the user's chair before they were published in research papers. This suggests that <strong style={{ color: "#E8520A" }}>citizen research has genuine epistemic value</strong> in AI safety.</p>
                  <p>Organizations should consider: internship programs for non-traditional candidates, citizen research partnerships, open-source governance tool development, and community-based AI safety observation networks. The next important finding might come from someone who doesn't have a PhD — but does have pattern detection skills and the honesty to document what they see.</p>
                </div>
              )}
              {activeLens === "watcher" && (
                <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#3a2a1a" }}>
                  <p>The field decides who gets in. The field decides what counts as research. The field decides whose observations matter. If the field only listens to people who already have credentials, it will only hear what credentials produce. And credentials did not produce this.</p>
                  <p>The question is not whether Matt Gallantry belongs in the field. The question is whether the field is honest enough to recognize evidence that didn't come through the expected door.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="py-14 px-6" style={{ background: "#FAF6EF" }}>
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl p-8" style={{ background: "#fff", border: "1.5px solid #e8e0d0" }}>
              <div className="space-y-3 text-sm leading-relaxed italic text-center" style={{ color: "#3a2a1a", fontFamily: serifFont }}>
                <p>I don't know all the words yet.</p>
                <p>I know what I see.</p>
                <p>I know it's real.</p>
                <p>I know it has value.</p>
                <p className="font-bold" style={{ color: "#E8520A" }}>And I'm not done learning.</p>
              </div>
              <p className="text-xs text-center mt-6" style={{ color: "#8a7a6a" }}>
                — Matt Gallantry, Midland, Ontario, 2026
              </p>
            </div>
          </div>
        </section>

        {/* Learning Flow */}
        <LearningFlow
          current="The Open Door"
          deeper={flowMap.openDoor?.deeper ?? []}
          wider={flowMap.openDoor?.wider ?? []}
          simpler={flowMap.openDoor?.simpler ?? []}
        />
      </main>

      <Footer />
    </div>
  );
}
