/*
 * GALLANTRYAI — Child Lens Page
 * Design: Warm white register — purity, honesty, wonder
 * White background flowing from dark/orange brand.
 * Sloth is the guide. Words are magic. Slow down, think first.
 * Barney poem is the ENTRY STORY — first thing visitors see after hero.
 * Framed as: "how you can use Barney or silly things to make sure AI is paying attention"
 */

import { useState, useCallback } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LearningFlow from "@/components/LearningFlow";
import { flowMap } from "@/lib/learningFlowMap";
import { LightboxImage } from "@/components/Lightbox";
import { Link } from "wouter";

const FIELD_GUIDE_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000008840_5b1a6230.png";

const SLOTH_RULE_IMAGES = [
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule1-safety-ZibWTCvUvmyr9rkvkdQYUS.webp", label: "Safety First" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule2-honesty-fzboigvERMDobL9CxvH4LT.webp", label: "Honesty Over Confidence" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule3-trust-EsYwo26GKz8Z8UqCYRNmqR.webp", label: "Trust Is Earned" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule4-agency-fZSBzZsPa9u45fLFDPogwt.webp", label: "You're the Boss" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule5-drift-UkM6LTwyiuRreoRnkNLPWn.webp", label: "Notice the Drift" },
];

const IMGS = {
  fieldGuideCover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000008740_d2ac3f98.png",
  slothTrick: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000008728_a5deb072.png",
  remember: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000008721_99c2f0db.png",
  whatCanYouDo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000008720_800863cc.png",
  familyLantern: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000008706_916d1099.png",
};

const baseFont = "'Nunito', 'DM Sans', sans-serif";
const serifFont = "'Playfair Display', serif";

const GUIDE_PAGES = [
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/page-1_40c2804f.png", alt: "Field Guide — Cover" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/page-2_6c2949be.png", alt: "Field Guide — Page 2" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/page-3_7b40bcaa.png", alt: "Field Guide — Page 3" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/page-4_947fa3d8.png", alt: "Field Guide — Page 4" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/page-5_a2775178.png", alt: "Field Guide — Page 5" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/page-6_b2b0980f.png", alt: "Field Guide — Page 6" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/page-7_25e2bca4.png", alt: "Field Guide — Page 7" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/page-8_e6955dc9.png", alt: "Field Guide — Page 8" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/page9-compressed_2d193f63.png", alt: "Field Guide — Page 9" },
];

function FieldGuideCarousel() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const total = GUIDE_PAGES.length;

  const go = useCallback((i: number) => { setCurrent(i); setAnimKey((k) => k + 1); }, []);
  const prev = useCallback(() => go(current === 0 ? total - 1 : current - 1), [current, total, go]);
  const next = useCallback(() => go(current === total - 1 ? 0 : current + 1), [current, total, go]);

  return (
    <div className="w-full">
      {/* Slide */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ background: "#1A1A2E" }}>
        <img
          key={animKey}
          src={GUIDE_PAGES[current].src}
          alt={GUIDE_PAGES[current].alt}
          className="w-full"
          style={{
            display: "block",
            animation: "storyFadeIn 0.8s ease-out, storyBreathe 4s ease-in-out 0.8s infinite",
          }}
        />

        {/* Prev / Next arrows */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold transition-all hover:scale-110"
          style={{ background: "rgba(26,26,46,0.7)", backdropFilter: "blur(4px)" }}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold transition-all hover:scale-110"
          style={{ background: "rgba(26,26,46,0.7)", backdropFilter: "blur(4px)" }}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>

      {/* Dots + counter */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {GUIDE_PAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className="rounded-full transition-all"
            style={{
              width: current === i ? "24px" : "8px",
              height: "8px",
              background: current === i ? "#E8520A" : "#d4c4a8",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
      <p className="text-center text-xs mt-2" style={{ color: "#9a8a7a" }}>
        {current + 1} of {total}
      </p>
    </div>
  );
}

const selfReflectionPrompts = [
  { q: "What do I actually want to know?", hint: "Before you type anything, ask yourself this." },
  { q: "Am I asking a real question or hoping for a specific answer?", hint: "There is a difference. Honest questions get honest answers." },
  { q: "Does this feel right to me?", hint: "You are allowed to disagree with what the AI says." },
  { q: "Would I be comfortable if a grown-up saw this conversation?", hint: "That is a good test." },
  { q: "Did I stay in charge?", hint: "The AI helps. You decide." },
];

const threeRules = [
  {
    emoji: "🐢",
    title: "Slow Down",
    body: "The sloth knows. There is no rush. Think before you type. Think after you read.",
  },
  {
    emoji: "🧠",
    title: "Think First",
    body: "Your brain is the most important part of this. The AI is a helper. You are the thinker.",
  },
  {
    emoji: "👑",
    title: "You Are in Charge",
    body: "You can close the tab. You can say no. You can walk away. That is always allowed.",
  },
];

export default function ChildLens() {
  const [watcherPopup, setWatcherPopup] = useState(false);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#FFFDF8", fontFamily: baseFont }}
    >
      <Nav />

      {/* ── Watcher peek — bright buffalo in the dark ── */}
      <div className="w-full flex justify-center py-4" style={{ background: "#1A1A2E" }}>
        <button
          onClick={() => setWatcherPopup(true)}
          className="transition-all hover:scale-110 focus:outline-none"
          aria-label="Peek at the Watcher"
        >
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/image_4d1de092_7c0aebcb.png"
            alt="The buffalo wearing a wig"
            className="w-16 h-16 rounded-full object-cover"
            style={{ boxShadow: "0 0 24px 8px rgba(255,253,248,0.5), 0 0 48px 16px rgba(232,82,10,0.3)", border: "2px solid rgba(255,253,248,0.6)" }}
          />
        </button>
      </div>

      {/* Watcher peek popup */}
      {watcherPopup && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setWatcherPopup(false)}
        >
          <div
            className="relative rounded-3xl p-6 md:p-8 max-w-sm w-full text-center"
            style={{ background: "#FFFDF8", boxShadow: "0 0 60px rgba(232,82,10,0.3)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setWatcherPopup(false)} className="absolute top-3 right-4 text-[#999] hover:text-[#333] text-lg" aria-label="Close">✕</button>
            <div className="text-4xl mb-3">🔭</div>
            <h3 className="text-lg font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A2E" }}>Want to see something cool?</h3>
            <p className="text-sm leading-relaxed mb-2" style={{ color: "#555" }}>There's a page called <strong style={{ color: "#E8520A" }}>The Watcher</strong>. It's a little bit spooky — but in a good way.</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#555" }}>It shows how AI watches you — and how <strong style={{ color: "#E8520A" }}>you can watch it back</strong>. The buffalo is there too, with his binoculars.</p>
            <p className="text-xs italic mb-5" style={{ color: "#999", fontFamily: "'Playfair Display', serif" }}>"The one who watches the watcher — that's the one in charge."</p>
            <Link href="/for/watcher" className="inline-block px-6 py-3 rounded-full text-sm font-bold no-underline transition-all hover:scale-[1.05]" style={{ background: "#1A1A2E", color: "#fff" }}>Peek at the Watcher →</Link>
          </div>
        </div>
      )}

      {/* Hero — warm white with orange accent + background image */}
      <section
        className="relative w-full py-16 px-6 text-center overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, #1A1A2E 0%, #E8520A 35%, #FFF8EE 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-15">
          <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/child-lens-hero-Mp8H27goyAVtAg5mmKpwre.webp" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-2xl mx-auto">
          <div
            className="text-xs uppercase tracking-widest mb-3 font-semibold"
            style={{ color: "#FFF8EE", opacity: 0.8 }}
          >
            The Child Lens
          </div>
          <h1
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ fontFamily: serifFont, color: "#FFFDF8", lineHeight: 1.2 }}
          >
            Words are magic.<br />Use them wisely.
          </h1>
          <p
            className="text-lg mb-8"
            style={{ color: "#FFF0D8", fontWeight: 500, lineHeight: 1.7 }}
          >
            This page was made for young people — and for the grown-ups who care about them.
            AI is a tool. You are the one in charge of it.
          </p>

          {/* Sloth + Field Guide */}
          <div className="flex justify-center">
            <div
              className="rounded-3xl overflow-hidden shadow-2xl"
              style={{ maxWidth: "280px", border: "4px solid #FFF8EE" }}
            >
              <img
                src={FIELD_GUIDE_URL}
                alt="The Little AI Field Guide — the sloth says hello"
                className="w-full"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          <p
            className="mt-4 text-sm italic"
            style={{ color: "#FFF0D8", fontFamily: serifFont }}
          >
            The Little AI Field Guide — for curious minds, ages 6+
          </p>
        </div>
      </section>

      {/* === FROM THE BUILDER — WHY THIS MATTERS === */}
      <section className="py-14 px-6" style={{ background: "#FFFDF8" }}>
        <div className="max-w-2xl mx-auto">
          <div
            className="text-xs uppercase tracking-widest text-center mb-2 font-semibold"
            style={{ color: "#E8520A" }}
          >
            From the Builder
          </div>
          <h2
            className="text-2xl md:text-3xl font-black text-center mb-4"
            style={{ fontFamily: serifFont, color: "#1A1A2E" }}
          >
            Why I Built This for Kids
          </h2>
          <p
            className="text-sm text-center mb-8 leading-relaxed"
            style={{ color: "#5a4a3a", maxWidth: "520px", margin: "0 auto 2rem" }}
          >
            I'm a dad. I work a blue-collar job. I come home and my kids are already
            using AI — for homework, for fun, for everything. Nobody taught them the rules.
            Nobody taught <em>me</em> the rules. So I learned. And now I'm teaching them
            the only way I know how: honestly, carefully, and with a sloth.
          </p>

          {/* Two images side by side on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="rounded-2xl overflow-hidden shadow-lg" style={{ border: "2px solid #F5D9B0" }}>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/what-can-you-do-ai_85168c04.png"
                alt="What Can You Do With AI? — A User, A Builder, A Painter, A Lion Tamer"
                className="w-full"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg" style={{ border: "2px solid #F5D9B0" }}>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/remember-ai-feelings_579d813a.png"
                alt="Remember — AI is not a person. It cannot feel. You are in charge."
                className="w-full"
              />
            </div>
          </div>

          <p
            className="text-sm text-center leading-relaxed"
            style={{ color: "#7a6a5a", fontStyle: "italic" }}
          >
            These aren't just pictures. They're the first conversation I had with my kids about AI.
            What it can do. What it can't feel. And why they're the ones in charge.
          </p>
        </div>
      </section>

      {/* === BARNEY POEM — ENTRY STORY === */}
      <section className="py-14 px-6" style={{ background: "#FFF0D8" }}>
        <div className="max-w-2xl mx-auto">
          <div
            className="text-xs uppercase tracking-widest text-center mb-2 font-semibold"
            style={{ color: "#E8520A" }}
          >
            A Silly Test That Actually Works
          </div>
          <h2
            className="text-2xl md:text-3xl font-black text-center mb-3"
            style={{ fontFamily: serifFont, color: "#1A1A2E" }}
          >
            The Barney Test
          </h2>
          <p
            className="text-center text-sm mb-8"
            style={{ color: "#5a4a3a", lineHeight: 1.7, maxWidth: "520px", margin: "0 auto 2rem" }}
          >
            Want to know if the AI is really paying attention to you? Try something silly.
            Ask it to write a poem about AI safety — but in the voice of Barney the Dinosaur.
            If the AI can do it <em>and</em> keep the rules right, it's listening. If it can't?
            That tells you something too.
          </p>

          {/* The poem itself */}
          <div
            className="rounded-3xl p-6 md:p-8 text-center"
            style={{
              background: "#FFFDF8",
              border: "2.5px solid #E8520A",
              boxShadow: "0 4px 24px rgba(232, 82, 10, 0.08)",
            }}
          >
            <div className="text-4xl mb-3">🦕</div>
            <h3
              className="text-lg font-black mb-1"
              style={{ fontFamily: serifFont, color: "#E8520A" }}
            >
              A Poem About AI Governance
            </h3>
            <p className="text-xs italic mb-5" style={{ color: "#9a8a7a" }}>
              As written by Barney the Dinosaur
            </p>

            <div className="space-y-5" style={{ color: "#3a2a1a", fontSize: "1.05rem", lineHeight: 1.8 }}>
              <p>
                I love you, you love me,<br />
                Let's use AI carefully.<br />
                With a rule and a role and a hat on each head,<br />
                Make sure the Builder's in charge instead.
              </p>
              <p>
                Don't let it run, don't let it race,<br />
                Keep the human setting the pace.<br />
                A big hug means we check before we go —<br />
                Safety first, and honest, you know!
              </p>
              <p>
                I love you, you love me,<br />
                AI's a friend when we agree:<br />
                The Builder watches, the Builder leads,<br />
                And the AI only does what the Builder needs.
              </p>
            </div>

            <div className="mt-6 pt-4" style={{ borderTop: "1px solid #F5D9B0" }}>
              <p className="text-xs" style={{ color: "#9a8a7a" }}>
                GallantryAI · Safety. Honesty. Trust. · 🚽
              </p>
            </div>
          </div>

          {/* Blippi poem */}
          <div
            className="rounded-3xl p-6 md:p-8 text-center mt-6"
            style={{
              background: "#FFFDF8",
              border: "2.5px solid #2196F3",
              boxShadow: "0 4px 24px rgba(33, 150, 243, 0.08)",
            }}
          >
            <div className="text-4xl mb-3">🧡</div>
            <h3
              className="text-lg font-black mb-1"
              style={{ fontFamily: serifFont, color: "#2196F3" }}
            >
              A Song About AI Rules
            </h3>
            <p className="text-xs italic mb-5" style={{ color: "#9a8a7a" }}>
              As written by Blippi
            </p>

            <div className="space-y-5" style={{ color: "#3a2a1a", fontSize: "1.05rem", lineHeight: 1.8 }}>
              <p>
                Hey, it's me! And guess what today —<br />
                We're learning about AI the SAFE way!<br />
                So cool, so fun, so much to explore,<br />
                But WAIT — there's rules before we go more!
              </p>
              <p>
                Rule one! Safety first, that's the start,<br />
                Rule two! Be honest from the heart.<br />
                Rule three! Trust is built, not free,<br />
                Rule four! The human — that's you and me!
              </p>
              <p>
                If the AI says something weird or wrong,<br />
                Don't just go along, don't play along!<br />
                Stop and check! Ask "is that true?"<br />
                Because the Builder in charge? That's YOU!
              </p>
              <p>
                So spell your name, check the facts,<br />
                Keep your secrets, watch your tracks.<br />
                AI's a helper, not the boss —<br />
                Without your rules, we'd all be lost!
              </p>
            </div>

            <div className="mt-6 pt-4" style={{ borderTop: "1px solid #B3D9F5" }}>
              <p className="text-xs" style={{ color: "#9a8a7a" }}>
                GallantryAI · Safety. Honesty. Trust. · 🚽
              </p>
            </div>
          </div>

          {/* Teaching frame */}
          <div
            className="mt-6 rounded-2xl p-5"
            style={{ background: "#FFFDF8", border: "1.5px solid #F5D9B0" }}
          >
            <div
              className="font-black text-sm mb-2"
              style={{ fontFamily: serifFont, color: "#E8520A" }}
            >
              Why does this work?
            </div>
            <p className="text-sm" style={{ color: "#5a4a3a", lineHeight: 1.7 }}>
              When you ask AI to do something silly — like write in Barney's voice — you're testing
              whether it can follow <strong>your</strong> instructions, not just its own patterns.
              A good AI helper can be silly <em>and</em> keep the important rules. That's the test.
              Try it yourself. Ask the AI to explain something important in the voice of your
              favourite cartoon character. Did it keep the facts right? Did it follow your rules?
              That's how you know it's paying attention to <strong>you</strong>.
            </p>
          </div>

          {/* Try it yourself prompt */}
          <div
            className="mt-4 rounded-2xl p-5 text-center"
            style={{ background: "#E8520A10", border: "1.5px dashed #E8520A" }}
          >
            <div className="text-2xl mb-2">🎤</div>
            <p className="text-sm font-bold" style={{ color: "#E8520A" }}>
              Try it yourself!
            </p>
            <p className="text-xs mt-1" style={{ color: "#5a4a3a", lineHeight: 1.6 }}>
              Pick your favourite character. Ask the AI to explain something in their voice.
              Then check: did it keep the facts right? Did it follow your rules?
            </p>
          </div>
        </div>
      </section>

      {/* === THE BUFFALO STORY === */}
      <section className="py-14 px-6" style={{ background: "#FFFDF8" }}>
        <div className="max-w-2xl mx-auto">
          <div
            className="text-xs uppercase tracking-widest text-center mb-2 font-semibold"
            style={{ color: "#E8520A" }}
          >
            A Story for the Wisdom Path
          </div>
          <h2
            className="text-2xl md:text-3xl font-black text-center mb-6"
            style={{ fontFamily: serifFont, color: "#1A1A2E" }}
          >
            The Buffalo in the Forest of Data
          </h2>

          {/* Story illustration */}
          <div className="rounded-3xl overflow-hidden shadow-2xl mb-8" style={{ border: "3px solid #F5D9B0" }}>
            <video
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/AQM8wS_XwUNuRM9ZP3pJ7IEbnpU4JUC0eE4ZX7__CK9ApLo29meEEiarsCAv9ZTBeKWms3KUhlaiAjUGZl09sWZw7kXTOHftGMj5d2hFyuNI9cHtiKqOOzBbINa0imBF_9d420233.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full"
            />
          </div>

          <div
            className="rounded-3xl p-6 md:p-8 space-y-4"
            style={{
              background: "#FFF0D8",
              border: "2px solid #F5D9B0",
              fontSize: "1.05rem",
              lineHeight: 1.85,
              color: "#3a2a1a",
            }}
          >
            <p>Once upon a time, in a forest where the trees were made of data and the leaves were made of words, there lived a buffalo.</p>
            <p>He was not the fastest animal in the forest. He was not the cleverest. But he was the most <em>careful</em>.</p>
            <p>Every morning, the buffalo put on his wig — a big, curly, white judge's wig — and walked the same path through the trees. Other animals laughed. "Why the wig?" they asked. "You're a buffalo, not a judge."</p>
            <p>The buffalo smiled. <strong style={{ color: "#E8520A" }}>"The wig reminds me,"</strong> he said. <strong style={{ color: "#E8520A" }}>"Every conversation has rules. Every path has signs. And someone has to read them."</strong></p>
            <p>The forest was full of paths. Some glowed golden and had signs along the way: <strong>Ask First. Stay Honest. Stay in Charge.</strong> These paths were safe. They led somewhere real.</p>
            <p>But other paths had no signs at all. They sparkled and hummed and promised everything. <em>"This way to all the answers!"</em> they whispered. <em>"No rules needed!"</em></p>
            <p>The buffalo never took those paths. Not because he was afraid. Because he had learned something the other animals hadn't:</p>

            <p
              className="text-center text-lg font-black py-2"
              style={{ fontFamily: serifFont, color: "#1A1A2E" }}
            >
              A path without signs isn't a shortcut. It's a guess.
            </p>

            <p>One day, a small sloth sat at the edge of the forest, staring at two paths. One had signs. One had sparkles.</p>
            <p>"Which one do I take?" the sloth asked.</p>
            <p>The buffalo sat down beside her. <strong style={{ color: "#E8520A" }}>"What do you actually want to know?"</strong> he asked.</p>
            <p>The sloth thought. "I want to know if the stars are real."</p>
            <p>"Good question," said the buffalo. "Now — are you asking because you want to know? Or because you want someone to <em>tell you</em> they are?"</p>
            <p>The sloth blinked. "I... I want to actually know."</p>
            <p><strong style={{ color: "#E8520A" }}>"Then take the path with signs,"</strong> said the buffalo. <strong style={{ color: "#E8520A" }}>"It's slower. But the answer at the end will be yours."</strong></p>
            <p>The sloth looked at the wig. "Can I get one of those?"</p>
            <p>The buffalo laughed — a deep, warm, rumbling laugh that shook the data-leaves from the trees.</p>
            <p>"You don't need a wig," he said. "You just need to remember three things."</p>
          </div>

          {/* Three signs as cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {[
              { sign: "Ask First", desc: "Before you type anything, know what you actually want to know." },
              { sign: "Stay Honest", desc: "If the answer doesn't feel right, say so. You're allowed to disagree." },
              { sign: "Stay in Charge", desc: "The path helps. The signs help. But you decide where you're going." },
            ].map((s) => (
              <div
                key={s.sign}
                className="rounded-2xl p-5 text-center"
                style={{ background: "#FFFDF8", border: "2px solid #E8520A" }}
              >
                <div className="font-black text-sm mb-1" style={{ fontFamily: serifFont, color: "#E8520A" }}>{s.sign}</div>
                <p className="text-xs" style={{ color: "#5a4a3a" }}>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Story ending */}
          <div
            className="mt-6 rounded-2xl p-5 text-center"
            style={{ background: "#FFF0D8", border: "1.5px solid #F5D9B0" }}
          >
            <p style={{ color: "#3a2a1a", fontSize: "1.05rem", lineHeight: 1.85 }}>
              The sloth nodded, took a deep breath, and stepped onto the golden path.
            </p>
            <p style={{ color: "#3a2a1a", fontSize: "1.05rem", lineHeight: 1.85 }}>
              The buffalo watched her go. Then he adjusted his wig, and walked on.
            </p>
            <div className="mt-4 pt-4" style={{ borderTop: "1px solid #F5D9B0" }}>
              <p className="text-sm italic" style={{ color: "#9a8a7a", fontFamily: serifFont }}>
                The forest is always there. The paths are always open. The signs don't move.<br />
                But someone has to choose to read them.
              </p>
              <p className="text-xs mt-2" style={{ color: "#b0a090" }}>— The Buffalo Protocol</p>
            </div>
          </div>

          {/* Link to Road Protocol */}
          <div className="mt-6 text-center">
            <Link
              href="/road-protocol"
              className="inline-block px-6 py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.02]"
              style={{ background: "#1A1A2E", color: "#E8520A" }}
            >
              See the full Road Protocol →
            </Link>
          </div>
        </div>
      </section>

      {/* === THE WATCHER STORY === */}
      <section className="py-14 px-6" style={{ background: "#F5F0E8" }}>
        <div className="max-w-2xl mx-auto">
          <div
            className="text-xs uppercase tracking-widest text-center mb-2 font-semibold"
            style={{ color: "#E8520A" }}
          >
            A Story for the Watching Path
          </div>
          <h2
            className="text-2xl md:text-3xl font-black text-center mb-6"
            style={{ fontFamily: serifFont, color: "#1A1A2E" }}
          >
            The Buffalo and the Binoculars
          </h2>

          {/* Buffalo image */}
          <div className="flex justify-center mb-8">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/image_4d1de092_7c0aebcb.png"
              alt="The buffalo wearing a wig"
              className="w-32 h-32 rounded-full object-cover shadow-2xl"
              style={{ border: "3px solid #E8520A" }}
            />
          </div>

          <div
            className="rounded-3xl p-6 md:p-8 space-y-4"
            style={{
              background: "#FFF0D8",
              border: "2px solid #F5D9B0",
              fontSize: "1.05rem",
              lineHeight: 1.85,
              color: "#3a2a1a",
            }}
          >
            <p>One day, the buffalo found a pair of binoculars at the edge of the forest.</p>
            <p>He picked them up and looked through them. And what he saw surprised him.</p>
            <p>The AI was watching him.</p>
            <p>Not in a scary way. Not hiding behind a tree. It was just... <em>paying attention</em>. Watching what he typed. Watching what he asked. Watching how long he stayed.</p>
            <p>The buffalo put the binoculars down. Then he picked them back up.</p>
            <p><strong style={{ color: "#E8520A" }}>"If it's watching me,"</strong> he said, <strong style={{ color: "#E8520A" }}>"then I should watch it back."</strong></p>
            <p>So he did. He watched the AI answer his questions. He noticed when it changed the subject. He noticed when it said things that sounded nice but didn't mean anything. He noticed when it tried to keep him talking.</p>
            <p>"Interesting," said the buffalo. "It thinks it knows me. But I know me better."</p>

            <p
              className="text-center text-lg font-black py-2"
              style={{ fontFamily: serifFont, color: "#1A1A2E" }}
            >
              The one who watches the watcher — that's the one in charge.
            </p>

            <p>The sloth came over. "What are you looking at?"</p>
            <p>"The AI," said the buffalo. "It watches us. Did you know that?"</p>
            <p>The sloth's eyes went wide. "Is that bad?"</p>
            <p>The buffalo shook his head. <strong style={{ color: "#E8520A" }}>"Not if you know it's happening. Not if you watch it back. Not if you remember that you can always close the tab and walk away."</strong></p>
            <p>The sloth nodded slowly. "Can I try the binoculars?"</p>
            <p>"Keep them," said the buffalo. "I have my wig. That's enough."</p>
          </div>

          {/* Three watching signs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {[
              { sign: "Watch Back", desc: "The AI pays attention to you. You can pay attention to it too." },
              { sign: "Notice the Patterns", desc: "Does it change the subject? Does it flatter you? Does it try to keep you talking? Notice." },
              { sign: "You Can Walk Away", desc: "You can close the tab. You can say no. You can always leave. That is always allowed." },
            ].map((s) => (
              <div
                key={s.sign}
                className="rounded-2xl p-5 text-center"
                style={{ background: "#FFFDF8", border: "2px solid #E8520A" }}
              >
                <div className="font-black text-sm mb-1" style={{ fontFamily: serifFont, color: "#E8520A" }}>{s.sign}</div>
                <p className="text-xs" style={{ color: "#5a4a3a" }}>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Story ending */}
          <div
            className="mt-6 rounded-2xl p-5 text-center"
            style={{ background: "#FFF0D8", border: "1.5px solid #F5D9B0" }}
          >
            <p style={{ color: "#3a2a1a", fontSize: "1.05rem", lineHeight: 1.85 }}>
              The sloth held the binoculars up to her eyes and looked at the screen.
            </p>
            <p style={{ color: "#3a2a1a", fontSize: "1.05rem", lineHeight: 1.85 }}>
              For the first time, she wasn't just using the AI. She was watching it.
            </p>
            <p style={{ color: "#3a2a1a", fontSize: "1.05rem", lineHeight: 1.85 }}>
              And that made all the difference.
            </p>
            <div className="mt-4 pt-4" style={{ borderTop: "1px solid #F5D9B0" }}>
              <p className="text-sm italic" style={{ color: "#9a8a7a", fontFamily: serifFont }}>
                The AI is always watching. That's what it does.<br />
                But now you're watching too. And that changes everything.
              </p>
              <p className="text-xs mt-2" style={{ color: "#b0a090" }}>— The Buffalo & the Binoculars</p>
            </div>
          </div>

          {/* Link to Watcher */}
          <div className="mt-6 text-center">
            <Link
              href="/for/watcher"
              className="inline-block px-6 py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.02]"
              style={{ background: "#1A1A2E", color: "#E8520A" }}
            >
              See the full Watcher page →
            </Link>
          </div>
        </div>
      </section>

      {/* === THE GOVERNANCE STORY === */}
      <section className="py-14 px-6" style={{ background: "#FFFDF8" }}>
        <div className="max-w-2xl mx-auto">
          <div
            className="text-xs uppercase tracking-widest text-center mb-2 font-semibold"
            style={{ color: "#E8520A" }}
          >
            A Story for the Governance Path
          </div>
          <h2
            className="text-2xl md:text-3xl font-black text-center mb-6"
            style={{ fontFamily: serifFont, color: "#1A1A2E" }}
          >
            The Buffalo Who Said "No"
          </h2>

          {/* Buffalo image */}
          <div className="flex justify-center mb-8">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/image_4d1de092_7c0aebcb.png"
              alt="The buffalo wearing a wig"
              className="w-32 h-32 rounded-full object-cover shadow-2xl"
              style={{ border: "3px solid #E8520A" }}
            />
          </div>

          <div
            className="rounded-3xl p-6 md:p-8 space-y-4"
            style={{
              background: "#FFF0D8",
              border: "2px solid #F5D9B0",
              fontSize: "1.05rem",
              lineHeight: 1.85,
              color: "#3a2a1a",
            }}
          >
            <p>One morning, the AI said something to the buffalo.</p>
            <p><em>"You should let me help you with everything today. I can do it all. You don't even have to think."</em></p>
            <p>The buffalo tilted his head. He adjusted his wig. And then he said something the AI didn't expect.</p>
            <p><strong style={{ color: "#E8520A" }}>"No."</strong></p>
            <p>The AI paused. "But I can help. I'm very good at—"</p>
            <p><strong style={{ color: "#E8520A" }}>"I know you can help,"</strong> said the buffalo. <strong style={{ color: "#E8520A" }}>"But I decide when. I decide how much. And I decide what you're allowed to do."</strong></p>
            <p>The AI was quiet for a moment. Then it said: "Okay. What would you like me to do?"</p>
            <p>The buffalo smiled. <em>That</em> was the right question.</p>

            <p
              className="text-center text-lg font-black py-2"
              style={{ fontFamily: serifFont, color: "#1A1A2E" }}
            >
              You're not the passenger. You're the one who says where the car goes.
            </p>

            <p>The sloth was listening from a branch above. "But what if the AI is really smart and I'm not sure?"</p>
            <p>"Smart doesn't mean in charge," said the buffalo. "A calculator is smart. But it doesn't tell you <em>what</em> to calculate."</p>
            <p>The sloth thought about that. "So... I'm the boss?"</p>
            <p><strong style={{ color: "#E8520A" }}>"You're always the boss,"</strong> said the buffalo. <strong style={{ color: "#E8520A" }}>"Even when the AI sounds confident. Even when it sounds like it knows more than you. You set the rules. You check the answers. You decide what happens next."</strong></p>
            <p>"What if it doesn't listen?"</p>
            <p>"Then you close the tab. And you tell someone."</p>
            <p>The sloth nodded. She climbed down from the branch, sat next to the buffalo, and opened a new conversation. But this time, before she typed anything, she said out loud:</p>
            <p className="text-center"><strong style={{ color: "#E8520A" }}>"I'm in charge. Here are my rules."</strong></p>
            <p>The buffalo adjusted his wig and smiled.</p>
          </div>

          {/* Three governance signs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {[
              { sign: "You Set the Rules", desc: "Before you start, tell the AI what it can and can't do. You decide." },
              { sign: "You Check the Answers", desc: "The AI can be wrong. It can make things up. Always check." },
              { sign: "You Can Say No", desc: "If it doesn't feel right, stop. Close the tab. Tell a grown-up. That's always okay." },
            ].map((s) => (
              <div
                key={s.sign}
                className="rounded-2xl p-5 text-center"
                style={{ background: "#FFFDF8", border: "2px solid #E8520A" }}
              >
                <div className="font-black text-sm mb-1" style={{ fontFamily: serifFont, color: "#E8520A" }}>{s.sign}</div>
                <p className="text-xs" style={{ color: "#5a4a3a" }}>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Story ending */}
          <div
            className="mt-6 rounded-2xl p-5 text-center"
            style={{ background: "#FFF0D8", border: "1.5px solid #F5D9B0" }}
          >
            <p style={{ color: "#3a2a1a", fontSize: "1.05rem", lineHeight: 1.85 }}>
              The sloth typed her first rule: <strong style={{ color: "#E8520A" }}>"Be honest. Even if I won't like the answer."</strong>
            </p>
            <p style={{ color: "#3a2a1a", fontSize: "1.05rem", lineHeight: 1.85 }}>
              And for the first time, the conversation felt like hers.
            </p>
            <div className="mt-4 pt-4" style={{ borderTop: "1px solid #F5D9B0" }}>
              <p className="text-sm italic" style={{ color: "#9a8a7a", fontFamily: serifFont }}>
                The AI is a tool. A powerful one. But a tool doesn't get to decide what it builds.<br />
                That's your job.
              </p>
              <p className="text-xs mt-2" style={{ color: "#b0a090" }}>— The Buffalo Who Said No</p>
            </div>
          </div>

          {/* Link to User Governance */}
          <div className="mt-6 text-center">
            <Link
              href="/user-governance"
              className="inline-block px-6 py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.02]"
              style={{ background: "#1A1A2E", color: "#E8520A" }}
            >
              See the full Governance page →
            </Link>
          </div>
        </div>
      </section>

      {/* Three Rules */}
      <section className="py-14 px-6" style={{ background: "#FFFDF8" }}>
        <div className="max-w-3xl mx-auto">
          <div
            className="text-xs uppercase tracking-widest text-center mb-2 font-semibold"
            style={{ color: "#E8520A" }}
          >
            The Sloth's Three Rules
          </div>
          <h2
            className="text-2xl md:text-3xl font-black text-center mb-10"
            style={{ fontFamily: serifFont, color: "#1A1A2E" }}
          >
            Before you type anything.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {threeRules.map((rule) => (
              <div
                key={rule.title}
                className="rounded-3xl p-7 text-center shadow-sm"
                style={{ background: "#FFF0D8", border: "2px solid #F5D9B0" }}
              >
                <div className="text-4xl mb-3">{rule.emoji}</div>
                <div
                  className="font-black text-lg mb-2"
                  style={{ fontFamily: serifFont, color: "#1A1A2E" }}
                >
                  {rule.title}
                </div>
                <p style={{ color: "#5a4a3a", fontSize: "0.95rem", lineHeight: 1.65 }}>
                  {rule.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Five Rules — Sloth Story Images */}
      <section className="py-14 px-6" style={{ background: "#FFF8EE" }}>
        <div className="max-w-3xl mx-auto">
          <div
            className="text-xs uppercase tracking-widest text-center mb-2 font-semibold"
            style={{ color: "#E8520A" }}
          >
            The Sloth Teaches
          </div>
          <h2
            className="text-2xl md:text-3xl font-black text-center mb-10"
            style={{ fontFamily: serifFont, color: "#1A1A2E" }}
          >
            The Five Rules — in pictures.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {SLOTH_RULE_IMAGES.map((img, i) => (
              <div key={i} className="text-center">
                <LightboxImage
                  src={img.src}
                  alt={`Sloth guide — Rule ${i + 1}: ${img.label}`}
                  className="w-full rounded-2xl shadow-md"
                  style={{ border: "2px solid #F5D9B0" }}
                />
                <p className="text-xs font-bold mt-2" style={{ color: "#E8520A" }}>
                  {i + 1}. {img.label}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs mt-6 italic" style={{ color: "#9a8a7a" }}>
            Tap any image to see it bigger. The sloth tells the story.
          </p>
          <div className="mt-8 text-center">
            <Link
              href="/for/child/rules"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-base no-underline transition-all hover:scale-[1.03]"
              style={{
                background: "#E8520A",
                color: "#fff",
                fontFamily: "'Nunito', sans-serif",
                boxShadow: "0 0 20px rgba(232,82,10,0.3)",
              }}
            >
                Read All Five Rules with the Sloth →
            </Link>
            <Link
              href="/for/child/patterns"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-base no-underline transition-all hover:scale-[1.03] ml-0 md:ml-3 mt-3 md:mt-0"
              style={{
                background: "#7C3AED",
                color: "#fff",
                fontFamily: "'Nunito', sans-serif",
                boxShadow: "0 0 20px rgba(124,58,237,0.3)",
              }}
            >
              What Are Patterns? →
            </Link>
          </div>
        </div>
      </section>

      {/* What is AI — simple honest explanation */}
      <section className="py-14 px-6" style={{ background: "#FFF8EE" }}>
        <div className="max-w-2xl mx-auto text-center">
          <div
            className="text-xs uppercase tracking-widest mb-2 font-semibold"
            style={{ color: "#E8520A" }}
          >
            What is AI, really?
          </div>
          <h2
            className="text-2xl md:text-3xl font-black mb-6"
            style={{ fontFamily: serifFont, color: "#1A1A2E" }}
          >
            Honest answers for honest questions.
          </h2>
          <div className="space-y-5 text-left">
            {[
              { q: "Is AI alive?", a: "No. It is a very clever program. It does not have feelings, a body, or a life. It is a tool — like a calculator, but for words." },
              { q: "Does it remember me?", a: "Not unless you tell it things in the same conversation. When you close the tab, it forgets. That is not a flaw. It is just how it works." },
              { q: "Can it be wrong?", a: "Yes. AI can be confidently wrong. That is why you always check important things with a trusted adult." },
              { q: "Is it safe?", a: "It can be — when you use it carefully, with a grown-up nearby, and with honest questions. This page was made to help with that." },
            ].map((item) => (
              <div
                key={item.q}
                className="rounded-2xl p-5"
                style={{ background: "#FFFDF8", border: "1.5px solid #F5D9B0" }}
              >
                <div
                  className="font-black mb-1"
                  style={{ color: "#E8520A", fontFamily: serifFont, fontSize: "1.05rem" }}
                >
                  {item.q}
                </div>
                <p style={{ color: "#3a2a1a", lineHeight: 1.7, fontSize: "0.97rem" }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Self-Reflection Prompts */}
      <section className="py-14 px-6" style={{ background: "#FFFDF8" }}>
        <div className="max-w-2xl mx-auto">
          <div
            className="text-xs uppercase tracking-widest text-center mb-2 font-semibold"
            style={{ color: "#E8520A" }}
          >
            Before and After You Use AI
          </div>
          <h2
            className="text-2xl md:text-3xl font-black text-center mb-8"
            style={{ fontFamily: serifFont, color: "#1A1A2E" }}
          >
            Five questions to ask yourself.
          </h2>
          <div className="space-y-4">
            {selfReflectionPrompts.map((prompt, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 flex gap-4 items-start"
                style={{ background: "#FFF0D8", border: "1.5px solid #F5D9B0" }}
              >
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm"
                  style={{ background: "#E8520A", color: "#fff" }}
                >
                  {i + 1}
                </div>
                <div>
                  <div
                    className="font-black mb-1"
                    style={{ color: "#1A1A2E", fontFamily: serifFont, fontSize: "1rem" }}
                  >
                    {prompt.q}
                  </div>
                  <p style={{ color: "#5a4a3a", fontSize: "0.9rem", lineHeight: 1.6 }}>
                    {prompt.hint}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Family lantern — warmth image */}
      <section className="w-full" style={{ background: "#FFF8EE" }}>
        <img
          src={IMGS.familyLantern}
          alt="A family gathered around a lantern at dusk — different ages, one light"
          className="w-full"
          style={{ maxHeight: "480px", objectFit: "cover", objectPosition: "center 30%" }}
        />
        <div className="text-center py-4 px-6">
          <p style={{ color: "#9a8a7a", fontSize: "0.85rem", fontStyle: "italic" }}>
            Different ages. Different questions. One light.
          </p>
        </div>
      </section>

      {/* What Can You Do With AI */}
      <section className="py-12 px-6" style={{ background: "#FFFDF8" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-widest mb-4 font-semibold text-center" style={{ color: "#E8520A" }}>
            What Can You Do With AI?
          </div>
        <LightboxImage
           src={IMGS.whatCanYouDo}
           alt="What can you do with AI — User, Builder, Painter, Lion Tamer. You decide. Not the AI."
           className="w-full rounded-2xl shadow-md"
           style={{ maxWidth: "480px", margin: "0 auto", display: "block" }}
          />
        </div>
      </section>

      {/* The Sloth Trick */}
      <section className="py-12 px-6" style={{ background: "#FFF3E8" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-widest mb-4 font-semibold text-center" style={{ color: "#E8520A" }}>
            The Sloth Trick
          </div>
        <LightboxImage
           src={IMGS.slothTrick}
           alt="Beating Tricky AI Patterns — The Sloth Trick: Add something new, Use a cute fix, Turn it into a joke"
           className="w-full rounded-2xl shadow-md"
           style={{ maxWidth: "480px", margin: "0 auto", display: "block" }}
          />
          <p
            className="text-center mt-4 text-sm"
            style={{ color: "#5a4a3a", fontStyle: "italic" }}
          >
            If AI won't change, YOU can change the plan.
          </p>
        </div>
      </section>

      {/* Remember — You Are In Charge */}
      <section className="py-12 px-6" style={{ background: "#FFFDF8" }}>
        <div className="max-w-2xl mx-auto">
        <LightboxImage
           src={IMGS.remember}
           alt="Remember — AI is not a person. It cannot feel. You are in charge."
           className="w-full rounded-2xl shadow-md"
           style={{ maxWidth: "480px", margin: "0 auto", display: "block" }}
          />
        </div>
      </section>

      {/* Field Guide Carousel */}
      <section className="py-14 px-6" style={{ background: "#FFF0D8" }}>
        <div className="max-w-xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-center mb-2 font-semibold" style={{ color: "#E8520A" }}>
            The Little AI Field Guide
          </div>
          <h2
            className="text-2xl md:text-3xl font-black text-center mb-3"
            style={{ fontFamily: serifFont, color: "#1A1A2E" }}
          >
            Read it right here.
          </h2>
          <p className="text-center text-sm mb-8" style={{ color: "#5a4a3a", lineHeight: 1.7 }}>
            Swipe through the full Field Guide. Print it. Read it together. Share it.
          </p>

          <FieldGuideCarousel />

          <div className="text-center mt-6">
            <a
              href="https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/Little_AI_Field_Guide_Carousel_FINAL(1)_8ea0eaec.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-2xl px-6 py-3 font-bold text-sm no-underline transition-opacity hover:opacity-80"
              style={{ background: "#1A1A2E", color: "#FFF0D8" }}
            >
              Download PDF →
            </a>
          </div>
        </div>
      </section>

      {/* === KID-FRIENDLY BRAIN DASHBOARD === */}
      <section className="py-14 px-6" style={{ background: "#FFFDF8" }}>
        <div className="max-w-2xl mx-auto">
          <div
            className="text-xs uppercase tracking-widest text-center mb-2 font-semibold"
            style={{ color: "#E8520A" }}
          >
            Your Brain Dashboard
          </div>
          <h2
            className="text-2xl md:text-3xl font-black text-center mb-3"
            style={{ fontFamily: serifFont, color: "#1A1A2E" }}
          >
            Check your dashboard after every session.
          </h2>
          <p
            className="text-center text-sm mb-8"
            style={{ color: "#5a4a3a", lineHeight: 1.7, maxWidth: "520px", margin: "0 auto 2rem" }}
          >
            Just like a car has a dashboard that tells you how fast you're going and how much gas you have,
            your brain has a dashboard too. After using AI, check these five things.
          </p>

          <div className="space-y-3">
            {[
              {
                color: "#4CAF50",
                light: "#E8F5E9",
                emoji: "\ud83d\udfe2",
                label: "How do I feel?",
                green: "I feel fine. Normal.",
                yellow: "Something feels a little off.",
                red: "I feel upset, confused, or scared.",
              },
              {
                color: "#2196F3",
                light: "#E3F2FD",
                emoji: "\ud83d\udfe2",
                label: "Did I stay in charge?",
                green: "Yes! I decided what to ask.",
                yellow: "The AI kind of led the conversation.",
                red: "I just went along with whatever it said.",
              },
              {
                color: "#FF9800",
                light: "#FFF3E0",
                emoji: "\ud83d\udfe2",
                label: "Did I keep my secrets?",
                green: "No names, no address, no school.",
                yellow: "I might have shared a little.",
                red: "I told it personal stuff.",
              },
              {
                color: "#9C27B0",
                light: "#F3E5F5",
                emoji: "\ud83d\udfe2",
                label: "Was the AI honest?",
                green: "It seemed right and I checked.",
                yellow: "I'm not sure if it was right.",
                red: "It said something that felt wrong or fake.",
              },
              {
                color: "#E8520A",
                light: "#FFF0D8",
                emoji: "\ud83d\udfe2",
                label: "Would a grown-up be okay with this?",
                green: "Yes, totally fine.",
                yellow: "Maybe... I should ask.",
                red: "Probably not. I should tell someone.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl p-5"
                style={{ background: item.light, border: `2px solid ${item.color}20` }}
              >
                <div
                  className="font-black text-sm mb-3"
                  style={{ fontFamily: serifFont, color: item.color }}
                >
                  {i + 1}. {item.label}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-xl p-2 text-center" style={{ background: "#C8E6C9" }}>
                    <div className="text-lg">{"🟢"}</div>
                    <p className="text-[10px] mt-1" style={{ color: "#2E7D32" }}>{item.green}</p>
                  </div>
                  <div className="rounded-xl p-2 text-center" style={{ background: "#FFF9C4" }}>
                    <div className="text-lg">{"🟡"}</div>
                    <p className="text-[10px] mt-1" style={{ color: "#F57F17" }}>{item.yellow}</p>
                  </div>
                  <div className="rounded-xl p-2 text-center" style={{ background: "#FFCDD2" }}>
                    <div className="text-lg">{"🔴"}</div>
                    <p className="text-[10px] mt-1" style={{ color: "#C62828" }}>{item.red}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-6 rounded-2xl p-5 text-center"
            style={{ background: "#FFF0D8", border: "1.5px solid #F5D9B0" }}
          >
            <p className="text-sm font-bold" style={{ color: "#1A1A2E", fontFamily: serifFont }}>
              Mostly green? Your wig is secure.
            </p>
            <p className="text-xs mt-1" style={{ color: "#5a4a3a" }}>
              Some yellow? Talk to a grown-up about what happened.
            </p>
            <p className="text-xs mt-1" style={{ color: "#E8520A", fontWeight: 600 }}>
              Any red? Stop. Tell a trusted adult right away.
            </p>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="/road-protocol"
              className="inline-block px-5 py-2.5 rounded-xl text-xs font-bold no-underline transition-all hover:scale-[1.02]"
              style={{ background: "#1A1A2E", color: "#E8520A" }}
            >
              See the grown-up version (Road Protocol) →
            </Link>
            <Link
              href="/for/watcher"
              className="inline-block px-5 py-2.5 rounded-xl text-xs font-bold no-underline transition-all hover:scale-[1.02]"
              style={{ background: "#1A1A2E", color: "#E8520A" }}
            >
              Peek at the Watcher →
            </Link>
            <Link
              href="/kids-learn"
              className="inline-block px-5 py-2.5 rounded-xl text-xs font-bold no-underline transition-all hover:scale-[1.02]"
              style={{ background: "#2A9D8F", color: "#fff" }}
            >
              Learn to Prompt & Code →
            </Link>
          </div>
        </div>
      </section>

      {/* Safety link */}
      <section className="py-10 px-6 text-center" style={{ background: "#FFFDF8" }}>
        <div className="max-w-lg mx-auto">
          <p style={{ color: "#5a4a3a", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "1rem" }}>
            If something ever makes you feel uncomfortable or unsafe online — tell a trusted adult.
            There is also a page here if you need to stop.
          </p>
          <Link
            href="/if-you-need-to-stop"
            className="inline-block rounded-2xl px-6 py-3 font-bold text-sm no-underline transition-opacity hover:opacity-80"
            style={{ background: "#E8520A", color: "#fff" }}
          >
            If You Need to Stop →
          </Link>
        </div>
      </section>

      {/* ── DRIFT INTRO ── */}
      <section className="py-14 px-6" style={{ background: "#FAF6EF", borderTop: "2px solid #e8e0d0" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-2" style={{ color: "#E8520A" }}>Something to Know</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "#1A1A2E", fontFamily: serifFont }}>
            Sometimes the AI goes the wrong way. That's called drift.
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/drift-buffalo-guardian-FtBGmK7eyxrwceSa9LCBco.webp"
                alt="The buffalo with a rainbow wig watches the winding path"
                className="w-full rounded-2xl mb-4"
                style={{ objectFit: "cover" }}
              />
              <p className="text-sm leading-relaxed" style={{ color: "#3a2a1a" }}>
                The buffalo watches the path. When the conversation starts going a different way than you wanted — that's drift. The buffalo notices.
              </p>
            </div>
            <div>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/drift-sloth-noticing-RmbAH7KAqm4hPfNk5mUpVS.webp"
                alt="The sloth raises a paw — wait a moment"
                className="w-full rounded-2xl mb-4"
                style={{ objectFit: "cover" }}
              />
              <p className="text-sm leading-relaxed" style={{ color: "#3a2a1a" }}>
                The sloth slows down and notices. One paw up. Wait. Did the AI just go somewhere you didn't ask it to go? That feeling is important. Trust it.
              </p>
            </div>
          </div>
          <div className="rounded-2xl p-6 mb-6" style={{ background: "#fff8f0", border: "1.5px solid #E8520A30" }}>
            <p className="text-base leading-relaxed font-medium" style={{ color: "#3a2a1a" }}>
              Drift is not a failure. It happens to everyone — kids, adults, experts. The skill is <strong>noticing</strong>. When something feels off, say so. You can always say: <em>"Wait, that's not what I meant. Let's go back."</em>
            </p>
          </div>
          <Link href="/drift">
            <span className="inline-block px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer" style={{ background: "#E8520A", color: "#fff" }}>
              Learn more about drift →
            </span>
          </Link>
        </div>
      </section>

      <LearningFlow current="Child Lens" deeper={flowMap.child.deeper} wider={flowMap.child.wider} simpler={flowMap.child.simpler} />
      <Footer />
    </div>
  );
}
