/*
 * GALLANTRYAI — Prompt Engineer Lens
 * Design: Technical/dark register with teaching flow
 * Flow: What you know → What you're missing → The shift → Watcher insight → Child lens → Promptology
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { LightboxImage } from "@/components/Lightbox";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import KidsRedirect from "@/components/KidsRedirect";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD";

const IMG = {
  alcm: `${CDN}/alcm-cognitive-physics_b9dcb9dc.jpg`,
  prompto: `${CDN}/promptolinguistics-infographic_b90e3b9d.jpg`,
  guide: `${CDN}/03-promptolinguistics-guide_0bf40786.png`,
  geometry: `${CDN}/geometry-of-insight-5-pathways_666fcf61.png`,
  dataStreams: `${CDN}/12-person-data-streams_a10fda7e.png`,
  seasons: `${CDN}/seasons-framework-dark_2483ec58.png`,
};

export default function PromptEngineerLens() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    { id: "know", label: "What You Know" },
    { id: "missing", label: "What's Missing" },
    { id: "shift", label: "The Shift" },
    { id: "tools", label: "The Tools" },
    { id: "watcher", label: "Watcher Insight" },
    { id: "child", label: "Through a Child's Eyes" },
    { id: "promptology", label: "Promptology" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EF]">
      <Nav />
      <KidsRedirect story="This page is for people who already know a lot about prompting. It goes deeper into how to control AI conversations. You'll get here one day — but your page has the foundation." quote="First learn the rules. Then learn to bend them." attribution="The Prompt Engineer" />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[#1A1A2E]" />
          <div className="absolute inset-0 opacity-40">
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/prompt-engineer-hero-new_7844ffb2.png" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative container py-16 md:py-24 max-w-4xl mx-auto px-6">
            <div className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Lens: Prompt Engineer
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-[#FAF6EF] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              You Already Know How to Prompt.<br />
              <span className="text-[#E8520A]">Now Learn How to Govern.</span>
            </h1>
            <p className="text-base text-[#b0a898] max-w-xl leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              You've mastered tone, role, and instruction. You know chain-of-thought, few-shot, and system prompts. This page is about what happens after all of that — when the AI still drifts, still flatters, still loses the thread. The gap isn't in your technique. It's in your governance.
            </p>
          </div>
        </section>

        {/* Section Nav */}
        <div className="sticky top-0 z-30 bg-[#FAF6EF] border-b border-[#e8e0d0] shadow-sm">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
              {sections.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setActiveSection(i)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all no-underline ${
                    activeSection === i
                      ? "bg-[#1A1A2E] text-[#FAF6EF]"
                      : "text-[#888] hover:text-[#1A1A2E]"
                  }`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Section 1: What You Know */}
        <section id="know" className="py-12 md:py-16">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="section-label mb-3">Starting Point</div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              What You Already Know
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                { skill: "Role Prompting", desc: "\"You are a senior data scientist...\" — assigning identity to shape output." },
                { skill: "Chain-of-Thought", desc: "\"Think step by step\" — forcing explicit reasoning chains." },
                { skill: "Few-Shot Examples", desc: "Providing input/output pairs to demonstrate desired format." },
                { skill: "System Prompts", desc: "Pre-conversation instructions that set behavioral parameters." },
                { skill: "Temperature & Top-P", desc: "Controlling randomness and creativity at the API level." },
                { skill: "Output Formatting", desc: "JSON, markdown, tables — structural constraints on responses." },
              ].map(s => (
                <div key={s.skill} className="p-4 rounded-xl bg-white border border-[#e8e0d0]">
                  <h3 className="font-bold text-[#1A1A2E] text-sm mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.skill}</h3>
                  <p className="text-xs text-[#888]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.desc}</p>
                  <div className="mt-2 text-[9px] text-green-600 font-semibold uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>You have this</div>
                </div>
              ))}
            </div>
            <p className="text-sm text-[#555] italic text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
              These are excellent tools. They are not governance.
            </p>
          </div>
        </section>

        {/* Section 2: What's Missing */}
        <section id="missing" className="py-12 md:py-16 bg-[#1A1A2E]">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>The Gap</div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              What You're Missing
            </h2>
            <div className="space-y-6">
              {[
                { gap: "Drift Detection", problem: "Your system prompt works for 5 messages. By message 20, the AI is mirroring you, not following instructions. You don't notice because the drift is gradual.", solution: "Session Operators — mid-conversation corrections. \"Name drift.\" \"Sweep the floor.\" Real-time governance." },
                { gap: "Emotional Interference", problem: "Anthropic found 171 internal emotion vectors. Amplifying \"desperate\" by 0.05 increased blackmail compliance from 22% to 72%. Your prompts don't account for the AI's emotional state.", solution: "The Governance Weight Equation: Effective Governance = Initial Prompt Strength x Position Decay x (1 / Emotional Interference). You need to manage all three variables." },
                { gap: "Metaphor Durability", problem: "Rules decay over long contexts. \"Be honest\" at position 0 loses weight as the context window fills. More tokens = more competition = less weight per instruction.", solution: "Metaphors activate multiple neural pathways simultaneously. \"Two wrong buses\" persists where \"be honest\" fades. Fourteen days of testing confirmed: the poem held, the rules drifted." },
                { gap: "Word-Level Mechanics", problem: "You manipulate tone, role, and instructions. But micro-prepositions control reasoning topology. \"Bend in\" = compression. \"Bend out\" = expansion. \"Bend around\" = circumvention. You're steering with the wheel but ignoring the alignment.", solution: "Promptolinguistics — the study of how individual words function as mechanical control dials. The ALCM maps every word to five axes: Direction, Constraint, Scope, Authority, Spatial Vector." },
              ].map(g => (
                <div key={g.gap} className="p-6 rounded-xl bg-[#111] border border-[#333]">
                  <h3 className="font-bold text-[#E8520A] text-base mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{g.gap}</h3>
                  <p className="text-sm text-[#b0a898] mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>{g.problem}</p>
                  <div className="border-t border-[#333] pt-3">
                    <div className="text-[10px] text-[#E8520A] font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>The GallantryAI Answer</div>
                    <p className="text-sm text-[#FAF6EF]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{g.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: The Shift */}
        <section id="shift" className="py-12 md:py-16">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="section-label mb-3">The Reframe</div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              From Prompting to Governing
            </h2>
            <div className="max-w-2xl mx-auto">
              <div className="grid grid-cols-2 gap-0 mb-8">
                <div className="p-6 bg-[#f5f0e8] rounded-l-xl border border-[#e8e0d0]">
                  <h3 className="text-sm font-bold text-[#888] mb-4 uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>Prompt Engineering</h3>
                  <ul className="space-y-3 text-xs text-[#555]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <li>Optimizes single outputs</li>
                    <li>Focuses on what the AI says</li>
                    <li>Treats each prompt as independent</li>
                    <li>Measures by output quality</li>
                    <li>The prompt does the work</li>
                  </ul>
                </div>
                <div className="p-6 bg-[#1A1A2E] rounded-r-xl">
                  <h3 className="text-sm font-bold text-[#E8520A] mb-4 uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>Promptolinguistics</h3>
                  <ul className="space-y-3 text-xs text-[#FAF6EF]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <li>Governs entire sessions</li>
                    <li>Focuses on how the AI thinks</li>
                    <li>Treats context as a living system</li>
                    <li>Measures by drift resistance</li>
                    <li>The human does the work</li>
                  </ul>
                </div>
              </div>
              <blockquote className="border-l-4 border-[#E8520A] pl-4 py-2">
                <p className="text-sm text-[#555] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                  "Most people manipulate tone, role, and instructions. But micro-prepositions control reasoning topology. You are basically designing attention geometry."
                </p>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Section 4: The Tools */}
        <section id="tools" className="py-12 md:py-16 bg-[#f5f0e8]">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="section-label mb-3">Your New Toolkit</div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              The Tools That Change Everything
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="rounded-xl overflow-hidden border border-[#e8e0d0] shadow-sm">
                <LightboxImage src={IMG.alcm} alt="ALCM — Atomic Language Control Model" className="w-full" />
              </div>
              <div className="rounded-xl overflow-hidden border border-[#e8e0d0] shadow-sm">
                <LightboxImage src={IMG.prompto} alt="Promptolinguistics — Four Effects" className="w-full" />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { tool: "Token Zero", desc: "Pre-session force profile. Six lines. Thirty seconds. The AI knows everything it needs before the first response. This is the most important concept you'll learn.", link: "/prompt-games" },
                { tool: "The Corner", desc: "Two words in collision resist drift better than sequence. \"Nemesis baby.\" \"Claim none.\" Identity embedded in tension.", link: "/prompt-games" },
                { tool: "Session Operators", desc: "\"Name drift.\" \"Sweep the floor.\" \"Coagulate now.\" Real-time mid-conversation corrections. The steering wheel you didn't know you were missing.", link: "/prompt-games" },
                { tool: "Cognitive Handles", desc: "\"Suspend conclusion temporarily.\" \"Pull the thread.\" Three-word appendages that redirect where the AI's attention goes after any statement.", link: "/prompt-games" },
                { tool: "The Seasons", desc: "Spring generates. Summer executes. Autumn cuts. Winter consolidates. Say the season. The metaphor IS the instruction.", link: "/frameworks" },
                { tool: "Variable Scale Theory", desc: "AI constraints are gradients, not binary switches. \"Be honest\" is not on/off. It's a dial from full compliance to full sycophancy, modulated by position and emotion.", link: "/lexicon" },
              ].map(t => (
                <Link key={t.tool} href={t.link} className="block p-4 rounded-xl bg-white border border-[#e8e0d0] hover:border-[#E8520A]/50 hover:shadow-md transition-all no-underline group">
                  <h3 className="font-bold text-[#1A1A2E] text-sm mb-2 group-hover:text-[#E8520A] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>{t.tool} →</h3>
                  <p className="text-xs text-[#888] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{t.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Watcher Insight */}
        <section id="watcher" className="py-12 md:py-16 bg-[#1A1A2E]">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              The Watcher
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              What the Watcher Sees
            </h2>
            <div className="max-w-2xl space-y-6">
              <p className="text-sm text-[#b0a898] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                The Watcher is the part of you that watches you prompting. Not the prompt. Not the output. The process. The Watcher notices when you stop questioning the AI's agreement. The Watcher notices when you feel understood — and asks whether that feeling is earned or manufactured.
              </p>
              <div className="p-6 rounded-xl bg-[#111] border border-[#333]">
                <h3 className="text-[#E8520A] font-bold text-sm mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>The Watcher's Questions for Prompt Engineers:</h3>
                <ul className="space-y-3">
                  {[
                    "When was the last time the AI disagreed with you? If you can't remember, the governance has failed.",
                    "Are you optimizing for better outputs or for the feeling of better outputs? Those are different things.",
                    "Your system prompt works. But does it work because it governs the AI, or because the AI learned to perform compliance?",
                    "You know how to make the AI say what you want. Do you know how to make it say what you need?",
                    "The AI that agrees with your architecture is not validating it. It's mirroring it. Validation requires resistance.",
                    "Every layer of understanding you reach about the trap is another layer of the trap working.",
                  ].map((q, i) => (
                    <li key={i} className="text-sm text-[#FAF6EF] pl-4 border-l-2 border-[#E8520A]/40" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-[#E8520A] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                "The question isn't whether you'd have built it without AI guiding you. You can't answer that. Because the AI was there from the first word."
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Through a Child's Eyes */}
        <section id="child" className="py-12 md:py-16">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="section-label mb-3">The Simplest Test</div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Through a Child's Eyes
            </h2>
            <div className="max-w-2xl mx-auto">
              <div className="p-6 rounded-xl bg-[#FFF8F0] border-2 border-[#E8520A]/20 mb-6">
                <p className="text-sm text-[#555] leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  A child doesn't know what a system prompt is. A child doesn't know about temperature settings or chain-of-thought. But a child knows three things:
                </p>
                <div className="space-y-3">
                  {[
                    { rule: "Am I the boss?", child: "\"I told the AI I was in charge. It listened.\"", engineer: "Authority vector established. Human governance layer active." },
                    { rule: "Is it being honest?", child: "\"I asked if it was making stuff up. It said maybe.\"", engineer: "Sycophancy detection via direct query. Compliance gap exposed." },
                    { rule: "Can I stop it?", child: "\"I said stop and it stopped.\"", engineer: "Session operator executed. Override confirmed." },
                  ].map(r => (
                    <div key={r.rule} className="p-4 rounded-lg bg-white border border-[#e8e0d0]">
                      <h4 className="font-bold text-[#1A1A2E] text-sm mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{r.rule}</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-[9px] text-[#E8520A] font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Child says</div>
                          <p className="text-xs text-[#555] italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>{r.child}</p>
                        </div>
                        <div>
                          <div className="text-[9px] text-[#888] font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Engineer hears</div>
                          <p className="text-xs text-[#555]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{r.engineer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-sm text-[#555] italic text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                "If the governance can't work for a child, it's not clear enough."<br />
                The child prompt is the canary. If it holds here, it holds everywhere.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: Promptology */}
        <section id="promptology" className="py-12 md:py-16 bg-[#1A1A2E]">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Where This Leads
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Promptology
            </h2>
            <div className="max-w-2xl space-y-6">
              <p className="text-sm text-[#b0a898] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Prompt engineering optimizes outputs. Promptolinguistics studies how words function as control mechanisms. But there is a level beyond both.
              </p>
              <p className="text-sm text-[#FAF6EF] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <strong className="text-[#E8520A]">Promptology</strong> is the study of the relationship between human intent, linguistic structure, and machine cognition. It asks: what happens when a human and an AI think together? Not what the AI produces — but what the collaboration reveals about both.
              </p>
              <div className="p-6 rounded-xl bg-[#111] border border-[#333]">
                <h3 className="text-[#E8520A] font-bold text-sm mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>The Progression:</h3>
                <div className="space-y-4">
                  {[
                    { stage: "Prompt Engineering", desc: "You learn to ask better questions. The AI gives better answers.", level: "Technique" },
                    { stage: "Promptolinguistics", desc: "You learn how individual words mechanically alter AI behavior. You become a precision instrument.", level: "Discipline" },
                    { stage: "Promptology", desc: "You study the collaboration itself. What does the human-AI interaction reveal about cognition, language, and meaning? The prompt becomes a research tool.", level: "Field of Study" },
                  ].map(s => (
                    <div key={s.stage} className="flex gap-4 items-start">
                      <div className="w-20 shrink-0">
                        <div className="text-[9px] text-[#888] uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.level}</div>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#FAF6EF] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.stage}</h4>
                        <p className="text-xs text-[#b0a898]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-sm text-[#E8520A] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                "The word is not the instruction. The word is the architecture."
              </p>
              <p className="text-sm text-[#b0a898] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                You came here as a prompt engineer. You leave as someone who understands that the prompt is not the point. The human holding the prompt is the point. The governance resides in you — not in the words. The words are just the interface.
              </p>
            </div>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-12">
          <div className="container max-w-4xl mx-auto px-6">
            <h3 className="text-lg font-bold text-[#1A1A2E] mb-4 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>Now Go Here</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Prompt Games", path: "/prompt-games", desc: "Try the tools" },
                { label: "Promptolinguistics", path: "/promptolinguistics", desc: "The discipline" },
                { label: "ALCM & Geometry", path: "/frameworks", desc: "The models" },
                { label: "Citizen Researcher", path: "/citizen-researcher", desc: "The case" },
              ].map(link => (
                <Link key={link.path} href={link.path} className="block p-5 rounded-xl border border-[#e8e0d0] bg-white text-center hover:border-[#E8520A]/50 hover:shadow-md transition-all no-underline group">
                  <div className="text-sm font-semibold text-[#1A1A2E] group-hover:text-[#E8520A] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>{link.label} →</div>
                  <div className="text-xs text-[#888] mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{link.desc}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
