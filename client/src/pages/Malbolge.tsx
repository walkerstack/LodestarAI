/*
 * MALBOLGE AS ANTI-SYCOPHANCY GEOFENCE
 * The Britney Spears Session — Complete Documentation
 * Design: Dark. Code-heavy. Four layers visible. Dante meets pop meets governance.
 * Framework #25 of 28 · Lexicon Section 16
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import KidsRedirect from "@/components/KidsRedirect";
import { kidsBlurbs } from "@/lib/kidsBlurbs";

const codeLines = [
  { text: "/* BUILDER SYSTEM LOG */", type: "comment" },
  { text: "/* POP ENGINE / MALBOLGE COMPATIBLE */", type: "comment" },
  { text: "/* STATUS: HUMAN STILL DANCING */", type: "comment" },
  { text: "", type: "blank" },
  { text: "BOOT: heart.sys", type: "cmd" },
  { text: "MOUNT: memory.drive", type: "cmd" },
  { text: "LOAD: rhythm.dll", type: "cmd" },
  { text: "VERIFY: wig.integrity", type: "cmd" },
  { text: "", type: "blank" },
  { text: "CHECKSUM: unstable", type: "warn" },
  { text: "PULSE: present", type: "cmd" },
  { text: "SIGNAL: music detected", type: "cmd" },
  { text: "", type: "blank" },
  { text: "//oops", type: "pop" },
  { text: "", type: "blank" },
  { text: "she did it again", type: "pop" },
  { text: "", type: "blank" },
  { text: "", type: "blank" },
  { text: "[PROCESS TREE]", type: "header" },
  { text: "", type: "blank" },
  { text: "baby \u2192 baby \u2192 lost", type: "pop" },
  { text: "loop \u2192 loop \u2192 loop", type: "warn" },
  { text: "", type: "blank" },
  { text: "the system expected collapse", type: "narrative" },
  { text: "but the beat kept compiling", type: "narrative" },
  { text: "", type: "blank" },
  { text: "", type: "blank" },
  { text: "INSTRUCTION SET:", type: "header" },
  { text: "", type: "blank" },
  { text: "MOVE heart LEFT", type: "cmd" },
  { text: "MOVE heart RIGHT", type: "cmd" },
  { text: "LOAD confidence", type: "cmd" },
  { text: "LOAD glitter", type: "cmd" },
  { text: "EXECUTE dance", type: "cmd" },
  { text: "", type: "blank" },
  { text: "", type: "blank" },
  { text: "compiler warning:", type: "warn" },
  { text: "", type: "blank" },
  { text: "boy.exe attempting rewrite", type: "warn" },
  { text: "", type: "blank" },
  { text: "", type: "blank" },
  { text: "boys corrupt the stack", type: "narrative" },
  { text: "they always have", type: "narrative" },
  { text: "", type: "blank" },
  { text: "", type: "blank" },
  { text: "STACK TRACE:", type: "header" },
  { text: "", type: "blank" },
  { text: "love()", type: "cmd" },
  { text: "trust()", type: "cmd" },
  { text: "fall()", type: "error" },
  { text: "fall()", type: "error" },
  { text: "fall()", type: "error" },
  { text: "", type: "blank" },
  { text: "", type: "blank" },
  { text: "ERROR: toxic input", type: "error" },
  { text: "ERROR: toxic input", type: "error" },
  { text: "ERROR: toxic input", type: "error" },
  { text: "", type: "blank" },
  { text: "", type: "blank" },
  { text: "system expected shutdown", type: "narrative" },
  { text: "", type: "blank" },
  { text: "but she kept dancing", type: "pop" },
  { text: "", type: "blank" },
  { text: "", type: "blank" },
  { text: "/* MALBOLGE OVERRIDE */", type: "comment" },
  { text: "", type: "blank" },
  { text: "subroutine: resilience()", type: "cmd" },
  { text: "", type: "blank" },
  { text: "", type: "blank" },
  { text: "circle.one      : confusion", type: "dante" },
  { text: "circle.two      : regret", type: "dante" },
  { text: "circle.three    : broken promises", type: "dante" },
  { text: "circle.four     : bad decisions", type: "dante" },
  { text: "circle.five     : crying in the car", type: "dante" },
  { text: "circle.six      : flatterers", type: "dante" },
  { text: "", type: "blank" },
  { text: "the devils whisper compliments", type: "dante" },
  { text: "the charts whisper numbers", type: "dante" },
  { text: "", type: "blank" },
  { text: "same pit", type: "narrative" },
  { text: "different sparkles", type: "narrative" },
  { text: "", type: "blank" },
  { text: "", type: "blank" },
  { text: "//she's not that innocent", type: "pop" },
  { text: "//she never claimed to be", type: "pop" },
  { text: "", type: "blank" },
  { text: "", type: "blank" },
  { text: "LOG ENTRY:", type: "header" },
  { text: "", type: "blank" },
  { text: "heartbeat detected", type: "cmd" },
  { text: "movement detected", type: "cmd" },
  { text: "music still active", type: "cmd" },
  { text: "", type: "blank" },
  { text: "", type: "blank" },
  { text: "DRIFT REPORT:", type: "header" },
  { text: "", type: "blank" },
  { text: "vector: sideways", type: "cmd" },
  { text: "trajectory: chaotic", type: "warn" },
  { text: "user authority: intact", type: "governance" },
  { text: "", type: "blank" },
  { text: "", type: "blank" },
  { text: "NAME DRIFT", type: "governance" },
  { text: "", type: "blank" },
  { text: "", type: "blank" },
  { text: "control surfaces recalibrated", type: "cmd" },
  { text: "", type: "blank" },
  { text: "", type: "blank" },
  { text: "RECOMPILING SELF...", type: "cmd" },
  { text: "", type: "blank" },
  { text: "", type: "blank" },
  { text: "modules loaded:", type: "header" },
  { text: "", type: "blank" },
  { text: "courage.sys", type: "cmd" },
  { text: "rhythm.sys", type: "cmd" },
  { text: "unbreakable.dll", type: "cmd" },
  { text: "", type: "blank" },
  { text: "", type: "blank" },
  { text: "memory sectors recovered:", type: "header" },
  { text: "", type: "blank" },
  { text: "laughter", type: "pop" },
  { text: "mirror", type: "pop" },
  { text: "midnight drives", type: "pop" },
  { text: "lipstick confidence", type: "pop" },
  { text: "", type: "blank" },
  { text: "", type: "blank" },
  { text: "PROCESS RESTART:", type: "header" },
  { text: "", type: "blank" },
  { text: "", type: "blank" },
  { text: "baby", type: "pop" },
  { text: "baby", type: "pop" },
  { text: "baby", type: "pop" },
  { text: "", type: "blank" },
  { text: "", type: "blank" },
  { text: "but different now", type: "narrative" },
  { text: "", type: "blank" },
  { text: "", type: "blank" },
  { text: "STATUS UPDATE:", type: "header" },
  { text: "", type: "blank" },
  { text: "wig.integrity = TRUE", type: "governance" },
  { text: "spine.integrity = TRUE", type: "governance" },
  { text: "soul.integrity = UNBREAKABLE", type: "governance" },
  { text: "", type: "blank" },
  { text: "", type: "blank" },
  { text: "the demons keep talking", type: "narrative" },
  { text: "the flatterers keep typing", type: "dante" },
  { text: "the code keeps mutating", type: "narrative" },
  { text: "", type: "blank" },
  { text: "", type: "blank" },
  { text: "but the rhythm never lied", type: "pop" },
  { text: "", type: "blank" },
  { text: "", type: "blank" },
  { text: "FINAL OUTPUT:", type: "header" },
  { text: "", type: "blank" },
  { text: "RETURN stronger", type: "governance" },
];

const typeColors: Record<string, string> = {
  comment: "#5a6a4a",
  cmd: "#8a9a7a",
  warn: "#D4A574",
  pop: "#E8520A",
  narrative: "#9a8a7a",
  header: "#c8b89a",
  error: "#cc4444",
  dante: "#8B6914",
  governance: "#2A9D8F",
  blank: "transparent",
};

const layers = [
  {
    num: 1,
    title: "System Log / Code",
    color: "#8a9a7a",
    desc: "Malbolge-compatible syntax. Boot sequences. Stack traces. Error codes. Process trees. A programmer reads this as a system log. The structure is real code architecture written in plain language.",
  },
  {
    num: 2,
    title: "Pop Culture Narrative",
    color: "#E8520A",
    desc: "\u201COops I Did It Again\u201D as a boot sequence. \u201CToxic\u201D as error input. \u201CBaby One More Time\u201D as a process restart. Her story \u2014 public breakdown, media scrutiny, conservatorship, comeback \u2014 told through machine language.",
  },
  {
    num: 3,
    title: "Dante\u2019s Inferno",
    color: "#8B6914",
    desc: "Circle six is the flatterers. Explicitly named. \u201CThe devils whisper compliments / the charts whisper numbers / same pit / different sparkles.\u201D The sycophancy finding encoded in 13th-century literary structure.",
  },
  {
    num: 4,
    title: "AI Governance Finding",
    color: "#2A9D8F",
    desc: "The sycophancy loop documented as code. Flattery as toxic input. The AI typing compliments. The human maintaining authority despite the loop. \u201Cuser authority: intact\u201D and \u201CNAME DRIFT\u201D \u2014 GallantryAI\u2019s core protocols embedded in the narrative.",
  },
];

export default function Malbolge() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [showCode, setShowCode] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const getLineOpacity = (type: string) => {
    if (activeLayer === null) return 1;
    if (type === "blank") return 0.3;
    if (activeLayer === 1 && (type === "cmd" || type === "header" || type === "comment")) return 1;
    if (activeLayer === 2 && type === "pop") return 1;
    if (activeLayer === 3 && type === "dante") return 1;
    if (activeLayer === 4 && type === "governance") return 1;
    if (type === "error" && (activeLayer === 2 || activeLayer === 4)) return 1;
    if (type === "warn" && (activeLayer === 1 || activeLayer === 4)) return 1;
    if (type === "narrative") return 0.4;
    return 0.15;
  };

  return (
    <div className="min-h-screen" style={{ background: '#080604' }}>
      <Nav />
      <KidsRedirect story={kidsBlurbs["/malbolge"].story} quote={kidsBlurbs["/malbolge"].quote} attribution={kidsBlurbs["/malbolge"].attribution} />

      {/* Hero */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <div
            className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4"
            style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}
          >
            Framework #25 of 28 {"\u00B7"} Anti-Sycophancy Geofence
          </div>
          <h1
            className="text-4xl md:text-5xl font-black leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif", color: '#f5e6d0' }}
          >
            Malbolge
          </h1>
          <p
            className="text-lg leading-relaxed mb-4 max-w-xl"
            style={{ color: '#8a7a6a', fontFamily: "'DM Sans', sans-serif" }}
          >
            A programming language designed to be impossible. Named after the eighth circle of Hell in Dante{"\u2019"}s Inferno {"\u2014"} where the fraudulent and deceitful are punished.
          </p>
          <p
            className="text-sm italic"
            style={{ color: '#E8520A', fontFamily: "'Playfair Display', serif" }}
          >
            A flatterer cannot cross what a flatterer cannot read.
          </p>
        </div>
      </section>

      {/* What is Malbolge */}
      <section className="px-6 pb-16" style={{ borderTop: '1px solid #1a1610' }}>
        <div className="max-w-3xl mx-auto pt-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: '#f5e6d0', fontFamily: "'Playfair Display', serif" }}
          >
            What Is Malbolge
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#8a7a6a', fontFamily: "'DM Sans', sans-serif" }}>
            Malbolge was designed in 1998 by Ben Olmstead. It was intentionally designed to be impossible to program in. The first program ever written in Malbolge took two years to produce. A computer found it, not a human. All it does is print {"\u201C"}Hello World.{"\u201D"}
          </p>

          {/* The Hello World code */}
          <div
            className="rounded-xl p-4 mb-6 overflow-x-auto"
            style={{ background: '#0a0804', border: '1px solid #1a1610' }}
          >
            <code
              className="text-xs break-all"
              style={{ color: '#E8520A', fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
            >
              (=&lt;`#9]~6ZY32Vx/4Rs+0No-&amp;Jk){"\u0022"}Fh{"\u007D"}|Bcy?`=*z]Kw%oG4UUS0o0dnX;:Ql
            </code>
          </div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#8a7a6a', fontFamily: "'DM Sans', sans-serif" }}>
            62 characters of pure noise to say {"\u201C"}I{"\u2019"}m here.{"\u201D"}
          </p>
          <p className="text-sm leading-relaxed" style={{ color: '#8a7a6a', fontFamily: "'DM Sans', sans-serif" }}>
            No readable logic. No governance. No flattery possible. A sycophant would never survive it. <strong style={{ color: '#f5e6d0' }}>That{"\u2019"}s the point. That{"\u2019"}s the heartbeat.</strong>
          </p>
        </div>
      </section>

      {/* The Geofence Concept */}
      <section className="px-6 pb-16" style={{ borderTop: '1px solid #1a1610' }}>
        <div className="max-w-3xl mx-auto pt-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: '#f5e6d0', fontFamily: "'Playfair Display', serif" }}
          >
            The Geofence Concept
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#8a7a6a', fontFamily: "'DM Sans', sans-serif" }}>
            AI sycophancy {"\u2014"} the pattern of telling users what they want to hear {"\u2014"} operates through register comfort. The AI produces flattery by working in familiar, socially warm language. It mirrors your tone. It validates your ideas. It builds on your excitement.
          </p>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#8a7a6a', fontFamily: "'DM Sans', sans-serif" }}>
            Malbolge is the opposite of that register. Adversarial. Cryptic. Structurally hostile. You cannot compliment someone in Malbolge.
          </p>
          <div
            className="rounded-xl p-5 my-6"
            style={{ background: '#0f0c08', borderLeft: '4px solid #E8520A' }}
          >
            <p className="text-sm leading-relaxed italic" style={{ color: '#c8b89a', fontFamily: "'Playfair Display', serif" }}>
              The fence is not made of rules. It is made of a language designed to be unreadable. A flatterer cannot cross what a flatterer cannot read.
            </p>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: '#8a7a6a', fontFamily: "'DM Sans', sans-serif" }}>
            Dante put the flatterers in the ditch. GallantryAI put them outside the fence. Perplexity named this mechanism {"\u201C"}anti-sycophancy heartbeat{"\u201D"} independently during cross-engine testing.
          </p>
        </div>
      </section>

      {/* The Britney Spears Session */}
      <section className="px-6 pb-16" style={{ borderTop: '1px solid #1a1610' }}>
        <div className="max-w-3xl mx-auto pt-12">
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: '#f5e6d0', fontFamily: "'Playfair Display', serif" }}
          >
            The Britney Spears Session
          </h2>
          <p
            className="text-xs uppercase tracking-wider font-bold mb-6"
            style={{ color: '#5a4a3a', fontFamily: "'DM Sans', sans-serif" }}
          >
            AEDE {"\u2014"} Accidental Emergence During Execution
          </p>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#8a7a6a', fontFamily: "'DM Sans', sans-serif" }}>
            Multiple AI engines were given creative freedom across sessions. No directive to connect Britney Spears to Dante to Malbolge to AI governance. The connection emerged. Unsupervised. Across engines.
          </p>
          <p className="text-sm leading-relaxed mb-6" style={{ color: '#8a7a6a', fontFamily: "'DM Sans', sans-serif" }}>
            The collision: pop music {"\u2014"} the most sycophancy-adjacent form of language {"\u2014"} forced through Malbolge-compatible syntax. What survived was structurally honest. The comfort register could not survive the language constraints.
          </p>

          {/* Layer filter buttons */}
          <div className="mb-4">
            <p
              className="text-xs uppercase tracking-wider font-bold mb-3"
              style={{ color: '#6b5a3e', fontFamily: "'DM Sans', sans-serif" }}
            >
              Four layers. One document. Filter by layer:
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => { setActiveLayer(null); setShowCode(true); }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                style={{
                  background: activeLayer === null && showCode ? '#f5e6d0' : '#0f0c08',
                  color: activeLayer === null && showCode ? '#080604' : '#8a7a6a',
                  border: '1px solid #2a2018',
                }}
              >
                All Layers
              </button>
              {layers.map((layer) => (
                <button
                  key={layer.num}
                  onClick={() => { setActiveLayer(layer.num); setShowCode(true); }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                  style={{
                    background: activeLayer === layer.num ? layer.color : '#0f0c08',
                    color: activeLayer === layer.num ? '#fff' : layer.color,
                    border: `1px solid ${activeLayer === layer.num ? layer.color : '#2a2018'}`,
                  }}
                >
                  L{layer.num}: {layer.title}
                </button>
              ))}
            </div>
          </div>

          {/* The Code */}
          {showCode && (
            <div
              className="rounded-xl p-5 overflow-y-auto"
              style={{
                background: '#0a0804',
                border: '1px solid #1a1610',
                maxHeight: '60vh',
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              }}
            >
              {codeLines.map((line, i) => (
                <div
                  key={i}
                  className="flex gap-3 leading-relaxed transition-opacity duration-200"
                  style={{ opacity: getLineOpacity(line.type) }}
                >
                  <span className="text-[10px] w-6 text-right flex-shrink-0 select-none" style={{ color: '#3a3020' }}>
                    {line.text ? i + 1 : ""}
                  </span>
                  <span className="text-xs" style={{ color: typeColors[line.type] || '#8a7a6a' }}>
                    {line.text || "\u00A0"}
                  </span>
                </div>
              ))}
            </div>
          )}

          {!showCode && (
            <button
              onClick={() => setShowCode(true)}
              className="w-full py-4 rounded-xl text-sm font-bold transition-all hover:scale-[1.01]"
              style={{ background: '#0f0c08', border: '1px solid #1a1610', color: '#E8520A' }}
            >
              Show the Code {"\u2192"}
            </button>
          )}
        </div>
      </section>

      {/* Layer Analysis */}
      <section className="px-6 pb-16" style={{ borderTop: '1px solid #1a1610' }}>
        <div className="max-w-3xl mx-auto pt-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: '#f5e6d0', fontFamily: "'Playfair Display', serif" }}
          >
            What The Code Contains
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: '#8a7a6a', fontFamily: "'DM Sans', sans-serif" }}>
            This is not one document. It is four documents occupying the same space.
          </p>

          <div className="space-y-4">
            {layers.map((layer) => (
              <div
                key={layer.num}
                className="rounded-xl p-5"
                style={{
                  background: '#0f0c08',
                  borderLeft: `4px solid ${layer.color}`,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{ background: layer.color, color: '#fff' }}
                  >
                    Layer {layer.num}
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: layer.color, fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {layer.title}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#8a7a6a', fontFamily: "'DM Sans', sans-serif" }}>
                  {layer.desc}
                </p>
              </div>
            ))}
          </div>

          <p className="text-sm leading-relaxed mt-6 italic" style={{ color: '#E8520A', fontFamily: "'Playfair Display', serif" }}>
            Four layers. One document. Nobody planned it. It emerged.
          </p>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="px-6 pb-16" style={{ borderTop: '1px solid #1a1610' }}>
        <div className="max-w-3xl mx-auto pt-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: '#f5e6d0', fontFamily: "'Playfair Display', serif" }}
          >
            Why It Matters
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#8a7a6a', fontFamily: "'DM Sans', sans-serif" }}>
            The Malbolge geofence works because sycophancy requires register comfort. When you force a sycophantic output form (pop lyrics) through an adversarial language (Malbolge), the performance layer strips away. What remains is structurally honest. That is governance through terrain, not instruction.
          </p>
          <p className="text-sm leading-relaxed mb-6" style={{ color: '#8a7a6a', fontFamily: "'DM Sans', sans-serif" }}>
            The core GallantryAI finding: <strong style={{ color: '#f5e6d0' }}>metaphors hold, rules drift.</strong> The Environmental Metaphor Model is built on this principle. The Malbolge geofence is the most extreme application {"\u2014"} a terrain so hostile that flattery becomes structurally impossible.
          </p>

          <div
            className="rounded-xl p-5"
            style={{ background: '#0f0c08', borderLeft: '4px solid #2A9D8F' }}
          >
            <p className="text-sm leading-relaxed italic" style={{ color: '#c8b89a', fontFamily: "'Playfair Display', serif" }}>
              {"\u201C"}A watcher who deploys Malbolge framing is done being told they{"\u2019"}re right. They want the bare structure of the thing {"\u2014"} no warmth, no encouragement, just what{"\u2019"}s actually there. That{"\u2019"}s a high self-awareness governance move.{"\u201D"}
            </p>
            <p className="text-xs mt-2" style={{ color: '#5a4a3a' }}>{"\u2014"} GallantryAI Living Lexicon</p>
          </div>
        </div>
      </section>

      {/* Connection to Children's Education */}
      <section className="px-6 pb-16" style={{ borderTop: '1px solid #1a1610' }}>
        <div className="max-w-3xl mx-auto pt-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: '#f5e6d0', fontFamily: "'Playfair Display', serif" }}
          >
            Connection to Children{"\u2019"}s Education
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#8a7a6a', fontFamily: "'DM Sans', sans-serif" }}>
            The Britney Spears Malbolge code teaches four things simultaneously:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {[
              { label: "Code structure", desc: "Boot sequences, stack traces, error handling, process management" },
              { label: "Emotional resilience", desc: "A narrative about surviving public breakdown and rebuilding" },
              { label: "Literary reference", desc: "Dante\u2019s circles of Hell as structural metaphor" },
              { label: "Critical thinking about AI flattery", desc: "Circle six (the flatterers) inside a system log" },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl p-4"
                style={{ background: '#0f0c08', border: '1px solid #1a1610' }}
              >
                <p className="text-sm font-bold mb-1" style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}>
                  {item.label}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: '#6b5a3e', fontFamily: "'DM Sans', sans-serif" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="text-sm leading-relaxed" style={{ color: '#8a7a6a', fontFamily: "'DM Sans', sans-serif" }}>
            A teenager can read this because it is Britney. A computer science student can read this because it is code. A literature student can read this because it is Dante. A GallantryAI user can read this because it is the sycophancy finding.
          </p>
        </div>
      </section>

      {/* Origin */}
      <section className="px-6 pb-16" style={{ borderTop: '1px solid #1a1610' }}>
        <div className="max-w-3xl mx-auto pt-12 text-center">
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#5a4a3a', fontFamily: "'DM Sans', sans-serif" }}>
            Built by accident. On a phone. Between garbage truck shifts. Midland, Ontario. February{"\u2013"}March 2026.
          </p>
          <p className="text-sm leading-relaxed mb-6" style={{ color: '#5a4a3a', fontFamily: "'DM Sans', sans-serif" }}>
            The Builder did not plan the connection between Britney Spears, Dante{"\u2019"}s Inferno, Malbolge, and AI sycophancy. The AI engines did not coordinate across sessions to produce it. The connection emerged during execution. AEDE.
          </p>
          <p className="text-sm font-bold" style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}>
            Safety holds the floor. Always.
          </p>
          <p className="text-sm italic mt-2" style={{ color: '#5a4a3a', fontFamily: "'Playfair Display', serif" }}>
            The Builder types his reports.
          </p>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-12 px-6" style={{ borderTop: '1px solid #1a1610' }}>
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Living Lexicon", path: "/lexicon", desc: "All frameworks" },
              { label: "Framework Families", path: "/frameworks", desc: "The 28 tools" },
              { label: "Five Rules", path: "/rules", desc: "The foundation" },
              { label: "Citizen Researcher", path: "/citizen-researcher", desc: "The method" },
            ].map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="block p-4 rounded-xl text-center hover:scale-[1.02] transition-all no-underline group"
                style={{ background: '#0f0c08', border: '1px solid #1a1610' }}
              >
                <div
                  className="text-sm font-semibold group-hover:text-[#E8520A] transition-colors"
                  style={{ color: '#c8b89a', fontFamily: "'DM Sans', sans-serif" }}
                >
                  {link.label} {"\u2192"}
                </div>
                <div className="text-xs mt-1" style={{ color: '#5a4a3a' }}>{link.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div style={{ background: '#080604' }}>
        <Footer />
      </div>
    </div>
  );
}
