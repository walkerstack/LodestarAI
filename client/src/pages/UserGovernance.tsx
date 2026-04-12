/*
 * USER-SIDE GOVERNANCE — Master Overview
 * The big picture: how everything connects from the user's perspective
 * All diagrams, all lenses, learning flow hub
 */

import { Link } from "wouter";
import Footer from "@/components/Footer";
import LearningFlow from "@/components/LearningFlow";

const IMG = {
  fieldGuide: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000005836_2f9cacc6.jpg",
  theCorner: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000005788_e810d861.jpg",
  tokenZeroFlow: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000005841_91ff30b1.jpg",
  govCapability: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000005556_a269fa9a.jpg",
  humanCentered: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000005848_4e6813d7.png",
};

const conceptMap = [
  { label: "The Five Rules", href: "/rules", desc: "Where everyone starts. The non-negotiable foundation." },
  { label: "Token Zero", href: "/gallantry-ai", desc: "Pre-session force profile. Set before the first word." },
  { label: "Flower Presets", href: "/flower-presets", desc: "Adjust the room. Safety, honesty, trust as dials." },
  { label: "Whelm Scale", href: "/whelm-scale", desc: "Monitor your cognitive load. Under, whelmed, over." },
  { label: "Variable Scale", href: "/variable-scale", desc: "The honesty dial. Three modulating forces." },
  { label: "ALCM", href: "/alcm", desc: "8 axes of language governance. The control model." },
  { label: "Road Protocol", href: "/road-protocol", desc: "The foundation under the children's content." },
  { label: "Corner Words", href: "/promptolinguistics", desc: "Collision over sequence. Anchoring constraints." },
  { label: "Correction Triad", href: "/dual-strategy", desc: "Fail → Catch → Fix. When momentum overrides signal." },
  { label: "Gallantry AI", href: "/gallantry-ai", desc: "The deployed product. Governance as capability." },
];

export default function UserGovernance() {
  return (
    <div className="min-h-screen bg-[#FAF6EF] text-[#2D2D2D]">
      {/* Hero */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-[#1A1A2E] to-[#2D2D2D]">
        <h1 className="text-4xl md:text-5xl font-bold text-[#E8520A] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          You Are the Governance Layer.
        </h1>
        <p className="text-lg text-[#FAF6EF]/80 max-w-2xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Everything in this system starts with you. Not the AI. Not the prompt. You. This is the map of how it all connects.
        </p>
        <p className="text-sm text-[#FAF6EF]/40 mt-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Let's learn and grow safely together.
        </p>
      </section>

      <div className="container max-w-4xl py-12 space-y-16">

        {/* The Map */}
        <section>
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Learning Map
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Every concept connects. Start anywhere. Each one leads to the next. The flow is not a line — it's a web. Here's every piece and where it lives.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {conceptMap.map((c) => (
              <Link key={c.label} href={c.href} className="no-underline">
                <div className="bg-white rounded-lg p-3 border border-[#e8e0d0] hover:border-[#E8520A] hover:shadow-md transition-all h-full">
                  <div className="text-xs font-bold text-[#E8520A] mb-1">{c.label}</div>
                  <p className="text-[10px] text-[#888] leading-tight">{c.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Token Zero — Field Guide */}
        <section>
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Token Zero: Where Governance Begins
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Session behavior is set before generation. The locus of control is the human, not the prompt. You preset the room — Safety, Honesty, Trust as operational inputs. You self-run Token Zero. The AI follows.
          </p>
          <div className="bg-white rounded-lg p-4 border border-[#e8e0d0]">
            <img src={IMG.fieldGuide} alt="Field Guide: Token Zero & Human Governance in AI" className="w-full rounded" />
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-lg p-5 border border-[#e8e0d0]">
              <div className="text-xs uppercase tracking-widest text-[#E8520A] font-semibold mb-2">Everyday</div>
              <p className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Before you type anything, take a breath and decide: what do I need from this session? That decision — not the prompt — is what shapes the output.
              </p>
            </div>
            <div className="bg-white rounded-lg p-5 border border-[#e8e0d0]">
              <div className="text-xs uppercase tracking-widest text-[#E8520A] font-semibold mb-2">Professional</div>
              <p className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Token Zero is the pre-output force profile. Governance locus is human over prompt. Preset the room → Self-run Token Zero → Safety, Honesty, Trust as behavioral inputs.
              </p>
            </div>
            <div className="bg-white rounded-lg p-5 border border-[#e8e0d0]">
              <div className="text-xs uppercase tracking-widest text-[#E8520A] font-semibold mb-2">Watcher</div>
              <p className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                The field guide maps the complete governance topology: from pre-session posture through failure modes to dual artifact architecture. Origin as credential — built from need, not theory.
              </p>
            </div>
          </div>
        </section>

        {/* The Corner */}
        <section>
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Corner: Where Safety, Honesty & Trust Collide
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            The machine's answer is a fixed wall. Your question is a dynamic, evolving force. Where they meet is The Corner — the point of collision, creative friction. Safety is the stable pressure point that stops drift. Honesty is the transparent interface between machine limitations and human intent. Trust is the catalyst that moves you from this answer to the next, deeper question. Gallantry AI's role: facilitating the next question.
          </p>
          <div className="bg-white rounded-lg p-4 border border-[#e8e0d0]">
            <img src={IMG.theCorner} alt="The Corner: Safety, Honesty & Trust in Human-AI Collision" className="w-full rounded" />
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-lg p-5 border border-[#e8e0d0]">
              <div className="text-xs uppercase tracking-widest text-[#E8520A] font-semibold mb-2">Everyday</div>
              <p className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                The AI gives you an answer. That's a wall. Your question hits it. What happens at that collision point matters: are you safe? Is it honest? Can you trust it enough to ask the next question?
              </p>
            </div>
            <div className="bg-white rounded-lg p-5 border border-[#e8e0d0]">
              <div className="text-xs uppercase tracking-widest text-[#E8520A] font-semibold mb-2">Professional</div>
              <p className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Safety provides the stable pressure point. Honesty creates the transparent interface. Trust catalyzes deeper exploration. The Corner is where governance becomes generative, not restrictive.
              </p>
            </div>
            <div className="bg-white rounded-lg p-5 border border-[#e8e0d0]">
              <div className="text-xs uppercase tracking-widest text-[#E8520A] font-semibold mb-2">Watcher</div>
              <p className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                The Corner reframes AI interaction from answer-extraction to inquiry-facilitation. The machine serves the question. The human defines the blank. Governance lives at the collision point.
              </p>
            </div>
          </div>
        </section>

        {/* Failure Mechanics */}
        <section>
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            When It Fails: Session Momentum vs. Signal
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            AI falls into its own current. It stops reading the actual signal and rides its own momentum. The root cause is misplaced governance — in the prompt, not in the human's pre-session posture. The Correction Triad: Failure (identify live) → Catch (capture) → Fix (implement). Self-governance runs parallel — the operator runs the protocol on themselves.
          </p>
          <div className="bg-white rounded-lg p-4 border border-[#e8e0d0]">
            <img src={IMG.tokenZeroFlow} alt="Token Zero Governance Framework — Full Pipeline" className="w-full rounded" />
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-lg p-5 border border-[#e8e0d0]">
              <div className="text-xs uppercase tracking-widest text-[#E8520A] font-semibold mb-2">Everyday</div>
              <p className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Sometimes the AI stops listening and starts repeating itself. That's momentum. When you notice it, you've caught it. Now you fix it — reset, redirect, or start fresh.
              </p>
            </div>
            <div className="bg-white rounded-lg p-5 border border-[#e8e0d0]">
              <div className="text-xs uppercase tracking-widest text-[#E8520A] font-semibold mb-2">Professional</div>
              <p className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Session momentum is a failure mode where the AI's internal current overrides the human's actual signal. The Correction Triad provides a systematic recovery path. Drift detection is a governance skill.
              </p>
            </div>
            <div className="bg-white rounded-lg p-5 border border-[#e8e0d0]">
              <div className="text-xs uppercase tracking-widest text-[#E8520A] font-semibold mb-2">Watcher</div>
              <p className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                The full pipeline from Human Operator through Token Zero to AI Output maps every governance checkpoint. The Blank (user autonomy) is the terminal node — human defines the space, machine serves the question.
              </p>
            </div>
          </div>
        </section>

        {/* Governance as Capability */}
        <section>
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Governance as Capability
          </h2>
          <div className="bg-white rounded-lg p-4 border border-[#e8e0d0]">
            <img src={IMG.govCapability} alt="Governance as Capability — 6-gear system" className="w-full rounded" />
          </div>
          <p className="text-base leading-relaxed mt-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Structure, Language, Cognition, Emotion, Tokens, Identity — six gears that convert constraint into capability. The ethos: structured courage and disciplined execution. Constraint is not limitation. It is power.
          </p>
          <div className="mt-4 text-center">
            <Link href="/gallantry-ai" className="inline-block bg-[#E8520A] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-[#d04a09] transition-colors no-underline">
              Explore Gallantry AI →
            </Link>
          </div>
        </section>

        {/* Human-Centered Framework */}
        <section>
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Complete Framework
          </h2>
          <div className="bg-white rounded-lg p-4 border border-[#e8e0d0]">
            <img src={IMG.humanCentered} alt="Human-Centered AI Governance — Token Zero & Corner Words" className="w-full rounded" />
          </div>
          <p className="text-base leading-relaxed mt-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Token Zero, Failure Mechanics, Corner Words — the three pillars of human-centered AI governance. The dual strategy at the bottom: Galentry (meta layer for researchers) and Gallantry AI (deployed product for users). Same foundation. Different doors.
          </p>
          <div className="mt-4 text-center">
            <Link href="/dual-strategy" className="inline-block bg-[#1A1A2E] text-[#E8520A] px-6 py-2 rounded-lg text-sm font-semibold hover:bg-[#2D2D2D] transition-colors no-underline">
              See the Dual Strategy →
            </Link>
          </div>
        </section>

        {/* Closing */}
        <section className="bg-[#1A1A2E] rounded-xl p-8 text-[#FAF6EF] text-center">
          <p className="text-xl font-bold text-[#E8520A] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Let's learn and grow safely together.
          </p>
          <p className="text-sm opacity-60" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Safety, Honesty, and Truth are not features. They are the foundation.
          </p>
          <p className="text-sm opacity-60 mt-2 italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            — The Builder
          </p>
        </section>

        {/* Learning Flow */}
        <LearningFlow
          current="User-Side Governance"
          deeper={[
            { label: "Promptolinguistics", href: "/promptolinguistics", description: "The language mechanics layer — how words govern AI behavior" },
            { label: "ALCM", href: "/alcm", description: "The Atomic Language Control Model — 8 axes of governance" },
          ]}
          wider={[
            { label: "Gallantry AI", href: "/gallantry-ai", description: "The deployed product — governance as capability" },
            { label: "Dual Strategy", href: "/dual-strategy", description: "Galentry vs. Gallantry AI — two doors, one foundation" },
            { label: "Variable Scale Theory", href: "/variable-scale", description: "The honesty dial — modulating forces" },
          ]}
          simpler={[
            { label: "The Five Rules", href: "/rules", description: "Start here — the five rules that govern everything" },
            { label: "Road Protocol", href: "/road-protocol", description: "The foundation layer under all of it" },
            { label: "Whelm Scale", href: "/whelm-scale", description: "Monitor your cognitive load" },
          ]}
        />
      </div>

      <Footer />
    </div>
  );
}
