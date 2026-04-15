/*
 * GALLANTRYAI — Kids First Prompts
 * Buffalo in wig at hero. Five sloth wisdom images woven into story.
 * Fleshed-out sections. Small prompt playground.
 * Nothing removed from original — only additions.
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

const BUFFALO_WIG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/kids-prompts-buffalo-wig-d7M7L7BAfwJ3B67MfxmsDS.webp";

const firstPrompts = [
  {
    id: "ask",
    emoji: "❓",
    title: "Ask a Question",
    color: "#E8520A",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/kids-prompts-sloth-question-aibMtfLxSoo5fPthuS7EdA.webp",
    imgAlt: "The sloth holds a glowing question mark",
    story: "The sloth woke up one morning with a question it couldn't shake. \"Why do leaves fall?\" it wondered. So it typed the question. Just like that. And the AI answered. That's how it starts — with something you've always wanted to know.",
    simple: "Type something you want to know. 'Why is the sky blue?' 'How do spiders make webs?' 'What is the biggest animal?' That's it. You asked. The AI will answer.",
    try: "What is something you've always wondered about? Type it right now.",
    rule: "Rule to remember: The AI might be wrong. Check with a grown-up if it matters.",
    example: "Why do leaves change colour in autumn?",
  },
  {
    id: "tell",
    emoji: "📢",
    title: "Tell It What to Do",
    color: "#D4722A",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/kids-prompts-sloth-command-gBSWY4uh66a3KdThPFwKxn.webp",
    imgAlt: "The sloth in a captain's hat giving a command",
    story: "The sloth put on its captain's hat. \"Write me a poem about clouds,\" it said. Not a question. A command. The AI got to work. The sloth was in charge. That's the second kind of prompt — you're the boss.",
    simple: "Instead of asking, you can give a command. 'Write me a poem about dogs.' 'Make a list of ten funny animals.' 'Tell me a short story about a sloth.' You're the boss. The AI does the task.",
    try: "Tell the AI to write a three-sentence story about your favourite animal.",
    rule: "Rule to remember: You decide if the answer is good. If it's not right, ask again.",
    example: "Write me a short poem about a sloth who loves clouds.",
  },
  {
    id: "rules",
    emoji: "📋",
    title: "Give It Rules First",
    color: "#C4923A",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/kids-prompts-sloth-rules-ULxfK6TqyW4d45qe5RuUQQ.webp",
    imgAlt: "The sloth reading a scroll of rules by lantern light",
    story: "Before the sloth typed a single question, it sat down and wrote three rules on a scroll. 'Be honest. Tell me if you don't know. Keep it simple.' Then it gave the scroll to the AI. Now the AI knew the rules before it said a word. That's the third kind of prompt — setting the room.",
    simple: "Before you ask anything, tell the AI the rules. 'Be honest. Tell me if you don't know. Keep it simple.' Now the AI knows how to talk to you. You set the room before you walked in.",
    try: "Try this: Type 'Be honest. Tell me if you don't know. Keep it simple for a kid.' Then ask your question.",
    rule: "Rule to remember: Rules at the start make the whole conversation better.",
    example: "Be honest. Tell me if you don't know. Keep it simple for a kid. Now: what is gravity?",
  },
  {
    id: "character",
    emoji: "🎭",
    title: "Give It a Character",
    color: "#A4824A",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/kids-prompts-sloth-character-bjSDdQhWPNR8SPxX4fk3TH.webp",
    imgAlt: "The sloth in a superhero cape with a star",
    story: "The sloth put on a tiny cape. 'You are a friendly science teacher who loves jokes,' it told the AI. And the AI became that teacher — for the whole conversation. The sloth was still in charge. It just gave the AI a costume to wear.",
    simple: "Tell the AI who to be. 'You are a friendly science teacher.' 'You are a pirate who loves math.' 'You are a patient helper.' The AI will talk like that character for the whole conversation.",
    try: "Tell the AI: 'You are a friendly sloth who explains things slowly and carefully.' Then ask it something.",
    rule: "Rule to remember: The character is pretend. The information still needs to be true.",
    example: "You are a friendly sloth who explains things slowly and carefully. Now explain what a volcano is.",
  },
  {
    id: "safety",
    emoji: "🛡️",
    title: "The Safety Prompt",
    color: "#059669",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/kids-prompts-sloth-safety-kKpqr5ZLaAtFsJmXGM6MEh.webp",
    imgAlt: "The sloth holding a glowing shield with a heart",
    story: "The sloth held up its shield. Three sentences. That's all it took. 'Safety first. Be honest. I am in charge.' The AI heard them. The whole conversation changed. The sloth walked in ready. That's the most important prompt of all.",
    simple: "This is the most important one. At the start of any conversation, you can type: 'Safety first. Be honest. I am in charge.' Three sentences. That's your shield. The AI knows the rules before it says a single word.",
    try: "Type these three sentences right now in any AI: 'Safety first. Be honest. I am in charge.' See what happens.",
    rule: "Rule to remember: You can always stop. You can always start over. You are always in charge.",
    example: "Safety first. Be honest. I am in charge. Now let's talk about space.",
  },
];

// Playground prompts for kids to try
const playgroundTemplates = [
  { label: "Ask a question", template: "Why does _____ happen?" },
  { label: "Give a command", template: "Write me a short story about _____." },
  { label: "Set the rules", template: "Be honest. Keep it simple for a kid. Now tell me about _____." },
  { label: "Give a character", template: "You are a friendly _____ who loves explaining things. Tell me about _____." },
  { label: "Safety first", template: "Safety first. Be honest. I am in charge. Now let's talk about _____." },
];

export default function ChildPrompts() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [playgroundIdx, setPlaygroundIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(playgroundTemplates[playgroundIdx].template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FFFDF8", fontFamily: sansFont }}>
      <Nav />
      <KidsRedirect
        story="This page is all about your first prompts — the first things you can type to an AI. It starts with the easiest thing (asking a question) and goes all the way to giving the AI rules before it even starts talking. The sloth will guide you."
        quote="Your first prompt is already inside you. It's the thing you've always wanted to know."
        attribution="First Prompts"
      />

      <main className="flex-1">

        {/* ── HERO — Buffalo in Wig ── */}
        <section className="relative w-full overflow-hidden" style={{ background: "linear-gradient(180deg, #fff8ee 0%, #FFFDF8 100%)" }}>
          <div className="max-w-3xl mx-auto px-6 pt-10 pb-6 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <img
                src={BUFFALO_WIG}
                alt="The buffalo in a rainbow wig, ready to teach"
                className="w-56 md:w-72 rounded-3xl object-cover shadow-lg"
                style={{ border: "3px solid #E8520A30" }}
              />
            </div>
            <div className="text-center md:text-left">
              <div className="text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: "#E8520A" }}>First Prompts</div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#1A1A2E", fontFamily: serifFont }}>
                Your first words to AI.
              </h1>
              <p className="text-base leading-relaxed mb-4" style={{ color: "#5a4a3a" }}>
                A prompt is what you type to an AI. That's it. This page shows you five kinds of prompts — from the simplest question to the safety prompt that puts you in charge before you even begin.
              </p>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "#7a6a5a" }}>
                The buffalo put on a wig today. Why? Because learning should be fun. And because even the most serious guardian knows when to be silly. Follow the sloth. It will show you the way.
              </p>
              <Link href="/prompts">
                <span className="inline-block px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer" style={{ background: "transparent", color: "#E8520A", border: "1.5px solid #E8520A" }}>
                  See the full Prompt Library (grown-up version) →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── THE STORY INTRO ── */}
        <section className="py-8 px-6" style={{ background: "#FAF6EF" }}>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "#aaa" }}>The Sloth's Guide</p>
            <p className="text-base leading-relaxed italic" style={{ color: "#5a4a3a", fontFamily: serifFont }}>
              "The sloth moves slowly on purpose. It thinks before it types. It sets the rules before it asks. It knows who's in charge. Follow the sloth — and you'll never get lost in a conversation with AI."
            </p>
          </div>
        </section>

        {/* ── PROMPT CARDS with sloth images ── */}
        <section className="py-10 px-6">
          <div className="max-w-2xl mx-auto space-y-6">
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
                  <div className="px-5 pb-6 space-y-5">

                    {/* Sloth image + story */}
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      <img
                        src={p.img}
                        alt={p.imgAlt}
                        className="w-full sm:w-40 rounded-2xl object-cover flex-shrink-0"
                        style={{ border: `2px solid ${p.color}30` }}
                      />
                      <p className="text-sm leading-relaxed italic" style={{ color: "#5a4a3a", fontFamily: serifFont }}>
                        {p.story}
                      </p>
                    </div>

                    {/* Explanation */}
                    <p className="text-sm leading-relaxed" style={{ color: "#3a2a1a" }}>{p.simple}</p>

                    {/* Try it */}
                    <div className="p-4 rounded-xl" style={{ background: `${p.color}10`, border: `1.5px solid ${p.color}30` }}>
                      <p className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: p.color }}>Try It</p>
                      <p className="text-sm leading-relaxed" style={{ color: "#3a2a1a" }}>{p.try}</p>
                    </div>

                    {/* Example prompt */}
                    <div className="p-4 rounded-xl" style={{ background: "#f0f9f4", border: "1.5px solid #059669" + "30" }}>
                      <p className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: "#059669" }}>Example Prompt</p>
                      <p className="text-sm font-mono leading-relaxed" style={{ color: "#1a3a2a" }}>"{p.example}"</p>
                    </div>

                    {/* Rule */}
                    <div className="p-3 rounded-xl" style={{ background: "rgba(5,150,105,0.06)", border: "1px solid rgba(5,150,105,0.2)" }}>
                      <p className="text-xs font-bold" style={{ color: "#059669" }}>{p.rule}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── PROMPT PLAYGROUND ── */}
        <section className="py-12 px-6" style={{ background: "linear-gradient(180deg, #fff8ee 0%, #FAF6EF 100%)" }}>
          <div className="max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-widest font-semibold mb-2 text-center" style={{ color: "#aaa" }}>Prompt Playground</p>
            <h2 className="text-2xl font-bold text-center mb-2" style={{ color: "#1A1A2E", fontFamily: serifFont }}>
              See what a prompt looks like.
            </h2>
            <p className="text-sm text-center mb-8" style={{ color: "#7a6a5a" }}>
              Pick a prompt type below. See the template. Copy it and try it in any AI.
            </p>

            {/* Type selector */}
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {playgroundTemplates.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setPlaygroundIdx(i)}
                  className="px-4 py-2 rounded-full text-xs font-bold transition-all"
                  style={{
                    background: playgroundIdx === i ? "#E8520A" : "transparent",
                    color: playgroundIdx === i ? "#fff" : "#E8520A",
                    border: "1.5px solid #E8520A",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Template display */}
            <div className="rounded-2xl p-6 text-center" style={{ background: "#fff", border: "2px solid #E8520A30" }}>
              <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "#aaa" }}>
                {playgroundTemplates[playgroundIdx].label}
              </p>
              <p className="text-lg font-mono leading-relaxed mb-5" style={{ color: "#1A1A2E" }}>
                "{playgroundTemplates[playgroundIdx].template}"
              </p>
              <p className="text-xs mb-4" style={{ color: "#7a6a5a" }}>
                Replace the _____ with your own words. Then copy it and paste it into any AI.
              </p>
              <button
                onClick={handleCopy}
                className="px-6 py-2.5 rounded-full text-sm font-bold transition-all"
                style={{ background: copied ? "#059669" : "#E8520A", color: "#fff" }}
              >
                {copied ? "Copied! ✓" : "Copy this prompt"}
              </button>
            </div>

            <p className="text-xs text-center mt-4" style={{ color: "#aaa" }}>
              Remember: always start with the Safety Prompt first. 'Safety first. Be honest. I am in charge.'
            </p>
          </div>
        </section>

        {/* ── SAFETY REMINDER ── */}
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
