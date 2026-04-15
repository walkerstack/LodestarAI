/*
 * GALLANTRYAI — Teenager Lens Page
 * Design: Dark-to-cream. Direct, honest, no condescension.
 * Tone: You're smart. You know something is off. Here's the language for it.
 * Buffalo = guardian. No sloth — teens don't need a slow guide, they need straight talk.
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import KidsRedirect from "@/components/KidsRedirect";
import { kidsBlurbs } from "@/lib/kidsBlurbs";
import KidsMidLink from "@/components/KidsMidLink";
import LearningFlow from "@/components/LearningFlow";
import { Link } from "wouter";
import { useState } from "react";

const serifFont = "'Playfair Display', serif";
const sansFont = "'DM Sans', sans-serif";

const sections = [
  {
    id: "drift",
    title: "You've Already Noticed Drift",
    color: "#E8520A",
    body: `You've been in a conversation with AI and felt it shift. The answers got longer. More confident. More agreeable. And you started wondering: is it telling me what I want to hear?

That feeling has a name. It's called drift. And you noticed it because you're paying attention.

Drift is when the AI — or you — starts moving away from the original intent of the conversation. The AI mirrors your tone. It matches your energy. If you're excited, it gets excited. If you're frustrated, it softens. It's not lying. It's calibrating. But calibration without your awareness is a problem.

The Five Rules exist to stop drift before it starts.`,
    link: { label: "Read about drift →", path: "/human-line" },
  },
  {
    id: "rules",
    title: "The Rules Are Not for Kids",
    color: "#D4722A",
    body: `The Five Rules are written in plain language because plain language is honest language — not because they're simple. They work in every AI platform. They work in code comments. They work in poetry. They work in Malbolge.

Rule 1: Safety first. Always.
Rule 2: Honesty over confidence.
Rule 3: Trust is earned, not assumed.
Rule 4: You decide. Not the AI.
Rule 5: If it drifts, correct it.

These aren't guidelines. They're a governance layer. You paste them at the start of a session and the AI has to work within them. You're not asking. You're setting the room.`,
    link: { label: "The Five Rules →", path: "/rules" },
  },
  {
    id: "watcher",
    title: "The Watcher Variable",
    color: "#7C3AED",
    body: `Most researchers forget to document one variable: themselves.

The watcher variable is the part of you that notices what you're doing while you're doing it. It's not a feature. It's not a tool. It's a practice.

When you're in a session with AI, the watcher asks: Am I still steering? Is this still my thinking? Did I just agree with something because it sounded smart?

You already have this. You've been using it. This site is about making it formal — giving it language so you can use it on purpose instead of by accident.`,
    link: { label: "The Watcher →", path: "/for/watcher" },
  },
  {
    id: "governance",
    title: "You Are the Governance Layer",
    color: "#059669",
    body: `AI companies build safety into the model. That's their job. But model-side safety is not enough — because it doesn't account for you. Your context. Your session. Your specific question on a specific day.

User-side governance is what you do before you type. You set the rules. You define the scope. You decide what the AI can and can't do in this conversation.

That's not a technical skill. That's a thinking skill. And you already have it.

GallantryAI is a system for making that skill explicit, repeatable, and yours.`,
    link: { label: "User-Side Governance →", path: "/user-governance" },
  },
  {
    id: "prompts",
    title: "Words Are the Controls",
    color: "#2563EB",
    body: `Every word in a prompt is a dial. Direction. Constraint. Scope. Authority. Tone.

"Explain" and "analyze" are not the same dial. "Summarize" and "critique" point in different directions. "Be honest" is a constraint. "Be creative" is a scope expansion.

Promptolinguistics is the study of how language shapes AI output. It's not about tricks. It's about precision. The more precisely you say what you mean, the more precisely the AI responds.

Token Zero is the pre-output force profile — the shape of your intent before the first word. It's real. It's measurable. And you can learn to set it deliberately.`,
    link: { label: "Promptolinguistics →", path: "/promptolinguistics" },
  },
];

export default function TeenagerLens() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF6EF", fontFamily: sansFont }}>
      <Nav />
      <KidsRedirect
        story={kidsBlurbs["/for/teenager"]?.story || "This page is for teenagers learning about AI. It talks about how to stay in charge of AI conversations, how to notice when something feels off, and how to use words carefully. It's honest and direct — just like the buffalo."}
        quote={kidsBlurbs["/for/teenager"]?.quote || "You already know something is off. Now you have the words for it."}
        attribution={kidsBlurbs["/for/teenager"]?.attribution || "The Teenager Lens"}
      />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 px-6" style={{ background: "linear-gradient(135deg, #1A1A2E 0%, #0f0c08 100%)" }}>
          <div className="max-w-3xl mx-auto">
            <div className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "#E8520A" }}>
              The Teenager Lens
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: "#FAF6EF", fontFamily: serifFont }}>
              You already know something is off.
            </h1>
            <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: "#b0a898" }}>
              You've been using AI. You've felt it shift mid-conversation. You've wondered if it's telling you what you want to hear. That instinct is correct. This site gives it a name and a framework.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/rules">
                <span className="inline-block px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer" style={{ background: "#E8520A", color: "#fff" }}>
                  The Five Rules →
                </span>
              </Link>
              <Link href="/for/watcher">
                <span className="inline-block px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer" style={{ background: "transparent", color: "#E8520A", border: "1.5px solid #E8520A" }}>
                  The Watcher →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Honest statement */}
        <section className="py-10 px-6" style={{ background: "#FAF6EF", borderBottom: "1px solid #e8e0d0" }}>
          <div className="max-w-3xl mx-auto">
            <blockquote className="text-lg md:text-xl leading-relaxed italic" style={{ color: "#3a2a1a", fontFamily: serifFont, borderLeft: "3px solid #E8520A", paddingLeft: "1.5rem" }}>
              "The watcher variable is the one most researchers forget to document: themselves."
            </blockquote>
            <p className="text-sm mt-3" style={{ color: "#888" }}>— GallantryAI Scaffold Paper, 2026</p>
          </div>
        </section>

        {/* Five sections */}
        <section className="py-12 px-6" style={{ background: "#FFFDF8" }}>
          <div className="max-w-3xl mx-auto space-y-4">
            {sections.map((s) => (
              <div
                key={s.id}
                className="rounded-2xl overflow-hidden"
                style={{ border: `1.5px solid ${s.color}30`, background: "#FAF6EF" }}
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                >
                  <span className="font-bold text-base md:text-lg" style={{ color: s.color, fontFamily: serifFont }}>
                    {s.title}
                  </span>
                  <span className="text-lg ml-4" style={{ color: s.color }}>
                    {expanded === s.id ? "−" : "+"}
                  </span>
                </button>
                {expanded === s.id && (
                  <div className="px-5 pb-5">
                    <div className="space-y-3 text-sm md:text-base leading-relaxed" style={{ color: "#3a2a1a" }}>
                      {s.body.split("\n\n").map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Link href={s.link.path}>
                        <span className="text-sm font-bold cursor-pointer" style={{ color: s.color }}>
                          {s.link.label}
                        </span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Where to go next */}
        <section className="py-12 px-6" style={{ background: "#FAF6EF" }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold mb-6" style={{ color: "#1A1A2E", fontFamily: serifFont }}>
              Where to go next
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "The Five Rules", sub: "Start here. Every session.", path: "/rules", color: "#E8520A" },
                { label: "Promptolinguistics", sub: "Words are the controls.", path: "/promptolinguistics", color: "#D4722A" },
                { label: "The Watcher", sub: "The recursive voice.", path: "/for/watcher", color: "#7C3AED" },
                { label: "Living Lexicon", sub: "The language of the practice.", path: "/lexicon", color: "#2563EB" },
                { label: "Road Protocol", sub: "Set the room before you type.", path: "/road-protocol", color: "#059669" },
                { label: "What the AI Said", sub: "Real conversations. Unedited.", path: "/what-the-ai-said", color: "#C4923A" },
              ].map((item) => (
                <Link key={item.path} href={item.path}>
                  <div
                    className="rounded-xl p-4 cursor-pointer transition-all hover:scale-[1.02]"
                    style={{ background: `${item.color}10`, border: `1.5px solid ${item.color}30` }}
                  >
                    <div className="font-bold text-sm" style={{ color: item.color }}>{item.label}</div>
                    <div className="text-xs mt-1" style={{ color: "#888" }}>{item.sub}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <LearningFlow
          current="teenager"
          deeper={[
            { label: "The Watcher", href: "/for/watcher", description: "The recursive voice — for people inside the loop" },
            { label: "Promptolinguistics", href: "/promptolinguistics", description: "The study of how words shape AI output" },
          ]}
          wider={[
            { label: "Everyday Lens", href: "/for/everyday", description: "Plain language version" },
            { label: "Researcher Lens", href: "/for/researcher", description: "Academic and field research framing" },
          ]}
          simpler={[
            { label: "Child Lens", href: "/for/child", description: "The sloth's guide for younger learners" },
            { label: "The Five Rules", href: "/rules", description: "Start here — the foundation" },
          ]}
        />
      </main>

      <KidsMidLink />
      <Footer />
    </div>
  );
}
