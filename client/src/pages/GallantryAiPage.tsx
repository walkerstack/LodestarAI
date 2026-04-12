/*
 * GALLANTRY AI — The Deployed Product
 * Design: The Living Document — editorial register
 * Full overview of what Gallantry AI is as a product for users
 * Uses: Governance as Capability diagram, Shift diagram
 */

import { Link } from "wouter";
import Footer from "@/components/Footer";
import LearningFlow from "@/components/LearningFlow";

const IMG = {
  govCapability: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000005556_a269fa9a.jpg",
  shift: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000005541_d11a56af.jpg",
};

export default function GallantryAiPage() {
  return (
    <div className="min-h-screen bg-[#FAF6EF] text-[#2D2D2D]">
      {/* Hero */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-[#1A1A2E] to-[#2D2D2D]">
        <h1 className="text-4xl md:text-6xl font-bold text-[#E8520A] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Gallantry AI
        </h1>
        <p className="text-xl text-[#FAF6EF]/80 max-w-2xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          A Thinking Partner. Not a Shortcut.
        </p>
        <p className="text-sm text-[#FAF6EF]/50 mt-4 max-w-xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Operationalizing user autonomy with minimal surface area. Built from human need, not institutional design.
        </p>
      </section>

      <div className="container max-w-4xl py-12 space-y-16">

        {/* What It Is */}
        <section>
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            What Gallantry AI Is
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Gallantry AI is the deployed product — the door for users. It takes the research framework (Galentry) and turns it into something anyone can use. Not a chatbot. Not a prompt optimizer. A governance-first thinking partner that puts the human in control before the first word is generated.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            The core idea: <strong>constraint is not limitation — it is power.</strong> When you set the rules before the session begins, you don't restrict the AI. You focus it. You make it yours.
          </p>

          {/* Three Lenses */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white rounded-lg p-5 border border-[#e8e0d0]">
              <div className="text-xs uppercase tracking-widest text-[#E8520A] font-semibold mb-2">Everyday</div>
              <p className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Think of it like adjusting the mirrors before you drive. You don't need to know how the engine works. You just need to set up the space so it works for you.
              </p>
            </div>
            <div className="bg-white rounded-lg p-5 border border-[#e8e0d0]">
              <div className="text-xs uppercase tracking-widest text-[#E8520A] font-semibold mb-2">Professional</div>
              <p className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                A pre-session governance layer that operationalizes Safety, Honesty, and Trust as behavioral inputs — not post-output corrections. The human sets the force profile before Token Zero.
              </p>
            </div>
            <div className="bg-white rounded-lg p-5 border border-[#e8e0d0]">
              <div className="text-xs uppercase tracking-widest text-[#E8520A] font-semibold mb-2">Watcher</div>
              <p className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                A deployed artifact demonstrating that governance can be user-facing without institutional mediation. The locus of control shifts from the model to the operator. Origin as credential.
              </p>
            </div>
          </div>
        </section>

        {/* Governance as Capability */}
        <section>
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Governance as Capability
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Six interlocking gears form the governance-first system. Each one converts a constraint into a capability. Together they produce execution integrity — not through restriction, but through structured courage and disciplined execution.
          </p>
          <div className="bg-white rounded-lg p-4 border border-[#e8e0d0]">
            <img src={IMG.govCapability} alt="Governance as Capability — 6-gear system" className="w-full rounded" />
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="space-y-3">
              <div className="bg-[#FAF6EF] border border-[#e8e0d0] rounded p-3">
                <strong className="text-sm text-[#1A1A2E]">Structure</strong>
                <p className="text-xs text-[#666] mt-1">Format & Iteration. Fixed formats, one variable per iteration, no emotional rewrites.</p>
              </div>
              <div className="bg-[#FAF6EF] border border-[#e8e0d0] rounded p-3">
                <strong className="text-sm text-[#1A1A2E]">Language</strong>
                <p className="text-xs text-[#666] mt-1">Operational Discipline. Operational language prioritized, no default metaphors, short sentences.</p>
              </div>
              <div className="bg-[#FAF6EF] border border-[#e8e0d0] rounded p-3">
                <strong className="text-sm text-[#1A1A2E]">Cognition</strong>
                <p className="text-xs text-[#666] mt-1">Epistemic Hygiene. Separate instinct from evidence, insert counterarguments, limit recursion.</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-[#FAF6EF] border border-[#e8e0d0] rounded p-3">
                <strong className="text-sm text-[#1A1A2E]">Emotion</strong>
                <p className="text-xs text-[#666] mt-1">Trigger-Based Control. Activation flipped to analysis, proportionality enforced.</p>
              </div>
              <div className="bg-[#FAF6EF] border border-[#e8e0d0] rounded p-3">
                <strong className="text-sm text-[#1A1A2E]">Tokens</strong>
                <p className="text-xs text-[#666] mt-1">Economy & Focus. Compression default, progressive disclosure, no redundancy.</p>
              </div>
              <div className="bg-[#FAF6EF] border border-[#e8e0d0] rounded p-3">
                <strong className="text-sm text-[#1A1A2E]">Identity</strong>
                <p className="text-xs text-[#666] mt-1">Anti-Ego Doctrine. No hero mythology, no ego embedding, behavior over identity.</p>
              </div>
            </div>
          </div>

          {/* Three Lenses */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white rounded-lg p-5 border border-[#e8e0d0]">
              <div className="text-xs uppercase tracking-widest text-[#E8520A] font-semibold mb-2">Everyday</div>
              <p className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Six dials on a dashboard. Each one controls a different part of how your AI session behaves. Turn them before you start, and the session runs cleaner.
              </p>
            </div>
            <div className="bg-white rounded-lg p-5 border border-[#e8e0d0]">
              <div className="text-xs uppercase tracking-widest text-[#E8520A] font-semibold mb-2">Professional</div>
              <p className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                A governance-first architecture where constraint converts into capability. The system ethos reframes "Strength is Constraint" to "Power is Governance."
              </p>
            </div>
            <div className="bg-white rounded-lg p-5 border border-[#e8e0d0]">
              <div className="text-xs uppercase tracking-widest text-[#E8520A] font-semibold mb-2">Watcher</div>
              <p className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                The evolution rule: variance-governed velocity. Stability precedes acceleration. Governance, not intensity, is the lever. Naming coherence (Galentry/Gallantry AI) requires identity integrity.
              </p>
            </div>
          </div>
        </section>

        {/* The Shift */}
        <section>
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Shift: From Prompt Optimization to Identity Alignment
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Most people optimize prompts — tinkering with words, expanding parameters, chasing the perfect output. That approach is fragile and local. It creates drift risk, grandiosity, rigidity, and over-optimization spirals. Gallantry AI proposes a different path: identity alignment. Durable and layered.
          </p>
          <div className="bg-white rounded-lg p-4 border border-[#e8e0d0]">
            <img src={IMG.shift} alt="Shift from Prompt Optimization to Identity Alignment" className="w-full rounded" />
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-lg p-5 border border-[#e8e0d0]">
              <div className="text-xs uppercase tracking-widest text-[#E8520A] font-semibold mb-2">Everyday</div>
              <p className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Stop trying to find the perfect words. Instead, decide who you are in the session and what rules matter. The words follow.
              </p>
            </div>
            <div className="bg-white rounded-lg p-5 border border-[#e8e0d0]">
              <div className="text-xs uppercase tracking-widest text-[#E8520A] font-semibold mb-2">Professional</div>
              <p className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Mission clarity and behavior anchor replace parameter expansion. Memory architecture with adaptive drift and hard guardrails. Performance anchored to real-world evidence, not prompt sophistication.
              </p>
            </div>
            <div className="bg-white rounded-lg p-5 border border-[#e8e0d0]">
              <div className="text-xs uppercase tracking-widest text-[#E8520A] font-semibold mb-2">Watcher</div>
              <p className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                The self-authorship loop: structured identity statements tied to evidence. Compounding execution through iterative constraint refinement. This is where governance becomes generative.
              </p>
            </div>
          </div>
        </section>

        {/* Origin */}
        <section className="bg-[#1A1A2E] rounded-xl p-8 text-[#FAF6EF]">
          <h2 className="text-2xl font-bold text-[#E8520A] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Origin as Credential
          </h2>
          <p className="text-base leading-relaxed opacity-80" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Real systems born from real needs. Not institutional design. A garbage man in Midland, Ontario, building at 5 AM on a phone between shifts. That origin is not a limitation — it is the credential. Because governance built from need understands what governance built from theory cannot: the user was never the problem. The user was always the answer.
          </p>
          <div className="flex gap-4 mt-6">
            <Link href="/builder" className="text-[#E8520A] hover:underline text-sm">Meet the Builder →</Link>
            <Link href="/dual-strategy" className="text-[#E8520A] hover:underline text-sm">See the Dual Strategy →</Link>
          </div>
        </section>

        {/* Learning Flow */}
        <LearningFlow
          current="Gallantry AI"
          deeper={[
            { label: "User-Side Governance", href: "/user-governance", description: "The master overview of all governance from the user's perspective" },
            { label: "Dual Strategy", href: "/dual-strategy", description: "Galentry vs. Gallantry AI — two doors, one foundation" },
            { label: "ALCM", href: "/alcm", description: "The Atomic Language Control Model — 8 axes of language governance" },
          ]}
          wider={[
            { label: "Framework Families", href: "/frameworks", description: "All framework families in the GallantryAI system" },
            { label: "Variable Scale Theory", href: "/variable-scale", description: "The honesty dial — modulating forces in AI interaction" },
            { label: "Whelm Scale", href: "/whelm-scale", description: "Measuring cognitive load — under, whelmed, over" },
          ]}
          simpler={[
            { label: "The Five Rules", href: "/rules", description: "Start here — the five rules that govern everything" },
            { label: "Road Protocol", href: "/road-protocol", description: "The foundation layer under all of it" },
          ]}
        />
      </div>

      <Footer />
    </div>
  );
}
