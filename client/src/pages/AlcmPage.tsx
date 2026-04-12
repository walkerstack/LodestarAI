/*
 * ALCM — Atomic Language Control Model
 * Dedicated page. Three lenses. Learning flow links.
 * ADDITIVE ONLY — nothing removed from existing site.
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { LightboxImage } from "@/components/Lightbox";
import { Link } from "wouter";
import { useEffect } from "react";
import KidsRedirect from "@/components/KidsRedirect";
import { kidsBlurbs } from "@/lib/kidsBlurbs";
import KidsMidLink from "@/components/KidsMidLink";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD";
const ALCM_IMG = `${CDN}/1000005693_e894b781.jpg`;

export default function AlcmPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0D0D0D]">
      <Nav />
      <KidsRedirect story={kidsBlurbs["/alcm"].story} quote={kidsBlurbs["/alcm"].quote} attribution={kidsBlurbs["/alcm"].attribution} />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 md:py-28">
          <div className="container max-w-3xl mx-auto px-6">
            <p className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Framework
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-[#FAF6EF] leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Atomic Language Control Model
            </h1>
            <p className="text-lg text-[#888] leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              The model that made the invisible visible. Every word in a prompt has a function.
              The ALCM maps those functions.
            </p>
          </div>
        </section>

        {/* Diagram */}
        <section className="pb-12">
          <div className="container max-w-3xl mx-auto px-6">
            <LightboxImage src={ALCM_IMG} alt="ALCM — Atomic Language Control Model" className="w-full rounded-2xl" />
            <p className="text-xs text-[#555] mt-3 text-center italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Core Insight: Minimal language elements function as control dials, shaping reasoning structure and outcomes, not content alone.
            </p>
          </div>
        </section>
        <KidsMidLink />


        {/* What It Is */}
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

        {/* Three Lenses */}
        <section className="py-12">
          <div className="container max-w-3xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-[#FAF6EF] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
              Three Lenses
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

        {/* The Axes */}
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

        {/* Learning Flow */}
        <section className="py-12">
          <div className="container max-w-3xl mx-auto px-6">
            <h2 className="text-xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Learning &amp; Growing
            </h2>
            <p className="text-sm text-[#888] mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              The ALCM connects to everything. Here's where to go next.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Variable Scale Theory", path: "/variable-scale", desc: "The dials move. Who's turning them?" },
                { label: "Whelm Scale", path: "/whelm-scale", desc: "Too much, too little, or just right." },
                { label: "Promptolinguistics", path: "/promptolinguistics", desc: "The science of what words do to AI." },
                { label: "The Five Rules", path: "/rules", desc: "Where everyone starts." },
                { label: "Living Lexicon", path: "/lexicon", desc: "Every term. Three lenses." },
                { label: "Frameworks", path: "/frameworks", desc: "The full architecture." },
              ].map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="block rounded-lg p-4 no-underline transition-all hover:bg-[rgba(232,82,10,0.05)]"
                  style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <p className="text-sm font-semibold text-[#FAF6EF] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{link.label}</p>
                  <p className="text-xs text-[#666]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{link.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
