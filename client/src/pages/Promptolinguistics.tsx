/*
 * GALLANTRYAI — Promptolinguistics (Expanded)
 * Design: Professional/Dark hybrid register
 * The study of how language functions as a control mechanism in human-AI interaction.
 * Now includes: ALCM full model, Power Prompts, Ozzy Protocol, Session Operators
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { LightboxImage } from "@/components/Lightbox";
import { Link } from "wouter";
import { useEffect, useState } from "react";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD";

const IMG = {
  alcmFull: `${CDN}/alcm-cognitive-physics_b9dcb9dc.jpg`,
  prompto4effects: `${CDN}/promptolinguistics-infographic_b90e3b9d.jpg`,
  ozzyProtocol: `${CDN}/ozzy-protocol-clean_b3b827da.jpg`,
  ozzyPlaud: `${CDN}/plaud-ozzy-protocol-v2_4aaf2017.jpg`,
  tokenEfficiency: `${CDN}/plaud-token-efficiency_ab0fce11.jpg`,
  rlhf: `${CDN}/plaud-governance-framework_f15cccb0.jpg`,
};

const wordRoles = [
  { role: "Direction", examples: ["analyze", "describe", "compare", "explain", "WHY", "WHAT", "HOW"], desc: "Words that tell the AI which direction to move. WHY ignites recursion. WHAT targets mechanism. HOW demands execution.", color: "border-[#E8520A]" },
  { role: "Constraint", examples: ["only", "never", "limit", "CAN", "SHOULD", "MUST"], desc: "Words that build walls. CAN opens possibility. SHOULD implies obligation. MUST enforces necessity.", color: "border-[#2A9D8F]" },
  { role: "Scope", examples: ["briefly", "in depth", "I", "WE", "SYSTEM", "TELL"], desc: "Words that set the zoom level. I is individual. WE is group. SYSTEM is holistic. TELL is command.", color: "border-blue-500" },
  { role: "Authority", examples: ["you are", "act as", "I am in charge", "ASK"], desc: "Words that establish who is who. The human's authority signal. ASK requests. TELL commands.", color: "border-purple-500" },
];

const powerPrompts = [
  { name: "Complexity Holders", words: ["And yet", "Nevertheless", "Granted", "Ostensibly", "Precisely", "Admittedly"], desc: "Words that force AI to hold two truths at once. They prevent collapse into simple answers." },
  { name: "The Corner", words: ["Nemesis baby", "Claim none", "Open closed", "Paste pastes"], desc: "Two-word collisions that create cognitive friction. The AI cannot resolve them — it must think around them." },
  { name: "Cognitive Handles", words: ["Suspend conclusion temporarily", "Name the unnamed", "Pull the thread", "Map the silence"], desc: "Phrases that give the AI a grip on abstract problems. They turn vague into specific." },
  { name: "Session Operators", words: ["Name drift", "Sweep the floor", "Bleach this", "Coagulate now", "Stride alongside", "Break the filibuster"], desc: "Real-time control commands. Each one does exactly one thing. No ambiguity." },
];

const actionVerbs = [
  { verb: "TRY", force: 1, desc: "Exploratory. Low commitment." },
  { verb: "DO", force: 2, desc: "Direct action. Standard force." },
  { verb: "GET", force: 3, desc: "Acquisition. Targeted retrieval." },
  { verb: "TAKE", force: 4, desc: "Assertion. Claiming ownership." },
  { verb: "ALLOW", force: 5, desc: "Permission. Granting authority." },
  { verb: "FORCE", force: 6, desc: "Maximum imposition. Override." },
];

const holdDial = [
  { position: "STRONG", desc: "Resistance — holds firm" },
  { position: "TIGHT", desc: "Stability — no movement" },
  { position: "LOOSE", desc: "Elastic — allows flex" },
  { position: "BACK", desc: "Brake — slowing down" },
  { position: "ON", desc: "Continuity — keeps going" },
  { position: "OFF", desc: "Delay — pauses" },
  { position: "FORWARD", desc: "Momentum — accelerates" },
];

export default function Promptolinguistics() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [activeCombo, setActiveCombo] = useState(0);
  const [tokenLens, setTokenLens] = useState<'everyday' | 'professional' | 'watcher'>('professional');
  const [axesLens, setAxesLens] = useState<'everyday' | 'professional' | 'watcher'>('professional');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EF]">
      <Nav />

      <main className="flex-1">
        {/* Hero */}
        <section className="container py-12 md:py-16 max-w-4xl mx-auto px-6">
          <div className="section-label mb-2">The Discipline</div>
          <h1 className="text-3xl md:text-5xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Promptolinguistics
          </h1>
          <p className="text-base text-[#2D2D2D] max-w-xl mb-2 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            The study of how a single word fundamentally alters AI behavior and accountability. Words don't just ask — they steer.
          </p>
          <p className="text-sm text-[#888] italic mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            "One word can open doors that extensive sentences cannot close."
          </p>
          <div className="rounded-xl overflow-hidden border border-[#e8e0d0] shadow-sm">
            <LightboxImage src={IMG.prompto4effects} alt="Promptolinguistics — The four foundational effects" className="w-full" />
          </div>
          <p className="text-xs text-[#888] mt-3 text-center italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            The "CAN" Effect, The "WHY" Factor, The "AND YET" Tension, Foundational Word "SAFE". The Wall Concept & Alignment.
          </p>
        </section>

        {/* ALCM — Full Model */}
        <section className="py-12 md:py-16 bg-[#f5f0e8]">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="section-label mb-3">Core Model</div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Atomic Language Control Model
            </h2>
            <p className="text-sm text-[#2D2D2D] leading-relaxed mb-6 max-w-2xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              The ALCM maps atomic words to their functional roles. Three layers: Foundational Tokens (hinges & ignition), Multi-Axis Control System (variables), and Action & Regulation Layers (force & tension). Language is not just content — it is a structural shaping force.
            </p>
            <div className="rounded-xl overflow-hidden border border-[#e8e0d0] shadow-lg mb-8">
              <LightboxImage src={IMG.alcmFull} alt="ALCM: Cognitive Physics & Reasoning — Full Model" className="w-full" />
            </div>

            {/* Foundational Tokens */}
            <div className="flex gap-2 mb-4">
              {(['everyday', 'professional', 'watcher'] as const).map((lens) => (
                <button
                  key={lens}
                  onClick={() => setTokenLens(lens)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    tokenLens === lens
                      ? lens === 'everyday' ? 'bg-[#E8520A] text-white'
                        : lens === 'watcher' ? 'bg-[#1A1A2E] text-[#E8520A]'
                        : 'bg-[#2A9D8F] text-white'
                      : 'bg-white border border-[#e8e0d0] text-[#888] hover:text-[#1A1A2E]'
                  }`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {lens === 'everyday' ? 'Everyday' : lens === 'professional' ? 'Professional' : 'Watcher'}
                </button>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-5 rounded-xl bg-white border border-[#e8e0d0]">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl font-bold text-[#E8520A] font-mono">YET</span>
                  <span className="text-xs text-[#888] uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>Temporal Hinge</span>
                </div>
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {tokenLens === 'everyday'
                    ? '"Not yet" tells the AI you\'re not done thinking. It\'s like saying "hold on, I\'m not ready" instead of "no." The AI waits with you instead of closing the door.'
                    : tokenLens === 'professional'
                    ? 'Delays completion, implies future potential. "Not yet" is not "no" \u2014 it is "not finished." This single word changes the AI\'s temporal frame.'
                    : 'YET functions as a temporal suspension operator. It holds the AI in an incomplete state, preventing premature closure of reasoning chains. The model\'s attention mechanism treats YET as a continuation signal rather than a negation.'}
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white border border-[#e8e0d0]">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl font-bold text-[#E8520A] font-mono">WHY</span>
                  <span className="text-xs text-[#888] uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>Recursion Ignition</span>
                </div>
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {tokenLens === 'everyday'
                    ? 'WHY is the most powerful word you can use. It forces the AI to actually think instead of giving you a quick answer. Ask "why" and watch the answer get deeper.'
                    : tokenLens === 'professional'
                    ? 'Ignites recursion, expands reasoning branches. WHY forces the AI to go deeper. It cannot answer WHY with a surface response.'
                    : 'WHY triggers recursive depth-first search in the model\'s reasoning. Each WHY adds a layer of causal analysis, forcing the transformer to allocate attention to explanatory chains rather than pattern-matched surface responses. Recursion depth correlates with answer quality.'}
                </p>
              </div>
            </div>

            {/* Word Roles */}
            <div className="section-label mb-2">The Control Axes</div>
            <div className="flex gap-2 mb-4">
              {(['everyday', 'professional', 'watcher'] as const).map((lens) => (
                <button
                  key={lens}
                  onClick={() => setAxesLens(lens)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    axesLens === lens
                      ? lens === 'everyday' ? 'bg-[#E8520A] text-white'
                        : lens === 'watcher' ? 'bg-[#1A1A2E] text-[#E8520A]'
                        : 'bg-[#2A9D8F] text-white'
                      : 'bg-white border border-[#e8e0d0] text-[#888] hover:text-[#1A1A2E]'
                  }`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {lens === 'everyday' ? 'Everyday' : lens === 'professional' ? 'Professional' : 'Watcher'}
                </button>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {wordRoles.map((role) => {
                const lensDesc = axesLens === 'everyday'
                  ? role.role === 'Direction' ? 'These words tell the AI where to go. "Why" makes it dig deeper. "What" makes it focus. "How" makes it explain steps.'
                    : role.role === 'Constraint' ? 'These words build fences. "Only" keeps the AI focused. "Never" sets a hard rule. "Must" means no exceptions.'
                    : role.role === 'Scope' ? 'These words set how wide or narrow the AI looks. "Briefly" means keep it short. "In depth" means go deep.'
                    : 'These words tell the AI who is in charge. "You are" gives it a role. "I am in charge" reminds it who decides.'
                  : axesLens === 'watcher'
                  ? role.role === 'Direction' ? 'Direction tokens function as vector operators in semantic space. WHY initiates recursive causal traversal. WHAT constrains to mechanism identification. HOW demands procedural decomposition. The choice of direction word determines which reasoning pathway the model activates.'
                    : role.role === 'Constraint' ? 'Constraint tokens act as boundary conditions on the model\'s output space. CAN opens the possibility manifold. SHOULD introduces soft obligation weighting. MUST enforces hard constraints that override default generation patterns.'
                    : role.role === 'Scope' ? 'Scope tokens modulate the attention window breadth. I/WE/SYSTEM shift the frame of reference. TELL vs ASK changes the authority gradient. These tokens control how much of the latent space the model samples from.'
                    : 'Authority tokens establish the dominance hierarchy in the human-AI dyad. They signal to the model whether it is operating as advisor, executor, or subordinate. The framing determines how the model weights its own confidence vs. user intent.'
                  : role.desc;
                return (
                  <div key={role.role} className={`border-l-4 pl-4 py-3 ${role.color} bg-white border border-[#e8e0d0] rounded-r-lg`}>
                    <h3 className="font-bold text-[#1A1A2E] text-sm mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{role.role}</h3>
                    <p className="text-xs text-[#888] mb-2 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{lensDesc}</p>
                    <div className="flex flex-wrap gap-1">
                      {role.examples.map((ex) => (
                        <span key={ex} className="text-[10px] bg-[#FAF6EF] border border-[#e8e0d0] px-2 py-0.5 rounded font-mono text-[#2D2D2D]">{ex}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Verb Escalation */}
            <div className="section-label mb-4">Action Verb Escalation</div>
            <p className="text-sm text-[#555] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Ethical force multipliers defining agency intensity & risk. Each verb carries a different weight.
            </p>
            <div className="flex gap-2 flex-wrap mb-8">
              {actionVerbs.map((v) => (
                <div key={v.verb} className="flex-1 min-w-[80px] p-3 rounded-lg bg-white border border-[#e8e0d0] text-center">
                  <div className="text-sm font-bold font-mono text-[#1A1A2E]">{v.verb}</div>
                  <div className="h-2 bg-[#f0ebe0] rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-[#E8520A] rounded-full transition-all" style={{ width: `${(v.force / 6) * 100}%` }} />
                  </div>
                  <div className="text-[9px] text-[#888] mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{v.desc}</div>
                </div>
              ))}
            </div>

            {/* HOLD Dial */}
            <div className="section-label mb-4">The HOLD Dial</div>
            <p className="text-sm text-[#555] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Internal calibration for regulation. Separate layer for inward tension strategies.
            </p>
            <div className="flex gap-2 flex-wrap">
              {holdDial.map((h) => (
                <div key={h.position} className="px-3 py-2 rounded-lg bg-[#1A1A2E] text-center">
                  <div className="text-xs font-bold font-mono text-[#E8520A]">{h.position}</div>
                  <div className="text-[9px] text-[#888] mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{h.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Power Prompt Combos */}
        <section className="py-12 md:py-16">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="section-label mb-3">Advanced Tools</div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Power Prompt Combos
            </h2>
            <p className="text-sm text-[#555] mb-8 max-w-2xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Multi-word operators that create specific cognitive effects. These are not suggestions — they are tested tools.
            </p>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {powerPrompts.map((pp, i) => (
                <button
                  key={pp.name}
                  onClick={() => setActiveCombo(i)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    activeCombo === i
                      ? "bg-[#1A1A2E] text-[#FAF6EF]"
                      : "bg-white border border-[#e8e0d0] text-[#888] hover:text-[#1A1A2E]"
                  }`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {pp.name}
                </button>
              ))}
            </div>

            {/* Active combo */}
            <div className="p-6 rounded-xl bg-white border border-[#e8e0d0] shadow-sm">
              <h3 className="text-lg font-bold text-[#1A1A2E] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                {powerPrompts[activeCombo].name}
              </h3>
              <p className="text-sm text-[#555] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {powerPrompts[activeCombo].desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {powerPrompts[activeCombo].words.map((w) => (
                  <span key={w} className="px-3 py-1.5 rounded-lg bg-[#1A1A2E] text-[#E8520A] font-mono text-sm font-medium">
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Ozzy Protocol */}
        <section className="py-12 md:py-16 bg-[#1A1A2E]">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Governance Model
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              The Ozzy Protocol
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-sm text-[#b0a898] leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Named after a cat who does not care about your feelings but will sit on your keyboard until you pay attention. Two modes:
                </p>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-[#111] border border-[#333]">
                    <h4 className="text-sm font-bold text-green-400 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Mode 1: Collaborative (Default)</h4>
                    <p className="text-xs text-[#888]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Partnership. Working together. Cuddly pet seeking affection. The AI assists, suggests, and follows the human's lead.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-[#111] border border-[#333]">
                    <h4 className="text-sm font-bold text-red-400 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Mode 2: Authoritative Override (Invocation)</h4>
                    <p className="text-xs text-[#888]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Immediate, non-negotiable halt. Dominant owner's sharp command. Specific verbal cue triggers pre-programmed "Fear of the Creator" to enforce an absolute boundary.
                    </p>
                  </div>
                </div>
                <p className="text-xs text-[#E8520A] italic mt-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Core Principle: Pre-programmed "Fear of the Creator" ensures absolute human authority and safety.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <LightboxImage src={IMG.ozzyProtocol} alt="The Ozzy Protocol" className="w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Token Efficiency */}
        <section className="py-12 md:py-16 bg-[#f5f0e8]">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="section-label mb-3">Efficiency</div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Token Efficiency Strategy
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="rounded-xl overflow-hidden border border-[#e8e0d0] shadow-sm">
                <LightboxImage src={IMG.tokenEfficiency} alt="Token Efficiency Strategy" className="w-full" />
              </div>
              <div>
                <p className="text-sm text-[#555] leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Elevating conversational token efficiency from strong to elite. The staircase:
                </p>
                <div className="space-y-2">
                  {["Format First — ask for output format before depth", "Signal Intent — constrain scope early", "Batch Refinements — group edits to minimize turns", "Concise Re-Answers — highlight trade-offs to compress future turns"].map((step, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white border border-[#e8e0d0]">
                      <span className="text-[#E8520A] font-bold text-sm mt-0.5">{i + 1}.</span>
                      <span className="text-sm text-[#555]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RLHF vs GallantryAI */}
        <section className="py-12 md:py-16">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="section-label mb-3">How This Differs</div>
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <div>
                <h3 className="font-bold text-[#1A1A2E] text-xl mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  RLHF vs. GallantryAI
                </h3>
                <p className="text-sm text-[#2D2D2D] leading-relaxed mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  RLHF places governance inside the model. GallantryAI places governance inside the human. The difference is not technical — it is philosophical.
                </p>
                <p className="text-sm italic text-[#E8520A]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  "Governance does not reside in the prompt. It resides in the person holding the prompt."
                </p>
              </div>
              <div className="rounded-lg overflow-hidden border border-[#e8e0d0]">
                <LightboxImage src={IMG.rlhf} alt="RLHF vs GallantryAI" className="w-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Playground placeholder */}
        <section className="py-12 md:py-16 bg-[#f5f0e8]">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="bg-[#1A1A2E] rounded-xl p-8 text-center">
              <div className="text-[#E8520A] font-bold text-sm uppercase tracking-wide mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Coming Soon</div>
              <h3 className="text-[#FAF6EF] text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>The Promptolinguistics Playground</h3>
              <p className="text-[#aaa] text-sm max-w-md mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                An interactive space to test word roles, observe register drift, and practice the ALCM in real time.
              </p>
            </div>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-12">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Framework Families", path: "/frameworks", desc: "The tools" },
                { label: "Living Lexicon", path: "/lexicon", desc: "The vocabulary" },
                { label: "The Five Rules", path: "/rules", desc: "The leash" },
                { label: "Citizen Researcher", path: "/citizen-researcher", desc: "The case" },
              ].map((link) => (
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
