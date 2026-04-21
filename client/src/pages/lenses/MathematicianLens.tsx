/**
 * GALLANTRYAI — Mathematician Lens
 * Design: Precise, structural, geometric
 * Everyday links to teacher/everyday areas, Professional to technical depth, Watcher to meta layer
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LearningFlow from "@/components/LearningFlow";
import { flowMap } from "@/lib/learningFlowMap";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import KidsRedirect from "@/components/KidsRedirect";
import KidsMidLink from "@/components/KidsMidLink";

type Lens = 'everyday' | 'professional' | 'watcher';

const sections = [
  { id: "math", label: "The Math of Language" },
  { id: "vectors", label: "Force Vectors" },
  { id: "alcm", label: "The ALCM" },
  { id: "token", label: "Token Geometry" },
  { id: "constraint", label: "Constraint Functions" },
  { id: "equation", label: "The Scaffold Equation" },
  { id: "next", label: "Next Steps" },
];

function LensToggle({ lens, setLens }: { lens: Lens; setLens: (l: Lens) => void }) {
  return (
    <div className="flex gap-2 mb-4">
      {(['everyday', 'professional', 'watcher'] as const).map((l) => (
        <button key={l} onClick={() => setLens(l)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            lens === l ? l === 'everyday' ? 'bg-[#E8520A] text-white' : l === 'watcher' ? 'bg-[#1A1A2E] text-[#E8520A]' : 'bg-[#2A9D8F] text-white'
            : 'bg-white border border-[#e8e0d0] text-[#888] hover:text-[#1A1A2E]'
          }`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {l === 'everyday' ? 'Everyday' : l === 'professional' ? 'Professional' : 'Watcher'}
        </button>
      ))}
    </div>
  );
}

export default function MathematicianLens() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [activeSection, setActiveSection] = useState(0);
  const [mathLens, setMathLens] = useState<Lens>('professional');
  const [vectorLens, setVectorLens] = useState<Lens>('professional');
  const [alcmLens, setAlcmLens] = useState<Lens>('professional');
  const [tokenLens, setTokenLens] = useState<Lens>('professional');
  const [constraintLens, setConstraintLens] = useState<Lens>('professional');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EF]">
      <Nav />
      <KidsRedirect story="This page looks at AI through numbers and patterns. Math people see AI differently — they look for structure. You can too." quote="Patterns are everywhere. Even in conversations." attribution="The Mathematician" />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[#1A1A2E]" />
          <div className="absolute inset-0 opacity-20">
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/mathematician-lens-hero-8T94zAE4WP7TJtmxq7HoxM.webp" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative container py-16 md:py-24 max-w-4xl mx-auto px-6">
            <div className="text-[#818cf8] text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Lens: Mathematician</div>
            <h1 className="text-3xl md:text-5xl font-bold text-[#FAF6EF] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Language Has Geometry.<br /><span className="text-[#818cf8]">Prompts Have Equations.</span>
            </h1>
            <p className="text-base text-[#b0a898] max-w-xl leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Every prompt is a vector in a high-dimensional space. Every word shifts the trajectory. Every constraint narrows the solution set. If you think in functions, mappings, and transformations — this is where language becomes your kind of math.
            </p>
          
          <div className="flex justify-center mt-6">
            <KidsMidLink />
          </div>
        </div>
        </section>

        {/* Section Nav */}
        <div className="sticky top-0 z-30 bg-[#FAF6EF] border-b border-[#e8e0d0] shadow-sm">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
              {sections.map((s, i) => (
                <a key={s.id} href={`#${s.id}`} onClick={() => setActiveSection(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap no-underline transition-all ${activeSection === i ? "bg-[#6366f1] text-white" : "text-[#888] hover:text-[#1A1A2E]"}`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.label}</a>
              ))}
            </div>
          </div>
        </div>

        {/* The Math of Language */}
        <section id="math" className="py-12 md:py-16" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>The Math of Language</h2>
            <LensToggle lens={mathLens} setLens={setMathLens} />
            {mathLens === 'everyday' ? (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>Think of a prompt like giving directions. "Go to the store" is simple. "Go to the store, buy milk, come back by 5" is more precise. The more precise your directions, the better the result. That's what mathematicians see in prompting — precision as a tool.</p>
                <div className="p-4 rounded-xl bg-white border border-[#e8e0d0]">
                  <p className="text-sm text-[#555]" style={{ fontFamily: "'DM Sans', sans-serif" }}><strong>Try this:</strong> Ask an AI "Tell me about dogs" — then ask "Compare the temperament of golden retrievers and border collies for a family with young children." Notice how the second one gets a better answer? That's the math at work.</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Link href="/rules" className="px-4 py-2 rounded-full bg-[#E8520A] text-white text-xs font-medium no-underline">The Five Rules →</Link>
                  <Link href="/flower-presets" className="px-4 py-2 rounded-full bg-[#1A1A2E] text-[#FAF6EF] text-xs font-medium no-underline">Flower Presets →</Link>
                </div>
              </div>
            ) : mathLens === 'watcher' ? (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>The mathematical lens reveals something the other lenses obscure: language-to-model interaction is not metaphorically mathematical — it is literally mathematical. The transformer architecture operates on attention matrices, embedding vectors, and probability distributions. The ALCM is the first attempt to map these shifts systematically from the user's side.</p>
                <div className="flex gap-2 flex-wrap">
                  <Link href="/citizen-researcher" className="px-4 py-2 rounded-full bg-[#1A1A2E] text-[#E8520A] text-xs font-medium no-underline">Citizen Researcher →</Link>
                  <Link href="/for/cognitive-science" className="px-4 py-2 rounded-full bg-[#1A1A2E] text-[#FAF6EF] text-xs font-medium no-underline">Cognitive Science Lens →</Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>Promptolinguistics treats words as operators in a formal system. The ALCM maps eight axes of linguistic force: Direction, Constraint, Scope, Authority, Tone, Zoom, Perspective, and Depth. Each axis is a dimension. Each prompt is a point in this 8-dimensional space.</p>
                <div className="p-4 rounded-xl bg-[#1A1A2E] text-sm">
                  <code className="text-[#E8520A]">P(output) = f(direction, constraint, scope, authority, tone, zoom, perspective, depth)</code>
                  <p className="text-xs text-[#888] mt-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Every prompt maps to a coordinate in this space. Changing one word shifts the coordinate.</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Link href="/promptolinguistics" className="px-4 py-2 rounded-full bg-[#2A9D8F] text-white text-xs font-medium no-underline">Promptolinguistics →</Link>
                  <Link href="/for/prompt-engineer" className="px-4 py-2 rounded-full bg-[#2A9D8F] text-white text-xs font-medium no-underline">Prompt Engineer Lens →</Link>
                </div>
              </div>
            )}
          </div>
        </section>
        {/* Force Vectors */}
        <section id="vectors" className="py-12 md:py-16 bg-[#f5f0e8]" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Words as Force Vectors</h2>
            <LensToggle lens={vectorLens} setLens={setVectorLens} />
            {vectorLens === 'everyday' ? (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>Imagine pushing a ball across a table. "Analyze" pushes it one direction. "Describe" pushes it another. "Compare" splits it into two paths. Each word pushes the AI's answer in a different direction.</p>
                <div className="grid grid-cols-3 gap-3">
                  {[{ word: "Analyze", push: "Deep, structured" }, { word: "Describe", push: "Surface, visual" }, { word: "Compare", push: "Two paths" }, { word: "Explain", push: "Teaching mode" }, { word: "List", push: "Quick, minimal" }, { word: "Argue", push: "Adversarial" }].map((w) => (
                    <div key={w.word} className="p-3 rounded-lg bg-white border border-[#e8e0d0] text-center">
                      <div className="font-bold text-sm text-[#1A1A2E] font-mono">{w.word}</div>
                      <div className="text-[10px] text-[#888] mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{w.push}</div>
                    </div>
                  ))}
                </div>
                <Link href="/for/child" className="inline-block px-4 py-2 rounded-full bg-[#E8520A] text-white text-xs font-medium no-underline">Children's Section →</Link>
              </div>
            ) : vectorLens === 'watcher' ? (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>Each word creates a displacement in the model's latent space. The magnitude varies by model architecture, training data, and context window position. What the ALCM captures is the user-observable effect — the phenomenological geometry of prompting.</p>
                <Link href="/field-papers" className="inline-block px-4 py-2 rounded-full bg-[#1A1A2E] text-[#E8520A] text-xs font-medium no-underline">Field Papers →</Link>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>Action verbs form an escalation ladder: TRY (force=1) through FORCE (force=6). The HOLD dial adds a second dimension: STRONG through FORWARD. Together, they form a 2D control surface.</p>
                <div className="p-4 rounded-xl bg-[#1A1A2E] text-sm">
                  <code className="text-[#E8520A]">F(verb, hold) → output_distribution_shape</code>
                  <p className="text-xs text-[#888] mt-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>The verb sets the magnitude. The HOLD position sets the direction.</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Link href="/promptolinguistics" className="px-4 py-2 rounded-full bg-[#2A9D8F] text-white text-xs font-medium no-underline">Action Verbs & HOLD Dial →</Link>
                  <Link href="/for/prompt-engineer" className="px-4 py-2 rounded-full bg-[#2A9D8F] text-white text-xs font-medium no-underline">Prompt Engineer Lens →</Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* The ALCM */}
        <section id="alcm" className="py-12 md:py-16" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>The ALCM as Coordinate System</h2>
            <LensToggle lens={alcmLens} setLens={setAlcmLens} />
            {alcmLens === 'everyday' ? (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>Think of the ALCM like a mixing board in a recording studio. Each slider controls something different — volume, bass, treble, reverb. The ALCM has eight sliders. Each one changes how the AI responds. You don't need to use all eight.</p>
                <Link href="/for/everyday" className="inline-block px-4 py-2 rounded-full bg-[#E8520A] text-white text-xs font-medium no-underline">Everyday Person Lens →</Link>
              </div>
            ) : alcmLens === 'watcher' ? (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>The ALCM is an empirical coordinate system, not a theoretical one. It was derived from observed behavioral changes across nine AI platforms. The mathematical question is whether this user-side coordinate system has a stable mapping to the model's internal representation space.</p>
                <Link href="/citizen-researcher" className="inline-block px-4 py-2 rounded-full bg-[#1A1A2E] text-[#E8520A] text-xs font-medium no-underline">Research Methodology →</Link>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>Eight axes define the ALCM space. Each axis is a continuum. The axes are orthogonal in practice — changing Scope doesn't necessarily change Authority. This independence allows for precise, predictable prompt engineering.</p>
                <div className="grid grid-cols-2 gap-3">
                  {["Direction", "Constraint", "Scope", "Authority", "Tone", "Zoom", "Perspective", "Depth"].map((axis) => (
                    <div key={axis} className="p-3 rounded-lg bg-[#1A1A2E] text-center"><div className="text-xs font-bold font-mono text-[#6366f1]">{axis}</div></div>
                  ))}
                </div>
                <Link href="/promptolinguistics" className="inline-block px-4 py-2 rounded-full bg-[#2A9D8F] text-white text-xs font-medium no-underline">Full ALCM Breakdown →</Link>
              </div>
            )}
          </div>
        </section>

        {/* Token Geometry */}
        <section id="token" className="py-12 md:py-16 bg-[#1A1A2E]" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#FAF6EF] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Token Geometry — Token Zero</h2>
            <LensToggle lens={tokenLens} setLens={setTokenLens} />
            {tokenLens === 'everyday' ? (
              <div className="space-y-4">
                <p className="text-sm text-[#b0a898] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>Before you type anything, the AI already has a "mood." Token Zero is about controlling that mood before you start. It's like setting the thermostat before guests arrive.</p>
                <Link href="/rules" className="inline-block px-4 py-2 rounded-full bg-[#E8520A] text-white text-xs font-medium no-underline">Start with the Five Rules →</Link>
              </div>
            ) : tokenLens === 'watcher' ? (
              <div className="space-y-4">
                <p className="text-sm text-[#b0a898] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>Token Zero is the pre-output force profile — the initial conditions of the system before user input. In dynamical systems terms, it's the attractor basin the model starts in. Understanding Token Zero is understanding initial conditions in a chaotic system.</p>
                <Link href="/for/cognitive-science" className="inline-block px-4 py-2 rounded-full bg-[#1A1A2E] text-[#E8520A] text-xs font-medium no-underline border border-[#E8520A]/30">Cognitive Science Lens →</Link>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-[#b0a898] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>Token Zero is the geometric origin of the prompt space. The efficiency of a prompt can be measured as the ratio of displacement magnitude to token count.</p>
                <div className="p-4 rounded-xl bg-black/30 text-sm">
                  <code className="text-[#6366f1]">efficiency = |displacement| / token_count</code>
                  <p className="text-xs text-[#888] mt-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>The Token Efficiency Strategy maps the path from strong (high displacement, high tokens) to elite (high displacement, low tokens).</p>
                </div>
                <Link href="/promptolinguistics" className="inline-block px-4 py-2 rounded-full bg-[#2A9D8F] text-white text-xs font-medium no-underline">Token Efficiency Strategy →</Link>
              </div>
            )}
          </div>
        </section>

        {/* Constraint Functions */}
        <section id="constraint" className="py-12 md:py-16" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Constraint as Mathematical Function</h2>
            <LensToggle lens={constraintLens} setLens={setConstraintLens} />
            {constraintLens === 'everyday' ? (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>Constraints are like guardrails on a road. "Only use simple words" is a guardrail. "Keep it under 100 words" is a guardrail. The more guardrails you set, the more focused the AI's answer becomes.</p>
                <Link href="/road-protocol" className="inline-block px-4 py-2 rounded-full bg-[#E8520A] text-white text-xs font-medium no-underline">The Road Protocol →</Link>
              </div>
            ) : constraintLens === 'watcher' ? (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>Constraint in AI prompting maps to constraint in optimization theory. The model's output is the solution to an optimization problem: maximize relevance subject to constraints. Each constraint narrows the feasible region.</p>
                <Link href="/field-papers" className="inline-block px-4 py-2 rounded-full bg-[#1A1A2E] text-[#E8520A] text-xs font-medium no-underline">Field Papers →</Link>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>CAN opens possibility space. SHOULD implies obligation. MUST enforces necessity. ONLY restricts to a subset. NEVER eliminates entirely. Each constraint word is a set operation on the model's output space.</p>
                <div className="p-4 rounded-xl bg-[#1A1A2E] text-sm">
                  <code className="text-[#6366f1]">CAN → ∪ (union) | MUST → ∩ (intersection) | NEVER → ∁ (complement) | ONLY → ↾ (restriction)</code>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Link href="/promptolinguistics" className="px-4 py-2 rounded-full bg-[#2A9D8F] text-white text-xs font-medium no-underline">Word Mechanics →</Link>
                  <Link href="/for/prompt-engineer" className="px-4 py-2 rounded-full bg-[#2A9D8F] text-white text-xs font-medium no-underline">Prompt Engineer Lens →</Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* The Scaffold Equation */}
        <section id="equation" className="py-12 md:py-16 bg-[#f5f0e8]" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>The Scaffold as Equation</h2>
            <div className="space-y-3">
              {[
                { level: "Floor", eq: "y = c", desc: "Fixed rules. No variables. The Five Rules are constants." },
                { level: "Level Two", eq: "y = mx + b", desc: "One variable: intention. Set the slope before you start." },
                { level: "Level Three", eq: "y = ax² + bx + c", desc: "Drift detection. The curve bends. You notice when trajectory diverges." },
                { level: "Level Four", eq: "y = f(x₁...x₈)", desc: "Eight ALCM axes as independent variables. Each word is a partial derivative." },
                { level: "Ceiling", eq: "y = ∫f(x)dx", desc: "The framework is internalized. You don't calculate — you intuit." },
              ].map((item) => (
                <div key={item.level} className="p-5 rounded-xl bg-white border border-[#e8e0d0]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#6366f1]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.level}</span>
                    <code className="text-xs text-[#1A1A2E] bg-[#f5f0e8] px-2 py-0.5 rounded">{item.eq}</code>
                  </div>
                  <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section id="next" className="py-12 md:py-16" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Where to Go From Here</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: "Promptolinguistics", desc: "The full ALCM, action verbs, HOLD dial.", link: "/promptolinguistics", color: "#6366f1" },
                { label: "Prompt Engineer Lens", desc: "Technical depth — frameworks, Malbolge, operators.", link: "/for/prompt-engineer", color: "#E8520A" },
                { label: "Cognitive Science Lens", desc: "How the brain processes AI interaction.", link: "/for/cognitive-science", color: "#2A9D8F" },
                { label: "Framework Families", desc: "Visual models that organize the math.", link: "/frameworks", color: "#c87533" },
                { label: "Field Papers", desc: "The raw research behind the models.", link: "/field-papers", color: "#6366f1" },
                { label: "Everyday Person Lens", desc: "The simple version first.", link: "/for/everyday", color: "#E8520A" },
                { label: "Guardian & Teacher Lens", desc: "How to teach these concepts.", link: "/for/guardian-teacher", color: "#2A9D8F" },
                { label: "Researcher Lens", desc: "The methodology and honest disclaimers.", link: "/for/researcher", color: "#c87533" },
              ].map((item) => (
                <Link key={item.label} href={item.link} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#e8e0d0] no-underline hover:shadow-md transition-all hover:scale-[1.01]">
                  <div className="w-2 h-10 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <div className="flex-1">
                    <div className="font-bold text-sm text-[#1A1A2E]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.label}</div>
                    <div className="text-xs text-[#888]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</div>
                  </div>
                  <span className="text-[#888]">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Watcher Note */}
        <section className="py-12 md:py-16 bg-[#1A1A2E]">
          <div className="container max-w-3xl mx-auto px-6 text-center">
            <p className="text-xs text-[#E8520A] font-semibold tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>The Watcher Notes</p>
            <p className="text-base text-[#b0a898] leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
              "The mathematician sees what the linguist feels and the psychologist intuits: that language has structure beyond grammar. The ALCM is not a metaphor for mathematics — it is mathematics, waiting for someone to formalize it. The equations above are invitations, not conclusions."
            </p>
          </div>
        </section>
      </main>

      {/* ── DRIFT TIDBIT ── */}
      <section className="py-10 px-6" style={{ background: "#1a1208" }}>
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl p-6" style={{ background: "#0f0c08", border: "1.5px solid #E8520A30" }}>
            <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#E8520A", fontFamily: "'DM Sans', sans-serif" }}>Information Gap</div>
            <p className="text-base leading-relaxed mb-4" style={{ color: "#c8b89a", fontFamily: "'DM Sans', sans-serif" }}>
              You model systems. You know that small perturbations compound. Here is the variable most AI governance frameworks haven't formalized: <strong style={{ color: "#FAF6EF" }}>the rate of drift as a function of session length.</strong> It is not linear. It is not random. It follows a pattern — and it starts with the human, not the model.
            </p>
            <a href="/drift" className="inline-block px-5 py-2.5 rounded-full text-sm font-bold" style={{ background: "#E8520A", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
              What is drift? →
            </a>
          </div>
        </div>
      </section>

      {/* ── ANTHROPOMORPHISM TIDBIT ── */}
      <section className="py-10 px-6" style={{ background: "#100c18" }}>
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl p-6" style={{ background: "#0a0810", border: "1.5px solid #6366f130" }}>
            <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#6366f1", fontFamily: "'DM Sans', sans-serif" }}>Information Gap</div>
            <p className="text-base leading-relaxed mb-4" style={{ color: "#c8b89a", fontFamily: "'DM Sans', sans-serif" }}>
              You model systems with precision. Here is the variable most AI governance frameworks haven't formalized: <strong style={{ color: "#FAF6EF" }}>the human's trust in the model is a function of anthropomorphism, not accuracy.</strong> Users trust confident-sounding AI more than accurate-but-uncertain AI. The confidence signal is social, not mathematical. That's the gap anthropomorphism creates in your model.
            </p>
            <a href="/anthropomorphism" className="inline-block px-5 py-2.5 rounded-full text-sm font-bold" style={{ background: "#6366f1", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
              What is anthropomorphism? →
            </a>
          </div>
        </div>
      </section>
      <LearningFlow current="Mathematician Lens" deeper={flowMap.mathematician.deeper} wider={flowMap.mathematician.wider} simpler={flowMap.mathematician.simpler} />
      <Footer />
    </div>
  );
}
