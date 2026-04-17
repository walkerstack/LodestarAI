/*
 * ALCM — Atomic Language Control Model
 * Dedicated page. Three lenses. Learning flow links.
 * ADDITIVE ONLY — nothing removed from existing site.
 * v2: Hero background image, hub-and-spoke intro, teenager entry, professional entry
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { LightboxImage } from "@/components/Lightbox";
import { Link } from "wouter";
import { useEffect } from "react";
import KidsRedirect from "@/components/KidsRedirect";
import { kidsBlurbs } from "@/lib/kidsBlurbs";
import KidsMidLink from "@/components/KidsMidLink";
import LearningFlow from "@/components/LearningFlow";
import { flowMap } from "@/lib/learningFlowMap";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD";

// Hero — four-axis radar (Linguistic, Cognitive, Mechanical, Affective) — emotional entry
const ALCM_HERO = `${CDN}/image_a86a37cd_9e18f8a4.png`;

// Hub-and-spoke intro — Atomic Tokens at center, 6 axes radiating out — simple first look
const ALCM_HUB = `${CDN}/1000005692_3575bcb8.jpg`;

// Full dial diagram — all 8 axes as circular dials — the complete model
const ALCM_FULL = `${CDN}/1000005693_97f7b799.jpg`;

// Teenager entry — wheel diagram, three-column, "you are steering"
const ALCM_WHEEL = `${CDN}/1000005691_b206ca9b.jpg`;

// Professional entry — four-panel, most comprehensive single-image explanation
const ALCM_FOURPANEL = `${CDN}/1000005694_ec76abe6.jpg`;

export default function AlcmPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0D0D0D]">
      <Nav />
      <KidsRedirect story={kidsBlurbs["/alcm"].story} quote={kidsBlurbs["/alcm"].quote} attribution={kidsBlurbs["/alcm"].attribution} />

      <main className="flex-1">

        {/* ── HERO — four-axis radar behind title text ── */}
        <section className="relative w-full overflow-hidden" style={{ minHeight: '420px' }}>
          <img
            src={ALCM_HERO}
            alt="ALCM four-axis radar — Linguistic, Cognitive, Mechanical, Affective axes radiating from center"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center center' }}
          />
          {/* Dark overlay so text is readable */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(13,13,13,0.65) 0%, rgba(13,13,13,0.80) 60%, #0D0D0D 100%)' }}
          />
          <div className="relative z-10 container max-w-3xl mx-auto px-6 py-20 md:py-28">
            <p className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Framework
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-[#FAF6EF] leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Atomic Language Control Model
            </h1>
            <p className="text-lg text-[#c8bfb0] leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              The model that made the invisible visible. Every word in a prompt has a function.
              The ALCM maps those functions.
            </p>
          </div>
        </section>

        {/* ── HUB-AND-SPOKE INTRO — simple first look before the full diagram ── */}
        <section className="py-12">
          <div className="container max-w-3xl mx-auto px-6">
            <p className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              The Six Axes
            </p>
            <h2 className="text-xl font-bold text-[#FAF6EF] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Atomic Tokens at the Center
            </h2>
            <p className="text-sm text-[#888] leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Six control axes radiate from a single point. Each one maps a different function of language inside a prompt. This is the architecture before the detail.
            </p>
            <LightboxImage src={ALCM_HUB} alt="ALCM hub-and-spoke — Atomic Tokens at center, six axes radiating outward" className="w-full rounded-2xl" />
            <p className="text-xs text-[#555] mt-3 text-center italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Atomic Tokens at center. Six axes: Direction, Constraint, Scope, Authority, Energy, Regulation. Each word belongs to one.
            </p>
          </div>
        </section>

        {/* ── FULL DIAGRAM — the complete model, all 8 axes ── */}
        <section className="pb-12">
          <div className="container max-w-3xl mx-auto px-6">
            <p className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              The Complete Model
            </p>
            <LightboxImage src={ALCM_FULL} alt="ALCM full dial diagram — all 8 axes as circular dials with both spectrums" className="w-full rounded-2xl" />
            <p className="text-xs text-[#555] mt-3 text-center italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              All 8 axes. Every dial. The full Atomic Language Control Model.
            </p>
          </div>
        </section>

        {/* ── WHAT IT DOES ── */}
        <section className="py-12">
          <div className="container max-w-3xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              What It Does
            </h2>
            <div className="space-y-4 text-[#c8bfb0] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <p>
                The ALCM is an 8+1 axis model that maps individual words to functional roles inside a prompt.
                Direction. Constraint. Scope. Authority. Energy. Moral. Spatial Vector. Each word is a dial.
                The ALCM shows you what each dial does.
              </p>
              <p>
                It includes the verb escalation hierarchy — TRY → DO → GET → TAKE → ALLOW → FORCE —
                showing how verbs define agency intensity and escalation risk. And the HOLD dial for output regulation:
                Hold Strong, Hold Back, Hold Forward, Hold On, Hold Tight.
              </p>
              <p>
                Foundational tokens (YET, WHY, CAN, SAFE) sit beneath the axes as the base layer.
                They don't steer — they anchor.
              </p>
            </div>
          </div>
        </section>

        {/* ── THREE VOICES ── */}
        <section className="py-12">
          <div className="container max-w-3xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-[#FAF6EF] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
              Three Voices
            </h2>
            <div className="space-y-6">
              {[
                {
                  label: "Everyday",
                  color: "#E8520A",
                  text: "A map that shows what each word does in a prompt. Direction. Constraint. Scope. Authority. Each word is a dial. The ALCM shows you what each dial does. You don't need to memorize it — just knowing it exists changes how you write.",
                },
                {
                  label: "Professional",
                  color: "#c8bfb0",
                  text: "The 8+1 axis model mapping individual words to functional roles: Direction, Constraint, Scope, Authority, Spatial Vector, plus foundational tokens (YET, WHY, CAN, SAFE). Includes verb escalation hierarchy and the HOLD dial for output regulation. The structural grammar of prompt engineering.",
                },
                {
                  label: "Watcher",
                  color: "#555",
                  text: "Atomic words act as control dials, shaping reasoning structure, depth, and velocity. The model that made the invisible visible. Every prompt is a machine. The ALCM is the schematic.",
                },
              ].map((lens) => (
                <div
                  key={lens.label}
                  className="rounded-xl p-5"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: lens.color, fontFamily: "'DM Sans', sans-serif" }}>
                    {lens.label}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif" }}>
                    {lens.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TEENAGER ENTRY — wheel diagram, "you are steering" ── */}
        <section className="py-12" style={{ background: 'rgba(232,82,10,0.04)', borderTop: '1px solid rgba(232,82,10,0.12)', borderBottom: '1px solid rgba(232,82,10,0.12)' }}>
          <div className="container max-w-3xl mx-auto px-6">
            <p className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              For Teenagers
            </p>
            <h2 className="text-2xl font-bold text-[#FAF6EF] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              You Are the Steering
            </h2>
            <p className="text-sm text-[#c8bfb0] leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Think of the ALCM as a steering wheel. Every word you type turns the wheel in a direction. Direction. Constraint. Scope. Authority. You are not just typing — you are driving. The wheel diagram shows you which words go where.
            </p>
            <LightboxImage src={ALCM_WHEEL} alt="ALCM wheel diagram — three-column steering model showing how words control direction" className="w-full rounded-2xl" />
            <p className="text-xs text-[#555] mt-3 text-center italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Steering Reasoning (YET/WHY/WHAT/HOW) · Multi-Axis Control System · Action & HOLD Framework. You are the one steering.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/promptolinguistics"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold no-underline transition-all"
                style={{ background: 'rgba(232,82,10,0.15)', color: '#E8520A', border: '1px solid rgba(232,82,10,0.3)' }}
              >
                Go deeper — Promptolinguistics →
              </Link>
              <Link
                href="/lexicon"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold no-underline transition-all"
                style={{ background: 'rgba(255,255,255,0.04)', color: '#c8bfb0', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                Living Lexicon →
              </Link>
            </div>
          </div>
        </section>

        {/* ── PROFESSIONAL ENTRY — four-panel, deep dive ── */}
        <section className="py-12">
          <div className="container max-w-3xl mx-auto px-6">
            <p className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              For Researchers & Professionals
            </p>
            <h2 className="text-2xl font-bold text-[#FAF6EF] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              The Full Architecture
            </h2>
            <p className="text-sm text-[#c8bfb0] leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Atomic Tokens as Multi-Axis Cognitive Control Variables. The four-panel view shows the complete web of axes, escalation ramp, and hold modulation springs simultaneously. This is the most comprehensive single-image explanation of the ALCM.
            </p>
            <LightboxImage src={ALCM_FOURPANEL} alt="ALCM four-panel diagram — Atomic Tokens Steer Reasoning, Action & Hold Framework, Syntax-Level Insight" className="w-full rounded-2xl" />
            <p className="text-xs text-[#555] mt-3 text-center italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Atomic Tokens Steer Reasoning · Action & Hold Framework · Syntax-Level Insight · Multi-Axis Control System
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/promptolinguistics"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold no-underline transition-all"
                style={{ background: 'rgba(232,82,10,0.15)', color: '#E8520A', border: '1px solid rgba(232,82,10,0.3)' }}
              >
                Promptolinguistics — the discipline →
              </Link>
              <Link
                href="/variable-scale"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold no-underline transition-all"
                style={{ background: 'rgba(255,255,255,0.04)', color: '#c8bfb0', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                Variable Scale Theory →
              </Link>
              <Link
                href="/field-papers"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold no-underline transition-all"
                style={{ background: 'rgba(255,255,255,0.04)', color: '#c8bfb0', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                Field Papers →
              </Link>
            </div>
          </div>
        </section>

        {/* ── THE EIGHT AXES ── */}
        <section className="py-12">
          <div className="container max-w-3xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              The Eight Axes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { axis: "Direction", desc: "Steering — HOW vs. WHAT", example: "How → Execution | What → Mechanism" },
                { axis: "Constraint", desc: "Obligation — CAN / MUST / SHOULD", example: "CAN → Possibility | MUST → Necessity | SHOULD → Moral" },
                { axis: "Scope", desc: "Perspective — I / WE / SYSTEM", example: "I → Agency | WE → Collective | SYSTEM → Holistic" },
                { axis: "Authority", desc: "Signaling — ASK / TELL / COMMAND", example: "ASK → Request | TELL → Inform | COMMAND → Direct" },
                { axis: "Energy", desc: "Drive — DESIRE / BELIEVE / ACTION", example: "DESIRE → Want | BELIEVE → Conviction | ACTION → Imposition" },
                { axis: "Moral", desc: "Scale — FAIR / UNFAIR", example: "The ethical dimension of the prompt" },
                { axis: "Regulation (HOLD)", desc: "Calibration — tension and control", example: "Hold Strong / Hold Back / Hold Forward / Hold On" },
                { axis: "Spatial Vector", desc: "Reasoning shaped by structural variables", example: "Language encodes cognitive physics" },
              ].map((a) => (
                <div
                  key={a.axis}
                  className="rounded-lg p-4"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <p className="text-sm font-bold text-[#E8520A] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{a.axis}</p>
                  <p className="text-xs text-[#888] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{a.desc}</p>
                  <p className="text-xs text-[#555] italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>{a.example}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── KIDS MID LINK ── */}
        <div className="flex justify-center py-4">
          <KidsMidLink />
        </div>

      </main>

      <LearningFlow
        current="ALCM"
        deeper={flowMap.alcm.deeper}
        wider={flowMap.alcm.wider}
        simpler={flowMap.alcm.simpler}
        dark
      />

      <Footer />
    </div>
  );
}
