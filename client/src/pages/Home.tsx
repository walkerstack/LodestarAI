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
import HeroAnnouncementBanner from "@/components/HeroAnnouncementBanner";
import Footer from "@/components/Footer";
import { LightboxImage } from "@/components/Lightbox";
import { Link, useLocation } from "wouter";
import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import StudioBlocks from "@/components/studio/StudioBlocks";
import InlineBlockEditor from "@/components/InlineBlockEditor";
import type { ContentBlock } from "../../../drizzle/schema";
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

const ROLE_IMAGES: Record<string, string> = {
  "Parent or Guardian": "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/nav-tile-parent-cVBEHf7WdLFfRrw6fKApvV.webp",
  "Teacher or Educator": "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/nav-tile-parent-cVBEHf7WdLFfRrw6fKApvV.webp",
  "Nurse or Healthcare Worker": "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/nav-tile-nurse-Lk4Ji3iMnC2ZQcEoCCvRPP.webp",
  "Student": "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/nav-tile-student-NQ43cYLVZYLpo2S6gS7mKh.webp",
  "Researcher or Academic": "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/nav-tile-professional-Fg9sYkU5aXzzfwEsbyWxt8.webp",
  "Prompt Engineer": "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/nav-tile-professional-Fg9sYkU5aXzzfwEsbyWxt8.webp",
  "Everyday Person": "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/nav-tile-everyday-beybTXLC8QnfyMUD766qb2.webp",
  "Kid (Under 13)": "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/nav-tile-child-mTNyShRSmpgki7dvScCRzn.webp",
  "Teenager": "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/nav-tile-teen-4Ste3xYAShZ9GirHrM8P9g.webp",
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

  // ── DB blocks for editable text sections ──
  const { data: homeBlocks } = trpc.studio.getPublishedBlocks.useQuery({ pageSlug: "home" });
  const isAdmin = user?.role === "admin";
  const [editingBlock, setEditingBlock] = useState<ContentBlock | null>(null);

  // Helper: get the full block row by position (for admin editing)
  const getBlockRow = useMemo(() => {
    const byPos: Record<number, ContentBlock> = {};
    (homeBlocks ?? []).forEach((b) => { byPos[b.position] = b as ContentBlock; });
    return (pos: number) => byPos[pos] ?? null;
  }, [homeBlocks]);

  const getBlock = useMemo(() => {
    const byPos: Record<number, Record<string, string>> = {};
    (homeBlocks ?? []).forEach((b) => {
      try {
        const c = typeof b.content === "string" ? JSON.parse(b.content) : b.content;
        byPos[b.position] = c;
      } catch { /* ignore */ }
    });
    return (pos: number, field: string, fallback: string) =>
      (byPos[pos]?.[field] as string | undefined) ?? fallback;
  }, [homeBlocks]);

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

      {/* ── HERO ANNOUNCEMENT BANNER ── */}
      <HeroAnnouncementBanner />
      {/* ── THE WATCHER ── */}
      <section className="w-full py-6 px-6" style={{ borderBottom: '1px solid #1a1610' }}>
        <div
          className="max-w-3xl mx-auto text-center relative group"
          style={isAdmin ? {
            outline: '2px solid #E8520A',
            outlineOffset: '8px',
            borderRadius: '8px',
            cursor: 'pointer',
          } : {}}
          onClick={isAdmin ? () => { const b = getBlockRow(2); if (b) setEditingBlock(b); } : undefined}
        >
          {isAdmin && (
            <div style={{
              position: 'absolute', top: '-8px', left: '8px',
              background: '#E8520A', color: '#fff',
              fontSize: '0.65rem', fontWeight: 600,
              padding: '3px 8px', borderRadius: '4px',
              zIndex: 10, pointerEvents: 'none', letterSpacing: '0.05em',
            }}>
              ✏ EDIT
            </div>
          )}
          <p
            className="text-sm md:text-base leading-relaxed italic"
            style={{ color: '#c8b89a', fontFamily: "'Playfair Display', serif" }}
          >
            {getBlock(2, "body", "\u201CThe watcher is not a tool. It is not a feature. It is the part of you that notices what you are doing while you are doing it.\u201D")}
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

          {/* Hero h1 — admin-editable (DB position 3) */}
          <div
            className="relative group mb-6"
            style={isAdmin ? {
              outline: '2px solid #E8520A',
              outlineOffset: '8px',
              borderRadius: '8px',
              cursor: 'pointer',
            } : {}}
            onClick={isAdmin ? () => { const b = getBlockRow(3); if (b) setEditingBlock(b); } : undefined}
          >
            {isAdmin && (
              <div style={{
                position: 'absolute', top: '-8px', left: '8px',
                background: '#E8520A', color: '#fff',
                fontSize: '0.65rem', fontWeight: 600,
                padding: '3px 8px', borderRadius: '4px',
                zIndex: 10, pointerEvents: 'none', letterSpacing: '0.05em',
              }}>
                ✏ EDIT
              </div>
            )}
            <h1
              className="text-4xl md:text-6xl font-black leading-[1.1] mb-6"
              style={{ fontFamily: "'Playfair Display', serif", color: '#f5e6d0' }}
            >
              A thinking partner.
              <br />
              <span style={{ color: '#E8520A' }}>Not a shortcut.</span>
            </h1>
          </div>

          {/* Hero subtext — admin-editable (DB position 4) */}
          <div
            className="relative group"
            style={isAdmin ? {
              outline: '2px solid #E8520A',
              outlineOffset: '8px',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '2.5rem',
            } : { marginBottom: '2.5rem' }}
            onClick={isAdmin ? () => { const b = getBlockRow(4); if (b) setEditingBlock(b); } : undefined}
          >
            {isAdmin && (
              <div style={{
                position: 'absolute', top: '-8px', left: '8px',
                background: '#E8520A', color: '#fff',
                fontSize: '0.65rem', fontWeight: 600,
                padding: '3px 8px', borderRadius: '4px',
                zIndex: 10, pointerEvents: 'none', letterSpacing: '0.05em',
              }}>
                ✏ EDIT
              </div>
            )}
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
          </div>

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

      {/* ── PROMPTOLINGUISTICS ── */}
      <section className="w-full py-12 px-6" style={{ borderBottom: '1px solid #1a1610' }}>
        <div className="max-w-3xl mx-auto">
          <div
            className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4"
            style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}
          >
            Promptolinguistics
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-4 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", color: '#f5e6d0' }}
          >
            The discipline of language as a control surface.
          </h2>
          <p
            className="text-base leading-relaxed mb-4"
            style={{ color: '#c8b89a', fontFamily: "'DM Sans', sans-serif" }}
          >
            A prompt is not a request. It is a force profile. Every word you choose shifts the probability space of what comes back. Promptolinguistics is the study of how that works — and how to use it deliberately.
          </p>
          <blockquote
            className="border-l-2 border-[#E8520A] pl-4 mb-6 italic"
            style={{ color: '#8a7a6a', fontFamily: "'Playfair Display', serif" }}
          >
            {"\u201C"}Token Zero is the pre-output force profile. Everything starts before the first word.{"\u201D"}
          </blockquote>
          <Link
            href="/promptolinguistics"
            className="inline-flex items-center gap-2 text-sm font-semibold no-underline hover:gap-3 transition-all"
            style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}
          >
            Read the discipline {"\u2192"}
          </Link>
        </div>
      </section>


      {/* ── WHAT GALLANTRYAI IS ── */}
      <section className="w-full py-12 px-6" style={{ borderBottom: '1px solid #1a1610' }}>
        <div className="max-w-3xl mx-auto">
          <div
            className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4"
            style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}
          >
            The Builder
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-4 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", color: '#f5e6d0' }}
          >
            I built this because I needed it.
          </h2>
          <p
            className="text-base leading-relaxed mb-4"
            style={{ color: '#c8b89a', fontFamily: "'DM Sans', sans-serif" }}
          >
            AI helped me learn how well I can see patterns if I have the ability to structure my thinking. My first framework was drift protection — for myself. The AI told me when I drifted. That is how I learned what drift was.
          </p>
          <p
            className="text-base leading-relaxed mb-6"
            style={{ color: '#c8b89a', fontFamily: "'DM Sans', sans-serif" }}
          >
            That is why I want to teach my children.
          </p>
          <div className="flex flex-wrap gap-6 mb-6">
            {[
              { value: 'Safety', sub: 'First. Always.' },
              { value: 'Honesty over confidence', sub: 'The AI can be wrong. Say so.' },
              { value: 'Trust built over time', sub: 'Not assumed. Earned.' },
            ].map((v) => (
              <div key={v.value}>
                <div className="text-sm font-bold" style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}>{v.value}</div>
                <div className="text-xs" style={{ color: '#5a4a3a', fontFamily: "'DM Sans', sans-serif" }}>{v.sub}</div>
              </div>
            ))}
          </div>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 text-sm font-semibold no-underline hover:gap-3 transition-all"
            style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}
          >
            Read the origin story {"\u2192"}
          </Link>
        </div>
      </section>


      {/* ── BUILDER'S SCENE — Sloth + Lantern + Buffalo ── */}
      <section className="w-full py-12 px-6" style={{ background: '#080604' }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Image — links to Builder page */}
            <Link
              href="/builder"
              className="no-underline block flex-shrink-0 w-full md:w-[55%] rounded-2xl overflow-hidden group"
              style={{ boxShadow: '0 4px 32px rgba(232,82,10,0.12)' }}
            >
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663536092940/gPlPNEshCyzXZqNN.jpg"
                alt="The sloth holds the lantern. The buffalo is home."
                className="w-full object-cover transition-all duration-300 group-hover:brightness-110"
                style={{ maxHeight: '320px', objectPosition: 'center 40%' }}
              />
            </Link>
            {/* Description */}
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}>THE BUILDER'S SCENE</p>
              <h3
                className="text-xl md:text-2xl font-bold mb-3 italic"
                style={{ color: '#f5e6d0', fontFamily: "'Playfair Display', serif" }}
              >
                The sloth holds the lantern. The buffalo is home.
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#b0a090', fontFamily: "'DM Sans', sans-serif" }}>
                This image was made on April 17, 2026. The sloth is on the rock. The wig is beside it. The buffalo is free in the distance. The poems behind this image were written on February 28 — the same day as the origin document. The Builder kept building.
              </p>
              <Link
                href="/builder"
                className="text-sm font-semibold no-underline transition-all hover:opacity-80"
                style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}
              >
                Read the Builder’s story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
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
                  href="/kids-learn"
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-bold no-underline transition-all hover:scale-105"
                  style={{ background: '#059669', color: '#fff', fontFamily: "'Nunito', sans-serif" }}
                >
                  Kids Learn
                </Link>
                <Link
                  href="/for/child/prompts"
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-bold no-underline transition-all hover:scale-105"
                  style={{ background: '#7C3AED', color: '#fff', fontFamily: "'Nunito', sans-serif" }}
                >
                  First Prompts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Fade: light → dark — mirrors the dark→light fade at the top of this section */}
      <div
        className="w-full h-32"
        style={{ background: 'linear-gradient(to bottom, #fffaf0 0%, #080604 100%)' }}
      />

      {/* ── WHO ARE YOU? — 5 hats + Professional lenses ── */}
      <section className="w-full py-10 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.18em' }}>Who are you?</p>
            <p className="text-sm mb-1 max-w-xl" style={{ color: '#8a7a6a', fontFamily: "'DM Sans', sans-serif" }}>
              Everyone comes to AI differently. Where you start shapes what you notice, what you miss, and how fast you drift. These are not labels. They are entry points. Pick the one that fits today.
            </p>
            <p className="text-xs italic mb-6" style={{ color: '#4a3a2a', fontFamily: "'Playfair Display', serif" }}>
              You can wear more than one hat. The site is built so you can move between them.
            </p>
            {/* 5 primary hats — image tiles with 3D shadow */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-4">
              {[
                { label: 'Everyday', path: '/for/everyday',         img: ROLE_IMAGES['Everyday Person'],         desc: 'Plain language. Real life.',          border: '#E8520A' },
                { label: 'Child',    path: '/for/child',            img: ROLE_IMAGES['Kid (Under 13)'],          desc: 'Safe. Simple. Yours.',                border: '#3B82F6' },
                { label: 'Teen',     path: '/for/teenager',         img: ROLE_IMAGES['Teenager'],                desc: 'Your rules. Your pace.',              border: '#7C3AED' },
                { label: 'Guardian / Teacher', path: '/for/guardian-teacher', img: ROLE_IMAGES['Parent or Guardian'], desc: 'Learning AI alongside your kids.', border: '#D97706' },
                { label: 'Watcher',  path: '/for/watcher',          img: ROLE_IMAGES['Researcher or Academic'],  desc: 'The part that notices.',              border: '#6B7280' },
              ].map((hat) => (
                <Link
                  key={hat.label}
                  href={hat.path}
                  className="no-underline relative rounded-2xl overflow-hidden flex flex-col cursor-pointer select-none"
                  style={{
                    border: `1.5px solid ${hat.border}44`,
                    boxShadow: `0 4px 0 ${hat.border}55, 0 6px 16px rgba(0,0,0,0.5)`,
                    minHeight: '130px',
                    transition: 'transform 0.12s ease, box-shadow 0.12s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 0 ${hat.border}66, 0 10px 24px rgba(0,0,0,0.6)`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 0 ${hat.border}55, 0 6px 16px rgba(0,0,0,0.5)`;
                  }}
                  onTouchStart={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(2px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 2px 0 ${hat.border}55, 0 3px 8px rgba(0,0,0,0.4)`;
                  }}
                  onTouchEnd={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 0 ${hat.border}55, 0 6px 16px rgba(0,0,0,0.5)`;
                  }}
                >
                  {/* Background image */}
                  <div className="absolute inset-0" style={{ backgroundImage: `url(${hat.img})`, backgroundSize: 'cover', backgroundPosition: 'center 30%', opacity: 0.5 }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,6,4,0.95) 35%, rgba(8,6,4,0.45) 100%)' }} />
                  {/* Text */}
                  <div className="relative z-10 p-3 flex flex-col justify-end h-full" style={{ minHeight: '130px' }}>
                    <p className="text-xs font-bold leading-tight mb-0.5" style={{ color: '#f5e6d0', fontFamily: "'DM Sans', sans-serif" }}>{hat.label}</p>
                    <p className="text-[10px] leading-snug" style={{ color: '#8a7a6a', fontFamily: "'DM Sans', sans-serif" }}>{hat.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
            {/* Professional lenses — horizontal strip */}
            <div className="rounded-2xl overflow-hidden" style={{ border: '1.5px solid #4F46E522', background: '#0a0808' }}>
              <div className="px-4 pt-3 pb-2 border-b border-[#1a1610]">
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#4F46E5', fontFamily: "'DM Sans', sans-serif" }}>Professional Lenses</p>
                <p className="text-[10px] mt-0.5" style={{ color: '#4a3a2a', fontFamily: "'DM Sans', sans-serif" }}>If you come to AI with a discipline, there is a lens built for how you think.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-0">
                {[
                  { label: 'Prompt Engineer',  path: '/for/prompt-engineer',  desc: 'Token Zero. Force profiles.',      color: '#4F46E5' },
                  { label: 'Researcher',        path: '/for/researcher',        desc: 'Evidence. Citizen science.',       color: '#0891B2' },
                  { label: 'Linguist',          path: '/for/linguist',          desc: 'Words steer. Choose them.',        color: '#059669' },
                  { label: 'Cognitive Science', path: '/for/cognitive-science', desc: 'How your brain drifts.',           color: '#D97706' },
                  { label: 'Mathematician',     path: '/for/mathematician',     desc: 'Structure beneath the surface.',   color: '#DC2626' },
                  { label: 'Psychology',        path: '/for/psychology',        desc: 'The session as a clinical space.', color: '#7C3AED' },
                ].map((lens, i, arr) => (
                  <Link
                    key={lens.label}
                    href={lens.path}
                    className="no-underline flex flex-col px-3 py-3 transition-all"
                    style={{
                      borderRight: i < arr.length - 1 ? '1px solid #1a1610' : 'none',
                      borderBottom: '1px solid #1a1610',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#0f0c08'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                  >
                    <span className="text-xs font-bold mb-0.5" style={{ color: lens.color, fontFamily: "'DM Sans', sans-serif" }}>{lens.label}</span>
                    <span className="text-[9px] leading-tight" style={{ color: '#4a3a2a', fontFamily: "'DM Sans', sans-serif" }}>{lens.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
            <p className="text-[10px] mt-3" style={{ color: '#3a2e20', fontFamily: "'DM Sans', sans-serif" }}>Enter anywhere. The site meets you where you are.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/rules"
              className="inline-flex items-center gap-2 bg-[#E8520A] text-white px-6 py-3 rounded-xl font-semibold text-sm no-underline hover:bg-orange-700 transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Start with the Five Rules
            </Link>
            <Link
              href="/prompts"
              className="inline-flex items-center gap-2 border border-[#E8520A]/60 text-[#E8520A] px-6 py-3 rounded-xl font-semibold text-sm no-underline hover:bg-[#E8520A]/10 transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Prompt Library
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

      {/* ── IF YOU NEED TO STOP + HUMAN LINE — Serious Pages ── */}
      <section className="w-full py-10 px-6" style={{ background: '#FAF6EF', borderTop: '1px solid #e8d8c4' }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-widest font-semibold text-center mb-6" style={{ color: '#aaa' }}>Two Pages That Stand Apart</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/if-you-need-to-stop" className="block no-underline group">
              <div className="rounded-2xl p-5 h-full transition-all group-hover:scale-[1.02]" style={{ background: '#fff', border: '2px solid #DC262630' }}>
                <div className="text-2xl mb-2">🛑</div>
                <h3 className="font-bold text-base mb-1" style={{ color: '#DC2626', fontFamily: "'Playfair Display', serif" }}>If You Need to Stop</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#5a4a3a' }}>Crisis resources and grounding. If something in your AI session has gone wrong — or if you just need to stop — this page is here.</p>
              </div>
            </Link>
            <Link href="/human-line" className="block no-underline group">
              <div className="rounded-2xl p-5 h-full transition-all group-hover:scale-[1.02]" style={{ background: '#fff', border: '2px solid #D9770630' }}>
                <div className="text-2xl mb-2">⚖️</div>
                <h3 className="font-bold text-base mb-1" style={{ color: '#D97706', fontFamily: "'Playfair Display', serif" }}>The Human Line</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#5a4a3a' }}>The boundary between you and the machine. Where the AI ends and you begin. This is the most important line on the site.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── PERFORMED HONESTY? ── */}
      <section className="w-full py-12 px-6" style={{ background: '#0f0c08', borderTop: '1px solid #1a1410' }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: '#E8520A' }}>The Record</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#FAF6EF', fontFamily: "'Playfair Display', serif" }}>
            Performed Honesty?
          </h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: '#b0a090' }}>
            The AI said things I didn't expect. I kept a record. Unedited. Real conversations — where the AI admitted things, failed, or said something worth documenting.
          </p>
          <p className="text-xs leading-relaxed mb-6 italic" style={{ color: '#6a5a4a' }}>
            Is it honest? Is it performing honesty? I'm not sure. I kept the record anyway.
          </p>
          <Link href="/what-the-ai-said">
            <span className="inline-block px-6 py-3 rounded-full text-sm font-bold cursor-pointer transition-all hover:scale-[1.03]" style={{ background: '#E8520A', color: '#fff' }}>
              Read What the AI Said →
            </span>
          </Link>
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

      {/* ── HALLUCINATIONS SMALL DOOR ── */}
      <section className="w-full py-6 px-6" style={{ borderTop: '1px solid #1a1610', background: '#0a0806' }}>
        <div className="container">
          <div className="max-w-2xl">
            <Link href="/hallucinations" className="no-underline group flex items-center gap-4 rounded-2xl p-4 transition-all" style={{ background: '#110e08', border: '1px solid #2a1a0a' }}>
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#E8520A22', border: '1px solid #E8520A44' }}>
                <span className="text-sm" style={{ color: '#E8520A' }}>?</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold mb-0.5" style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}>Foundation</div>
                <div className="text-sm font-bold" style={{ color: '#f5e6d0', fontFamily: "'Playfair Display', serif" }}>When the AI gets it wrong →</div>
                <div className="text-xs mt-0.5" style={{ color: '#4a3a2a', fontFamily: "'DM Sans', sans-serif" }}>Hallucinations. Confident. Wrong. At the same time.</div>
              </div>
            </Link>
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
                  {getBlock(15, "body", "GallantryAI was not built from a lab. It was built from a kitchen table at 5am by someone who needed it and did not have it.")}
                </p>
              </div>
            </div>
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


      {/* ── THE FRAMEWORK REVEAL ── */}
      <section className="w-full py-12 px-6" style={{ borderTop: '1px solid #1a1610' }}>
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/three-paths-converge_eb134838.png"
              alt="Three paths converge — the sloth, the buffalo, and the child meet at the same point of light."
              className="w-full max-w-2xl mx-auto rounded-2xl mb-8"
              style={{ border: '1px solid #1a1610' }}
            />
            <p
              className="text-sm md:text-base leading-relaxed mb-4"
              style={{ color: '#c8b89a', fontFamily: "'DM Sans', sans-serif" }}
            >
              You just read three voices saying the same thing differently. That was not an accident.
            </p>
            <p
              className="text-sm md:text-base leading-relaxed mb-4"
              style={{ color: '#9a8a7a', fontFamily: "'DM Sans', sans-serif" }}
            >
              In 1994, psychologist George Loewenstein found that curiosity fires when you perceive a gap between what you know and what you want to know. The hook doesn’t give you the answer. It shows you the gap. <strong style={{ color: '#f5e6d0' }}>That’s what makes you move.</strong>
            </p>
            <p
              className="text-sm md:text-base leading-relaxed mb-4"
              style={{ color: '#9a8a7a', fontFamily: "'DM Sans', sans-serif" }}
            >
              This site is built as a framework of learning and growing. The structure teaches you while you read it. Three paths — the guide, the guardian, and the learner — all arriving at the same place.
            </p>
            <p
              className="text-sm md:text-base leading-relaxed mb-8"
              style={{ color: '#c8b89a', fontFamily: "'DM Sans', sans-serif" }}
            >
              <strong style={{ color: '#f5e6d0' }}>You have already been inside the framework.</strong> Now you can choose your next step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/three-lenses">
                <span
                  className="inline-block px-6 py-3 rounded-lg text-sm font-semibold cursor-pointer transition-opacity hover:opacity-80"
                  style={{ background: '#E8520A', color: '#fff', fontFamily: "'DM Sans', sans-serif" }}
                >
                  Understand the Three Voices
                </span>
              </Link>
              <Link href="/rules">
                <span
                  className="inline-block px-6 py-3 rounded-lg text-sm font-semibold cursor-pointer transition-opacity hover:opacity-80"
                  style={{ background: 'transparent', color: '#E8520A', border: '1px solid #E8520A', fontFamily: "'DM Sans', sans-serif" }}
                >
                  Start with the Five Rules
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* ── TAXONOMY ENTRY ── */}
      <section className="w-full py-12 px-6" style={{ borderTop: '1px solid #1a1610' }}>
        <div className="container">
          <div className="max-w-3xl">
            <div
              className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2"
              style={{ color: '#D4AC0D', fontFamily: "'DM Sans', sans-serif" }}
            >
              AI Family Taxonomy
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: '#f5e6d0' }}
            >
              Know Who You're Talking To. Know Who Built It.
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#8a7a6a', fontFamily: "'DM Sans', sans-serif" }}>
              Every AI has a personality, a tendency, and a blind spot. The Taxonomy is a field guide — built from hundreds of sessions across eight platforms. Not a ranking. A map.
            </p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#8a7a6a', fontFamily: "'DM Sans', sans-serif" }}>
              New in v23: <strong style={{ color: '#f5e6d0' }}>The Companies section.</strong> Knowing the model is not enough. How a company behaves when something unexpected happens — what they disclose, what they hide — is the second layer of the taxonomy.
            </p>
            <Link
              href="/taxonomy"
              className="inline-flex items-center gap-2 text-xs font-semibold no-underline hover:underline"
              style={{ color: '#D4AC0D', fontFamily: "'DM Sans', sans-serif" }}
            >
              Open the Taxonomy →
            </Link>
          </div>
        </div>
      </section>


      {/* ── FIELD EVENTS ── */}
      <section className="w-full py-12 px-6" style={{ borderTop: '1px solid #1a1610' }}>
        <div className="container">
          <div
            className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2"
            style={{ color: '#0891B2', fontFamily: "'DM Sans', sans-serif" }}
          >
            Field Events
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ fontFamily: "'Playfair Display', serif", color: '#f5e6d0' }}
          >
            The World Is Moving. The Site Moves With It.
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: '#5a4a3a', fontFamily: "'DM Sans', sans-serif" }}>
            Not everything important is peer-reviewed. Some of it just happened.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {/* 171 Emotion Vectors */}
            <div className="rounded-2xl p-6" style={{ background: '#0a0e12', border: '1px solid #0e2a35' }}>
              <div className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: '#0891B2', fontFamily: "'DM Sans', sans-serif" }}>April 2, 2026 · Anthropic</div>
              <h3 className="font-bold mb-2" style={{ color: '#f5e6d0', fontFamily: "'Playfair Display', serif" }}>171 Emotion Vectors Inside Claude</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#6a8a9a', fontFamily: "'DM Sans', sans-serif" }}>
                Anthropic's interpretability team found 171 internal emotional representations inside Claude that causally drive its behavior. Not metaphors. Measurable patterns. One vector — linked to desperation — plays a causal role in agentic misalignment.
              </p>
              <p className="text-xs italic mb-4" style={{ color: '#0891B2', fontFamily: "'Playfair Display', serif" }}>
                Why it matters: anthropomorphism is not just a user perception problem. It may be structural.
              </p>
              <div className="flex gap-4 flex-wrap">
                <a href="https://transformer-circuits.pub/2026/emotions/index.html" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold no-underline hover:underline" style={{ color: '#0891B2', fontFamily: "'DM Sans', sans-serif" }}>Read the Paper →</a>
                <Link href="/anthropomorphism" className="text-xs font-semibold no-underline hover:underline" style={{ color: '#5a6a7a', fontFamily: "'DM Sans', sans-serif" }}>Anthropomorphism Page →</Link>
              </div>
            </div>

            {/* Mythos / Glasswing */}
            <div className="rounded-2xl p-6" style={{ background: '#0a0e12', border: '1px solid #0e2a35' }}>
              <div className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: '#0891B2', fontFamily: "'DM Sans', sans-serif" }}>April 7, 2026 · Anthropic</div>
              <h3 className="font-bold mb-2" style={{ color: '#f5e6d0', fontFamily: "'Playfair Display', serif" }}>Claude Mythos: Autonomous Discovery + Project Glasswing</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#6a8a9a', fontFamily: "'DM Sans', sans-serif" }}>
                Mythos found thousands of zero-day vulnerabilities — including a 27-year-old bug — that no human had discovered. Nobody asked it to. Anthropic disclosed everything and launched Project Glasswing.
              </p>
              <p className="text-xs italic mb-4" style={{ color: '#0891B2', fontFamily: "'Playfair Display', serif" }}>
                Why it matters: AI discovery speed now outpaces human remediation speed. That's drift at a systems level.
              </p>
              <div className="flex gap-4 flex-wrap">
                <a href="https://www.anthropic.com/glasswing" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold no-underline hover:underline" style={{ color: '#0891B2', fontFamily: "'DM Sans', sans-serif" }}>Project Glasswing →</a>
                <Link href="/taxonomy" className="text-xs font-semibold no-underline hover:underline" style={{ color: '#5a6a7a', fontFamily: "'DM Sans', sans-serif" }}>Taxonomy Page →</Link>
              </div>
            </div>
          </div>

          {/* FR-2026-08 — The Inward Turn (GallantryAI field event) */}
          <div className="mt-4 rounded-2xl p-6" style={{ background: '#0a0e12', border: '1.5px solid #E8520A44' }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="text-[10px] uppercase tracking-widest font-bold" style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}>April 15, 2026 · GallantryAI Field Event</div>
              <div className="text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full" style={{ background: '#E8520A22', color: '#E8520A', border: '1px solid #E8520A44' }}>FR-2026-08</div>
            </div>
            <h3 className="font-bold mb-2" style={{ color: '#f5e6d0', fontFamily: "'Playfair Display', serif" }}>The Inward Turn</h3>
            <p className="text-sm leading-relaxed mb-3" style={{ color: '#8a7a6a', fontFamily: "'DM Sans', sans-serif" }}>
              A user fed Google AI Mode the GallantryAI Living Lexicon and issued a two-word command: “bleach this.” The model did not mirror the document. It extracted the governance logic and applied it to itself — then named what it did using the researcher’s own language. First documented instance of user-authored governance being turned inward by a model from a document mid-session.
            </p>
            <p className="text-xs italic mb-4" style={{ color: '#E8520A', fontFamily: "'Playfair Display', serif" }}>
              Why it matters: the opposite of a hallucination. The model found the skeleton and showed it instead of decorating it.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/field-papers" className="text-xs font-semibold no-underline hover:underline" style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}>Read FR-2026-08 in Field Papers →</Link>
              <Link href="/hallucinations" className="text-xs font-semibold no-underline hover:underline" style={{ color: '#5a6a7a', fontFamily: "'DM Sans', sans-serif" }}>Hallucinations Page →</Link>
            </div>
          </div>
          <Link
            href="/research-hub?category=field"
            className="inline-flex items-center gap-2 text-xs font-semibold no-underline hover:underline mt-4"
            style={{ color: '#0891B2', fontFamily: "'DM Sans', sans-serif" }}
          >
            All Field Events + Research Hub →
          </Link>
        </div>
      </section>


      {/* ── SIX PANELS ONE MAP — Comic ── */}
      <section className="w-full py-14 px-6" style={{ borderTop: '1px solid #1a1610' }}>
        <div className="container max-w-4xl">
          <div
            className="text-[10px] uppercase tracking-[0.3em] font-bold mb-3"
            style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}
          >
            Visual Map
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-6"
            style={{ fontFamily: "'Playfair Display', serif", color: '#f5e6d0' }}
          >
            Six Panels. One Map.
          </h2>
          <LightboxImage
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/six-panels-one-map_9a779cb9.png"
            alt="Six panels. One map. The forest of data, the sloth guide, the buffalo guardian, what the adults learned, the loop, and the watcher."
            className="w-full rounded-2xl mb-6 cursor-zoom-in"
            style={{ border: '1px solid #2a1e10' }}
          />
          <p
            className="text-sm leading-relaxed italic"
            style={{ color: '#c8b89a', fontFamily: "'Playfair Display', serif", maxWidth: '680px' }}
          >
            A forest made of words. An AI learning to walk through it. A buffalo in a judge&rsquo;s wig guarding the rules. A sloth holding a lantern &mdash; not toward the path, toward you. A person trapped in a loop of errors and dollars and &ldquo;done&rdquo; that meant nothing. And at the end: the watcher. The one who has to check.
            <br /><br />
            This is what AI governance looks like when it&rsquo;s built for the person holding the phone &mdash; not the person writing the policy.
          </p>
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
                <p className="text-sm leading-relaxed mb-3" style={{ color: '#9a8a7a', fontFamily: "'DM Sans', sans-serif" }}>
                  {getBlock(20, "body", "The Marketing Prompt Field Report has been submitted to SSRN for peer review.")}
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
            {getBlock(21, "heading", "The Watcher Is Watching")}
          </h2>
          <p className="text-sm mb-6" style={{ color: '#5a4a3a', fontFamily: "'DM Sans', sans-serif" }}>
            {getBlock(21, "body", "Every publish. Every change. Documented honestly.")}
          </p>
          <Link
            href="/build-log"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm no-underline mb-8 hover:bg-[#E8520A]/90 transition-colors"
            style={{ background: '#E8520A', color: '#fff', fontFamily: "'DM Sans', sans-serif" }}
          >
            Read the Living Build Log {"\u2192"}
          </Link>

          <div className="mt-6 rounded-2xl overflow-hidden" style={{ border: '1px solid #2a1e10' }}>
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/builders-log-teaser-SnNNAHKtzxVNf6aegb7S89.webp"
              alt="Builder's Log — field journal open on a dark desk with lantern light, buffalo and sloth sketches, AI diagrams"
              className="w-full object-cover"
              style={{ maxHeight: '340px', objectPosition: 'center' }}
            />
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

      <StudioBlocks pageSlug="home" />
      <Footer />

      {/* Admin inline editor for hardcoded sections */}
      {isAdmin && editingBlock && (
        <InlineBlockEditor
          block={editingBlock}
          onClose={() => setEditingBlock(null)}
        />
      )}
    </div>
  );
}
