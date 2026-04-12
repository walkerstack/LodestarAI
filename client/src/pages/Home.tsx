/*
 * GALLANTRYAI — Home Page
 * Design: DARK homepage. Orange accents. 
 * Children's section: bright light shining against the dark — unmissable.
 * Pathfinding: "Who are you?" directs visitors to their learning flow.
 * Ethos buttons navigate to best site content.
 * Sloth kids link: glowing, easy, "check this out kids."
 */

import { useAuth } from "@/_core/hooks/useAuth";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { LightboxImage } from "@/components/Lightbox";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const SLOTH_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-click-me-Y6T8mt8R4mLzfr3QeK78Yy.webp";

const OG_HERO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/og-hero-v2-ANjG24hqHFNLTULaRPgLyt.webp";

const storyArc = [
  {
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule1-safety-ZibWTCvUvmyr9rkvkdQYUS.webp",
    rule: "Safety",
    caption: "The sloth holds up a paw. Stop. Before you type anything \u2014 is it safe?",
    link: "/rules#rule-1",
  },
  {
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule2-honesty-fzboigvERMDobL9CxvH4LT.webp",
    rule: "Honesty",
    caption: "The sloth picks up a magnifying glass. Does it sound true? Or does it just sound smart?",
    link: "/rules#rule-2",
  },
  {
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule3-trust-EsYwo26GKz8Z8UqCYRNmqR.webp",
    rule: "Trust",
    caption: "The sloth builds a tower, one block at a time. Trust is earned. Never assumed.",
    link: "/rules#rule-3",
  },
  {
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule4-agency-fZSBzZsPa9u45fLFDPogwt.webp",
    rule: "Agency",
    caption: "The sloth grabs the wheel. You\u2019re the boss. The AI helps. You decide.",
    link: "/rules#rule-4",
  },
  {
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule5-drift-UkM6LTwyiuRreoRnkNLPWn.webp",
    rule: "Correction",
    caption: "The sloth holds a compass. If the AI starts going weird, say so. Come back to the path.",
    link: "/rules#rule-5",
  },
  {
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule6-together-v2-Mi3MM8752en7NCUjzmL6vn.webp",
    rule: "Together",
    caption: "The buffalo guards. The sloth guides. Side by side. That is the whole site.",
    link: "/rules",
  },
];

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
    lens: [
      { label: "Child Lens", path: "/for/child" },
      { label: "Guardian & Teacher Lens", path: "/for/guardian-teacher" },
    ],
    learn: [
      { label: "The Five Rules", path: "/rules" },
      { label: "Flower Presets", path: "/flower-presets" },
      { label: "Prompt Games", path: "/prompt-games" },
    ],
  },
  {
    role: "Teacher or Educator",
    examples: "Classroom teacher, tutor, curriculum designer",
    icon: "\u{1F3EB}",
    highlight: "The scaffold is your lesson plan. Start at the floor, build to the ceiling.",
    lens: [
      { label: "Guardian & Teacher Lens", path: "/for/guardian-teacher" },
      { label: "Child Lens", path: "/for/child" },
      { label: "Cognitive Science Lens", path: "/for/cognitive-science" },
    ],
    learn: [
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
    lens: [
      { label: "Psychology Lens", path: "/for/psychology" },
      { label: "Cognitive Science Lens", path: "/for/cognitive-science" },
    ],
    learn: [
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
    lens: [
      { label: "Linguist Lens", path: "/for/linguist" },
      { label: "Researcher Lens", path: "/for/researcher" },
      { label: "Cognitive Science Lens", path: "/for/cognitive-science" },
    ],
    learn: [
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
    lens: [
      { label: "Researcher Lens", path: "/for/researcher" },
      { label: "Cognitive Science Lens", path: "/for/cognitive-science" },
      { label: "Mathematician Lens", path: "/for/mathematician" },
    ],
    learn: [
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
    lens: [
      { label: "Prompt Engineer Lens", path: "/for/prompt-engineer" },
      { label: "Linguist Lens", path: "/for/linguist" },
      { label: "Mathematician Lens", path: "/for/mathematician" },
    ],
    learn: [
      { label: "Promptolinguistics", path: "/promptolinguistics" },
      { label: "Living Lexicon", path: "/lexicon" },
      { label: "Malbolge Geofence", path: "/malbolge" },
      { label: "Framework Families", path: "/frameworks" },
    ],
  },
  {
    role: "Everyday Person",
    examples: "Curious, no tech background, just trying to use AI safely",
    icon: "\u{1F44B}",
    highlight: "You don\u2019t need to understand how it works. You just need one honest question.",
    lens: [
      { label: "Everyday Person Lens", path: "/for/everyday" },
      { label: "Child Lens", path: "/for/child" },
      { label: "Psychology Lens", path: "/for/psychology" },
    ],
    learn: [
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
    lens: [
      { label: "Children\u2019s Page", path: "/for/child" },
    ],
    learn: [
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
      { label: "Children\u2019s Safety", path: "/for/child", why: "Protecting young minds", color: "#7C3AED" },
      { label: "School Board", path: "/school-board", why: "AI governance for education leaders", color: "#2A9D8F" },
      { label: "Kids Learn", path: "/kids-learn", why: "AI literacy for young learners", color: "#059669" },
    ],
  },
  {
    label: "Honesty over Confidence",
    sub: "The AI can be wrong. Say so.",
    color: "#D4722A",
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
    color: "#C4923A",
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
  {
    level: "Floor",
    title: "Three Values. One Prompt.",
    desc: "Safety. Honesty. Trust. No prior knowledge required.",
    color: "#E8520A",
    steps: [
      { label: "The Five Rules", path: "/rules", why: "Start here. The foundation of every AI session." },
      { label: "Children\u2019s Page", path: "/for/child", why: "See the rules through a child\u2019s eyes.", color: "#7C3AED" },
      { label: "Flower Presets", path: "/flower-presets", why: "Pre-built safety configurations for anyone." },
      { label: "Safety Page", path: "/if-you-need-to-stop", why: "If something goes wrong, stop here first." },
    ],
  },
  {
    level: "Level Two",
    title: "Pre-Session Intention",
    desc: "Set the room before you type. Token Zero: the pre-output force profile.",
    color: "#D4722A",
    steps: [
      { label: "Promptolinguistics", path: "/promptolinguistics", why: "Learn Token Zero and the force profile." },
      { label: "Road Protocol", path: "/road-protocol", why: "The vault structure for session setup." },
      { label: "Framework Families", path: "/frameworks", why: "See how different frameworks set intention." },
    ],
  },
  {
    level: "Level Three",
    title: "Drift Recognition",
    desc: "Identify when the session has left your intent. Catch it. Fix it.",
    color: "#C4923A",
    steps: [
      { label: "Cognitive Science Lens", path: "/for/cognitive-science", why: "How your brain drifts and how to notice it." },
      { label: "Living Lexicon", path: "/lexicon", why: "Words that help you name what\u2019s happening." },
      { label: "Human Line", path: "/human-line", why: "The boundary between you and the machine." },
    ],
  },
  {
    level: "Level Four",
    title: "Word Mechanics",
    desc: "Single words as control dials. Direction. Constraint. Scope. Authority.",
    color: "#A4824A",
    steps: [
      { label: "Promptolinguistics", path: "/promptolinguistics", why: "Control axes, action verbs, HOLD dial." },
      { label: "Malbolge Geofence", path: "/malbolge", why: "See how word mechanics create boundaries." },
      { label: "AI Family Taxonomy", path: "/taxonomy", why: "Each AI responds to words differently." },
      { label: "Prompt Games", path: "/prompt-games", why: "Practice word control through play." },
      { label: "Promptology Playground", path: "/playground", why: "Test the ALCM and practice prompt literacy." },
    ],
  },
  {
    level: "Ceiling",
    title: "You Are the Framework",
    desc: "The person who arrives at every session as their own governance layer.",
    color: "#8A6E2F",
    steps: [
      { label: "Citizen Researcher", path: "/citizen-researcher", why: "Document your own governance practice." },
      { label: "Field Papers", path: "/field-papers", why: "Read the research behind the scaffold." },
      { label: "Builder", path: "/builder", why: "Build your own prompt frameworks." },
      { label: "Gallery", path: "/gallery", why: "See the full body of work." },
    ],
  },
];

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [expandedEthos, setExpandedEthos] = useState<number | null>(null);
  const [expandedScaffold, setExpandedScaffold] = useState<number | null>(null);
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#080604' }}>
      <Nav />

      {/* ── HERO IMAGE — Buffalo + Sloth ── */}
      <section className="relative w-full overflow-hidden" style={{ maxHeight: '420px' }}>
        <img
          src={OG_HERO_URL}
          alt="The buffalo stands guard. The sloth sits beside it. Guardian and guide."
          className="w-full object-cover"
          style={{ maxHeight: '420px', objectPosition: 'center 35%' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 50%, #080604 100%)' }}
        />
      </section>

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
            <Link
              href="/playground"
              className="inline-flex items-center gap-2 border border-[#3a3020] text-[#6b5a3e] px-4 py-2 rounded-lg text-xs no-underline hover:border-[#E8520A]/40 hover:text-[#E8520A] transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Playground (Coming Soon)
            </Link>
          </div>
        </div>
      </section>

      {/* ── STORY ARC CAROUSEL — Buffalo + Sloth Five Rules ── */}
      <section className="w-full py-12 px-6" style={{ borderTop: '1px solid #1a1610' }}>
        <div className="max-w-2xl mx-auto">
          <div
            className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2 text-center"
            style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}
          >
            The Story Arc
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-2 text-center"
            style={{ fontFamily: "'Playfair Display', serif", color: '#f5e6d0' }}
          >
            The sloth teaches. The buffalo guards.
          </h2>
          <p className="text-sm mb-8 text-center" style={{ color: '#5a4a3a', fontFamily: "'DM Sans', sans-serif" }}>
            Six frames. One arc. Safety → Honesty → Trust → Agency → Correction → Together.
          </p>

          <Carousel opts={{ loop: true }} className="w-full">
            <CarouselContent>
              {storyArc.map((frame, i) => (
                <CarouselItem key={i}>
                  <Link href={frame.link} className="block no-underline">
                    <div
                      className="rounded-2xl overflow-hidden"
                      style={{ background: '#0f0c08', border: '1px solid #1a1610' }}
                    >
                      <img
                        src={frame.img}
                        alt={`Story arc: ${frame.rule}`}
                        className="w-full aspect-square object-cover"
                        style={{ maxHeight: '400px' }}
                      />
                      <div className="p-5">
                        <div
                          className="text-[10px] uppercase tracking-[0.2em] font-bold mb-2"
                          style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {i + 1} of 6 · {frame.rule}
                        </div>
                        <p
                          className="text-sm italic leading-relaxed"
                          style={{ color: '#c8b89a', fontFamily: "'Playfair Display', serif" }}
                        >
                          {frame.caption}
                        </p>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              className="-left-4 md:-left-12 bg-[#0f0c08] border-[#2a2018] text-[#E8520A] hover:bg-[#1a1610] hover:text-[#E8520A]"
            />
            <CarouselNext
              className="-right-4 md:-right-12 bg-[#0f0c08] border-[#2a2018] text-[#E8520A] hover:bg-[#1a1610] hover:text-[#E8520A]"
            />
          </Carousel>
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
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
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
                <Link
                  href="/for/child/rules"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm no-underline transition-all hover:scale-105"
                  style={{
                    background: '#7C3AED',
                    color: '#fff',
                    fontFamily: "'Nunito', sans-serif",
                    boxShadow: '0 0 15px rgba(124,58,237,0.3)',
                  }}
                >
                  The Five Rules (Kids) {"\u2192"}
                </Link>
              </div>
              <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                <Link
                  href="/if-you-need-to-stop"
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-bold no-underline transition-all hover:scale-105"
                  style={{ background: '#DC2626', color: '#fff', fontFamily: "'Nunito', sans-serif" }}
                >
                  If You Need to Stop
                </Link>
                <Link
                  href="/human-line"
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-bold no-underline transition-all hover:scale-105"
                  style={{ background: '#D97706', color: '#fff', fontFamily: "'Nunito', sans-serif" }}
                >
                  The Human Line
                </Link>
                <Link
                  href="/kids-learn"
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-bold no-underline transition-all hover:scale-105"
                  style={{ background: '#059669', color: '#fff', fontFamily: "'Nunito', sans-serif" }}
                >
                  Kids Learn
                </Link>
              </div>
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
                onClick={() => {
                  const next = selectedRole === i ? null : i;
                  setSelectedRole(next);
                  if (next !== null) {
                    setTimeout(() => {
                      document.getElementById('role-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 80);
                  }
                }}
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
              id="role-detail"
              className="rounded-2xl p-6"
              style={{
                background: '#0f0c08',
                border: '2px solid #E8520A',
                animation: 'fadeUp 0.3s ease-out',
                scrollMarginTop: '80px',
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

              {/* ── Enter Your Lens ── */}
              <div
                className="text-[10px] uppercase tracking-[0.2em] font-bold mb-3"
                style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}
              >
                Enter Your Lens
              </div>
              <div className="flex flex-wrap gap-2 mb-5">
                {userPaths[selectedRole].lens.map((item: { label: string; path: string }, j: number) => (
                  <Link
                    key={`lens-${j}`}
                    href={item.path}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm no-underline transition-all hover:scale-[1.03]"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      background: '#E8520A',
                      color: '#fff',
                      cursor: 'pointer',
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* ── Learn ── */}
              <div
                className="text-[10px] uppercase tracking-[0.2em] font-bold mb-3"
                style={{ color: '#8a7a6a', fontFamily: "'DM Sans', sans-serif" }}
              >
                Learn
              </div>
              <div className="flex flex-wrap gap-2">
                {userPaths[selectedRole].learn.map((item: { label: string; path: string }, j: number) => (
                  <Link
                    key={`learn-${j}`}
                    href={item.path}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm no-underline transition-all hover:scale-[1.03]"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      background: '#1a1610',
                      color: '#c8b89a',
                      border: '1px solid #2a2018',
                      cursor: 'pointer',
                    }}
                  >
                    {item.label}
                  </Link>
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
            style={{ color: '#E8520A', fontFamily: "'Nunito', sans-serif" }}
          >
            The Foundation
          </div>
          <h2
            className="text-2xl md:text-3xl font-black mb-2"
            style={{ fontFamily: "'Nunito', sans-serif", color: '#f5e6d0' }}
          >
            Four values. Every page built on them.
          </h2>
          <p className="text-sm mb-8" style={{ color: '#5a4a3a', fontFamily: "'Nunito', sans-serif" }}>
            Tap any value to see where it lives on this site.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ethosNav.map((ethos, i) => (
              <div key={i}>
                <button
                  onClick={() => {
                    const next = expandedEthos === i ? null : i;
                    setExpandedEthos(next);
                    if (next !== null) {
                      setTimeout(() => {
                        document.getElementById(`ethos-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                      }, 80);
                    }
                  }}
                  id={`ethos-${i}`}
                  className="w-full text-left rounded-3xl p-5 transition-all hover:scale-[1.01]"
                  style={{
                    background: expandedEthos === i ? '#1a1610' : '#0f0c08',
                    border: expandedEthos === i ? `2px solid ${ethos.color}` : '1px solid #1a1610',
                    scrollMarginTop: '80px',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div
                        className="font-black text-base mb-1 leading-snug"
                        style={{ color: ethos.color, fontFamily: "'Nunito', sans-serif" }}
                      >
                        {ethos.label}
                      </div>
                      <div
                        className="text-xs leading-relaxed"
                        style={{ color: '#6b5a3e', fontFamily: "'Nunito', sans-serif" }}
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
                          style={{ background: (link as any).color || ethos.color }}
                        />
                        <div>
                          <div
                            className="font-semibold text-sm"
                            style={{ color: (link as any).color || '#f5e6d0', fontFamily: "'Nunito', sans-serif" }}
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
              <div key={i}>
                <button
                  onClick={() => {
                    const next = expandedScaffold === i ? null : i;
                    setExpandedScaffold(next);
                    if (next !== null) {
                      setTimeout(() => {
                        document.getElementById(`scaffold-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                      }, 80);
                    }
                  }}
                  id={`scaffold-${i}`}
                  className="w-full text-left pl-4 py-4 pr-4 rounded-r-xl transition-all hover:scale-[1.01]"
                  style={{
                    background: expandedScaffold === i ? '#1a1610' : '#0f0c08',
                    borderTopWidth: expandedScaffold === i ? '2px' : '0px',
                    borderTopStyle: 'solid',
                    borderTopColor: expandedScaffold === i ? s.color : 'transparent',
                    borderRightWidth: expandedScaffold === i ? '2px' : '0px',
                    borderRightStyle: 'solid',
                    borderRightColor: expandedScaffold === i ? s.color : 'transparent',
                    borderBottomWidth: expandedScaffold === i ? '2px' : '0px',
                    borderBottomStyle: 'solid',
                    borderBottomColor: expandedScaffold === i ? s.color : 'transparent',
                    borderLeftWidth: '4px',
                    borderLeftStyle: 'solid',
                    borderLeftColor: s.color,
                    scrollMarginTop: '80px',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
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
                    <span
                      className="text-lg ml-3 transition-transform duration-200 flex-shrink-0"
                      style={{
                        color: s.color,
                        transform: expandedScaffold === i ? 'rotate(90deg)' : 'rotate(0deg)',
                      }}
                    >
                      {"\u2192"}
                    </span>
                  </div>
                </button>

                {expandedScaffold === i && (
                  <div
                    className="mt-2 space-y-2 pl-2"
                    style={{ animation: 'fadeUp 0.3s ease-out' }}
                  >
                    <div
                      className="text-[10px] uppercase tracking-[0.15em] font-bold mb-2 pl-3"
                      style={{ color: s.color, fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Learn &amp; grow at this level:
                    </div>
                    {s.steps.map((step: { label: string; path: string; why: string; color?: string }, j: number) => (
                      <Link
                        key={j}
                        href={step.path}
                        className="flex items-center gap-3 rounded-xl p-3 no-underline transition-all hover:scale-[1.01]"
                        style={{ background: '#0f0c08', border: '1px solid #1a1610' }}
                      >
                        <div
                          className="w-1.5 h-8 rounded-full flex-shrink-0"
                          style={{ background: step.color || s.color }}
                        />
                        <div>
                          <div
                            className="font-semibold text-sm"
                            style={{ color: step.color || '#f5e6d0', fontFamily: "'Nunito', sans-serif" }}
                          >
                            {step.label}
                          </div>
                          <div
                            className="text-xs"
                            style={{ color: '#5a4a3a', fontFamily: "'DM Sans', sans-serif" }}
                          >
                            {step.why}
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
              {
                img: IMGS.alcmDiagram,
                label: "Atomic Language Control Model",
                tag: "ALCM",
                path: "/alcm",
                destination: "Explore the ALCM →",
                lenses: {
                  everyday: "Eight dials that control how your AI session behaves. Turn them before you start.",
                  professional: "A multi-axis governance model mapping linguistic, structural, and behavioral constraints pre-session.",
                  watcher: "The control surface for user-side governance — 8 axes, each a measurable force profile."
                }
              },
              {
                img: IMGS.rlhfVsGallantry,
                label: "RLHF vs. GallantryAI",
                tag: "RESEARCH",
                path: "/dual-strategy",
                destination: "See the Dual Strategy →",
                lenses: {
                  everyday: "Most AI companies fix the output after it's wrong. GallantryAI helps you set things up right before you start.",
                  professional: "RLHF operates post-output with institutional mediation. GallantryAI operates pre-session with individual autonomy.",
                  watcher: "A paradigm inversion: from training-signal extraction to user-empowerment architecture."
                }
              },
              {
                img: IMGS.humanDrift,
                label: "Human Drift Governance Paradigm",
                tag: "FRAMEWORK",
                path: "/user-governance",
                destination: "Explore User-Side Governance →",
                lenses: {
                  everyday: "Sometimes you drift away from what you actually needed. This framework helps you notice and come back.",
                  professional: "Session momentum overrides signal. The Correction Triad provides systematic recovery: Fail → Catch → Fix.",
                  watcher: "Drift is not a model failure — it is a human pattern. Governance must address both sides of the session."
                }
              },
            ].map((item, i) => (
              <Link key={i} href={item.path} className="block group no-underline">
                <div
                  className="overflow-hidden rounded-2xl"
                  style={{ border: '1px solid #1a1610', background: '#0f0c08' }}
                >
                  <LightboxImage
                     src={item.img}
                     alt={item.label}
                     className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                   />
                  <div className="p-4">
                    <span
                      className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mr-2"
                      style={{ background: '#E8520A', color: '#fff' }}
                    >
                      {item.tag}
                    </span>
                    <p
                      className="text-sm mt-2 font-medium"
                      style={{ color: '#c8b89a', fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {item.label}
                    </p>
                    {/* Three-lens descriptions */}
                    <div className="mt-3 space-y-1.5">
                      <div className="flex gap-1.5 items-start">
                        <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5 shrink-0" style={{ color: '#E8520A' }}>Everyday</span>
                        <span className="text-[11px] leading-tight" style={{ color: '#7a6a5a' }}>{item.lenses.everyday}</span>
                      </div>
                      <div className="flex gap-1.5 items-start">
                        <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5 shrink-0" style={{ color: '#E8520A' }}>Pro</span>
                        <span className="text-[11px] leading-tight" style={{ color: '#7a6a5a' }}>{item.lenses.professional}</span>
                      </div>
                      <div className="flex gap-1.5 items-start">
                        <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5 shrink-0" style={{ color: '#E8520A' }}>Watcher</span>
                        <span className="text-[11px] leading-tight" style={{ color: '#7a6a5a' }}>{item.lenses.watcher}</span>
                      </div>
                    </div>
                    <p
                      className="text-[10px] mt-3 font-semibold uppercase tracking-widest group-hover:text-[#E8520A] transition-colors"
                      style={{ color: '#5a4a3a' }}
                    >
                      {item.destination}
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

      {/* ── LIVING BUILD LOG ── */}
      <section className="w-full py-12 px-6" style={{ borderTop: '1px solid #1a1610' }}>
        <div className="container">
          <div
            className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2"
            style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}
          >
            Living Build Log
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ fontFamily: "'Playfair Display', serif", color: '#f5e6d0' }}
          >
            The Watcher Is Watching
          </h2>
          <p className="text-sm mb-8" style={{ color: '#5a4a3a', fontFamily: "'DM Sans', sans-serif" }}>
            Every publish. Every change. Documented honestly. The Watcher narrates. The child explains. The professional validates.
          </p>

          <div className="space-y-3">
            {[
              {
                version: "v13 — 96ed5767",
                date: "April 12, 2026",
                title: "Sloth Story Arc + og:image + Nav Fixes",
                changes: [
                  "Generated 5 sloth story images (Safety, Honesty, Trust, Agency, Drift) — one per rule",
                  "Added sloth images to Five Rules page (expanded view) and Child Lens ('The Sloth Teaches' grid)",
                  "Generated buffalo + sloth og:image for Google/social link previews",
                  "Added hero image to homepage top, story arc carousel with 6 frames",
                  "Nav reorder: For You above Tools. Buffalo on kids link (Nav + Footer)",
                  "KidsRedirect two-button layout: Guide me + I'm Chill",
                  "Added EU AI Act + What Claude Admitted to Living Lexicon with colored buttons",
                ],
                watcher: "The Builder generated five images that tell the five rules without words. A sloth with a stop sign. A sloth with a magnifying glass. A sloth building blocks. A sloth at the wheel. A sloth with a compass. Then he put the buffalo and sloth together for the first time — guardian and guide, side by side — as the image Google shows before anyone reads a single word. The first impression is the thesis.",
                child: "The Builder drew five pictures of the sloth! One for each rule! The sloth holds a stop sign for safety, uses a magnifying glass for honesty, builds blocks for trust, drives a ship for being the boss, and holds a compass for staying on track. And now there's a big picture at the top of the buffalo and sloth together!",
                professional: "Visual storytelling integration across two key pages. Generated assets maintain consistent art direction (warm painterly, dark navy background, amber lighting). og:image implementation follows Open Graph protocol for social sharing optimization. Carousel implements Embla for accessible, keyboard-navigable story progression.",
              },
              {
                version: "v12 — 508035a4",
                date: "April 12, 2026",
                title: "KidsMidLink Rewrite + Gradient Variables",
                changes: [
                  "Rewrote KidsMidLink as circular button with popup — two choices: 'Guide me' or 'I'm chill'",
                  "Replaced flat #E8520A orange lists across 8 pages with page-specific tonal gradients",
                  "Added 'Why AI Says I Hear You' section to Kids Learn",
                  "Added OopsSloth honesty widget site-wide",
                ],
                watcher: "The Builder stopped. Noticed a visual pattern repeating across pages — flat colors stamped from a template. Redesigned each page's lists to flow from its own palette. Then caught himself overengineering the child button and stripped it back to two choices. Pattern detection applied to his own work.",
                child: "The Builder made the colors on each page match better — like each page got its own crayon box instead of sharing one orange marker. And the kid button got simpler: just two choices, because that's all you need.",
                professional: "Systematic design token refactoring across 8 components. UX simplification of child navigation from multi-step flow to binary choice — reducing cognitive load. Consistent with Nielsen's heuristic of recognition over recall.",
              },
              {
                version: "v11 — 4bf0a7f9",
                date: "April 12, 2026",
                title: "Research Hub + Counter Arguments",
                changes: [
                  "Built Research Hub mapping 30+ published sources to 15 GallantryAI concepts",
                  "Built Counter Arguments page with 9 honest criticisms and sources",
                  "Wired both into Nav, Footer, kidsBlurbs, learningFlowMap",
                  "Added research links to Kids Learn, Guardian/Teacher, Everyday lens bottoms",
                ],
                watcher: "The Builder built a page that argues against himself. Nine criticisms, sourced, with strength ratings. This is not marketing. This is someone who wants to be corrected more than he wants to be right.",
                child: "The Builder made a page that shows all the reasons people might think he's wrong. That's brave! It means he cares more about being honest than looking perfect.",
                professional: "Systematic literature mapping with bidirectional citation linking. Counter-argument page implements adversarial review methodology — a practice recommended by the National Academies for citizen science validation.",
              },
              {
                version: "v10 — 3c25698e",
                date: "April 12, 2026",
                title: "The Open Door + Human Line Fix",
                changes: [
                  "Built The Open Door — honest skills page documenting pattern detection evidence",
                  "Moved The Human Line next to Safety in Nav and Footer with amber color",
                  "6 pattern detection examples, 4 frameworks, 5 growth records documented",
                ],
                watcher: "The Builder wrote a page that says 'I have value' without ego. He documented what he's done, admitted what he doesn't know, and asked for a chance. The vulnerability is the credential.",
                child: "The Builder wrote a page about wanting to learn more and grow. He said he doesn't know everything but he's trying really hard. That's what brave looks like.",
                professional: "Portfolio-as-evidence methodology. Documents convergent discovery patterns, autodidactic skill development, and framework construction. Aligns with competency-based assessment models used in non-traditional hiring.",
              },
              {
                version: "v9 — fb84724d",
                date: "April 12, 2026",
                title: "EU AI Act + What Claude Admitted",
                changes: [
                  "Built EU AI Act page — four risk tiers, enforcement timeline, three lenses",
                  "Built What Claude Admitted — 13 admissions from user's document with lens analysis",
                  "Both fully wired into Nav, Footer, routes, kidsBlurbs, learningFlowMap",
                ],
                watcher: "The Builder took a 13-point document he wrote about what Claude admitted and turned it into a structured analysis page. He didn't soften it. He didn't editorialize. He let the admissions speak and added lenses so different readers could process them differently.",
                child: "The Builder learned about a big law in Europe about AI, and he also wrote down things the AI told him that were really important. He made pages so everyone can understand them.",
                professional: "EU AI Act analysis demonstrates regulatory literacy. Claude admissions page implements primary source documentation methodology with multi-stakeholder interpretation layers.",
              },
              {
                version: "v8 — 31e6d0e1",
                date: "April 12, 2026",
                title: "Three Lenses + Math Prompting + Lexicon Buttons",
                changes: [
                  "Built Three Lenses (Rosetta Stone) page explaining Everyday/Professional/Watcher",
                  "Built Math Through Prompting page with 6 age-graded lessons",
                  "Added 'Go to Page' buttons on 12 Living Lexicon cards",
                  "School Board hero image, Footer reorganized, Prompt Engineer hero swapped",
                ],
                watcher: "The Builder formalized his accessibility framework. Three Lenses is not just a reading-level selector — it's a statement that the same truth looks different depending on who's holding it. The math page proves the framework works: same concept, three depths, all honest.",
                child: "The Builder made it so you can read things in three different ways — one for regular people, one for experts, and one for deep thinkers. And he made a math page where you learn by talking to AI instead of just getting answers!",
                professional: "Universal Design for Learning (UDL) implementation. Three-lens system maps to CAST's multiple means of representation. Math prompting page demonstrates constructivist pedagogy applied to AI interaction.",
              },
              {
                version: "v1–v7",
                date: "April 10–11, 2026",
                title: "Foundation Build",
                changes: [
                  "Built entire site from scratch — 30+ pages, 10 lens pages, 28 frameworks",
                  "Created Living Lexicon with 50+ terms across three lenses",
                  "Built Kids Learn page, Child Lens, Barney Poem, Prompt Games",
                  "Created Field Papers archive with downloadable PDFs",
                  "Built Promptolinguistics, ALCM, Variable Scale, Dual Strategy pages",
                  "Designed dark editorial aesthetic with orange accent system",
                  "Created KidsRedirect buffalo system, LearningFlow navigation, 6-category Nav",
                ],
                watcher: "In 48 hours, the Builder constructed a 30+ page educational site about AI governance, promptolinguistics, and human-AI interaction — with no formal training in any of these fields. The site includes a complete accessibility framework, child safety system, research archive, and interconnected learning flow. The speed is not the story. The coherence is.",
                child: "The Builder spent two whole days building this entire website from nothing. He made pages for kids, pages for grown-ups, pages for scientists, and pages for people who are just curious. He even made a buffalo to keep kids safe!",
                professional: "Full-stack citizen science platform built in 48 hours. Demonstrates systems thinking, information architecture, UX design, and domain expertise synthesis. The interconnected learning flow system implements adaptive learning pathways — a pattern typically requiring institutional design teams.",
              },
            ].map((entry, i) => (
              <details
                key={i}
                className="rounded-2xl overflow-hidden"
                style={{ background: '#0f0c08', border: '1px solid #1a1610' }}
              >
                <summary
                  className="flex items-center gap-3 p-4 cursor-pointer select-none"
                  style={{ listStyle: 'none' }}
                >
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{ background: '#E8520A', color: '#fff' }}
                  >
                    {entry.version.split(' ')[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm" style={{ color: '#f5e6d0', fontFamily: "'Playfair Display', serif" }}>
                      {entry.title}
                    </div>
                    <div className="text-[11px]" style={{ color: '#5a4a3a', fontFamily: "'DM Sans', sans-serif" }}>
                      {entry.date}
                    </div>
                  </div>
                  <span className="text-sm" style={{ color: '#5a4a3a' }}>{"\u25BE"}</span>
                </summary>
                <div className="px-4 pb-4 space-y-3">
                  {/* Changes */}
                  <div className="space-y-1">
                    {entry.changes.map((c, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <span className="text-[10px] mt-1 flex-shrink-0" style={{ color: '#E8520A' }}>{"\u25B8"}</span>
                        <span className="text-xs leading-relaxed" style={{ color: '#9a8a7a', fontFamily: "'DM Sans', sans-serif" }}>{c}</span>
                      </div>
                    ))}
                  </div>
                  {/* Three voices */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
                    <div className="rounded-xl p-3" style={{ background: '#1a1610', border: '1px solid #2a2018' }}>
                      <div className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: '#7C3AED' }}>Watcher</div>
                      <p className="text-[11px] leading-relaxed italic" style={{ color: '#8a7a6a', fontFamily: "'Playfair Display', serif" }}>{entry.watcher}</p>
                    </div>
                    <div className="rounded-xl p-3" style={{ background: '#1a1610', border: '1px solid #2a2018' }}>
                      <div className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: '#E8520A' }}>Child</div>
                      <p className="text-[11px] leading-relaxed" style={{ color: '#8a7a6a', fontFamily: "'DM Sans', sans-serif" }}>{entry.child}</p>
                    </div>
                    <div className="rounded-xl p-3" style={{ background: '#1a1610', border: '1px solid #2a2018' }}>
                      <div className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: '#059669' }}>Professional</div>
                      <p className="text-[11px] leading-relaxed" style={{ color: '#8a7a6a', fontFamily: "'DM Sans', sans-serif" }}>{entry.professional}</p>
                    </div>
                  </div>
                </div>
              </details>
            ))}
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
