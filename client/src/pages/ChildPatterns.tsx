/*
 * GALLANTRYAI — What Are Patterns? (Kids Version)
 * Design: Warm white register — matching Child Lens / Child Five Rules
 * Sloth-guided. Kid language. Light theme with golden aura.
 * Teaches kids what patterns are, how to spot them, and why they matter with AI.
 */

import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LearningFlow from "@/components/LearningFlow";
import { Link } from "wouter";
import KidsMidLink from "@/components/KidsMidLink";

const baseFont = "'Nunito', 'DM Sans', sans-serif";
const serifFont = "'Playfair Display', serif";

const SLOTH_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000008840_5b1a6230.png";

const patterns = [
  {
    title: "Patterns in Nature",
    color: "#059669",
    bgColor: "#ECFDF5",
    borderColor: "#A7F3D0",
    emoji: "\u{1F33B}",
    kid: "Sunflowers grow in spirals. Zebras have stripes. Snowflakes have six sides. Nature is FULL of patterns. Once you see them, you can\u2019t unsee them.",
    tryThis: "Go outside (or look out a window). Can you find 3 patterns? Maybe the way leaves grow on a branch, or how clouds repeat shapes, or how bricks stack in a wall. Write them down!",
    slothSays: "Patterns are everywhere. The sloth sees them in the trees, in the stars, and in the way you ask questions.",
  },
  {
    title: "Patterns in Your Day",
    color: "#D97706",
    bgColor: "#FFFBEB",
    borderColor: "#FDE68A",
    emoji: "\u{1F305}",
    kid: "You wake up. You eat breakfast. You go to school. That\u2019s a pattern! Your whole day is made of patterns. Some you chose. Some just happened.",
    tryThis: "Write down what you did this morning in order. Now write down what you did YESTERDAY morning. How much is the same? That\u2019s your morning pattern. You made it without even trying!",
    slothSays: "The sloth\u2019s pattern is: wake up, stretch, eat leaves, think slowly, nap. Every single day. And it works!",
  },
  {
    title: "Patterns in Words",
    color: "#E8520A",
    bgColor: "#FFF5EE",
    borderColor: "#FFD4B8",
    emoji: "\u{1F4AC}",
    kid: "When you talk to AI, you use words. And words have patterns too! If you always start with \u201Ctell me about...\u201D you\u2019ll get one kind of answer. If you start with \u201Chelp me think about...\u201D you\u2019ll get a totally different one.",
    tryThis: "Ask AI the same question two different ways. First: \u201CTell me about dogs.\u201D Then: \u201CHelp me think about why dogs are good friends.\u201D See how the answers are different? That\u2019s because your word pattern changed!",
    slothSays: "The words you choose are like a steering wheel. Different words, different direction. Same road.",
  },
  {
    title: "Patterns in AI",
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    borderColor: "#DDD6FE",
    emoji: "\u{1F916}",
    kid: "AI is basically a giant pattern machine. It learned from billions of words and figured out which words usually come next. That\u2019s how it talks. It doesn\u2019t \u201Cknow\u201D things \u2014 it predicts patterns.",
    tryThis: "Start a sentence and let AI finish it. Then start the SAME sentence and ask it to finish it again. Did it say the same thing? Probably not exactly! That\u2019s because it\u2019s picking from patterns, not remembering.",
    slothSays: "AI sees patterns in words the way you see patterns in clouds. It\u2019s guessing shapes. Sometimes it\u2019s right. Sometimes it sees a dragon that isn\u2019t there.",
  },
  {
    title: "Patterns in YOU",
    color: "#2563EB",
    bgColor: "#EFF6FF",
    borderColor: "#BFDBFE",
    emoji: "\u{1F9E0}",
    kid: "Here\u2019s the big one. YOU have patterns too. Maybe you always believe the first answer. Maybe you always ask the same kind of question. Maybe you stop checking after a while. Noticing YOUR patterns is the real superpower.",
    tryThis: "After your next 3 AI chats, ask yourself: \u201CDid I check the answer? Did I stay in charge? Did I drift?\u201D Write down what you notice about yourself. That\u2019s YOUR pattern. And now you can change it if you want to.",
    slothSays: "The most important pattern to notice is your own. That\u2019s what the Watcher does. The Watcher watches YOU \u2014 not the AI.",
  },
];

export default function ChildPatterns() {
  const [expandedPattern, setExpandedPattern] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FFFDF8", fontFamily: baseFont }}>
      <Nav />

      {/* Hero */}
      <section
        className="relative w-full py-16 px-6 text-center overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, #1A1A2E 0%, #7C3AED 30%, #FFF8EE 100%)",
        }}
      >
        {/* Golden aura */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, rgba(255,215,0,0.1) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative max-w-2xl mx-auto">
          <div
            className="text-xs uppercase tracking-widest mb-3 font-semibold"
            style={{ color: "#FFF8EE", opacity: 0.8 }}
          >
            The Sloth&rsquo;s Guide
          </div>
          <h1
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ fontFamily: serifFont, color: "#FFFDF8", lineHeight: 1.2 }}
          >
            What Are Patterns?
          </h1>
          <p
            className="text-lg mb-6"
            style={{ color: "#FFF0D8", fontWeight: 500, lineHeight: 1.7 }}
          >
            Patterns are everywhere. In nature. In your day. In your words.
            <br />
            And inside every AI. The sloth will show you.
          </p>

          {/* Sloth image */}
          <div className="flex justify-center">
            <div
              className="w-32 h-32 md:w-40 md:h-40 overflow-hidden"
              style={{
                filter: "drop-shadow(0 0 25px rgba(124,58,237,0.35)) drop-shadow(0 0 50px rgba(255,215,0,0.2))",
              }}
            >
              <img
                src={SLOTH_URL}
                alt="The GallantryAI Sloth — your guide to patterns"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <p
            className="mt-4 text-sm italic"
            style={{ color: "#FFF0D8", fontFamily: serifFont }}
          >
            &ldquo;A pattern is something that repeats. Once you see it, you can&rsquo;t unsee it.&rdquo; &mdash; The Sloth
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-10 px-6" style={{ background: "#FFFDF8" }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-base leading-relaxed" style={{ color: "#5a4a3a" }}>
            Everything in the world has patterns. The way trees grow. The way you talk. The way AI answers your questions.
            When you learn to <strong style={{ color: "#7C3AED" }}>see patterns</strong>, you start to understand
            how things work &mdash; and how to stay in charge.
          </p>
        </div>
      </section>

      {/* Pattern Cards */}
      <section className="py-6 px-6" style={{ background: "#FFFDF8" }}>
        <div className="max-w-2xl mx-auto space-y-5">
          {patterns.map((p, i) => (
            <div key={i}>
              <button
                onClick={() => {
                  const next = expandedPattern === i ? null : i;
                  setExpandedPattern(next);
                  if (next !== null) {
                    setTimeout(() => {
                      document.getElementById(`pattern-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 80);
                  }
                }}
                id={`pattern-${i}`}
                className="w-full text-left rounded-3xl p-5 md:p-6 transition-all hover:scale-[1.01]"
                style={{
                  background: expandedPattern === i ? p.bgColor : "#fff",
                  border: expandedPattern === i ? `3px solid ${p.color}` : `2px solid ${p.borderColor}`,
                  boxShadow: expandedPattern === i
                    ? `0 4px 24px ${p.color}20`
                    : "0 2px 8px rgba(0,0,0,0.04)",
                  scrollMarginTop: "80px",
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                    style={{ background: p.bgColor, border: `2px solid ${p.borderColor}` }}
                  >
                    {p.emoji}
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-lg font-black mb-1"
                      style={{ color: p.color, fontFamily: serifFont }}
                    >
                      {p.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#5a4a3a" }}>
                      {p.kid}
                    </p>
                  </div>
                  <span
                    className="text-xl transition-transform duration-200 flex-shrink-0"
                    style={{
                      color: p.color,
                      transform: expandedPattern === i ? "rotate(90deg)" : "rotate(0deg)",
                    }}
                  >
                    &rarr;
                  </span>
                </div>
              </button>

              {/* Expanded content */}
              {expandedPattern === i && (
                <div
                  className="mt-3 rounded-3xl p-5 md:p-6"
                  style={{
                    background: p.bgColor,
                    border: `2px solid ${p.borderColor}`,
                    animation: "fadeUp 0.3s ease-out",
                  }}
                >
                  {/* Try This */}
                  <div
                    className="rounded-2xl p-4 mb-5"
                    style={{ background: "#fff", border: `2px dashed ${p.color}40` }}
                  >
                    <div
                      className="text-[10px] uppercase tracking-widest font-bold mb-2"
                      style={{ color: p.color }}
                    >
                      Try This!
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "#3a2a1a", lineHeight: 1.8 }}>
                      {p.tryThis}
                    </p>
                  </div>

                  {/* Sloth Says */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden" style={{ border: `2px solid ${p.color}` }}>
                      <img src={SLOTH_URL} alt="Sloth" className="w-full h-full object-contain" />
                    </div>
                    <div
                      className="rounded-2xl p-3 flex-1"
                      style={{ background: `${p.color}10`, border: `1px solid ${p.color}30` }}
                    >
                      <p className="text-sm italic leading-relaxed" style={{ color: p.color, fontFamily: serifFont }}>
                        &ldquo;{p.slothSays}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* KidsMidLink */}
      <KidsMidLink />

      {/* The Big Idea */}
      <section className="py-12 px-6" style={{ background: "#FFF8EE" }}>
        <div className="max-w-2xl mx-auto text-center">
          <div
            className="text-xs uppercase tracking-widest mb-2 font-semibold"
            style={{ color: "#7C3AED" }}
          >
            The Big Idea
          </div>
          <h2
            className="text-2xl font-black mb-4"
            style={{ fontFamily: serifFont, color: "#1A1A2E" }}
          >
            Why Patterns Matter
          </h2>
          <div
            className="rounded-3xl p-6 text-left"
            style={{ background: "#fff", border: "2px solid #DDD6FE" }}
          >
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#3a2a1a", lineHeight: 1.8 }}>
              AI is a pattern machine. It learned patterns from billions of words. When you type something,
              it guesses what comes next based on those patterns.
            </p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#3a2a1a", lineHeight: 1.8 }}>
              But here&rsquo;s the thing: <strong style={{ color: "#7C3AED" }}>you have patterns too.</strong> The way
              you ask questions. The way you trust answers. The way you drift without noticing.
            </p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#3a2a1a", lineHeight: 1.8 }}>
              When you learn to see <em>both</em> patterns &mdash; the AI&rsquo;s and yours &mdash; that&rsquo;s
              when you become the person in charge. Not the AI. <strong style={{ color: "#E8520A" }}>You.</strong>
            </p>
            <div className="flex items-start gap-3 mt-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden" style={{ border: "2px solid #7C3AED" }}>
                <img src={SLOTH_URL} alt="Sloth" className="w-full h-full object-contain" />
              </div>
              <div
                className="rounded-2xl p-3 flex-1"
                style={{ background: "#F5F3FF", border: "1px solid #DDD6FE" }}
              >
                <p className="text-sm italic leading-relaxed" style={{ color: "#7C3AED", fontFamily: serifFont }}>
                  &ldquo;The AI sees patterns in words. You see patterns in everything. That makes you smarter than any machine.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Where to Go Next */}
      <section className="py-12 px-6" style={{ background: "#FFFDF8" }}>
        <div className="max-w-2xl mx-auto text-center">
          <div
            className="text-xs uppercase tracking-widest mb-2 font-semibold"
            style={{ color: "#E8520A" }}
          >
            Keep Going
          </div>
          <h2
            className="text-2xl font-black mb-6"
            style={{ fontFamily: serifFont, color: "#1A1A2E" }}
          >
            Where to Go Next
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/for/child/rules" className="block no-underline">
              <div
                className="rounded-2xl p-5 text-center transition-all hover:scale-[1.03]"
                style={{ background: "#FFF5EE", border: "2px solid #FFD4B8" }}
              >
                <div className="text-3xl mb-2">{"\u{1F6E1}\u{FE0F}"}</div>
                <div className="font-bold text-sm mb-1" style={{ color: "#E8520A" }}>The Five Rules</div>
                <p className="text-xs" style={{ color: "#7a6a5a" }}>The sloth&rsquo;s guide to staying safe with AI.</p>
              </div>
            </Link>
            <Link href="/prompt-games" className="block no-underline">
              <div
                className="rounded-2xl p-5 text-center transition-all hover:scale-[1.03]"
                style={{ background: "#F5F3FF", border: "2px solid #DDD6FE" }}
              >
                <div className="text-3xl mb-2">{"\u{1F3AE}"}</div>
                <div className="font-bold text-sm mb-1" style={{ color: "#7C3AED" }}>Prompt Games</div>
                <p className="text-xs" style={{ color: "#7a6a5a" }}>Practice spotting patterns by playing.</p>
              </div>
            </Link>
            <Link href="/for/child" className="block no-underline">
              <div
                className="rounded-2xl p-5 text-center transition-all hover:scale-[1.03]"
                style={{ background: "#ECFDF5", border: "2px solid #A7F3D0" }}
              >
                <div className="text-3xl mb-2">{"\u{1F9A5}"}</div>
                <div className="font-bold text-sm mb-1" style={{ color: "#059669" }}>Children&rsquo;s Page</div>
                <p className="text-xs" style={{ color: "#7a6a5a" }}>The sloth&rsquo;s home base. Stories, games, and more.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Learning Flow */}
      <section className="py-10 px-6" style={{ background: "#FFF8EE" }}>
        <div className="max-w-4xl mx-auto">
          <LearningFlow
            current="What Are Patterns? (Kids)"
            deeper={[
              { label: "Prompt Games", href: "/prompt-games", description: "Practice spotting patterns by playing" },
              { label: "The Five Rules (Kids)", href: "/for/child/rules", description: "The foundation of every AI session" },
            ]}
            wider={[
              { label: "Children's Page", href: "/for/child", description: "The sloth's home base" },
              { label: "Kids Learn", href: "/kids-learn", description: "More learning with the sloth" },
            ]}
            simpler={[
              { label: "Living Lexicon", href: "/lexicon", description: "Words that help you name what's happening" },
              { label: "Promptolinguistics", href: "/promptolinguistics", description: "How words control AI sessions" },
            ]}
          />
        </div>
      </section>

      <div style={{ background: "#FFFDF8" }}>
        <Footer />
      </div>
    </div>
  );
}
