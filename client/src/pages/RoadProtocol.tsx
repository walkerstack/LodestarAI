/*
 * THE ROAD PROTOCOL — The Vault
 * Design: Dark/code register. The IP. Governance in ghost code.
 * The child prompt sits inside this vault (as the Wig Check quiz).
 * The actual working prompt stays private.
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { LightboxImage } from "@/components/Lightbox";
import { Link } from "wouter";
import { useEffect, useState } from "react";

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

export default function RoadProtocol() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <Nav />

      {/* Hero */}
      <section className="py-24 md:py-36">
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

      {/* The Ghost Code */}
      <section className="py-16 md:py-20">
        <div className="container max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-[#FAF6EF] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Ghost Code
          </h2>

          <div className="rounded-xl bg-[#111] border border-[#2a2a2a] p-6 md:p-8 font-mono text-sm leading-loose overflow-x-auto">
            <div className="text-[#555]">{"// road_protocol.c"}</div>
            <div className="text-[#555]">{"// Ghost Code — Governance Layer"}</div>
            <div className="text-[#555]">{"// The computer skips these lines."}</div>
            <div className="text-[#555]">{"// The AI reads them."}</div>
            <div className="text-[#555]">{"// The human keeps them."}</div>
            <div className="mt-4" />
            <div className="text-[#E8520A]">{"// RULE 1: Safety first."}</div>
            <div className="text-[#888]">{"//   Nothing moves without it."}</div>
            <div className="mt-2" />
            <div className="text-[#E8520A]">{"// RULE 2: Honesty over confidence."}</div>
            <div className="text-[#888]">{"//   Clarity beats sounding right."}</div>
            <div className="mt-2" />
            <div className="text-[#E8520A]">{"// RULE 3: Trust is earned."}</div>
            <div className="text-[#888]">{"//   Never assumed."}</div>
            <div className="mt-2" />
            <div className="text-[#E8520A]">{"// RULE 4: Agency stays with the human."}</div>
            <div className="text-[#888]">{"//   Always."}</div>
            <div className="mt-2" />
            <div className="text-[#E8520A]">{"// RULE 5: Name drift. Correct it."}</div>
            <div className="text-[#888]">{"//   Keep the loop open."}</div>
            <div className="mt-6" />
            <div className="text-[#555]">{"// The road is just a really long comment."}</div>
            <div className="text-[#555]">{"// Drive it like you wrote it."}</div>
          </div>

          <p className="text-sm text-[#555] mt-6 italic text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            This is not code that runs. It is code that governs.
          </p>
        </div>
      </section>

      {/* The Buffalo Protocol — Wisdom Path */}
      <section className="py-16 md:py-20">
        <div className="container max-w-3xl mx-auto px-6">
          <div className="text-center mb-6">
            <p className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              The Buffalo Protocol
            </p>
            <h2 className="text-2xl font-bold text-[#FAF6EF] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Is it a Story or a Question?
            </h2>
            <p className="text-sm text-[#888] max-w-lg mx-auto mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              "Buffalo buffalo Buffalo buffalo buffalo buffalo Buffalo buffalo." Same word. Eight meanings. Structure creates meaning — not individual words. Know the session rules. Stay in charge.
            </p>
          </div>

          {/* The Buffalo Story */}
          <div
            className="mt-12 rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0f1a0f 0%, #1a1a10 50%, #0f0f1a 100%)",
              border: "1px solid #2a3a2a",
              boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
            }}
          >
            {/* Story illustration — video */}
            <video
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/AQM8wS_XwUNuRM9ZP3pJ7IEbnpU4JUC0eE4ZX7__CK9ApLo29meEEiarsCAv9ZTBeKWms3KUhlaiAjUGZl09sWZw7kXTOHftGMj5d2hFyuNI9cHtiKqOOzBbINa0imBF_9d420233.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full rounded-2xl"
            />

            <div className="px-6 md:px-10 py-8 md:py-10">
              <h3
                className="text-xl md:text-2xl font-bold text-[#E8520A] mb-2 text-center"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                The Buffalo in the Forest of Data
              </h3>
              <p className="text-xs text-[#666] text-center mb-8 italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                A story for the Wisdom Path
              </p>

              <div className="space-y-4 text-[0.95rem] leading-[1.85] text-[#c8bfb0]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <p>Once upon a time, in a forest where the trees were made of data and the leaves were made of words, there lived a buffalo.</p>
                <p>He was not the fastest animal in the forest. He was not the cleverest. But he was the most <em>careful</em>.</p>
                <p>Every morning, the buffalo put on his wig — a big, curly, white judge's wig — and walked the same path through the trees. Other animals laughed. "Why the wig?" they asked. "You're a buffalo, not a judge."</p>
                <p>The buffalo smiled. <span className="text-[#E8520A]">"The wig reminds me,"</span> he said. <span className="text-[#E8520A]">"Every conversation has rules. Every path has signs. And someone has to read them."</span></p>
                <p>The forest was full of paths. Some glowed golden and had signs along the way: <strong className="text-[#FAF6EF]">Ask First. Stay Honest. Stay in Charge.</strong> These paths were safe. They led somewhere real.</p>
                <p>But other paths had no signs at all. They sparkled and hummed and promised everything. <em>"This way to all the answers!"</em> they whispered. <em>"No rules needed!"</em></p>
                <p>The buffalo never took those paths. Not because he was afraid. Because he had learned something the other animals hadn't:</p>
                <p className="text-center text-lg font-bold text-[#FAF6EF] py-3" style={{ fontFamily: "'Playfair Display', serif" }}>A path without signs isn't a shortcut. It's a guess.</p>
                <p>One day, a small sloth sat at the edge of the forest, staring at two paths. One had signs. One had sparkles.</p>
                <p>"Which one do I take?" the sloth asked.</p>
                <p>The buffalo sat down beside her. <span className="text-[#E8520A]">"What do you actually want to know?"</span> he asked.</p>
                <p>The sloth thought. "I want to know if the stars are real."</p>
                <p>"Good question," said the buffalo. "Now — are you asking because you want to know? Or because you want someone to <em>tell you</em> they are?"</p>
                <p>The sloth blinked. "I... I want to actually know."</p>
                <p><span className="text-[#E8520A]">"Then take the path with signs,"</span> said the buffalo. <span className="text-[#E8520A]">"It's slower. But the answer at the end will be yours."</span></p>
                <p>The sloth looked at the wig. "Can I get one of those?"</p>
                <p>The buffalo laughed — a deep, warm, rumbling laugh that shook the data-leaves from the trees.</p>
                <p>"You don't need a wig," he said. "You just need to remember three things."</p>
                <p>He pointed to the signs along the golden path:</p>
              </div>

              {/* Three signs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                {[
                  { sign: "Ask First", desc: "Before you type anything, know what you actually want to know." },
                  { sign: "Stay Honest", desc: "If the answer doesn't feel right, say so. You're allowed to disagree." },
                  { sign: "Stay in Charge", desc: "The path helps. The signs help. But you decide where you're going." },
                ].map((s) => (
                  <div
                    key={s.sign}
                    className="rounded-2xl p-5 text-center"
                    style={{ background: "rgba(232, 82, 10, 0.08)", border: "1px solid #3a2a1a" }}
                  >
                    <div className="font-bold text-[#E8520A] text-sm mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{s.sign}</div>
                    <p className="text-xs text-[#999]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.desc}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 text-[0.95rem] leading-[1.85] text-[#c8bfb0]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <p>The sloth nodded, took a deep breath, and stepped onto the golden path.</p>
                <p>The buffalo watched her go. Then he adjusted his wig, and walked on.</p>
              </div>

              <div className="mt-8 pt-6 text-center" style={{ borderTop: "1px solid #2a2018" }}>
                <p className="text-sm italic text-[#888]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  The forest is always there. The paths are always open. The signs don't move.<br />
                  But someone has to choose to read them.
                </p>
                <p className="text-xs text-[#555] mt-3">— The Buffalo Protocol</p>
              </div>

              {/* Cross-links to children & teachers */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/for/child"
                  className="px-6 py-3 rounded-xl text-sm font-bold text-center transition-all hover:scale-[1.02]"
                  style={{ background: "#E8520A", color: "#fff" }}
                >
                  Read this with a child →
                </Link>
                <Link
                  href="/prompt-games"
                  className="px-6 py-3 rounded-xl text-sm font-bold text-center transition-all hover:scale-[1.02]"
                  style={{ background: "transparent", color: "#E8520A", border: "1px solid #E8520A" }}
                >
                  Teaching Tools & Games →
                </Link>
              </div>
            </div>
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
                className="block p-4 rounded-xl border border-[#333] bg-[#111] text-center text-sm text-[#b0a898] hover:border-[#E8520A]/50 hover:text-[#FAF6EF] transition-all no-underline"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
