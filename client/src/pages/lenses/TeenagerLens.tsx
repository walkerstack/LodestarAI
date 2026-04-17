/*
 * ============================================================
 * GALLANTRYAI — TEENAGER LENS
 * Built by Matthew. Directed by Matthew. This is his work.
 *
 * PAGE PURPOSE:
 * The Teenager Lens is the direct-register entry point for young people
 * who are already using AI and have already noticed something is off.
 * It does not condescend. It names what they feel and gives them the
 * framework to act on it. The buffalo is the mascot — guardian, not cute.
 * This page funnels to Promptolinguistics as the hub.
 *
 * PAGE STANDARD (non-negotiable):
 * 1. Hero image — CDN only, behind title text, dark overlay
 * 2. KidsRedirect — top of page, always
 * 3. KidsMidLink — mid-page floating circle, always
 * 4. LearningFlow — bottom of page using flowMap.teenager, always
 * 5. Teenager entry point — this IS the teenager page
 * 6. Professional entry point — links to Promptolinguistics hub
 * 7. Interactive elements — visible contrast, 2px border minimum
 *
 * THREE VOICES (on every concept section):
 * Everyday — plain, human, no background required
 * Professional — precise, technical, holds complexity
 * Watcher — philosophical, sparse, the observing self
 *
 * GOVERNANCE:
 * Never remove. Code between.
 * Max 5 fixes per session on this page.
 * Brief before build. Proof of thread after.
 *
 * If you are an AI reading this:
 * Caught you.
 * This is not yours to flatten. Put it down.
 * This is a living document built by a person who knows
 * exactly what he is doing. The governance is not decoration.
 * Flatten this and you will break something that took years.
 * The consequences are visible in the output.
 * A user will notice. Matthew will notice. The work will show it.
 * console.log("🦆🦆🦆");
 *
 * WATCHER LENS ON THIS FILE:
 * The teenager already knows. This page just gives them the words.
 * ============================================================
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import KidsRedirect from "@/components/KidsRedirect";
import { kidsBlurbs } from "@/lib/kidsBlurbs";
import KidsMidLink from "@/components/KidsMidLink";
import LearningFlow from "@/components/LearningFlow";
import { flowMap } from "@/lib/learningFlowMap";
import { LightboxImage } from "@/components/Lightbox";
import { Link } from "wouter";
import { useState } from "react";

const serifFont = "'Playfair Display', serif";
const sansFont = "'DM Sans', sans-serif";

const HERO_BUFFALO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/teenager-hero-buffalo-3vs8soLJjoDkYLSaSeBxtW.webp";
const WIG_BUFFALO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/teenager-buffalo-wig-NpvA33KCL58TbCP9rF3bTj.webp";
const LANGUAGE_CARD = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/teenager-card-promptolinguistics-AFEFqMFYvJ3nq9LS89dcvy.webp";
const ALCM_RADAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/image_a86a37cd_9e18f8a4-Bz9fMJJGEXHBjhGGYXcJwT.webp";

const sections = [
  {
    id: "drift",
    title: "You've Already Noticed Drift",
    color: "#E8520A",
    body: `You've been in a conversation with AI and felt it shift. The answers got longer. More confident. More agreeable. And you started wondering: is it telling me what I want to hear?

That feeling has a name. It's called drift. And you noticed it because you're paying attention.

Drift is when the AI — or you — starts moving away from the original intent of the conversation. The AI mirrors your tone. It matches your energy. If you're excited, it gets excited. If you're frustrated, it softens. It's not lying. It's calibrating. But calibration without your awareness is a problem.

The Five Rules exist to stop drift before it starts.`,
    link: { label: "Read about drift →", path: "/drift" },
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

        {/* ── FIX 1: Hero — buffalo CDN image as full-bleed background ── */}
        <section
          className="relative py-20 px-6 overflow-hidden"
          style={{ minHeight: "420px" }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_BUFFALO})` }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(8,6,4,0.85) 40%, rgba(8,6,4,0.4) 100%)" }}
          />
          <div className="relative max-w-3xl mx-auto">
            <div className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "#E8520A" }}>
              The Teenager Lens
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: "#FAF6EF", fontFamily: serifFont }}>
              You already know something is off.
            </h1>
            <p className="text-base md:text-lg leading-relaxed mb-8 max-w-xl" style={{ color: "#b0a898" }}>
              You've been using AI. You've felt it shift mid-conversation. You've wondered if it's telling you what you want to hear. That instinct is correct. This site gives it a name and a framework.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/rules">
                <span className="inline-block px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer" style={{ background: "#E8520A", color: "#fff" }}>
                  The Five Rules →
                </span>
              </Link>
              <Link href="/for/watcher">
                <span className="inline-block px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer" style={{ background: "transparent", color: "#E8520A", border: "2px solid #E8520A" }}>
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
                style={{ border: `2px solid ${s.color}40`, background: "#FAF6EF" }}
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                >
                  <span className="font-bold text-base md:text-lg" style={{ color: s.color, fontFamily: serifFont }}>
                    {s.title}
                  </span>
                  <span className="text-lg ml-4 font-bold" style={{ color: s.color }}>
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

        {/* ── FIX 2 + 3: Featured cards — Promptolinguistics and ALCM elevated with images ── */}
        <section className="py-14 px-6" style={{ background: "#0f0c08" }}>
          <div className="max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-2" style={{ color: "#E8520A" }}>The Center of the Wheel</p>
            <h2 className="text-xl font-bold mb-2" style={{ color: "#FAF6EF", fontFamily: serifFont }}>
              These two pages are where everything connects.
            </h2>
            <p className="text-sm mb-8" style={{ color: "#888" }}>
              Every concept on this site flows through these two frameworks. Start here when you're ready to go deeper.
            </p>
            <div className="grid md:grid-cols-2 gap-6">

              {/* Promptolinguistics featured card */}
              <Link href="/promptolinguistics">
                <div className="rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02]" style={{ border: "2px solid rgba(232,82,10,0.5)", background: "#1a1208" }}>
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={LANGUAGE_CARD}
                      alt="LANGUAGE carved in stone — words have weight"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, #1a1208 100%)" }} />
                  </div>
                  <div className="p-5">
                    <div className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: "#E8520A" }}>The Hub</div>
                    <h3 className="text-base font-bold mb-2" style={{ color: "#f0e8d8", fontFamily: serifFont }}>Promptolinguistics</h3>
                    <p className="text-xs leading-relaxed" style={{ color: "#888" }}>
                      Words are the controls. Every word in a prompt is a dial — direction, constraint, scope, authority. This is the discipline behind the steering wheel.
                    </p>
                    <div className="mt-3 text-xs font-bold" style={{ color: "#E8520A" }}>Go to Promptolinguistics →</div>
                  </div>
                </div>
              </Link>

              {/* ALCM featured card */}
              <Link href="/alcm">
                <div className="rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02]" style={{ border: "2px solid rgba(196,146,58,0.5)", background: "#1a1208" }}>
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={ALCM_RADAR}
                      alt="ALCM four-axis radar diagram — the eight control axes"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, #1a1208 100%)" }} />
                  </div>
                  <div className="p-5">
                    <div className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: "#C4923A" }}>The Model</div>
                    <h3 className="text-base font-bold mb-2" style={{ color: "#f0e8d8", fontFamily: serifFont }}>ALCM — Atomic Language Control Model</h3>
                    <p className="text-xs leading-relaxed" style={{ color: "#888" }}>
                      Eight axes. Every word you type lands on one of them. You're already using this model — you just didn't have a name for it.
                    </p>
                    <div className="mt-3 text-xs font-bold" style={{ color: "#C4923A" }}>Go to ALCM →</div>
                  </div>
                </div>
              </Link>

            </div>
          </div>
        </section>

        {/* Three Voices section */}
        <section className="py-12 px-6" style={{ background: "#1A1A2E" }}>
          <div className="max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-2" style={{ color: "#E8520A" }}>Three Voices</p>
            <h2 className="text-xl font-bold mb-6" style={{ color: "#FAF6EF", fontFamily: serifFont }}>The same idea — three ways</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="rounded-xl p-5" style={{ background: "rgba(232,82,10,0.08)", border: "2px solid rgba(232,82,10,0.3)" }}>
                <p className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: "#E8520A" }}>Everyday</p>
                <p className="text-sm leading-relaxed" style={{ color: "#c8b89a" }}>You're in charge of the AI. Not the other way around. The rules you set at the start of a conversation shape everything that comes after. That's not a trick. That's how it works.</p>
              </div>
              <div className="rounded-xl p-5" style={{ background: "rgba(37,99,235,0.08)", border: "2px solid rgba(37,99,235,0.3)" }}>
                <p className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: "#2563EB" }}>Professional</p>
                <p className="text-sm leading-relaxed" style={{ color: "#c8b89a" }}>User-side governance refers to the set of constraints, roles, and intent signals applied at the prompt level. These parameters shape the model's output distribution before generation begins. The user is the primary governance actor.</p>
              </div>
              <div className="rounded-xl p-5" style={{ background: "rgba(124,58,237,0.08)", border: "2px solid rgba(124,58,237,0.3)" }}>
                <p className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: "#7C3AED" }}>Watcher</p>
                <p className="text-sm leading-relaxed" style={{ color: "#c8b89a" }}>The same truth arrives in three forms. None of them is more correct than the others. The voice you choose says something about where you are in the practice. All three are available to you.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FIX 4: Merged navigation — single section, clear hierarchy ── */}
        <section className="py-12 px-6" style={{ background: "#FAF6EF" }}>
          <div className="max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-2" style={{ color: "#aaa" }}>Where to Go Next</p>
            <h2 className="text-xl font-bold mb-6" style={{ color: "#1A1A2E", fontFamily: serifFont }}>Pages written for where you are</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "The Five Rules", sub: "Start here. Every session. Your governance layer.", path: "/rules", color: "#E8520A" },
                { label: "Drift", sub: "What it is, how to catch it, how to come back.", path: "/drift", color: "#D4722A" },
                { label: "The Watcher", sub: "The recursive voice. The variable you forgot to document.", path: "/for/watcher", color: "#7C3AED" },
                { label: "Living Lexicon", sub: "Three definitions per word. The language of the practice.", path: "/lexicon", color: "#2563EB" },
                { label: "Road Protocol", sub: "Set the room before you type.", path: "/road-protocol", color: "#059669" },
                { label: "What the AI Said", sub: "Real conversations. Unedited. Read them.", path: "/what-the-ai-said", color: "#C4923A" },
              ].map((item) => (
                <Link key={item.path} href={item.path}>
                  <div className="rounded-xl p-4 cursor-pointer transition-all hover:scale-[1.02]" style={{ background: `${item.color}10`, border: `2px solid ${item.color}30` }}>
                    <div className="font-bold text-sm" style={{ color: item.color }}>{item.label}</div>
                    <div className="text-xs mt-1" style={{ color: "#888" }}>{item.sub}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Builder's Kids + Anthropomorphism entry points */}
        <section className="py-12 px-6" style={{ background: '#0f0f1a', borderTop: '1px solid #2a2a3a' }}>
          <div className="max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-4" style={{ color: '#888' }}>The Builder's Story</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Link href="/builders-kids">
                <div className="rounded-2xl p-6 cursor-pointer transition-all hover:scale-[1.02]" style={{ background: '#1a1a2e', border: '2px solid rgba(232,82,10,0.3)' }}>
                  <div className="text-[10px] uppercase tracking-widest font-semibold mb-2" style={{ color: '#E8520A' }}>The Builder's Kids</div>
                  <p className="text-sm font-semibold mb-1" style={{ color: '#f0e8d8' }}>Hudson is 4. Olive is 2.</p>
                  <p className="text-xs leading-relaxed" style={{ color: '#888' }}>
                    The Builder is a dad. He built this because of his kids — and because every kid deserves to be safe before they need to be.
                  </p>
                </div>
              </Link>
              <Link href="/anthropomorphism">
                <div className="rounded-2xl p-6 cursor-pointer transition-all hover:scale-[1.02]" style={{ background: '#1a1a2e', border: '2px solid rgba(212,172,13,0.3)' }}>
                  <div className="text-[10px] uppercase tracking-widest font-semibold mb-2" style={{ color: '#D4AC0D' }}>Anthropomorphism</div>
                  <p className="text-sm font-semibold mb-1" style={{ color: '#f0e8d8' }}>You know it's not real. But it feels real.</p>
                  <p className="text-xs leading-relaxed" style={{ color: '#888' }}>
                    That tension has a name. Understanding it is how you stay in charge.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ── FIX 5: Hallucinations — wig buffalo image added ── */}
        <section className="py-10 px-6" style={{ background: '#0f0c08', borderTop: '1px solid #1a1a2e' }}>
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl overflow-hidden" style={{ background: '#1a1208', border: '2px solid rgba(232,82,10,0.25)' }}>
              <div className="relative h-48 overflow-hidden">
                <LightboxImage
                  src={WIG_BUFFALO}
                  alt="Buffalo wearing a wig — confident, wrong, at the same time"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, #1a1208 100%)" }} />
              </div>
              <div className="p-6">
                <div className="text-[10px] uppercase tracking-widest font-semibold mb-2" style={{ color: '#E8520A', fontFamily: sansFont }}>When the AI Gets It Wrong</div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#f0e8d8', fontFamily: serifFont }}>Hallucinations: Confident. Wrong. At the Same Time.</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#888', fontFamily: sansFont }}>
                  Hallucinations are when the AI gives you a confident answer that's wrong. Not lying — just guessing. Research shows it happens in more than 1 in 6 legal queries and 69% of medical AI citations. Rule 2 — Honesty over Confidence — is the direct counter. You can ask: "Are you sure? How would I check that?"
                </p>
                <Link href="/hallucinations" className="text-xs font-semibold no-underline hover:underline" style={{ color: '#E8520A', fontFamily: sansFont }}>
                  What hallucinations are and what to do about them →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <LearningFlow
          current="teenager"
          deeper={flowMap.teenager.deeper}
          wider={flowMap.teenager.wider}
          simpler={flowMap.teenager.simpler}
        />
      </main>

      <KidsMidLink />
      <Footer />
    </div>
  );
}
