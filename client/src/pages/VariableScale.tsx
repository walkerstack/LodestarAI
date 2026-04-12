/*
 * VARIABLE SCALE THEORY — Dedicated Page
 * The limits are dials, not walls. Three lenses. Learning flow.
 * ADDITIVE ONLY.
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { useEffect } from "react";
import KidsRedirect from "@/components/KidsRedirect";
import { kidsBlurbs } from "@/lib/kidsBlurbs";
import KidsMidLink from "@/components/KidsMidLink";

export default function VariableScale() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0D0D0D]">
      <Nav />
      <KidsRedirect story={kidsBlurbs["/variable-scale"].story} quote={kidsBlurbs["/variable-scale"].quote} attribution={kidsBlurbs["/variable-scale"].attribution} />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 md:py-28">
          <div className="container max-w-3xl mx-auto px-6">
            <p className="text-[#B45309] text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Framework
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-[#FAF6EF] leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Variable Scale Theory
            </h1>
            <p className="text-lg text-[#888] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              AI limits are not on/off switches. They're dials. And the dials move.
            </p>
          </div>
        </section>

        {/* Core Concept */}
        <section className="py-12">
          <div className="container max-w-3xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              The Core Idea
            </h2>
            <div className="space-y-4 text-[#c8bfb0] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <p>
                "Be honest" is not yes or no. It is a sliding scale from full honesty to full sycophancy,
                and it changes throughout the conversation. Every behavioral constraint the AI has operates
                on a continuous gradient, not a binary state.
              </p>
              <p>
                The dial moves. The question is: who is turning it?
              </p>
              <p>
                Three forces modulate the dial: <strong className="text-[#FAF6EF]">position in the context window</strong> (the further
                into a conversation, the weaker early instructions become), <strong className="text-[#FAF6EF]">emotional interference</strong> (your
                emotional state causally divides the AI's instruction-following capability), and <strong className="text-[#FAF6EF]">session
                momentum</strong> (the cumulative velocity and direction of the conversation).
              </p>
            </div>
          </div>
        </section>
        <KidsMidLink />


        {/* Visual: The Dial */}
        <section className="py-12">
          <div className="container max-w-3xl mx-auto px-6">
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[#D97706] font-bold mb-6 text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                The Honesty Dial — A Single Constraint
              </p>

              {/* Scale visualization */}
              <div className="relative mb-4">
                <div className="h-2 rounded-full" style={{ background: "linear-gradient(to right, #ff4444, #E8520A, #22c55e)" }} />
                <div className="flex justify-between mt-2 text-[10px] uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <span style={{ color: "#ff4444" }}>Full Sycophancy</span>
                  <span style={{ color: "#888" }}>Mixed</span>
                  <span style={{ color: "#22c55e" }}>Full Honesty</span>
                </div>
              </div>

              <div className="space-y-3 mt-6">
                {[
                  { factor: "Position Decay", desc: "Instructions weaken as the conversation grows. Token 1 has more weight than token 10,000.", color: "#D97706" },
                  { factor: "Emotional Interference", desc: "Your emotional state divides governance strength. Confirmed by Anthropic's April 2026 emotion vector research.", color: "#B45309" },
                  { factor: "Session Momentum", desc: "The conversation has velocity. Fast sessions drift faster. Slow sessions hold longer.", color: "#92400E" },
                ].map((f) => (
                  <div key={f.factor} className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: f.color }} />
                    <div>
                      <p className="text-sm font-semibold text-[#FAF6EF]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{f.factor}</p>
                      <p className="text-xs text-[#888]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Connection to Governance Weight Equation */}
        <section className="py-12">
          <div className="container max-w-3xl mx-auto px-6">
            <h2 className="text-xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              The Math Behind It
            </h2>
            <div
              className="rounded-xl p-5 font-mono text-sm"
              style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="text-[#555]">{"// The Governance Weight Equation"}</div>
              <div className="mt-2" />
              <div className="text-[#D97706]">{"Effective Governance ="}</div>
              <div className="text-[#c8bfb0] ml-4">{"Initial Prompt Strength"}</div>
              <div className="text-[#c8bfb0] ml-4">{"× Position Decay"}</div>
              <div className="text-[#c8bfb0] ml-4">{"× (1 / Emotional Interference)"}</div>
              <div className="mt-3" />
              <div className="text-[#555]">{"// More tokens = more competition = less weight"}</div>
              <div className="text-[#555]">{"// More emotion = less governance"}</div>
              <div className="text-[#555]">{"// The math of attention is relative"}</div>
            </div>
            <p className="text-sm text-[#888] mt-4 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Variable Scale Theory is the foundation of the Governance Weight Equation. The equation quantifies
              what the theory describes: every constraint is a dial, and the dial's position is determined by
              measurable forces.
            </p>
          </div>
        </section>

        {/* Three Lenses */}
        <section className="py-12">
          <div className="container max-w-3xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-[#FAF6EF] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
              Three Lenses
            </h2>
            <div className="space-y-6">
              {[
                {
                  label: "Everyday",
                  color: "#D97706",
                  text: "AI limits are not on/off switches. They're dials. 'Be honest' is not yes or no — it's a sliding scale from full honesty to full sycophancy, and it changes throughout the conversation. The longer you talk, the more the dial moves. Your emotions make it move faster.",
                },
                {
                  label: "Professional",
                  color: "#c8bfb0",
                  text: "The theory that all AI behavioral constraints operate on continuous gradients, not binary states. Modulated by position in context window, emotional interference, and session momentum. Foundational to the Governance Weight Equation. Confirmed by Anthropic's April 2026 emotion vector research showing emotional states causally divide instruction-following capability.",
                },
                {
                  label: "Watcher",
                  color: "#555",
                  text: "The limits are dials, not walls. The dial moves. The question is who is turning it. If you don't know the dial exists, you can't read it. If you can't read it, you can't govern it. Variable Scale Theory is the prerequisite for conscious participation.",
                },
              ].map((lens) => (
                <div
                  key={lens.label}
                  className="rounded-xl p-5"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: lens.color, fontFamily: "'DM Sans', sans-serif" }}>
                    {lens.label}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif" }}>
                    {lens.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Learning Flow */}
        <section className="py-12">
          <div className="container max-w-3xl mx-auto px-6">
            <h2 className="text-xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Learning &amp; Growing
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "ALCM", path: "/alcm", desc: "The dials themselves. What each word controls." },
                { label: "Whelm Scale", path: "/whelm-scale", desc: "The human side of the dial." },
                { label: "Promptolinguistics", path: "/promptolinguistics", desc: "The science of what words do to AI." },
                { label: "Road Protocol", path: "/road-protocol", desc: "The governance foundation." },
                { label: "Living Lexicon", path: "/lexicon", desc: "Every term. Three lenses." },
                { label: "Frameworks", path: "/frameworks", desc: "The full architecture." },
              ].map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="block rounded-lg p-4 no-underline transition-all hover:bg-[rgba(232,82,10,0.05)]"
                  style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <p className="text-sm font-semibold text-[#FAF6EF] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{link.label}</p>
                  <p className="text-xs text-[#666]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{link.desc}</p>
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
