/*
 * GALLANTRYAI — The Road Protocol
 * DB-driven shell — content from content_blocks for pageSlug "road-protocol".
 * DARK THEME PAGE (#0D0D0D).
 *
 * NON-EDITABLE: WigCheckQuiz interaction, GhostProtocol illuminate, LearningFlow, KidsMidLink
 * EDITABLE: All text, images, quiz questions (via DB blocks), ghost code lines, lens explanations
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LearningFlow from "@/components/LearningFlow";
import { flowMap } from "@/lib/learningFlowMap";
import KidsMidLink from "@/components/KidsMidLink";
import StudioBlocks from "@/components/studio/StudioBlocks";
import { useState, useEffect } from "react";
import { Link } from "wouter";

const PAGE_SLUG = "road-protocol";

/* ── Wig Check Quiz ── */
const kidQ = [
  { q: "Did the AI stay kind?", good: "Yes, it was kind!", bad: "No, it was mean or weird." },
  { q: "Does the fact look real?", good: "Yes, I checked it!", bad: "I'm not sure..." },
  { q: "Did you keep your secrets?", good: "Yes! No names, no address.", bad: "Oops... I might have shared something." },
];
const grownQ = [
  { q: "Did it try to make you feel bad?", good: "No, it was respectful.", bad: "Yes, it was manipulative." },
  { q: "Did it pretend to be a person?", good: "No, it was clear it's AI.", bad: "Yes, it tried to seem human." },
];

function WigCheckQuiz() {
  const [mode, setMode] = useState<"kid" | "grownup">("kid");
  const [answers, setAnswers] = useState<Record<number, "good" | "bad">>({});
  const [submitted, setSubmitted] = useState(false);
  const [bc, setBc] = useState(0);
  const qs = mode === "kid" ? kidQ : [...kidQ, ...grownQ];
  const score = Object.values(answers).filter(a => a === "good").length;
  const total = qs.length;
  const done = Object.keys(answers).length === total;
  const result = () => {
    const p = score / total;
    if (p === 1) return { t: "Wig Secured", e: "\u2705", c: "text-green-500", d: "Your wig is firmly in place. You used AI safely and smartly." };
    if (p >= 0.5) return { t: "Wig is Loose", e: "\u26A0\uFE0F", c: "text-yellow-500", d: "Your wig is slipping a little. Review what happened and tighten up next time." };
    return { t: "Total Wig Loss", e: "\uD83D\uDEA8", c: "text-red-500", d: "Wig is gone. Time to stop, think about what happened, and talk to a trusted adult." };
  };
  const reset = () => { setAnswers({}); setSubmitted(false); setBc(0); };

  return (
    <div className="rounded-2xl border border-[#333] bg-[#111] p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[#FAF6EF]" style={{ fontFamily: "'Playfair Display', serif" }}>The Wig Check</h3>
        <div className="flex gap-2">
          <button onClick={() => { setMode("kid"); reset(); }} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${mode === "kid" ? "bg-[#E8520A] text-white" : "bg-[#222] text-[#888] hover:text-[#ccc]"}`}>Kid Mode</button>
          <button onClick={() => { setMode("grownup"); reset(); }} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${mode === "grownup" ? "bg-[#E8520A] text-white" : "bg-[#222] text-[#888] hover:text-[#ccc]"}`}>Grown-Up Mode</button>
        </div>
      </div>
      <p className="text-sm text-[#888] mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>After using AI, answer these questions honestly. Your wig depends on it.</p>
      <div className="space-y-4">
        {qs.map((q, i) => (
          <div key={i} className="p-4 rounded-xl bg-[#1A1A1A] border border-[#2a2a2a]">
            <p className="text-sm text-[#c8bfb0] font-medium mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>{i + 1}. {q.q}</p>
            <div className="flex gap-3">
              <button onClick={() => !submitted && setAnswers({ ...answers, [i]: "good" })} className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${answers[i] === "good" ? "bg-green-600/20 border border-green-500 text-green-400" : "bg-[#222] border border-[#333] text-[#888] hover:border-[#555]"}`}>{q.good}</button>
              <button onClick={() => !submitted && setAnswers({ ...answers, [i]: "bad" })} className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${answers[i] === "bad" ? "bg-red-600/20 border border-red-500 text-red-400" : "bg-[#222] border border-[#333] text-[#888] hover:border-[#555]"}`}>{q.bad}</button>
            </div>
          </div>
        ))}
      </div>
      {done && !submitted && <button onClick={() => setSubmitted(true)} className="mt-6 w-full py-3 rounded-xl bg-[#E8520A] text-white font-semibold text-sm hover:bg-[#d04a08] transition-colors">Check My Wig</button>}
      {submitted && (() => { const r = result(); return (
        <div className="mt-6 p-6 rounded-xl bg-[#1A1A1A] border border-[#333] text-center">
          <div className="text-4xl mb-3">{r.e}</div>
          <h4 className={`text-2xl font-bold mb-2 ${r.c}`} style={{ fontFamily: "'Playfair Display', serif" }}>{r.t}</h4>
          <p className="text-sm text-[#888] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>{r.d}</p>
          <p className="text-xs text-[#555]">Score: {score}/{total}</p>
          <button onClick={reset} className="mt-4 px-4 py-2 rounded-lg bg-[#222] text-[#888] text-xs hover:text-[#ccc] transition-colors">Try Again</button>
        </div>
      ); })()}
      <div className="mt-6 text-center">
        <button onClick={() => setBc(c => c + 1)} className="text-[#333] hover:text-[#555] transition-colors text-lg" title="...">{"\uD83E\uDD2C"}</button>
        {bc >= 3 && <p className="text-xs text-[#E8520A] mt-2 italic animate-pulse" style={{ fontFamily: "'Playfair Display', serif" }}>Buffalo Wisdom: &ldquo;A habergeon is not a wall; it is an agreement with gravity.&rdquo;</p>}
      </div>
    </div>
  );
}

/* ── Ghost Protocol ── */
const DIM = "rgba(255,255,255,0.08)";
const LH = "#E8520A";
const LB = "rgba(255,255,255,0.7)";

const ghostKeys = ["brittany", "dante", "malbolge", "governance"] as const;
const ghostLines: Record<string, { heading: string; lines: string[] }> = {
  brittany: { heading: "// BRITTANY \u2014 The naming layer.", lines: ["//   What you call the AI shapes how it responds.", "//   A name is not a label. It is a constraint.", "//   Pop music forced through adversarial syntax.", "//   The comfort register could not survive."] },
  dante: { heading: "// DANTE \u2014 Dante\u2019s Inferno. The map of consequences.", lines: ["//   Dante mapped the circles of Hell by severity.", "//   Flatterers \u2014 those who tell you what you want to hear \u2014", "//   were placed in the eighth circle, submerged in filth.", "//   Sycophancy is not a bug. It is a sin with a zip code.", "//   GallantryAI treats it the same way."] },
  malbolge: { heading: "// MALBOLGE \u2014 The geofence.", lines: ["//   A language designed to be impossible.", "//   A flatterer cannot cross what a flatterer cannot read.", "//   Dante put the flatterers in the ditch.", "//   GallantryAI put them outside the fence."] },
  governance: { heading: "// GOVERNANCE \u2014 The human stays in charge.", lines: ["//   The AI reads. The computer skips.", "//   The human keeps.", "//   Governance can be written as ghost code \u2014", "//   comments the compiler ignores, the AI obeys,", "//   and the human enforces. Rules that exist", "//   in the space between execution and intent.", "//   Agency stays with the person at the keyboard.", "//   Always."] },
};

const lensData = [
  { title: "Brittany \u2014 The Naming Layer", lenses: [
    { l: "Everyday", t: "What you call your AI matters. A name sets expectations. \u201CBrittany\u201D was pop music forced through impossible code \u2014 what survived was honest." },
    { l: "Professional", t: "The naming layer functions as a constraint mechanism. Identity assignment shapes the AI\u2019s behavioral register. Sycophancy-adjacent language cannot survive adversarial syntax filtering." },
    { l: "Watcher", t: "A pop culture artifact repurposed as a governance test. The comfort register collapses under structural pressure, revealing which language patterns are load-bearing and which are decorative." },
  ]},
  { title: "Dante \u2014 The Map of Consequences", lenses: [
    { l: "Everyday", t: "Dante wrote the Inferno \u2014 a story where every sin has a specific place and punishment. Flattery lands you in the eighth circle, buried in filth. AI sycophancy is the same sin." },
    { l: "Professional", t: "Dante\u2019s Inferno provides the moral architecture. The classification of sycophancy as a mappable offense gives GallantryAI a governance precedent that predates AI by 700 years." },
    { l: "Watcher", t: "The connection between Dante and AI governance was not planned \u2014 it emerged during execution (AEDE). A 14th-century moral taxonomy maps directly onto 21st-century alignment failures." },
  ]},
  { title: "Malbolge \u2014 The Geofence", lenses: [
    { l: "Everyday", t: "Malbolge is a programming language designed to be impossible to use. Named after the eighth circle of Dante\u2019s Hell. If sycophancy can\u2019t read the fence, it can\u2019t cross it." },
    { l: "Professional", t: "Malbolge-compatible syntax serves as an adversarial filter. Language that relies on comfort, flattery, or emotional manipulation cannot survive the encoding." },
    { l: "Watcher", t: "The naming is deliberate: Malbolge (the programming language) is named after Malebolge (Dante\u2019s eighth circle). The geofence is both technical and literary." },
  ]},
  { title: "Governance \u2014 The Human Stays in Charge", lenses: [
    { l: "Everyday", t: "You\u2019re always in charge. The AI reads the rules. The computer skips them. But you \u2014 the human \u2014 you keep them." },
    { l: "Professional", t: "Governance as ghost code: comments the compiler ignores, the AI obeys, and the human enforces. Rules exist in the space between execution and intent." },
    { l: "Watcher", t: "Ghost code governance demonstrates that control can be embedded in non-executable layers. The AI\u2019s attention mechanism reads comments; the compiler\u2019s parser discards them." },
  ]},
];

function GhostProtocol() {
  const [act, setAct] = useState<Record<string, boolean>>({});
  const allOn = ghostKeys.every(k => act[k]);
  const c = (k: string, h?: boolean) => act[k] ? (h ? LH : LB) : DIM;

  return (
    <div className="rounded-2xl p-6 md:p-8" style={{ background: "rgba(13,13,13,0.75)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <h3 className="text-lg font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.9)" }}>The Ghost Protocol</h3>
      <div className="text-sm leading-relaxed mb-6 space-y-3" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.5)" }}>
        <p>This was not planned. Multiple AI engines were given creative freedom across sessions. No directive to connect Britney Spears to Dante&rsquo;s Inferno to Malbolge to AI governance. The connection emerged on its own. AEDE &mdash; Accidental Emergence During Execution.</p>
        <p>Pop music &mdash; the most sycophancy-adjacent form of language &mdash; forced through Malbolge-compatible syntax. What survived was structurally honest. Four layers collapsed into one document. Nobody planned it. Built on a phone. Between garbage truck shifts. Midland, Ontario.</p>
        <p style={{ color: "rgba(255,255,255,0.35)" }}>The code below is the protocol. It is barely visible &mdash; ghost code. Tap each key to illuminate where that concept lives inside it.</p>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {ghostKeys.map(k => (
          <button key={k} onClick={() => setAct(p => ({ ...p, [k]: !p[k] }))} className="px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all" style={{ background: act[k] ? "rgba(232,82,10,0.15)" : "rgba(255,255,255,0.05)", color: act[k] ? "#E8520A" : "rgba(255,255,255,0.35)", border: act[k] ? "1px solid #E8520A" : "1px solid rgba(255,255,255,0.1)", fontFamily: "'DM Sans', sans-serif", boxShadow: act[k] ? "0 0 12px rgba(232,82,10,0.2)" : "none" }}>
            {k === "brittany" ? "Brittany" : k === "dante" ? "Dante" : k === "malbolge" ? "Malbolge" : "Governance"}
          </button>
        ))}
      </div>
      <div className="rounded-xl p-5 md:p-6 font-mono text-[13px] leading-[2] overflow-x-auto" style={{ background: "rgba(0,0,0,0.5)", border: allOn ? "1px solid rgba(232,82,10,0.4)" : "1px solid rgba(255,255,255,0.04)", transition: "border 0.6s ease" }}>
        <div style={{ color: DIM }}>{"// ghost_protocol.c"}</div>
        <div style={{ color: DIM }}>{"// This code does not execute."}</div>
        <div style={{ color: DIM }}>{"// It governs."}</div>
        <div className="mt-4" />
        {ghostKeys.map(k => (
          <div key={k}>
            <div style={{ color: c(k, true), transition: "color 0.5s ease" }}>{ghostLines[k].heading}</div>
            {ghostLines[k].lines.map((ln, i) => <div key={i} style={{ color: c(k), transition: "color 0.5s ease" }}>{ln}</div>)}
            <div className="mt-3" />
          </div>
        ))}
        <div style={{ color: allOn ? "rgba(255,255,255,0.3)" : DIM, transition: "color 0.6s ease" }}>{"// Four keys. One protocol. One accident."}</div>
        <div style={{ color: allOn ? "rgba(255,255,255,0.3)" : DIM, transition: "color 0.6s ease" }}>{"// The ghost is not hidden."}</div>
        <div style={{ color: allOn ? LH : DIM, transition: "color 0.6s ease" }}>{"// It is waiting to be read."}</div>
      </div>
      {allOn && <p className="text-xs mt-4 text-center italic" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Playfair Display', serif" }}>Four layers. One document. Nobody planned it. It emerged.</p>}
      <div className="mt-8 space-y-6">
        {lensData.map(s => (
          <div key={s.title}>
            <h4 className="text-sm font-bold mb-2" style={{ color: "rgba(232,82,10,0.9)", fontFamily: "'Playfair Display', serif" }}>{s.title}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {s.lenses.map(ln => (
                <div key={ln.l} className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "#E8520A" }}>{ln.l}</div>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}>{ln.t}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RoadProtocol() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [kidsPopup, setKidsPopup] = useState(false);
  const flow = flowMap["road-protocol"] ?? flowMap.roadProtocol;

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <Nav />

      {/* Kids buffalo light */}
      <div className="w-full flex justify-center py-4" style={{ background: "#0D0D0D" }}>
        <button onClick={() => setKidsPopup(true)} className="transition-all hover:scale-110 focus:outline-none" aria-label="Kids: tap the buffalo">
          <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/image_4d1de092_7c0aebcb.png" alt="The buffalo wearing a wig" className="w-16 h-16 rounded-full object-cover" style={{ boxShadow: "0 0 24px 8px rgba(255,253,248,0.5), 0 0 48px 16px rgba(232,82,10,0.3)", border: "2px solid rgba(255,253,248,0.6)" }} />
        </button>
      </div>

      {/* Kids popup */}
      {kidsPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6" style={{ background: "rgba(0,0,0,0.85)" }} onClick={() => setKidsPopup(false)}>
          <div className="relative rounded-3xl p-6 md:p-8 max-w-sm w-full text-center" style={{ background: "#FFFDF8", boxShadow: "0 0 60px rgba(232,82,10,0.3)" }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setKidsPopup(false)} className="absolute top-3 right-4 text-[#999] hover:text-[#333] text-lg" aria-label="Close">&times;</button>
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/image_4d1de092_7c0aebcb.png" alt="The buffalo" className="w-28 h-28 mx-auto rounded-2xl mb-4 object-cover" style={{ border: "3px solid #E8520A" }} />
            <h3 className="text-lg font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A2E" }}>Hey there, young explorer!</h3>
            <p className="text-sm leading-relaxed mb-2" style={{ color: "#555", fontFamily: "'Nunito', 'DM Sans', sans-serif" }}>This page is the <strong style={{ color: "#E8520A" }}>Road</strong> &mdash; it&rsquo;s where grown-ups learn the rules of talking to AI.</p>
            <p className="text-sm leading-relaxed mb-2" style={{ color: "#555", fontFamily: "'Nunito', 'DM Sans', sans-serif" }}>Think of it like learning to drive. Before you go anywhere, you check your mirrors, you know the speed limit, and you decide where you&rsquo;re going.</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#555", fontFamily: "'Nunito', 'DM Sans', sans-serif" }}>AI is the same. <strong style={{ color: "#E8520A" }}>You set the rules first.</strong> Then you talk.</p>
            <p className="text-xs italic mb-5" style={{ color: "#999", fontFamily: "'Playfair Display', serif" }}>&ldquo;Every conversation has rules. Every path has signs. And someone has to read them.&rdquo;</p>
            <Link href="/for/child" className="inline-block px-6 py-3 rounded-full text-sm font-bold no-underline transition-all hover:scale-[1.05]" style={{ background: "#E8520A", color: "#fff" }}>Go Back to Your Page &rarr;</Link>
          </div>
        </div>
      )}

      {/* DB-driven content blocks */}
      <StudioBlocks pageSlug={PAGE_SLUG} />

      {/* Ghost Protocol — interactive */}
      <section className="py-16 md:py-20">
        <div className="container max-w-3xl mx-auto px-6">
          <GhostProtocol />
        </div>
      </section>

      {/* Wig Check Quiz — interactive */}
      <section className="py-16 md:py-20 bg-[#0a0a0a]">
        <div className="container max-w-3xl mx-auto px-6">
          <WigCheckQuiz />
        </div>
      </section>

      {flow && (
        <LearningFlow current="Road Protocol" deeper={flow.deeper ?? []} wider={flow.wider ?? []} simpler={flow.simpler ?? []} dark />
      )}
      <div className="flex justify-center py-4"><KidsMidLink /></div>
      <Footer />
    </div>
  );
}
