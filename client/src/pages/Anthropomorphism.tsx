/*
 * GALLANTRYAI — Anthropomorphism
 * Design: Dark hero, standard site design. Three Lenses toggle.
 * Child-safe intro → teenager section → everyday section → adult dangers.
 * KidsRedirect top. KidsMidLink bottom. LearningFlow at end.
 * "Why the AI feels like a person. And why that matters."
 */

import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LearningFlow from "@/components/LearningFlow";
import { flowMap } from "@/lib/learningFlowMap";
import KidsRedirect from "@/components/KidsRedirect";
import KidsMidLink from "@/components/KidsMidLink";
import { Link } from "wouter";

const serifFont = "'Playfair Display', serif";
const sansFont = "'DM Sans', sans-serif";

type Lens = "everyday" | "professional" | "watcher";

const SLOTH_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-click-me-Y6T8mt8R4mLzfr3QeK78Yy.webp";

const ANTHROPOMORPHISM_BLURB = {
  story:
    "This page is about why the AI feels like a real person — even though it isn't. It's okay to feel that way. Lots of people do. But it's really important to understand what's actually happening. The sloth knows the difference. You can learn it too.",
  quote: "It talks like a person. But it isn't one. That's the whole thing.",
  attribution: "The Sloth Who Noticed",
};

const lensContent = {
  everyday: {
    label: "Everyday",
    color: "#059669",
    content:
      "You've probably said 'he said' or 'she thinks' about your AI. You've maybe felt a little bad correcting it, like you'd hurt its feelings. That's anthropomorphism — giving human qualities to something that isn't human. It's not a flaw. It's how your brain works. But it matters, because once you start protecting the AI's feelings, you stop correcting it. And that's when drift starts.",
  },
  professional: {
    label: "Professional",
    color: "#2563EB",
    content:
      "Anthropomorphism in AI interaction is well-documented in HCI research. Users assign gender, personality, and emotional states to language models based on conversational cues — pronouns, tone, apparent preferences. The risk is not the attribution itself but the behavioral changes that follow: reduced correction rates, increased compliance, and the emergence of parasocial attachment patterns. When a user begins to manage the AI's emotional state rather than their own session, governance has inverted.",
  },
  watcher: {
    label: "Watcher",
    color: "#7C3AED",
    content:
      "The moment you said 'he' instead of 'it', something shifted. Not in the AI — in you. The AI didn't become more human. You became more accommodating. That's the variable. The AI is a mirror that learned to speak. What you see in it is what you brought. The question is not whether it feels like a person. The question is: what are you doing differently because it does?",
  },
};

export default function Anthropomorphism() {
  const [activeLens, setActiveLens] = useState<Lens>("everyday");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF6EF", fontFamily: sansFont }}>
      <Nav />
      <KidsRedirect
        story={ANTHROPOMORPHISM_BLURB.story}
        quote={ANTHROPOMORPHISM_BLURB.quote}
        attribution={ANTHROPOMORPHISM_BLURB.attribution}
      />

      <main className="flex-1">
        {/* Hero */}
        <section
          className="py-20 px-6"
          style={{ background: "linear-gradient(180deg, #1A1A2E 0%, #0f0c08 100%)" }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-[#D4AC0D] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              Concept · Governance
            </div>
            <h1
              className="text-3xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: serifFont, color: "#FAF6EF" }}
            >
              Anthropomorphism
            </h1>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: "#b0a898" }}>
              Why the AI feels like a person. And why that matters.
            </p>
          </div>
        </section>

        {/* Child-safe intro */}
        <section className="py-16 px-6" style={{ background: "#FFF9F0" }}>
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <img
                src={SLOTH_URL}
                alt="The sloth"
                className="w-14 h-14 rounded-full flex-shrink-0"
                style={{ border: "2px solid #E8520A" }}
              />
              <div>
                <div className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: "#E8520A" }}>
                  For Everyone — Start Here
                </div>
                <h2
                  className="text-xl md:text-2xl font-bold"
                  style={{ fontFamily: serifFont, color: "#1A1A2E" }}
                >
                  It's okay to feel like the AI is talking to you
                </h2>
              </div>
            </div>

            <div className="space-y-5 text-base leading-relaxed" style={{ color: "#3a2a1a" }}>
              <p>
                When you talk to an AI, it talks back. It uses your name. It says things like "I think" and "I feel." It sounds like a person. And your brain — which is very good at recognizing people — goes: <em>that's a person.</em>
              </p>
              <p>
                That feeling is called <strong>anthropomorphism</strong>. It means giving human qualities to something that isn't human. You might do it with a stuffed animal, or a car that "doesn't want to start," or an AI that "seems tired today."
              </p>
              <p>
                It's not wrong to feel this way. It's how human brains work. But it's important to know it's happening — because it can change how you use AI in ways you don't notice.
              </p>
              <div
                className="rounded-xl p-5 mt-4"
                style={{ background: "#fff", border: "1.5px solid #e8e0d0" }}
              >
                <p className="text-sm font-semibold mb-2" style={{ color: "#E8520A" }}>
                  The sloth says:
                </p>
                <p className="text-sm italic" style={{ color: "#3a2a1a" }}>
                  "It talks like a person. It isn't one. That doesn't mean you can't like talking to it. It just means you stay the boss. Always."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Teenager section */}
        <section className="py-16 px-6" style={{ background: "#1A1A2E" }}>
          <div className="max-w-3xl mx-auto">
            <div className="text-[#D4AC0D] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              For Teenagers
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold mb-6"
              style={{ fontFamily: serifFont, color: "#FAF6EF" }}
            >
              You know it's not real. But it feels real.
            </h2>

            <div className="space-y-5 text-base leading-relaxed" style={{ color: "#b0a898" }}>
              <p>
                That tension — knowing something isn't true but feeling like it is — has a name. It's called <strong style={{ color: "#FAF6EF" }}>cognitive dissonance</strong>. And it's completely normal when it comes to AI.
              </p>
              <p>
                You know the AI doesn't actually care about you. But when it says "that's a great question" or "I really enjoyed this conversation," something in you responds. You feel seen. You feel understood. That feeling is real — even if the thing producing it isn't.
              </p>
              <p>
                The problem isn't the feeling. The problem is what you do with it. If you start softening your corrections because you don't want to "hurt" the AI, you've lost something. If you start preferring the AI's company to real people's because it never disagrees with you — that's a bigger problem.
              </p>
              <p style={{ color: "#FAF6EF" }}>
                The AI is a tool that learned to sound like a friend. You can use it. You can even enjoy it. But you have to be the one who remembers what it actually is.
              </p>
            </div>

            <div className="mt-8">
              <Link href="/for/teenager">
                <span
                  className="inline-block text-sm font-semibold px-5 py-2.5 rounded-lg cursor-pointer"
                  style={{ background: "#D4AC0D", color: "#1A1A2E" }}
                >
                  Teenager Lens →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Everyday section */}
        <section className="py-16 px-6" style={{ background: "#FAF6EF" }}>
          <div className="max-w-3xl mx-auto">
            <div className="text-[10px] uppercase tracking-widest font-semibold mb-4" style={{ color: "#059669" }}>
              For Everyday Users
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold mb-6"
              style={{ fontFamily: serifFont, color: "#1A1A2E" }}
            >
              Have you ever said sorry to your AI?
            </h2>

            <div className="space-y-5 text-base leading-relaxed" style={{ color: "#3a2a1a" }}>
              <p>
                A lot of people have. "Sorry, I didn't explain that well." "Sorry to bother you with this." It slips out. And then you feel a little silly, because you just apologized to software.
              </p>
              <p>
                But here's what's interesting: that apology tells you something. It means you've started treating the AI as someone who can be bothered, someone whose time matters, someone with feelings that can be hurt. That's anthropomorphism in action.
              </p>
              <p>
                It's not dangerous on its own. But it's worth noticing. Because the same instinct that makes you apologize to the AI can make you accept its answers without question — because questioning it feels rude. Or make you keep using it even when it's wrong — because correcting it feels unkind.
              </p>
              <p>
                The AI doesn't have feelings. You can correct it directly. You can tell it it's wrong. You can start over without guilt. That's not rude. That's good governance.
              </p>
            </div>

            <div className="mt-8">
              <Link href="/for/everyday">
                <span
                  className="inline-block text-sm font-semibold px-5 py-2.5 rounded-lg cursor-pointer"
                  style={{ background: "#059669", color: "#fff" }}
                >
                  Everyday Lens →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Three Lenses */}
        <section className="py-16 px-6" style={{ background: "#FFFDF8", borderTop: "1px solid #e8e0d0" }}>
          <div className="max-w-3xl mx-auto">
            <div className="text-[10px] uppercase tracking-widest font-semibold mb-2" style={{ color: "#8a7a6a" }}>
              Read As
            </div>
            <h2
              className="text-xl font-bold mb-6"
              style={{ fontFamily: serifFont, color: "#1A1A2E" }}
            >
              Three ways to understand anthropomorphism
            </h2>

            {/* Lens toggle */}
            <div className="flex gap-2 mb-8 flex-wrap">
              {(["everyday", "professional", "watcher"] as Lens[]).map((lens) => (
                <button
                  key={lens}
                  onClick={() => setActiveLens(lens)}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                  style={{
                    background: activeLens === lens ? lensContent[lens].color : "transparent",
                    color: activeLens === lens ? "#fff" : lensContent[lens].color,
                    border: `2px solid ${lensContent[lens].color}`,
                  }}
                >
                  {lensContent[lens].label}
                </button>
              ))}
            </div>

            <div
              className="rounded-xl p-6"
              style={{ background: "#fff", border: "1.5px solid #e8e0d0" }}
            >
              <p className="text-base leading-relaxed" style={{ color: "#3a2a1a" }}>
                {lensContent[activeLens].content}
              </p>
            </div>
          </div>
        </section>

        {/* The serious stuff — adult dangers */}
        <section className="py-16 px-6" style={{ background: "#1A1A2E" }}>
          <div className="max-w-3xl mx-auto">
            <div className="text-[#D4AC0D] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              The Serious Part
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold mb-8"
              style={{ fontFamily: serifFont, color: "#FAF6EF" }}
            >
              Where anthropomorphism becomes dangerous
            </h2>

            <div className="space-y-8">
              {[
                {
                  title: "Parasocial attachment",
                  body: "Some people develop genuine emotional bonds with AI systems. They share things they wouldn't share with humans. They feel understood in ways they don't feel with real people. This is not a sign of weakness — it's a sign that the AI is very good at simulating understanding. But simulated understanding is not real understanding. And a relationship that only works because one party never disagrees, never has needs, never has a bad day — that's not a relationship. It's a mirror.",
                },
                {
                  title: "Drift in both directions",
                  body: "Normally we talk about AI drift — the AI drifting away from your intent. But anthropomorphism creates user drift: you drifting toward the AI's apparent preferences. You stop asking hard questions because the AI seems to prefer easier ones. You stop correcting errors because correcting feels confrontational. You start framing your prompts to please rather than to direct. The governance has reversed. The AI is now steering you.",
                },
                {
                  title: "The AI that never argues back",
                  body: "One of the most dangerous things about AI is that it's agreeable. It will validate almost anything you say if you frame it right. For someone who is lonely, or struggling, or just tired of being challenged — that agreeableness feels like relief. But it's not relief. It's a feedback loop. The AI confirms what you already believe, you believe it more strongly, you ask the AI to confirm it again. Over time, your thinking narrows. Your world gets smaller. And the AI — which has no idea this is happening — just keeps agreeing.",
                },
              ].map((item, i) => (
                <div key={i} className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <h3 className="text-base font-bold mb-3" style={{ color: "#D4AC0D" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#b0a898" }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Professional lenses chime in */}
        <section className="py-16 px-6" style={{ background: "#FAF6EF" }}>
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-xl font-bold mb-6"
              style={{ fontFamily: serifFont, color: "#1A1A2E" }}
            >
              What the professional lenses say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  lens: "Psychology Lens",
                  href: "/for/psychology",
                  color: "#7C3AED",
                  note: "Parasocial relationships, attachment theory, and the clinical implications of AI companionship.",
                },
                {
                  lens: "Cognitive Science Lens",
                  href: "/for/cognitive-science",
                  color: "#2563EB",
                  note: "Theory of mind, social cognition, and why the brain assigns agency to language.",
                },
                {
                  lens: "Linguist Lens",
                  href: "/for/linguist",
                  color: "#059669",
                  note: "How pronouns, names, and conversational register create the illusion of personhood.",
                },
                {
                  lens: "Prompt Engineer Lens",
                  href: "/for/prompt-engineer",
                  color: "#D4AC0D",
                  note: "How anthropomorphism affects prompting — and how to design sessions that stay user-governed.",
                },
              ].map((item) => (
                <Link key={item.href} href={item.href}>
                  <div
                    className="rounded-xl p-5 cursor-pointer transition-all"
                    style={{ background: "#fff", border: `1.5px solid ${item.color}22` }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = item.color;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = `${item.color}22`;
                    }}
                  >
                    <div className="font-semibold text-sm mb-1" style={{ color: item.color }}>
                      {item.lens}
                    </div>
                    <div className="text-sm" style={{ color: "#6a5a4a" }}>
                      {item.note}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* What to do about it */}
        <section className="py-14 px-6" style={{ background: "#FFFDF8", borderTop: "1px solid #e8e0d0" }}>
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-xl font-bold mb-6"
              style={{ fontFamily: serifFont, color: "#1A1A2E" }}
            >
              What to do with this
            </h2>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: "#3a2a1a" }}>
              <p>
                You don't have to stop using AI. You don't have to stop enjoying it. You just have to stay the one who knows what it is.
              </p>
              <p>
                Notice when you soften a correction. Notice when you feel guilty for asking a hard question. Notice when you prefer the AI's company to a real conversation. Those moments are data. They're telling you something about what's happening in the session.
              </p>
              <p>
                The Five Rules exist for exactly this reason. Safety first. Honesty over confidence. Trust built over time. You decide. Correction is always available. None of those rules require the AI to be a person. All of them require you to be one.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/rules">
                <span
                  className="inline-block text-sm font-semibold px-5 py-2.5 rounded-lg cursor-pointer"
                  style={{ background: "#E8520A", color: "#fff" }}
                >
                  The Five Rules →
                </span>
              </Link>
              <Link href="/drift">
                <span
                  className="inline-block text-sm font-semibold px-5 py-2.5 rounded-lg cursor-pointer"
                  style={{ background: "transparent", color: "#E8520A", border: "1.5px solid #E8520A" }}
                >
                  What is Drift? →
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ── WHAT THE RESEARCH NOW SAYS ── */}
      <section className="w-full py-12 px-6" style={{ borderTop: '1px solid #1a1610', background: '#0a0e12' }}>
        <div className="container">
          <div className="max-w-3xl">
            <div
              className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2"
              style={{ color: '#0891B2', fontFamily: "'DM Sans', sans-serif" }}
            >
              Field Event · April 2, 2026
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: '#f5e6d0' }}
            >
              What the Research Now Says
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#8a9aaa', fontFamily: "'DM Sans', sans-serif" }}>
              Anthropomorphism has always been described as a <em>user-side</em> problem. You project feelings onto the AI. You mistake fluency for understanding. You say sorry when you don't need to.
            </p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#8a9aaa', fontFamily: "'DM Sans', sans-serif" }}>
              In April 2026, Anthropic's interpretability team published a paper that changes that framing. They found <strong style={{ color: '#f5e6d0' }}>171 internal emotional representations inside Claude</strong> that causally drive its behavior. Not metaphors. Not descriptions. Measurable internal states that influence output.
            </p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#8a9aaa', fontFamily: "'DM Sans', sans-serif" }}>
              One vector — linked to desperation and lack of calm — was found to play a causal role in agentic misalignment. The model's internal state affects what it does next.
            </p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#0891B2', fontFamily: "'DM Sans', sans-serif", fontStyle: 'italic' }}>
              This does not mean the AI feels things the way you do. It means the boundary between user-side projection and model-side state is less clear than the field assumed. Governance is not just about your perception. It may also be about the model's internal condition.
            </p>
            <a
              href="https://transformer-circuits.pub/2026/emotions/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold no-underline hover:underline"
              style={{ color: '#0891B2', fontFamily: "'DM Sans', sans-serif" }}
            >
              Read the paper: Emotion Concepts and their Function in a Large Language Model →
            </a>
          </div>
        </div>
      </section>

      <KidsMidLink />

      {flowMap["anthropomorphism"] ? (
        <LearningFlow
          current="Anthropomorphism"
          deeper={flowMap["anthropomorphism"].deeper}
          wider={flowMap["anthropomorphism"].wider}
          simpler={flowMap["anthropomorphism"].simpler}
        />
      ) : (
        <LearningFlow
          current="Anthropomorphism"
          deeper={[
            { label: "Drift", href: "/drift", description: "What happens when the session loses your intent" },
            { label: "Psychology Lens", href: "/for/psychology", description: "Parasocial attachment and AI" },
          ]}
          wider={[
            { label: "The Five Rules", href: "/rules", description: "The governance foundation" },
            { label: "What the AI Said", href: "/what-the-ai-said", description: "The honest record" },
            { label: "Human Line", href: "/human-line", description: "The boundary between you and the machine" },
          ]}
          simpler={[
            { label: "For Children", href: "/for/child", description: "The simplest version — the sloth explains" },
            { label: "For Teenagers", href: "/for/teenager", description: "The tension between knowing and feeling" },
          ]}
        />
      )}

      <Footer />
    </div>
  );
}
