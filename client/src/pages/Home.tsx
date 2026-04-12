/*
 * GALLANTRYAI — Home Page
 * Design: DARK homepage. Orange accents. 
 * Children's section: bright light shining against the dark — unmissable.
 * Pathfinding: "Who are you?" directs visitors to their learning flow.
 * Ethos buttons navigate to best site content.
 * Sloth kids link: glowing, easy, "check this out kids."
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { LightboxImage } from "@/components/Lightbox";
import { Link, useLocation } from "wouter";
import { useState } from "react";

const SLOTH_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-click-me-Y6T8mt8R4mLzfr3QeK78Yy.webp";

const IMGS = {
  alcmDiagram: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000005693_e894b781.jpg",
  rlhfVsGallantry: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000005860_c6f6c0a8.jpg",
  humanDrift: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000006151_42d3ec3d.jpg",
};

/* ── Pathfinding: Who Are You? ── */
const userPaths = [
  {
    role: "Parent or Guardian",
    examples: "Homeschool parent, worried mom, dad learning AI with kids",
    icon: "\u{1F3E0}",
    highlight: "Start with the Five Rules, then explore the Children\u2019s section together.",
    flow: [
      { label: "The Five Rules", path: "/rules" },
      { label: "Children\u2019s Page", path: "/for/child" },
      { label: "Flower Presets", path: "/flower-presets" },
      { label: "Prompt Games", path: "/prompt-games" },
    ],
  },
  {
    role: "Teacher or Educator",
    examples: "Classroom teacher, tutor, curriculum designer",
    icon: "\u{1F3EB}",
    highlight: "The scaffold is your lesson plan. Start at the floor, build to the ceiling.",
    flow: [
      { label: "The Five Rules", path: "/rules" },
      { label: "Living Lexicon", path: "/lexicon" },
      { label: "Prompt Games", path: "/prompt-games" },
      { label: "Framework Families", path: "/frameworks" },
    ],
  },
  {
    role: "Nurse or Healthcare Worker",
    examples: "RN, PSW, paramedic, mental health worker",
    icon: "\u{1FA7A}",
    highlight: "You already triage. Learn to triage your AI sessions the same way.",
    flow: [
      { label: "The Five Rules", path: "/rules" },
      { label: "Flower Presets", path: "/flower-presets" },
      { label: "Road Protocol", path: "/road-protocol" },
      { label: "Safety Page", path: "/if-you-need-to-stop" },
    ],
  },
  {
    role: "Student",
    examples: "High school, college, grad student, self-taught",
    icon: "\u{1F4DA}",
    highlight: "AI is a thinking partner, not a homework machine. Learn the difference.",
    flow: [
      { label: "The Five Rules", path: "/rules" },
      { label: "Prompt Games", path: "/prompt-games" },
      { label: "Living Lexicon", path: "/lexicon" },
      { label: "Promptolinguistics", path: "/promptolinguistics" },
    ],
  },
  {
    role: "Researcher or Academic",
    examples: "PhD, postdoc, lab researcher, policy analyst",
    icon: "\u{1F4CB}",
    highlight: "The watcher variable is the dataset you forgot to log: yourself.",
    flow: [
      { label: "Citizen Researcher", path: "/citizen-researcher" },
      { label: "Framework Families", path: "/frameworks" },
      { label: "AI Family Taxonomy", path: "/taxonomy" },
      { label: "Field Papers", path: "/field-papers" },
    ],
  },
  {
    role: "Prompt Engineer",
    examples: "Software dev, prompt designer, AI builder",
    icon: "\u{2699}\u{FE0F}",
    highlight: "Token Zero is the pre-output force profile. Everything starts before the first word.",
    flow: [
      { label: "Prompt Engineer Lens", path: "/for/prompt-engineer" },
      { label: "Promptolinguistics", path: "/promptolinguistics" },
      { label: "Living Lexicon", path: "/lexicon" },
      { label: "Malbolge Geofence", path: "/malbolge" },
    ],
  },
  {
    role: "Everyday Person",
    examples: "Curious, no tech background, just trying to use AI safely",
    icon: "\u{1F44B}",
    highlight: "You don\u2019t need to understand how it works. You just need one honest question.",
    flow: [
      { label: "The Five Rules", path: "/rules" },
      { label: "Flower Presets", path: "/flower-presets" },
      { label: "Prompt Games", path: "/prompt-games" },
      { label: "Safety Page", path: "/if-you-need-to-stop" },
    ],
  },
  {
    role: "Kid (Under 13)",
    examples: "Just exploring, curious about AI",
    icon: "\u{1F9D2}",
    highlight: "The sloth is waiting for you. Slow down, think first, you\u2019re in charge!",
    flow: [
      { label: "Children\u2019s Page", path: "/for/child" },
      { label: "The Five Rules", path: "/rules" },
      { label: "Prompt Games", path: "/prompt-games" },
    ],
  },
];

/* ── Ethos navigation ── */
const ethosNav = [
  {
    label: "Safety",
    sub: "First. Always.",
    color: "#E8520A",
    links: [
      { label: "The Five Rules", path: "/rules", why: "The foundation of every session" },
      { label: "If You Need to Stop", path: "/if-you-need-to-stop", why: "Crisis resources and grounding" },
      { label: "Road Protocol", path: "/road-protocol", why: "The vault that holds the session" },
      { label: "Children\u2019s Safety", path: "/for/child", why: "Protecting young minds" },
    ],
  },
  {
    label: "Honesty over Confidence",
    sub: "The AI can be wrong. Say so.",
    color: "#2A9D8F",
    links: [
      { label: "Living Lexicon", path: "/lexicon", why: "Three honest lenses on every concept" },
      { label: "AI Family Taxonomy", path: "/taxonomy", why: "Know who you\u2019re talking to" },
      { label: "Malbolge Geofence", path: "/malbolge", why: "Where flattery cannot survive" },
      { label: "Citizen Researcher", path: "/citizen-researcher", why: "Field-tested, not peer-reviewed" },
    ],
  },
  {
    label: "Trust Built Over Time",
    sub: "Not assumed. Earned.",
    color: "#D4A574",
    links: [
      { label: "Framework Families", path: "/frameworks", why: "28 tools earned through use" },
      { label: "Flower Presets", path: "/flower-presets", why: "Accessibility built with care" },
      { label: "Promptolinguistics", path: "/promptolinguistics", why: "The discipline behind the words" },
      { label: "Field Papers", path: "/field-papers", why: "The evidence trail" },
    ],
  },
  {
    label: "The User Decides",
    sub: "Always. No exceptions.",
    color: "#C4963A",
    links: [
      { label: "Prompt Games", path: "/prompt-games", why: "Practice staying in charge" },
      { label: "Prompt Engineer Lens", path: "/for/prompt-engineer", why: "Build your own governance" },
      { label: "Linguist Lens", path: "/for/linguist", why: "Words steer. Choose them." },
      { label: "The Builder", path: "/builder", why: "Who built this and why" },
    ],
  },
];

/* ── Scaffold levels ── */
const scaffoldLevels = [
  { level: "Floor", title: "Three Values. One Prompt.", desc: "Safety. Honesty. Trust. No prior knowledge required.", color: "#E8520A" },
  { level: "Level Two", title: "Pre-Session Intention", desc: "Set the room before you type. Token Zero: the pre-output force profile.", color: "#D4722A" },
  { level: "Level Three", title: "Drift Recognition", desc: "Identify when the session has left your intent. Catch it. Fix it.", color: "#C4923A" },
  { level: "Level Four", title: "Word Mechanics", desc: "Single words as control dials. Direction. Constraint. Scope. Authority.", color: "#A4824A" },
  { level: "Ceiling", title: "You Are the Framework", desc: "The person who arrives at every session as their own governance layer.", color: "#2A9D8F" },
];

export default function Home() {
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [expandedEthos, setExpandedEthos] = useState<number | null>(null);
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#080604' }}>
      <Nav />

      {/* ── THE WATCHER ── */}
      <section className="w-full py-6 px-6" style={{ borderBottom: '1px solid #1a1610' }}>
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-sm md:text-base leading-relaxed italic"
            style={{ color: '#c8b89a', fontFamily: "'Playfair Display', serif" }}
          >
            {"\u201C"}The watcher is not a tool. It is not a feature. It is the part of you that notices what you are doing while you are doing it.{"\u201D"}
          </p>
          <p className="text-xs mt-2" style={{ color: '#5a4a3a', fontFamily: "'DM Sans', sans-serif" }}>
            {"\u2014"} GallantryAI Scaffold Paper, 2026
          </p>
        </div>
      </section>

      {/* ── HERO ── */}
      <section className="w-full pt-16 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <div
            className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8"
            style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}
          >
            GallantryAI {"\u00B7"} A System of Learning {"\u00B7"} Midland, Ontario {"\u00B7"} 2026
          </div>

          <h1
            className="text-4xl md:text-6xl font-black leading-[1.1] mb-6"
            style={{ fontFamily: "'Playfair Display', serif", color: '#f5e6d0' }}
          >
            A thinking partner.
            <br />
            <span style={{ color: '#E8520A' }}>Not a shortcut.</span>
          </h1>

          <p
            className="text-lg leading-relaxed mb-2 max-w-xl"
            style={{ color: '#8a7a6a', fontFamily: "'DM Sans', sans-serif" }}
          >
            Governance does not reside in the prompt. It resides in the person holding the prompt.
          </p>
          <p
            className="text-sm italic mb-10"
            style={{ color: '#5a4a3a', fontFamily: "'Playfair Display', serif" }}
          >
            {"\u2014"} GallantryAI Scaffold Paper, March 2026
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/rules"
              className="inline-flex items-center gap-2 bg-[#E8520A] text-white px-6 py-3 rounded-xl font-semibold text-sm no-underline hover:bg-orange-700 transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Start with the Five Rules
            </Link>
            <Link
              href="/lexicon"
              className="inline-flex items-center gap-2 border border-[#E8520A]/60 text-[#E8520A] px-6 py-3 rounded-xl font-semibold text-sm no-underline hover:bg-[#E8520A]/10 transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Living Lexicon
            </Link>
            <Link
              href="/promptolinguistics"
              className="inline-flex items-center gap-2 border border-[#3a3020] text-[#8a7a6a] px-6 py-3 rounded-xl font-semibold text-sm no-underline hover:border-[#E8520A]/40 hover:text-[#E8520A] transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Explore the Discipline
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CHILDREN'S SECTION — BLACK FADES INTO WHITE, GOLDEN SPOTLIGHT
         ══════════════════════════════════════════════════════════ */}
      {/* Fade: dark → white */}
      <div
        className="w-full h-32"
        style={{ background: 'linear-gradient(to bottom, #080604 0%, #fffaf0 100%)' }}
      />
      <section
        className="w-full py-12 relative overflow-hidden"
        style={{
          background: '#fffaf0',
        }}
      >
        {/* Golden/orange aura spotlight around the sloth area */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '-40px',
            left: '50%',
            transform: 'translateX(-70%)',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,82,10,0.18) 0%, rgba(255,200,50,0.12) 35%, rgba(255,215,0,0.06) 60%, transparent 80%)',
            filter: 'blur(30px)',
            zIndex: 1,
          }}
        />

        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Sloth */}
            <div
              className="flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setLocation("/for/child")}
            >
              <div
                className="w-36 h-36 md:w-48 md:h-48 overflow-hidden"
                style={{
                  filter: 'drop-shadow(0 0 25px rgba(232,82,10,0.35)) drop-shadow(0 0 50px rgba(255,215,0,0.2))',
                }}
              >
                <img
                   src={SLOTH_URL}
                   alt="GallantryAI Sloth — Click Me!"
                   className="w-full h-full object-contain"
                 />
              </div>
            </div>

            {/* Content */}
            <div className="text-center md:text-left flex-1">
              <p
                className="text-xs font-bold uppercase tracking-[0.2em] mb-2"
                style={{ color: '#E8520A', fontFamily: "'Nunito', sans-serif" }}
              >
                Hey Kids! The Sloth Says Check This Out!
              </p>
              <h2
                className="text-2xl md:text-3xl font-black mb-3"
                style={{ fontFamily: "'Nunito', sans-serif", color: '#1A1A2E' }}
              >
                The Little AI Field Guide
              </h2>
              <p
                className="text-sm leading-relaxed mb-4 max-w-lg"
                style={{ color: '#444', fontFamily: "'Nunito', sans-serif" }}
              >
                AI literacy for young learners. The sloth knows {"\u2014"} slow down, think first, you{"\u2019"}re in charge.
                Three rules. Real examples. And a whole page just for you.
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: '#FFD700', color: '#1A1A2E' }}
                >
                  Ages 6+
                </span>
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: '#FFD700', color: '#1A1A2E' }}
                >
                  Free Resource
                </span>
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: '#90EE90', color: '#1A1A2E' }}
                >
                  Parent Approved
                </span>
              </div>
              <Link
                href="/for/child"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm no-underline transition-all hover:scale-105"
                style={{
                  background: '#E8520A',
                  color: '#fff',
                  fontFamily: "'Nunito', sans-serif",
                  boxShadow: '0 0 20px rgba(232,82,10,0.4)',
                }}
              >
                Enter the Children{"\u2019"}s Section {"\u2192"}
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Fade: white → dark */}
      <div
        className="w-full h-32"
        style={{ background: 'linear-gradient(to bottom, #fffaf0 0%, #080604 100%)' }}
      />

      {/* ── WHO ARE YOU? — Pathfinding Entry ── */}
      <section className="w-full py-12 px-6">
        <div className="container">
          <div
            className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2"
            style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}
          >
            Find Your Path
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ fontFamily: "'Playfair Display', serif", color: '#f5e6d0' }}
          >
            Who are you?
          </h2>
          <p className="text-sm mb-8 max-w-lg" style={{ color: '#6b5a3e', fontFamily: "'DM Sans', sans-serif" }}>
            This site is a system of learning. Tell us where you{"\u2019"}re starting from, and we{"\u2019"}ll show you the path.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {userPaths.map((up, i) => (
              <button
                key={i}
                onClick={() => setSelectedRole(selectedRole === i ? null : i)}
                className="text-left p-4 rounded-2xl border transition-all hover:scale-[1.02]"
                style={{
                  background: selectedRole === i ? '#1a1610' : '#0f0c08',
                  borderColor: selectedRole === i ? '#E8520A' : '#2a2018',
                  borderWidth: selectedRole === i ? '2px' : '1px',
                }}
              >
                <div className="text-2xl mb-2">{up.icon}</div>
                <div
                  className="font-bold text-sm mb-1"
                  style={{
                    color: selectedRole === i ? '#E8520A' : '#c8b89a',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {up.role}
                </div>
                <div className="text-[11px] leading-snug" style={{ color: '#5a4a3a', fontFamily: "'DM Sans', sans-serif" }}>
                  {up.examples}
                </div>
              </button>
            ))}
          </div>

          {/* Expanded path recommendation */}
          {selectedRole !== null && (
            <div
              className="rounded-2xl p-6"
              style={{
                background: '#0f0c08',
                border: '2px solid #E8520A',
                animation: 'fadeUp 0.3s ease-out',
              }}
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl">{userPaths[selectedRole].icon}</span>
                <div>
                  <h3
                    className="font-bold text-lg mb-1"
                    style={{ color: '#f5e6d0', fontFamily: "'Playfair Display', serif" }}
                  >
                    Welcome, {userPaths[selectedRole].role}.
                  </h3>
                  <p
                    className="text-sm italic"
                    style={{ color: '#E8520A', fontFamily: "'Playfair Display', serif" }}
                  >
                    {userPaths[selectedRole].highlight}
                  </p>
                </div>
              </div>

              <div
                className="text-[10px] uppercase tracking-[0.2em] font-bold mb-3"
                style={{ color: '#8a7a6a', fontFamily: "'DM Sans', sans-serif" }}
              >
                Your recommended learning flow:
              </div>
              <div className="flex flex-wrap gap-2">
                {userPaths[selectedRole].flow.map((step, j) => (
                  <div
                    key={j}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      background: j === 0 ? '#E8520A' : '#1a1610',
                      color: j === 0 ? '#fff' : '#c8b89a',
                      border: j === 0 ? 'none' : '1px solid #2a2018',
                    }}
                  >
                    <span className="text-xs opacity-60">{j + 1}.</span> {step.label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── ETHOS NAVIGATION ── */}
      <section className="w-full py-12 px-6" style={{ borderTop: '1px solid #1a1610' }}>
        <div className="container">
          <div
            className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2"
            style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}
          >
            The Foundation
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ fontFamily: "'Playfair Display', serif", color: '#f5e6d0' }}
          >
            Four values. Every page built on them.
          </h2>
          <p className="text-sm mb-8" style={{ color: '#5a4a3a', fontFamily: "'DM Sans', sans-serif" }}>
            Tap any value to see where it lives on this site.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ethosNav.map((ethos, i) => (
              <div key={i}>
                <button
                  onClick={() => setExpandedEthos(expandedEthos === i ? null : i)}
                  className="w-full text-left rounded-2xl p-5 transition-all hover:scale-[1.01]"
                  style={{
                    background: expandedEthos === i ? '#1a1610' : '#0f0c08',
                    border: expandedEthos === i ? `2px solid ${ethos.color}` : '1px solid #1a1610',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div
                        className="font-black text-base mb-1 leading-snug"
                        style={{ color: ethos.color, fontFamily: "'Playfair Display', serif" }}
                      >
                        {ethos.label}
                      </div>
                      <div
                        className="text-xs leading-relaxed"
                        style={{ color: '#6b5a3e', fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {ethos.sub}
                      </div>
                    </div>
                    <span
                      className="text-lg transition-transform duration-200"
                      style={{
                        color: ethos.color,
                        transform: expandedEthos === i ? 'rotate(90deg)' : 'rotate(0deg)',
                      }}
                    >
                      {"\u2192"}
                    </span>
                  </div>
                </button>

                {expandedEthos === i && (
                  <div className="mt-2 space-y-2 pl-2">
                    {ethos.links.map((link, j) => (
                      <Link
                        key={j}
                        href={link.path}
                        className="flex items-center gap-3 rounded-xl p-3 no-underline transition-all hover:scale-[1.01]"
                        style={{ background: '#0f0c08', border: '1px solid #1a1610' }}
                      >
                        <div
                          className="w-1.5 h-8 rounded-full flex-shrink-0"
                          style={{ background: ethos.color }}
                        />
                        <div>
                          <div
                            className="font-semibold text-sm"
                            style={{ color: '#f5e6d0', fontFamily: "'DM Sans', sans-serif" }}
                          >
                            {link.label}
                          </div>
                          <div
                            className="text-xs"
                            style={{ color: '#5a4a3a', fontFamily: "'DM Sans', sans-serif" }}
                          >
                            {link.why}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE SCAFFOLD ── */}
      <section className="w-full py-12 px-6" style={{ borderTop: '1px solid #1a1610' }}>
        <div className="container">
          <div
            className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2"
            style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}
          >
            The Architecture
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ fontFamily: "'Playfair Display', serif", color: '#f5e6d0' }}
          >
            A scaffold that grows with you.
          </h2>
          <p className="text-sm mb-8 max-w-lg" style={{ color: '#5a4a3a', fontFamily: "'DM Sans', sans-serif" }}>
            From the floor of basic protection to a personal ceiling of sophisticated governance.
          </p>
          <div className="space-y-3 max-w-2xl">
            {scaffoldLevels.map((s, i) => (
              <div
                key={i}
                className="pl-4 py-3 rounded-r-xl"
                style={{
                  borderLeft: `4px solid ${s.color}`,
                  background: '#0f0c08',
                }}
              >
                <div
                  className="text-[10px] uppercase tracking-[0.2em] font-bold mb-1"
                  style={{ color: s.color, fontFamily: "'DM Sans', sans-serif" }}
                >
                  {s.level}
                </div>
                <div
                  className="font-bold text-sm"
                  style={{ color: '#f5e6d0', fontFamily: "'DM Sans', sans-serif" }}
                >
                  {s.title}
                </div>
                <div
                  className="text-xs mt-1 leading-relaxed"
                  style={{ color: '#6b5a3e', fontFamily: "'DM Sans', sans-serif" }}
                >
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESEARCH GALLERY PREVIEW ── */}
      <section className="w-full py-12 px-6" style={{ borderTop: '1px solid #1a1610' }}>
        <div className="container">
          <div
            className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2"
            style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}
          >
            Field Research
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ fontFamily: "'Playfair Display', serif", color: '#f5e6d0' }}
          >
            The work, made visible.
          </h2>
          <p className="text-sm mb-6 max-w-lg" style={{ color: '#5a4a3a', fontFamily: "'DM Sans', sans-serif" }}>
            Tested across nine AI models since February 2026. Documented in real time.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { img: IMGS.alcmDiagram, label: "Atomic Language Control Model", tag: "ALCM" },
              { img: IMGS.rlhfVsGallantry, label: "RLHF vs. GallantryAI", tag: "RESEARCH" },
              { img: IMGS.humanDrift, label: "Human Drift Governance Paradigm", tag: "FRAMEWORK" },
            ].map((item, i) => (
              <Link key={i} href="/gallery" className="block group no-underline">
                <div
                  className="overflow-hidden rounded-2xl"
                  style={{ border: '1px solid #1a1610', background: '#0f0c08' }}
                >
                  <LightboxImage
                     src={item.img}
                     alt={item.label}
                     className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                   />
                  <div className="p-3">
                    <span
                      className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mr-2"
                      style={{ background: '#E8520A', color: '#fff' }}
                    >
                      {item.tag}
                    </span>
                    <p
                      className="text-xs mt-2 font-medium"
                      style={{ color: '#c8b89a', fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {item.label}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── THREE MESSAGES ── */}
      <section className="w-full py-16 px-6" style={{ borderTop: '1px solid #1a1610' }}>
        <div className="container">
          <div
            className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2"
            style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}
          >
            Three Voices. One Framework.
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-10"
            style={{ fontFamily: "'Playfair Display', serif", color: '#f5e6d0' }}
          >
            Who is this for?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Message from the AI */}
            <div className="rounded-2xl p-6" style={{ background: '#0f0c08', border: '1px solid #1a1610' }}>
              <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}>A Message from the AI</div>
              <div className="text-xs mb-3" style={{ color: '#3a3020', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>The Watcher is you. This is the tool speaking.</div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: '#9a8a7a', fontFamily: "'DM Sans', sans-serif" }}>
                I am not a person. I do not have a stake in your decision. I will not remember this conversation tomorrow.
              </p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: '#9a8a7a', fontFamily: "'DM Sans', sans-serif" }}>
                I can be wrong. I can be confidently wrong. <strong style={{ color: '#f5e6d0' }}>You are the verification layer.</strong>
              </p>
              <p className="text-sm italic" style={{ color: '#E8520A', fontFamily: "'Playfair Display', serif" }}>
                Use me carefully. Use me honestly. And always {"\u2014"} stay in charge.
              </p>
              <p className="text-xs mt-3" style={{ color: '#4a3a2a' }}>{"\u2014"} The AI</p>
            </div>

            {/* Message to the Everyday Person */}
            <div className="rounded-2xl p-6" style={{ background: '#0f0c08', border: '1px solid #1a1610' }}>
              <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}>A Message to the Everyday Person</div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: '#9a8a7a', fontFamily: "'DM Sans', sans-serif" }}>
                You do not need to understand how this works. You do not need to be smart enough, educated enough, or have the right words. <strong style={{ color: '#f5e6d0' }}>You just need one honest question.</strong>
              </p>
              <p className="text-sm italic mb-3" style={{ color: '#E8520A', fontFamily: "'Playfair Display', serif" }}>
                If you are reading this {"\u2014"} this was built for you.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#9a8a7a', fontFamily: "'DM Sans', sans-serif" }}>
                <strong style={{ color: '#f5e6d0' }}>Safety, Honesty, and Truth are not features. They are the foundation.</strong>
              </p>
              <p className="text-xs mt-3" style={{ color: '#4a3a2a' }}>{"\u2014"} The Builder</p>
            </div>

            {/* Message to Professionals */}
            <div className="rounded-2xl p-6" style={{ background: '#0f0c08', border: '1px solid #1a1610' }}>
              <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}>A Message to Professionals</div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: '#9a8a7a', fontFamily: "'DM Sans', sans-serif" }}>
                You already know the vocabulary. That is not the advantage you think it is. Drift is not a model failure. It is a human pattern.
              </p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: '#9a8a7a', fontFamily: "'DM Sans', sans-serif" }}>
                <strong style={{ color: '#f5e6d0' }}>Do you govern yourself inside the session?</strong>
              </p>
              <p className="text-sm italic" style={{ color: '#E8520A', fontFamily: "'Playfair Display', serif" }}>
                The watcher variable is the one most researchers forget to document: themselves.
              </p>
              <p className="text-xs mt-3" style={{ color: '#4a3a2a' }}>{"\u2014"} The Builder</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO BUILT THIS ── */}
      <section className="w-full py-12 px-6" style={{ borderTop: '1px solid #1a1610' }}>
        <div className="container">
          <div className="max-w-2xl">
            <div
              className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4"
              style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}
            >
              The Builder
            </div>
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm"
                style={{ background: '#E8520A', color: '#fff', fontFamily: "'DM Sans', sans-serif" }}
              >
                MG
              </div>
              <div>
                <h3 className="font-bold mb-1" style={{ color: '#f5e6d0', fontFamily: "'Playfair Display', serif" }}>
                  Matt Gallantry
                </h3>
                <p
                  className="text-xs font-semibold uppercase tracking-wide mb-3"
                  style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}
                >
                  Dad {"\u00B7"} Garbageman {"\u00B7"} Citizen Human-AI Field Researcher {"\u00B7"} Promptolinguist
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#8a7a6a', fontFamily: "'DM Sans', sans-serif" }}>
                  GallantryAI was not built from a lab. It was built from a kitchen table at 5am by someone who needed it and did not have it.
                </p>
                <p className="text-sm italic mt-3" style={{ color: '#E8520A', fontFamily: "'Playfair Display', serif" }}>
                  {"\u201C"}Built for the people no one was watching for.{"\u201D"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESEARCH STATUS ── */}
      <section className="w-full py-8 px-6" style={{ borderTop: '1px solid #1a1610' }}>
        <div className="container">
          <div
            className="rounded-2xl p-6"
            style={{ background: '#0f0c08', border: '1px solid #1a1610' }}
          >
            <div className="flex items-start gap-3">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: '#2A9D8F', color: '#fff' }}
              >
                {"\u2713"}
              </div>
              <div>
                <div
                  className="text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: '#2A9D8F', fontFamily: "'DM Sans', sans-serif" }}
                >
                  Research Status
                </div>
                <p className="text-sm leading-relaxed mb-2" style={{ color: '#9a8a7a', fontFamily: "'DM Sans', sans-serif" }}>
                  The <strong style={{ color: '#f5e6d0' }}>Marketing Prompt Field Report</strong> has been submitted to SSCI for peer review.
                </p>
                <p className="text-xs leading-relaxed mb-3" style={{ color: '#6b5a3e', fontFamily: "'DM Sans', sans-serif" }}>
                  Not all content on this site is peer-reviewed. This is citizen field research {"\u2014"} kitchen-table work, documented honestly, submitted for scrutiny rather than validation. I am still learning how to be a field researcher.
                </p>
                <Link
                  href="/field-papers"
                  className="inline-flex items-center gap-2 text-xs font-semibold no-underline hover:underline"
                  style={{ color: '#2A9D8F', fontFamily: "'DM Sans', sans-serif" }}
                >
                  Read the Field Papers {"\u2192"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SAFETY BANNER ── */}
      <section className="w-full py-8 px-6" style={{ borderTop: '1px solid #1a1610' }}>
        <div className="container">
          <div
            className="rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            style={{ background: '#1a0808', border: '1px solid #3a1515' }}
          >
            <div>
              <div
                className="text-xs font-bold uppercase tracking-widest mb-1"
                style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}
              >
                Safety First
              </div>
              <p className="text-sm" style={{ color: '#9a8a7a', fontFamily: "'DM Sans', sans-serif" }}>
                If you are struggling and need to stop {"\u2014"} there is a page here for you.
              </p>
            </div>
            <Link
              href="/if-you-need-to-stop"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-rose-700 text-white px-5 py-2.5 font-semibold text-sm no-underline hover:bg-rose-800 transition-colors rounded-xl"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              If You Need to Stop {"\u2192"}
            </Link>
          </div>
        </div>
      </section>

      <div style={{ background: '#080604' }}>
        <Footer />
      </div>
    </div>
  );
}
