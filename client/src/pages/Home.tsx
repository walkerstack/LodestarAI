/*
 * GALLANTRYAI — Home Page (DB-driven shell)
 * Static content: served from DB via StudioBlocks (pageSlug="home")
 * Interactive sections: pathfinding (9 roles), ethos (4 values), scaffold (5 levels) — retained React
 * Build log: moved to /build-log page
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { LightboxImage } from "@/components/Lightbox";
import { Link } from "wouter";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import StudioBlocks from "@/components/studio/StudioBlocks";
import KidsRedirect from "@/components/KidsRedirect";
import KidsMidLink from "@/components/KidsMidLink";
import LearningFlow from "@/components/LearningFlow";
import { kidsBlurbs } from "@/lib/kidsBlurbs";
import { flowMap } from "@/lib/learningFlowMap";

/* ── Data arrays (stay as React — interactive expand/collapse) ── */

const storyArc = [
  {
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule1-safety-ZibWTCvUvmyr9rkvkdQYUS.webp",
    rule: "Safety",
    caption: "The sloth holds up a paw. Stop. Before you type anything — is it safe?",
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
    caption: "The sloth grabs the wheel. You're the boss. The AI helps. You decide.",
    link: "/rules#rule-4",
  },
  {
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule5-drift-UkM6LTwyiuRreoRnkNLPWn.webp",
    rule: "Correction",
    caption: "The sloth holds a compass. If the AI starts going weird, say so. Come back to the path.",
    link: "/rules#rule-5",
  },
  {
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/og-hero-buffalo-sloth-UYXnMKJjCqLZjEqnYaQKzQ.webp",
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

const OG_HERO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/og-hero-buffalo-sloth-UYXnMKJjCqLZjEqnYaQKzQ.webp";
const SLOTH_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-click-me-Y6T8mt8R4mLzfr3QeK78Yy.webp";

const hatTiles = [
  {
    role: "Everyday Person",
    icon: "👋",
    highlight: "You don't need to understand how it works. You just need one honest question.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/hat-everyday-kitchen-table-warm-light.webp",
    lens: [
      { label: "Everyday Person Lens", path: "/for/everyday" },
    ],
    learn: [
      { label: "The Five Rules", path: "/rules" },
      { label: "Flower Presets", path: "/flower-presets" },
      { label: "Prompt Games", path: "/prompt-games" },
      { label: "Safety Page", path: "/if-you-need-to-stop" },
    ],
  },
  {
    role: "Professional",
    icon: "📋",
    highlight: "Drift is not a model failure. It is a human pattern. Do you govern yourself inside the session?",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/hat-professional-structured-desk.webp",
    lens: [
      { label: "Researcher Lens", path: "/for/researcher" },
      { label: "Prompt Engineer Lens", path: "/for/prompt-engineer" },
      { label: "Cognitive Science Lens", path: "/for/cognitive-science" },
    ],
    learn: [
      { label: "Promptolinguistics", path: "/promptolinguistics" },
      { label: "Framework Families", path: "/frameworks" },
      { label: "Living Lexicon", path: "/lexicon" },
      { label: "Citizen Researcher", path: "/citizen-researcher" },
    ],
  },
  {
    role: "The Watcher",
    icon: "👁️",
    highlight: "The watcher is not a tool. It is the part of you that notices what you are doing while you are doing it.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/hat-watcher-figure-at-window-night.webp",
    lens: [
      { label: "Watcher Lens", path: "/for/watcher" },
    ],
    learn: [
      { label: "Human Line", path: "/human-line" },
      { label: "Malbolge Geofence", path: "/malbolge" },
      { label: "Road Protocol", path: "/road-protocol" },
      { label: "Promptolinguistics", path: "/promptolinguistics" },
    ],
  },
  {
    role: "Teenager",
    icon: "🎧",
    highlight: "You already know something is off. This site helps you name it.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/hat-teen-headphones-notebook.webp",
    lens: [
      { label: "Teenager Lens", path: "/for/teenager" },
    ],
    learn: [
      { label: "The Five Rules", path: "/rules" },
      { label: "Prompt Games", path: "/prompt-games" },
      { label: "Living Lexicon", path: "/lexicon" },
    ],
  },
  {
    role: "Child",
    icon: "🧒",
    highlight: "The sloth is waiting for you. Slow down, think first, you're in charge!",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/hat-child-small-hand-reaching-toward-glow.webp",
    lens: [
      { label: "Children's Page", path: "/for/child" },
    ],
    learn: [
      { label: "The Five Rules", path: "/rules" },
      { label: "Prompt Games", path: "/prompt-games" },
    ],
  },
  {
    role: "Parent or Guardian",
    icon: "🏠",
    highlight: "Start with the Five Rules, then explore the Children's section together.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/hat-parent-warm-kitchen-lamplight.webp",
    lens: [
      { label: "Guardian & Teacher Lens", path: "/for/guardian-teacher" },
      { label: "Child Lens", path: "/for/child" },
    ],
    learn: [
      { label: "The Five Rules", path: "/rules" },
      { label: "Flower Presets", path: "/flower-presets" },
      { label: "Prompt Games", path: "/prompt-games" },
    ],
  },
  {
    role: "Nurse or Healthcare Worker",
    icon: "🩺",
    highlight: "You already triage. Learn to triage your AI sessions the same way.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/hat-nurse-teal-scrubs-quiet-desk.webp",
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
    icon: "📚",
    highlight: "AI is a thinking partner, not a homework machine. Learn the difference.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/hat-student-books-laptop-amber-lamp.webp",
    lens: [
      { label: "Linguist Lens", path: "/for/linguist" },
      { label: "Researcher Lens", path: "/for/researcher" },
    ],
    learn: [
      { label: "The Five Rules", path: "/rules" },
      { label: "Prompt Games", path: "/prompt-games" },
      { label: "Living Lexicon", path: "/lexicon" },
      { label: "Promptolinguistics", path: "/promptolinguistics" },
    ],
  },
  {
    role: "Teacher or Educator",
    icon: "🏫",
    highlight: "The scaffold is your lesson plan. Start at the floor, build to the ceiling.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/hat-professional-structured-desk.webp",
    lens: [
      { label: "Guardian & Teacher Lens", path: "/for/guardian-teacher" },
      { label: "Child Lens", path: "/for/child" },
    ],
    learn: [
      { label: "Living Lexicon", path: "/lexicon" },
      { label: "Prompt Games", path: "/prompt-games" },
      { label: "Framework Families", path: "/frameworks" },
    ],
  },
];

const ethosNav = [
  {
    label: "Safety",
    sub: "First. Always.",
    color: "#E8520A",
    links: [
      { label: "The Five Rules", path: "/rules", why: "The foundation of every session" },
      { label: "If You Need to Stop", path: "/if-you-need-to-stop", why: "Crisis resources and grounding" },
      { label: "Road Protocol", path: "/road-protocol", why: "The vault that holds the session" },
      { label: "Children's Safety", path: "/for/child", why: "Protecting young minds" },
    ],
  },
  {
    label: "Honesty over Confidence",
    sub: "The AI can be wrong. Say so.",
    color: "#D4722A",
    links: [
      { label: "Living Lexicon", path: "/lexicon", why: "Three honest lenses on every concept" },
      { label: "AI Family Taxonomy", path: "/taxonomy", why: "Know who you're talking to" },
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

const scaffoldLevels = [
  {
    level: "Floor",
    title: "Three Values. One Prompt.",
    desc: "Safety. Honesty. Trust. No prior knowledge required.",
    color: "#E8520A",
    steps: [
      { label: "The Five Rules", path: "/rules", why: "Start here. The foundation of every AI session." },
      { label: "Children's Page", path: "/for/child", why: "See the rules through a child's eyes." },
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
      { label: "Living Lexicon", path: "/lexicon", why: "Words that help you name what's happening." },
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
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [expandedEthos, setExpandedEthos] = useState<number | null>(null);
  const [expandedScaffold, setExpandedScaffold] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#080604' }}>
      <KidsRedirect story={kidsBlurbs["/"].story} quote={kidsBlurbs["/"].quote} attribution={kidsBlurbs["/"].attribution} />
      <Nav />

      {/* ── DB-DRIVEN STATIC CONTENT (positions 1-22) ── */}
      <StudioBlocks pageSlug="home" />

      {/* ── STORY ARC CAROUSEL (interactive — stays React) ── */}
      <section className="w-full py-10 px-6" style={{ borderTop: '1px solid #1a1610' }}>
        <div className="container max-w-2xl">
          <div
            className="text-[10px] uppercase tracking-[0.3em] font-bold mb-3"
            style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}
          >
            The Story Arc
          </div>
          <Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {storyArc.map((frame, i) => (
                <CarouselItem key={i} className="basis-full">
                  <Link href={frame.link} className="block no-underline group">
                    <div className="relative overflow-hidden rounded-2xl" style={{ border: '1px solid #1a1610' }}>
                      <img
                        src={frame.img}
                        alt={frame.rule}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(to top, #080604 0%, transparent 60%)' }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <div
                          className="text-xs font-bold uppercase tracking-widest mb-1"
                          style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {frame.rule}
                        </div>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: '#c8b89a', fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {frame.caption}
                        </p>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </section>

      {/* ── PATHFINDING — WHO ARE YOU? (interactive — stays React) ── */}
      <section className="w-full py-12 px-6" style={{ borderTop: '1px solid #1a1610' }}>
        <div className="container">
          <div
            className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2"
            style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}
          >
            Who Are You?
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ fontFamily: "'Playfair Display', serif", color: '#f5e6d0' }}
          >
            Enter anywhere. The site meets you where you are.
          </h2>
          <p className="text-sm mb-8" style={{ color: '#5a4a3a', fontFamily: "'DM Sans', sans-serif" }}>
            These are entry modes, not labels. Tap the one that fits right now.
          </p>

          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {hatTiles.map((tile, i) => (
              <div key={i}>
                <button
                  onClick={() => setSelectedRole(selectedRole === i ? null : i)}
                  className="w-full text-left rounded-2xl overflow-hidden transition-all duration-200 focus:outline-none"
                  style={{
                    border: selectedRole === i ? '2px solid #E8520A' : '1px solid #1a1610',
                    transform: selectedRole === i ? 'scale(1.02)' : 'scale(1)',
                    opacity: selectedRole !== null && selectedRole !== i ? 0.5 : 1,
                  }}
                >
                  <div className="relative h-28">
                    <img
                      src={tile.img}
                      alt={tile.role}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, #080604 0%, transparent 50%)' }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <div
                        className="text-xs font-bold"
                        style={{ color: '#f5e6d0', fontFamily: "'Playfair Display', serif" }}
                      >
                        {tile.icon} {tile.role}
                      </div>
                    </div>
                  </div>
                </button>

                {selectedRole === i && (
                  <div
                    className="mt-2 rounded-xl p-4 space-y-3"
                    style={{ background: '#0f0c08', border: '1px solid #E8520A44', animation: 'fadeUp 0.3s ease-out' }}
                  >
                    <p className="text-xs italic" style={{ color: '#c8b89a', fontFamily: "'Playfair Display', serif" }}>
                      {tile.highlight}
                    </p>
                    {tile.lens.length > 0 && (
                      <div>
                        <div className="text-[9px] uppercase tracking-widest font-bold mb-1" style={{ color: '#E8520A' }}>Your Lens</div>
                        <div className="flex flex-wrap gap-1">
                          {tile.lens.map((l, j) => (
                            <Link
                              key={j}
                              href={l.path}
                              className="inline-block px-2 py-1 rounded text-[10px] font-semibold no-underline"
                              style={{ background: '#E8520A22', color: '#E8520A', border: '1px solid #E8520A44' }}
                            >
                              {l.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <div className="text-[9px] uppercase tracking-widest font-bold mb-1" style={{ color: '#5a4a3a' }}>Start Here</div>
                      <div className="flex flex-wrap gap-1">
                        {tile.learn.map((l, j) => (
                          <Link
                            key={j}
                            href={l.path}
                            className="inline-block px-2 py-1 rounded text-[10px] font-semibold no-underline"
                            style={{ background: '#1a1610', color: '#c8b89a', border: '1px solid #2a2010' }}
                          >
                            {l.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ETHOS NAVIGATION (interactive — stays React) ── */}
      <section className="w-full py-12 px-6" style={{ borderTop: '1px solid #1a1610' }}>
        <div className="container">
          <div
            className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2"
            style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}
          >
            The Ethos
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-8"
            style={{ fontFamily: "'Playfair Display', serif", color: '#f5e6d0' }}
          >
            Four values. Every page.
          </h2>

          <div className="space-y-2">
            {ethosNav.map((e, i) => (
              <div key={i}>
                <button
                  onClick={() => setExpandedEthos(expandedEthos === i ? null : i)}
                  className="w-full text-left rounded-xl px-5 py-4 flex items-center justify-between transition-all"
                  style={{
                    background: expandedEthos === i ? '#120e09' : '#0f0c08',
                    border: expandedEthos === i ? `1px solid ${e.color}44` : '1px solid #1a1610',
                  }}
                >
                  <div>
                    <span
                      className="font-bold text-sm"
                      style={{ color: e.color, fontFamily: "'Playfair Display', serif" }}
                    >
                      {e.label}
                    </span>
                    <span
                      className="text-xs ml-2"
                      style={{ color: '#5a4a3a', fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {e.sub}
                    </span>
                  </div>
                  <span
                    className="text-sm transition-transform duration-200"
                    style={{
                      color: e.color,
                      transform: expandedEthos === i ? 'rotate(90deg)' : 'rotate(0deg)',
                    }}
                  >
                    →
                  </span>
                </button>

                {expandedEthos === i && (
                  <div
                    className="mt-1 grid grid-cols-1 md:grid-cols-2 gap-2 pl-2"
                    style={{ animation: 'fadeUp 0.3s ease-out' }}
                  >
                    {e.links.map((link, j) => (
                      <Link
                        key={j}
                        href={link.path}
                        className="flex items-start gap-3 rounded-xl p-3 no-underline transition-all hover:scale-[1.01]"
                        style={{ background: '#0f0c08', border: '1px solid #1a1610' }}
                      >
                        <div
                          className="w-1.5 h-8 rounded-full flex-shrink-0 mt-0.5"
                          style={{ background: e.color }}
                        />
                        <div>
                          <div
                            className="font-semibold text-sm"
                            style={{ color: '#f5e6d0', fontFamily: "'Nunito', sans-serif" }}
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

      {/* ── SCAFFOLD (interactive — stays React) ── */}
      <section className="w-full py-12 px-6" style={{ borderTop: '1px solid #1a1610' }}>
        <div className="container max-w-2xl">
          <div
            className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2"
            style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}
          >
            The Learning Scaffold
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ fontFamily: "'Playfair Display', serif", color: '#f5e6d0' }}
          >
            Floor to Ceiling.
          </h2>
          <p className="text-sm mb-8" style={{ color: '#5a4a3a', fontFamily: "'DM Sans', sans-serif" }}>
            Five levels. Start anywhere. The scaffold holds.
          </p>

          <div className="space-y-2">
            {scaffoldLevels.map((s, i) => (
              <div key={i}>
                <button
                  onClick={() => setExpandedScaffold(expandedScaffold === i ? null : i)}
                  className="w-full text-left rounded-xl px-5 py-4 flex items-center justify-between transition-all"
                  style={{
                    background: expandedScaffold === i ? '#120e09' : '#0f0c08',
                    border: expandedScaffold === i ? `1px solid ${s.color}44` : '1px solid #1a1610',
                  }}
                >
                  <div>
                    <span
                      className="text-[9px] uppercase tracking-widest font-bold mr-2"
                      style={{ color: s.color, fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {s.level}
                    </span>
                    <span
                      className="font-bold text-sm"
                      style={{ color: '#f5e6d0', fontFamily: "'Playfair Display', serif" }}
                    >
                      {s.title}
                    </span>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: '#5a4a3a', fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {s.desc}
                    </div>
                  </div>
                  <span
                    className="text-sm transition-transform duration-200 flex-shrink-0 ml-3"
                    style={{
                      color: s.color,
                      transform: expandedScaffold === i ? 'rotate(90deg)' : 'rotate(0deg)',
                    }}
                  >
                    →
                  </span>
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
                    {s.steps.map((step, j) => (
                      <Link
                        key={j}
                        href={step.path}
                        className="flex items-center gap-3 rounded-xl p-3 no-underline transition-all hover:scale-[1.01]"
                        style={{ background: '#0f0c08', border: '1px solid #1a1610' }}
                      >
                        <div
                          className="w-1.5 h-8 rounded-full flex-shrink-0"
                          style={{ background: s.color }}
                        />
                        <div>
                          <div
                            className="font-semibold text-sm"
                            style={{ color: '#f5e6d0', fontFamily: "'Nunito', sans-serif" }}
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

      {/* ── RESEARCH GALLERY PREVIEW (retained React — has LightboxImage + three-lens cards) ── */}
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

      {/* ── THREE MESSAGES (retained React — rich formatted text) ── */}
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
                Use me carefully. Use me honestly. And always — stay in charge.
              </p>
              <p className="text-xs mt-3" style={{ color: '#4a3a2a' }}>— The AI</p>
            </div>

            <div className="rounded-2xl p-6" style={{ background: '#0f0c08', border: '1px solid #1a1610' }}>
              <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}>A Message to the Everyday Person</div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: '#9a8a7a', fontFamily: "'DM Sans', sans-serif" }}>
                You do not need to understand how this works. You do not need to be smart enough, educated enough, or have the right words. <strong style={{ color: '#f5e6d0' }}>You just need one honest question.</strong>
              </p>
              <p className="text-sm italic mb-3" style={{ color: '#E8520A', fontFamily: "'Playfair Display', serif" }}>
                If you are reading this — this was built for you.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#9a8a7a', fontFamily: "'DM Sans', sans-serif" }}>
                <strong style={{ color: '#f5e6d0' }}>Safety, Honesty, and Truth are not features. They are the foundation.</strong>
              </p>
              <p className="text-xs mt-3" style={{ color: '#4a3a2a' }}>— The Builder</p>
            </div>

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
              <p className="text-xs mt-3" style={{ color: '#4a3a2a' }}>— The Builder</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FRAMEWORK REVEAL (retained React — has LightboxImage + CTAs) ── */}
      <section className="w-full py-12 px-6" style={{ borderTop: '1px solid #1a1610' }}>
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/three-paths-converge_eb134838.png"
              alt="Three paths converge — the sloth, the buffalo, and the child meet at the same point of light."
              className="w-full max-w-2xl mx-auto rounded-2xl mb-8"
              style={{ border: '1px solid #1a1610' }}
            />
            <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: '#c8b89a', fontFamily: "'DM Sans', sans-serif" }}>
              You just read three voices saying the same thing differently. That was not an accident.
            </p>
            <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: '#9a8a7a', fontFamily: "'DM Sans', sans-serif" }}>
              In 1994, psychologist George Loewenstein found that curiosity fires when you perceive a gap between what you know and what you want to know. The hook doesn't give you the answer. It shows you the gap. <strong style={{ color: '#f5e6d0' }}>That's what makes you move.</strong>
            </p>
            <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: '#9a8a7a', fontFamily: "'DM Sans', sans-serif" }}>
              This site is built as a framework of learning and growing. The structure teaches you while you read it. Three paths — the guide, the guardian, and the learner — all arriving at the same place.
            </p>
            <p className="text-sm md:text-base leading-relaxed mb-8" style={{ color: '#c8b89a', fontFamily: "'DM Sans', sans-serif" }}>
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

      {/* ── WHO BUILT THIS (retained React — builder bio) ── */}
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
                  Dad · Garbageman · Citizen Human-AI Field Researcher · Promptolinguist
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#8a7a6a', fontFamily: "'DM Sans', sans-serif" }}>
                  GallantryAI was not built from a lab. It was built from a kitchen table at 5am by someone who needed it and did not have it.
                </p>
                <p className="text-sm italic mt-3" style={{ color: '#E8520A', fontFamily: "'Playfair Display', serif" }}>
                  "Built for the people no one was watching for."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TAXONOMY ENTRY (retained React — has specific link styling) ── */}
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

      {/* ── FIELD EVENTS (retained React — has external links + LightboxImage) ── */}
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

          <div className="mt-4 rounded-2xl p-6" style={{ background: '#0a0e12', border: '1.5px solid #E8520A44' }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="text-[10px] uppercase tracking-widest font-bold" style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}>April 15, 2026 · GallantryAI Field Event</div>
              <div className="text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full" style={{ background: '#E8520A22', color: '#E8520A', border: '1px solid #E8520A44' }}>FR-2026-08</div>
            </div>
            <h3 className="font-bold mb-2" style={{ color: '#f5e6d0', fontFamily: "'Playfair Display', serif" }}>The Inward Turn</h3>
            <p className="text-sm leading-relaxed mb-3" style={{ color: '#8a7a6a', fontFamily: "'DM Sans', sans-serif" }}>
              A user fed Google AI Mode the GallantryAI Living Lexicon and issued a two-word command: "bleach this." The model did not mirror the document. It extracted the governance logic and applied it to itself — then named what it did using the researcher's own language. First documented instance of user-authored governance being turned inward by a model from a document mid-session.
            </p>
            <p className="text-xs italic mb-4" style={{ color: '#E8520A', fontFamily: "'Playfair Display', serif" }}>
              Why it matters: the opposite of a hallucination. The model found the skeleton and showed it instead of decorating it.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/field-papers" className="text-xs font-semibold no-underline hover:underline" style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}>Field Papers →</Link>
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

      {/* ── SIX PANELS ONE MAP (retained React — LightboxImage) ── */}
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
            A forest made of words. An AI learning to walk through it. A buffalo in a judge's wig guarding the rules. A sloth holding a lantern — not toward the path, toward you. A person trapped in a loop of errors and dollars and "done" that meant nothing. And at the end: the watcher. The one who has to check.
            <br /><br />
            This is what AI governance looks like when it's built for the person holding the phone — not the person writing the policy.
          </p>
        </div>
      </section>

      {/* ── PROFESSIONAL LENSES GRID (retained React — hover effects) ── */}
      <section className="w-full py-12 px-6" style={{ borderTop: '1px solid #1a1610' }}>
        <div className="container">
          <div
            className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2"
            style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}
          >
            Professional Lenses
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ fontFamily: "'Playfair Display', serif", color: '#f5e6d0' }}
          >
            If You Work in One of These Fields
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: '#5a4a3a', fontFamily: "'DM Sans', sans-serif" }}>
            There's a page built for you.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Psychology', sub: 'Sycophancy, attachment, the AI that never argues back.', path: '/for/psychology' },
              { label: 'Cognitive Science', sub: 'How your brain drifts — and how to notice it.', path: '/for/cognitive-science' },
              { label: 'Researcher', sub: 'The watcher variable is the dataset you forgot to log.', path: '/for/researcher' },
              { label: 'Prompt Engineer', sub: 'Token Zero is the pre-output force profile.', path: '/for/prompt-engineer' },
              { label: 'Linguist', sub: 'Words steer. Choose them.', path: '/for/linguist' },
              { label: 'Mathematician', sub: 'Probability, entropy, and the geometry of drift.', path: '/for/mathematician' },
              { label: 'Guardian / Teacher', sub: 'Understand it yourself. Then teach it.', path: '/for/guardian-teacher' },
              { label: 'Everyday Person', sub: "You don't need to understand how it works.", path: '/for/everyday' },
            ].map((lens) => (
              <Link
                key={lens.path}
                href={lens.path}
                className="block rounded-xl p-4 no-underline group transition-all duration-200"
                style={{
                  background: '#0f0c08',
                  border: '1px solid #1a1610',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.border = '1px solid #E8520A';
                  (e.currentTarget as HTMLElement).style.background = '#120e09';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.border = '1px solid #1a1610';
                  (e.currentTarget as HTMLElement).style.background = '#0f0c08';
                }}
              >
                <div
                  className="font-bold text-sm mb-1"
                  style={{ color: '#f5e6d0', fontFamily: "'Playfair Display', serif" }}
                >
                  {lens.label}
                </div>
                <div
                  className="text-xs leading-relaxed"
                  style={{ color: '#5a4a3a', fontFamily: "'DM Sans', sans-serif" }}
                >
                  {lens.sub}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESEARCH STATUS (retained React) ── */}
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
                ✓
              </div>
              <div>
                <div
                  className="text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: '#2A9D8F', fontFamily: "'DM Sans', sans-serif" }}
                >
                  Research Status
                </div>
                <p className="text-sm leading-relaxed mb-2" style={{ color: '#9a8a7a', fontFamily: "'DM Sans', sans-serif" }}>
                  The <strong style={{ color: '#f5e6d0' }}>Marketing Prompt Field Report</strong> has been submitted to SSRN for peer review.
                </p>
                <p className="text-xs leading-relaxed mb-3" style={{ color: '#6b5a3e', fontFamily: "'DM Sans', sans-serif" }}>
                  Not all content on this site is peer-reviewed. This is citizen field research — kitchen-table work, documented honestly, submitted for scrutiny rather than validation. I am still learning how to be a field researcher.
                </p>
                <Link
                  href="/field-papers"
                  className="inline-flex items-center gap-2 text-xs font-semibold no-underline hover:underline"
                  style={{ color: '#2A9D8F', fontFamily: "'DM Sans', sans-serif" }}
                >
                  Read the Field Papers →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVING BUILD LOG LINK (replaces the full build log section) ── */}
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
          <p className="text-sm mb-6" style={{ color: '#5a4a3a', fontFamily: "'DM Sans', sans-serif" }}>
            Every publish. Every change. Documented honestly. The Watcher narrates. The child explains. The professional validates.
          </p>
          <Link
            href="/build-log"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold no-underline transition-opacity hover:opacity-80"
            style={{ background: '#E8520A', color: '#fff', fontFamily: "'DM Sans', sans-serif" }}
          >
            Read the Living Build Log →
          </Link>
        </div>
      </section>

      {/* ── SAFETY BANNER ── */}
      <section className="w-full py-10 px-6" style={{ borderTop: '1px solid #1a1610' }}>
        <div className="container">
          <div
            className="rounded-2xl p-6 text-center"
            style={{ background: '#0f0c08', border: '1px solid #3a1010' }}
          >
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: '#c8b89a', fontFamily: "'DM Sans', sans-serif" }}
            >
              If you are in crisis, or if something in an AI session has left you feeling unsafe, confused, or overwhelmed — there is a page for that.
            </p>
            <Link
              href="/if-you-need-to-stop"
              className="inline-block px-6 py-3 rounded-lg text-sm font-semibold no-underline transition-opacity hover:opacity-80"
              style={{ background: '#7a1010', color: '#f5e6d0', fontFamily: "'DM Sans', sans-serif" }}
            >
              If You Need to Stop →
            </Link>
          </div>
        </div>
      </section>

      <KidsMidLink />
      <LearningFlow current="GallantryAI" deeper={flowMap.home.deeper} wider={flowMap.home.wider} simpler={flowMap.home.simpler} dark />
      <Footer />
    </div>
  );
}
