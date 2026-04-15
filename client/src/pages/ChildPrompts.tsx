/*
 * GALLANTRYAI — Kids First Prompts
 * Simple, visual, sloth-guided. First prompts a child can use safely.
 * Three Voices written at child level.
 * Links to full Prompt Library when ready to grow.
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import KidsRedirect from "@/components/KidsRedirect";
import KidsMidLink from "@/components/KidsMidLink";
import LearningFlow from "@/components/LearningFlow";
import { Link } from "wouter";
import { useState } from "react";

const serifFont = "'Playfair Display', serif";
const sansFont = "'Nunito', 'DM Sans', sans-serif";

const SLOTH_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-click-me-Y6T8mt8R4mLzfr3QeK78Yy.webp";

const firstPrompts = [
  {
    id: "ask",
    emoji: "❓",
    title: "Ask a Question",
    color: "#E8520A",
    simple: "Type something you want to know. 'Why is the sky blue?' 'How do spiders make webs?' 'What is the biggest animal?' That's it. You asked. The AI will answer.",
    try: "What is something you've always wondered about? Type it right now.",
    rule: "Rule to remember: The AI might be wrong. Check with a grown-up if it matters.",
  },
  {
    id: "tell",
    emoji: "📢",
    title: "Tell It What to Do",
    color: "#D4722A",
    simple: "Instead of asking, you can give a command. 'Write me a poem about dogs.' 'Make a list of ten funny animals.' 'Tell me a short story about a sloth.' You're the boss. The AI does the task.",
    try: "Tell the AI to write a three-sentence story about your favourite animal.",
    rule: "Rule to remember: You decide if the answer is good. If it's not right, ask again.",
  },
  {
    id: "rules",
    emoji: "📋",
    title: "Give It Rules First",
    color: "#C4923A",
    simple: "Before you ask anything, tell the AI the rules. 'Be honest. Tell me if you don't know. Keep it simple.' Now the AI knows how to talk to you. You set the room before you walked in.",
    try: "Try this: Type 'Be honest. Tell me if you don't know. Keep it simple for a kid.' Then ask your question.",
    rule: "Rule to remember: Rules at the start make the whole conversation better.",
  },
  {
    id: "character",
    emoji: "🎭",
    title: "Give It a Character",
    color: "#A4824A",
    simple: "Tell the AI who to be. 'You are a friendly science teacher.' 'You are a pirate who loves math.' 'You are a patient helper.' The AI will talk like that character for the whole conversation.",
    try: "Tell the AI: 'You are a friendly sloth who explains things slowly and carefully.' Then ask it something.",
    rule: "Rule to remember: The character is pretend. The information still needs to be true.",
  },
  {
    id: "safety",
    emoji: "🛡️",
    title: "The Safety Prompt",
    color: "#059669",
    simple: "This is the most important one. At the start of any conversation, you can type: 'Safety first. Be honest. I am in charge.' Three sentences. That's your shield. The AI knows the rules before it says a single word.",
    try: "Type these three sentences right now in any AI: 'Safety first. Be honest. I am in charge.' See what happens.",
    rule: "Rule to remember: You can always stop. You can always start over. You are always in charge.",
  },
];

export default function ChildPrompts() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FFFDF8", fontFamily: sansFont }}>
      <Nav />
      <KidsRedirect
        story="This page is all about your first prompts — the first things you can type to an AI. It starts with the easiest thing (asking a question) and goes all the way to giving the AI rules before it even starts talking. The sloth will guide you."
        quote="Your first prompt is already inside you. It's the thing you've always wanted to know."
        attribution="First Prompts"
      />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-14 px-6 text-center" style={{ background: "linear-gradient(180deg, #fff8ee 0%, #FFFDF8 100%)" }}>
          <img src={SLOTH_URL} alt="The sloth guide" className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" style={{ border: "3px solid #E8520A" }} />
          <div className="text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: "#E8520A" }}>First Prompts</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#1A1A2E", fontFamily: serifFont }}>
            Your first words to AI.
          </h1>
          <p className="text-base leading-relaxed max-w-xl mx-auto mb-6" style={{ color: "#5a4a3a" }}>
            A prompt is what you type to an AI. That's it. This page shows you five kinds of prompts — from the simplest question to the safety prompt that puts you in charge before you even begin.
          </p>
          <Link href="/prompts">
            <span className="inline-block px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer" style={{ background: "transparent", color: "#E8520A", border: "1.5px solid #E8520A" }}>
              See the full Prompt Library (grown-up version) →
            </span>
          </Link>
        </section>

        {/* Prompt cards */}
        <section className="py-10 px-6">
          <div className="max-w-2xl mx-auto space-y-4">
            {firstPrompts.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl overflow-hidden"
                style={{ border: `2px solid ${p.color}30`, background: "#fff" }}
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setExpanded(expanded === p.id ? null : p.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{p.emoji}</span>
                    <span className="font-bold text-base" style={{ color: p.color, fontFamily: serifFont }}>{p.title}</span>
                  </div>
                  <span className="text-xl ml-4" style={{ color: p.color }}>{expanded === p.id ? "−" : "+"}</span>
                </button>

                {expanded === p.id && (
                  <div className="px-5 pb-5 space-y-4">
                    <p className="text-sm leading-relaxed" style={{ color: "#3a2a1a" }}>{p.simple}</p>

                    <div className="p-4 rounded-xl" style={{ background: `${p.color}10`, border: `1.5px solid ${p.color}30` }}>
                      <p className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: p.color }}>Try It</p>
                      <p className="text-sm leading-relaxed" style={{ color: "#3a2a1a" }}>{p.try}</p>
                    </div>

                    <div className="p-3 rounded-xl" style={{ background: "rgba(5,150,105,0.06)", border: "1px solid rgba(5,150,105,0.2)" }}>
                      <p className="text-xs font-bold" style={{ color: "#059669" }}>{p.rule}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Safety reminder */}
        <section className="py-10 px-6" style={{ background: "#FAF6EF" }}>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "#aaa" }}>Always remember</p>
            <blockquote className="text-lg md:text-xl italic font-medium" style={{ color: "#1A1A2E", fontFamily: serifFont }}>
              "Safety first. Be honest. I am in charge."
            </blockquote>
            <p className="text-sm mt-3 mb-6" style={{ color: "#888" }}>Three sentences. Paste them at the start of any AI conversation.</p>
            <Link href="/rules">
              <span className="inline-block px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer" style={{ background: "#E8520A", color: "#fff" }}>
                Read the Five Rules →
              </span>
            </Link>
          </div>
        </section>

        <LearningFlow
          current="child-prompts"
          deeper={[
            { label: "The Full Prompt Library", href: "/prompts", description: "All prompt types from question to constitution" },
            { label: "The Five Rules", href: "/rules", description: "The foundation of every AI session" },
          ]}
          wider={[
            { label: "What Are Patterns?", href: "/for/child/patterns", description: "How AI learns from examples" },
            { label: "Child Lens", href: "/for/child", description: "Your main guide page" },
          ]}
          simpler={[
            { label: "Child Five Rules", href: "/for/child/rules", description: "The rules in your language" },
            { label: "Prompt Games", href: "/prompt-games", description: "Practice prompting through play" },
          ]}
        />
      </main>

      <KidsMidLink />
      <Footer />
    </div>
  );
}
