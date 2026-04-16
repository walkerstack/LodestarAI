/*
 * DUAL STRATEGY — Galentry vs. Gallantry AI
 * Two doors, one foundation. Research layer vs. deployed product.
 */

import { Link } from "wouter";
import Footer from "@/components/Footer";
import LearningFlow from "@/components/LearningFlow";
import Nav from "@/components/Nav";
import KidsRedirect from "@/components/KidsRedirect";
import { kidsBlurbs } from "@/lib/kidsBlurbs";
import KidsMidLink from "@/components/KidsMidLink";

const IMG = {
  humanCentered: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000005846_af0e2453.jpg",
  humanCenteredAlt: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000005848_4e6813d7.png",
  tokenZeroFlow: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000005841_91ff30b1.jpg",
  shift: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000005541_d11a56af.jpg",
  rlhf: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000005860_c6f6c0a8.jpg",
};

export default function DualStrategy() {
  return (
    <div className="min-h-screen bg-[#FAF6EF] text-[#2D2D2D]">
      <Nav />
      <KidsRedirect story={kidsBlurbs["/dual-strategy"].story} quote={kidsBlurbs["/dual-strategy"].quote} attribution={kidsBlurbs["/dual-strategy"].attribution} />
      {/* Hero */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-[#1A1A2E] to-[#2D2D2D]">
        <h1 className="text-4xl md:text-5xl font-bold text-[#E8520A] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Two Doors. One Foundation.
        </h1>
        <p className="text-lg text-[#FAF6EF]/80 max-w-2xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Galentry is the meta layer for researchers. Gallantry AI is the deployed product for users. Same core principles, different doors for distinct audiences.
        </p>
      </section>

      <div className="container max-w-4xl py-12 space-y-16">

        {/* RLHF vs GallantryAI */}
        <section>
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            RLHF vs. GallantryAI: Divergent Paths
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            RLHF (Reinforcement Learning from Human Feedback) is institution-facing, post-output governance. It harvests feedback after the AI generates, uses annotation pipelines and researcher ranking, and treats humans as data points. GallantryAI inverts this entirely: individual-facing, pre-session governance through Token Zero. The feedback loop runs through the person first. It focuses on what happens before, not after. It teaches intentional, honest interaction. Humans are conscious participants, not data sources.
          </p>
          <div className="bg-white rounded-lg p-4 border border-[#e8e0d0]">
            <img src={IMG.rlhf} alt="RLHF vs. GallantryAI — Divergent Paths in AI Governance" className="w-full rounded" />
          </div>
          <p className="text-sm text-[#888] mt-2 text-center italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            The gap: pre-session governance at the individual level. Shifting from harvesting feedback to empowering better inputs.
          </p>

          {/* Three Voices */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white rounded-lg p-5 border border-[#e8e0d0]">
              <div className="text-xs uppercase tracking-widest text-[#E8520A] font-semibold mb-2">Everyday</div>
              <p className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Most AI companies fix the output after it's wrong. GallantryAI helps you set things up right before you start. You're the participant, not the data.
              </p>
            </div>
            <div className="bg-white rounded-lg p-5 border border-[#e8e0d0]">
              <div className="text-xs uppercase tracking-widest text-[#E8520A] font-semibold mb-2">Professional</div>
              <p className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                RLHF operates post-output with institutional mediation. GallantryAI operates pre-session with individual autonomy. The governance locus shifts from model to operator.
              </p>
            </div>
            <div className="bg-white rounded-lg p-5 border border-[#e8e0d0]">
              <div className="text-xs uppercase tracking-widest text-[#E8520A] font-semibold mb-2">Watcher</div>
              <p className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                A paradigm inversion: from training-signal extraction to user-empowerment architecture. The human is repositioned from feedback source to governance origin.
              </p>
            </div>
          </div>
        </section>
        {/* The Two Doors */}
        <section>
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Dual Strategy
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#1A1A2E] rounded-xl p-6 text-[#FAF6EF]">
              <h3 className="text-xl font-bold text-[#6366F1] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Galentry
              </h3>
              <p className="text-xs uppercase tracking-widest text-[#FAF6EF]/50 mb-3">Meta Layer for Researchers</p>
              <p className="text-sm opacity-80" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Conceptual rigor, language mechanics, governance theory. The research framework that maps how language, structure, and human posture interact with AI systems. For those who study the mechanics.
              </p>
              <div className="mt-4 pt-4 border-t border-[#FAF6EF]/10">
                <Link href="/promptolinguistics" className="text-[#818CF8] text-sm hover:underline block mb-1">Promptolinguistics →</Link>
                <Link href="/frameworks" className="text-[#6366F1] text-sm hover:underline block mb-1">Framework Families →</Link>
                <Link href="/alcm" className="text-[#4F46E5] text-sm hover:underline block">ALCM →</Link>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border-2 border-[#B45309]">
              <h3 className="text-xl font-bold text-[#B45309] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Gallantry AI
              </h3>
              <p className="text-xs uppercase tracking-widest text-[#888] mb-3">Deployed Product for Users</p>
              <p className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Operationalizing user autonomy with minimal surface area. The product that takes the research and makes it usable. For those who need a thinking partner, not a theory paper.
              </p>
              <div className="mt-4 pt-4 border-t border-[#e8e0d0]">
                <Link href="/gallantry-ai" className="text-[#D97706] text-sm hover:underline block mb-1">Gallantry AI →</Link>
                <Link href="/rules" className="text-[#B45309] text-sm hover:underline block mb-1">The Five Rules →</Link>
                <Link href="/flower-presets" className="text-[#92400E] text-sm hover:underline block">Flower Presets →</Link>
              </div>
            </div>
          </div>
          <div className="mt-4 bg-[#FAF6EF] border border-[#e8e0d0] rounded-lg p-4 text-center">
            <p className="text-sm font-semibold text-[#1A1A2E]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Shared Foundation: Same core principles, different doors for distinct audiences. Grounded in user autonomy.
            </p>
          
          <div className="flex justify-center mt-6">
            <KidsMidLink />
          </div>
        </div>
        </section>

        {/* Human-Centered AI Governance */}
        <section>
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Human-Centered AI Governance
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            The Token Zero and Corner Words framework. Three pillars: Token Zero (pre-output force profile — session behavior is set before generation, locus of control is human), Failure Mechanics (session momentum vs. signal — when AI ignores actual signal and gets caught in its own current), and Corner Words (collision over sequence — two words in collision form anchoring constraints that hold under pressure).
          </p>
          <div className="bg-white rounded-lg p-4 border border-[#e8e0d0] mb-4">
            <img src={IMG.humanCentered} alt="Human-Centered AI Governance — Token Zero & Corner Words" className="w-full rounded" />
          </div>

          {/* Three Voices */}
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-lg p-5 border border-[#e8e0d0]">
              <div className="text-xs uppercase tracking-widest text-[#E8520A] font-semibold mb-2">Everyday</div>
              <p className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Before you type, decide what matters. That decision shapes everything the AI does. If it starts drifting, you catch it and fix it. Two strong words together hold better than a long sentence.
              </p>
            </div>
            <div className="bg-white rounded-lg p-5 border border-[#e8e0d0]">
              <div className="text-xs uppercase tracking-widest text-[#E8520A] font-semibold mb-2">Professional</div>
              <p className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Token Zero establishes the force profile pre-generation. The Correction Triad (Failure → Catch → Fix) addresses session momentum drift. Corner Words provide collision-based anchoring superior to linear sequencing.
              </p>
            </div>
            <div className="bg-white rounded-lg p-5 border border-[#e8e0d0]">
              <div className="text-xs uppercase tracking-widest text-[#E8520A] font-semibold mb-2">Watcher</div>
              <p className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                The framework maps the complete governance pipeline from human operator intent to aligned output, identifying where governance fails (momentum) and how it recovers (triad). Corner Words are the foundation of Promptolinguistics Phase 2.
              </p>
            </div>
          </div>
        </section>

        {/* Token Zero Flow */}
        <section>
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Full Pipeline: Human Operator to Aligned Output
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            From pre-session intent through Token Zero, past the failure modes (session momentum overriding signal), through Corner Words anchoring, to The Blank — where the human defines the space and the machine serves the question. Self-governance runs parallel: the operator runs the protocol on themselves first.
          </p>
          <div className="bg-white rounded-lg p-4 border border-[#e8e0d0]">
            <img src={IMG.tokenZeroFlow} alt="Token Zero Governance Framework — Full Pipeline" className="w-full rounded" />
          </div>
          <p className="text-sm text-[#888] mt-2 text-center italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Origin as Credential: Real systems born from real needs (e.g., 5 AM connection), not institutional design.
          </p>
        </section>

        {/* The Shift */}
        <section>
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Shift: Prompt Optimization → Identity Alignment
          </h2>
          <div className="bg-white rounded-lg p-4 border border-[#e8e0d0]">
            <img src={IMG.shift} alt="Shift from Prompt Optimization to Identity Alignment" className="w-full rounded" />
          </div>
          <p className="text-base leading-relaxed mt-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            The left side crumbles: tinkering, parameter expansion, unlimited sliders. Fragile and local. The right side compounds: mission clarity, iterative constraint refinement, healthy experimentation. Durable and layered. The shift happens through mission clarity and behavior anchor.
          </p>
        </section>

        {/* Learning Flow */}
        <LearningFlow
          current="Dual Strategy"
          deeper={[
            { label: "User-Side Governance", href: "/user-governance", description: "The master overview — all governance from the user's perspective" },
            { label: "Promptolinguistics", href: "/promptolinguistics", description: "The language mechanics layer" },
          ]}
          wider={[
            { label: "Gallantry AI", href: "/gallantry-ai", description: "The deployed product — governance as capability" },
            { label: "ALCM", href: "/alcm", description: "The Atomic Language Control Model — 8 axes" },
            { label: "Framework Families", href: "/frameworks", description: "All framework families in the system" },
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
