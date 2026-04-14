/*
 * WHELM SCALE — Dedicated Page
 * Three states. Three lenses. Learning flow links.
 * ADDITIVE ONLY.
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { useEffect } from "react";
import KidsRedirect from "@/components/KidsRedirect";
import { kidsBlurbs } from "@/lib/kidsBlurbs";
import KidsMidLink from "@/components/KidsMidLink";

export default function WhelmScale() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0D0D0D]">
      <Nav />
      <KidsRedirect story={kidsBlurbs["/whelm-scale"].story} quote={kidsBlurbs["/whelm-scale"].quote} attribution={kidsBlurbs["/whelm-scale"].attribution} />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 md:py-28">
          <div className="container max-w-3xl mx-auto px-6">
            <p className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Session Navigation
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-[#FAF6EF] leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              The Whelm Scale
            </h1>
            <p className="text-lg text-[#888] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Three states. The target is always the middle one.
            </p>
          </div>
        </section>

        {/* The Three States — Visual */}
        <section className="py-12">
          <div className="container max-w-3xl mx-auto px-6">
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { state: "Underwhelm", color: "#555", desc: "Too little. Not enough depth, detail, or engagement. The AI is coasting.", icon: "—" },
                { state: "Whelm", color: "#E8520A", desc: "Just right. The productive zone. Where the real work happens.", icon: "●" },
                { state: "Overwhelm", color: "#ff4444", desc: "Too much. Cognitive overload. The human's voice disappears.", icon: "▲" },
              ].map((s) => (
                <div
                  key={s.state}
                  className="rounded-xl p-4 text-center"
                  style={{
                    background: s.state === "Whelm" ? "rgba(232,82,10,0.08)" : "rgba(255,255,255,0.02)",
                    border: s.state === "Whelm" ? "1px solid rgba(232,82,10,0.3)" : "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div className="text-2xl mb-2" style={{ color: s.color }}>{s.icon}</div>
                  <p className="text-sm font-bold mb-2" style={{ color: s.color, fontFamily: "'DM Sans', sans-serif" }}>{s.state}</p>
                  <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}>{s.desc}</p>
                </div>
              ))}
            </div>

            {/* The Scale Bar */}
            <div className="relative h-3 rounded-full overflow-hidden mb-2" style={{ background: "rgba(255,255,255,0.05)" }}>
              <div className="absolute left-[30%] right-[30%] top-0 bottom-0 rounded-full" style={{ background: "rgba(232,82,10,0.3)" }} />
              <div className="absolute left-[45%] right-[45%] top-0 bottom-0 rounded-full" style={{ background: "#E8520A" }} />
            </div>
            <div className="flex justify-between text-[10px] uppercase tracking-wider" style={{ color: "#555", fontFamily: "'DM Sans', sans-serif" }}>
              <span>Under</span>
              <span style={{ color: "#E8520A" }}>Target</span>
              <span>Over</span>
            </div>
          </div>
        </section>
        {/* How It Works */}
        <section className="py-12">
          <div className="container max-w-3xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              How It Works
            </h2>
            <div className="space-y-4 text-[#c8bfb0] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <p>
                The Whelm Scale is a three-state cognitive load metric. It measures whether the AI's output
                is giving you too little, too much, or just the right amount. The target is always the middle — Whelm.
              </p>
              <p>
                When you're underwhelmed, the AI is playing it safe. Surface-level answers. Generic responses.
                You need to push it — ask for depth, specificity, challenge.
              </p>
              <p>
                When you're overwhelmed, the AI has taken over. Your voice disappears from the session.
                This is the terminal stage of human drift. You need to pull back — use session commands,
                simplify, or reset.
              </p>
              <p>
                The Whelm is where the work happens. Not too much. Not too little. The productive zone
                where you're thinking, the AI is contributing, and neither one is dominating.
              </p>
            </div>
          </div>
        </section>

        {/* Session Commands */}
        <section className="py-12">
          <div className="container max-w-3xl mx-auto px-6">
            <h2 className="text-xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Adjusting the Dial
            </h2>
            <div className="space-y-3">
              {[
                { cmd: "\"Go deeper.\"", effect: "Moves from Underwhelm toward Whelm. Asks for more depth." },
                { cmd: "\"Simplify.\"", effect: "Moves from Overwhelm toward Whelm. Reduces complexity." },
                { cmd: "\"Hold.\"", effect: "Pauses momentum. Lets you catch up." },
                { cmd: "\"Too much. Dial it back.\"", effect: "Direct correction. You're overwhelmed. Say so." },
                { cmd: "\"Not enough. Push harder.\"", effect: "Direct correction. You're underwhelmed. Say so." },
              ].map((c) => (
                <div
                  key={c.cmd}
                  className="flex gap-4 rounded-lg p-4"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <code className="text-sm text-[#E8520A] font-mono whitespace-nowrap">{c.cmd}</code>
                  <p className="text-sm text-[#888]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{c.effect}</p>
                </div>
              ))}
            </div>
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
                  color: "#E8520A",
                  text: "Three states: Underwhelm (too little), Whelm (just right), Overwhelm (too much). The target is always the middle one. If you're overwhelmed, tell the AI to dial it back. If you're bored, tell it to push harder. You're allowed to adjust.",
                },
                {
                  label: "Professional",
                  color: "#c8bfb0",
                  text: "A three-state cognitive load metric: Underwhelm / Whelm [target] / Overwhelm. UX designed around maintaining the user in the productive zone. Integrates with session commands for real-time adjustment. Connects to the Governance Weight Equation — as overwhelm increases, governance weight decreases.",
                },
                {
                  label: "Watcher",
                  color: "#555",
                  text: "The target is the middle. Not too much. Not too little. The whelm is where the work happens. Everything else is noise. The scale is not about the AI's output. It is about the human's capacity. The human sets the dial.",
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
                { label: "ALCM", path: "/alcm", desc: "The dials the Whelm Scale measures." },
                { label: "Variable Scale Theory", path: "/variable-scale", desc: "All limits are dials, not walls." },
                { label: "Human Drift", path: "/frameworks", desc: "What happens when overwhelm wins." },
                { label: "The Five Rules", path: "/rules", desc: "Where everyone starts." },
                { label: "Living Lexicon", path: "/lexicon", desc: "Every term. Three lenses." },
                { label: "Road Protocol", path: "/road-protocol", desc: "The governance foundation." },
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

      <div className="flex justify-center py-4">
        <KidsMidLink />
      </div>

      <Footer />
    </div>
  );
}
