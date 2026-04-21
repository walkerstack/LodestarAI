/*
 * GALLANTRYAI — The Five Rules (Kids Version)
 * Design: Warm white register — matching Child Lens
 * Sloth-guided. Kid language. Light theme with golden aura.
 * Each rule has a sloth image, a kid explanation, and a "try this" activity.
 * Blends into the learning flow — links back to Child Lens and forward to Prompt Games.
 */

import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LearningFlow from "@/components/LearningFlow";
import { flowMap } from "@/lib/learningFlowMap";
import { LightboxImage } from "@/components/Lightbox";
import { Link } from "wouter";
import KidsMidLink from "@/components/KidsMidLink";
import StudioBlocks from "@/components/studio/StudioBlocks";

const baseFont = "'Nunito', 'DM Sans', sans-serif";
const serifFont = "'Playfair Display', serif";

const SLOTH_RULE_IMAGES = [
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule1-safety-ZibWTCvUvmyr9rkvkdQYUS.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule2-honesty-fzboigvERMDobL9CxvH4LT.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule3-trust-EsYwo26GKz8Z8UqCYRNmqR.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule4-agency-fZSBzZsPa9u45fLFDPogwt.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule5-drift-UkM6LTwyiuRreoRnkNLPWn.webp",
];

const SLOTH_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000008840_5b1a6230.png";

const rules = [
  {
    number: 1,
    title: "Safety First",
    color: "#E8520A",
    bgColor: "#FFF5EE",
    borderColor: "#FFD4B8",
    kid: "Is it safe? If you\u2019re not sure \u2014 stop. Ask a grown-up. The sloth always stops first.",
    story: "Imagine you\u2019re walking through a forest with the sloth. You come to a bridge. The sloth holds up a paw. \u201CWait,\u201D it says. \u201CLet\u2019s check if it\u2019s safe before we cross.\u201D That\u2019s Rule 1. Before you type anything into AI, ask yourself: is this safe?",
    tryThis: "Before your next AI chat, write down what you want to ask. Then ask yourself: \u201CWould I be okay if my teacher or parent saw this?\u201D If yes \u2014 go ahead! If not \u2014 the sloth says stop.",
    slothSays: "If it doesn\u2019t feel safe, it isn\u2019t. Your tummy knows before your brain does.",
  },
  {
    number: 2,
    title: "Honesty Over Confidence",
    color: "#D97706",
    bgColor: "#FFFBEB",
    borderColor: "#FDE68A",
    kid: "Does it sound true? Or does it just sound smart? Smart-sounding is not the same as right.",
    story: "The sloth picks up a magnifying glass. \u201CLook closely,\u201D it says. \u201CJust because the AI says something in a big, confident voice doesn\u2019t mean it\u2019s true. Even grown-ups get fooled by this.\u201D",
    tryThis: "Ask AI a question you already know the answer to. Did it get it right? Now ask it something you DON\u2019T know. Can you check the answer somewhere else? That\u2019s the honesty test.",
    slothSays: "The sloth always double-checks. Even when the answer sounds really, really good.",
  },
  {
    number: 3,
    title: "Trust Is Earned",
    color: "#059669",
    bgColor: "#ECFDF5",
    borderColor: "#A7F3D0",
    kid: "Did the AI earn your trust? Or did you just give it away? Trust takes time. Even with sloths.",
    story: "The sloth is building a tower. One block at a time. \u201CSee?\u201D it says. \u201CTrust is like this tower. You build it slowly. If someone knocks it down, you start again. You don\u2019t just hand someone your tower.\u201D",
    tryThis: "Use AI three times this week. After each time, give it a trust score from 1 to 5. Was it helpful? Was it honest? Did it make stuff up? Write it down. That\u2019s how you build trust \u2014 by paying attention.",
    slothSays: "Trust is a ladder. You climb it one rung at a time. There are no elevators.",
  },
  {
    number: 4,
    title: "You\u2019re the Boss",
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    borderColor: "#DDD6FE",
    kid: "You\u2019re in charge. The AI helps. You decide. If the AI starts leading \u2014 take the wheel back.",
    story: "The sloth grabs the steering wheel. \u201CThis is YOUR ship,\u201D it says. \u201CThe AI is the map. But YOU decide where to go. If the map says \u2018turn left\u2019 and you know the road goes right \u2014 trust yourself.\u201D",
    tryThis: "Next time AI gives you an answer, don\u2019t just say \u201Cokay.\u201D Ask yourself: \u201CIs this what I actually wanted?\u201D If not, tell the AI: \u201CThat\u2019s not what I meant. Let me try again.\u201D YOU are the boss.",
    slothSays: "If the AI is driving and you\u2019re just watching \u2014 who\u2019s really in charge?",
  },
  {
    number: 5,
    title: "Notice the Drift",
    color: "#2563EB",
    bgColor: "#EFF6FF",
    borderColor: "#BFDBFE",
    kid: "If the AI starts going weird \u2014 say so. Don\u2019t just follow it. Come back to the path.",
    story: "The sloth holds up a compass. \u201CSometimes,\u201D it says, \u201Cyou start walking one way and end up somewhere totally different. That\u2019s drift. It\u2019s not bad \u2014 but you have to notice it. Then you can choose: keep going, or come back.\u201D",
    tryThis: "Start an AI chat about one topic. After 5 messages, check: are you still talking about the same thing? If not \u2014 you found drift! Say: \u201CWe drifted. Let\u2019s go back.\u201D Congratulations. You just governed yourself.",
    slothSays: "The moment you notice the drift is the moment you\u2019re back in control. Noticing IS the superpower.",
  },
];

export default function ChildFiveRules() {
  const [expandedRule, setExpandedRule] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FFFDF8", fontFamily: baseFont }}>
      <Nav />

      {/* Hero — warm gradient matching Child Lens */}
      <section
        className="relative w-full py-16 px-6 text-center overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, #1A1A2E 0%, #E8520A 30%, #FFF8EE 100%)",
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
            background: "radial-gradient(circle, rgba(255,215,0,0.2) 0%, rgba(232,82,10,0.1) 40%, transparent 70%)",
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
            The Five Rules
          </h1>
          <p
            className="text-lg mb-6"
            style={{ color: "#FFF0D8", fontWeight: 500, lineHeight: 1.7 }}
          >
            Five things to remember every time you talk to AI.
            <br />
            The sloth teaches them. You practice them. Together.
          </p>

          {/* Sloth image */}
          <div className="flex justify-center">
            <div
              className="w-32 h-32 md:w-40 md:h-40 overflow-hidden"
              style={{
                filter: "drop-shadow(0 0 25px rgba(232,82,10,0.35)) drop-shadow(0 0 50px rgba(255,215,0,0.2))",
              }}
            >
              <img
                src={SLOTH_URL}
                alt="The GallantryAI Sloth — your guide to the Five Rules"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <p
            className="mt-4 text-sm italic"
            style={{ color: "#FFF0D8", fontFamily: serifFont }}
          >
            &ldquo;Slow down. Think first. You&rsquo;re in charge.&rdquo; &mdash; The Sloth
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-10 px-6" style={{ background: "#FFFDF8" }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-base leading-relaxed" style={{ color: "#5a4a3a" }}>
            These are the same five rules the grown-ups use. But the sloth is going to explain them
            in a way that makes sense for <strong style={{ color: "#E8520A" }}>you</strong>.
            Tap any rule to hear the sloth&rsquo;s story.
          </p>
        </div>
      </section>

      {/* The Five Rules — Cards */}
      <section className="py-6 px-6" style={{ background: "#FFFDF8" }}>
        <div className="max-w-2xl mx-auto space-y-5">
          {rules.map((rule, i) => (
            <div key={i}>
              {/* Rule card */}
              <button
                onClick={() => {
                  const next = expandedRule === i ? null : i;
                  setExpandedRule(next);
                  if (next !== null) {
                    setTimeout(() => {
                      document.getElementById(`kid-rule-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 80);
                  }
                }}
                id={`kid-rule-${i}`}
                className="w-full text-left rounded-3xl p-5 md:p-6 transition-all hover:scale-[1.01]"
                style={{
                  background: expandedRule === i ? rule.bgColor : "#fff",
                  border: expandedRule === i ? `3px solid ${rule.color}` : `2px solid ${rule.borderColor}`,
                  boxShadow: expandedRule === i
                    ? `0 4px 24px ${rule.color}20`
                    : "0 2px 8px rgba(0,0,0,0.04)",
                  scrollMarginTop: "80px",
                }}
              >
                <div className="flex items-center gap-4">
                  {/* Number badge */}
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-black"
                    style={{ background: rule.color }}
                  >
                    {rule.number}
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-lg font-black mb-1"
                      style={{ color: rule.color, fontFamily: serifFont }}
                    >
                      {rule.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#5a4a3a" }}>
                      {rule.kid}
                    </p>
                  </div>
                  <span
                    className="text-xl transition-transform duration-200 flex-shrink-0"
                    style={{
                      color: rule.color,
                      transform: expandedRule === i ? "rotate(90deg)" : "rotate(0deg)",
                    }}
                  >
                    &rarr;
                  </span>
                </div>
              </button>

              {/* Expanded content */}
              {expandedRule === i && (
                <div
                  className="mt-3 rounded-3xl p-5 md:p-6"
                  style={{
                    background: rule.bgColor,
                    border: `2px solid ${rule.borderColor}`,
                    animation: "fadeUp 0.3s ease-out",
                  }}
                >
                  {/* Sloth image */}
                  <div className="flex justify-center mb-5">
                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden" style={{ boxShadow: `0 4px 24px ${rule.color}20` }}>
                      <LightboxImage
                        src={SLOTH_RULE_IMAGES[i]}
                        alt={`The sloth teaches Rule ${rule.number}: ${rule.title}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* The Story */}
                  <div className="mb-5">
                    <div
                      className="text-[10px] uppercase tracking-widest font-bold mb-2"
                      style={{ color: rule.color }}
                    >
                      The Sloth&rsquo;s Story
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "#3a2a1a", lineHeight: 1.8 }}>
                      {rule.story}
                    </p>
                  </div>

                  {/* Try This */}
                  <div
                    className="rounded-2xl p-4 mb-5"
                    style={{ background: "#fff", border: `2px dashed ${rule.color}40` }}
                  >
                    <div
                      className="text-[10px] uppercase tracking-widest font-bold mb-2"
                      style={{ color: rule.color }}
                    >
                      Try This!
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "#3a2a1a", lineHeight: 1.8 }}>
                      {rule.tryThis}
                    </p>
                  </div>

                  {/* Sloth Says */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden" style={{ border: `2px solid ${rule.color}` }}>
                      <img src={SLOTH_URL} alt="Sloth" className="w-full h-full object-contain" />
                    </div>
                    <div
                      className="rounded-2xl p-3 flex-1"
                      style={{ background: `${rule.color}10`, border: `1px solid ${rule.color}30` }}
                    >
                      <p className="text-sm italic leading-relaxed" style={{ color: rule.color, fontFamily: serifFont }}>
                        &ldquo;{rule.slothSays}&rdquo;
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

      {/* Self-Reflection Prompts */}
      <section className="py-12 px-6" style={{ background: "#FFF8EE" }}>
        <div className="max-w-2xl mx-auto">
          <div
            className="text-xs uppercase tracking-widest text-center mb-2 font-semibold"
            style={{ color: "#E8520A" }}
          >
            Before You Start
          </div>
          <h2
            className="text-2xl font-black text-center mb-2"
            style={{ fontFamily: serifFont, color: "#1A1A2E" }}
          >
            Ask Yourself These Questions
          </h2>
          <p className="text-sm text-center mb-8" style={{ color: "#7a6a5a" }}>
            The sloth asks these every time. Now it&rsquo;s your turn.
          </p>

          <div className="space-y-3">
            {[
              { q: "How am I feeling right now?", hint: "Your mood changes how you use AI. Check in with yourself first." },
              { q: "What do I actually want to know?", hint: "Not what sounds cool. What matters to you right now." },
              { q: "Who did I ask the AI to be?", hint: "Did you set rules? Or did you just start typing?" },
              { q: "Am I asking a real question or hoping for a specific answer?", hint: "There\u2019s a difference. Honest questions get honest answers." },
              { q: "Did I stay in charge?", hint: "The AI helps. You decide. Always." },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl p-4"
                style={{ background: "#fff", border: "2px solid #F5D9B0" }}
              >
                <p className="font-bold text-sm mb-1" style={{ color: "#1A1A2E" }}>{item.q}</p>
                <p className="text-xs" style={{ color: "#7a6a5a" }}>{item.hint}</p>
              </div>
            ))}
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
            <Link href="/for/child" className="block no-underline">
              <div
                className="rounded-2xl p-5 text-center transition-all hover:scale-[1.03]"
                style={{ background: "#FFF5EE", border: "2px solid #FFD4B8" }}
              >
                <div className="text-3xl mb-2">🦥</div>
                <div className="font-bold text-sm mb-1" style={{ color: "#E8520A" }}>Children&rsquo;s Page</div>
                <p className="text-xs" style={{ color: "#7a6a5a" }}>The sloth&rsquo;s home base. Stories, games, and more.</p>
              </div>
            </Link>
            <Link href="/prompt-games" className="block no-underline">
              <div
                className="rounded-2xl p-5 text-center transition-all hover:scale-[1.03]"
                style={{ background: "#F5F3FF", border: "2px solid #DDD6FE" }}
              >
                <div className="text-3xl mb-2">🎮</div>
                <div className="font-bold text-sm mb-1" style={{ color: "#7C3AED" }}>Prompt Games</div>
                <p className="text-xs" style={{ color: "#7a6a5a" }}>Practice the rules by playing. Learn by doing.</p>
              </div>
            </Link>
            <Link href="/rules" className="block no-underline">
              <div
                className="rounded-2xl p-5 text-center transition-all hover:scale-[1.03]"
                style={{ background: "#ECFDF5", border: "2px solid #A7F3D0" }}
              >
                <div className="text-3xl mb-2">📋</div>
                <div className="font-bold text-sm mb-1" style={{ color: "#059669" }}>Grown-Up Version</div>
                <p className="text-xs" style={{ color: "#7a6a5a" }}>Ready for more detail? See the full Five Rules.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Learning Flow */}
      <section className="py-10 px-6" style={{ background: "#FFF8EE" }}>
        <div className="max-w-4xl mx-auto">
          <LearningFlow
            current="The Five Rules (Kids)"
            deeper={[
              { label: "Prompt Games", href: "/prompt-games", description: "Practice the rules by playing" },
              { label: "Road Protocol", href: "/road-protocol", description: "How grown-ups set up AI sessions" },
            ]}
            wider={[
              { label: "Children's Page", href: "/for/child", description: "The sloth's home base" },
              { label: "Kids Learn", href: "/kids-learn", description: "More learning with the sloth" },
            ]}
            simpler={[
              { label: "The Five Rules (Grown-Up)", href: "/rules", description: "The full version with more detail" },
              { label: "Flower Presets", href: "/flower-presets", description: "Safety settings you can copy" },
            ]}
          />
        </div>
      </section>

      <div style={{ background: "#FFFDF8" }}>
        <StudioBlocks pageSlug="for-child-rules" />
      <Footer />
      </div>
    </div>
  );
}
