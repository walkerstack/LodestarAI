/*
 * GALLANTRYAI — Child Lens Page
 * Design: Warm white register — purity, honesty, wonder
 * White background flowing from dark/orange brand.
 * Sloth is the guide. Words are magic. Slow down, think first.
 * Ready for Builder's Claude research additions.
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Link } from "wouter";

const FIELD_GUIDE_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000008840_5b1a6230.png";

const IMGS = {
  fieldGuideCover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000008740_d2ac3f98.png",
  slothTrick: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000008728_a5deb072.png",
  remember: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000008721_99c2f0db.png",
  whatCanYouDo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000008720_800863cc.png",
  familyLantern: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000008706_916d1099.png",
};

const baseFont = "'Nunito', 'DM Sans', sans-serif";
const serifFont = "'Playfair Display', serif";

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
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#FFFDF8", fontFamily: baseFont }}
    >
      <Nav />

      {/* Hero — warm white with orange accent */}
      <section
        className="w-full py-16 px-6 text-center"
        style={{
          background: "linear-gradient(to bottom, #1A1A2E 0%, #E8520A 35%, #FFF8EE 100%)",
        }}
      >
        <div className="max-w-2xl mx-auto">
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
          <img
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
          <img
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
          <img
            src={IMGS.remember}
            alt="Remember — AI is not a person. It cannot feel. You are in charge."
            className="w-full rounded-2xl shadow-md"
            style={{ maxWidth: "480px", margin: "0 auto", display: "block" }}
          />
        </div>
      </section>

      {/* Field Guide PDF */}
      <section className="py-12 px-6 text-center" style={{ background: "#FFF0D8" }}>
        <div className="max-w-lg mx-auto">
          <div className="text-xs uppercase tracking-widest mb-3 font-semibold" style={{ color: "#E8520A" }}>
            The Little AI Field Guide
          </div>
          <h3
            className="text-xl font-black mb-3"
            style={{ fontFamily: serifFont, color: "#1A1A2E" }}
          >
            Download the full carousel.
          </h3>
          <p style={{ color: "#5a4a3a", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
            The Little AI Field Guide in slide format. Print it. Read it together. Share it.
          </p>
          <a
            href="https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/Little_AI_Field_Guide_Carousel_FINAL(1)_8ea0eaec.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-2xl px-6 py-3 font-bold text-sm no-underline transition-opacity hover:opacity-80"
            style={{ background: "#1A1A2E", color: "#FFF0D8" }}
          >
            Open Field Guide PDF →
          </a>
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

      <Footer />
    </div>
  );
}
