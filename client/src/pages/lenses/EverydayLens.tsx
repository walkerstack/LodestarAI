/**
 * GALLANTRYAI — Everyday Person Lens
 * Design: Warm, approachable, no jargon
 * Flow: Where you are → What matters first → The Five Rules → Building confidence → The scaffold → Next steps
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LearningFlow from "@/components/LearningFlow";
import { flowMap } from "@/lib/learningFlowMap";
import { Link } from "wouter";
import { useEffect, useState } from "react";

const sections = [
  { id: "start", label: "Where You Are" },
  { id: "matters", label: "What Matters First" },
  { id: "rules", label: "The Five Rules" },
  { id: "confidence", label: "Building Confidence" },
  { id: "scaffold", label: "The Scaffold" },
  { id: "next", label: "Next Steps" },
];

export default function EverydayLens() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EF]">
      <Nav />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#E8520A]/10 via-[#FAF6EF] to-[#f5f0e8]" />
          <div className="relative container py-16 md:py-24 max-w-4xl mx-auto px-6">
            <div className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Lens: Everyday Person
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              You Don't Need to Be an Expert.<br />
              <span className="text-[#E8520A]">You Just Need to Start.</span>
            </h1>
            <p className="text-base text-[#555] max-w-xl leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              You're not a programmer. You're not a researcher. You're someone who uses AI — or wants to — and you want to do it well. This page is your starting line. No jargon. No prerequisites. Just honest tools that work.
            </p>
          </div>
        </section>

        {/* Section Nav */}
        <div className="sticky top-0 z-30 bg-[#FAF6EF] border-b border-[#e8e0d0] shadow-sm">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
              {sections.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setActiveSection(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap no-underline transition-all ${
                    activeSection === i
                      ? "bg-[#E8520A] text-white"
                      : "text-[#888] hover:text-[#1A1A2E]"
                  }`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Where You Are */}
        <section id="start" className="py-12 md:py-16" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Where You Are Right Now
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-white border border-[#e8e0d0]">
                <div className="text-2xl mb-3">😶</div>
                <h3 className="font-bold text-[#1A1A2E] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>You might feel overwhelmed</h3>
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Everyone's talking about AI. You've tried it. Maybe it was helpful, maybe it was weird. You're not sure what you're supposed to do with it. That's normal. That's where most people are.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-white border border-[#e8e0d0]">
                <div className="text-2xl mb-3">🤔</div>
                <h3 className="font-bold text-[#1A1A2E] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>You might have questions</h3>
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Is it safe? Can it lie to me? Should my kids use it? How do I know if it's giving me good answers? These are the right questions. GallantryAI was built to answer them.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-white border border-[#e8e0d0]">
                <div className="text-2xl mb-3">💡</div>
                <h3 className="font-bold text-[#1A1A2E] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>You don't need a tech background</h3>
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Everything here was designed for real people. A nurse. A parent. A retiree. A student. If you can have a conversation, you can learn to prompt well. The skill is in the words, not the code.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-white border border-[#e8e0d0]">
                <div className="text-2xl mb-3">🌱</div>
                <h3 className="font-bold text-[#1A1A2E] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>You're already ahead</h3>
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  The fact that you're here means you care about doing this right. Most people just type and hope. You're looking for a framework. That's the difference between using AI and governing it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What Matters First */}
        <section id="matters" className="py-12 md:py-16 bg-[#f5f0e8]" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              What Matters First
            </h2>
            <p className="text-sm text-[#555] mb-8 max-w-2xl leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Before you learn any technique, you need three things. These aren't optional — they're the foundation.
            </p>
            <div className="space-y-4">
              {[
                { num: "01", title: "Safety", desc: "The AI should never make you feel unsafe. If it does, you stop. You close the window. You come back later. There's a page on this site for exactly that moment.", link: "/if-you-need-to-stop", linkLabel: "If You Need to Stop" },
                { num: "02", title: "Honesty", desc: "Tell the AI the truth. Tell it who you are. Tell it what you need. Don't try to trick it. The more honest you are, the better it works. This isn't a game — it's a partnership.", link: "/rules", linkLabel: "The Five Rules" },
                { num: "03", title: "Trust (earned, not given)", desc: "Don't trust the AI blindly. Make it earn your trust. Check its answers. Ask it to explain. If something feels wrong, it probably is. You are in charge. Always.", link: "/road-protocol", linkLabel: "The Road Protocol" },
              ].map((item) => (
                <div key={item.num} className="relative flex gap-4 p-6 rounded-xl bg-white border border-[#e8e0d0]">
                  <Link
                    href={item.link}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#FAF6EF] border border-[#e8e0d0] flex items-center justify-center text-[#888] hover:text-[#E8520A] hover:border-[#E8520A] transition-colors no-underline"
                    title={item.linkLabel}
                  >
                    <span className="text-sm">{"\u2192"}</span>
                  </Link>
                  <div className="text-3xl font-black text-[#E8520A]/20" style={{ fontFamily: "'Playfair Display', serif" }}>{item.num}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.title}</h3>
                    <p className="text-sm text-[#555] leading-relaxed mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
                    <Link href={item.link} className="text-xs text-[#E8520A] font-medium no-underline hover:underline" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {item.linkLabel} {"\u2192"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Five Rules */}
        <section id="rules" className="py-12 md:py-16" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              The Five Rules — Your Starting Point
            </h2>
            <p className="text-sm text-[#555] mb-8 max-w-2xl leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              These five rules are the simplest version of everything on this site. If you learn nothing else, learn these.
            </p>
            <div className="space-y-3">
              {[
                { rule: "Be safe.", why: "If the AI makes you uncomfortable, stop. You don't owe it a conversation." },
                { rule: "Be honest.", why: "Tell the AI who you are and what you need. Honesty gets better results than tricks." },
                { rule: "Be in charge.", why: "You decide what happens. The AI follows your lead, not the other way around." },
                { rule: "Be kind.", why: "Not for the AI's sake — for yours. How you talk to AI shapes how you think." },
                { rule: "Be curious.", why: "Ask why. Ask how. Ask what if. The best prompts come from genuine curiosity." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-xl bg-white border border-[#e8e0d0]">
                  <div className="w-10 h-10 rounded-full bg-[#E8520A] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A1A2E] text-base" style={{ fontFamily: "'Playfair Display', serif" }}>{item.rule}</h3>
                    <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.why}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/rules" className="inline-block px-6 py-3 rounded-full bg-[#E8520A] text-white font-medium text-sm no-underline hover:bg-[#d04808] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Explore the Full Five Rules {"\u2192"}
              </Link>
            </div>
          </div>
        </section>

        {/* Building Confidence */}
        <section id="confidence" className="py-12 md:py-16 bg-[#1A1A2E]" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#FAF6EF] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Building Confidence — One Step at a Time
            </h2>
            <p className="text-sm text-[#b0a898] mb-8 max-w-2xl leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              You don't need to learn everything at once. Here's a path that builds on itself.
            </p>
            <div className="space-y-4">
              {[
                { step: "Start with the Flower Presets", desc: "Pre-built prompts designed for specific needs — ADHD, anxiety, chronic pain, or just general use. Copy, paste, and see what happens.", link: "/flower-presets", color: "#E8520A" },
                { step: "Try a Prompt Game", desc: "Low-stakes experiments that teach you how words change AI behavior. The Habergeon. The Compass Rose. The Lighthouse. Each one teaches a principle through play.", link: "/prompt-games", color: "#2A9D8F" },
                { step: "Learn the Road Protocol", desc: "A simple checklist for any AI session: Where am I going? What are my rules? When do I stop? It's like a pre-flight checklist for conversations.", link: "/road-protocol", color: "#6366f1" },
                { step: "Explore the Framework Families", desc: "Visual tools that organize how you think about AI. Seasons, Colors, the Whelm Scale. Pick the one that makes sense to you.", link: "/frameworks", color: "#E8520A" },
                { step: "Read the Children's Section", desc: "Even if you don't have kids — the children's section explains everything in the simplest possible terms. Sometimes that's exactly what you need.", link: "/for/child", color: "#2A9D8F" },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.link}
                  className="flex gap-4 p-5 rounded-xl no-underline transition-all hover:scale-[1.01]"
                  style={{ background: '#111', border: '1px solid #333' }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: item.color }}>
                    <span className="text-white font-bold text-sm">{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#FAF6EF] text-sm mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.step}</h3>
                    <p className="text-xs text-[#888] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
                  </div>
                  <span className="text-[#888] self-center">{"\u2192"}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* The Scaffold */}
        <section id="scaffold" className="py-12 md:py-16" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              The Scaffold — Where You're Headed
            </h2>
            <p className="text-sm text-[#555] mb-8 max-w-2xl leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              GallantryAI has five levels. You start at the Floor and grow at your own pace. There's no rush. There's no test. Just a path.
            </p>
            <div className="space-y-3">
              {[
                { level: "Floor", title: "Safety First", desc: "Learn the Five Rules. Know when to stop. Know that you're in charge.", color: "#E8520A" },
                { level: "Level Two", title: "Setting Intentions", desc: "Before you type, decide what you want. Set the room. Give the AI a role.", color: "#c87533" },
                { level: "Level Three", title: "Catching Drift", desc: "Notice when the AI wanders from your intent. Name it. Fix it.", color: "#8B6914" },
                { level: "Level Four", title: "Word Mechanics", desc: "Single words as control dials. WHY, CAN, MUST — each one changes everything.", color: "#6b5a3e" },
                { level: "Ceiling", title: "You Are the Framework", desc: "You arrive at every session as your own governance layer. The tools are internalized.", color: "#4a3f2f" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-xl bg-white border border-[#e8e0d0]" style={{ borderLeft: `4px solid ${item.color}` }}>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] font-bold mb-1" style={{ color: item.color, fontFamily: "'DM Sans', sans-serif" }}>{item.level}</div>
                    <h3 className="font-bold text-[#1A1A2E] text-sm mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
                    <p className="text-xs text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-5 rounded-xl bg-[#f5f0e8] border border-[#e8e0d0]">
              <p className="text-sm text-[#555] italic leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                "Most people stay at the Floor for weeks. That's not failure — that's foundation. The scaffold doesn't reward speed. It rewards depth."
              </p>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section id="next" className="py-12 md:py-16 bg-[#f5f0e8]" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Where to Go From Here
            </h2>
            <p className="text-sm text-[#555] mb-8 max-w-2xl leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Pick one. Just one. Start there. Come back when you're ready for the next.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: "The Five Rules", desc: "The foundation. Start here.", link: "/rules", color: "#E8520A" },
                { label: "Flower Presets", desc: "Pre-built prompts for specific needs.", link: "/flower-presets", color: "#2A9D8F" },
                { label: "Prompt Games", desc: "Learn through play.", link: "/prompt-games", color: "#6366f1" },
                { label: "Children's Section", desc: "Simple explanations for everyone.", link: "/for/child", color: "#E8520A" },
                { label: "Road Protocol", desc: "Pre-session checklist.", link: "/road-protocol", color: "#c87533" },
                { label: "AI Taxonomy", desc: "Know which AI you're talking to.", link: "/taxonomy", color: "#2A9D8F" },
                { label: "Guardian & Teacher Lens", desc: "If you're a parent or educator.", link: "/for/guardian-teacher", color: "#6366f1" },
                { label: "If You Need to Stop", desc: "Safety first. Always.", link: "/if-you-need-to-stop", color: "#dc2626" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.link}
                  className="relative flex items-center gap-3 p-4 rounded-xl bg-white border border-[#e8e0d0] no-underline hover:shadow-md transition-all hover:scale-[1.01]"
                >
                  <div className="w-2 h-10 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <div className="flex-1">
                    <div className="font-bold text-sm text-[#1A1A2E]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.label}</div>
                    <div className="text-xs text-[#888]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</div>
                  </div>
                  <span className="text-[#888]">{"\u2192"}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Watcher Note */}
        <section className="py-12 md:py-16 bg-[#1A1A2E]">
          <div className="container max-w-3xl mx-auto px-6 text-center">
            <p className="text-xs text-[#E8520A] font-semibold tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              The Watcher Notes
            </p>
            <p className="text-base text-[#b0a898] leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
              "The everyday person is not a lesser user. They are the primary user. Every framework on this site was designed for them first, then translated upward for specialists. The scaffold begins at the floor because that is where everyone starts — including the person who built it."
            </p>
          </div>
        </section>
      </main>

      <LearningFlow current="Everyday Lens" deeper={flowMap.everyday.deeper} wider={flowMap.everyday.wider} simpler={flowMap.everyday.simpler} />
      <Footer />
    </div>
  );
}
