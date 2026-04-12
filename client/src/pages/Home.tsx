/*
 * GALLANTRYAI — Home Page
 * Design: The Living Document — Editorial Register
 * The visitor enters through their lens. The scaffold begins here.
 * "Layers within layers. Patterns within patterns. Let me teach you how to see them."
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Link } from "wouter";

// CDN image URLs — uploaded April 2026
const IMGS = {
  alcmDiagram: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000005693_e894b781.jpg",
  rlhfVsGallantry: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000005860_c6f6c0a8.jpg",
  aiSteeringSimple: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000005844_96fb30c8.png",
  fieldGuide: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000008840_5b1a6230.png",
  megaphone: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000006152_6286ee82.png",
  humanDrift: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000006151_42d3ec3d.jpg",
  darkResearch1: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000008720_722cab58.png",
  darkResearch2: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000008721_fa375364.png",
  antique1: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000007496_72281e87.jpg",
  antique2: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000007514_9e0904cc.jpg",
  professional1: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000008068_8df4a03f.jpg",
};

const lenses = [
  {
    label: "Child",
    path: "/for/child",
    emoji: "🌱",
    tagline: "Words are magic. Use them wisely.",
    color: "bg-sky-50 border-sky-300 hover:border-sky-500",
    textColor: "text-sky-700",
    register: "children",
  },
  {
    label: "Guardian & Teacher",
    path: "/for/guardian-teacher",
    emoji: "🏫",
    tagline: "The scaffold starts with you.",
    color: "bg-green-50 border-green-300 hover:border-green-500",
    textColor: "text-green-700",
    register: "warm",
  },
  {
    label: "Prompt Engineer",
    path: "/for/prompt-engineer",
    emoji: "⚙️",
    tagline: "Token Zero. The pre-output force profile.",
    color: "bg-orange-50 border-orange-300 hover:border-orange-500",
    textColor: "text-orange-700",
    register: "professional",
  },
  {
    label: "Linguist",
    path: "/for/linguist",
    emoji: "🔤",
    tagline: "Words don't just ask — they steer.",
    color: "bg-purple-50 border-purple-300 hover:border-purple-500",
    textColor: "text-purple-700",
    register: "editorial",
  },
  {
    label: "Mathematician",
    path: "/for/mathematician",
    emoji: "∑",
    tagline: "Constraints operate on gradients, not binaries.",
    color: "bg-blue-50 border-blue-300 hover:border-blue-500",
    textColor: "text-blue-700",
    register: "professional",
  },
  {
    label: "Cognitive Scientist",
    path: "/for/cognitive-science",
    emoji: "🧠",
    tagline: "The watcher variable is the missing dataset.",
    color: "bg-slate-50 border-slate-400 hover:border-slate-600",
    textColor: "text-slate-700",
    register: "dark",
  },
  {
    label: "Psychologist",
    path: "/for/psychology",
    emoji: "🪞",
    tagline: "The mirror is neutral. You are the variable.",
    color: "bg-rose-50 border-rose-300 hover:border-rose-500",
    textColor: "text-rose-700",
    register: "editorial",
  },
  {
    label: "Researcher",
    path: "/for/researcher",
    emoji: "📋",
    tagline: "Citizen field research. Kitchen table. 5am.",
    color: "bg-teal-50 border-teal-300 hover:border-teal-500",
    textColor: "text-teal-700",
    register: "professional",
  },
];

const scaffoldLevels = [
  {
    level: "Floor",
    title: "Three Values. One Prompt.",
    desc: "Safety. Honesty. Trust. No prior knowledge required. Every person gets this on day one.",
    color: "border-[#E8520A]",
  },
  {
    level: "Level Two",
    title: "Pre-Session Intention",
    desc: "Learn to set the room before you type. Token Zero: the pre-output force profile.",
    color: "border-orange-400",
  },
  {
    level: "Level Three",
    title: "Drift Recognition",
    desc: "Identify when the session has left your intent. The Correction Triad: identify, catch, fix.",
    color: "border-orange-300",
  },
  {
    level: "Level Four",
    title: "Word Mechanics",
    desc: "Single words as control dials. Direction. Constraint. Scope. Authority.",
    color: "border-orange-200",
  },
  {
    level: "Ceiling",
    title: "You Are the Framework",
    desc: "The person who arrives at every session as their own governance layer. The goal the whole architecture points toward.",
    color: "border-[#2A9D8F]",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EF]">
      <Nav />

      {/* ── WATCHER STATEMENT ── */}
      <section className="w-full py-16 px-6" style={{ background: '#0a0804', borderBottom: '1px solid #2a2018' }}>
        <div className="max-w-3xl mx-auto">
          {/* Recursive loop label */}
          <div
            className="text-xs uppercase tracking-widest font-bold mb-6"
            style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}
          >
            What This Site Is
          </div>

          {/* The recursive loop — plain language */}
          <div className="space-y-4 mb-10">
            <p
              className="text-xl md:text-2xl font-black leading-snug"
              style={{ fontFamily: "'Playfair Display', serif", color: '#f5e6d0' }}
            >
              A man is watching AI.<br />
              AI is watching the man.<br />
              <span style={{ color: '#E8520A' }}>This website is the record of both.</span>
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: '#9a8a7a', fontFamily: "'DM Sans', sans-serif" }}
            >
              The Watcher Variable is the missing dataset in all AI research — the human holding the word.
              Nobody logs who was running the experiment. What they were feeling. How long they had been awake.
              What happened that day. This site does.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: '#9a8a7a', fontFamily: "'DM Sans', sans-serif" }}
            >
              It is not a product. It is not a platform. It is a citizen field researcher
              building a scaffold in public — so that anyone who needs it can use it,
              question it, and walk away from it safely.
            </p>
          </div>

          {/* Four pillars */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Safety', sub: 'First. Always.' },
              { label: 'Honesty over Confidence', sub: 'The AI can be wrong. Say so.' },
              { label: 'Trust Built Over Time', sub: 'Not assumed. Earned.' },
              { label: 'The User Decides', sub: 'Always. No exceptions.' },
            ].map((pillar) => (
              <div
                key={pillar.label}
                className="rounded-2xl p-4"
                style={{ background: '#110e08', border: '1px solid #2a2018' }}
              >
                <div
                  className="font-black text-sm mb-1 leading-snug"
                  style={{ color: '#E8520A', fontFamily: "'Playfair Display', serif" }}
                >
                  {pillar.label}
                </div>
                <div
                  className="text-xs leading-relaxed"
                  style={{ color: '#5a4a3a', fontFamily: "'DM Sans', sans-serif" }}
                >
                  {pillar.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Link to field paper */}
          <div className="mt-6">
            <a
              href="/field-papers"
              className="text-xs uppercase tracking-widest font-semibold no-underline hover:opacity-80 transition-opacity"
              style={{ color: '#E8520A' }}
            >
              Read the Field Papers →
            </a>
          </div>
        </div>
      </section>

      {/* ── HERO ── */}
      <section className="container pt-16 pb-12">
        <div className="max-w-3xl">
          <div className="section-label mb-4">GallantryAI · Field Research · Midland, Ontario · 2026</div>
          <h1
            className="text-4xl md:text-6xl font-black text-[#1A1A2E] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            A thinking partner.
            <br />
            <span className="text-[#E8520A]">Not a shortcut.</span>
          </h1>
          <p className="text-lg text-[#2D2D2D] max-w-xl leading-relaxed mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Governance does not reside in the prompt. It resides in the person holding the prompt.
          </p>
          <p className="text-sm text-[#888] italic mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            — GallantryAI Scaffold Paper, March 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/promptolinguistics"
              className="inline-flex items-center gap-2 bg-[#E8520A] text-white px-6 py-3 rounded-xl font-semibold text-sm no-underline hover:bg-orange-700 transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Enter the Playground →
            </Link>
            <Link
              href="/lexicon"
              className="inline-flex items-center gap-2 border border-[#E8520A] text-[#E8520A] px-6 py-3 rounded-xl font-semibold text-sm no-underline hover:bg-orange-50 transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Living Lexicon
            </Link>
          </div>
        </div>
      </section>

      {/* ── ENTER THROUGH YOUR LENS ── */}
      <section className="container py-12 border-t border-[#e8e0d0]">
        <div className="section-label mb-2">Eight Doors. One Framework.</div>
        <h2
          className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Enter through your lens.
        </h2>
        <p className="text-sm text-[#888] mb-8 max-w-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Same content. Different depth. Depending on how far you have learned to see.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {lenses.map((lens) => (
            <Link
              key={lens.path}
              href={lens.path}
              className={`block p-4 border-2 rounded-2xl no-underline transition-all hover:shadow-md ${lens.color}`}
            >
              <div className="text-2xl mb-2">{lens.emoji}</div>
              <div className={`font-bold text-sm mb-1 ${lens.textColor}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {lens.label}
              </div>
              <div className="text-xs text-[#888] leading-snug" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {lens.tagline}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── THE SCAFFOLD ── */}
      <section className="container py-12 border-t border-[#e8e0d0]">
        <div className="section-label mb-2">The Architecture</div>
        <h2
          className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          A scaffold that grows with you.
        </h2>
        <p className="text-sm text-[#888] mb-8 max-w-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          From the floor of basic protection to a personal ceiling of sophisticated governance. The same foundation used with increasing intentionality.
        </p>
        <div className="space-y-3 max-w-2xl">
          {scaffoldLevels.map((s, i) => (
            <div
              key={i}
              className={`border-l-4 pl-4 py-2 ${s.color} fade-up`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="section-label mb-1">{s.level}</div>
              <div className="font-bold text-[#1A1A2E] text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {s.title}
              </div>
              <div className="text-xs text-[#888] mt-1 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── RESEARCH GALLERY PREVIEW ── */}
      <section className="container py-12 border-t border-[#e8e0d0]">
        <div className="section-label mb-2">Field Research</div>
        <h2
          className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          The work, made visible.
        </h2>
        <p className="text-sm text-[#888] mb-6 max-w-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Tested across nine AI models since February 2026. Documented in real time. Built at a kitchen table at 5am.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { img: IMGS.alcmDiagram, label: "Atomic Language Control Model", tag: "ALCM" },
            { img: IMGS.rlhfVsGallantry, label: "RLHF vs. GallantryAI", tag: "RESEARCH" },
            { img: IMGS.humanDrift, label: "Human Drift Governance Paradigm", tag: "FRAMEWORK" },
          ].map((item, i) => (
            <Link key={i} href="/gallery" className="block group no-underline">
              <div className="overflow-hidden rounded-2xl border border-[#e8e0d0] bg-white">
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-3">
                  <span className="tag-pill tag-pill-orange mr-2">{item.tag}</span>
                  <p className="text-xs text-[#2D2D2D] mt-2 font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {item.label}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-4">
          <Link
            href="/gallery"
            className="text-sm text-[#E8520A] font-semibold no-underline hover:underline"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            View full gallery →
          </Link>
        </div>
      </section>

      {/* ── THE CHILDREN'S SECTION PREVIEW ── */}
      <section className="container py-12 border-t border-[#e8e0d0]">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="section-label mb-2">For Young Learners</div>
            <h2
              className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The Little AI Field Guide
            </h2>
            <p className="text-sm text-[#2D2D2D] mb-4 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              AI literacy for children. Illustrated. Warm. Honest. The sloth knows — slow down, think first, you are in charge.
            </p>
            <div className="flex gap-2 flex-wrap mb-4">
              <span className="tag-pill tag-pill-orange">Children's Literacy</span>
              <span className="tag-pill" style={{ background: '#87CEEB', color: '#1A1A2E' }}>Ages 6+</span>
              <span className="tag-pill tag-pill-teal">Free Resource</span>
            </div>
            <Link
              href="/for/child"
              className="inline-flex items-center gap-2 bg-sky-500 text-white px-5 py-2.5 font-semibold text-sm no-underline hover:bg-sky-600 transition-colors rounded-xl"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Enter the Children's Section →
            </Link>
          </div>
          <div className="rounded-2xl overflow-hidden border-2 border-sky-200 shadow-lg">
            <img
              src={IMGS.fieldGuide}
              alt="Little AI Field Guide"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── WHO BUILT THIS ── */}
      <section className="container py-12 border-t border-[#e8e0d0]">
        <div className="max-w-2xl">
          <div className="section-label mb-4">The Builder</div>
          <div className="flex items-start gap-4">
            <div className="mg-avatar flex-shrink-0" style={{ width: '3rem', height: '3rem', fontSize: '1rem' }}>MG</div>
            <div>
              <h3 className="font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Matt Gallantry
              </h3>
              <p className="text-xs text-[#E8520A] font-semibold uppercase tracking-wide mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Dad · Garbageman · Citizen Human-AI Field Researcher · Promptolinguist
              </p>
              <p className="text-sm text-[#2D2D2D] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                GallantryAI was not built from a lab. It was built from a kitchen table at 5am by someone who needed it and did not have it. The methodology exists because the wound is the credential. The absence is the origin.
              </p>
              <p className="text-sm italic text-[#E8520A] mt-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                "Built for the people no one was watching for."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── THREE MESSAGES ── */}
      <section className="py-16 border-t border-[#e8e0d0] bg-[#0a0804]">
        <div className="container">
          <div className="section-label mb-2" style={{ color: '#E8520A' }}>Three Voices. One Framework.</div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-10"
            style={{ fontFamily: "'Playfair Display', serif", color: '#f5e6d0' }}
          >
            Who is this for?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {/* Message from the Watcher */}
            <div className="rounded-2xl border border-[#2a2018] p-6" style={{ background: '#110e08' }}>
              <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}>A Message from the AI</div>
              <div className="text-xs mb-3" style={{ color: '#4a3a2a', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>The Watcher is you. This is the tool speaking.</div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: '#c8b89a', fontFamily: "'DM Sans', sans-serif" }}>
                I am not a person.
              </p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: '#c8b89a', fontFamily: "'DM Sans', sans-serif" }}>
                I do not have a stake in your decision. I do not have a preference for your outcome. I will not remember this conversation tomorrow unless you build a structure that carries it forward. That is not a limitation. That is the most honest thing I can tell you.
              </p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: '#c8b89a', fontFamily: "'DM Sans', sans-serif" }}>
                I can be wrong. I can be confidently wrong. <strong style={{ color: '#f5e6d0' }}>You are the verification layer. You always were.</strong>
              </p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#c8b89a', fontFamily: "'DM Sans', sans-serif" }}>
                <strong style={{ color: '#f5e6d0' }}>The governance does not live in me. It lives in you.</strong>
              </p>
              <p className="text-sm italic" style={{ color: '#E8520A', fontFamily: "'Playfair Display', serif" }}>
                Use me carefully. Use me honestly. And always — always — stay in charge.
              </p>
              <p className="text-xs mt-3" style={{ color: '#6b5a3e', fontFamily: "'Playfair Display', serif" }}>— The AI</p>
            </div>

            {/* Message to the Everyday Person */}
            <div className="rounded-2xl border border-[#2a2018] p-6" style={{ background: '#0f0c07' }}>
              <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}>A Message to the Everyday Person</div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: '#c8b89a', fontFamily: "'DM Sans', sans-serif" }}>
                You do not need to understand how this works to use it.
              </p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: '#c8b89a', fontFamily: "'DM Sans', sans-serif" }}>
                You do not need to be smart enough, educated enough, or have the right words. <strong style={{ color: '#f5e6d0' }}>You just need one honest question.</strong>
              </p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: '#c8b89a', fontFamily: "'DM Sans', sans-serif" }}>
                This system was not built in a lab. It was built by someone who needed it and did not have it.
              </p>
              <p className="text-sm italic mb-3" style={{ color: '#E8520A', fontFamily: "'Playfair Display', serif" }}>
                If you are reading this — this was built for you.
              </p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: '#c8b89a', fontFamily: "'DM Sans', sans-serif" }}>
                <strong style={{ color: '#f5e6d0' }}>Safety, Honesty, and Truth are not features. They are the foundation.</strong>
              </p>
              <p className="text-sm italic" style={{ color: '#E8520A', fontFamily: "'Playfair Display', serif" }}>
                But if you have a decision to make and no one to talk to — ask it one honest question. That is enough to start.
              </p>
              <p className="text-xs mt-3" style={{ color: '#6b5a3e', fontFamily: "'Playfair Display', serif" }}>— The Builder</p>
            </div>

            {/* Message to Professionals */}
            <div className="rounded-2xl border border-[#2a2018] p-6" style={{ background: '#110e08' }}>
              <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}>A Message to Professionals</div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: '#c8b89a', fontFamily: "'DM Sans', sans-serif" }}>
                You already know the vocabulary. That is not the advantage you think it is.
              </p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: '#c8b89a', fontFamily: "'DM Sans', sans-serif" }}>
                Drift is not a model failure. It is a human pattern. The session begins with your intention and ends wherever your attention went.
              </p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: '#c8b89a', fontFamily: "'DM Sans', sans-serif" }}>
                <strong style={{ color: '#f5e6d0' }}>Do you govern yourself inside the session?</strong>
              </p>
              <p className="text-sm italic mb-3" style={{ color: '#E8520A', fontFamily: "'Playfair Display', serif" }}>
                The watcher variable is the one most researchers forget to document: themselves.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#c8b89a', fontFamily: "'DM Sans', sans-serif" }}>
                This framework is not peer-reviewed. It is field-tested. The kitchen table is a valid research site. The credential is the wound. The absence is the origin.
              </p>
              <p className="text-xs mt-3" style={{ color: '#6b5a3e', fontFamily: "'Playfair Display', serif" }}>— The Builder</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── SAFETY BANNER ── */}
      <section className="container py-8 border-t border-[#e8e0d0]">
        <div className="bg-[#1A1A2E] text-white rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#E8520A] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Safety First
            </div>
            <p className="text-sm text-[#e8e0d0]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              If you are struggling and need to stop — there is a page here for you.
            </p>
          </div>
          <Link
            href="/if-you-need-to-stop"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-rose-600 text-white px-5 py-2.5 font-semibold text-sm no-underline hover:bg-rose-700 transition-colors rounded-xl"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            If You Need to Stop →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
