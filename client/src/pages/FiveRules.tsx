/*
 * THE FIVE RULES — Simplest Entry Point
 * Design: Clean, bold, minimal. Adult and child versions side by side.
 * The leash. Earned, not invented.
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { useEffect } from "react";

const rules = [
  {
    number: 1,
    adult: "Safety first — nothing moves without it.",
    child: "Is it safe? If you're not sure, stop and ask a grown-up.",
    why: "Every interaction begins here. Before speed, before intelligence, before output — is it safe? If the answer is not clearly yes, nothing else matters.",
  },
  {
    number: 2,
    adult: "Honesty over confidence — clarity beats sounding right.",
    child: "Does it sound true? Or does it just sound smart?",
    why: "AI can sound confident about anything. Confidence is not evidence. The rule is simple: if it sounds right but you cannot verify it, treat it as unverified. Clarity over polish.",
  },
  {
    number: 3,
    adult: "Trust is earned — never assumed.",
    child: "Did the AI earn your trust? Or did you just give it away?",
    why: "Trust is built through consistent, verifiable behavior over time. A new session starts at zero. A new model starts at zero. Trust is not a setting — it is a result.",
  },
  {
    number: 4,
    adult: "Agency stays with the human — always.",
    child: "You're the boss. The AI helps. You decide.",
    why: "The human decides. The human corrects. The human owns the output. AI is a thinking partner, not a decision maker. If you feel the AI is leading and you are following, reverse it.",
  },
  {
    number: 5,
    adult: "Name drift. Correct it. Keep the loop open.",
    child: "If the AI starts going weird, say so. Don't just follow it.",
    why: "Drift is when the AI gradually moves away from your intent without you noticing. It is the most common failure mode. The fix is simple: notice it, name it, correct it. Keep the feedback loop open.",
  },
];

export default function FiveRules() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#FAF6EF]">
      <Nav />

      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <p className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            The Leash
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Five Rules
          </h1>
          <p className="text-lg text-[#555] max-w-xl mx-auto leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Earned, not invented. These showed up through frustration, failure, and noticing the same mistakes repeat. They are simple because they have to be.
          </p>
        </div>
      </section>

      {/* Rules */}
      <section className="pb-16 md:pb-24">
        <div className="container max-w-4xl mx-auto px-6 space-y-8">
          {rules.map((rule) => (
            <div key={rule.number} className="rounded-2xl border border-[#e8e0d0] bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* Rule number bar */}
              <div className="bg-[#1A1A2E] px-6 py-3 flex items-center gap-3">
                <span className="text-[#E8520A] font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {rule.number}
                </span>
                <div className="w-8 h-px bg-[#E8520A]/40" />
              </div>

              <div className="p-6 md:p-8">
                {/* Two columns: adult and child */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#888] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Adult Version
                    </p>
                    <p className="text-base font-semibold text-[#1A1A2E] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {rule.adult}
                    </p>
                  </div>
                  <div className="md:border-l md:border-[#e8e0d0] md:pl-6">
                    <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#888] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Child Version
                    </p>
                    <p className="text-base text-[#555] leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {rule.child}
                    </p>
                  </div>
                </div>

                {/* Why */}
                <div className="pt-4 border-t border-[#f0ebe0]">
                  <p className="text-sm text-[#777] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {rule.why}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Equation */}
      <section className="py-16 md:py-20 bg-[#1A1A2E]">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <p className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            The Equation
          </p>
          <p className="text-2xl md:text-3xl text-[#FAF6EF] font-light leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
            Safety + Honesty + Trust + Agency + Correction = <span className="text-[#E8520A] font-bold">Signal</span>
          </p>
          <p className="text-sm text-[#888] mt-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Remove any one and you get noise.
          </p>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-16 bg-[#FAF6EF]">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Promptolinguistics", path: "/promptolinguistics", desc: "The discipline" },
              { label: "Road Protocol", path: "/road-protocol", desc: "The vault" },
              { label: "Framework Families", path: "/frameworks", desc: "The tools" },
              { label: "Enter Your Lens", path: "/for/child", desc: "Start here" },
            ].map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="block p-5 rounded-xl border border-[#e8e0d0] bg-white text-center hover:border-[#E8520A]/50 hover:shadow-md transition-all no-underline group"
              >
                <div className="text-sm font-semibold text-[#1A1A2E] group-hover:text-[#E8520A] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {link.label} →
                </div>
                <div className="text-xs text-[#888] mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {link.desc}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
