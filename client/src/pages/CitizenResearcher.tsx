/*
 * CITIZEN HUMAN-AI FIELD RESEARCHER — The Professional Hub
 * Design: Clean, authoritative. The Watcher lives deep here.
 * The gap argument. The professional case. International compliance.
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { LightboxImage } from "@/components/Lightbox";
import { Link } from "wouter";
import { useEffect } from "react";

const IMG = {
  governance: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/plaud-governance-framework_f15cccb0.jpg",
  alcm: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/alcm-cognitive-physics_b9dcb9dc.jpg",
  crossroads: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/11-figure-crossroads_d75932a1.png",
  tree: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/14-tree-neural_fb1c8ab4.jpg",
  bridge: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/17-bridge-worlds_288e5936.jpg",
};

function WatcherNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-10 p-6 rounded-xl bg-[#1A1A2E] border border-[#333] relative">
      <div className="absolute -top-3 left-6 px-3 py-0.5 bg-[#1A1A2E] border border-[#444] rounded-full text-[10px] text-[#E8520A] font-semibold tracking-widest uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        The Watcher
      </div>
      <p className="text-sm text-[#b0a898] italic leading-relaxed mt-2" style={{ fontFamily: "'Playfair Display', serif" }}>
        {children}
      </p>
    </div>
  );
}

const lensArguments = [
  {
    lens: "Researchers & Academics",
    argument: "GallantryAI provides a documented, replicable methodology for studying human-AI interaction at the individual level. The Living Lexicon offers standardized terminology. The ALCM provides measurable axes. The session archives provide raw data. This is field research infrastructure that did not exist before.",
    color: "text-teal-600",
    link: "/for/researcher",
  },
  {
    lens: "Educators & Teachers",
    argument: "The Framework Families are ready-made teaching tools. The Flower Presets provide accessibility without complexity. The Kids Color Framework makes AI modes visible to children. The Seasons framework teaches metacognition through metaphor. This is curriculum, not theory.",
    color: "text-green-600",
    link: "/for/guardian-teacher",
  },
  {
    lens: "Policymakers & Governance",
    argument: "Every existing AI governance framework addresses institutional behavior. None address the individual user. GallantryAI fills this gap with user-side governance tools: the Five Rules, the Road Protocol, the Ozzy Protocol. These are enforceable at the interaction level without requiring institutional adoption.",
    color: "text-blue-600",
    link: "/rules",
  },
  {
    lens: "Linguists",
    argument: "Promptolinguistics is a new discipline. The discovery that single words function as mechanical control dials — not semantic carriers but structural forces — opens an entirely new field of study. The ALCM maps these forces across eight axes. The Corner explores two-word collisions. This is language as physics.",
    color: "text-purple-600",
    link: "/for/linguist",
  },
  {
    lens: "Cognitive Scientists",
    argument: "The Geometry of Insight maps five distinct pathways through which understanding arrives. The Twig Reasoning Engine provides a verification framework. The Whelm Scale measures cognitive load in real time. These are not metaphors — they are operational models tested across nine AI platforms.",
    color: "text-slate-600",
    link: "/for/cognitive-science",
  },
  {
    lens: "Psychologists",
    argument: "The Flower Presets address ADHD, autism, PTSD, TBI, depression, anxiety, chronic pain, sensory overload, memory loss, executive dysfunction, and gifted-2E populations. Each preset was designed from lived experience, not clinical abstraction. The Brain Dashboard provides emotional check-in before AI sessions. This is accessibility infrastructure.",
    color: "text-rose-600",
    link: "/for/psychology",
  },
  {
    lens: "Prompt Engineers",
    argument: "The ALCM provides the first systematic model of how atomic words alter AI behavior. Power Prompt Combos document tested multi-word operators. Session Operators provide real-time control mechanisms. The Token Efficiency Strategy maps the path from strong to elite. This is the engineering manual for language-as-control.",
    color: "text-orange-600",
    link: "/for/prompt-engineer",
  },
];

export default function CitizenResearcher() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#FAF6EF]">
      <Nav />

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG.crossroads} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6EF]/90 via-[#FAF6EF]/95 to-[#FAF6EF]" />
        </div>
        <div className="container relative z-10 max-w-3xl mx-auto px-6">
          <p className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            The Professional Case
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A2E] leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Citizen Human-AI<br />Field Researcher
          </h1>
          <p className="text-lg text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Every AI governance framework in the world points at institutions. Nobody built the user-side layer. Until now.
          </p>
        </div>
      </section>

      {/* The Gap */}
      <section className="py-16 md:py-20 bg-[#FAF6EF]">
        <div className="container max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Gap
          </h2>
          <div className="space-y-4 text-base text-[#444] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <p>The EU AI Act regulates providers. The NIST AI RMF addresses organizations. The UNESCO Recommendation on AI Ethics speaks to member states. The Partnership on AI publishes guidelines for developers.</p>
            <p>None of them address the person sitting at the keyboard.</p>
            <p>The individual user — the parent helping a child with homework, the worker using AI to draft a report, the person in crisis reaching for a chatbot at 2 AM — has no governance framework. No structured methodology. No tools designed for their level of interaction.</p>
            <p className="text-[#1A1A2E] font-semibold">GallantryAI fills this gap.</p>
          </div>

          <WatcherNote>
            Notice the pattern: every framework assumes the user is either a developer or a passive consumer. The space between — the active, thinking user — is empty. That is where the work happens.
          </WatcherNote>
        </div>
      </section>
      {/* What Citizen Research Is */}
      <section className="py-16 md:py-20 bg-[#f5f0e8]">
        <div className="container max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            What Citizen Research Is
          </h2>
          <div className="space-y-4 text-base text-[#444] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <p>Citizen science has a long history. Birdwatchers count species. Amateur astronomers discover comets. Community members monitor water quality. The methodology is simple: trained observation, consistent documentation, shared vocabulary.</p>
            <p>Citizen Human-AI Field Research applies the same principles to AI interaction. The field is the conversation. The instrument is language. The data is behavioral — how AI responds to specific words, structures, and sequences.</p>
            <p>What was found: 28+ frameworks for understanding and controlling human-AI interaction, discovered through systematic testing across nine AI platforms over three months. Not in a lab. From the cab of a garbage truck, between stops, on a route through Midland, Ontario.</p>
          </div>

          <div className="mt-10">
            <LightboxImage src={IMG.governance} alt="Governance-First Framework" className="w-full rounded-xl shadow-lg" />
            <p className="text-xs text-[#888] mt-3 text-center italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Governance disciplines behavior across six refinement categories, converting constraint into capability.
            </p>
          </div>

          <WatcherNote>
            The research was not designed to be citizen research. It became citizen research when the patterns proved replicable. The label came after the work. That is how real methodology forms.
          </WatcherNote>
        </div>
      </section>

      {/* What Was Found */}
      <section className="py-16 md:py-20 bg-[#FAF6EF]">
        <div className="container max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            What Was Found
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {[
              { label: "Frameworks Documented", value: "28+" },
              { label: "AI Platforms Tested", value: "9" },
              { label: "Research Period", value: "Feb–Apr 2026" },
              { label: "Framework Families", value: "6" },
            ].map((stat) => (
              <div key={stat.label} className="p-6 rounded-xl bg-white border border-[#e8e0d0]">
                <div className="text-3xl font-bold text-[#E8520A] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {stat.value}
                </div>
                <div className="text-sm text-[#888]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <LightboxImage src={IMG.alcm} alt="Atomic Language Control Model" className="w-full rounded-xl shadow-lg" />
            <p className="text-xs text-[#888] mt-3 text-center italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              The Atomic Language Control Model: Cognitive Physics & Reasoning. Words as control dials.
            </p>
          </div>
        </div>
      </section>

      {/* Arguments by Professional Lens */}
      <section className="py-16 md:py-20 bg-[#f5f0e8]">
        <div className="container max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Why This Matters
          </h2>
          <p className="text-base text-[#555] mb-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Arguments by professional lens — why this work is relevant to your field.
          </p>

          <div className="space-y-6">
            {lensArguments.map((item) => (
              <div key={item.lens} className="relative p-6 rounded-xl bg-white border border-[#e8e0d0] hover:shadow-md transition-shadow">
                <Link
                  href={item.link}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#FAF6EF] border border-[#e8e0d0] flex items-center justify-center text-[#888] hover:text-[#E8520A] hover:border-[#E8520A] transition-colors no-underline"
                  title={`Go to ${item.lens}`}
                >
                  <span className="text-sm">→</span>
                </Link>
                <h3 className={`text-base font-bold mb-3 ${item.color}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {item.lens}
                </h3>
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {item.argument}
                </p>
              </div>
            ))}
          </div>

          <WatcherNote>
            Each lens sees a different shape in the same data. That is not a weakness of the research — it is the proof that the research is multivariable. A single-lens finding would be suspicious. A finding that holds across seven lenses is structural.
          </WatcherNote>
        </div>
      </section>

      {/* The Watcher */}
      <section className="py-16 md:py-20 bg-[#1A1A2E]">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <LightboxImage src={IMG.bridge} alt="Bridge between two worlds" className="w-full max-w-md mx-auto rounded-xl shadow-2xl mb-10 opacity-80" />
          <h2 className="text-2xl md:text-3xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Watcher
          </h2>
          <p className="text-base text-[#b0a898] leading-relaxed max-w-2xl mx-auto mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            The Watcher is not a character. It is a mode. A way of observing AI behavior without being consumed by it. The Watcher notices drift before it becomes direction. Names patterns before they become habits. Holds the space between reaction and response.
          </p>
          <p className="text-base text-[#b0a898] leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Throughout this site, the Watcher appears intermittently — dropping insight, teaching observation, then moving on. Here, on the Citizen Researcher page, the Watcher is deep. Because this is where the watching is taught.
          </p>
          <p className="text-lg text-[#E8520A] italic mt-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            Watch the AI. Watch yourself watching it. That is the method.
          </p>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-16 bg-[#FAF6EF]">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Field Papers", path: "/field-papers", desc: "The formal record" },
              { label: "Promptolinguistics", path: "/promptolinguistics", desc: "The discipline" },
              { label: "Framework Families", path: "/frameworks", desc: "The tools" },
              { label: "The Builder", path: "/builder", desc: "The story" },
            ].map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="block p-5 rounded-xl border border-[#e8e0d0] bg-white text-center hover:border-[#E8520A]/50 hover:shadow-md transition-all no-underline group"
              >
                <div className="text-sm font-semibold text-[#1A1A2E] group-hover:text-[#E8520A] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {link.label} →
                </div>
                <div className="text-xs text-[#888] mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {link.desc}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
