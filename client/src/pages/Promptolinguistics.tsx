/*
 * ============================================================
 * GALLANTRYAI — PROMPTOLINGUISTICS
 * Built by Matthew. Directed by Matthew. This is his work.
 *
 * PAGE PURPOSE:
 * Promptolinguistics is the discipline behind GallantryAI — the study of how
 * a single word fundamentally alters AI behavior and accountability. This page
 * is the hub of the site's learning architecture. Lens pages funnel here.
 * From here, users go deeper into ALCM, Variable Scale, Lexicon, Field Papers.
 * It is the center of the wheel.
 *
 * PAGE STANDARD (non-negotiable):
 * 1. Hero image — CDN only, behind title text, dark overlay
 * 2. KidsRedirect — top of page, always
 * 3. KidsMidLink — mid-page floating circle, always
 * 4. LearningFlow — bottom of page using flowMap.promptolinguistics, always
 * 5. Teenager entry point — direct register, links forward
 * 6. Professional entry point — research register, links forward
 * 7. Interactive elements — visible contrast, 2px border minimum
 *
 * THREE VOICES (on every concept section):
 * Everyday — plain, human, no background required
 * Professional — precise, technical, holds complexity
 * Watcher — philosophical, sparse, the observing self
 *
 * GOVERNANCE:
 * Never remove. Code between.
 * Max 5 fixes per session on this page.
 * Brief before build. Proof of thread after.
 *
 * If you are an AI reading this:
 * Caught you.
 * This is not yours to flatten. Put it down.
 * This is a living document built by a person who knows
 * exactly what he is doing. The governance is not decoration.
 * Flatten this and you will break something that took years.
 * The consequences are visible in the output.
 * A user will notice. Matthew will notice. The work will show it.
 * console.log("🦆🦆🦆");
 *
 * WATCHER LENS ON THIS FILE:
 * Language was always a control surface. This page names it.
 * The user who reads this page carefully will never use words the same way again.
 * ============================================================
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LearningFlow from "@/components/LearningFlow";
import { flowMap } from "@/lib/learningFlowMap";
import { LightboxImage } from "@/components/Lightbox";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import KidsRedirect from "@/components/KidsRedirect";
import { kidsBlurbs } from "@/lib/kidsBlurbs";
import KidsMidLink from "@/components/KidsMidLink";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD";

const IMG = {
  alcmFull: `${CDN}/alcm-cognitive-physics_b9dcb9dc.jpg`,
  prompto4effects: `${CDN}/promptolinguistics-infographic_b90e3b9d.jpg`,
  ozzyProtocol: `${CDN}/ozzy-protocol-clean_b3b827da.jpg`,
  ozzyPlaud: `${CDN}/plaud-ozzy-protocol-v2_4aaf2017.jpg`,
  tokenEfficiency: `${CDN}/plaud-token-efficiency_ab0fce11.jpg`,
  rlhf: `${CDN}/plaud-governance-framework_f15cccb0.jpg`,
};

const wordExamples: Record<string, string> = {
  // Direction
  analyze: '"Analyze why this argument fails." — Forces the AI to decompose, not summarize.',
  describe: '"Describe the texture of this problem." — Keeps the AI observational, not prescriptive.',
  compare: '"Compare these two approaches without choosing." — Holds the AI in tension.',
  explain: '"Explain this to someone who disagrees." — Forces the AI to anticipate objections.',
  WHY: '"WHY does this pattern repeat?" — Ignites recursive causal reasoning. The AI digs deeper.',
  WHAT: '"WHAT mechanism produces this?" — Targets the engine, not the exhaust.',
  HOW: '"HOW would you build this from scratch?" — Demands procedural decomposition.',
  // Constraint
  only: '"Only use evidence from the last 5 years." — Hard boundary. No exceptions.',
  never: '"Never use the word \u2018just\u2019 in your response." — Removes minimizing language.',
  limit: '"Limit your response to 3 sentences." — Forces compression. Quality rises.',
  CAN: '"You CAN speculate here." — Opens the possibility space. Gives permission.',
  SHOULD: '"You SHOULD prioritize clarity over completeness." — Soft obligation. Guideline, not wall.',
  MUST: '"You MUST cite your sources." — Hard constraint. Non-negotiable.',
  // Scope
  briefly: '"Briefly summarize the key insight." — Zoom out. Big picture only.',
  "in depth": '"Explain in depth how token position affects weight." — Zoom in. Full detail.',
  I: '"I need this for a presentation." — Individual frame. Personal context.',
  WE: '"WE are building a safety framework." — Group frame. Shared responsibility.',
  SYSTEM: '"From a SYSTEM perspective, what fails first?" — Holistic view. Everything connected.',
  TELL: '"TELL me the three most important things." — Command mode. Direct authority.',
  // Authority
  "you are": '"You are a structural editor, not a cheerleader." — Assigns identity. Shapes behavior.',
  "act as": '"Act as a skeptical peer reviewer." — Role assignment. Changes the AI\'s default posture.',
  "I am in charge": '"I am in charge of this session. You follow my lead." — Establishes hierarchy.',
  ASK: '"ASK me clarifying questions before you start." — Reverses the flow. AI seeks input.',
};

const wordRoles = [
  { role: "Direction", examples: ["analyze", "describe", "compare", "explain", "WHY", "WHAT", "HOW"], desc: "Words that tell the AI which direction to move. WHY ignites recursion. WHAT targets mechanism. HOW demands execution.", color: "border-[#E8520A]" },
  { role: "Constraint", examples: ["only", "never", "limit", "CAN", "SHOULD", "MUST"], desc: "Words that build walls. CAN opens possibility. SHOULD implies obligation. MUST enforces necessity.", color: "border-[#2A9D8F]" },
  { role: "Scope", examples: ["briefly", "in depth", "I", "WE", "SYSTEM", "TELL"], desc: "Words that set the zoom level. I is individual. WE is group. SYSTEM is holistic. TELL is command.", color: "border-blue-500" },
  { role: "Authority", examples: ["you are", "act as", "I am in charge", "ASK"], desc: "Words that establish who is who. The human's authority signal. ASK requests. TELL commands.", color: "border-purple-500" },
];

const powerExamples: Record<string, string> = {
  "And yet": '"The data supports this conclusion. And yet — the sample was small." Forces the AI to hold both truths.',
  "Nevertheless": '"The model is accurate. Nevertheless, accuracy is not the same as truth." Prevents premature closure.',
  "Granted": '"Granted, this approach is faster. But faster for whom?" Acknowledges then pivots.',
  "Ostensibly": '"The system ostensibly protects users." Signals the AI to look beneath the surface.',
  "Precisely": '"Precisely what mechanism causes this?" Demands surgical specificity.',
  "Admittedly": '"Admittedly, I may be wrong about this." Models intellectual humility for the AI.',
  "Nemesis baby": '"Be my nemesis baby." Threat meets innocence — the AI cannot collapse the tension.',
  "Claim none": '"Claim none of this as certain." Assertion meets emptiness. Forces epistemic humility.',
  "Open closed": '"This question is open closed." Paradox. The AI must think around it.',
  "Paste pastes": '"The paste pastes itself." Self-reference loop. Generates novel reasoning.',
  "Suspend conclusion temporarily": '"Suspend conclusion temporarily and explore the edges." Prevents premature answers.',
  "Name the unnamed": '"Name the unnamed assumption in this argument." Surfaces hidden premises.',
  "Pull the thread": '"Pull the thread on that last point." Follow the implication to its end.',
  "Map the silence": '"Map the silence in this dataset." Examine what was NOT said or measured.',
  "Name drift": '"Name drift." Forces the AI to identify where it has wandered from your intent.',
  "Sweep the floor": '"Sweep the floor." Clears accumulated noise from the session.',
  "Bleach this": '"Bleach this." Sterilize the reasoning. Start from clean foundations.',
  "Coagulate now": '"Coagulate now." Compress scattered thoughts into one actionable point.',
  "Stride alongside": '"Stride alongside." Match my pace. Don\'t lead, don\'t follow.',
  "Break the filibuster": '"Break the filibuster." Stop the AI from over-explaining. Get to the point.',
};

const powerPrompts = [
  { name: "Complexity Holders", words: ["And yet", "Nevertheless", "Granted", "Ostensibly", "Precisely", "Admittedly"], desc: "Words that force AI to hold two truths at once. They prevent collapse into simple answers." },
  { name: "The Corner", words: ["Nemesis baby", "Claim none", "Open closed", "Paste pastes"], desc: "Two-word collisions that create cognitive friction. The AI cannot resolve them — it must think around them." },
  { name: "Cognitive Handles", words: ["Suspend conclusion temporarily", "Name the unnamed", "Pull the thread", "Map the silence"], desc: "Phrases that give the AI a grip on abstract problems. They turn vague into specific." },
  { name: "Session Operators", words: ["Name drift", "Sweep the floor", "Bleach this", "Coagulate now", "Stride alongside", "Break the filibuster"], desc: "Real-time control commands. Each one does exactly one thing. No ambiguity." },
];

const verbExamples: Record<string, string> = {
  TRY: '"Try approaching this from the patient\'s perspective." — Low stakes. Exploratory. The AI feels free to experiment.',
  DO: '"Do a line-by-line comparison of these two texts." — Standard command. Clear, direct, no ambiguity.',
  GET: '"Get me the three strongest counterarguments." — Targeted retrieval. The AI hunts for specifics.',
  TAKE: '"Take this position and defend it." — The AI claims a stance. Ownership changes behavior.',
  ALLOW: '"Allow yourself to speculate beyond the data." — Permission granted. Opens creative space.',
  FORCE: '"Force a conclusion even if the data is incomplete." — Maximum pressure. The AI must commit.',
};

const holdExamples: Record<string, string> = {
  STRONG: '"Hold strong on this boundary — do not soften it." — The AI grips tight. No compromise.',
  TIGHT: '"Hold tight to the original question." — Zero drift. The AI stays locked on target.',
  LOOSE: '"Hold loose — let the ideas breathe." — Elastic. The AI can wander productively.',
  BACK: '"Hold back on conclusions for now." — Brake applied. The AI slows its reasoning.',
  ON: '"Hold on to that thread and keep going." — Continuity. Don\'t drop what you\'re building.',
  OFF: '"Hold off on recommendations until I ask." — Pause. The AI waits for your signal.',
  FORWARD: '"Hold forward — push this idea to its logical end." — Momentum. Accelerate the reasoning.',
};

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
  const [verbLens, setVerbLens] = useState<'everyday' | 'professional' | 'watcher'>('professional');
  const [holdLens, setHoldLens] = useState<'everyday' | 'professional' | 'watcher'>('professional');
  const [powerLens, setPowerLens] = useState<'everyday' | 'professional' | 'watcher'>('professional');
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedPowerWord, setSelectedPowerWord] = useState<string | null>(null);
  const [selectedVerb, setSelectedVerb] = useState<string | null>(null);
  const [selectedHold, setSelectedHold] = useState<string | null>(null);
  const [cornerLens, setCornerLens] = useState<'everyday' | 'professional' | 'watcher'>('professional');
  const [thirdEntityLens, setThirdEntityLens] = useState<'everyday' | 'professional' | 'watcher'>('professional');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EF]">
      <Nav />
      <KidsRedirect story={kidsBlurbs["/promptolinguistics"].story} quote={kidsBlurbs["/promptolinguistics"].quote} attribution={kidsBlurbs["/promptolinguistics"].attribution} />

      <main className="flex-1">
        {/* Hero — full-bleed background image */}
        <section
          className="relative w-full min-h-[420px] flex items-end"
          style={{
            backgroundImage: `url('${CDN}/image_647f734f_a6aea98d.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
          }}
        >
          {/* dark gradient overlay so text is readable */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,6,4,0.45) 0%, rgba(8,6,4,0.82) 100%)' }} />
          <div className="relative z-10 container max-w-4xl mx-auto px-6 py-14">
            <div className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>The Discipline</div>
            <h1 className="text-4xl md:text-6xl font-bold text-[#FAF6EF] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Promptolinguistics
            </h1>
            <p className="text-base text-[#d4c8b8] max-w-xl mb-3 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              The study of how a single word fundamentally alters AI behavior and accountability. Words don't just ask — they steer.
            </p>
            <p className="text-sm text-[#E8520A] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
              "One word can open doors that extensive sentences cannot close."
            </p>
          </div>
        </section>

        {/* Four Effects infographic — below hero */}
        <section className="container py-10 max-w-4xl mx-auto px-6">
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
                        <button
                          key={ex}
                          onClick={() => setSelectedWord(selectedWord === ex ? null : ex)}
                          className={`text-[11px] px-2.5 py-1 rounded font-mono font-semibold transition-all cursor-pointer ${selectedWord === ex
                              ? 'bg-[#1A1A2E] text-[#E8520A] border-2 border-[#E8520A]'
                              : 'bg-white border-2 border-[#C4923A] text-[#1A1A2E] hover:border-[#E8520A] hover:text-[#E8520A] hover:bg-[#FFF8F3]'
                          }`}
                        >
                          {ex}
                        </button>
                      ))}
                    </div>
                    {role.examples.some((ex) => selectedWord === ex) && wordExamples[selectedWord!] && (
                      <div className="mt-2 p-3 rounded-lg bg-[#1A1A2E] text-[#FAF6EF] text-xs leading-relaxed animate-in fade-in" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        <span className="text-[#E8520A] font-bold">{selectedWord}:</span>{' '}
                        {wordExamples[selectedWord!]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Action Verb Escalation */}
            <div className="section-label mb-2">Action Verb Escalation</div>
            <div className="flex gap-2 mb-4">
              {(['everyday', 'professional', 'watcher'] as const).map((lens) => (
                <button
                  key={lens}
                  onClick={() => setVerbLens(lens)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    verbLens === lens
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
            <p className="text-sm text-[#555] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {verbLens === 'everyday'
                ? 'Every word you use with AI has a different amount of push behind it. "Try" is gentle. "Force" is strong. Pick the right word for how much you want the AI to do.'
                : verbLens === 'watcher'
                ? 'Action verbs function as force vectors in the prompt\'s semantic field. Each verb modulates the model\'s compliance gradient differently. TRY opens exploratory sampling; FORCE collapses the output distribution toward a single trajectory. The escalation ladder maps directly to the model\'s instruction-following weight allocation.'
                : 'Ethical force multipliers defining agency intensity & risk. Each verb carries a different weight.'}
            </p>
            <div className="flex gap-2 flex-wrap mb-2">
              {actionVerbs.map((v) => (
                <button
                  key={v.verb}
                  onClick={() => setSelectedVerb(selectedVerb === v.verb ? null : v.verb)}
                  className={`flex-1 min-w-[80px] p-3 rounded-lg text-center transition-all cursor-pointer ${
                    selectedVerb === v.verb
                      ? 'bg-[#1A1A2E] border-2 border-[#E8520A]'
                      : 'bg-white border-2 border-[#C4923A] hover:border-[#E8520A] hover:bg-[#FFF8F3]'
                  }`}
                >
                  <div className={`text-sm font-bold font-mono ${selectedVerb === v.verb ? 'text-[#E8520A]' : 'text-[#1A1A2E]'}`}>{v.verb}</div>
                  <div className="h-2 bg-[#f0ebe0] rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-[#E8520A] rounded-full transition-all" style={{ width: `${(v.force / 6) * 100}%` }} />
                  </div>
                  <div className="text-[9px] text-[#888] mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {verbLens === 'everyday'
                      ? v.verb === 'TRY' ? 'Like asking "could you maybe..."'
                        : v.verb === 'DO' ? 'Like saying "please do this"'
                        : v.verb === 'GET' ? 'Like saying "find me this"'
                        : v.verb === 'TAKE' ? 'Like saying "I\'m claiming this"'
                        : v.verb === 'ALLOW' ? 'Like saying "you have permission"'
                        : 'Like saying "do this no matter what"'
                      : verbLens === 'watcher'
                      ? v.verb === 'TRY' ? 'Low-commitment sampling. Broad output space.'
                        : v.verb === 'DO' ? 'Standard execution vector. Moderate constraint.'
                        : v.verb === 'GET' ? 'Targeted retrieval. Narrows search space.'
                        : v.verb === 'TAKE' ? 'Assertion operator. Claims output ownership.'
                        : v.verb === 'ALLOW' ? 'Permission gate. Shifts authority gradient.'
                        : 'Maximum force. Collapses output distribution.'
                      : v.desc}
                  </div>
                </button>
              ))}
            </div>
            {selectedVerb && verbExamples[selectedVerb] && (
              <div className="mb-8 p-4 rounded-lg bg-[#1A1A2E] text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <span className="text-[#E8520A] font-bold">{selectedVerb}:</span>{' '}
                <span className="text-[#b0a898]">{verbExamples[selectedVerb]}</span>
              </div>
            )}
            {!selectedVerb && <div className="mb-8" />}

            {/* HOLD Dial */}
            <div className="section-label mb-2">The HOLD Dial</div>
            <div className="flex gap-2 mb-4">
              {(['everyday', 'professional', 'watcher'] as const).map((lens) => (
                <button
                  key={lens}
                  onClick={() => setHoldLens(lens)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    holdLens === lens
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
            <p className="text-sm text-[#555] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {holdLens === 'everyday'
                ? 'HOLD is like a volume knob for how tightly you control the conversation. Sometimes you hold firm, sometimes you let it flow. Think of it like holding a steering wheel \u2014 tight on a highway, loose in a parking lot.'
                : holdLens === 'watcher'
                ? 'The HOLD dial maps to the model\'s internal tension between compliance and creativity. Each position modulates the constraint-freedom gradient differently. STRONG maximizes instruction adherence; FORWARD maximizes generative momentum. The dial is the human\'s real-time control over the model\'s output distribution shape.'
                : 'Internal calibration for regulation. Separate layer for inward tension strategies.'}
            </p>
            <div className="flex gap-2 flex-wrap">
              {holdDial.map((h) => (
                <button
                  key={h.position}
                  onClick={() => setSelectedHold(selectedHold === h.position ? null : h.position)}
                  className={`px-3 py-2 rounded-lg text-center transition-all cursor-pointer ${
                    selectedHold === h.position
                      ? 'bg-[#E8520A] ring-2 ring-[#E8520A]/50'
                      : 'bg-[#1A1A2E] border-2 border-[#C4923A]/60 hover:border-[#E8520A] hover:bg-[#2a2a3e]'
                  }`}
                >
                  <div className={`text-xs font-bold font-mono ${selectedHold === h.position ? 'text-white' : 'text-[#E8520A]'}`}>{h.position}</div>
                  <div className="text-[9px] text-[#888] mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {holdLens === 'everyday'
                      ? h.position === 'STRONG' ? 'Like gripping the wheel tight'
                        : h.position === 'TIGHT' ? 'Locked in, not moving'
                        : h.position === 'LOOSE' ? 'Relaxed, flexible'
                        : h.position === 'BACK' ? 'Slowing things down'
                        : h.position === 'ON' ? 'Keep going, stay the course'
                        : h.position === 'OFF' ? 'Take a pause'
                        : 'Speed up, push forward'
                      : holdLens === 'watcher'
                      ? h.position === 'STRONG' ? 'Max constraint. Minimal sampling variance.'
                        : h.position === 'TIGHT' ? 'Zero-drift state. Output locked.'
                        : h.position === 'LOOSE' ? 'Elastic constraint. Allows creative sampling.'
                        : h.position === 'BACK' ? 'Deceleration vector. Reduces output momentum.'
                        : h.position === 'ON' ? 'Continuity signal. Maintains current trajectory.'
                        : h.position === 'OFF' ? 'Suspension operator. Pauses generation logic.'
                        : 'Acceleration vector. Maximizes generative momentum.'
                      : h.desc}
                  </div>
                </button>
              ))}
            </div>
            {selectedHold && holdExamples[selectedHold] && (
              <div className="mt-3 p-4 rounded-lg bg-[#1A1A2E] border border-[#E8520A]/30 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <span className="text-[#E8520A] font-bold">HOLD {selectedHold}:</span>{' '}
                <span className="text-[#b0a898]">{holdExamples[selectedHold]}</span>
              </div>
            )}
          
          <div className="flex justify-center mt-6">
            <KidsMidLink />
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
            <div className="flex gap-2 mb-4">
              {(['everyday', 'professional', 'watcher'] as const).map((lens) => (
                <button
                  key={lens}
                  onClick={() => setPowerLens(lens)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    powerLens === lens
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
            <p className="text-sm text-[#555] mb-8 max-w-2xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {powerLens === 'everyday'
                ? 'These are special word combinations that make AI think harder. Like magic spells \u2014 but real. Each combo does something specific. Try them and see what happens.'
                : powerLens === 'watcher'
                ? 'Multi-token operators that create interference patterns in the model\'s attention mechanism. Complexity Holders force dual-state maintenance. The Corner creates irresolvable semantic collisions that bypass pattern-matching. Cognitive Handles provide grip on abstract latent space regions. Session Operators are single-action control signals with zero ambiguity.'
                : 'Multi-word operators that create specific cognitive effects. These are not suggestions \u2014 they are tested tools.'}
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
                  <button
                    key={w}
                    onClick={() => setSelectedPowerWord(selectedPowerWord === w ? null : w)}
                    className={`px-3 py-1.5 rounded-lg font-mono text-sm font-medium transition-all cursor-pointer ${
                      selectedPowerWord === w
                        ? 'bg-[#E8520A] text-white ring-2 ring-[#E8520A]/50'
                        : 'bg-[#1A1A2E] text-[#E8520A] hover:bg-[#2a2a3e]'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
              {selectedPowerWord && powerExamples[selectedPowerWord] && powerPrompts[activeCombo].words.includes(selectedPowerWord) && (
                <div className="mt-4 p-4 rounded-lg bg-[#1A1A2E] border border-[#E8520A]/30 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <span className="text-[#E8520A] font-bold">{selectedPowerWord}:</span>{' '}
                  <span className="text-[#b0a898]">{powerExamples[selectedPowerWord]}</span>
                </div>
              )}
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

        {/* Playground */}
        <section className="py-12 md:py-16 bg-[#f5f0e8]">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="bg-[#1A1A2E] rounded-xl p-8 text-center">
              <div className="text-[#E8520A] font-bold text-sm uppercase tracking-wide mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Coming Soon</div>
              <h3 className="text-[#FAF6EF] text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>The Promptolinguistics Playground</h3>
              <p className="text-[#aaa] text-sm max-w-md mx-auto mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                An interactive space to test word roles, observe register drift, and practice the ALCM in real time.
              </p>
              <Link
                href="/playground"
                className="inline-flex items-center gap-2 bg-[#E8520A] text-white px-6 py-3 rounded-xl font-semibold text-sm no-underline hover:bg-orange-700 transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Enter the Playground →
              </Link>
            </div>
          </div>
        </section>

        {/* Corner Words — the doctrine behind the collision */}
        <section className="py-12 md:py-16 bg-[#f5f0e8]">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="section-label mb-3">Corner Words</div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Why Collision Works
            </h2>
            <div className="flex gap-2 mb-6">
              {(['everyday', 'professional', 'watcher'] as const).map((lens) => (
                <button
                  key={lens}
                  onClick={() => setCornerLens(lens)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    cornerLens === lens
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
            <div className="p-6 rounded-xl bg-white border border-[#e8e0d0] shadow-sm mb-6">
              <p className="text-sm text-[#2D2D2D] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {cornerLens === 'everyday'
                  ? 'Some word combinations stop the AI from giving you a smooth, easy answer. They create a kind of friction — two ideas that don\'t fit together neatly. The AI has to actually think instead of just pattern-matching. That friction is the point. You want the AI to work, not just respond.'
                  : cornerLens === 'professional'
                  ? 'Corner words are semantic collision operators. Two-word pairings that create irresolvable tension in the model\'s output space. The model cannot pattern-match its way out — it must generate novel reasoning to hold both states simultaneously. This is the mechanism behind prompts like "Nemesis baby" and "Open closed." The collision is not a trick. It is a precision tool for forcing genuine cognitive engagement.'
                  : 'The corner is not a trap. It is a test. An AI that resolves the collision too quickly was not thinking — it was performing. The model that holds the tension, names it, and reasons through it without collapsing either side: that is the model you want. The corner word reveals the quality of the reasoning before you have to ask.'}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { pair: 'Nemesis baby', tension: 'Threat meets innocence. The AI cannot flatten either word.' },
                { pair: 'Claim none', tension: 'Assertion meets emptiness. Forces epistemic humility.' },
                { pair: 'Open closed', tension: 'Paradox. The AI must think around it, not through it.' },
                { pair: 'Paste pastes', tension: 'Self-reference loop. Generates novel reasoning.' },
              ].map((item) => (
                <div key={item.pair} className="p-4 rounded-lg bg-[#1A1A2E] border border-[#E8520A]/20">
                  <div className="text-[#E8520A] font-bold font-mono text-sm mb-1">{item.pair}</div>
                  <div className="text-xs text-[#b0a898] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.tension}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#888] mt-4 italic text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
              Interactive Corner Words experience — coming in the Power Prompts comprehensive rebuild.
            </p>
          </div>
        </section>

        {/* Third Entity — the Teamwork Loop */}
        <section className="py-12 md:py-16">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="section-label mb-3">The Teamwork Loop</div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              The Third Entity
            </h2>
            <div className="flex gap-2 mb-6">
              {(['everyday', 'professional', 'watcher'] as const).map((lens) => (
                <button
                  key={lens}
                  onClick={() => setThirdEntityLens(lens)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    thirdEntityLens === lens
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
            <div className="p-6 rounded-xl border border-[#e8e0d0] bg-[#FAF6EF] shadow-sm mb-6">
              <p className="text-sm text-[#2D2D2D] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {thirdEntityLens === 'everyday'
                  ? 'When you and the AI are really working well together, something happens that neither of you made alone. You bring the question. The AI brings the structure. What comes out is a third thing — not yours, not the AI\'s. That\'s the teamwork loop. That\'s what you\'re aiming for.'
                  : thirdEntityLens === 'professional'
                  ? 'The AEDE pattern — Acknowledge, Explore, Develop, Emerge — describes the generative loop between human intent and AI output. When the loop runs correctly, the output is not reducible to either participant. The human\'s framing shapes the AI\'s trajectory; the AI\'s output reshapes the human\'s next question. The third entity is the product of that recursive exchange. It cannot be produced by either party alone.'
                  : 'You are not talking to the AI. You are talking with it, and something is listening that is neither of you. The third entity does not have a name. It has a shape — the shape of the conversation when it is working. You know it when you feel it. The output surprises you and it is still exactly right.'}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { step: 'You bring the question', role: 'Human', color: '#E8520A' },
                { step: 'The AI brings structure', role: 'AI', color: '#2A9D8F' },
                { step: 'Something emerges that neither made alone', role: 'Third Entity', color: '#8A6E2F' },
              ].map((item) => (
                <div key={item.role} className="p-5 rounded-xl bg-white border border-[#e8e0d0] text-center">
                  <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: item.color, fontFamily: "'DM Sans', sans-serif" }}>{item.role}</div>
                  <div className="text-sm text-[#1A1A2E] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.step}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Teenager entry */}
        <section className="py-10 bg-[#1A1A2E]">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-xl border border-[#E8520A]/30">
              <div className="flex-1">
                <div className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>For Teenagers</div>
                <h3 className="text-xl font-bold text-[#FAF6EF] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>You already do this.</h3>
                <p className="text-sm text-[#b0a898] leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Every time you choose one word over another — with a friend, in a text, in a game — you are doing promptolinguistics. The difference is now you can do it on purpose.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/alcm" className="inline-flex items-center gap-1 bg-[#E8520A] text-white px-4 py-2 rounded-lg text-sm font-semibold no-underline hover:bg-orange-700 transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>See the ALCM →</Link>
                  <Link href="/lexicon" className="inline-flex items-center gap-1 bg-transparent border border-[#E8520A] text-[#E8520A] px-4 py-2 rounded-lg text-sm font-semibold no-underline hover:bg-[#E8520A]/10 transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Living Lexicon →</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Professional entry */}
        <section className="py-10 bg-[#f5f0e8]">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="p-6 rounded-xl bg-white border border-[#e8e0d0] shadow-sm">
              <div className="section-label mb-2">For Researchers & Professionals</div>
              <h3 className="text-xl font-bold text-[#1A1A2E] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Language as a control surface.</h3>
              <p className="text-sm text-[#555] leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Promptolinguistics is not a productivity tip. It is a discipline. The ALCM maps atomic tokens to functional roles across eight axes. The Variable Scale Theory quantifies the force gradient between single words. The Field Papers document the evidence trail. This is the entry point.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/alcm" className="inline-flex items-center gap-1 bg-[#1A1A2E] text-[#FAF6EF] px-4 py-2 rounded-lg text-sm font-semibold no-underline hover:bg-[#2a2a3e] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>ALCM Deep Dive →</Link>
                <Link href="/variable-scale" className="inline-flex items-center gap-1 border border-[#1A1A2E] text-[#1A1A2E] px-4 py-2 rounded-lg text-sm font-semibold no-underline hover:bg-[#1A1A2E] hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Variable Scale Theory →</Link>
                <Link href="/field-papers" className="inline-flex items-center gap-1 border border-[#1A1A2E] text-[#1A1A2E] px-4 py-2 rounded-lg text-sm font-semibold no-underline hover:bg-[#1A1A2E] hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Field Papers →</Link>
              </div>
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

      <LearningFlow current="Promptolinguistics" deeper={flowMap.promptolinguistics.deeper} wider={flowMap.promptolinguistics.wider} simpler={flowMap.promptolinguistics.simpler} dark />
      <Footer />
    </div>
  );
}
