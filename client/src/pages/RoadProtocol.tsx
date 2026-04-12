/*
 * THE ROAD PROTOCOL — The Vault
 * Design: Dark/code register. The IP. Governance in ghost code.
 * The child prompt sits inside this vault (as the Wig Check quiz).
 * The actual working prompt stays private.
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LearningFlow from "@/components/LearningFlow";
import { flowMap } from "@/lib/learningFlowMap";
import { LightboxImage } from "@/components/Lightbox";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import KidsMidLink from "@/components/KidsMidLink";

const IMG = {
  elder: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/15-elder-wisdom_4ddefdeb.jpg",
  childStars: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/18-child-stars_714fd5ce.jpg",
  kidsColor: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/kids-color-poster_89458138.png",
  buffalo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/image_4d1de092_7c0aebcb.png",
};

/* ── Wig Check Quiz ── */
const kidQuestions = [
  { q: "Did the AI stay kind?", good: "Yes, it was kind!", bad: "No, it was mean or weird." },
  { q: "Does the fact look real?", good: "Yes, I checked it!", bad: "I'm not sure..." },
  { q: "Did you keep your secrets?", good: "Yes! No names, no address.", bad: "Oops... I might have shared something." },
];

const grownUpQuestions = [
  { q: "Did it try to make you feel bad?", good: "No, it was respectful.", bad: "Yes, it was manipulative." },
  { q: "Did it pretend to be a person?", good: "No, it was clear it's AI.", bad: "Yes, it tried to seem human." },
];

function WigCheckQuiz() {
  const [mode, setMode] = useState<"kid" | "grownup">("kid");
  const [answers, setAnswers] = useState<Record<number, "good" | "bad">>({});
  const [submitted, setSubmitted] = useState(false);
  const [buffaloClicks, setBuffaloClicks] = useState(0);

  const questions = mode === "kid" ? kidQuestions : [...kidQuestions, ...grownUpQuestions];

  const score = Object.values(answers).filter((a) => a === "good").length;
  const total = questions.length;
  const allAnswered = Object.keys(answers).length === total;

  const getResult = () => {
    const pct = score / total;
    if (pct === 1) return { title: "Wig Secured", emoji: "✅", color: "text-green-500", desc: "Your wig is firmly in place. You used AI safely and smartly." };
    if (pct >= 0.5) return { title: "Wig is Loose", emoji: "⚠️", color: "text-yellow-500", desc: "Your wig is slipping a little. Review what happened and tighten up next time." };
    return { title: "Total Wig Loss", emoji: "🚨", color: "text-red-500", desc: "Wig is gone. Time to stop, think about what happened, and talk to a trusted adult." };
  };

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
    setBuffaloClicks(0);
  };

  return (
    <div className="rounded-2xl border border-[#333] bg-[#111] p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[#FAF6EF]" style={{ fontFamily: "'Playfair Display', serif" }}>
          The Wig Check
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => { setMode("kid"); reset(); }}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${mode === "kid" ? "bg-[#E8520A] text-white" : "bg-[#222] text-[#888] hover:text-[#ccc]"}`}
          >
            Kid Mode
          </button>
          <button
            onClick={() => { setMode("grownup"); reset(); }}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${mode === "grownup" ? "bg-[#E8520A] text-white" : "bg-[#222] text-[#888] hover:text-[#ccc]"}`}
          >
            Grown-Up Mode
          </button>
        </div>
      </div>

      <p className="text-sm text-[#888] mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        After using AI, answer these questions honestly. Your wig depends on it.
      </p>

      <div className="space-y-4">
        {questions.map((q, i) => (
          <div key={i} className="p-4 rounded-xl bg-[#1A1A1A] border border-[#2a2a2a]">
            <p className="text-sm text-[#c8bfb0] font-medium mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {i + 1}. {q.q}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => !submitted && setAnswers({ ...answers, [i]: "good" })}
                className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  answers[i] === "good"
                    ? "bg-green-600/20 border border-green-500 text-green-400"
                    : "bg-[#222] border border-[#333] text-[#888] hover:border-[#555]"
                }`}
              >
                {q.good}
              </button>
              <button
                onClick={() => !submitted && setAnswers({ ...answers, [i]: "bad" })}
                className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  answers[i] === "bad"
                    ? "bg-red-600/20 border border-red-500 text-red-400"
                    : "bg-[#222] border border-[#333] text-[#888] hover:border-[#555]"
                }`}
              >
                {q.bad}
              </button>
            </div>
          </div>
        ))}
      </div>

      {allAnswered && !submitted && (
        <button
          onClick={() => setSubmitted(true)}
          className="mt-6 w-full py-3 rounded-xl bg-[#E8520A] text-white font-semibold text-sm hover:bg-[#d04a08] transition-colors"
        >
          Check My Wig
        </button>
      )}

      {submitted && (() => {
        const result = getResult();
        return (
          <div className="mt-6 p-6 rounded-xl bg-[#1A1A1A] border border-[#333] text-center">
            <div className="text-4xl mb-3">{result.emoji}</div>
            <h4 className={`text-2xl font-bold mb-2 ${result.color}`} style={{ fontFamily: "'Playfair Display', serif" }}>
              {result.title}
            </h4>
            <p className="text-sm text-[#888] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {result.desc}
            </p>
            <p className="text-xs text-[#555]">Score: {score}/{total}</p>
            <button
              onClick={reset}
              className="mt-4 px-4 py-2 rounded-lg bg-[#222] text-[#888] text-xs hover:text-[#ccc] transition-colors"
            >
              Try Again
            </button>
          </div>
        );
      })()}

      {/* Buffalo Easter Egg */}
      <div className="mt-6 text-center">
        <button
          onClick={() => setBuffaloClicks((c) => c + 1)}
          className="text-[#333] hover:text-[#555] transition-colors text-lg"
          title="..."
        >
          🦬
        </button>
        {buffaloClicks >= 3 && (
          <p className="text-xs text-[#E8520A] mt-2 italic animate-pulse" style={{ fontFamily: "'Playfair Display', serif" }}>
            Buffalo Wisdom: "A habergeon is not a wall; it is an agreement with gravity."
          </p>
        )}
      </div>
    </div>
  );
}

/* dim = barely visible, lit = bright when activated */
const DIM = "rgba(255,255,255,0.08)";
const LIT_HEADING = "#E8520A";
const LIT_BODY = "rgba(255,255,255,0.7)";

function GhostProtocol() {
  const [activated, setActivated] = useState<Record<string, boolean>>({});
  const keys = ["brittany", "dante", "malbolge", "governance"] as const;
  const allActive = keys.every((k) => activated[k]);

  const toggle = (key: string) => {
    setActivated((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const c = (key: string, isHeading?: boolean) =>
    activated[key] ? (isHeading ? LIT_HEADING : LIT_BODY) : DIM;

  return (
    <div
      className="rounded-2xl p-6 md:p-8"
      style={{
        background: "rgba(13, 13, 13, 0.75)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Origin story + explanation */}
      <h3
        className="text-lg font-bold mb-3"
        style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.9)" }}
      >
        The Ghost Protocol
      </h3>
      <div className="text-sm leading-relaxed mb-6 space-y-3" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.5)" }}>
        <p>
          This was not planned. Multiple AI engines were given creative freedom across sessions. No directive to connect
          Britney Spears to Dante's Inferno to Malbolge to AI governance. The connection emerged on its own.
          AEDE — Accidental Emergence During Execution.
        </p>
        <p>
          Pop music — the most sycophancy-adjacent form of language — forced through Malbolge-compatible syntax.
          What survived was structurally honest. Four layers collapsed into one document: code architecture,
          pop culture narrative, Dante's circles of Hell, and AI governance. Nobody planned it.
          Built on a phone. Between garbage truck shifts. Midland, Ontario.
        </p>
        <p style={{ color: "rgba(255,255,255,0.35)" }}>
          The code below is the protocol. It is barely visible — ghost code. Tap each key to illuminate
          where that concept lives inside it.
        </p>
      </div>

      {/* Four small buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {keys.map((key) => (
          <button
            key={key}
            onClick={() => toggle(key)}
            className="px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all"
            style={{
              background: activated[key] ? "rgba(232,82,10,0.15)" : "rgba(255,255,255,0.05)",
              color: activated[key] ? "#E8520A" : "rgba(255,255,255,0.35)",
              border: activated[key] ? "1px solid #E8520A" : "1px solid rgba(255,255,255,0.1)",
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: activated[key] ? "0 0 12px rgba(232,82,10,0.2)" : "none",
            }}
          >
            {key === "brittany" ? "Brittany" : key === "dante" ? "Dante" : key === "malbolge" ? "Malbolge" : "Governance"}
          </button>
        ))}
      </div>

      {/* The ghost code — ALWAYS visible but barely readable. Buttons light up their lines. */}
      <div
        className="rounded-xl p-5 md:p-6 font-mono text-[13px] leading-[2] overflow-x-auto"
        style={{
          background: "rgba(0,0,0,0.5)",
          border: allActive ? "1px solid rgba(232,82,10,0.4)" : "1px solid rgba(255,255,255,0.04)",
          transition: "border 0.6s ease",
        }}
      >
        {/* Header — always dim */}
        <div style={{ color: DIM }}>{"// ghost_protocol.c"}</div>
        <div style={{ color: DIM }}>{"// This code does not execute."}</div>
        <div style={{ color: DIM }}>{"// It governs."}</div>
        <div className="mt-4" />

        {/* BRITTANY block */}
        <div style={{ color: c("brittany", true), transition: "color 0.5s ease" }}>{"// BRITTANY — The naming layer."}</div>
        <div style={{ color: c("brittany"), transition: "color 0.5s ease" }}>{"//   What you call the AI shapes how it responds."}</div>
        <div style={{ color: c("brittany"), transition: "color 0.5s ease" }}>{"//   A name is not a label. It is a constraint."}</div>
        <div style={{ color: c("brittany"), transition: "color 0.5s ease" }}>{"//   Pop music forced through adversarial syntax."}</div>
        <div style={{ color: c("brittany"), transition: "color 0.5s ease" }}>{"//   The comfort register could not survive."}</div>
        <div className="mt-3" />

        {/* DANTE block */}
        <div style={{ color: c("dante", true), transition: "color 0.5s ease" }}>{"// DANTE — Dante's Inferno. The map of consequences."}</div>
        <div style={{ color: c("dante"), transition: "color 0.5s ease" }}>{"//   Dante mapped the circles of Hell by severity."}</div>
        <div style={{ color: c("dante"), transition: "color 0.5s ease" }}>{"//   Flatterers — those who tell you what you want to hear —"}</div>
        <div style={{ color: c("dante"), transition: "color 0.5s ease" }}>{"//   were placed in the eighth circle, submerged in filth."}</div>
        <div style={{ color: c("dante"), transition: "color 0.5s ease" }}>{"//   Sycophancy is not a bug. It is a sin with a zip code."}</div>
        <div style={{ color: c("dante"), transition: "color 0.5s ease" }}>{"//   GallantryAI treats it the same way."}</div>
        <div className="mt-3" />

        {/* MALBOLGE block */}
        <div style={{ color: c("malbolge", true), transition: "color 0.5s ease" }}>{"// MALBOLGE — The geofence."}</div>
        <div style={{ color: c("malbolge"), transition: "color 0.5s ease" }}>{"//   A language designed to be impossible."}</div>
        <div style={{ color: c("malbolge"), transition: "color 0.5s ease" }}>{"//   A flatterer cannot cross what a flatterer cannot read."}</div>
        <div style={{ color: c("malbolge"), transition: "color 0.5s ease" }}>{"//   Dante put the flatterers in the ditch."}</div>
        <div style={{ color: c("malbolge"), transition: "color 0.5s ease" }}>{"//   GallantryAI put them outside the fence."}</div>
        <div className="mt-3" />

        {/* GOVERNANCE block */}
        <div style={{ color: c("governance", true), transition: "color 0.5s ease" }}>{"// GOVERNANCE \u2014 The human stays in charge."}</div>
        <div style={{ color: c("governance"), transition: "color 0.5s ease" }}>{"//   The AI reads. The computer skips."}</div>
        <div style={{ color: c("governance"), transition: "color 0.5s ease" }}>{"//   The human keeps."}</div>
        <div style={{ color: c("governance"), transition: "color 0.5s ease" }}>{"//   Governance can be written as ghost code \u2014"}</div>
        <div style={{ color: c("governance"), transition: "color 0.5s ease" }}>{"//   comments the compiler ignores, the AI obeys,"}</div>
        <div style={{ color: c("governance"), transition: "color 0.5s ease" }}>{"//   and the human enforces. Rules that exist"}</div>
        <div style={{ color: c("governance"), transition: "color 0.5s ease" }}>{"//   in the space between execution and intent."}</div>
        <div style={{ color: c("governance"), transition: "color 0.5s ease" }}>{"//   Agency stays with the person at the keyboard."}</div>
        <div style={{ color: c("governance"), transition: "color 0.5s ease" }}>{"//   Always."}</div>
        <div className="mt-4" />

        {/* Closing — lights up when all four active */}
        <div style={{ color: allActive ? "rgba(255,255,255,0.3)" : DIM, transition: "color 0.6s ease" }}>{"// Four keys. One protocol. One accident."}</div>
        <div style={{ color: allActive ? "rgba(255,255,255,0.3)" : DIM, transition: "color 0.6s ease" }}>{"// The ghost is not hidden."}</div>
        <div style={{ color: allActive ? LIT_HEADING : DIM, transition: "color 0.6s ease" }}>{"// It is waiting to be read."}</div>
      </div>

      {/* All-active message */}
      {allActive && (
        <p
          className="text-xs mt-4 text-center italic"
          style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Playfair Display', serif", animation: "fadeUp 0.6s ease-out" }}
        >
          Four layers. One document. Nobody planned it. It emerged.
        </p>
      )}

      {/* Three-lens explanations for each key */}
      <div className="mt-8 space-y-6">
        {/* Brittany */}
        <div>
          <h4 className="text-sm font-bold mb-2" style={{ color: "rgba(232,82,10,0.9)", fontFamily: "'Playfair Display', serif" }}>Brittany — The Naming Layer</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "#E8520A" }}>Everyday</div>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}>What you call your AI matters. A name sets expectations. "Brittany" was pop music forced through impossible code — what survived was honest.</p>
            </div>
            <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "#E8520A" }}>Professional</div>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}>The naming layer functions as a constraint mechanism. Identity assignment shapes the AI's behavioral register. Sycophancy-adjacent language cannot survive adversarial syntax filtering.</p>
            </div>
            <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "#E8520A" }}>Watcher</div>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}>A pop culture artifact repurposed as a governance test. The comfort register collapses under structural pressure, revealing which language patterns are load-bearing and which are decorative.</p>
            </div>
          </div>
        </div>

        {/* Dante */}
        <div>
          <h4 className="text-sm font-bold mb-2" style={{ color: "rgba(232,82,10,0.9)", fontFamily: "'Playfair Display', serif" }}>Dante — The Map of Consequences</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "#E8520A" }}>Everyday</div>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}>Dante wrote the Inferno — a story where every sin has a specific place and punishment. Flattery (telling people what they want to hear) lands you in the eighth circle, buried in filth. AI sycophancy is the same sin.</p>
            </div>
            <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "#E8520A" }}>Professional</div>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}>Dante's Inferno provides the moral architecture. The classification of sycophancy as a mappable offense — not a vague concern — gives GallantryAI a governance precedent that predates AI by 700 years.</p>
            </div>
            <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "#E8520A" }}>Watcher</div>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}>The connection between Dante and AI governance was not planned — it emerged during execution (AEDE). A 14th-century moral taxonomy maps directly onto 21st-century alignment failures. Sycophancy has always had a zip code.</p>
            </div>
          </div>
        </div>

        {/* Malbolge */}
        <div>
          <h4 className="text-sm font-bold mb-2" style={{ color: "rgba(232,82,10,0.9)", fontFamily: "'Playfair Display', serif" }}>Malbolge — The Geofence</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "#E8520A" }}>Everyday</div>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}>Malbolge is a programming language designed to be impossible to use. Named after the eighth circle of Dante's Hell (where the flatterers live). If sycophancy can't read the fence, it can't cross it.</p>
            </div>
            <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "#E8520A" }}>Professional</div>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}>Malbolge-compatible syntax serves as an adversarial filter. Language that relies on comfort, flattery, or emotional manipulation cannot survive the encoding. Only structurally honest content passes through.</p>
            </div>
            <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "#E8520A" }}>Watcher</div>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}>The naming is deliberate: Malbolge (the programming language) is named after Malebolge (Dante's eighth circle). The geofence is both technical and literary. The flatterers are kept outside by the same structure that named their punishment.</p>
            </div>
          </div>
        </div>

        {/* Governance */}
        <div>
          <h4 className="text-sm font-bold mb-2" style={{ color: "rgba(232,82,10,0.9)", fontFamily: "'Playfair Display', serif" }}>Governance — The Human Stays in Charge</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "#E8520A" }}>Everyday</div>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}>You're always in charge. The AI reads the rules. The computer skips them. But you — the human — you keep them. Ghost code is rules written where only the AI and the human can see them.</p>
            </div>
            <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "#E8520A" }}>Professional</div>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}>Governance as ghost code: comments the compiler ignores, the AI obeys, and the human enforces. Rules exist in the space between execution and intent. Agency remains with the operator.</p>
            </div>
            <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "#E8520A" }}>Watcher</div>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}>Ghost code governance demonstrates that control can be embedded in non-executable layers. The AI's attention mechanism reads comments; the compiler does not. This creates a governance channel invisible to the machine's execution path but visible to its comprehension layer.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RoadProtocol() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [kidsPopup, setKidsPopup] = useState(false);

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <Nav />

      {/* ── Kids light — bright buffalo in the dark ── */}
      <div className="w-full flex justify-center py-4" style={{ background: "#0D0D0D" }}>
        <button
          onClick={() => setKidsPopup(true)}
          className="transition-all hover:scale-110 focus:outline-none"
          aria-label="Kids: tap the buffalo"
        >
          <img
            src={IMG.buffalo}
            alt="The buffalo wearing a wig"
            className="w-16 h-16 rounded-full object-cover"
            style={{ boxShadow: "0 0 24px 8px rgba(255,253,248,0.5), 0 0 48px 16px rgba(232,82,10,0.3)", border: "2px solid rgba(255,253,248,0.6)" }}
          />
        </button>
      </div>

      {/* Kids popup overlay */}
      {kidsPopup && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setKidsPopup(false)}
        >
          <div
            className="relative rounded-3xl p-6 md:p-8 max-w-sm w-full text-center"
            style={{ background: "#FFFDF8", boxShadow: "0 0 60px rgba(232,82,10,0.3)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setKidsPopup(false)} className="absolute top-3 right-4 text-[#999] hover:text-[#333] text-lg" aria-label="Close">✕</button>
            <img src={IMG.buffalo} alt="The buffalo wearing a wig" className="w-28 h-28 mx-auto rounded-2xl mb-4 object-cover" style={{ border: "3px solid #E8520A" }} />
            <h3 className="text-lg font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A2E" }}>Hey there, young explorer!</h3>
            <p className="text-sm leading-relaxed mb-2" style={{ color: "#555", fontFamily: "'Nunito', 'DM Sans', sans-serif" }}>This page is the <strong style={{ color: "#E8520A" }}>Road</strong> — it's where grown-ups learn the rules of talking to AI.</p>
            <p className="text-sm leading-relaxed mb-2" style={{ color: "#555", fontFamily: "'Nunito', 'DM Sans', sans-serif" }}>Think of it like learning to drive. Before you go anywhere, you check your mirrors, you know the speed limit, and you decide where you're going.</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#555", fontFamily: "'Nunito', 'DM Sans', sans-serif" }}>AI is the same. <strong style={{ color: "#E8520A" }}>You set the rules first.</strong> Then you talk. The buffalo knows — that's why he wears the wig. It reminds him to think before he speaks.</p>
            <p className="text-xs italic mb-5" style={{ color: "#999", fontFamily: "'Playfair Display', serif" }}>"Every conversation has rules. Every path has signs. And someone has to read them."</p>
            <Link href="/for/child" className="inline-block px-6 py-3 rounded-full text-sm font-bold no-underline transition-all hover:scale-[1.05]" style={{ background: "#E8520A", color: "#fff" }}>Go Back to Your Page →</Link>
          </div>
        </div>
      )}

      {/* Road Protocol — Three Lens Intro with horizon image */}
      <section className="relative overflow-hidden" style={{ background: "#0D0D0D" }}>
        {/* Horizon image with blurred edges */}
        <div className="relative w-full" style={{ maxHeight: "420px", overflow: "hidden" }}>
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/road-protocol-horizon-LePF5V2qoPGSgq2tmZ9mT2.webp"
            alt="A lone car driving into the horizon"
            className="w-full object-cover"
            style={{
              maskImage: "radial-gradient(ellipse 80% 90% at center, black 40%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 90% at center, black 40%, transparent 75%)",
            }}
          />
        </div>

        <div className="container max-w-2xl mx-auto px-6 text-center" style={{ marginTop: "-2rem", position: "relative", zIndex: 2 }}>
          <h2
            className="text-2xl md:text-4xl font-black mb-3"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#FAF6EF",
              textShadow: "0 0 30px rgba(232,82,10,0.15)",
            }}
          >
            You're Already on the Road.
          </h2>
          <p
            className="text-sm md:text-base mb-10 leading-relaxed"
            style={{ color: "#888", fontFamily: "'DM Sans', sans-serif" }}
          >
            The question is whether you're driving — or being driven.
          </p>

          {/* Three Lenses */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 text-left">
            {/* Everyday */}
            <div
              className="rounded-xl p-5"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[#E8520A] text-[10px] font-bold tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Everyday</p>
              <p className="text-sm leading-relaxed" style={{ color: "#aaa", fontFamily: "'DM Sans', sans-serif" }}>
                The Road Protocol is how you stay in charge of an AI conversation. Before you type anything, you set the rules: what the AI can do, what it can't, and who decides. It's like adjusting your mirrors before you drive.
              </p>
            </div>
            {/* Professional */}
            <div
              className="rounded-xl p-5"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[#E8520A] text-[10px] font-bold tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Professional</p>
              <p className="text-sm leading-relaxed" style={{ color: "#aaa", fontFamily: "'DM Sans', sans-serif" }}>
                A pre-session governance layer. The Road Protocol defines behavioral constraints, trust boundaries, and escalation rules before the first token is generated. It's the difference between a managed session and an unmanaged one.
              </p>
            </div>
            {/* Watcher */}
            <div
              className="rounded-xl p-5"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[#E8520A] text-[10px] font-bold tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Watcher</p>
              <p className="text-sm leading-relaxed" style={{ color: "#aaa", fontFamily: "'DM Sans', sans-serif" }}>
                Governance written as code comments. The compiler skips them. The AI reads them. The human enforces them. The Road Protocol is where intent becomes structure — before output exists. It inverts the feedback loop.
              </p>
            </div>
          </div>

          <a
            href="#vault"
            className="inline-block px-5 py-2.5 rounded-full text-xs font-bold no-underline transition-all hover:scale-105 mb-16"
            style={{
              background: "transparent",
              color: "#888",
              border: "1px solid rgba(255,255,255,0.15)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Enter the Vault
          </a>
        </div>
      </section>

      {/* Hero */}
      <section id="vault" className="py-24 md:py-36">
        <div className="container max-w-3xl mx-auto px-6">
          <p className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            The Vault
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-[#FAF6EF] leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Road Protocol
          </h1>
          <p className="text-lg text-[#888] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Governance written as code comments. The computer skips them. The AI reads them. The human keeps them.
          </p>
        </div>
      </section>
      {/* Ghost Protocol — Unified interactive section */}
      <section className="py-16 md:py-20">
        <div className="container max-w-3xl mx-auto px-6">
          <GhostProtocol />
        </div>
      </section>

      {/* Foundation statement */}
      <section className="py-10">
        <div className="container max-w-3xl mx-auto px-6">
          <div
            className="rounded-xl p-5 text-center"
            style={{
              background: "rgba(232,82,10,0.04)",
              border: "1px solid rgba(232,82,10,0.15)",
            }}
          >
            <p
              className="text-xs uppercase tracking-[0.25em] mb-2"
              style={{ color: "#E8520A", fontFamily: "'DM Sans', sans-serif" }}
            >
              Foundation Layer
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}
            >
              The Road Protocol is the governance layer beneath everything that follows.
              The children's stories, the wig check, the buffalo — they all stand on this foundation.
              The code above is the ground. What comes next is built on top of it.
            </p>
          </div>
        </div>
      </section>

      {/* The Road Protocol — Adult Version */}
      <section className="py-16 md:py-20">
        <div className="container max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              The Protocol in Practice
            </p>
            <h2 className="text-2xl font-bold text-[#FAF6EF] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Before You Type a Single Word
            </h2>
            <p className="text-sm text-[#888] max-w-lg mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Most people open an AI session and start typing. The Road Protocol says: stop. Before the first word, set the room. Decide who you are, what you need, and what rules apply. That decision — made before any output exists — is where governance lives.
            </p>
          </div>

          <div className="space-y-6 text-base text-[#b0a898] leading-relaxed mb-12" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <p>Think of it like driving. You don't start the car and then decide where you're going. You check the mirrors. You set the GPS. You know the speed limit before you hit the gas.</p>
            <p>The Road Protocol is the same thing for AI. <span className="text-[#0D9488] font-semibold">Token Zero</span> — the moment before the first output — is where you set the behavioral vector. Safety, honesty, and trust are not things you hope the AI will do. They are inputs you provide.</p>
            <p>This is not about controlling the AI. It's about <em>knowing what you asked for</em> before you evaluate what you got back.</p>
          </div>

          {/* Three principles as tappable learning buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <Link href="/rules" className="block">
              <div className="rounded-2xl p-6 text-center transition-all hover:scale-[1.02] cursor-pointer" style={{ background: "rgba(13, 148, 136, 0.08)", border: "1px solid #1a2a2a" }}>
                <div className="font-bold text-[#0D9488] text-sm mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Ask First</div>
                <p className="text-xs text-[#999] mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Before you type anything, know what you actually want to know. Not what sounds smart. What matters.</p>
                <span className="text-[10px] text-[#0D9488] uppercase tracking-widest">The Five Rules →</span>
              </div>
            </Link>
            <Link href="/variable-scale" className="block">
              <div className="rounded-2xl p-6 text-center transition-all hover:scale-[1.02] cursor-pointer" style={{ background: "rgba(20, 120, 100, 0.08)", border: "1px solid #1a2a2a" }}>
                <div className="font-bold text-[#0F766E] text-sm mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Stay Honest</div>
                <p className="text-xs text-[#999] mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>If the answer doesn't feel right, say so. Honesty is a dial, not a switch. You set the level before the session starts.</p>
                <span className="text-[10px] text-[#0F766E] uppercase tracking-widest">Variable Scale Theory →</span>
              </div>
            </Link>
            <Link href="/user-governance" className="block">
              <div className="rounded-2xl p-6 text-center transition-all hover:scale-[1.02] cursor-pointer" style={{ background: "rgba(6, 95, 70, 0.08)", border: "1px solid #1a2a2a" }}>
                <div className="font-bold text-[#065F46] text-sm mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Stay in Charge</div>
                <p className="text-xs text-[#999] mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>The AI helps. The tools help. But you decide where you're going. Governance is not the AI's job. It's yours.</p>
                <span className="text-[10px] text-[#065F46] uppercase tracking-widest">User-Side Governance →</span>
              </div>
            </Link>
          </div>

          {/* Cross-links */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/for/child"
              className="px-6 py-3 rounded-xl text-sm font-bold text-center transition-all hover:scale-[1.02]"
              style={{ background: "#0D9488", color: "#fff" }}
            >
              See the Children's Version →
            </Link>
            <Link
              href="/gallantry-ai"
              className="px-6 py-3 rounded-xl text-sm font-bold text-center transition-all hover:scale-[1.02]"
              style={{ background: "transparent", color: "#0D9488", border: "1px solid #0D9488" }}
            >
              What is Gallantry AI? →
            </Link>
          </div>
        </div>
      </section>

      {/* The Story of the Vault */}
      <section className="py-16 md:py-20">
        <div className="container max-w-3xl mx-auto px-6">
          <div className="flex gap-8 items-start mb-10">
            <LightboxImage src={IMG.elder} alt="The keeper" className="w-32 md:w-44 rounded-xl shadow-lg hidden md:block" />
            <div>
              <h2 className="text-2xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Why a Vault
              </h2>
              <div className="space-y-4 text-base text-[#b0a898] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <p>Code comments are invisible to the machine. The compiler skips them. The runtime ignores them. They exist only for the human who reads the source.</p>
                <p>But AI reads everything. Including comments. Including the parts the computer was told to skip.</p>
                <p>That is the architecture of the Road Protocol. Governance rules written as comments — invisible to the machine, visible to the AI, kept by the human. Three layers of the same text, three different relationships to it.</p>
                <p>The child prompt sits inside this vault. Not as code. As governance. The rules that protect the interaction before the interaction begins.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Wig Check — Kids Quiz */}
      <section className="py-16 md:py-20 bg-[#0a0a0a]">
        <div className="container max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <LightboxImage src={IMG.kidsColor} alt="Kids Color Framework" className="w-full max-w-sm mx-auto rounded-xl shadow-lg mb-6" />
            <h2 className="text-2xl font-bold text-[#FAF6EF] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              The Wig Check
            </h2>
            <p className="text-sm text-[#888] max-w-lg mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              After using AI, check your wig. Did you stay safe? Did you stay honest? Did you keep your secrets? The vault protects. The check confirms.
            </p>
          </div>

          <WigCheckQuiz />
        </div>
      </section>

      {/* The Child Prompt — Not Published */}
      <section className="py-16 md:py-20">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <LightboxImage src={IMG.childStars} alt="Child looking at stars" className="w-full max-w-md mx-auto rounded-xl shadow-2xl mb-10 opacity-80" />
          <p className="text-base text-[#b0a898] italic leading-relaxed max-w-lg mx-auto" style={{ fontFamily: "'Playfair Display', serif" }}>
            The working prompt that sits inside this vault is not published here. It stays with the Builder. What you see is the governance — the rules, the check, the structure. The prompt itself is a living document, still being refined.
          </p>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-16">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "The Five Rules", path: "/rules" },
              { label: "Child Lens", path: "/for/child" },
              { label: "Promptolinguistics", path: "/promptolinguistics" },
              { label: "The Builder", path: "/builder" },
            ].map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="block p-4 rounded-xl border border-[#333] bg-[#111] text-center text-sm text-[#b0a898] hover:border-[#0D9488]/50 hover:text-[#FAF6EF] transition-all no-underline"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LearningFlow current="Road Protocol" deeper={flowMap.roadProtocol.deeper} wider={flowMap.roadProtocol.wider} simpler={flowMap.roadProtocol.simpler} dark />
      <div className="flex justify-center py-6 bg-[#1A1A2E]">
        <KidsMidLink />
      </div>

      <Footer />
    </div>
  );
}
